fixed-table-header
==================

Makes a THEAD fixed when it's scrolled out of view.

The JS also includes the fixedTableFooter plugin which shows the TFOOT when it's out of viewport.

## Example
- See the index.html file.
- $('TABLE_SELECTOR').fixedTableHeader() requires a colgroup, see index.html for example of this.
- $('TABLE_SELECTOR').fixedTableFooter() also requires this to maintain column widths (the reason I wrote this in the
 first place).
