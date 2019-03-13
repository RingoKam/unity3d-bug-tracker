const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require("path");
const _ = require("lodash");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://unity3d.com/get-unity/download/archive');
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    const versionHistory = await page.evaluate(() => {
        const rows = document.querySelectorAll(".version.archive .row");
        console.log(rows.length);
        const result = [];
        for (let index = 0; index < rows.length; index++) {
            try {
                const version = rows[index];
                const title = version.querySelector("h4") ? version.querySelector("h4").textContent.replace("Unity", "").trim() : null;
                const releaseDate = version.querySelector("p").textContent.trim();
                const url = version.querySelector("a").href;
                result.push({
                    title,
                    releaseDate,
                    url
                });
            } catch (error) {
                console.log(index);
            }
        }
        return result;
    });
    const targetDir = path.join(__dirname, "../src/data/");
    fs.writeFileSync(targetDir + "version.json", JSON.stringify(versionHistory));
    console.log("VersionHistory 👌");

    await browser.close();
})()