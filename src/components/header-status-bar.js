import React from "react";
import { getColorType, getColor } from "../get-color";
import { groupBy } from "lodash";
import StatusBadge from "../components/status-badge";

const HeaderStatusBar = ({ data }) => {

    const totalIssue = data.length;
    const grouped = groupBy(data, "status");
    const statuses = Object.keys(grouped);
    const final = statuses.map(status => {
        const percent = (grouped[status].length / totalIssue) * 100;
        const color = getColor(getColorType(status));
        return {
            status,
            percent,
            color,
            style: {
                'width': percent + "%",
                'backgroundColor': color,
                'height': "8px",
                'overflow': "hidden",
            }
        }
    });
    
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

    const getColorSpan = () => {
        return final.map(f => {
            return (<span key={f.status} title={f.status} style={f.style}></span>)
        })
    }

    const getColorHeaderItem = () => {
        return final.map(f => {
            const style = {
                color: f.color
            };
            const percent = ("" + f.percent).substring(0, 4);
            return (<div style={style}>
                {StatusBadge(f.status, " " + percent + "%" )}
            </div>)
        })
    }


    return (<div style={HeaderStatusBarStyle}>
        <div style={HeaderStatusBarBoxStyle}>
            {getColorHeaderItem()}
        </div>
        <button style={HeaderStatusBarButtonStyle} type="button">
            {getColorSpan()}
        </button>
    </div>);
};

export default HeaderStatusBar;