const glob = require("glob");
const fs = require("fs");

glob("./data/data*.json", (err, files) => {
    console.log(`reading ${files.length} files(s)`);
    const jsonResult = files.reduce((acc, file) => {
        const f = fs.readFileSync(file);
        const dataArray = JSON.parse(f);
        acc.push(...dataArray.filter(d => d != null));
        return acc;
    }, []);
    fs.writeFileSync("../src/data/data.json", JSON.stringify(jsonResult));
    console.log("all donde!")
})