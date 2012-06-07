/**
 * Created with JetBrains WebStorm.
 * User: mali01
 * Date: 2012-06-07
 * Time: 12:51
 *
 * @author mats.lindblad[at]gmail.com
 * @example $('.fixed-table-header').fixedTableHeader();
 */
(function() {
    $.fn.fixedTableHeader = function(o) {
        var options = $.extend({
                fixedTop: 0,
                interval: 250
            }, o),
            didScroll = false,
            didResize = false,
            $win = $(window);

        return this.each(function() {
            var $this = $(this),
                $colgroup = $('colgroup', $this),
                $thead = $('thead', $this),
                $colgroupClone = $colgroup.clone(false),
                $theadClone = $thead.clone(false),
                leftOffset = $this.offset().left,
                topOffset = $this.offset().top,
                tableWidth = $this.width(),
                $tableClone = $('<table></table>');

            $tableClone.addClass('fixed-table-header').css({ margin: '0' });
            // convert all ID's to className's in the clone to avoid conflicts in the HTML
            $colgroupClone.find('col[id]').each(function() {
                $(this).addClass($(this).attr('id'));
                $(this).removeAttr('id');
            });
            $theadClone.css({
                backgroundColor: $thead.css('background-color')
            });
            $tableClone.append($colgroupClone);
            $tableClone.append($theadClone);
            $tableClone.css({
                display: 'none',
                left: leftOffset,
                position: 'fixed',
                top: parseInt(options.fixedTop, 10),
                width: tableWidth
            });
            $this.before($tableClone);

            $win.scroll(function() {
                didScroll = true;
            });

            $win.resize(function() {
                didResize = true;
            });

            setInterval(function() {
                if ( didScroll ) {
                    didScroll = false;
                    var scrollTop = $win.scrollTop();
                    if (scrollTop > topOffset) {
                        $thead.css({ visibility: 'hidden' });
                        $tableClone.show();
                    }
                    else {
                        $thead.css({ visibility: 'visible' });
                        $tableClone.hide();
                    }
                }
                if (didResize) {
                    didResize = false;
                    // don't parseInt this value because it needs to match exactly
                    $tableClone.css({ left: $this.offset().left });
                }
            }, parseInt(options.interval, 10));

        });
    };

    $('.fixed-table-header').fixedTableHeader();
})(jQuery);
