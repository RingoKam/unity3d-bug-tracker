import React, { useState } from "react";
import { Link } from "gatsby";
import { groupBy } from "lodash";
import { Pane, Card } from "evergreen-ui"
import { colorPalette, defaultConfig } from "../get-color";

import Radar from "../components/radar";
import Layout from "../components/layout";
import SEO from "../components/seo";
import VersionTable from "../components/version-table";
import Heatmap from "../components/heatmap";
import HeaderStatusBar from "../components/header-status-bar";
import Stackbar from "../components/stack-bar";
import CategoryTagInput from "../components/category-tag-input";
import ColorConfig from "../components/color-config";
import WaffleGraph from "../components/waffle-graph";

const SecondPage = d => {
    const title = d["*"];
    const { data, releaseDate, releaseUrl } = d.pageContext;
    const total = data.length;
    //Get a list of unqiue category, allow user to select what category they care about...
    const initalState = Object.keys(groupBy(data, "category"));
    const availableColor = Object.keys(colorPalette);
    
    const [ categories, setcategories ] = useState(initalState);
    const [ colorConfig, setColorConfig ] = useState(defaultConfig);
    
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
            <h1>Unity Ver. <a href={releaseUrl}>{title}</a></h1>
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
            <Card height={300}>
                <WaffleGraph 
                    data={filteredDataWithColor}
                    />
            </Card>
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
