var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbname = "shop";

//使用promise封装下数据库连接
function mongoConnectMin(users){
    var p = new Promise(function (resolve,reject) {
        MongoClient.connect(url,function (err,db) {
            if(err) reject(err);
            var dbo = db.db(dbname);
            dbo.collection(users,function(err,data){
                if(err) reject(err);
                resolve({data,db})
            })
        })
    })
    return p
}
module.exports = mongoConnectMin
