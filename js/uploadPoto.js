 
$(function(){
	
	
	//图片预览功能
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

		if(file == undefined || file == undefined || file.length == 0){
			return false;
		}

		var imageType = /^image\//;
		//是否是图片
	//	if(!imageType.test(file.type)) {
	//		alert("请选择图片！");
	//		return;
	//	}
		$IMG = $(this).parents(".upload-group-item").find(".upload-img");
		$BtnDelete = $(this).parents(".upload-group-item").find(".btn-delete");
		$BtnEdit = $(this).parents(".upload-group-item").find(".btn-edit");
		
		
		 
		 //限制上传张数
		$UploadModule = $(this).parents(".upload-group-item");
		$UploadModule.after($UploadModule.clone(true));
			if($(".contImgBox").find("label").length > 3){//正文照片达到3张时，将上传正文图标隐藏
				$(".contImg:last-child").hide();
				setBtnDisabled();
			}else{
				$(".contImg:last-child").show();
			}
			
			if($(".coverImgBox").find("label").length > 1){//正文照片达到3张时，将上传正文图标隐藏
				$(".coverImg:last-child").hide();
			}
		 
		 
//		$(this).attr("disabled", true);
	
	
		$(this).click(function(){
	//		alert($(this).html())
			var imgSrc = $(this).parents(".upload-group-item").find(".upload-img").attr("src");
			var parentClass = $(this).parent().attr('class');
			$(".imgClassName").val(parentClass);
			$(".mainImg").attr("src",imgSrc);
			$(".popup").show();
			return false;
		})
		
		
		//读取完成 
		reader.onload = function(e) {
			//读取获取到的图片
	//		$(".mainImg").attr("src", e.target.result);
			
			$IMG.attr("src", e.target.result);
			$(".upload-input").val("");

			if($IMG.attr("src") != "img/contPlus.PNG" || $IMG.attr("src") != "img/coverPlus.PNG" ){
				$BtnDelete.show();
			}
			
			$BtnEdit.addClass("active");
	//		$BtnDelete.addClass("active");					//del
		};
		reader.readAsDataURL(file);
	})
	$(".btn-delete").click(function() {	//del
		var r=confirm("确定删除该照片？")
		if(r==true){
			var length = $(this).parent().siblings("label").length;
			var indexNum = $(this).parent().index();
			if(length > 0 && !(indexNum > length)){
				//$(this).siblings('img').attr('src','img/icon-addpic.png');
				$BtnDelete.removeClass("active");
				$(this).parent().remove();
			}
			
			var middlePosiObj = $(".imgBox").find("li").get(1);
			var currentSrc = $(middlePosiObj).find("img").attr("src");
			if($(".contImgBox").find("label").length < 4){//正文照片达到3张时，将上传正文图标隐藏
				$(".contImg:last-child").show();
				if(currentSrc == "img/cashCase.png"){//正文照样例
					$("#btn22").attr('disabled',false);
					$("#btn22").css('background-color',"red");
				}
			}
			
			if($(".coverImgBox").find("label").length <2){//正文照片达到3张时，将上传正文图标隐藏
				$(".coverImg:last-child").show();
				if(currentSrc == "img/cover.png"){//封面照样例
					$("#btn22").attr('disabled',false);
					$("#btn22").css('background-color',"red");
				}
			}
			return false;
		}
	})

	//新增图片 图标的点击事件
	$(".operateBTn-item>.add").click(function(){
		if($(".contImgBox").find("label").length > 3){
			alert("目前已达到上传图片上限！");
		}else{
			var imgClassName = $(".imgClassName").val();
			if(imgClassName == "upload-group-item contImg"){ //正文照
				$(".contImg>.upload-input").click();
			}else if(imgClassName == "upload-group-item coverImg"){//封面照
				$(".coverImg>.upload-input").click();
			}
			$(".imgClassName").val(" ");
			$(".popup").hide();
		}
	});
	
	//设置“上传保单正文照片”按钮是否禁用
	function setBtnDisabled(){
		$("#btn22").attr('disabled',true);
		$("#btn22").css('background-color','#BABABA');
	}
	
	//重新上传
	$(".operateBTn-item>.reupload").click(function(){
		var num = $(".num").text();
		$(".tempImg>.upload-input").click();
		$(".tempImg>.upload-input").on("change",function(){
			/*var aa = $(".cont>.temp>.tempImg").find(".upload-img").attr("src");
			alert(aa);*/
			if(window.FileReader) {
				var reader = new FileReader();
			} else {
				alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
			}
			//获取文件
			var file = this.files[0];
			var imageType = /^image\//;
			reader.onload = function(e) {
				//读取获取到的图片
				 $(".tempImg").first().find(".upload-img").attr("src", e.target.result);
				
				//替换预览图片
				$(".mainImg").attr("src",e.target.result);
				//替换原始图片
				var imgClassName = $(".imgClassName").val();
				if(imgClassName == "upload-group-item contImg"){ //正文照
					var parObj = $(".cont1").find(".contImg").get(num-1);
					$(parObj).find(".upload-img").attr("src",e.target.result);
				}else if(imgClassName == "upload-group-item coverImg"){//封面照
					var parObj = $(".cont2").find(".coverImg").get(num-1);
					$(parObj).find(".upload-img").attr("src",e.target.result);
				}
				//删除临时存放的图片
				var length = $(".temp>.tempImg").length;
				if(length > 1){
					$(".cont>.temp").children().first().remove();
				}
				
			};
			reader.readAsDataURL(file);
		});
		
	});
	
	
	$(".billBtn").click(function(){
		//上传说明中间对应的对象
//		console.log(1)
		var middlePosiObj = $(".imgBox").find("li.active").get(0);
		var currentSrc = $(middlePosiObj).find("img").attr("src");
		if(currentSrc == "img/cashCase.png"){//正文照样例
//		console.log(2)
			$(".contImg>.upload-input").click();
			$(".popup").hide();
		}
		if(currentSrc == "img/cover.png"){//封面照样例
//		console.log(3)
			$(".coverImg>.upload-input").click();
			$(".popup").hide();
		}
	});
	
	$(document).ready(function(){ 
	　　//正文照片
		if($(".contImgBox").find("label").length > 0){
			var length = $(".contImgBox").find("label").length;
			var parObj = $(".cont1").find(".contImg").get(length-1);
			var imgUrl = $(parObj).find(".upload-img").attr("src");
			if(imgUrl == "img/contPlus.PNG"){
				$(parObj).find(".contDel").hide();
			}
		}
		//封面照
		if($(".coverImgBox").find("label").length > 0){
			var length = $(".coverImgBox").find("label").length;
			var parObj = $(".cont2").find(".coverImg").get(length-1);
			var imgUrl = $(parObj).find(".upload-img").attr("src");
			if(imgUrl == "img/coverPlus.PNG"){
				$(parObj).find(".coverDel").hide();
			}
		}
		
	}); 
})
