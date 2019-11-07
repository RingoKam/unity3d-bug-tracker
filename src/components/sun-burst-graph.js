import React from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { Card, Pane, majorScale, minorScale, Heading } from "evergreen-ui";
import Grid from "../components/grid";
import { groupBy, uniq } from "lodash";
//#1E3852 use this as  background color

const WaffleGraph = ({ data, isDesktop, isTablet, isMobile, status }) => {
    // group by
    const groupedByCategory = groupBy(data, "category");
    const total = data.length;
    //loop thru the grouped data, find out whats the
    //1st child color w/ status -> category w/\
    const children = Object.keys(groupedByCategory)
        .map(category => {
            const rows = groupedByCategory[category];
            const groupedByColorType = groupBy(rows, "colorType");
            const children = Object.keys(groupedByColorType)
                .map(colorType => {
                    const { color, status } = groupedByColorType[colorType][0];
                    return {
                        name: status,
                        color: color,
                        value: groupedByColorType[colorType].length
                    };
                })
                .sort((a, b) => a.value - b.value);
            return {
                name: category,
                color: "orange",
                children
            };
        })
        .sort((a, b) => a.children.length - b.children.length);

    const chartData = {
        name: "unity sunburst",
        children
    };

    const gridData = children.map(child => {
        const { name, children } = child; 
        const grandChildrenProps = children.reduce((acc, grandChild) => {
            acc[grandChild.name] = grandChild.value; 
            return acc;
        }, {});
        return {
            name, 
            ...grandChildrenProps
        }
    });

    const gridCols = [
        { field: "name", headerName: "Category", sortable: true, filter: true, pinned: "left", suppressSizeToFit: true },
        ...status.map(s => ({ field: s, headerName: s, sortable: true, filter: true }))
    ]

    const wh = isDesktop
        ? { width: 500, height: 500 }
        : isTablet
        ? { width: 500, height: 500 }
        : { width: 250, height: 500 };

    return (
        <Pane
            textAlign="start"
            background="white"
            border="muted"
            elevation={2}
            width={1018}
            display="flex"
            flexDirection="column"
            marginX={majorScale(1)}
            marginY={majorScale(1)}
            paddingX={majorScale(1)}
            paddingY={majorScale(1)}
        >
            <Heading display="box" size={700} marginBottom={majorScale(3)}>Issue Categories Composition</Heading>
            <Pane display="flex" flexDirection="row">
                <Card {...wh}>
                    <ResponsiveSunburst
                        borderWidth={1}
                        colors={{ datum: "color" }}
                        childColor="noinherit"
                        value={"value"}
                        identity={"name"}
                        animate={true}
                        data={chartData}
                    ></ResponsiveSunburst>
                </Card>
                <Card width={wh.width} marginLeft={majorScale(2)}>
                    <Grid data={gridData} columns={gridCols}></Grid>
                </Card>
            </Pane>
        </Pane>
    );
};

export default WaffleGraph;
