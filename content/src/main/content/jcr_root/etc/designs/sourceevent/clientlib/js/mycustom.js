/** a JS file that shall be be included */

	if (matchMedia) {
		var mq = window.matchMedia("(min-width: 600px)");
		mq.addListener(WidthChange); 
		WidthChange(mq);
	} 
	function WidthChange(mq) { 
		if (mq.matches) {} 
		else { 
			$(".mobileNav ul").slideUp(); 
			$(document).on("click", ".menu", function() { 
				$(".mobileNav ul").slideToggle(); 
			}); 
		}
	}
	
