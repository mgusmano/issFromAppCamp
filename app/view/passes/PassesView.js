Ext.define('ISS.view.passes.PassesView', {
    extend: 'Ext.dataview.List',
    xtype: 'passesview',
    requires: [
        'ISS.view.passes.PassesViewController',
        'ISS.view.passes.PassesViewModel'
    ],

    controller: 'passes-passesview',
    viewModel: {
        type: 'passes-passesview'
    },
    padding: 8,
    itemTpl: '{[ISS.view.passes.PassesViewController.todayTomorrow(values)]} at {[Ext.util.Format.date(values.risetime, "G:i")]}, for {[ISS.view.passes.PassesViewController.minutes(values)]}'

});
