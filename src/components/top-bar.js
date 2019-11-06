import React from "react"
import "./top-bar.css"

const TopBar = ({ title, children }) => {
    return (
        <div className={"TopBar"}>
            <div className={"TopBar-title"}>{title}</div>
            <nav className={"TopBar-nav"}>
                {children}
            </nav>
            <nav className={"TopBar-navRight"}>
                <a href="https://github.com/RingoKam/unity3d-bug-tracker">GitHub</a>
            </nav>
        </div>
    );
} 

export default TopBar