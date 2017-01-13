$(function  () {
	
	
	//输入框获得焦点是的变化
	$('input:text,input:password').focus(function  () {
		$(this).parent().css('border-color','rgb(122,189,84)');
		$(this).parent().siblings('.error').hide();
		$(this).parent().siblings('.hint').show();
		
	});
	$('input:text,input:password').blur(function  () {
		$(this).parent().css('border-color','#cccccc')
		$(this).parent().siblings('.hint').hide();
		$(this).parent().siblings('.error').show();
		
	});
	
	
	//点击切换验证码
	$('.Imgcode').click(function  () {
		var num = parseInt(Math.random()*9000+1000);
		$(this).html(num);
	})
	
	
	//获取验证码后的倒计时
	$('.Pcode').click(function  () {
		var i=60;
		var timer = setInterval(function  () {
			i--;
			$('.Pcode').html(i+"秒后重新获取");
			if (i<=0) {
			clearInterval(timer);
			$('.Pcode').html("点击重新获取验证码")
		}
		},1000)
	})
	
	//初始化用户名和密码
	var _username =0;
	var _password =0;
	var y1 = false,
	    y2 = false,
	    y3 = false,
	    y4 = false,
	    y5 = false,
	    y6 = false;
	
	//验证
	//手机号码验证
	$('#phone').blur(function  () {
		var pattern = /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/;
		var name = $(this).val();
		if (pattern.test(name)) {
			_username = name;//如果通过验证，则存储用户名
			$('.hint').first().hide();
			$('.error').first().hide();
			y1 = true;
		} else{
			$('.error').first().show();
		}
	})
	
	//图形验证码验证
	$('#yzm').blur(function  () {
		var yzm = parseInt($('#yzm').val());
		num = parseInt($('.Imgcode').html());
		if (yzm==num) {
			$('.hint').eq(1).hide();
			$('.error').eq(1).hide();
			y2 = true;
		} else{
			$('.error').eq(1).show();
		}
		
	})
	
	
	//密码验证
	
	var testpwd = 0;//初始化获取到的密码，再次确认用
	//第一次确认密码
	$('#pwd').blur(function  () {
		var pattern = /^\w{6,20}/;
		var pwd= $(this).val();
		if (pattern.test(pwd)) {
			testpwd = pwd;
			$('.hint').eq(2).hide();
			$('.error').eq(2).hide();
			y3=true;
		} else{
			$('.error').eq(2).show();
		}
	})
	//第二次确认密码
	$('#pwd1').blur(function  () {
		var pwd1 = $(this).val();
		if (testpwd==pwd1) {
			_password = pwd1;//储存正确输入的密码
			$('.hint').eq(3).hide();
			$('.error').eq(3).hide();
			y4 = true;
		} else{
			$('.error').eq(3).show();
		}
		
	})
	
	
	//手机验证码验证
	$('#phoneCode').blur(function  () {
		var phoneCode = $(this).val();
		var testcode = parseInt($('.Imgcode').html());
		if (phoneCode==testcode) {
			$('.hint').eq(4).hide();
			$('.error').eq(4).hide();
			y5 = true;
		} else{
			$('.error').eq(4).show();
		}
		
	})
	
	
	//checkbox验证
	$('#dealBtn').click(function  () {
		var isTrue = $(this).is(":checked");
		if (isTrue) {
			$('.error').eq(5).hide();
			y6 = true;
		} else{
			$('.error').eq(5).show();
		}
		
	})
	
	
	
	//最后一步验证，把用户名密码存到cookie
	$('#Btn').click(function  () {
		
		//判断各项表单是否全部填写完毕
		if (y1 && y2 && y3 && y4 && y5 && y6) {
			console.log("可以存储了");
			console.log(_username);
			console.log(_password);
			//如果是第一次注册用户，则为空数组
			//如果是第二次开始储存用户，则为之前保存在cookie中的所有用户数组
			var arr = $.cookie("users")?JSON.parse($.cookie("users")):[];
			
			//遍历数组，判断是否已经存在即将添加的新用户
			for (var i=0;i<arr.length;i++) {
				//如果存在想同的用户名
				if (_username==arr[i].username) {
					alert("该手机号码已经注册过，请重新输入");
					return; //跳出函数，不在执行后面的代码
				}
			}
			
			//添加一个新用户
			var user = {
				username :_username,
				pwd:_password
			}
			arr.push(user);
			
			//保存到cookie中
			$.cookie("users",JSON.stringify(arr),{expires:30,Path:"/"});
			console.log($.cookie("users"));
			alert("欢迎您加入中酒网，点击确定后跳转到登录页面");
			location.href = "login.html";
			
		} else{
			if (!y1) {
				$('.error').eq(0).show();
			};
			if (!y2) {
				$('.error').eq(1).show();
			};
			if (!y3) {
				$('.error').eq(2).show();
			};
			if (!y4) {
				$('.error').eq(3).show();
			};
			if (!y5) {
				$('.error').eq(4).show();
			};
			if (!y6) {
				$('.error').eq(5).show();
			};
			
		}
		
	})
	
	
	
	
	
	
})