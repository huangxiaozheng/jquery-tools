(function($) {
	
	$.extend({
		'toast': {
			'fail': function(text, delay) {
				fail(text, delay)
			}
		}
	});


	function fail(text, delay) {
		var $Toast = '<div id="yb-toast" style="position: fixed;left: 0;right: 0;top: 0;bottom: 0;">' +
			'<div style="height: 100%;display: flex;justify-content: center;align-items: center;">' +
			'<p style="padding: 1.5rem;margin: 1rem;background-color: rgba(0, 0, 0, .4);border-radius: .5rem;color: #fff;font-size: 1.4rem;">' +
			text +
			'</p>' +
			'</div>' +
			'</div>'
			
		$('body').append($Toast)
		setTimeout(function() {
			$("#yb-toast").remove()
		}, (delay || .3) * 1000)
	};
})(jQuery)