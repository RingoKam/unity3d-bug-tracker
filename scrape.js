const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('util')

const tabSize = 5;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

var r = (async () => {
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

    console.log("Last Page is", lastPageNumber);
    //split the page for parralel processing with tab?
    const group = Math.ceil(parseInt(lastPageNumber) / tabSize);
    console.log(group);

    const tabTask = Array(group).fill().map(async (d, index) => {
        const newPage = await browser.newPage();
        const pagesResult = [];
        for (let i = 1; i <= tabSize; i++) {
            const currentPageNumber = (index * tabSize) + i;
            console.log("current page", currentPageNumber);
            if (currentPageNumber > lastPageNumber) {
                break;
            }
            await newPage.goto(`https://issuetracker.unity3d.com/?page=${currentPageNumber}`);
            let result = await newPage.evaluate(() => {
                const issueList = document.querySelectorAll(".g12.nest.idea.rel");
                const issueListCount = issueList.length;
                //individual result from page...
                return Array(issueListCount).fill().map((d, i) => {
                    const issue = issueList[i];
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
            })
            pagesResult.push(result);
        } //end of for loop per tab
        console.log("write file", index);
        await util.promisify(fs.writeFile)(`./data/data${index}.json`, JSON.stringify(pagesResult))
        await newPage.close();
        return true;
    })

    await asyncForEach(tabTask, async (task, i) => {
        console.info("start processing..." , i);
        await task;
        console.info("finish processing..." , i);
    });
    
    await browser.close();
    return true;
    // for (let i = 1; i <= lastPageNumber; i++) { 
    //     //do this for each page...
    //     await page.goto(`https://issuetracker.unity3d.com/?page=${i}`);
    //     console.log("i am on page ", i);
    //     let result = await page.evaluate(() => {
    //         const issueList = document.querySelectorAll(".g12.nest.idea.rel");
    //         const issueListCount = issueList.length;
    //         const pResult = Array(issueListCount).fill().map((d, i) => {
    //             const issue = issueList[i];
    //             let r = {
    //                 status: issue.querySelector(".status").textContent, //status
    //                 count: issue.querySelector(".count").textContent, //count 
    //                 title: issue.querySelector(".cn.tdn").text, //title
    //                 url: issue.querySelector(".cn.tdn").href, //url
    //                 category: issue.querySelector("p:nth-child(1) > span > a").text, // category
    //                 date: issue.querySelector("p:nth-child(3)").textContent,  //date
    //                 version: issue.querySelector("p:nth-child(5)").textContent, //version 
    //                 detail: issue.querySelector(".bulk.mb0.clear").textContent, //detai
    //             };
    //             return r;
    //         })
    //         //this is declaring a key value pair, with i as key, and our loop result as value
    //         console.log(pResult);
    //         return pResult; //naming stuff is hard
    //     })
    //     pagesResult[i] = result; //naming stuff is hard
    // }
    // fs.writeFileSync("data.json", JSON.stringify(pagesResult));

    //should have 3, result[1], result[2], result[3], make sense?
})();
//lets write it to a text file 

r.finally(result => result);