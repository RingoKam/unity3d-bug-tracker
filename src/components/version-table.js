import React from "react";
import _ from "lodash";
import { Table } from "evergreen-ui";
import StatusBadge from "../components/status-badge";

const VersionTable = ({data, height}) => {
    const headers = ["title", "category", "status", "count", "url"];
    const headersRow = headers.map(key => (
        <Table.TextHeaderCell key={key}>{key}</Table.TextHeaderCell>
    ));
    const tableRows = data
        .sort((d, dd) => dd.count - d.count)
        .map(rData => {
            return (
                <Table.Row key={rData.id}>
                    {headers.map((h, i) => (
                        <Table.TextCell key={i}>
                            {h === "status" ? StatusBadge(rData[h]) : rData[h]}
                        </Table.TextCell>
                    ))}
                </Table.Row>
            );
        });
    return (
        <Table>
            <Table.Head>
                {/* <Table.SearchHeaderCell /> */}
                {headersRow}
            </Table.Head>
            <Table.Body height={height}>{tableRows}</Table.Body>
        </Table>
    );
};

export default VersionTable;
