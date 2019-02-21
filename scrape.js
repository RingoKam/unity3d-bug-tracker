const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require("lodash");
const tabSize = 10;

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

    const group = Math.ceil(parseInt(lastPageNumber) / tabSize);

    for (let i = 0; i <= group; i++) {
        const tasks = Array(tabSize).fill().map(async (d, ii) => {
            const pageNumber = (i * tabSize) + ii + 1;
            if (pageNumber > lastPageNumber) {
                return;
            }
            const newPage = await browser.newPage();
            console.log("going to ", pageNumber);
            await newPage.goto(`https://issuetracker.unity3d.com/?page=${pageNumber}`);
            console.log("i am on ", pageNumber);
            let result = await newPage.evaluate(() => {
                const issueList = document.querySelectorAll(".g12.nest.idea.rel");
                const issueListCount = issueList.length;
                const pResult = Array(issueListCount).fill().map((d, i) => {
                    const issue = issueList[i];
                    //hmmmm, what do you think 
                    let r = {
                        status: issue.querySelector(".status").textContent.trim(), //status
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
                return pResult; //naming stuff is hard
            })
            await newPage.close();
            return result;
        });
        const taskResults = await Promise.all(tasks);
        const flattenedTaskResults = _.flatten(taskResults);
        fs.writeFile(`./data/data${i}.json`, JSON.stringify(flattenedTaskResults), () => {
            console.info(`data${i} written!`);
        });
    }
    await browser.close();
})();