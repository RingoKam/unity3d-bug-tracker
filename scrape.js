const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require("util");
const fixPage = 10;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://issuetracker.unity3d.com/');
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    const lastPageNumber = await page.evaluate(() => {
        const lastPageSpace = -2;
        const count = document.querySelector(".paging-wrapper .pagination").childElementCount;
        const lastPage = count + lastPageSpace;
        const lastPageNum = document.querySelector(".paging-wrapper .pagination").children[lastPage].text
        return lastPageNum;
    });

    console.log("Last Page is", lastPageNumber); //lets stop it and see what we get

    const pagesResult = {};
    for (let i = 1; i <= fixPage; i++) { 
        //do this for each page...
        await page.goto(`https://issuetracker.unity3d.com/?page=${i}`);
        console.log("i am on page ", i);
        let result = await page.evaluate(() => {
            const issueList = document.querySelectorAll(".g12.nest.idea.rel");
            const issueListCount = issueList.length;
            const pResult = Array(issueListCount).fill().map((d, i) => {
                const issue = issueList[i];
                //hmmmm, what do you think 
                let r = {
                    status: issue.querySelector(".status").textContent, //status
                    count: issue.querySelector(".count").textContent, //count 
                    title: issue.querySelector(".cn.tdn").text, //title
                    url: issue.querySelector(".cn.tdn").href, //url
                    category: issue.querySelector("p:nth-child(1) > span > a").text, // category
                    date: issue.querySelector("p:nth-child(3)").textContent,  //date
                    version: issue.querySelector("p:nth-child(5)").textContent, //version 
                    detail: issue.querySelector(".bulk.mb0.clear").textContent, //detai
                };
                return r;
            })
            //this is declaring a key value pair, with i as key, and our loop result as value
            console.log(pResult);
            return pResult; //naming stuff is hard
        })
        pagesResult[i] = result; //naming stuff is hard
    }
    return util.promisify(fs.writeFile)("./public/data.json", JSON.stringify(pagesResult)).finally(() => browser.close());
})();