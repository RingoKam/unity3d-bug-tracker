import React from 'react';
import { Group } from '@vx/group';
import { Treemap } from '@vx/hierarchy';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { getColor, getColorType } from "../get-color"
import * as d3 from "d3";
import { hierarchy, treemapSquarify } from 'd3-hierarchy';

const blue = 'rgba(3, 115, 217, 0.5)';
const green = 'rgba(0, 255, 112, 0.5)';
const background = "rgba(0,0,0,0)";
const bg = "rgba(0,0,0,0.09)";

export default ({
    rows,
    width = 500,
    height = 500,
    margin = {
        top: 0,
        left: 30,
        right: 40,
        bottom: 0
    }
}) => {
    const yMax = height - margin.top - margin.bottom;

    rows = rows.map(r => { r.count = parseInt(r.count) + 1; return r; })
    const colorScale = (status) => {
        const endColorType = getColorType(status);
        return scaleLinear({
            domain: [0, 3],
            range: endColorType === "neutral" ? [bg, bg] : [getColor(endColorType), getColor(endColorType)]
        })
    }

    const data = d3.nest()
        .key(d => d.version)
        .key(d => d.status)
        .key(d => d.category)
        .rollup(d => {
            return d3.sum(d, (d) => d.count);
        }).entries(rows);

    const root2 = hierarchy({ values: data }, (d) => d.values)
        .eachBefore(d => {return d;})
       .sum(v => v.value);


    const hover = (data) => {
    }

    // const root = hierarchy(TreeMapData)
    //     .eachBefore(d => d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name)
    //     .sum(d => d.size)
    //     .sort((a, b) => b.height - a.height || b.value - a.value);
    return (
        <svg width={width} height={height}>
            <rect width={width} height={height} rx={14} fill={background} />
            <Treemap
                root={root2}
                size={[width, yMax]}
                tile={treemapSquarify}
                round={true}
                paddingInner={1}
                paddingOuter={1}
                paddingTop={15}
            >
                {treemap => {
                    const nodes = treemap.descendants()
                    return (
                        <Group top={margin.top}>
                            {nodes.map((node, i) => {
                                const width = node.x1 - node.x0;
                                const height = node.y1 - node.y0;
                                return (
                                    <Group key={`treemap-node-${i}`} top={node.y0} left={node.x0}>
                                                <rect
                                                    title={node.data.key}
                                                    onMouseEnter={() => hover(node.data)}
                                                    width={width}
                                                    height={height}
                                                    stroke={background}
                                                    fill={colorScale(node.data.key)(node.depth)}
                                                />
                                                <clipPath id={`clip-${i}-${node.data.key}`}>
                                                    <use xlinkHref={`#rect-${i}`} />
                                                </clipPath>
                                                <text
                                                    x={4}
                                                    y={13}
                                                    clipPath={`url(#clip-${i})`}
                                                    style={{
                                                        font: '10px sans-serif'
                                                    }}
                                                >
                                                    {node.depth < 3 ? (node.data.key || node.value) : (node.value)}
                                                </text>
                                    </Group>
                                );
                            })}
                        </Group>
                    );
                }}
            </Treemap>
        </svg>
    );
};