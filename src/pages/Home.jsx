import './Home.css'
import { Navbar } from "../component/navbar.jsx";
import { LeftSide } from '../component/leftSide.jsx';
import { RightSide } from '../component/rightSide.jsx';
import { useState } from 'react';

export function Home() {
    const USERS_DATA = [
        { id: 1, name: "Muhammed Shibil", label: "Developer", color: "0D8ABC" },
        { id: 2, name: "Alex Rivera", label: "Designer", color: "6366F1",imageUrl: "https://i.pravatar.cc/40?u=24" },
        { id: 3, name: "Sarah Chen", label: "Manager", color: "EC4899" },
        { id: 4, name: "James Wilson", label: "Accountant", color: "10B981" },
        { id: 5, name: "Maria Garcia", label: "Editor", color: "F59E0B" }
    ];
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(USERS_DATA[0]);
    return (
        <main className="main-container">
            <Navbar comments={comments} currentUser={currentUser} setCurrentUser={setCurrentUser} USERS_DATA={USERS_DATA} />
            <div className="container">
                <LeftSide comments={comments} setComments={setComments} currentUser={currentUser} />
                <RightSide comments={comments} currentUser={currentUser} />
            </div>

        </main>
    );
}