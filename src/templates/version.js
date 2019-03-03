import React from "react";
import { Link } from "gatsby";
import { Table } from "evergreen-ui";

import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = d => {
    const data = d.pageContext.data;
    const headers = ["title", "category", "status", "count",  "url"]
    const headersRow = headers.map(key => (
        <Table.TextHeaderCell key={key}>{key}</Table.TextHeaderCell>
    ));
    const tableRows = data.map(rData => {
        return (
            <Table.Row key={rData.id}>
                {headers.map((h,i) => (
                    <Table.TextCell key={i}>{rData[h]}</Table.TextCell>
                ))}
            </Table.Row>
        );
    });
    console.log(data);
    const title = d["*"];
    return (
        <Layout>
            <SEO title={title} />
            <Table>
                <Table.Head>
                    <Table.SearchHeaderCell />
                    {headersRow.slice(1)}
                </Table.Head>
                <Table.Body height={240}>
                    {tableRows}
                </Table.Body>
            </Table>
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

export default SecondPage;
