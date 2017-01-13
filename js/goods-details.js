$(function  () {
	
	
	//取出购物车的商品数量
	function pageNum () {
		var Number = 0;
		var oldCart = $.cookie("cart");
		if (oldCart) {
			oldCart = JSON.parse(oldCart)
			console.log("old"+oldCart.length);
			for (var j=0;j<oldCart.length;j++) {
				Number +=oldCart[j].num;//需要在页面显示的商品数量
			}
			$('.car-icon span').html(Number);
			$('#end').html(Number);
			
		}
	}
	//已加载页面调用一次，读取数量
	pageNum();
	
	
	
	$("#menu,#cart-all").hover(function  () {
		$('#cart-all').show();
	},
	function  () {
		$('#cart-all').hide();
	})
	
	//获取图片的json数据
	$.get("json/goods-show-pic.json",function  (data) {
		for (var i=0;i<data.length;i++) {
			var obj = data[i]
			$('#show-small li img').eq(i).attr('src',obj.img);
			
		}
		$('#show img').attr('src',data[0].img);
	})
	
	//商品小图点击切换大图
	$('#show-small li').click(function  () {
		//获得小图的图片路径
		var smallSrc = $(this).find('img').attr('src')
		$('#show img').attr('src',smallSrc)
	});
	
	
	
	//======放大镜效果=====
	(function  () {
		var smallImg = $('#show');//小图
		var smallArea = $('#showArea');//小图区域
		var bigImg = $('#showBigImg');//大图
		var bigArea = $('#showBig');//大图区域
		
		
		//设置小区域的宽高
		smallArea.width(smallImg.width()/bigImg.width()*bigArea.width());
		smallArea.height(smallImg.height()/bigImg.height()*bigArea.height());
		//设置放大系数
		var scale = bigImg.width()/smallImg.width();
		
		//鼠标移入小图区域
		smallImg.mousemove(function  (e) {
			//设置大图的图片路径
			var Ssrc = smallImg.find('img').attr('src');
			bigImg.attr('src',Ssrc);
			//显示图片区域
			smallArea.fadeIn(300);
			bigArea.fadeIn(300);
			
			//计算小区域的移动位置
			var x= e.pageX - smallImg.offset().left - smallArea.width()/2;
			var y = e.pageY - smallImg.offset().top - smallArea.height()/2;
			
			//边界检测
			if (x<=0) {//判断是否超出左边界
				x=0;
			}else if (x>=smallImg.width()-smallArea.width()) {//判断是否超出右边界
				x=smallImg.width()-smallArea.width();
			}
			if (y<=0) {//判断是否超出上边界
				y=0;
			} else if (y>=smallImg.height()-smallArea.height()) {
				y=smallImg.height()-smallArea.height();
			}
			
			//让小图区域移动
			smallArea.css({left:x,top:y})
			//让大图移动
			bigImg.css({left:-x*scale,top:-y*scale})
			
		})
		//鼠标移出区域隐藏
		smallImg.mouseleave(function  () {
			smallArea.fadeOut(300);
			bigArea.fadeOut(300);
		})
		
	})();
	
	
	
	
	
	
	
	
	
	//获取商信息的json数据
	$.get("json/goodsInfo.json",function  (data) {
		var obj = data[0];
		$('.trade-title,.shop-title').html(obj.title);
		$('.shop-ad').html(obj.shopad);
		$('.t-price').html(obj.tprice);
		$('.b2').html(obj.sales+"套");
		$('.b3').html(obj.assess);
		$('.d2').html(obj.stock);
	})
	
	//数量加减
	var num = 1;
	$('.jian').click(function  () {
		num = $('.Val').val();
		num--;
		if (num<=1) {
			num=1;
		}
		$('.Val').val(num);
	})
	$('.jia').click(function  () {
		num = $('.Val').val();
		num++;
		if (num>=99) {
			num=99;
		}
		$('.Val').val(num);
	})
	
	
	
	
	
	
	
	//商品分类列表手风琴效果
	$('.store-class s').click(function  () {//点击展开
		var index = $(this).index('.sc2 s');
		var self = $(this);
		$('.store-class .cc').stop().eq(index).slideToggle(300,function  () {
			if ($('.store-class .cc').eq(index).css('display')=="none") {
				self.addClass("sc2b").removeClass('sc2a');
			} else if ($('.store-class .cc').eq(index).css('display')=="block") {
				self.addClass("sc2a").removeClass('sc2b');
			}
		});
			
	})
	
	
	//热门商品切换
	$('.pop0 h3').mouseenter(function  () {
		var index = $(this).index();
		$(this).addClass("cur").siblings('h3').removeClass('cur');
		$('.pop1').eq(index).show().siblings('.pop1').hide();
		
		
	})
	
	
	//========详情tab切换
	$('.t-tab li').click(function  () {
		$(this).addClass('t-active').siblings('li').removeClass('t-active');
		
	});
	
	//tab切换的吸顶效果
	(function  () {
		var _top = $('.t-tab').offset().top;
		$(window).scroll(function  () {
			var _scrollTop = $(window).scrollTop();
			if (_scrollTop>=_top) {
				$('.t-nav .t-tab').addClass('t-float');
			} else{
				$('.t-nav .t-tab').removeClass('t-float');
			}
		})
	})();
	
		
		
	
	
	
	//======详情页大图
	$.get("json/goods-show-pic.json",function  (data) {
		for (var i=5;i<data.length;i++) {
//			console.log(obj.img)
			var obj = data[i];
			var index = i-5;
			$('.details-pic img').eq(index).attr('src',obj.img);
			
		}
		
	})
	
	
	
	
	
	//加入购物车 飞入效果
	//======加入购物车点击事件==========
		var offset = $('#end').offset();//结束的地方的元素
		$('.addCar').click(function  (e) {
			var addcar = $(this);
			var img = $('#show img').first().attr('src');
			
			var flyer = $('<img class="u-flyer" src="'+img+'">');
			flyer.fly({
				start:{
					left:e.clientX,
					top:e.clientY
				},
				end:{
					left:offset.left,
					top:270,
					width:0,
					height:0
				}
			});
			goodsNum = parseInt($('.Val').val())*1 ;//调用之前重新再取一下数量的值
			//调用加入购物车的方法
			addMycart ();
			pageNum();
		})
		
		
		
		//初始化页面需要添加的商品信息
		var goodsId = null;
		var goodsName = null;
		var goodsPrice = null; 
		var goodsImg = null;
		var goodsNum = null;
		
		//============填充对应的商品详情
		//先获取到页面的id
		var mId = location.search.slice(1);
		
		//遍历json，渠道当前的商品信息
		$.get("json/goodsMenu.json",function  (data) {
			for (var i=0;i<data.length;i++) {
				//找到对应的商品
				if (mId==data[i].id) {
					var obj = data[i];//此时的obj就是当前的商品信息
					
					//商品变量赋值
					goodsId = obj.id;
					goodsName = obj.title;
					goodsPrice = obj.price;
					goodsImg = obj.img;
					
					
					//调用填充方法
					fill(obj);
				}
				
			}
			
		})
	
	
	//填充商品信息的方法
	function fill (obj) {
		$('.trade-title,.shop-title').html(obj.title);
		$('title').html(obj.title);
		$('.t-price').html(obj.price);
		$('#show img').attr('src',obj.img);
		$('#show-small li img').eq(0).attr('src',obj.img);
		$('#show-small li img').eq(1).attr('src',obj.img);
		$('#show-small li img').eq(2).attr('src',obj.img);
		$('#show-small li img').eq(3).attr('src',obj.img);
		$('#show-small li img').eq(4).attr('src',obj.img);
	}
	
	
	//===========存储加入购物车的商品信息到cookie
	
	function addMycart () {
		
		//使用cookie将商品加入购物车
		//如果是第一次添加购物车，则$.cookie("cart")是undefined，那么arr赋值为空数组
		//如果是第二次开始加入购物车(购物车中有商品)，则需要使用原来的商品
		var arr = $.cookie('cart')?JSON.parse($.cookie('cart')):[];
		
		//遍历arr，查找原来购物车中是否存在相同的商品，如果存在，则添加数量
		var isExist = false;//判断是否存在相同商品的变量
		for (var i=0;i<arr.length;i++) {
			var obj = arr[i];//原来购物车中的商品
			if (obj.id==goodsId) {
				//如果存在相同的商品，则增加数量
				obj.num=parseInt($('.Val').val())*1+obj.num;
				isExist = true;
			}
			
		}
		
		//如果不存在相同的商品，则添加该新商品到购物车中
		if (isExist==false) {
			var goods = {
				id:goodsId,
				name:goodsName,
				price:goodsPrice,
				img:goodsImg,
				num:goodsNum
			}
			arr.push(goods);
		}
		
		
		//json序列化
		var arrStr = JSON.stringify(arr);
		
		//保存到cookie中
		$.cookie("cart",arrStr,{expires:30,path:"/"});
		console.log($.cookie("cart"));
	}
	
	
	
	
	
	
	
	//删除cookie
//	$.cookie("cart","",{expires:0,path:"/"})
	
	
	
	
	
	
})