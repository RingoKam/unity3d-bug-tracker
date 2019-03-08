import React, { useState } from "react";
import _ from "lodash";
import {
    Table,
    Popover,
    Position,
    Menu,
    Text,
    IconButton,
    TextDropdownButton,
    Pill,
    Button
} from 'evergreen-ui';
import StatusBadge from "../components/status-badge";
import { sca } from "d3-scale"

const Order = {
    NONE: 'NONE',
    ASC: 'ASC',
    DESC: 'DESC'
}

const VersionTable = ({ data, height }) => {
    const [state, setState] = useState({
        searchQuery: '',
        orderedColumn: "",
        ordering: Order.NONE,
    })
    const headers = ["title", "category", "status", "url"];
    const getIconForOrder = order => {
        switch (order) {
            case Order.ASC:
                return 'arrow-up'
            case Order.DESC:
                return 'arrow-down'
            default:
                return 'caret-down'
        }
    }

    const headersRow = () => {
        return (
            <>
                <Table.TextHeaderCell>
                    <Popover
                        position={Position.BOTTOM_LEFT}
                        content={({ close }) => (
                            <Menu>
                                <Menu.OptionsGroup
                                    title="Order"
                                    options={[
                                        { label: 'Ascending', value: Order.ASC },
                                        { label: 'Descending', value: Order.DESC }
                                    ]}
                                    selected={
                                        state.orderedColumn === 2 ? state.ordering : null
                                    }
                                    onChange={value => {
                                        setState({
                                            orderedColumn: 2,
                                            ordering: value
                                        })
                                        // Close the popover when you select a value.
                                        close()
                                    }}
                                />
                            </Menu>)}>
                        <TextDropdownButton
                            icon={
                                state.orderedColumn === 2
                                    ? getIconForOrder(state.ordering)
                                    : 'caret-down'
                            }
                        >
                            Category
                    </TextDropdownButton>
                    </Popover>
                </Table.TextHeaderCell>
                <Table.TextHeaderCell>
                    <Popover
                        position={Position.BOTTOM_LEFT}
                        content={({ close }) => (
                            <Menu>
                                <Menu.OptionsGroup
                                    title="Order"
                                    options={[
                                        { label: 'Ascending', value: Order.ASC },
                                        { label: 'Descending', value: Order.DESC }
                                    ]}
                                    selected={
                                        state.orderedColumn === 2 ? state.ordering : null
                                    }
                                    onChange={value => {
                                        setState({
                                            orderedColumn: 2,
                                            ordering: value
                                        })
                                        // Close the popover when you select a value.
                                        close()
                                    }}
                                />
                            </Menu>)}>
                        <TextDropdownButton
                            icon={
                                state.orderedColumn === 2
                                    ? getIconForOrder(state.ordering)
                                    : 'caret-down'
                            }
                        >
                            Status
                    </TextDropdownButton>
                    </Popover>
                </Table.TextHeaderCell>
                <Table.TextHeaderCell>url</Table.TextHeaderCell>
            </>
        )
    }
    const tableRows = data
        .sort((d, dd) => dd.count - d.count)
        .map(rData => {
            return (
                <Table.Row key={rData.id}>
                    <Table.TextCell flexBasis={450} flexShrink={1} flexGrow={1} title={rData.title}>
                        <Pill>{rData.count}</Pill>
                        <Text>{rData.title}</Text>
                    </Table.TextCell>
                    <Table.TextCell flexBasis={100} flexShrink={0} flexGrow={0}>
                        {rData.category}
                    </Table.TextCell>
                    <Table.TextCell>
                        {StatusBadge(rData.status)}
                    </Table.TextCell>
                    <Table.TextCell>
                        <IconButton appearance="minimal" icon="link" title={rData.url} onClick={() => document.location.href = rData.url} />
                    </Table.TextCell>
                </Table.Row>
            );
        });

    const handleFilterChange = value => {
        setState({ searchQuery: value })
    }

    return (
        <Table>
            <Table.Head>
                <Table.SearchHeaderCell
                    flexBasis={450} flexShrink={1} flexGrow={1}
                    onChange={handleFilterChange}
                    value={state.searchQuery} />
                {headersRow()}
            </Table.Head>
            <Table.VirtualBody height={height}>{tableRows}</Table.VirtualBody >
        </Table>
    );
};

export default VersionTable;
