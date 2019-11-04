import React, { useState } from "react";
import { Link } from "gatsby";
import { groupBy } from "lodash";
import { Pane, Card } from "evergreen-ui"
import { colorPalette, defaultConfig } from "../get-color";
import { useMediaQuery } from "react-responsive"

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
import TopBar from "../components/top-bar"

const SecondPage = d => {
    const title = d["*"];
    const { data, releaseDate, releaseUrl } = d.pageContext;
    //Get a list of unqiue category, allow user to select what category they care about...
    const initalState = Object.keys(groupBy(data, "category"));
    const availableColor = Object.keys(colorPalette);
    
    const [ categories, setcategories ] = useState(initalState);
    const [ colorConfig, setColorConfig ] = useState(defaultConfig);
    
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    
    const mediaQuery = {
        isDesktop,
        isTablet,
        isMobile,
        isNotMobile
    }

    //update data base on our config... 
    const categoriesDict = categories.reduce((a,c) => { a[c] = true; return a; }, {});
    const filteredData = data.filter(d => categoriesDict[d.category]);
    const filteredDataWithColor = filteredData.map(row => {
        const colorType = colorConfig[row.status];
        const color = colorPalette[colorType];
        return {
            ...row,
            colorType,
            color
        }
    })

    return (
        <Layout>
            <SEO title={title} />
            <TopBar title={"Unity Ver. " + title}>
                <a href={releaseUrl}>Offical Release Notes</a>
            </TopBar>
            <h3>Released on {releaseDate}</h3>
            <Pane
                padding={16}>
                <ColorConfig 
                    colorConfig={colorConfig} 
                    setColorConfig={setColorConfig} 
                    availableColor={availableColor} />
                <CategoryTagInput 
                    selectable={initalState} 
                    categories={categories} 
                    setcategories={setcategories}/>
            </Pane>
            <Pane 
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"space-evenly"}>
                <Card height={300} width={300}>
                    <WaffleGraph data={filteredDataWithColor} />
                </Card>
                <Card height={300} width={300}>
                    <SunBurstGraph data={filteredDataWithColor}/>
                </Card>
            </Pane>
            {/* <Stackbar data={data}/> */}
            {/* <HeaderStatusBar data={data}/> */}
            {/* <VersionTable data={data} height={250}/> */}
            {/* <Heatmap rows={data}/> */}
            {/* <Radar rows={data} /> */}
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default SecondPage;
