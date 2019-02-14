/*
 1. 鼠标移入显示,移出隐藏
 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)

 9. 点击向右/左, 移动当前展示商品的小图片
 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

/*
1. 对哪个/些元素绑定什么监听?
2. 对哪个/些元素进行什么DOM操作?
 */

$(function(){
	
	showHide();
	hoverSubMenu();
	search();
	share();
	bigImg();
	
	
/* 1. 鼠标移入显示,移出隐藏-------目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品*/
function showHide(){
	$('[name=show_hide]').hover(function(){
		//alert(this.id)
		//得到id
		var id = this.id+'_items';
		$('#'+id).show();
	},function(){
		var id = this.id+'_items';
		$('#'+id).hide();
	})
	
}
	
	
	
// 2. 鼠标移动切换二级导航菜单的切换显示和隐藏	
function hoverSubMenu(){
	$('#category_items>div').hover(function(){
		$(this).children(':last').show();
	},function(){
		$(this).children(':last').hide();
	})
}
	

// 3. 输入搜索关键字, 列表显示匹配的结果----失去焦点隐藏；获得焦点+键盘抬起时显示
function search(){
	$('#txtSearch').on('keyup focus',function(){
		//如果输入框有文本才显示列表
		var txt = this.value.trim();//防止输入的是空格
		if(txt){
			$('#search_helper').show();
		}
	}).blur(function(){
		//隐藏列表
		$('#search_helper').hide();
	})
}
	
	
// 4. 点击显示或者隐藏更多的分享图标
function share(){
	//标识当前的状态（初始为关闭）
	var isOpen =false;
	var $shareMore = $('#shareMore');
	var $parent = $shareMore.parent();
	var $as = $shareMore.prevAll('a:lt(2)');
	var $b = $shareMore.children();
	$shareMore.click(function(){
		if(isOpen){//去关闭
			$parent.css('width',155);
			$as.hide();
			$b.removeClass('backward');
		}else{//去打开
			$parent.css('width',200);
			$as.show();
			$b.addClass('backward');
		}
		
		isOpen = !isOpen //切换
	})
}
	
//放大镜的效果	
function bigImg(){
	//左边图片
	var $mediumImg = $('#mediumImg');
	//小黄块
	var $mask = $('#mask');
	//绑定事件
	var $maskTop = $('#maskTop');
	//右边大盒子
	var $largeImgContainer = $('#largeImgContainer');
	//加载中的图片
	var $loading = $('#loading');
	//右边大图
	var $largeImg = $('#largeImg');
	//获取黄块的尺寸
	var maskWidth = $mask.width();
	var maskWidth = $mask.height();
	//获取左边大盒子的宽高
	var maskTopWidth = $maskTop.width();
	var maskTopHeight = $maskTop.height();
	
	//鼠标进入---加载大图（加载完成后）---监听移动的鼠标
	
	$maskTop.hover(function(event){//鼠标进入
		//显示小黄块
		$mask.show();
		//动态加载对应的大图：获取地址;replace('-m.','-l.')是左边图与右边图的地址------加载一次就好  所以不需要放在$maskTop.mousemove里面
		var src = $mediumImg.attr('src').replace('-m.','-l.');
		$largeImg.attr('src',src);
		$largeImgContainer.show();
		//加载完成的监听
		$largeImg.on('load',function(){//大图加载完成
			//动态得到大图的尺寸
			var largeWidth = $largeImg.width();
			var largeHeight = $largeImg.height();
			//给右边大盒子设置尺寸
			$largeImgContainer.css({width:largeWidth/2,height:largeHeight/2});
			//显示大图
			$largeImg.show();
			//隐藏loading图片
			$loading.hide();
			console.log($largeImg.width(),$largeImg.height());
			//移动鼠标的监听
			$maskTop.mousemove(function(event){//在移动的过程中反复调用
				//计算出小黄块的left和 top值
				var left = 0;
				var top = 0;
				//事件的坐标
				var eventLeft =event.offsetX;
				var eventTop = event.offsetY;
				left = eventLeft - maskWidth/2;
				top = eventTop- eventTop/2;
				//限制坐标的范围，防止小黄块移动出左边大盒子的范围内：left值的范围在[0,maskTopWidth-maskWidth],top值的范围在[0,maskTopHeight-maskWidth]
				if(left<0){
					left=0
				}else if(left>maskTopWidth-maskWidth){
					left = maskTopWidth-maskWidth;
				}
				if(top<0){
					top=0
				}else if(top>maskTopWidth-maskWidth){
					top = maskTopHeight-maskWidth;
				}
				//给小黄块$mask重新定位
				$mask.css({left:left,top:top});
				
				//移动大图
				
				left = -left * largeWidth/maskTopWidth;
				top = -top* largeHeight/maskTopHeight;
				$largeImg.css({left:left,top:top});
			})
		
		})
			
		
	},function(){
		$mask.hide();
		$largeImgContainer.hide();
      	$largeImg.hide();
	})
}
	
})