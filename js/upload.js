 
$(function(){
	//			图片预览功能
	$(".btn-edit").click(function(){
//		alert(1)
	  $(this).siblings(".upload-img").trigger("click");
	});
$(".upload-input").on("change", function() {
	//判断是否支持FileReader
	if(window.FileReader) {
		var reader = new FileReader();
	} else {
		alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
	}
	//获取文件
	var file = this.files[0];
	var imageType = /^image\//;
	//是否是图片
//	if(!imageType.test(file.type)) {
//		alert("请选择图片！");
//		return;
//	}
	$IMG = $(this).parents(".upload-group-item").find(".upload-img");
	$BtnDelete = $(this).parents(".upload-group-item").find(".btn-delete");
	$BtnEdit = $(this).parents(".upload-group-item").find(".btn-edit");
	$UploadModule = $(this).parents(".upload-group-item");
	$UploadModule.after($UploadModule.clone(true));
	
	//	已上传图片不能重传只能删除
	//$(this).attr("disabled", true);
	
	//读取完成
	reader.onload = function(e) {
		//		读取获取到的图片
		$IMG.attr("src", e.target.result);
		$BtnEdit.addClass("active");
//		$BtnDelete.addClass("active");					//del
	};
	reader.readAsDataURL(file);
	
})
//	$(".btn-delete").click(function() {					//del
//		$(this).siblings('img').attr('src','img/bg/icon-addpic.png');
//		$BtnDelete.removeClass("active");
//	})
})
