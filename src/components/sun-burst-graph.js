import React from "react"
import { ResponsiveSunburst } from '@nivo/sunburst';
import { limitStringLength } from "../helpers/data-format";
import { groupBy, uniq } from "lodash";

const WaffleGraph = ({data}) => {
    
    // group by 
    const groupedByColorType = groupBy(data, "colorType");
    const total = data.length;
    //loop thru the grouped data, find out whats the 
    //1st child color w/ status -> category w/\
    const children = Object.keys(groupedByColorType).map(colorType => {
        const rows = groupedByColorType[colorType];
        const status = uniq(rows.map(row => row.status)).join(", ");
        const color = rows[0].color;
        const groupedByCategory = groupBy(rows, "category");
        const children = Object.keys(groupedByCategory).map(category => {
            return {
                name: category,
                color: color,
                value: groupedByCategory[category].length 
            }
        }).sort((a,b) => a.value - b.value);
        return {
            name: status, 
            color: color,
            children
        }  
    }).sort((a,b) => a.children.length - b.children.length );

    const chartData = {
        "name": "unity sun burst",
        children
    }

  
    return (
        <ResponsiveSunburst
            width={500}
            height={500}
            borderWidth={1}
            colors={{ datum: 'color' }}
            childColor="noinherit"
            value={'value'}
            identity={'name'}
            animate={true} 
            data={chartData}>
        </ResponsiveSunburst>
    )
}

export default WaffleGraph