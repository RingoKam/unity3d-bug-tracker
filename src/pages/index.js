import React from "react";
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo";
import VersionDropdown from "../components/version-dropdown";
import { navigate } from '@reach/router';

const IndexPage = () => {
    console.log("i got clicked")
    const goToVersion = (version) => {
        navigate(`/${version}`);
    }
    return (
        <Layout>
            <SEO
                title="Home"
                keywords={[`unity`, `unity3d`, `bug`, `issue tracker`]}
            />
            <div style={{
                marginTop: "5vh"
            }}>
                <h1>Is My Unity Version Stable?</h1>
                <p>Graphical Representation of Unity Issue Tracker</p>
                <StaticQuery
                    query={AllJsonQuery}
                    render={data => {
                        console.log(data);
                        const totalCount = data.allVersionJson.totalCount;
                        const nodes = data.allVersionJson.edges.map(n => n.node);
                        return (
                            <>
                                <VersionDropdown nodes={nodes} onSelect={goToVersion} />
                                <div style={{
                                    fontSize: "small",
                                    color: "#808080c9",
                                    letterSpacing: "3px"
                                }}>
                                    Tracking {totalCount} version
                                </div>
                            </>
                        )
                    }}
                />
            </div>
            
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
                        releaseDate
                    }
                }
            }
    }
`;

export default IndexPage;
