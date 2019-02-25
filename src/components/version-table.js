import React from "react";
import { StaticQuery, graphql, navigate } from "gatsby";
import _ from "lodash";
import { Autocomplete, TextInput } from "evergreen-ui"

const VersionTable = () => {

    const goToVersion = (version) => {
        console.log(version);
        navigate(`/version?ver=${version}`);
    }

    return (
        <StaticQuery
            query={AllJsonQuery}
            render={data => {
                const totalCount = data.allDataJson.totalCount;
                const nodes = data.allDataJson.edges.map(n => n.node);
                const groupedByVersion = _.groupBy(nodes, node => node.version);
                const versionAvaliable = Object.keys(groupedByVersion).sort();
                return <Autocomplete 
                    title="Version"
                    onChange={(ver) => {goToVersion(ver)}}
                    items={versionAvaliable}
                    children={(props) => {
                        const { getInputProps, getRef, inputValue } = props
                        return (
                          <TextInput
                            placeholder="Version..."
                            value={inputValue}
                            innerRef={getRef}
                            {...getInputProps()}
                          />
                        )
                    }}>
                    </Autocomplete>
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
