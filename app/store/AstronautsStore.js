Ext.define('ISS.store.AstronautsStore', {
	extend: 'Ext.data.Store',
	alias: 'store.astronautsstore',
	requires: ['ISS.model.Astronaut', 'ISS.util.Thumbnail'],
	model: 'ISS.model.Astronaut',
	listeners: {
		load: 'onLoad'
	},
	onLoad: function(store) {
		store.each(function(record) {
				ISS.util.Thumbnail.getUrl(record.data.name).then(
					function(url) {
							console.log('Updating ' + record.data.name + ' with the thumbnail url ' + url);
							record.set('thumbnail', url);
					},
					function() {
							console.log(record.data.name + ' does not have a thumbnail');
					});
		});
	}
});
