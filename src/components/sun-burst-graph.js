import React from "react"
import { ResponsiveSunburst } from '@nivo/sunburst';
import { limitStringLength } from "../helpers/data-format";
import { groupBy, uniq } from "lodash";

const WaffleGraph = ({data}) => {
    
    // group by 
    const groupedByCategory = groupBy(data, "category");
    const total = data.length;
    //loop thru the grouped data, find out whats the 
    //1st child color w/ status -> category w/\
    const children = Object.keys(groupedByCategory).map(category => {
        const rows = groupedByCategory[category];
        const groupedByColorType = groupBy(rows, "colorType");
        const children = Object.keys(groupedByColorType).map(colorType => {
            const { color } = groupedByColorType[colorType][0];
            return {
                name: category,
                color: color,
                value: groupedByColorType[colorType].length 
            }
        }).sort((a,b) => a.value - b.value);
        return {
            name: category, 
            color: "orange",
            children
        }  
    }).sort((a,b) => a.children.length - b.children.length );

    const chartData = {
        "name": "unity sun burst",
        children
    }

  
    return (
        <ResponsiveSunburst
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