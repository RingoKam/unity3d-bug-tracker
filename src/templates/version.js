import React from "react";
import { Link } from "gatsby";

import Radar from "../components/radar";
import Layout from "../components/layout";
import SEO from "../components/seo";
import VersionTable from "../components/version-table";
import Heatmap from "../components/heatmap";
import HeaderStatusBar from "../components/header-status-bar";


const SecondPage = d => {
    const title = d["*"];
    const data = d.pageContext.data;
    return (
        <Layout>
            <SEO title={title} />
            <h1>Unity Ver. {title}</h1>
            <HeaderStatusBar data={data}/>
            <VersionTable data={data} height={250}/>
            <Heatmap rows={data}/>
            <Radar rows={data} />
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default SecondPage;
