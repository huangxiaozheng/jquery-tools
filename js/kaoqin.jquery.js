//时间转换成2位数
function toDouble(iNum) {
	return (iNum < 10)?('0' + iNum):('' + iNum);
}
//实时显示日期时间
function time() {
	var worktime = $("#worktime-now");
	var now = new Date()
	$("#showdate").text(toDouble(now.getFullYear()) + "年" + toDouble((now.getMonth() + 1)) + "月" + toDouble(now.getDate()) + "日");
	$("#showtime").text(toDouble(now.getHours()) + "时" + toDouble(now.getMinutes()) + "分" + toDouble(now.getSeconds()) + "秒");
	//每秒刷新时间
	setTimeout(time, 1000);
}
//打卡
//function clock($self,address,ip){
//		$self.hide();
//		var now = new Date();
////		获取当前时间
//		var contentDate = toDouble(now.getFullYear()) + "-" + toDouble((now.getMonth() + 1)) + "-" + toDouble(now.getDate()) + "&nbsp;&nbsp;" + toDouble(now.getHours()) + ":" + toDouble(now.getMinutes()) + ":" + toDouble(now.getSeconds());
//		var dutyType=$self.parents(".work-wrap").find(".duty-type").text();
//		$self.parents(".work-wrap").find(".workout-time").html(contentDate).show();
//		$self.parents(".work-wrap").find(".clock-addr").text("位置:"+address).show();
//		$self.parents(".work-wrap").find(".ip").text("IP地址："+ip);
//		alert(dutyType+"打卡成功");
//}
//渲染页面
function showPage(){
	//实时显示日期时间
	time();
	$("#username").text("马云");
	$("#org_name").text("金山店");
////	打卡模块代码
//	var workHtml=
//	'<dt>'
//	+'<span class="duty-type"></span>'
//	+'<span class="workout-time"></span>'
//	+'<button class="clock"></button>'
//	+'</dt>'
//	+'<dd>'
//	+'<p class="clock-addr"></p>'
//	+'</dd>'
//	+'<dd>'
//	+'<p class="ip"></p>'
//	+'</dd>';
////	载入签到模块
//  $("#workon").html(workHtml);
//  $("#workon").find(".duty-type").text("上班");
//  $("#workon").find(".clock").addClass("clock-in").text("签到");
////	载入签退模块
//  $("#workoff").html(workHtml);
//  $("#workoff").find(".duty-type").text("下班");
//  $("#workoff").find(".clock").addClass("clock-out").text("签退");
}

$(function() {
//渲染页面
	showPage();
////	上班签到
//	$(".clock-in").click(function() {
//		var $self=$(this),
//		dutyType="上班",
////		打卡地址
//		address="鼓楼区软件园A区28栋",
//		ip="59.56.45.80";
////		上班打卡
//		clock($self,address,ip);
//		$("#workoff").show();
//	})
////	下班签退
//	$(".clock-out").click(function() {
//		var $self=$(this),
//		dutyType="下班",
//		address="美国白宫",
//		ip="59.56.45.84";
////		下班打卡
//		clock($self,address,ip);
//	})
})