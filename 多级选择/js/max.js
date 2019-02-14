var _jq_treeskipcs = {};

_jq_treeskipcs.value = [];

_jq_treeskipcs.rank = function() {
	return parseInt((new Date).getTime() / 1000);
};

_jq_treeskipcs.tofEmpty = function(v) {
	if(v === 0) {
		v = v.toString();
	}
	var r = false;
	if(v == '' || v == null || v.length == 0) {
		r = true;
	}
	return r;
};

_jq_treeskipcs.jsonloop = function(j, t, c) {
	var _the = this;
	var jData = j;
	var jDlen = jData.length;
	c += '<ul>';
	for(var i = 0; i < jDlen; i++) {
		var ishavedown = 0;
		if(!_the.tofEmpty(jData[i]['child'])) {
			ishavedown = 1;
		}
		c += '<li';
		if(ishavedown == 0) {
			c += ' class="nohavedown"';
		}
		c += '>';
		c += '<div class="_jq_treeskipcs_lineli" data-id="' + jData[i]['id'] + '" data-name="' + jData[i]['name'] + '">';
		c += '<i class="checkbox"></i>';
		c += '<i class="placelen" style="width:' + (t * 25) + 'px;"></i>';
		c += '<i class="havedlis';
		if(ishavedown == 1) {
			c += ' open';
		}
		c += '"></i>';
		c += '<i class="icohouse';
		if(t == 0) {
			c += ' theone';
		}
		c += '"></i>';
		c += '<b>' + jData[i]['name'] + '</b>';
		c += '</div></li>';
		if(ishavedown == 1) {
			c += '<li class="ishavedown">';
			c = _the.jsonloop(jData[i]['child'], t + 1, c);
			c += '</li>';
		}
	}
	c += '</ul>';
	return c;
};

_jq_treeskipcs.upeach = function(n) {
	n.parents('li.ishavedown').each(function() {
		var al = $(this).find('ul>li>._jq_treeskipcs_lineli>i.checkbox').size();
		var cl = $(this).find('ul>li>._jq_treeskipcs_lineli>i.checkbox.checked').size();
		if(cl >= al) {
			$(this).prev().find('._jq_treeskipcs_lineli').addClass('checked').end().find('.checkbox').addClass('checked');
		} else {
			$(this).prev().find('._jq_treeskipcs_lineli').removeClass('checked').end().find('.checkbox').removeClass('checked');
		}
	});
};

_jq_treeskipcs.shut = function(n) {
	$('#_jq_treeskipcs_wraper_' + n).remove();
};

_jq_treeskipcs.skip = function(data) {

	var _the = this;
	if(_the.tofEmpty(data)) data = {};
	var rank = _the.rank();

	var name = _the.tofEmpty(data.name) ? rank : data.name;

	var adata = _the.tofEmpty(data.adata) ? [] : data.adata;

	var cageBgcolor = _the.tofEmpty(data.cageBgcolor) ? '#000' : data.cageBgcolor;
	var cageOpacity = _the.tofEmpty(data.cageOpacity) ? '0.5' : data.cageOpacity;

	var headCaption = _the.tofEmpty(data.headCaption) ? '请选择…' : data.headCaption;
	var sureTxt = _the.tofEmpty(data.sureTxt) ? '确定' : data.sureTxt;
	var sureFun = data.sureFun;
	var cancelTxt = _the.tofEmpty(data.cancelTxt) ? '取消' : data.cancelTxt;
	var cancelFun = data.cancelFun;

	var code = '';
	code += '<div class="_jq_treeskipcs_wraper" id="_jq_treeskipcs_wraper_' + name + '">';
	code += '<div class="_jq_treeskipcs_cageer" id="_jq_treeskipcs_cageer_' + name + '" style="opacity:' + cageOpacity + ';filter:alpha(opacity=' + cageOpacity * 100 + ');"></div>';
	code += '<div class="_jq_treeskipcs_mainer" id="_jq_treeskipcs_mainer_' + name + '">';
	code += '<div class="_jq_treeskipcs_header" id="_jq_treeskipcs_header_' + name + '">' + headCaption + '</div>';
	code += '<div class="_jq_treeskipcs_memoer" id="_jq_treeskipcs_memoer_' + name + '">';
	code += _the.jsonloop(adata, 0, '');
	code += '</div>';
	code += '<div class="_jq_treeskipcs_footer" id="_jq_treeskipcs_footer_' + name + '"><table><tr>';
	code += '<td><a href="javascript:;" class="_jq_treeskipcs_sureer" id="_jq_treeskipcs_sureer_' + name + '">' + sureTxt + '</a></td>';
	code += '<td><a href="javascript:;" class="_jq_treeskipcs_cancel" id="_jq_treeskipcs_cancel_' + name + '">' + cancelTxt + '</a></td>';
	code += '</tr></table></div>';
	code += '</div>';
	code += '</div>';

	$('body').append(code);

	$('#_jq_treeskipcs_wraper_' + name).css({
		'z-index': rank
	});

	$('#_jq_treeskipcs_cageer_' + name).css({
		'background': cageBgcolor
	});

	$('#_jq_treeskipcs_memoer_' + name + ' li>div').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});

	$('#_jq_treeskipcs_memoer_' + name + ' i.havedlis').click(function() {
		if($(this).hasClass('open')) {
			$(this).removeClass('open').addClass('close').parent().parent().next().hide();
		} else if($(this).hasClass('close')) {
			$(this).removeClass('close').addClass('open').parent().parent().next().show();
		}
	});

	$('#_jq_treeskipcs_memoer_' + name + ' i.checkbox').click(function() {
		if($(this).hasClass('checked')) {
			var _this = $(this);
			_this.removeClass('checked').parent().removeClass('checked');
			var next = _this.parent().parent().next();
			if(next.hasClass('ishavedown')) {
				next.find('.checkbox').removeClass('checked').parent().removeClass('checked');
			}
			_the.upeach(_this);
		} else {
			var _this = $(this);
			_this.addClass('checked').parent().addClass('checked');
			var next = _this.parent().parent().next();
			if(next.hasClass('ishavedown')) {
				next.find('.checkbox').addClass('checked').parent().addClass('checked');
			}
			_the.upeach(_this);
		}
	});

	$('#_jq_treeskipcs_sureer_' + name).click(function() {

		_the.value = [];

		var endval = '';

		$('#_jq_treeskipcs_memoer_' + name + ' .checkbox.checked').each(function(index) {
			var _this = $(this);
			if(_this.parent().parent().hasClass('nohavedown')) {
				_this.parents('.ishavedown').prev().each(function() {
					var cb = $(this).find('.checkbox');
					var li = $(this).find('._jq_treeskipcs_lineli');
					if(cb.hasClass('checked')) {
						endval = li.attr('data-id');
					} else {
						endval = _this.parent().attr('data-id');
					}
				});
			}
		});

		if($.isFunction(sureFun)) {
			if(sureFun.apply() != false) {
				_the.shut(name);
			}
		} else {
			_the.shut(name);
		}
	});

	$('#_jq_treeskipcs_cancel_' + name).click(function() {
		if($.isFunction(cancelFun)) {
			if(cancelFun.apply() != false) {
				_the.shut(name);
			}
		} else {
			_the.shut(name);
		}
	});

};