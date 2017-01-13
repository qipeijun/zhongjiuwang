$(function  () {
	
	
	//首页banner图轮播效果
	$.get("json/banner.json",function  (data) {
		
		//动态添加li
		for (var i=0;i<data.length;i++) {
			var obj = data[i];
			$('<li><img src="'+obj.img+'"/></li>').appendTo("#list1");
			$('<li></li>').appendTo('#list2');
			if (i==0) {
				$('#list1 li').first().addClass("cur");
				$('#list2 li').first().addClass("select");
			}
		}
		
		//轮播方法
		bannerMove();
		
	})
	
	//banner图的轮播方法
	function bannerMove () {
		var Li1 = $('#list1 li');
		var Li2 = $('#list2 li');
		
		var i=0;
		
		var timer = setInterval(move,5000);
		
		function move () {
			Li1.eq(i).addClass("cur").fadeIn(2500).siblings().removeClass("cur").fadeOut(2500);
			Li2.eq(i).addClass("select").siblings().removeClass("select");
			i++;
			if (i>3) {
				i=0;
			}
		}
		
		//鼠标移入移出按钮
		Li2.hover(function  () {
			clearInterval(timer);
			var index = $(this).index();
			i=index;
			Li1.eq(index).addClass("cur").fadeIn(2500).siblings().removeClass("cur").fadeOut(2500);
			Li2.eq(index).addClass("select").siblings().removeClass("select");
			
		},function  () {
			timer = setInterval(move,5000);
		})
	}
	
	
	//banner层小广告
	$('.small-ad').hover(function  () {
		$(this).stop().animate({right:70,opacity:1},200);
	},function  () {
		$(this).stop().animate({right:65,opacity:0.7},200);
	})
	
	
	
	//限时抢购
	$.get("json/limit.json",function  (data) {
		
		for (var i=0;i<data.length;i++) {
			var obj = data[i];
			$('.limit-Img img').eq(i).attr('src',obj.img);
			$('.limit-buy-goods li span b').eq(i).html(obj.price+".00");
			
			countDown (obj.time,i);
			
		}
		
	})
	
	
	function countDown (time,i) {
		var endtime = new Date(time)
		var end = endtime.getTime();
		var day = 0,
		    hours=0,
		    minutes=0,
		    seconds=0;
		setInterval(function  () {
			var starDate = new Date();
			var star = starDate.getTime();
			var t= end-star;
			if (t>0) {
				day = parseInt(t/60/60/24/1000);
				hours=parseInt((t-day*24*60*60*1000)/3600/1000);
				minutes=parseInt((t-day*24*60*60*1000-hours*3600*1000)/60/1000);
				seconds=parseInt((t-day*24*60*60*1000-hours*3600*1000-minutes*60*1000)/1000);
				$('.limit-buy-goods p').eq(i).html("还剩"+day+"天"+hours+"时"+minutes+"分"+seconds+"秒结束");
			} else{
				$('.limit-buy-goods p').eq(i).html("活动结束");
				$('.limit-Btn i').eq(i).css('background','#CECECE');
				
			}
			
		},1000)
	}
	

	
	$('.limit-Btn').hover(function  () {
		$(this).css('color','white');
		$(this).find('i').stop().animate({width:230},200);
	},function  () {
		$(this).css('color','#FF2A3E');
		$(this).find('i').stop().animate({width:10},200);
	})
	
	
	
	//==========人气单品
	$('.hot-Img li').hover(function  () {
		$(this).stop().fadeTo(1,1).siblings('li').fadeTo(1,0.3);
	},function  () {
		$(this).stop().fadeTo(1,1).siblings('li').fadeTo(1,1);
	})
	
	
	//=========精选尚品下面的logo轮播
	function logoMove () {
		var index = 0;
		var Iwidth = $('.logo-list li').width();
		
		$('.prev').click(function  () {
			
			$('.logo-list').stop().animate({left:index*Iwidth},300);
			index++;
			
			if (index>=1) {
				index=-1;
			}
		});
		$('.next').click(function  () {
			
			$('.logo-list').stop().animate({left:index*Iwidth},300);
			index--
			if (index<-1) {
				index=0
			}
		})
	}
	//调用函数
	logoMove ();
	
	
	//=========Tab切换
	//精选尚品
	$('.at1').mouseenter(function  () {
		var index = $(this).index();
		$(this).addClass('active').siblings('li').removeClass('active')
		$('.tabChange1').eq(index).css('display','block').siblings('.tabChange1').css('display',"none")
		
	})
	
	
	//白酒馆
	$('.at2').mouseenter(function  () {
		var index = $(this).index();
		$(this).addClass('active').siblings('li').removeClass('active')
		$('.tabChange2').eq(index).css('display','block').siblings('.tabChange2').css('display',"none")
		
	})
	
	
	//红酒馆
	$('.at3').mouseenter(function  () {
		var index = $(this).index();
		$(this).addClass('active').siblings('li').removeClass('active')
		$('.tabChange3').eq(index).css('display','block').siblings('.tabChange3').css('display',"none")
		
	})
	
	
	//洋酒&啤酒
	$('.at4').mouseenter(function  () {
		var index = $(this).index();
		$(this).addClass('active').siblings('li').removeClass('active')
		$('.tabChange4').eq(index).css('display','block').siblings('.tabChange4').css('display',"none")
		
	})
	
	
	
	$.get("json/goodsPic.json",function  (data) {
		
		for (var i=0;i<data.length;i++) {
			var obj = data[i];
			$('.hb-pic img').eq(i).attr('src',obj.img)
		}
		
	})
	
	
	
	//=======================商品数据==========================
	var myData = null;//全局的数据
	$.get("json/goodsMenu.json",function  (data) {
		myData = data;//将获取到的数据保存到myData，方便其他地方调用
		for (var i=0;i<data.length;i++) {
			var obj = data[i];
			$('.goods-img img').eq(i).attr('src',obj.img);
			$('.goods-price').eq(i).html("￥"+obj.price+".00");
			$('.goods-title').eq(i).html(obj.title);
		}
	})
	
	
	//品牌旗舰店logo轮播
	function logoStore () {
		var index = 0;
		var Iwidth = $('.storeLogo-list li').width();
		
		$('.store-outer .prev_').click(function  () {
			index++;
			if (index>=1) {
				index=-$('.storeLogo-list li').length+1;
			}
			$('.storeLogo-list').stop().animate({left:index*Iwidth},300);
		});
		$('.store-outer .next_').click(function  () {
			index--;
			if (index<-$('.storeLogo-list li').length+1) {
				index=0
			}
			$('.storeLogo-list').stop().animate({left:index*Iwidth},300);
			
			
		})
	}
	//调用函数
	logoStore ();
	
	
	
	//楼梯效果
	$('.louti li').hover(function  () {
		$(this).find('span').show();
		
	},function  () {
		$(this).find('span').hide();
	})
	
	//事件
	$('.louti li').click(function  () {
		var index = $(this).index();
		var _top = $('.goods-outer').eq(index).offset().top;
		//动画移动到对应的楼层
		$('html,body').stop().animate({scrollTop:_top},500);
		
	});
	//页面滚动时按钮的状态
	$(window).scroll(function  () {
		
		var _scrollTop = $(window).scrollTop();
		
		if (_scrollTop>1902 && _scrollTop<5040) {
			$('.louti').show();
		} else{
			$('.louti').hide();
		}
		
		//遍历所有的class=goods-outer的div
		var i = 0;
		$('.goods-outer').each(function  () {
			
			//每个div的top值
			var _top = $(this).offset().top;
			
			//判断到达了那个div
			if (_scrollTop>=_top) {
				
				i = $(this).index(".goods-outer");
			}
		})
		
		//使用index改变按钮的状态
		$('.louti li').eq(i).find('span').show().parent().siblings('li').find('span').hide();
		
	})
	
	
	
	
	
	
	//===========商品跳转
	var aLi = $('.tabChange1').eq(1).find('li');
	aLi.click(function  () {
		var index = $(this).index();
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	var aLi = $('.tabChange1').eq(2).find('li');
	aLi.click(function  () {
		var index = $(this).index()+10;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	var aLi = $('.tabChange1').eq(3).find('li');
	aLi.click(function  () {
		var index = $(this).index()+20;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	var aLi = $('.tabChange1').eq(4).find('li');
	aLi.click(function  () {
		var index = $(this).index()+30;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	
	var aLi = $('.tabChange2').eq(1).find('li');
	aLi.click(function  () {
		var index = $(this).index()+40;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	var aLi = $('.tabChange2').eq(2).find('li');
	aLi.click(function  () {
		var index = $(this).index()+50;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	
	var aLi = $('.tabChange2').eq(3).find('li');
	aLi.click(function  () {
		var index = $(this).index()+60;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	
	var aLi = $('.tabChange2').eq(4).find('li');
	aLi.click(function  () {
		var index = $(this).index()+70;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	var aLi = $('.tabChange3').eq(1).find('li');
	aLi.click(function  () {
		var index = $(this).index()+80;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	
	var aLi = $('.tabChange3').eq(2).find('li');
	aLi.click(function  () {
		var index = $(this).index()+90;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	var aLi = $('.tabChange4').eq(1).find('li');
	aLi.click(function  () {
		var index = $(this).index()+100;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	
	var aLi = $('.tabChange4').eq(2).find('li');
	aLi.click(function  () {
		var index = $(this).index()+110;
		
		if (myData) {
			var id = myData[index].id;
			//跳转到对应的商品详情页
			location.href = "goods-details.html?"+id;
		}
		
	})
	
	
	
	
	
		
	
})
















