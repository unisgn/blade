/**
 * Created by 0xFranCiS on May 24, 2016.
 */
Ext.define('Finetrust.view.supervisejournal.MonthView', {
    extend: 'Ext.Component',

    xtype: 'journal-cal-month',

    layout: 'fit',

    width: 800,

    height: 350,

    tpl: Ext.create('Finetrust.view.supervisejournal.MonthViewTemplate'),

    data: {
        events: [
            [
                {date: '2016-04-24'},
                {date: '2016-04-25'},
                {date: '2016-04-26', event: 'hallo'},
                {date: '2016-04-27'},
                {date: '2016-04-28', event: 'hiya'},
                {date: '2016-04-29'},
                {date: '2016-04-30'}
            ], [
                {date: '2016-05-01'},
                {date: '2016-05-02', event: 'maybe you are the best of all and we need your help'},
                {date: '2016-05-03'},
                {date: '2016-05-04'},
                {date: '2016-05-05'},
                {date: '2016-05-06'},
                {date: '2016-05-07'}
            ], [
                {date: '2016-05-08'},
                {date: '2016-05-09'},
                {date: '2016-05-10'},
                {date: '2016-05-11'},
                {date: '2016-05-12'},
                {date: '2016-05-13'},
                {date: '2016-05-14'}
            ], [
                {date: '2016-05-15'},
                {date: '2016-05-16'},
                {date: '2016-05-17'},
                {date: '2016-05-18'},
                {date: '2016-05-19'},
                {date: '2016-05-20'},
                {date: '2016-05-21'}
            ], [
                {date: '2016-05-22'},
                {date: '2016-05-23'},
                {date: '2016-05-24'},
                {date: '2016-05-25'},
                {date: '2016-05-26'},
                {date: '2016-05-27'},
                {date: '2016-05-28'}
            ], [
                {date: '2016-05-29'},
                {date: '2016-05-30'},
                {date: '2016-05-31'},
                {date: '2016-06-01'},
                {date: '2016-06-02'},
                {date: '2016-06-03'},
                {date: '2016-06-04'}
            ]
        ],
        week_headers: ['日', '一', '二', '三', '四', '五', '六']
    },

    prepareData: function (data) {
        Ext.apply(data, {

        });

        return data;
    }
});