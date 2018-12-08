//var https = require('https');
//var cheerio = require('cheerio')
//const hupuUrl = 'http://www.doubannv.net/group/';
//https.get(hupuUrl,function(res,req){
//var html='';
//  res.on('data',function(data){
//      html+=data;
//  });
//  res.on('end',function(){
//      console.info(html);
//})
//console.log(html);
//$ = cheerio.load('html')
//})

var superagent = require('superagent');
var cheerio = require('cheerio');

function  getall(callback) {
//	var url1 = 'https://www.douban.com/photos/album/127477691/?from=tag'
	var url1 = 'https://www.douban.com/photos/album/1615300520/'
//这里的URL也可以是绝对路径
superagent.get(url1)
.end(function(req,res){
//do something
//  console.log(res.text)

    $ = cheerio.load(res.text);
//  console.log($('.photo_wrap').length)
    var nice = []
    var slideList = $('.photolst_photo');
//  console.log(slideList)
    slideList.each(function(index, value){
       		 var pic = $(value);
            // 找到a标签的子标签img并获取_src
            var pic_src = pic.children('img').attr('src')
             nice.push({
                pic_src : pic_src
            });
            
    })
//  console.log(nice)
   	callback(nice)
})
}



var mongoConnectMin = require('./model/mogoconnectmin.js');

function getmany(nice) {
//	getall(nice)
//将其放到数据库中
	mongoConnectMin('douban').then(({data,db}) => {
		data.insert({
			tupian: nice
		}, function(err,red){
			if(err) throw err;
			
		})
	})
	
	
	
	


}
getall(getmany)




//var html =""
//	console.log(nice)
//	nice.map(function(value, index) {
//		html += `
//			<li>
//				<img src="${value.pic_src}"/>
//			</li>
//		`
//	})
//	$('#wode').html(html)