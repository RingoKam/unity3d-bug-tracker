import React from 'react';
import { Group } from '@vx/group';
import { Treemap } from '@vx/hierarchy';
import { shakespeare } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import * as d3 from "d3";
import { hierarchy, stratify, treemapSquarify } from 'd3-hierarchy';

const blue = '#0373d9';
const green = '#00ff70';
const bg = "rgba(0,0,0,0)";

const colorScale = scaleLinear({
    domain: [0, Math.max(...shakespeare.map(d => d.size || 0))],
    range: [blue, green]
});


console.log(shakespeare);

const data = stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(shakespeare)
    .sum(d => d.size || 0);

export default ({
    rows,
    width = 500,
    height = 500,
    margin = {
        top: 0,
        left: 30,
        right: 40,
        bottom: 80
    }
}) => {
    // const data = stratify()
    //     .id(d => d.id)
    //     .parentId(d => d.status)(row)
    //     .sum(d => d.size || 0);
    const data = d3.nest()
        .key(d => d.version).key(d => d.status).key(d => d.category)
        .rollup(d => d).entries(rows);

    const yMax = height - margin.top - margin.bottom;
    const root = hierarchy({values: data}, (d) => d.values);
    return (
        <svg width={width} height={height}>
            <rect width={width} height={height} rx={14} fill={bg} />
            <Treemap
                root={root}
                size={[width, yMax]}
                tile={treemapSquarify}
                round={true}
                paddingInner={1}
            >
                {treemap => {
                    const nodes = treemap.descendants().reverse();
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
                                        {node.depth > 2 && (
                                            <rect
                                                width={width}
                                                height={height}
                                                stroke={bg}
                                                fill={colorScale(node.value)}
                                            />
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