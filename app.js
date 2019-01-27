const puppeteer = require('puppeteer');
const first = require('./puppeteer/first');
const second = require('./puppeteer/second');
const format = require('./db/format');
const insert = require('./db/insert');
const fs = require('fs');
let pageNum = 29;
let num = 841;
let listNum = 13;
let root = `https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3`;
async function fistPage(browser) {
    const page = await browser.newPage();
        page.setViewport({
            width: 1360,
            height: 650
        })
    let url = `${root}&page=${pageNum}&s=${num}&click=0`;
    if (pageNum < 197) {
        let listMsg = await first(page, url);
        await page.close();
        console.log(`---------起线--------第${pageNum}页------------`)
        console.log(listMsg);
        console.log(`---------底线--------第${pageNum}页------------`)
        pageNum += 2;
        num += 60;
        await secondPage(browser, listMsg)
    } else {
        console.log('完成')
        return;
    }
}
async function secondPage(browser, listMsg) {
    if(listNum<60){
        const page = await browser.newPage();
        page.setViewport({
            width: 1360,
            height: 650
        })
        let url = `https:${listMsg[listNum].href}`;
        let secondMsg = await second(page, url);
        await page.close();
        console.log(`----头线----------第${pageNum-2}页-第${listNum}条-----------`)
        console.log(secondMsg);
        console.log(`---底线-----第${pageNum-2}页-第${listNum}条----------------`)
        let values = format(listMsg[listNum],secondMsg);//格式化数据
        console.log(values)
        await fs.writeFileSync('index.json',JSON.stringify(values))
        await insert(values,function(flag){
            if(flag){
                console.log('插入成功');
            }else{
                console.log(`第${pageNum-2}页-第${listNum}条--插入失败`)
            };
        });
        
        listNum++;
        await secondPage(browser,listMsg);
    }else{
        listNum = 0;
        await fistPage(browser);
    }
}
(async () => {
    try {
        console.log(`start visit the target page`);
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            headless: true //是否运行在浏览器headless模式，true为不打开浏览器执行，默认为true
        });
        await fistPage(browser);
        browser.close();
    } catch (err) {
        console.log(err)
    }

})()