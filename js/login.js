$(function  () {
	
	//输入框颜色
	$('.username').focus(function  () {//获得焦点
		$('.username-out').css('border-color',"rgb(123,198,16)");
	})
	$('.username').blur(function  () {//失去焦点
		$('.username-out').css('border-color',"#b8c1c8");
	})
	$('.passwrod').focus(function  () {//获得焦点
		$('.passwrod-out').css('border-color',"rgb(123,198,16)");
	})
	$('.passwrod').blur(function  () {//失去焦点
		$('.passwrod-out').css('border-color',"#b8c1c8");
	})
	
	
	//自动填写上次保存的用户名和密码
	var oldLoginUser = $.cookie("loginUser");
	if (oldLoginUser) {
		oldLoginUser = JSON.parse(oldLoginUser);
		$('.username').val(oldLoginUser.username);
		$('.passwrod').val(oldLoginUser.pwd);
	}
	
	
	//点击登录按钮
	$('#btn').click(function  () {
		
		var username = $('.username').val();
		var pwd = $('.passwrod').val();
		
		if (username=="") {//如果没有输入用户名
			$('.h1').show();
		};
		if (pwd=="") {//如果没有输入密码
			$('.h2').show()
			return;
		};
		//获取cookie中的所有用户
		var arr = $.cookie("users");
		if (arr) {
			arr = JSON.parse(arr);
			//遍历，查找是否存在匹配的用户名和密码
			var isExist = false;
			//表示是否存在匹配的用户名和密码
			for (var i=0;i<arr.length;i++) {
				//如果存在匹配的用户名和密码，则表示登录成功
				if (username == arr[i].username && pwd == arr[i].pwd) {
					
					console.log("登录成功");
					openNewpage();
					isExist = true;
					
					//如果点击了自动登录 保存登录成功获得用户名和密码
					if ($('#cbox').is(":checked")) {
						var loginUser = {
							username:username,
							pwd:pwd
						};
						$.cookie("loginUser",JSON.stringify(loginUser),{expires:30,path:"/"});
					}
				}
			}
			if (isExist == false) {
				$('.h1').hide();
				$('.h2').hide();
				$('.h3').show();
			}
			
		}
		
	})
	
	
	function openNewpage () {
		location.href = "index.html"
		
	}
	
	
	
	
	
	
})