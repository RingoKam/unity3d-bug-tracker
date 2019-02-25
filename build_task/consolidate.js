const glob = require("glob");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../data");

glob(`${dir}/data*.json`, (err, files) => {
    console.log(`reading ${files.length} files(s)`);
    const jsonResult = files.reduce((acc, file) => {
        console.log(file);
        const f = fs.readFileSync(file);
        const dataArray = JSON.parse(f);
        acc.push(...dataArray.filter(d => d != null));
        return acc;
    }, []);
    const targetDir = path.join(`${dir}/../src/data/`);
    fs.writeFileSync(targetDir + "data.json", JSON.stringify(jsonResult));
    console.log("all done!")
})