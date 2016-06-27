Ext.define('ISS.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainview',
    requires: [
        'ISS.view.main.MainController',
        'ISS.view.main.MainModel',
        'ISS.view.map.MapView',
        'ISS.view.passes.PassesView',
        'ISS.model.Pass',
        'ISS.view.astronauts.AstronautsView',
        'ISS.store.AstronautsStore'
    ],
    controller: 'main-main',
    viewModel: {
        type: 'main-main'
    },

    tabBarPosition: 'bottom',

    items: [{
        xtype: 'mapview',
        title: 'Map',
        iconCls: 'x-fa fa-crosshairs'
    }, {
        xtype: 'passesview',
        title: 'Passes',
        iconCls: 'x-fa fa-list-ul',
        store: {
            model: 'ISS.model.Pass'
        }
    }, {
        xtype: 'astronautsview',
        title: 'Astronauts',
        iconCls: 'x-fa fa-users',
        store: {
            type: 'astronautsstore',
            autoLoad: true
        }
    }]

});
