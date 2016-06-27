Ext.define('ISS.view.map.MapView', {
    extend: 'Ext.Container',
    xtype: 'mapview',
    layout: 'vbox',

    requires: [
				'Ext.Map',
        'ISS.view.map.MapViewController',
        'ISS.view.map.MapViewModel'
    ],

    controller: 'map-mapview',
    viewModel: {
        type: 'map-mapview'
    },

    items: [{
        xtype: 'container',
        docked: 'top',
        padding: 2,
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [{
            xtype: 'label',
            html: '&nbsp;', // Just so it takes up space until it's dynamically set.
            bind: {
                html: '{location}'
            }
        }]
    }, {
        xtype: 'map',
        flex: 1,
        reference: 'map',
        mapOptions: {
            zoom: 3
        }
    }]
});
