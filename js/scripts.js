var base_path = 'http://192.168.1.178:8080/imprint';
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
	var sCback = function(data){
		data = eval('(' + data + ')');
		if (data.result_code == '1') {
			window.location.href = base_path+'/index.html';
			return false;
		}else{
			window.location.href = base_path+'/index.html';
			return false;
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

$(document).ready(function(){
	  for(i in imprint){
	  	if ($('#'+i+'-page').length > 0) {
	      	imprint[i]['ready']();
	  	};
      }
})


//添加警告框
function addAlter(msg){
	var alertObj = $('<div class="alert alert-success" role="alert"></div>');
	alertObj.append(msg);
	alertObj.append('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
	$('.container').prepend(alertObj);
}