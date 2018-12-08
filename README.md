# node-
node练手接口项目

下载后可参考代码

因没有提出数据库数据所以没有数据。

有以下接口 其中IP地址为本地IP localhost

传入数据 username password 

2 登录
接口地址：post请求 http://10.8.161.117:3000/users/login

传入数据 username password 

3 公共轮播 post请求 http://10.8.161.118:3000/all/getbanner

 无参数

4 首页的 限时购 http://10.8.161.118:3000/all/gettimeproduc

无参数

5 获取公共商品 http://10.8.161.118:3000/all/getproduct

无参数

6 商品详情的主详情 get请求   http://10.8.161.118:3000/all/getmainproductdetail            
  参数 pid

7 商品详情的配置  
http://10.8.161.118:3000/all/getnumproductdetail

  参数 pid

8 商品详情的详情图片  get请求
http://10.8.161.118:3000/all/getdetailproductdetail

  参数 pid

9 添加购物车
http://10.8.161.118:3000/users/addcart

 参数 uid pid pnun

10 查询购物车
http://10.8.161.118:3000/users/mycart

 参数 uid

11 删除购物车商品
http://10.8.161.118:3000/users/delcart

 参数 uid pid

12 更新购物车的数据
http://10.8.161.118:3000/users/updatacart

 参数 uid pid pnun

13 搜索商品
http://10.8.161.118:3000/all/searchproduct

参数 keyword


后台

添加公共商品 http://10.8.161.118:3000/all/product
