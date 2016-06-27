Ext.define('ISS.Application', {
	extend: 'Ext.app.Application',
	name: 'ISS',
	launch: function () {
		Ext.Viewport.add({ xtype: 'mainview' });
		var element = document.getElementById("splash");
		element.parentNode.removeChild(element);
	},
	onAppUpdate: function() {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function(choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
