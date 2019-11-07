import React, { useState } from "react";
import { Link } from "gatsby";
import { groupBy } from "lodash";
import { Pane, Card, majorScale, minorScale, Heading } from "evergreen-ui";
import { colorPalette, defaultConfig } from "../get-color";
import { useMediaQuery } from "react-responsive";

// import Radar from "../components/radar";
// import VersionTable from "../components/version-table";
// import Heatmap from "../components/heatmap";
// import HeaderStatusBar from "../components/header-status-bar";
// import Stackbar from "../components/stack-bar";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CategoryTagInput from "../components/category-tag-input";
import ColorConfig from "../components/color-config";
import WaffleGraph from "../components/waffle-graph";
import SunBurstGraph from "../components/sun-burst-graph";
import TopBar from "../components/top-bar";
import Grid from "../components/grid";

const version = d => {
    const title = d["*"];
    const { data, releaseDate, releaseUrl, status, category } = d.pageContext;
    //Get a list of unqiue category, allow user to select what category they care about...

    const color = status.reduce((acc, cur) => { acc[cur] = defaultConfig[cur] || "neutral"; return acc; }, {});

    const initalState = Object.keys(groupBy(data, "category"));
    const availableColor = Object.keys(colorPalette);
    debugger;

    const [categories, setcategories] = useState(initalState);
    const [colorConfig, setColorConfig] = useState(defaultConfig);

    const isDesktop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const mediaQuery = {
        isDesktop,
        isTablet,
        isMobile
    };

    //update data base on our config...
    const categoriesDict = categories.reduce((a, c) => {
        a[c] = true;
        return a;
    }, {});


    const filteredData = data.filter(d => categoriesDict[d.category]);
    const filteredDataWithColor = filteredData.map(row => {
        const colorType = colorConfig[row.status];
        const color = colorPalette[colorType];
        return {
            ...row,
            colorType,
            color
        };
    });

    return (
        <Layout>
            <SEO title={title} />
            <TopBar title={"Unity Ver. " + title}>
                <a href={releaseUrl}>Offical Release Notes</a>
            </TopBar>
            <Pane
                width={1024}
                margin="auto">
                <Pane
                    display={"flex"}
                    justifyContent={"space-between"}
                    padding={8}
                >
                    <Card>
                        <ColorConfig
                            colorConfig={colorConfig}
                            setColorConfig={setColorConfig}
                            availableColor={availableColor}
                        />
                        <CategoryTagInput
                            selectable={initalState}
                            categories={categories}
                            setcategories={setcategories}
                        />
                    </Card>
                    <Card>
                        <Link to="/">Go back to the homepage</Link>
                    </Card>
                </Pane>
                <Pane
                    display={"flex"}
                    flexWrap={"wrap"}
                    justifyContent={"space-evenly"}
                >
                    <WaffleGraph
                        {...mediaQuery}
                        data={filteredDataWithColor}
                    ></WaffleGraph>
                    <SunBurstGraph
                        {...mediaQuery}
                        status={status}
                        data={filteredDataWithColor}
                    />
                </Pane>
                <Pane>
                    <Card
                        elevation={2}
                        background="white"
                        textAlign="start"
                        paddingX={majorScale(2)}
                        paddingY={majorScale(2)}
                    >
                        <Heading size={700}>Raw Data</Heading>
                        <Card height={500}>
                            <Grid data={filteredDataWithColor}>
                            </Grid>
                        </Card>
                    </Card>
                </Pane>
            </Pane>
            {/* <Stackbar data={data}/> */}
            {/* <HeaderStatusBar data={data}/> */}
            {/* <VersionTable data={data} height={250}/> */}
            {/* <Heatmap rows={data}/> */}
            {/* <Radar rows={data} /> */}
        </Layout>
    );
};

export default version;
