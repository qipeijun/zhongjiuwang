$(function  () {
	
	
	//取出购物车的商品数量--------------------
	function pageNum () {
		var Number = 0;
		var oldCart = $.cookie("cart");
		if (oldCart) {
			oldCart = JSON.parse(oldCart)
			for (var j=0;j<oldCart.length;j++) {
				Number +=oldCart[j].num;//需要在页面显示的商品数量
			}
			//判断购物车还有没有商品
			if (Number<1) {
				$('.cart-outer').hide();//隐藏购物车模板
				$('.rec-outer').show();//显示推荐
			};
			$('.car-icon span').html(Number);
			$('#end').html(Number);
			$('.count').html(Number);
		}
	}
	//已加载页面调用一次，读取数量
	pageNum();
	
	
	
	
	//判断是否已经有用户登录
	//自动填写上次保存的用户名和密码
	var oldLoginUser = $.cookie("loginUser");
	if (oldLoginUser) {
		oldLoginUser = JSON.parse(oldLoginUser);
		
		$('#login').empty();//如果登录成功，删除注册登录提示
		
		var aNode = $("<a href='#'>"+oldLoginUser.username+"</a><a href='#'>[退出]</a>");
		aNode.appendTo($('#login'))
		
		
	}
	
	//退出
	$("#login a").eq(1).click(function(){
		$.cookie("loginUser", "", {expires:0, path:"/"});
		location.reload();
	})
	
	
	
	//我的中酒网下拉菜单
	$(".my-zjw,.dropdown-menu").hover(function  () {//鼠标移入
		$('.my-zjw').find('b').removeClass('dropdown');
		$(".my-zjw").css({"background":'white',"border":"1px solid ##CECECE"}).find('b').addClass('dropup');
		
		$(".dropdown-menu").show();
	},
	function  () {//鼠标移出
		$('.my-zjw').find('b').removeClass('dropup');
		$(".my-zjw").css({"background":"","border":"none"}).find('b').addClass("dropdown");
		$(".dropdown-menu").hide();
	})
	
	//卖家中心下拉菜单
	$(".seller,.dropdown-menu-2").hover(function  () {//鼠标移入
		$('.seller').find('b').removeClass('dropdown');
		$(".seller").css({"background":'white',"border":"1px solid ##CECECE"}).find('b').addClass('dropup');
		$(".dropdown-menu-2").show();
	},
	function  () {//鼠标移出
		$('.seller').find('b').removeClass('dropup');
		$(".seller").css({"background":"","border":"none"}).find('b').addClass("dropdown");
		$(".dropdown-menu-2").hide();
	})
	
	
	//微信二维码
	$('.wx,.dropdown-wx').hover(function  () {//鼠标移入
		$('.dropdown-wx').show();
	},
	function  () {//鼠标移出
		$('.dropdown-wx').hide();
	})
	
	//下载客户端二维码
	$('.app,.dropdown-download').hover(function  () {//鼠标移入
		$('.dropdown-download').show();
	},
	function  () {//鼠标移出
		$('.dropdown-download').hide();
	})
		
	
	
	
	
	//=============购物车结算==========
	//初始化一个数组，用来保存每个商品的选择状态
	var checkArr = [];
	
	//初始化，让checkArr的数组长度和购物车的商品种类数量一致，并默认都是选择状态
	//从cookie中获取商品的信息
	var arr = $.cookie("cart");
	if (arr) {
		arr = JSON.parse(arr);
		$.each(arr,function  () {
			checkArr.push(true);
		})
	}
	
	//显示购物车商品
	refreshCart ();
	
	
	//刷新购物车的方法   重新从cookie中获取，然后在购物车中显示
	function refreshCart () {
		var arr = $.cookie("cart");
		if (arr) {
			//如果购物车中有商品，则删除提示的节点=--------------
			$('.rec-outer').hide();//隐藏推荐
			$('.cart-outer').show();//显示购物车模板
			
			arr = JSON.parse(arr);//json解析
			
			//先清除旧的购物车商品
			$('.cart-c ul').empty();
			
			//然后显示最新的购物车商品
			//遍历购物车的商品并显示
			var firstLiNode = $('<li class="c-bar"><input type="checkbox" checked="checked"/><span>中酒自营店</span></li>')
			$('.cart-c ul').append(firstLiNode);
			var totalPrice = 0;//总价
			
			for (var i=0;i<arr.length;i++) {
				var obj = arr[i];//购物车的每个商品
				
				var LiNode = $('<li class="c-c"></li>')
				
				if (checkArr[i]) {
					$("<input class='in1' type='checkbox' checked='checked' />").appendTo(LiNode);
				}else{
					$("<input class='in1' type='checkbox'/>").appendTo(LiNode);
				}
				
//				LiNode.append($('<input class="in1" type="checkbox" checked="checked"/>'));
				LiNode.append($('<a href="#"><img src="'+obj.img+'"/></a>'));
				LiNode.append($('<a class="c-title" href="#">'+obj.name+'</a>'));
				LiNode.append($('<span class="Art">商品货号：C0001489</span>'));
				LiNode.append($('<span class="price">￥'+obj.price+'.00</span>'));
				LiNode.append($('<input type="button" class="jian" value="-" />'));
				LiNode.append($('<input type="text" class="vAl" value="'+obj.num+'" />'));
				LiNode.append($('<input type="button" class="jia" value="+" />'));
				LiNode.append($('<a href="#" class="shanchu">删除</a>'));
				
				$('.cart-c ul').append(LiNode);
				
				//求总价
				if (checkArr[i]) {
					totalPrice +=obj.price*obj.num;
				}
			}
			
			//显示总价
			$('.sum').html("￥"+totalPrice+".00");
			
		}
		pageNum();//刷新购物车数量
	}
	
	//增加数量的功能
	$('.cart-c ul').on("click",".jia",function  () {
		var index = $(this).index('.jia');
		
		//从cookie中获取原来的数组
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num++;//把当前的商品数量++
		//再把修改后的数组arr重新保存到cookie中
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		
		//刷新购物车的商品
		refreshCart();
		
	})
	
	
	//减少功能
	$('.cart-c ul').on("click",".jian",function  () {
		
		var index = $(this).index('.jian');
		
		//从cookie中获取原来的数组
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num--;
		if (arr[index].num<1) {
			arr[index].num=1;
		}
		//再把修改后的数组重新保存到cookie中
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		
		//刷新购物车
		refreshCart();
		
	})
	
	//删除功能
	var indexs = null;
	$('.cart-c ul').on("click",'.shanchu',function  () {
		indexs = $(this).index('.shanchu');
		//遮罩显示
		$('.ward').fadeIn(100);
		$('.popup').fadeIn(150);
		
	})
	
	
	
	//点击确定了的方法
		
	$('.yes').click(function  () {
		//从cookie中获取原来的数组
		var arr = 	JSON.parse($.cookie('cart'));
		
		//删除当前的商品
		arr.splice(indexs,1);
		checkArr.splice(indexs,1);//同步checkArr删除当前的选择状态
		//再把修后的数组重新保存到cookie中
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		//刷新购物车
		refreshCart();
		
		//遮罩隐藏
		$('.ward').fadeOut(150);
		$('.popup').fadeOut(100);
	})

	
	//点击取消是隐藏
	$('.no').click(function  () {
		indexs=null;
		$('.ward').fadeOut(150);
		$('.popup').fadeOut(100);
	})
	
	
	
	
	
	//勾选功能
	$('.cart-c ul').on("click",".in1",function  () {
		
		var index = $(this).index('.in1');
		
		checkArr[index] = !checkArr[index];//取反
		
		//刷新购物车的商品
		refreshCart();
		
		//判断是否是全选或者全不选
		var sum = 0;
		$.each(checkArr,function  (i) {
			sum +=checkArr[i];
		})
		if (sum == checkArr.length) {//判断为全选
			$('#dibuBtn').prop("checked",true);
		}else{
			$('#dibuBtn').prop("checked",false);
		}
		
	})
	
	
	//全选
	$('#dibuBtn').click(function  () {
		
		if ($(this).prop("checked")) {//全选
			$.each(checkArr,function  (i) {
				checkArr[i] = true;
			})
		} else{//全不选
			$.each(checkArr,function  (i) {
				checkArr[i] = false;
			})
		}
		//刷新购物车
		refreshCart();
	})
	
	//删除选中功能
	$('#Del').click(function  () {
		//遮罩显示
		$('.ward').fadeIn(100);
		$('.popup1').fadeIn(150);
		
	})
	
	
	$('.yes1').click(function  () {
		
		//从cookie中获取原来的数组
		var arr = JSON.parse($.cookie("cart"));
		
		//修改
		var newArr = [];
		var newCheckArr = [];
		for (var i=0;i<arr.length;i++) {
			if (!checkArr[i]) {//如果是未选中的，则要删除掉
				newArr.push(arr[i]);//将未选中的商品放入新的数组
				newCheckArr.push(checkArr[i]);//将未选中的状态放入新的数组
			}
		}
		
		checkArr = newCheckArr;
		//再把修改后的数组重新保存到cookie中
		$.cookie("cart",JSON.stringify(newArr),{expires:30,path:"/"});
		
		//刷新购物车
		refreshCart();
		//遮罩隐藏
		$('.ward').fadeOut(150);
		$('.popup1').fadeOut(100);
		
		//判断购物车中还有没有商品
		if (checkArr.length<1) {
			$('.cart-outer').hide();//隐藏购物车模板
			$('.rec-outer').show();//显示推荐
			
		}
		
	})
	
	//点击取消是隐藏
	$('.no1').click(function  () {
		$('.ward').fadeOut(150);
		$('.popup1').fadeOut(100);
	})
	
	
	
	//商品推荐hover效果
	
	$('.rec-show li').hover(function  () {
		$(this).find('i').fadeIn(300);
		
	},function  () {
		$(this).find('i').fadeOut(300);
	})
	//点击跳转
	$('.rec-show li').click(function  () {
		location.href ="index.html";
	})
	
	
	
	
	//跳转支付页面
	$('.goto').click(function  () {
		
		if ($('.count').html()>=1) {
			open("pay.html");
		}
	})
	
	
	
	
})