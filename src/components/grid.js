import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
const grid = ({ data, height, columns }) => {

    let gridColumnDefs = [];
    
    if(columns) {
        gridColumnDefs = columns.map(col => ({ ...col, sortable: true, filter: true }));
    } else {
        const cols = Object.keys(data[0]);
        gridColumnDefs = cols.map(col => ({ headerName: toTitleCase(col), field: col, sortable: true, filter: true }));
    }

    const gridData = {
        columnDefs: gridColumnDefs,
        rowData: data
    }

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    return (
        <div 
            className="ag-theme-balham"  
            style={{
                height: "100%", 
                width: "100%" 
            }}>
            <AgGridReact reactNext={true} { ...gridData } >
            </AgGridReact>
        </div>
    )
}

export default grid;