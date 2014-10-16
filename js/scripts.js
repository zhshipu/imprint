var base_path = 'http://192.168.0.167:8080/imprint';
var imprint = new Object();
//主页
imprint.front = new Object();
imprint.front.ready = function(){
	var sCback = function(data){
		data = eval('(' + data + ')');
		if (data.result_code == '1') {
			console.log(data.result_data.id);
		};
	}
	var beforeCback = function(){
		$('.progress-bar').width('30%');
	}
	var completeCback = function(){
		$('.progress-bar').width('90%');
	}
	var xhr =	$.ajax({
					url: base_path+'/login.do?account=yakov716&passwd=123456a',
					type: 'GET',
					beforeSend: beforeCback,
					complete: completeCback,
					success: sCback
				});
}
//登录页面
imprint.login = new Object();
imprint.login.ready = function(){
	loginStatus('index.html');
	$('form#login #submit').click(function(e){
		e.preventDefault();
		var formObj = $('form#login');
		var usernameObj = formObj.find('input#username');
		var passwordObj = formObj.find('input#password');
		var sCback = function(data){
			data = eval('(' + data + ')');
			if (data.result_code == 1) {
				window.location.href = base_path+'/index.html';
			}else{
				addAlter('Login failed!');
			};
		}
		$.ajax({
			type: 'GET',
			url: base_path+'/login.do?'+'account='+usernameObj.val()+'&passwd='+passwordObj.val(),
			beforeSend:function(){var $btn = $(this).button('loading');},
			success: sCback,
			complete: function(){$btn.button('reset');}
		});
	})
}

//注册页面
imprint.signup = new Object();
imprint.signup.ready = function(){
	loginStatus('index.html');
	$('form#signup #submit').click(function(e){
		e.preventDefault();
		var formRt = imprint.signup.formCk();
		if (formRt == false) 
		{
			return;
		};						//表单检查出错则停止执行
		var formObj = $('form#signup');
		var usernameObj = formObj.find('input#username');
		var passwordObj = formObj.find('input#password');
		var nameObj = formObj.find('input#name');
		var sCback = function(data){
			data = eval('(' + data + ')');
			if (data.result_code == 1) {
				window.location.href = base_path+'/index.html';
			}else{
				addAlter('Signup failed!');
			};
		}
		$.ajax({
			type: 'GET',
			url: base_path+'/register.do?'+'account='+usernameObj.val()+'&passwd='+passwordObj.val()+'&name='+nameObj.val(),
			success: sCback,
			beforeSend:function(){var $btn = $(this).button('loading');},
			complete: function(){$btn.button('reset');}
		});
	})
}

imprint.signup.formCk = function(){
	//去除input错误
	$('.form-group').removeClass('has-error');
	var formObj = $('form#signup');
	var usernameObj = formObj.find('input#username');
	var passwordObj = formObj.find('input#password');
	var nameObj = formObj.find('input#name');
	if (usernameObj.val().length < 4) {
		addAlter('用户名长度不能小于 4 个字符');
		usernameObj.parent().addClass('has-error');
		return false;
	};
	if (passwordObj.val().length < 6) {
		addAlter('密码长度不能小于 6 个字符');
		passwordObj.parent().addClass('has-error');
		return false;
	};
	if (nameObj.val().length < 2) {
		addAlter('昵称长度不能小于 2 个字符');
		nameObj.parent().addClass('has-error');
		return false;
	};
}

$(document).ready(function(){
	  for(i in imprint){
	  	if ($('#'+i+'-page').length > 0) {
	      	imprint[i]['ready']();
	  	};
      }
})


//添加警告框
function addAlter(msg){
	//清除之前的alert
	$('div.alert').remove();
	var alertObj = $('<div class="alert alert-warning" role="alert"></div>');
	alertObj.append(msg);
	alertObj.append('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
	$('.container').prepend(alertObj);
}

//登陆状态检查
function loginStatus(url){
	var beforeCback = function(){
		$('.progress-bar').width('30%');
	}
	var completeCback = function(){
		$('.progress-bar').width('90%');
	}
	var sCback = function(data){
		data = eval('(' + data + ')');
		if (data.result_code == 1) {
			window.location.href = base_path+'/'+url;
			return false;
		}else{
			$('#page-loading').remove();
			return false;
		};
	}
	$.ajax({
		url: base_path+'/loginStatus.do',
		type: 'GET',
		beforeSend: beforeCback,
		complete: completeCback,
		success: sCback
	});
}