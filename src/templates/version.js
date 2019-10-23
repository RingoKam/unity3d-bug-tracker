import React from "react";
import { Link } from "gatsby";

import Radar from "../components/radar";
import Layout from "../components/layout";
import SEO from "../components/seo";
import VersionTable from "../components/version-table";
import Heatmap from "../components/heatmap";
import HeaderStatusBar from "../components/header-status-bar";
import Stackbar from "../components/stack-bar";

const SecondPage = d => {
    const title = d["*"];
    console.log(d);
    const { data, releaseDate, releaseUrl } = d.pageContext;
    return (
        <Layout>
            <SEO title={title} />
            <h1>Unity Ver. <a href={releaseUrl}>{title}</a></h1>
            <h3>Released on {releaseDate}</h3>
            {/* <Stackbar data={data}/> */}
            <HeaderStatusBar data={data}/>
            <VersionTable data={data} height={250}/>
            {/* <Heatmap rows={data}/> */}
            {/* <Radar rows={data} /> */}
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default SecondPage;
