var express = require('express');
var router = express.Router();
var mongoConnectMin = require('../model/mogoconnectmin.js');

//公共接口
//router.get('/', function(req, res, next) {
//res.send('all');
//});

//公共轮播添加
router.post('/banner', function(req, res, next) {
  //添加 img 和 alt
  console.log(req.body)
  mongoConnectMin('banner').then(({data, db}) => {
  	data.insert({
  		img: req.body.img,
  		alt: req.body.alt
  	}, function(err, red){
  		if(err) throw err;
  		res.json({
  			state: 0,
  			masg: '插入成功'
  		})
  		db.close()
  	})
  })
  
});

//公共轮播查询
router.post('/getbanner', function(req, res, next) {
  //获取 img 和 alt
  mongoConnectMin('banner').then(({data, db}) => {
  	data.find({}).toArray(function(err, red){
  		if(err) throw err;
//		console.log(red)
  		res.json(red)
  	})
})
});

// 限时抢购商品 添加（一次性用品）
router.post('/timeproduc', function(req, res, next) {
  //添加 img 和 alt
	console.log(req.body)
mongoConnectMin('timeproduct').then(({data, db}) => {
	data.insert(req.body, function(err, red){
		if(err) throw err;
		res.json({
			state: 0,
			masg: '插入成功'
		})
		db.close()
	})
})
});

//限时抢购商品 获取
router.post('/gettimeproduc', function(req, res, next) {
	console.log(req.body)
mongoConnectMin('timeproduct').then(({data, db}) => {
	data.find({}).toArray((err, red) => {
		res.json(red)
	})
})
});

// 添加公共商品（ 商品pid , 图片pimg , 名字 pname ， 描述 pdev ，价格 pprice  ）
// 之后根据商品id 获取商品详情  
router.post('/product', function(req, res, next) {
//  添加 img 和 alt
  let r1 = Math.floor(Math.random() * 10);
  let r2 = Math.floor(Math.random() * 10);
  let pid = `${r1}${(Date.parse(new Date())) / 1000}${r2}`;
	console.log(req.body)
mongoConnectMin('product').then(({data, db}) => {
	data.insert({
		pid:pid,
		pimg:req.body.pimg,
    pname:req.body.pname,
    pdev:req.body.pdev,
    pprice:req.body.pprice,
	}, function(err, red){
		if(err) throw err;
		res.json({
			state: 0,
			masg: '插入成功',
			pid: pid
		})
		db.close()
	})
})
});

//获取公共商品
router.post('/getproduct', function(req, res, next) {
	console.log(req.body)
mongoConnectMin('product').then(({data, db}) => {
	data.find({}).toArray((err, red) => {
		res.json(red)
	})
})
});

// 根据商品 pid 存入商品详情 穿键新表
// 创建新表mainprodutdetail
router.post('/mainproductdetail', function(req, res, next) {
	
//console.log(req.params)
	console.log(req.body.nihao)
	var nice = JSON.parse(req.body.nihao)
	console.log(nice)
mongoConnectMin('mainproductdetail').then(({data, db}) => {
	data.insert( nice, function(err, red){
		if(err) throw err;
		res.json({
			state: 0,
			masg: '插入成功'
		})
		db.close()
	})
})
});

//根据pid 查询主的商品详情
router.get('/getmainproductdetail', function(req, res, next) {
	console.log(req.query)
mongoConnectMin('mainproductdetail').then(({data, db}) => {
	data.find({pid: req.query.pid}).toArray((err, red) => {
		if(err) throw err;
		red.length ?
		res.json(red) 
		: res.json({msg: '请求错误'})
	})
})
});

// 根据商品 pid 存入商品详情 创建新表
// 创建新表 numproductdetail
router.post('/numproductdetail', function(req, res, next) {
	console.log(req.body)
	var nice = JSON.parse(req.body.nihao)
	console.log(nice)
mongoConnectMin('numproductdetail').then(({data, db}) => {
	data.insert( nice, function(err, red){
		if(err) throw err;
		res.json({
			state: 0,
			masg: '插入成功'
		})
		db.close()
	})
})
});


//根据pid 查询主的商品配置详情
router.get('/getnumproductdetail', function(req, res, next) {
	console.log(req.query)
mongoConnectMin('numproductdetail').then(({data, db}) => {
	data.find({pid: req.query.pid}).toArray((err, red) => {
		if(err) throw err;
		red.length ?
		res.json(red) 
		: res.json({msg: '请求错误'})
	})
})
});


// 根据商品 pid 存入商品详情 创建新表
// 创建新表 detailproductdetail
router.post('/detailproductdetail', function(req, res, next) {
	console.log(req.body)
	var nice = JSON.parse(req.body.nihao)
	console.log(nice)
mongoConnectMin('detailproductdetail').then(({data, db}) => {
	data.insert( nice, function(err, red){
		if(err) throw err;
		res.json({
			state: 0,
			masg: '插入成功'
		})
		db.close()
	})
})
});

//根据pid 查询主的商品详情详情
router.get('/getdetailproductdetail', function(req, res, next) {
	console.log(req.query)
mongoConnectMin('detailproductdetail').then(({data, db}) => {
	data.find({pid: req.query.pid}).toArray((err, red) => {
		if(err) throw err;
		red.length ?
		res.json(red) 
		: res.json({msg: '请求错误'})
	})
})
});

// 搜索商品（ 搜索的是 ）
router.post('/searchproduct', function(req, res, next) {
	console.log(req.body)
mongoConnectMin('product').then(({data, db}) => {
	data.find({pname: { $regex: req.body.keyword, $options: 'i' }  }).toArray((err, doc)=>{
		if(err) throw err;
		res.json({
			code: 0,
			data: doc
		})
	})
	
})
});


//豆瓣妹子福利
router.post('/doubanmeizi', function(req, res, next) {
mongoConnectMin('douban').then(({data, db}) => {
	data.find({}).toArray((err, red) => {
		if(err) throw err;
		red.length ?
		res.json(red) 
		: res.json({msg: '请求错误'})
	})
})
});

module.exports = router;


