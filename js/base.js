$(function  () {
	
	
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
	
	
	
	//取出购物车的商品数量--------------------
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
	
	//购物车的跳转
	$('.car-icon,.right-car').click(function  () {
		location.href="shopingCart.html";//进入购物车页面
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
	
	
	//搜索框的鼠标点击事件
	$(document).on('click','.seekBy',function  () {
		$('.popup').show();
	})
	
	$('.popup li').on('click',function  () {
		$('.seekBy').html($(this).html()+"<b></b>");
		$('.popup').hide();
	})
	
	
	//搜索框下面的热词
	$('.hot-word a:first').css('color','#E3393C');
	
	
	
	//商品菜单列表的hover效果
	//====================
	$('.white-spirit').hover(function  () {
		$('.cart-more').eq(0).show();
	},
	function  () {
		$('.cart-more').eq(0).hide();
	});
	//================
	$('.grape').hover(function  () {
		$('.cart-more').eq(1).show();
	},
	function  () {
		$('.cart-more').eq(1).hide();
	});
	//==================
	$('.foreign-wine').hover(function  () {
		$('.cart-more').eq(2).show();
	},
	function  () {
		$('.cart-more').eq(2).hide();
	});
	//================
	$('.yellow-wine').hover(function  () {
		$('.cart-more').eq(3).show();
	},
	function  () {
		$('.cart-more').eq(3).hide();
	});
	//=====================
	$('.gift-box').hover(function  () {
		$('.cart-more').eq(4).show();
	},
	function  () {
		$('.cart-more').eq(4).hide();
	});
	//========================
	$('.webbing').hover(function  () {
		$('.cart-more').eq(5).show();
	},
	function  () {
		$('.cart-more').eq(5).hide();
	});
	
	//====================
	$('.cart-more').hover(function  () {
		$(this).show();
	},function  () {
		$(this).hide();
	})
	
	
	
	
	//footer2 模块hover切换zj-icon效果
	var zjIconA = $('.zj-icon a');
	zjIconA.eq(0).hover(function  () {
		$(this).children().attr("src","img/base/zj.png")
	},
	function  () {
		$(this).children().attr("src","img/base/zj2.png")
	})
	
	zjIconA.eq(1).hover(function  () {
		$(this).children().attr("src","img/base/ls2.png")
	},
	function  () {
		$(this).children().attr("src","img/base/ls.png")
	})
	
	zjIconA.eq(2).hover(function  () {
		$(this).children().attr("src","img/base/yt2.png")
	},
	function  () {
		$(this).children().attr("src","img/base/yt.png")
	})
	
	
	
	//=================右侧工具栏
	$('.btn-top').click(function  () {
		$('html,body').stop().animate({scrollTop:0},300);
	})
	$('.btn-top').hover(function  () {
		$('.btn-top .ups').css('display','block').stop().animate({"right":40,opacity:1},400)
	},function  () {
		$('.btn-top .ups').stop().animate({"right":60,opacity:0},400,function  () {
			$(this).css("display","none")
		})
	})
	
	//用户
	$('.right-user').hover(function  () {
		$('.right-user .ups').css('display','block').stop().animate({"right":40,opacity:1},400)
	},function  () {
		$('.right-user .ups').stop().animate({"right":60,opacity:0},400,function  () {
			$(this).css("display","none")
		})
	})
	//资产中心
	$('.right-asset').hover(function  () {
		$('.right-asset .ups').css('display','block').stop().animate({"right":40,opacity:1},400)
	},function  () {
		$('.right-asset .ups').stop().animate({"right":60,opacity:0},400,function  () {
			$(this).css("display","none")
		})
	})
	//关注商品
	$('.right-like').hover(function  () {
		$('.right-like .ups').css('display','block').stop().animate({"right":40,opacity:1},400)
	},function  () {
		$('.right-like .ups').stop().animate({"right":60,opacity:0},400,function  () {
			$(this).css("display","none")
		})
	})
	
	//浏览历史弹出效果
	$('.right-history').hover(function  () {
		$('.right-history .ups').css('display','block').stop().animate({"right":40,opacity:1},400)
	},function  () {
		$('.right-history .ups').stop().animate({"right":60,opacity:0},400,function  () {
			$(this).css("display","none")
		})
	})
	
	
	//跳转首页
	$('.nav-first').click(function  () {
		
		location.href = "index.html"
	})
	
	
	
	
})