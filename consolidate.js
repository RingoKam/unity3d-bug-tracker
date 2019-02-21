const glob = require("glob");
const fs = require("fs");

glob("./data/data*.json", (err, files) => {
    console.log(`reading ${files.length} files(s)`);
    const jsonResult = files.reduce((acc, file) => {
        const f = fs.readFileSync(file);
        const dataArray = JSON.parse(f);
        return dataArray.filter(d => d != null).reduce((a,d) => {
            if(acc[d.version]) {
                acc[d.version].push(d);
            } else {
                acc[d.version] = [d];
            }
            return a;
        }, acc)
    }, {});
    fs.writeFileSync("./public/data.json", JSON.stringify(jsonResult));
    console.log("all donde!")
})