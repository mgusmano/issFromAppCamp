Ext.define('ISS.view.astronauts.AstronautsView', {
    extend: 'Ext.dataview.List',
    xtype: 'astronautsview',
    requires: [
        'ISS.view.astronauts.AstronautsViewController',
        'ISS.view.astronauts.AstronautsViewModel'
    ],
    controller: 'astronauts-astronautsview',
    viewModel: {
        type: 'astronauts-astronautsview'
    },
    cls: 'astronauts',
    itemCls: 'astronaut',
    itemTpl: [
        '<tpl if="thumbnail"><img src="{thumbnail}" class="thumbnail"></tpl>',
        '<p class="name">{name}</p>'
    ],
    bind: {
        store: '{astronauts}'
    }
});
