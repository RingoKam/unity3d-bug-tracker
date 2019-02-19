const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://issuetracker.unity3d.com/');
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    const lastPage = await page.evaluate(() => {
        const lastPageSpace = -2;
        const count = document.querySelector(".paging-wrapper .pagination").childElementCount;
        const lastPage = count + lastPageSpace;
        const lastPageNum = document.querySelector(".paging-wrapper .pagination").children[lastPage].text
        return lastPageNum;
    });

    console.log("Last Page is", lastPage);

    let result = await page.evaluate((lastPage) => {
        const issueList = document.querySelectorAll(".g12.nest.idea.rel");
        const issueListCount = issueList.length;
        var pageResult = Array(issueListCount).fill().map((d,i) => {
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
            console.log(JSON.stringify(r));
            return r;
        })
        return pageResult;
    }, lastPage);

    await browser.close();
})();