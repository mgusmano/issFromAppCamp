Ext.define('ISS.Application', {
    extend: 'Ext.app.Application',
    name: 'ISS',
		requires: [
			'ISS.view.main.MainView'
		],

		launch: function () {
			//var me = this;
			if (typeof samsung == 'undefined') {
				Ext.Viewport.add({ xtype: 'mainview' });
				var element = document.getElementById("splash");
				element.parentNode.removeChild(element);
				return;
			};
			var enablePassword = true;
			var title = 'The Cool Sencha ISS Application';
			var titleColor = 7237382;
			var canceledOnTouchOutside = true;
			var dialogBgTransparency = 99;
			ExtSamsungSPass.startIdentifyWithDialog( enablePassword, title, titleColor, canceledOnTouchOutside, dialogBgTransparency)
			.then(function(response) {
					switch (response.eventStatus) {
						case samsung.spass.STATUS_AUTHENTIFICATION_PASSWORD_SUCCESS:
						case samsung.spass.STATUS_AUTHENTIFICATION_SUCCESS:
							Ext.Viewport.add({ xtype: 'mainview' });
							var element = document.getElementById("splash");
							element.parentNode.removeChild(element);
							break;
						case samsung.spass.STATUS_AUTHENTIFICATION_FAILED:
						case samsung.spass.STATUS_OPERATION_DENIED:
						case samsung.spass.STATUS_QUALITY_FAILED:
						case samsung.spass.STATUS_SENSOR_FAILED:
						case samsung.spass.STATUS_TIMEOUT_FAILED:
						case samsung.spass.STATUS_USER_CANCELLED:
						case samsung.spass.STATUS_USER_CANCELLED_BY_TOUCH_OUTSIDE:
							var theLoadingText = document.getElementById("theLoadingText");
							theLoadingText.innerHTML = "Load Failed";
							break;
						default:
								alert('Unknown Status: ' + response.eventStatus);
							break;
					}
				}, function(e) {
					if (e.error == 'UNSUPPORTED_OPERATION_EXCEPTION') {
						Ext.Viewport.add({ xtype: 'mainview' });
						var element = document.getElementById("splash");
						element.parentNode.removeChild(element);
					}
					else {
						alert('error: ' + JSON.stringify(error));
					}
				}
			)
		},
		
		onAppUpdate: function () {
			Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
				function (choice) {
						if (choice === 'yes') {
							window.location.reload();
						}
				}
			);
		}
});
