import React from "react"
import "./top-bar.css"
import { Button } from "evergreen-ui"
import { FaGithub } from 'react-icons/fa';

const TopBar = ({ title, children }) => {
    return (
        <div className={"TopBar"}>
            <div className={"TopBar-title"}>{title}</div>
            <nav className={"TopBar-nav"}>
                {children}
            </nav>
            <nav className={"TopBar-navRight"}>
                <Button
                    height={40}
                    is="a" href="https://github.com/RingoKam/unity3d-bug-tracker"
                    appearance="minimal" 
                    intent="none"><FaGithub style={{ marginRight: "10px" }}/>Github</Button>
            </nav>
        </div>
    );
} 

export default TopBar
