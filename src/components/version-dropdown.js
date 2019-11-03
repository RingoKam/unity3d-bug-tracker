import React from "react";
import { StaticQuery, graphql } from "gatsby";
import _ from "lodash";
import { Autocomplete, TextInput } from "evergreen-ui"

const VersionTable = ({nodes, onSelect}) => {
    console.log(nodes);
    const groupedByVersion = _.groupBy(nodes, node => node.title);
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