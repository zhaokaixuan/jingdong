function format(obj1,obj2){
    let page = obj1.page,//页数
        sku = obj1.sku,//sku
        index = obj1.index;//排序
    let jd = obj2.jd,//是否是自营
        shop = obj2.shop,//商店名称
        name = obj2.name,//商品名称
        price = obj2.price,//价格
        pingjia = obj2.pingjia,//上方评价数
        cuxiao = obj2.cuxiao,//促销
        cuxiaoContent = obj2.cuxiaoContent,//促销内容
        shangpinpingjia = JSON.stringify(obj2.shangpinpingjia),//商店评价
        shangpinjieshaoTap = obj2.shangpinjieshaoTap,//品牌
        shangpinxinxiTap = JSON.stringify(obj2.shangpinxinxiTap),//商品信息
        guigebaozhaungTap = JSON.stringify(obj2.guigebaozhaungTap),//规格包装
        pingjia1 = JSON.stringify(obj2.pingjia1),//小评价
        pingjia2 = JSON.stringify(obj2.pingjia2);//大评价
    return [sku,jd,shop,name,price,pingjia,cuxiao,cuxiaoContent,shangpinpingjia,shangpinjieshaoTap,shangpinxinxiTap,guigebaozhaungTap,pingjia1,pingjia2,page,index]
}
module.exports = format;