import { useEffect, useState } from 'react';
import './Card.css';

function getTimeAgo(time) {
    const now = new Date();
    const past = new Date(time);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} days ago`;
}


export function CommentCard({ comment, currentUser,setComments }) {
    const [displayTime, setDisplayTime] = useState(
        comment?.time ? getTimeAgo(comment.time) : ""
    );

    useEffect(() => {
        if (!comment?.time) return;
        const interval = setInterval(() => {
            setDisplayTime(getTimeAgo(comment.time));
        }, 60000);
        return () => clearInterval(interval);
    }, [comment?.time]);

    if (!comment || !comment.text) return null;

    const initials = comment.user
        .trim()
        .split(/\s+/)
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    const isCurrentUser = currentUser?.id && comment?.userId && currentUser.id === comment.userId;


    const onAccept = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, status: 'Accepted' }
                    : comment
            )
        );
    };

    const onReject = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, status: 'Rejected' }
                    : comment
            )
        );
    };

    return (
        <div className="comment-wrapper">
            <div className="comment-flex">
                <div className="avatar-container">
                    {comment.imageURL ? (
                        <img src={comment.imageURL} alt={`${comment.user}'s avatar`} className="avatar-img" />
                    ) : (
                        <div className="avatar-initials" style={{ backgroundColor: `#${comment.color || 'ccc'}` }}>
                            {initials}
                        </div>
                    )}
                </div>

                <div className="comment-content">
                    <div className="meta-row">
                        <div className="user-name-status">
                            <span className="user-name">{comment.user}</span>
                            {isCurrentUser && <span className="user-badge"> (You)</span>}
                            {comment.time && (
                                <>
                                    <span className="dot">•</span>
                                    <span className="timestamp">{displayTime}</span>
                                </>
                            )}
                        </div>
                        <div className="statusTab">
                            {comment.status && (
                                <span className={`status-label status-${comment.status.toLowerCase()}`}>
                                    {comment.status}
                                </span>
                            )}
                        </div>

                    </div>

                    <p className="message-body">{comment.text}</p>

                    <div className="button-row">
                        <button className="btn btn-accept" onClick={() => onAccept(comment.id)}>
                            Accept
                        </button>
                        <button className="btn btn-reject" onClick={() => onReject(comment.id)}>
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}