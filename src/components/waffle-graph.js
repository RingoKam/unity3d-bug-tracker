import React from "react";
import { Card, Pane, majorScale, minorScale, Heading } from "evergreen-ui";
import Grid from "../components/grid";
import { ResponsiveWaffle } from "@nivo/waffle";
import { groupBy, uniq } from "lodash";
import { limitStringLength } from "../helpers/data-format";

const WaffleGraph = ({ data, isDesktop, isTablet, isMobile }) => {
    const groupByColor = groupBy(data, "color");
    const chartData = Object.keys(groupByColor)
        .map(color => {
            const rows = groupByColor[color];
            const status = uniq(rows.map(row => row.status)).join(", ");
            const colorType = rows[0].colorType;
            const percent = (rows.length / data.length) * 100;
            return {
                id: status,
                count: rows.length,
                label: status,
                value: limitStringLength(percent, 2),
                color: color,
                colorType
            };
        })
        .sort((a, b) => {
            return a.other === b.other ? 0 : -1;
        });

    const wh = isDesktop
        ? { width: 1000, height: 250 }
        : isTablet
        ? { width: 500, height: 500 }
        : { width: 250, height: 500 };

    return (
        <Pane
            textAlign="start"
            background="white"
            border="muted"
            elevation={2}
            display="flex"
            flexDirection="column"
            marginX={majorScale(1)}
            marginY={majorScale(1)}
            paddingX={majorScale(1)}
            paddingY={majorScale(1)}
        >
            <Heading size={700}>Issue Status Composition</Heading>
            <Card {...wh}>
                <ResponsiveWaffle
                    data={chartData}
                    rows={5}
                    columns={25}
                    padding={1}
                    total={100}
                    colors={{ datum: "color" }}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                ></ResponsiveWaffle>
            </Card>
            <Card width={wh.width} height={200}>
                <Grid data={chartData}></Grid>
            </Card>
        </Pane>
    );
};

export default WaffleGraph;
