import React from "react";
import { StaticQuery } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo";
import VersionDropdown from "../components/version-dropdown";
import { navigate } from '@reach/router';

const IndexPage = () => {
    const goToVersion = (version) => {
        navigate(`/${version}`);
    }
    return (
        <Layout>
            <SEO
                title="Home"
                keywords={[`unity`, `unity3d`, `bug`, `issue tracker`]}
            />
            <h1>Is My Unity Version Stable?</h1>
            <p>Graphical Representation of Unity Issue Tracker</p>
            <StaticQuery
                query={AllJsonQuery}
                render={data => {
                    console.log(data);
                    const totalCount = data.allVersionJson.totalCount;
                    const nodes = data.allVersionJson.edges.map(n => n.node);
                    return (<VersionDropdown nodes={nodes} onSelect={goToVersion} />)
                }}
            />
        </Layout>
    );
};

const AllJsonQuery = graphql`
    query {
        allVersionJson {
                totalCount
                edges {
                    node {
                        title
                    }
                }
            }
    }
`;

export default IndexPage;
