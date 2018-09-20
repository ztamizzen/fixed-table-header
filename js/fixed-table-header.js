/**
 * Created with JetBrains WebStorm.
 * User: mali01
 * Date: 2012-06-07
 * Time: 12:51
 *
 * @author mats.lindblad[at]gmail.com
 */
(function ($) {

    /**
     * Positions a <thead> at the top of a table, even when scrolling.
     * @example See bottom of file!
     * @param {Object} o Objects of settings
     * @returns {Object} Chainable jQuery object!
     */
    $.fn.fixedTableHeader = function (o) {
        var options = $.extend({
                fixedTop: 0,
                interval: 250
            }, o),
            didScroll = false,
            didResize = false,
            $win = $(window);

        return this.each(function () {
            var $this = $(this),
                $colgroup = $('colgroup', $this),
                $thead = $('thead', $this),
                $colgroupClone = $colgroup.clone(false),
                $theadClone = $thead.clone(false),
                leftOffset = $this.offset().left,
                topOffset = $this.offset().top,
                tableWidth = $this.width(),
                $tableClone = $('<table></table>');

            $tableClone.addClass('fixed-table-header').css({
                margin: '0'
            });
            // convert all ID's to className's in the clone to avoid conflicts in the HTML
            $colgroupClone.find('col[id]').each(function () {
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

            $win.scroll(function () {
                didScroll = true;
            });

            $win.resize(function () {
                didResize = true;
            });

            setInterval(function () {
                if (didScroll) {
                    didScroll = false;
                    positionHeader($this, topOffset);
                }
                if (didResize) {
                    didResize = false;
                    // don't parseInt this value because it needs to match exactly
                    $tableClone.css({
                        left: $this.offset().left
                    });
                }
            }, parseInt(options.interval, 10));

            function positionHeader() {
                var scrollTop = $win.scrollTop();
                if (scrollTop > topOffset) {
                    $thead.css({
                        visibility: 'hidden'
                    });
                    $tableClone.show();
                } else {
                    $thead.css({
                        visibility: 'visible'
                    });
                    $tableClone.hide();
                }
                $tableClone.css({
                    left: $this.offset().left
                });
            }

            positionHeader();
        });
    };

    $.fn.fixedTableFooter = function (o) {
        var options = $.extend({
                fixedBottom: 0,
                interval: 250
            }, o),
            $win = $(window),
            didScroll = false,
            didResize = false;

        return this.each(function () {
            var $this = $(this),
                $tfoot = $('tfoot', $this),
                $colgroup = $('colgroup', $this),
                $colgroupClone = $colgroup.clone(false),
                $tfootClone = $tfoot.clone(false),
                leftOffset = $this.offset().left,
                tableWidth = $this.width(),
                $tableClone = $('<table></table>');

            $tableClone.addClass('fixed-table-footer').css({
                margin: '0'
            });
            // convert all ID's to className's in the clone to avoid conflicts in the HTML
            $colgroupClone.find('col[id]').each(function () {
                $(this).addClass($(this).attr('id'));
                $(this).removeAttr('id');
            });
            $tfootClone.css({
                backgroundColor: $tfoot.css('background-color')
            });
            $tableClone.append($colgroupClone);
            $tableClone.append($tfootClone);
            $tableClone.css({
                display: 'none',
                left: leftOffset,
                position: 'fixed',
                bottom: parseInt(options.fixedBottom, 10),
                width: tableWidth
            });
            $this.before($tableClone);

            $win.scroll(function () {
                didScroll = true;
            });

            $win.resize(function () {
                didResize = true;
            });

            setInterval(function () {
                if (didScroll) {
                    didScroll = false;
                    positionFooter();
                }
                if (didResize) {
                    $tableClone.css({
                        left: $this.offset().left
                    });
                }
            }, options.interval);

            function positionFooter() {
                var winOffset = parseInt($win.scrollTop() + $win.height(), 10);
                var topOffset = parseInt($this.height() + $this.offset().top, 10);
                var shouldShow = winOffset - topOffset;

                if (shouldShow < 0) {
                    $tfoot.css({
                        visibility: 'hidden'
                    });
                    $tableClone.show();
                } else {
                    $tfoot.css({
                        visibility: 'visible'
                    });
                    $tableClone.hide();
                }
                $tableClone.css({
                    left: $this.offset().left
                });
            }

            positionFooter();
        });
    };

    let tBody = $("#theTable > tbody"),
        firstTableRow = tBody.find("tr:first"),
        indexCell = firstTableRow.find("td:first"),
        index = Number(indexCell.text()),
        stop = 398;

    for (; index < stop; index++) {
        let newTableRow = `<tr>
                    <td>${index}</td>
                    <td>Mats Lindblad</td>
                    <td>46</td>
                    <td>Male</td>
                    <td>Skarpnäck</td>
                </tr>`;
        tBody.append(newTableRow);
    }

    $('.fixed-table-header').fixedTableHeader();
    $('.fixed-table-footer').fixedTableFooter();

})(jQuery);
