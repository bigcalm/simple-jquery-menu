var $j = jQuery.noConflict();

$j(document).ready(function() {
	updateJMenus();
});

function updateJMenus()
{
	$j('ul.jMenu').each(function(index) {
		
		// hide sub menus
		$j('ul', this).hide();

		// manage child menus
		$j('li:has(ul)', this).each(function(index) {
			manageSubMenu(this);
		});
    
	});
}

function manageSubMenu(menuParent)
{
	// display hint that this menu item has a sub menu
	$j('a:first', menuParent).addClass('hasSubMenu');
	
	// handle the mouse hovering events
	$j(menuParent).mouseenter(function() {

		/* these declarations are in here, just in case the browser is resized or scrolled */
		var windowWidth = $j(window).width();
		var windowHeight = $j(window).height();
	    
		var windowLeftBorder = $j(window).scrollLeft();
		var windowRightBorder = Number($j(window).scrollLeft() + $j(window).width());
		var windowTopBorder = $j(window).scrollTop();
		var windowBottomBorder = Number($j(window).scrollTop() + $j(window).height());
	    
		var parentWidth = $j(this).outerWidth();
		var parentHeight = $j(this).outerHeight();
		var parentWindowOffsetX = Number($j(this).offset().left - windowLeftBorder);
		var parentWindowOffsetY = Number($j(this).offset().top - windowTopBorder);

		var parentOffsetX = $j(this).offset().left;
		var parentOffsetY = $j(this).offset().top;
	    
		var subMenu = $j('ul:first', this);
	    
		var subMenuWidth =   $j(subMenu).outerWidth();
		var subMenuHeight =  $j(subMenu).outerHeight();

		if ($j(this).parent().hasClass('jMenu'))
		{
			// 1st level sub menu needs to appear directly below the 1st level menu items
			// don't show the menu any further right than the end of the top level UL right margin
			if ((parentWindowOffsetX + subMenuWidth) >= windowWidth)
			{
				$j(subMenu).css('left', windowWidth - subMenuWidth);
			}
			else
			{
				$j(subMenu).css('left', parentWindowOffsetX);
			}

			// show the menu above the top level menu items if we have no room bellow
			if ((parentWindowOffsetY + subMenuHeight) >= windowHeight)
			{
				$j(subMenu).css('top', parentWindowOffsetY - subMenuHeight);
			}
		}
		else
		{
			// position the sub menu off to the right by the width of the parent minus a few pixles
			// display to the left if the window is too small
			if ((parentWindowOffsetX + parentWidth + subMenuWidth) >= windowWidth)
			{
				$j(subMenu).css('left', (parentWindowOffsetX - subMenuWidth) + 8); /* show to the left */
			}
			else
			{
				$j(subMenu).css('left', (parentWindowOffsetX + parentWidth) - 8); /* show to the right */
			}
			
			if ((parentWindowOffsetY + subMenuHeight) >= windowHeight)
			{
				$j(subMenu).css('bottom', 0);
			}
			else
			{
				$j(subMenu).css('top', (parentWindowOffsetY - 8));
			}
		}
		$j(subMenu).show();
	    
		$j(menuParent).mouseleave(function() {
			setTimeout("jMenuMouseLeave(this)", 500);
		});
	});
	

	// manage child menus
	$j('li:has(ul)', menuParent).each(function(index) {
		manageSubMenu(this);
	});
	
}

function jMenuMouseLeave(menuParent)
{
	var subMenu = $j('ul:first', menuParent);
	alert(subMenu.offset());
	$j(subMenu).hide();
}
