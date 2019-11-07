import React, { useState } from "react";
import { getColorType, getColor } from "../get-color";
import { groupBy } from "lodash";
import StatusBadge from "../components/status-badge";
import { limitStringLength } from "../helpers/data-format" 
import { Object } from "core-js";

const HeaderStatusBar = ({ data }) => {
    const totalIssue = data.length;
    const grouped = groupBy(data, "status");
    const statuses = Object.keys(grouped);
    const final = statuses.map(status => {
        const percent = limitStringLength((grouped[status].length / totalIssue) * 100, 0);
        const color = getColor(getColorType(status));
        return {
            status,
            percent,
            color,
            style: {
                'width': percent + "%",
                'backgroundColor': color,
                'height': "25px",
                'text-align': "center",
                'overflow': "hidden",
                'color': "white",
                'font-size': "20px"
            }
        }
    }).sort((a, b) => a.color > b.color);

    const HeaderStatusBarStyle = {
        width: '100%'
    }

    const HeaderStatusBarBoxStyle = {
        width: '100%',
        display: "flex",
        border: "1px solid #dfe2e5",
        padding: "1 1 1 1",
        justifyContent: "space-evenly"
    }

    const HeaderStatusBarButtonStyle = {
        width: '100%',
        display: "flex",
        padding: "0 0 0 0",
        border: "none",
        cursor: "pointer"
    }
    
    const getColorHeaderItem = () => {
        return final.map(f => {
            const style = {
                color: f.color
            };
            const percent = ("" + f.percent).substring(0, 4);
            return (<div style={style}>
                {StatusBadge(f.status, " " + percent + "%")}
            </div>)
        })
    }


    return (<div style={HeaderStatusBarStyle}>
        <div style={HeaderStatusBarBoxStyle}>
            {getColorHeaderItem()}
        </div>
    </div>);
};

export default HeaderStatusBar;