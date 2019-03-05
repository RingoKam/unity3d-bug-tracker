import React from 'react';
import { Group } from '@vx/group';
import { Treemap } from '@vx/hierarchy';
import { scaleLinear } from '@vx/scale';
import * as d3 from "d3";
import { hierarchy, stratify, treemapSquarify } from 'd3-hierarchy';

const blue = 'rgba(3, 115, 217, 0.1)';
const green = 'rgba(0, 255, 112, 0.1)';
const bg = "rgba(0,0,0,0)";

export default ({
    rows,
    width = 1000,
    height = 1000,
    margin = {
        top: 0,
        left: 30,
        right: 40,
        bottom: 80
    }
}) => {
    const yMax = height - margin.top - margin.bottom;

    rows = rows.map(r => { r.count = parseInt(r.count) + 1; return r; })
    const colorScale = scaleLinear({
        domain: [0, Math.max(...rows.map(d => d.count))],
        range: [blue, green]
    });

    const data = d3.nest()
        .key(d => d.version).key(d => d.status).key(d => d.category)
        .rollup(d => {
            // const v = d.reduce((a, c) => a += parseInt(c.count), 0);
            return d3.sum(d, (d) => d.count);
        }).entries(rows);

    const root2 = hierarchy({ values: data }, (d) => d.values)
       .sum(v => v.value);

    // const root = hierarchy(TreeMapData)
    //     .eachBefore(d => d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name)
    //     .sum(d => d.size)
    //     .sort((a, b) => b.height - a.height || b.value - a.value);
    return (
        <svg width={width} height={height}>
            <rect width={width} height={height} rx={14} fill={bg} />
            <Treemap
                root={root2}
                size={[width, yMax]}
                tile={treemapSquarify}
                round={true}
                paddingInner={1}
                paddingOuter={3}
                paddingTop={19}
            >
                {treemap => {
                    const nodes = treemap.descendants().reverse();
                    debugger;
                    return (
                        <Group top={margin.top}>
                            {nodes.map((node, i) => {
                                const width = node.x1 - node.x0;
                                const height = node.y1 || 0 - node.y0 || 0;
                                console.log(node);

                                return (
                                    <Group key={`treemap-node-${i}`} top={node.y0} left={node.x0}>
                                        {node.depth == 1 && (
                                            <rect
                                                width={width}
                                                height={height}
                                                stroke={bg}
                                                strokeWidth={4}
                                                fill={'transparent'}
                                            />
                                        )}
                                        {node.depth >= 2 && (
                                            <>
                                                <rect
                                                    width={width}
                                                    height={height}
                                                    stroke={bg}
                                                    fill={colorScale(node.value)}
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
                                                    {node.data.key}_{node.value}
                                                </text>
                                            </>
                                        )}
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