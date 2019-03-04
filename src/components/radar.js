import React from "react";
import { Group } from "@vx/group";
import { scaleLinear } from "@vx/scale";
import { Point } from "@vx/point";
import { Line, LineRadial } from "@vx/shape";
import { localPoint } from "@vx/event";
import getColor from "../get-color"

import * as d3 from "d3";

const primary = "#19E3B1";
const background = "#3AD1D0";
const line = "#212C37";
const bg = "rgba(0,0,0,0)";
const colorPalette = {
    red : "#EC4C47",
    green : "#47B881",
    orange : "#D9822B",
    teal : "#14B5D0",
    neutral : "#425A70",
}
const possibleStatus = [
     "Fixed",
     "Fix in review",
     "Active",
     "Won't Fix",
     "By Design",
     "Postponed",
     "Not Reproducible",
     "Duplicate"
]

const ANG = 360;

function test() {
    return "";
}

export default props => {
    const {
        rows,
        width = 600,
        height = 600,
        levels = 6,
        margin = {
            top: 20,
            left: 20,
            right: 20,
            bottom: 40
        }
    } = props;

    // const data = d3
    //     .nest()
    //     .key(d => d.category)
    //     .rollup(d => d.length)
    //     .entries(rows);

    const data2 = d3
        .nest()
        .key(d => d.status)
        .key(d => d.category)
        .rollup(d => d.length)
        .entries(rows);

    //contain the highest value, use for scaling
    const maxScale = data2.map(d => {
        return {
            ...d,
            sort: d.values.reduce((a,c) => a += c.value, 0)
        }
    }).sort((a,b) => b.sort - a.sort)[0]

    //get each status as its own array
    //get the one with max length and use that as legend

    const y = d => d.value;
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const radius = Math.min(xMax, yMax) / 2;

    const radiusScale = scaleLinear({
        range: [0, Math.PI * 2],
        domain: [ANG, 0]
    });

    const yScale = scaleLinear({
        range: [0, radius],
        domain: [0, Math.max(...maxScale.values.map(y))]
    });

    const webs = genAngles(maxScale.values.length);
    const points = genPoints(maxScale.values.length, radius);

    //data2
    const polygonPoints2 = data2.map(d => genPolygonPoints(d.values, yScale, y, d.key));

    const zeroPoint = new Point({ x: 0, y: 0 });

    const handleMouseOver = (event, datum) => {
        const coords = localPoint(event.target.ownerSVGElement, event);
    };

    return (
        <svg width={width} height={height}>
            <rect fill={bg} width={width} height={height} rx={14} />
            <Group top={height / 2 - margin.top} left={width / 2}>
                //just one, use to draw the spiderweb
                {[...Array(levels)].fill(null).map((_, i) => {
                    const r = ((i + 1) * radius) / levels;
                    return (
                        <LineRadial
                            key={`web-${i}`}
                            data={webs}
                            angle={d => radiusScale(d.angle)}
                            radius={r}
                            fill="none"
                            stroke={line}
                            strokeWidth={2}
                            strokeOpacity={0.8}
                            strokeLinecap="round"
                        />
                    );
                })}
                //just one, use to draw the spiderweb
                {[...Array(maxScale.values.length)].fill(null).map((_, i) => {
                    return (
                        <Line
                            key={`radar-line-${i}`}
                            from={zeroPoint}
                            to={points[i]}
                            stroke={line}
                        />
                    );
                })}
                //handle many, to draw the colored graph
                {polygonPoints2.map((polygonPoints, i) => {
                    return (
                        <g key={i}>
                            <polygon
                                points={polygonPoints.polygon}
                                fill={polygonPoints.statusColor}
                                fillOpacity={0.2}
                                stroke={polygonPoints.statusColor}
                                strokeWidth={1}
                            />
                            {polygonPoints.map((point, i) => {
                                return (
                                    <circle
                                        onMouseOver={handleMouseOver}
                                        key={`radar-point-${i}`}
                                        cx={point.x}
                                        cy={point.y}
                                        r={4}
                                        fill={polygonPoints.statusColor}
                                    />
                                );
                            })}
                        </g>
                    );
                })}
                {/* <polygon
                    points={polygonPoints.polygon}
                    fill={background}
                    fillOpacity={0.8}
                    stroke={background}
                    strokeWidth={1}
                />
                {polygonPoints.map((point, i) => {
                    return (
                        <circle
                            onMouseOver={handleMouseOver}
                            key={`radar-point-${i}`}
                            cx={point.x}
                            cy={point.y}
                            r={4}
                            fill={primary}
                        />
                    );
                })} */}
            </Group>
        </svg>
    );
};

function genAngles(length) {
    return [...Array(length + 1)].fill(1).map((_, i) => {
        return {
            angle: i * (ANG / length)
        };
    });
}

function genPoints(length, radius) {
    const step = (Math.PI * 2) / length;
    return [...Array(length)].fill(1).map((_, i) => {
        return {
            x: radius * Math.sin(i * step),
            y: radius * Math.cos(i * step)
        };
    });
}

function genPolygonPoints(data, scale, access, status) {
    const statusColor = colorPalette[getColor(status)] || colorPalette.neutral;
    const step = (Math.PI * 2) / data.length;
    const points = new Array(data.length).fill({});
    const pointString = new Array(data.length + 1)
        .fill("")
        .reduce((res, _, i) => {
            if (i > data.length) return res;
            const x = scale(access(data[i - 1])) * Math.sin(i * step);
            const y = scale(access(data[i - 1])) * Math.cos(i * step);
            points[i - 1] = { x, y };
            return (res += `${x},${y} `);
        });
    points.polygon = pointString;
    points.status = status;
    points.statusColor = statusColor;
    return points;
}
