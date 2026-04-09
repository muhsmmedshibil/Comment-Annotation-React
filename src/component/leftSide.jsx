import React, { useState, useRef } from 'react';
import './leftSide.css';

export function LeftSide({ comments, setComments, currentUser }) {


    // Stores the temporary position of a pin before it is saved
    const [activeInput, setActiveInput] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef(null);

    const handleDocumentClick = (e) => {
        // Prevent creating a new input if clicking inside an existing bubble or the input box
        if (e.target.closest('.comment-bubble') || e.target.closest('.input-wrapper')) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setActiveInput({ x, y });
        setInputValue(""); 
    };

    const handleSave = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            const newEntry = {
                id: Date.now(),
                x: activeInput.x,
                y: activeInput.y,
                text: inputValue,
                time: new Date().toISOString(),
                status:'pending',
                user: currentUser.name,
                color: currentUser.color,
                imageURL: currentUser.imageUrl,
            };
            setComments([...comments, newEntry]);
            setActiveInput(null); // Hide input after saving
            setInputValue("");
        }
    };

    return (
        <div className="document-viewer">
            <div className="document-content" ref={containerRef} onClick={handleDocumentClick}>
                <h2>What is the MERN stack?</h2>

                <p>
                    The MERN stack is a modern web development framework that allows developers to build full-stack applications using only JavaScript. It combines four powerful technologies: MongoDB, Express.js, React, and Node.js. These tools work together to handle everything from the user interface to server-side logic and database management. Because all components use JavaScript, development becomes faster and more consistent.
                </p>

                <p>
                    Each part of MERN has a specific role. MongoDB stores data in a flexible, JSON-like format, making it easy to manage and scale. Express.js works on top of Node.js to create APIs and handle server-side operations efficiently. React is used on the frontend to build fast, dynamic, and interactive user interfaces. Node.js allows developers to run JavaScript on the server, enabling smooth communication between the frontend and backend. Together, they create a seamless flow of data through APIs.
                </p>

                <p>
                    The MERN stack is widely used for building modern, scalable, and high-performance web applications. Developers prefer it because it simplifies development by using a single programming language across the entire project. It also supports rapid development and easy maintenance. Overall, MERN is a powerful and efficient choice for creating full-stack applications, especially for startups and modern web platforms.
                </p>

                {/* <h2>What is MongoDB?</h2> */}



                {/* 1. Render Saved Comments */}
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="annotation-group"
                        style={{ left: comment.x, top: comment.y }}
                    >
                        <div className="purple-dot"></div>
                        <div className="comment-bubble">
                            {comment.text}
                        </div>
                    </div>
                ))}

                {/* 2. Render Active Input Field */}
                {activeInput && (
                    <div
                        className="input-wrapper"
                        style={{ left: activeInput.x, top: activeInput.y }}
                    >
                        <input
                            autoFocus
                            type="text"
                            placeholder="Enter to save"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleSave}
                        />
                        <div className="green-plus">+</div>
                    </div>
                )}
            </div>
        </div>
    );
}