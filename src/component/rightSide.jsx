import { CommentCard } from './Card';
import './rightSide.css';

export function RightSide({ comments = [], currentUser,setComments }) {
    // 1. Check if comments exists and has items
    const hasComments = comments && comments.length > 0;
    console.log("RightSide Rendered with comments:", comments); // Debug log

    return (
        <div className="comment-panel">
            <h3>Comments</h3>

            {/* 2. Added a class for the list container to handle scrolling/spacing */}
            <div className="comments-list">
                {hasComments ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            currentUser={currentUser}
                            setComments={setComments}
                        />
                    ))
                ) : (
                    <div className="empty-state-container">
                        <div className="icon-circle">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h4>No comments yet</h4>
                        <p>Be the first to share your thoughts on this project!</p>
                    </div>
                )}
            </div>
        </div>
    );
}