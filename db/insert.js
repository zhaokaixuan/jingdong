const mysql = require('mysql');
const database = require('./database');
console.log(database)
const pool = mysql.createPool(database);
function insert(values,callback){
    let sql = 'INSERT INTO `jingdong`(`sku`, `jd`, `shop`, `name`, `price`, `pingjia`, `cuxiao`, `cuxiaoContent`, `shangpinpingjia`, `shangpinjieshaoTap`, `shangpinxinxiTap`, `guigebaozhaungTap`, `pingjia1`, `pingjia2`, `page`, `index`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    pool.getConnection(function(err,connection){
        if(err){throw err;return;}
        connection.query(sql,values,function(error,results,fields){
            //将链接返回到连接池中，准备由其他人重复使用
            connection.release();
            if(error) throw error;
            //执行回调函数，将数据返回
            callback && callback(true);
        });
    });
}
module.exports =insert;

