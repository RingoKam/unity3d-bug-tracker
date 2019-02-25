import React from "react";
import { StaticQuery, graphql } from "gatsby";
import _ from "lodash";
import * as d3 from "d3";

const VersionTable = () => {
    return (
        <StaticQuery
            query={AllJsonQuery}
            render={data => {
                const totalCount = data.allDataJson.totalCount;
                const nodes = data.allDataJson.edges.map(n => n.node);
                const groupedByVersion = _.groupBy(nodes, node => node.version);
                const versionAvaliable = Object.keys(groupedByVersion);
                const rdata = d3
                    .nest()
                    .key(d => d.category)
                    .key(d => d.status)
                    .rollup(d => d.length)
                    .entries(nodes);

                const array = versionAvaliable.map((n, i) => (
                    <pre key={i}>{n}</pre>
                ));
                return <div>{array}</div>;
            }}
        />
    );
};

const AllJsonQuery = graphql`
    query {
        allDataJson {
            totalCount
            edges {
                node {
                    id
                    status
                    category
                    count
                    version
                    title
                }
            }
        }
    }
`;

export default VersionTable;
