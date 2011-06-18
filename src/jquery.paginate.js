(function($) {
	$.fn.paginate = function(options) {
		o = $.extend({
			'delimiter' : '<hr>',
			'prev_html': '<a href="">Prev</a>',
			'next_html': '<a href="">Next</a>',
			'pager_class': 'pager',
			'page_id_prefix': 'page',
			'speed'  : 1000,
			'easing' : null,
			'postSlideCallback': null
		}, options || {});
		
		return this.each(function(i, paginable) {
			var $paginable = $(paginable);
			
			// Split the contents of the paginable
			var pages = $paginable.html().split(o.delimiter);
			
			var numPages = pages.length;
			var currentPage = 1;
			
    		var getPageId = (function(i) {
    		    return function(pageNum) {
        		    return o.page_id_prefix + '-' + i + '-' + pageNum;
    		    }
    		})(i);
    		
    		var changePage = function(to, callback) {
		        $('#' + getPageId(currentPage)).fadeOut(300, function() {
		            $('#' + getPageId(to)).fadeIn(300, function() {
    			        currentPage = to;
    			        if (currentPage == 1) {
    			            if ($prev.is(':visible')) {
        			            $prev.hide();
        			        }   
        			        if ($next.is(':hidden')) {
    			                $next.show();
        			        }
    			        }
    			        else if (currentPage == numPages) {
    			            if ($next.is(':visible')) {
        			            $next.hide();
    			            }
    			            if ($prev.is(':hidden')){
    			                $prev.show();
			                }
    			        }
    			        else {
    			            if ($prev.is(':hidden')){
    			                $prev.show();
			                }
        			        if ($next.is(':hidden')) {
    			                $next.show();
        			        }
    			        }
		            });
		        })
    		}

			var $prev = $(o.prev_html).click(function(e) {
			    e.preventDefault();
			    
			    var nextPage = currentPage - 1;
			    if (nextPage > 0) {
			        changePage(nextPage);
			    }
			}).hide();
			
			var $next = $(o.next_html).click(function(e) {
			    e.preventDefault();
			    
			    var nextPage = currentPage + 1;
			    if (nextPage <= numPages) {
			        changePage(nextPage);
			    }
			}).hide();
			
			var $turner = $('<div class="pageturner"></div>').append($next).append($prev);
			
			var $pager = $('<div class="'+o.pager_class+'"></div>');

			// Clear contents of the paginable and append pager
			$paginable.html('')
			          .after($pager)
			          .after($turner);
			
			$(pages).each(function(i, page) {
			    var pageNum = i + 1;
			    
			    // Append page content to the paginable
				$paginable.append('<div id="'+ getPageId(pageNum) +'" class="page" style="display:none;">'+ page +'</div>');
				
				// Append the page's number to the pager
				$('<a href="#">['+ pageNum +']</a>').click(function(e) {
				    e.preventDefault();
				    
				    changePage(pageNum);
				}).appendTo($pager);
			});

            // Show the first page
			$('#' + getPageId(currentPage), $paginable).fadeIn(300, function(e) {
			    $next.fadeIn();
			});

			$paginable.show();
		});
	};
	
	function debug($subject) {
		if (window.console && window.console.log) {
			window.console.log($subject);
		}
	};
})(jQuery);