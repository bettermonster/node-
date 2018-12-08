var express = require('express');
var router = express.Router();
var mongoConnectMin = require('../model/mogoconnectmin.js')
/* GET users listing. */

//router.get('/', function(req, res, next) {
// next()
//});

//注册操作 传入用户名和密码 判断是否有数据之后 添加操作。

router.post('/register', function(req, res) {
	let r1 = Math.floor(Math.random() * 10);
  	let r2 = Math.floor(Math.random() * 10);
  	let userId = `${r1}${(Date.parse(new Date())) / 1000}${r2}`;
	mongoConnectMin('users').then(function({data, db}){
//		var { userName, passWord } = req.body
			data.find({
				username: req.body.username
			}).toArray((err, red) => {
				console.log(red.length)
				if(red.length > 0) {
					res.json({
							status: '1',
							msg: '账号已存在!',
							result: ''
					})				
				} else {
						// 可以注册
						
				const crypto = require('crypto')
				var md5 = crypto.createHash('md5')
				var pas = md5.update(req.body.password).digest('hex')
		          data.insert({
		          	username:req.body.username,
		          	password:pas,
		          	userId: userId,
		          	uimg: 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%A4%B4%E5%83%8F&step_word=&hs=0&pn=7&spn=0&di=33153157180&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=766495120%2C1807739854&os=1903108758%2C1637384384&simid=3319645939%2C231492188&adpicid=0&lpn=0&ln=3648&fr=&fmq=1542974795294_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=head&bdtype=0&oriquery=%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201406%2F16%2F20140616002407_8fHYa.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Frj5rsjAzdH3F4ks52AzdH3F8cdlln8adAzdH3F1jpwtsAzdH3F&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&selected_tags=0',
               		name: '',
                	cartList: [],
               		orderList: [],
                	addressList: []
		          }, function (err , red) {
		          	if (err) throw err;
		            res.json({
		              status: '2',
									msg: '注册成功!',
									result: ''
		            })
		            db.close()
		          })									
					}
		
				})			
			})
})

//登录接口 判断用户名 密码是否正确
router.post('/login', function(req, res, next) {
	console.log(req.body)
	mongoConnectMin("users").then(({data,db}) => {
		
		const crypto = require('crypto')
		var md5 = crypto.createHash('md5')
		var pas = md5.update(req.body.password).digest('hex')
		data.find({
			username: req.body.username,
      		password: pas
		}).toArray((err, red) =>{
			if(red.length == '1') {
				//设置cookie
//				console.log(red[0].userId)
//				var userids = red[0].userId
//				res.cookie("userId", userids, {
//						path: '/',
//					 	maxAge: 6000002222,
//					 	secure: true
//				});
				res.json({
                status: '0',
                msg: '登陆成功',
                userId: red[0].userId,
                result: {
                	name: red[0].name,
                	uimg: red[0].uimg
                }
            })
//				console.log(red)
				db.close()
			} else {
				res.json({
                status: '1',
                msg: '账号或者密码错误',
                result:''
            })
				db.close()
			}
		})		
	})
});

//购物车部分接口 必须登录有用户的userId（ 添加此商品， 删除此商品， 更新商品的数量， 查看用户有哪些商品  ）
// 先添加吧 先传入商品的pid在公共商品中查找到此商品的详情之后搞到cart表中 并且有用户的uid
router.post('/addcart', function(req, res, next){
	//pid 和 uid 和 pnum
	console.log(req.body)
	mongoConnectMin('product').then(({data, db}) => {
		data.find({pid: req.body.pid}).toArray((err, red) => {
//			console.log(data.find({pid: req.body.pid}))
			if(err) throw err;
//			console.log(red)
			mongoConnectMin('cart').then(({data, db}) => {
				data.insert({
					uid: req.body.uid,
					pid: req.body.pid,
					pnum: req.body.pnum,
					dev: red
				}, function(err, red){
					if(err) throw err;
					res.json({
						state: 0,
						msg: '添加成功'
					})
				})
			})			
			
		})


	})
});

// 查看购物车必须有 用户 ID
router.post('/mycart', function(req, res, next){
	// uid
	console.log(req.body)
	mongoConnectMin('cart').then(({data, db}) => {
		data.find({uid: req.body.uid}).toArray((err, red) => {
			if(err) throw err;
//			console.log(red)
			res.json(red)	
			
		})
	})
});


// 删除购物车的商品
router.post('/delcart', function(req, res, next){
	// uid
	console.log(req.body)
	mongoConnectMin('cart').then(({data, db}) => {
		data.remove({
			uid: req.body.uid,
			pid: req.body.pid,
		},function(){
			res.json({
				state: 0,
				msg: '删除成功'
			})
		})
	})
});


//更新购物车中的数据
router.post('/updatecart', function(req, res, next){
	// uid
	console.log(req.body)
	mongoConnectMin('cart').then(({data, db}) => {
		data.updateOne({
			uid: req.body.uid,
			pid: req.body.pid,
		},{ $set:{pnum:req.body.pnum} },{ multi: true},function(err, red){
			if(err) throw err;
			res.json({
				state: 0,
				masg: '更新成功'
			})
		})
	})
});

module.exports = router;
