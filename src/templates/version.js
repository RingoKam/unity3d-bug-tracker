import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import VersionTable from "../components/version-table";

const SecondPage = d => {
    const title = d["*"];
    const data = d.pageContext.data;
   
    return (
        <Layout>
            <SEO title={title} />
            <VersionTable data={data} height={250}/>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default SecondPage;
