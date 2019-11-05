import React from "react"
import { ResponsiveWaffle } from "@nivo/waffle"
import { groupBy, uniq } from "lodash";
import { limitStringLength } from "../helpers/data-format"

const WaffleGraph = ({data}) => {
    const groupByColor = groupBy(data, "color");
    const chartData = Object.keys(groupByColor).map(color => {
        const rows = groupByColor[color];
        const status = uniq(rows.map(row => row.status)).join(", ");
        const colorType = rows[0].colorType;
        const percent = (rows.length / data.length) * 100;
        return {
            id: status,
            label: status,
            value: limitStringLength(percent, 2),
            color: color,
            colorType
        }
    }).sort((a,b) => { return a.other === b.other ? 0 : -1 });

    const legend = {
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: -100,
        translateY: 0,
        itemWidth: 100,
        itemHeight: 50,
        itemsSpacing: 4,
        fontSize: 20,
        symbolSize: 50,
        itemDirection: 'left-to-right',
        effects: [
            {
                on: 'hover',
                style: {
                    itemTextColor: '#000',
                    itemBackground: '#f7fafb'
                }
            }
        ]
    }
    return (
        <ResponsiveWaffle
            data={chartData}
            rows={10}
            columns={10}
            padding={1}
            total={100}
            colors={{ datum: 'color' }}
            margin={{ top: 10, right: 10, left: 10, bottom: 10}}>
        </ResponsiveWaffle>
    )
}

export default WaffleGraph