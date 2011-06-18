(function($) {
	$.fn.paginate = function(options) {
		o = $.extend({
			'delimiter' : '<hr>',
			'prev_html': '<a href="">Prev</a>',
			'next_html': '<a href="">Next</a>',
			'container_class': 'jquery-paginate',
			'show_pager': true,
			'pager_class': 'pager',
			'page_id_prefix': 'page',
			'page_class': 'page',
			'show_turner': true,
			'pageturner_class': 'turner',
			'passepartout_class': 'passepartout',
			'speed'  : 1000,
			'easing' : null,
			'postSlideCallback': null
		}, options || {});
		
		return this.each(function(i, paginable) {
		    var that = this;
		    
			var $paginable = $(paginable);
			
			// Split the contents of the paginable
			var pages = $paginable.html().split(o.delimiter);

			var numPages = pages.length;
			var currentPage = 1;

			var itemLength = pages.length;
			var itemWidth = $paginable.width();

			if (itemLength < 2) {
			    return false;
			}

			var $pageCurrent = $('<span class="page-current">'+1+'</span>');
			var $pageTotal   = $('<span class="page-total">'+itemLength+'</span>');
			
			var $container = $paginable.wrap('<div class="'+o.container_class+'"></div>');

    		var getPageId = (function(i) {
    		    return function(pageNum) {
        		    return o.page_id_prefix + '-' + i + '-' + pageNum;
    		    }
    		})(i);
    		
    		var changePageTo = function(to, callback) {
				// We'll start over if target page exceeds page count
				if (to > itemLength) {
					to = 1;
				} 
				else if (to == 0) {
					to = itemLength;
				}
    		    
    		    // Calculate page offset
				var offset = itemWidth * (to - 1) * -1;
				
				// Animate page change
				$paginable.animate({ 'margin-left': offset });
				
				// Execute callback function
				if ($.isFunction(callback)) {
				    callback.apply(that, [ to ]);
				}
				
				// Update current page
				currentPage = to;
				
				// Update current page num
				$pageCurrent.html(to);
    		}
    		
			var $prev = $(o.prev_html).click(function(e) {
    		    changePageTo(currentPage - 1);
    		    return false;
			});
			
			var $next = $(o.next_html).click(function(e) {
    		    changePageTo(currentPage + 1);
    		    return false;
			});
			
			
			// Generate pageturner and append next and prev links
			var $turner = $('<div class="'+o.pageturner_class+'"></div>')
			                    .append($prev)
			                    .append($pageCurrent)
			                    .append('<span class="page-of"> / </span>')
			                    .append($pageTotal)
			                    .append($next);
			
			// Generate pager
			var $pager = $('<div class="'+o.pager_class+'"></div>');

			// Generate passepartout
			var $passepartout = $('<div class="'+o.passepartout_class+'" style="overflow:hidden;"></div>');

			// Resize paginable to fit all pages
			$paginable.width(itemWidth * itemLength);
            
			// Clear contents of the paginable and append pager
			$paginable.html('');
			
			if (o.show_pager) {
			    $paginable.after($pager);
			}
			          
			if (o.show_turner) {
			    $paginable.before($turner);
			}
			
			$(pages).each(function(i, page) {
			    var pageNum = i + 1;
			    
			    // Append page to the paginable
				$paginable.append('<div id="'+ getPageId(pageNum) +'" class="'+o.page_class+'" style="width:'+itemWidth+'px;">'+ page +'</div>');
				
				// Append the page's number to the pager
				$('<a href="#">['+ pageNum +']</a>').click(function(e) {
				    changePageTo(pageNum);
				    return false;
				}).appendTo($pager);
			});

			// Wrap paginable in a passepartout
			$paginable.wrap($passepartout);

			$paginable.show();
		});
	};
	
	function debug($subject) {
		if (window.console && window.console.log) {
			window.console.log($subject);
		}
	};
})(jQuery);