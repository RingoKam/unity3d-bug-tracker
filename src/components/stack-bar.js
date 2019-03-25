import React from "react";
import { BarStackHorizontal } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { cityTemperature } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { LegendOrdinal } from "@vx/legend";
import * as d3 from "d3";
import { groupBy, sortBy } from "lodash";
import { getColor, getColorType } from "../get-color";

const legendColor = "#A9A9A9";
const bg = "#FFFFFF";

// var data = cityTemperature.slice(0, 12);
// var keys = Object.keys(data[0]).filter(d => d !== 'date');

// const totals = data.reduce((ret, cur) => {
//     const t = keys.reduce((dailyTotal, k) => {
//         dailyTotal += +cur[k];
//         return dailyTotal;
//     }, 0);
//     ret.push(t);
//     return ret;
// }, []);

export default withTooltip(
    ({
        width = 500,
        height = 1000,
        events = false,
        margin = {
            top: 40,
            left: 50,
            right: 40,
            bottom: 100
        },
        data,
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip
    }) => {
        if (width < 10) return null;

        const grouped = groupBy(data, "status");
        const keys = Object.keys(grouped);
        const colorCodes = keys.map(key => getColor(getColorType(key)));

        //setting up the key
        data = d3
            .nest()
            .key(d => d.category)
            .key(d => d.status)
            .rollup(d => d.length)
            .entries(data);

        data = data.map(d => {
            const value = d.values.reduce(
                (a, c) => {
                    a[c.key] = c.value;
                    a.count += c.value;
                    return a;
                },
                { count: 0 }
            );
            return {
                key: d.key,
                ...value
            };
        });

        data = sortBy(data, ["count"]);

        const totals = data.length;

        // accessors
        const y = d => d.key;

        // scales
        const xScale = scaleLinear({
            domain: [0, totals],
            nice: true
        });
        const yScale = scaleBand({
            domain: data.map(y),
            padding: 0.2
        });
        const color = scaleOrdinal({
            domain: keys,
            range: colorCodes
        });

        let tooltipTimeout;

        // bounds
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        xScale.rangeRound([0, xMax]);
        yScale.rangeRound([yMax, 0]);

        return (
            <div style={{ position: "relative" }}>
                <svg width={width} height={height}>
                    <rect width={width} height={height} fill={bg} rx={14} />
                    <Group top={margin.top} left={margin.left}>
                        <BarStackHorizontal
                            data={data}
                            keys={keys}
                            height={yMax}
                            y={y}
                            xScale={xScale}
                            yScale={yScale}
                            color={color}
                        >
                            {barStacks => {
                                return barStacks.map(barStack => {
                                    return barStack.bars.map(bar => {
                                        return (
                                            <rect
                                                key={`barstack-horizontal-${
                                                    barStack.index
                                                }-${bar.index}`}
                                                x={bar.x}
                                                y={bar.y}
                                                width={bar.width}
                                                height={bar.height}
                                                fill={bar.color}
                                                onClick={event => {
                                                    if (!events) return;
                                                    alert(
                                                        `clicked: ${JSON.stringify(
                                                            bar
                                                        )}`
                                                    );
                                                }}
                                                onMouseLeave={event => {
                                                    tooltipTimeout = setTimeout(
                                                        () => {
                                                            hideTooltip();
                                                        },
                                                        300
                                                    );
                                                }}
                                                onMouseMove={event => {
                                                    if (tooltipTimeout)
                                                        clearTimeout(
                                                            tooltipTimeout
                                                        );
                                                    const top =
                                                        bar.y + margin.top;
                                                    const left =
                                                        bar.x + 
                                                        bar.width +
                                                        margin.left;
                                                    showTooltip({
                                                        tooltipData: bar,
                                                        tooltipTop: top,
                                                        tooltipLeft: left
                                                    });
                                                }}
                                            />
                                        );
                                    });
                                });
                            }}
                        </BarStackHorizontal>
                        <AxisLeft
                            hideAxisLine={true}
                            hideTicks={true}
                            scale={yScale}
                            stroke={legendColor}
                            tickStroke={legendColor}
                            tickLabelProps={(value, index) => ({
                                fill: legendColor,
                                fontSize: 11,
                                textAnchor: "end",
                                dy: "0.33em"
                            })}
                        />
                        <AxisBottom
                            top={yMax}
                            scale={xScale}
                            stroke={legendColor}
                            tickStroke={legendColor}
                            tickLabelProps={(value, index) => ({
                                fill: legendColor,
                                fontSize: 11,
                                textAnchor: "middle"
                            })}
                        />
                    </Group>
                </svg>
                <div
                    style={{
                        position: "absolute",
                        top: margin.top / 2 - 10,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "14px"
                    }}
                >
                    <LegendOrdinal
                        scale={color}
                        direction="row"
                        labelMargin="0 15px 0 0"
                    />
                </div>
                {tooltipOpen && (
                    <Tooltip
                        top={tooltipTop}
                        left={tooltipLeft}
                        style={{
                            minWidth: 60,
                            backgroundColor: "rgba(0,0,0,0.9)",
                            color: "white"
                        }}
                    >
                        <div style={{ color: color(tooltipData.key) }}>
                            <strong>{tooltipData.key}</strong>
                        </div>
                        <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
                        <div>
                            <small>{y(tooltipData.bar.data)}</small>
                        </div>
                    </Tooltip>
                )}
            </div>
        );
    }
);
