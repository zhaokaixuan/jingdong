/**
 * 获取第一个页面的列表信息
 *  @param {Promise} page 
 * @param {String} url 
 * @returns {Array} -所有的信息
 */
async function first(page,url){
    await page.goto(url, {
        waitUntil: 'networkidle2' //等待页面不动了，说明加载完毕了
    });
    await page.click('.p-num .curr');
    await page.waitFor('#J_goodsList > ul > li:nth-child(60)');
    // await page.click('#J_goodsList > ul > li:nth-child(1) > div > div.p-img');
    //await page.waitForNavigation();
    let pageArr = await page.evaluate(() => {
        let $ = window.$;
        let $items = $('.gl-item');
        let index = 1;
        let arr = [];
        let page = Number($('.p-num .curr').text());
        $items.each(function () {
            arr.push({
                page:page,//页数
                sku:$(this).attr('data-sku'),//sku
                index: index,//排序
                href: $(this).find('.gl-i-wrap .p-img a').attr('href'),//链接
                price: $(this).find('.gl-i-wrap .p-price i').text().replace(/[\n\r\s]/g,''),//价格
                name: $(this).find('.gl-i-wrap .p-name a').attr('title').replace(/[\n\r\s]/g,''),//名字
                commit: $(this).find('.gl-i-wrap .p-commit a').text().replace(/[\n\r\s]/g,''),//评价数
                shop: $(this).find('.gl-i-wrap .p-shop a').text().replace(/[\n\r\s]/g,''),//商店
                icons: Array.from($(this).find('.gl-i-wrap .p-icons i')).map((item)=>{return $(item).text().replace(/[\n\r\s]/g,'')})//标志
            });
            index++;
        })
        return arr;
    })
    return pageArr
}
module.exports = first;