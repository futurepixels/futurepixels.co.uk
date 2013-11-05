// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
    }());
}

// Place any jQuery/helper plugins in here.

(function( $ ) {
  $.fn.responsiveNav = function(options) {
	  
	  var settings = $.extend( {
	        'nav' : '.class'
	      }, options);
		  
	  var nav = settings.nav;
	  
	  this.click(function(e) {
		  $(nav + ' li').each(function() {
			  if(!$(this).hasClass('js--logo'))
			  {
				  if($(this).is(':visible'))
				  {
					  $(this).slideUp();
				  } else {
					  $(this).slideDown();
				  }
				  
				  // $(this).toggle();
			  }
		  })
		  e.preventDefault();
	  })

  };
})( jQuery );