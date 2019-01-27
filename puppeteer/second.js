
async function second(page,url){
    await page.goto(url, {
        waitUntil: 'networkidle2' //等待页面不动了，说明加载完毕了
    });
    await page.click('#detail ul  li[data-anchor=#comment]');
    await page.waitFor('.J-comment-info .comment-percent .percent-con');
    var result = await page.evaluate(() => {
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
    return result;
}
module.exports = second;