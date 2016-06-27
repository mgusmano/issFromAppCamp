Ext.define('ISS.view.passes.PassesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.passes-passesview',
    requires: ['Ext.util.Geolocation'],

    statics: {
        todayTomorrow: function(values) {
            var days = Ext.Date.getDayOfYear(values.risetime) - Ext.Date.getDayOfYear(this.today);
            if (days === 0) {
                return 'Today';
            } else if (days === 1) {
                return 'Tomorrow';
            } else {
                return 'In ' + days + 'days';
            }
        },
        today: new Date(),
        minutes: function(values) {
            var minutes = Math.floor(values.duration / 60);
            var s = Ext.util.Format.plural(minutes, 'minute');
            var seconds = (values.duration % 60);
            if (seconds > 0) {
                s += ' ' + Ext.util.Format.plural(seconds, 'second');
            }
            return s;
        }
    },

    initViewModel: function(vm) {
        var me = this;
        me.determineUserLocation();
    },
    determineUserLocation: function() {
        // If you're above or below 51.6 degrees latitude, then you'll can delete
        // everything in this method, except for a call to loadPasses(), passing in
        // a hard-coded location. Examples:
        // this.loadPasses({latitude:44.4974569,longitude:-92.2629124}); // Stockholm, Wisconsin
        // this.loadPasses({latitude:26.3490455,longitude:-98.1680219}); // Edinburg, Texas
        // this.loadPasses({latitude:46.734897,longitude:-117.000883}); // Moscow, Idaho
        var me = this;
        var geo = Ext.create('Ext.util.Geolocation', {
            autoUpdate: false
        });
        geo.updateLocation(function(geo) {
            if (geo) {
                me.loadPasses({
                    latitude: geo.getLatitude(),
                    longitude: geo.getLongitude()
                });
            }
        });
    },
    loadPasses: function(coordinate) {
        var passes = this.getView().getStore('passes');
        passes.load({
            params: {
                lat: coordinate.latitude,
                lon: coordinate.longitude
            }
        });
    }

});
