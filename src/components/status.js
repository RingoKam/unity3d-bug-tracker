import PropTypes from "prop-types"
import React from "react"
import * as d3 from "d3";
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarStackHorizontal, Bar } from '@vx/shape';

const Status = ({ data }) => {
    const groupedByStatus = d3.nest().key((d) => d.status).rollup(d => d.length).entries(data);
    const statusArray = groupedByStatus.map((v) => {
        return (<div key={v.key}>
            <div >
                {v.key}
            </div>
            <div>
                {v.value}
            </div>
        </div>);
    })



    const statusBar = () => {
        const purple1 = '#6c5efb';
        const purple2 = '#c998ff';
        const purple3 = '#a44afe';
        const key = groupedByStatus.map(v => v.key);
        const values = groupedByStatus.map(v => v.value);
        const color = scaleOrdinal({
            domain: key,
            range: [purple1, purple2, purple3]
        });
        const xScale = scaleLinear({
            domain: [0, Math.max(values)],
            nice: true
        });
        const yScale = scaleBand({
            domain: [1],
            padding: 0.0
        });
        const y = () => 1;
        return (
            <svg>
                <BarStackHorizontal
                    data={values}
                    keys={key}
                    color={color}
                    y={y}
                    yScale={yScale}
                    xScale={xScale}>
                    {
                        barStacks => {
                            return (
                                <g></g>
                            );
                        }
                    }
                </BarStackHorizontal>
            </svg>
        );
    }


    return (
        <div>
            {statusArray}
            {statusBar()}
        </div>
    )
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,

// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Status
