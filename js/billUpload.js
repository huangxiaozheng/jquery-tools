	$(function() {
		$(".case").click(function() {
			$(".explain").show();
			$(".uploadBill").hide();
		});
	
		$(".retBTn").click(function() {
			$(".uploadBill").show();
			$(".explain").hide();
			$("html,body").animate({scrollTop:0}, 500);
		});
		
		if($(".uploadBill").show()){
			$(".popup").hide();
		}
		$(".cameraBox").click(function(){
			$(".popup").show();
			
		});
		

		
		//返回
		$(".popupDel").click(function(){
			$(".popup").hide();
		});

		//弹窗返回按钮
		$(".goBack").click(function(){
			$(".popup").hide();
		});
		//弹窗标题
		$(".covInput").click(function(){
			$(".popupTitle").text("保单封面照");
		});

		//弹窗删除照片
		$(".dleImg").click(function(){
			/*$(".mainImg").attr("src","");
			$(".delText").show();
			$(".mainImg").hide();	*/
			var num = $(".num").text();
			var totalNum = $(".total").text();
			var r=confirm("是否确定删除该照片？")
			if(r==true){
				if(totalNum == '1'){//总共只有一张照片，删除后就返回上一页面
					$(".popup").hide();
					delImage(num);
				}else if(totalNum > 1){
					// 以当前页面为分界点，如果当前页面大于1，删除执行左切换，且对应页面-1，
					// 如果当前页码为1的时候，右切换，当前页码不变，总页数-1
					if(num == 1){
						var imgSrc = $(".contImgBox").children("label").eq(num).children("img").attr("src");
						if(imgSrc != "img/contPlus.PNG"){
							$(".mainImg").attr("src",imgSrc);
							$(".total").text(parseInt(totalNum)-1);
							delImage(num);
						}
						
					}else{
						var imgSrc = $(".contImgBox").children("label").eq(num-2).children("img").attr("src");
						if(imgSrc != "img/contPlus.PNG"){
							$(".mainImg").attr("src",imgSrc);
							$(".num").text(num-1);
							$(".total").text(parseInt(totalNum)-1);
							delImage(num);
						}
					}
				}
			}
		});
		
		function delImage(num){
			var imgClassName = $(".imgClassName").val();
			if(imgClassName == "upload-group-item contImg"){ //正文照
				var parObj = $(".cont1").find(".contImg").get(num-1);
				$(parObj).remove();
			}else if(imgClassName == "upload-group-item coverImg"){//封面照
				var parObj = $(".cont2").find(".coverImg").get(num-1);
				$(parObj).remove();
			}
			if($(".contImgBox").find("label").length < 4){//正文照片达到3张时，将上传正文图标隐藏
				$(".contImg:last-child").show();
				$("#btn22").attr('disabled',false);
				$("#btn22").css('background-color',"#f02b2b");
			}
			
			if($(".coverImgBox").find("label").length <2){//正文照片达到3张时，将上传正文图标隐藏
				$(".coverImg:last-child").show();
			}
		}
		
		//弹窗左右切换
		$(".leftArr").click(function(){
			var src = $(".mainImg").attr("src");//当前图片地址
			var num = $(".num").text();
			var totalNum = $(".total").text();
			if(num == 1&& totalNum ==1){
				alert("当前只有一张图像");
				return;
			}
			if(num == 1){
				return;
			}
			//var srcs = $(".contImg").children("img").attr("src");
			//var index = $(".contImg").children("img").index();
			var imgSrc = $(".contImgBox").children("label").eq(num-2).children("img").attr("src");
			$(".mainImg").attr("src",imgSrc);
			$(".num").text(num-1);
			//alert(imgs);
			//for(i=0;i<2;i++){
			//		alert(imgs[i].attr("src"));
			//	}
		});
		
		
		$(".rightArr").click(function(){
			var src = $(".mainImg").attr("src");//当前图片地址
			var num = $(".num").text();
			var totalNum = $(".total").text();
			if(num == 1&& totalNum ==1){
				alert("当前只有一张图像");
				return; 
			}
			if(num == totalNum){
				return;
			}
			//var srcs = $(".contImg").children("img").attr("src");
			//var index = $(".contImg").children("img").index();
			var imgSrc = $(".contImgBox").children("label").eq(num).children("img").attr("src");
			$(".mainImg").attr("src",imgSrc);
			$(".num").text(parseInt(num)+1);
			//alert(imgs);
			//	for(i=0;i<2;i++){
			//		alert(imgs[i].attr("src"));
			//	}
		});
		
		//上传说明图片事件
		$(".imgBox-item").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active")
		});
		$(".centerImg").click(function(){
			$(".cashClause").show();
			$(".coverClause").hide();
			$("#btn22").text("上传保单正文照");
		});
		$(".rightImg").click(function(){
			$(".cashClause").hide();
			$(".coverClause").show();
			$("#btn22").text("上传保单封面照");
		});
		
		
		//样例图片点击时顺时针旋转
