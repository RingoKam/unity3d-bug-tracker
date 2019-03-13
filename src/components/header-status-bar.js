import React from "react";
import { getColorType, getColor } from "../get-color";
import { groupBy } from "lodash"

const HeaderStatusBar = ({data}) => {

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
                'height': "8px"
            }
        }
    })

    const HeaderStatusBarStyle = {
        width: '100%'
    }

    const getColorSpan = () => {
        return final.map(f => {
            return (<span key={f.status} style={f.style}></span>)
        }) 
    }

    return (<div style={HeaderStatusBarStyle}>
        <div></div>
        <button style={HeaderStatusBarStyle} type="button">
        {getColorSpan()}
        </button>
    </div>);
};

export default HeaderStatusBar;