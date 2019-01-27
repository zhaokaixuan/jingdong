const puppeteer = require('puppeteer');
const first = require('./puppeteer/first');
const second = require('./puppeteer/second');
const format = require('./db/format');
const insert = require('./db/insert');
const fs = require('fs');
let pageNum = 29;
let num = 841;
let listNum = 13;
let url = `https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3&page=27&s=781&click=0`;

(async () => {
    try {
        console.log(`start visit the target page`);
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            headless: false //是否运行在浏览器headless模式，true为不打开浏览器执行，默认为true
        });
        const page = await browser.newPage();
        page.setViewport({
            width: 1360,
            height: 650
        })
        await page.goto(url, {
            waitUntil: 'networkidle2' //等待页面不动了，说明加载完毕了
        });
        await page.click('.p-num .curr');
        await page.waitFor('#J_goodsList > ul > li:nth-child(60)');
        await page.click('#J_goodsList > ul > li:nth-child(1) > div > div.p-img > a > img');
        page.click('#J_goodsList > ul > li:nth-child(1) > div > div.p-img > a > img'),
        console.log(browser.pages())
        page.waitForNavigation(),
          await page1.click('#detail ul  li[data-anchor=#comment]');
          await page1.waitFor('.J-comment-info .comment-percent .percent-con');
          var result = await page1.evaluate(() => {
            let $ = window.$;
            let jd = $('#crumb-wrap').find('.contact .u-jd').text().replace(/[\n\r\s\\]/g,'');//自营
            let shop = $('#crumb-wrap .J-hove-wrap .name').text().replace(/[\n\r\s\\]/g,'');//商店
            let name = $('.product-intro').find('.itemInfo-wrap .sku-name').text().replace(/[\n\r\s\\]/g,'');//名字
            let price = $('.product-intro').find('.summary-first .summary-price .p-price .price').text().replace(/[\n\r\s\\]/g,'');//价格
            let pingjia = $('.product-intro').find('.summary-first .summary-info .count').text().replace(/[\n\r\s\\]/g,'');//上方评价数
            let cuxiao = $('.product-intro').find('.summary-first #J-summary-top .dt').text().replace(/[\n\r\s\\]/g,'');//促销
            let cuxiaoContent = $('.product-intro').find('.summary-first #J-summary-top .dd').text().replace(/[\n\r\s\\]/g,'');//促销内容
            let shangpinpingjia = Array.from($('.score-parts .score-part')).map((item)=>{return {[$(item).find('.score-desc').text()]:$(item).find('.score-detail em').text()}});//商品评价，物流履行，售后服务
            let shangpinjieshaoTap = $('#parameter-brand > li').text().replace(/[\n\r\s\\]/g,'');//品牌
            let shangpinxinxiTap = Array.from($('.parameter2 li')).map((item)=>{return $(item).text().replace(/[ \n\r\s\\]/g,'')});//商品信息
            let guigebaozhaungTap = aa = Array.from($('.Ptable .Ptable-item')).map((item)=>{
                let biaoti = $(item).find('h3').text().replace(/[\n\r\s\\]/g,'');
                let xinxi = Array.from($(item).find('.clearfix')).map((val)=>{
                    return {name:$(val).find('dt').text().replace(/[ \n\r\s\\]/g,''),value:$(val).find('dd').text().replace(/[ \n\r\s\\]/g,'')}
                })
                return {biaoti:biaoti,xinxi:xinxi};
            });//规格包装
            let aaName = $('.J-comment-info .comment-percent .percent-tit').text().replace(/[ \n\r\s\\]/g,'');
            let  aaValue= $('.J-comment-info .comment-percent .percent-con').text().replace(/[ \n\r\s\\]/g,'');
            let e = Array.from($('.J-comment-info .percent-info .tag-list span')).map((item)=>{
                return $(item).text().replace(/[ \n\r\s\\]/g,'');
            });
            let g = [{name:aaName,value:aaValue},{xinxi:e}];
            let pingjia1 = g;//商品评价小细节
            let pingjia2 = Array.from($('.J-comments-list').find('.filter-list li a')).map((item)=>{
                return $(item).text().replace(/[ \n\r\s\\]/g,'');
            });//评价数量信息
            let result = {
                jd,
                shop,
                name,
                price,
                pingjia,
                cuxiao,
                cuxiaoContent,
                shangpinpingjia,
                shangpinjieshaoTap,
                shangpinxinxiTap,
                guigebaozhaungTap,
                pingjia1,
                pingjia2
            }
    
            return result;
    
        })
        console.log(result)
        browser.close();
    } catch (err) {
        console.log(err)
    }

})()