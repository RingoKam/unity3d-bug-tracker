import React from "react";
import { StaticQuery, graphql, navigate } from "gatsby";
import _ from "lodash";
import { Autocomplete, TextInput } from "evergreen-ui"

const VersionTable = ({nodes, onSelect}) => {
    const groupedByVersion = _.groupBy(nodes, node => node.version);
    const versionAvaliable = Object.keys(groupedByVersion).sort();
    return <Autocomplete
        openOnFocus 
        title="Version"
        onChange={(ver) => {onSelect(ver)}}
        items={versionAvaliable}
        children={(props) => {
            const { getInputProps, getRef, inputValue } = props
            return (
                <TextInput
                placeholder="Version..."
                value={inputValue}
                innerRef={getRef}
                {...getInputProps({
                    onFocus: () => {
                        props.openMenu()
                      }
                })}
                />
            )
        }}>
    </Autocomplete>
};

export default VersionTable;