//		$(".imgBox-item").click(function(){
//			// 0 -> 2   2->1   1->0 
//			var index0 = $(this).parent().find("li").get(0);
//			var index1 = $(this).parent().find("li").get(1);
//			var index2 = $(this).parent().find("li").get(2);
//			var src0 = $(index0).find("img").attr("src");
//			var src1 = $(index1).find("img").attr("src");
//			var src2 = $(index2).find("img").attr("src");
//			
//			var text0 = $(index0).find("p").text();
//			var text1 = $(index1).find("p").text();
//			var text2 = $(index2).find("p").text();
//			
//			var tempSrc = src1;
//			var tempText = text1;
//			
//			//点击时，顺时针移动一位
//			$(index1).find("img").attr("src",src2);
//			$(index1).find("p").text(text2);
//			
//			$(index2).find("img").attr("src",src0);
//			$(index2).find("p").text(text0);
//			
//			$(index0).find("img").attr("src",tempSrc);
//			$(index0).find("p").text(tempText);
//
//			uploadDescControle(index1);
//			
//		});
//		
//		function uploadDescControle(middlePosiObj){
//			var currentSrc = $(middlePosiObj).find("img").attr("src");
//			if(currentSrc == "img/cashCase.png"){//正文照样例
//				$(".cashClause").show();
//				$(".coverClause").hide();
//				$(".policyClause").hide();
//				$("#btn22").text("上传保单正文照");
//				if($(".contImgBox").find("label").length < 4){//正文照片达到3张时，将上传正文图标隐藏
//					$(".contImg:last-child").show();
//					$("#btn22").attr('disabled',false);
//					$("#btn22").css('background-color',"red");
//				}
//			}else if(currentSrc == "img/cover.png"){//封面照样例
//				$(".cashClause").hide();
//				$(".coverClause").show();
//				$(".policyClause").hide();
//				//上传说明文章内容为封面照时按钮变成“上传保单封面照片”
//				$("#btn22").text("上传保单封面照");
//				var aaa = $(".coverImgBox").find("label").length;
//				if($(".coverImgBox").find("label").length >0){
//					if($(".coverImg").find("img").attr("src") == "img/coverPlus.PNG"){
//						$(".coverImg:last-child").show();
//						$("#btn22").attr('disabled',false);
//						$("#btn22").css('background-color',"red");
//					}else{
//						$(".coverImg:last-child").hide();
//						$("#btn22").attr('disabled',true);
//						$("#btn22").css('background-color','#BABABA');
//					}
//					
//				}
//			}else if(currentSrc == "img/policyCase.png"){//现金结样例
//				$(".cashClause").hide();
//				$(".coverClause").hide();
//				$(".policyClause").show();
//				$("#btn22").attr('disabled',true);
//				$("#btn22").css('background-color','#BABABA').text("暂不支持图片上传功能");
//			}
//		}
//		
//		$(document).ready(function(){ 
//			//上传说明中间对应的对象,页面加载时的逻辑控制
//			var middlePosiObj = $(".imgBox").find("li").get(1);
//			uploadDescControle(middlePosiObj);
//		}); 
	});

	function getImgIndex (tag) {
		//var src =$(tag).children("img").attr("src");
		//alert(t)
		var index = $(tag).index();
		//alert(index)
		$(".num").text(index);
		var totalIndex = $(tag).siblings('label').length;
		//alert($("label").length)
		$(".total").text(totalIndex);
	}

