/**
 * Created by 0xFranCiS on May 25, 2016.
 */

Ext.define('Finetrust.view.supervisejournal.MonthViewTemplate', {
    extend: 'Ext.XTemplate',

    row_num: 6,
    col_num: 7,
    WEEK_HEADER_TEXT: ['日', '一', '二', '三', '四', '五', '六'],

    constructor: function (cfg) {
        var me = this,
            mean_height = 100 / me.row_num;

        Ext.apply(me, cfg);

        me.callParent([
            '<div class="app-cal-jnl-month-inner">' +
                '<div class="app-cal-jnl-month-header">' +
                    '<table class="app-cal-jnl-month-tbl" cellpadding="0" cellspacing="0">' +
                        '<tbody>' +
                            '<tr>' +
                            '<tpl for="week_headers">' +
                                '<th>{.}</th>' +
                            '</tpl>' +
                            '</tr>' +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
                '<div class="app-cal-jnl-month-body">' +
                    '<table class="app-cal-jnl-month-tbl">' +
                        '<tbody>' +
                            '<tpl for="events">' +
                            '<tr style="height: ' + mean_height + '%;">' +
                                '<tpl for=".">' +
                                '<td>' +
                                    '<div class="app-cal-jnl-month-day-day">{date:date("j")}</div>' +
                                    '<div class="app-cal-jnl-month-day-content">{event}&nbsp</div>' +
                                '</td>' +
                                '</tpl>' +
                            '</tr>' +
                            '</tpl>' +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
            '</div>'
        ]);
    }

});