const fs = require("fs");
const _ = require("lodash");
const d3 = require('d3');

const data = JSON.parse(fs.readFileSync("./public/data.json"));
const keys = Object.keys(data);

keys.forEach((key, i) => {
    console.log(key);
    const r = d3.nest()
        .key((d) => d.category)
        .key((d) => d.status)
        .rollup(d => d.length)
        .entries(data[key]);
        console.log(r);
    fs.writeFileSync(`../data/n/data_${i}.json`, JSON.stringify(r));
})



