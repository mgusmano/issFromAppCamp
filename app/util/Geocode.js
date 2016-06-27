Ext.define('ISS.util.Geocode', {
    extend: 'Ext.util.Observable',
    requires: [],
    singleton: true,

    getGeocoder: function() {
        this.geoCoder = this.geoCoder || new google.maps.Geocoder();
        return this.geoCoder;
    },

    determineCurrentLocation: function() {
        var deferred = new Ext.Deferred();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var ll = position.coords;
                deferred.resolve({
                    latitude: ll.latitude,
                    longitude: ll.longitude
                });
            });
        } else {
            deferred.reject('Your browser does not support geolocation.');
        }
        return deferred.promise;
    },

    determineCity: function(ll) {

        var deferred = new Ext.Deferred();

        // Error checking
        ll = ll || {};
        if (Ext.isObject(ll)) {
            if (!(ll.latitude && ll.longitude)) {
                deferred.reject('determineCity requires a single parameter of the form {latitude: 34.1, longitude: -90.3}');
            }
        }

        this.getGeocoder().geocode({
                location: new google.maps.LatLng(ll.latitude, ll.longitude)
            },
            function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    // results is a Google Maps GeocoderResults array. Within it
                    // somewhere is an item of type "locality" (city). Find it
                    // and save the city's name.

                    var localityResult;

                    for (var i = 0; i < results.length; i++) {
                        var result = results[i];
                        var types = Ext.Object.getValues(result.types);
                        var contains = Ext.Array.contains;
                        if (contains(types, "locality") || contains(types, 'administrative_area_level_1')) {
                            localityResult = result;
                            break;
                        }
                    }
                    var city = localityResult ? localityResult.formatted_address : 'Unknown';
                    deferred.resolve(city);
                } else {
                    deferred.reject('Could not geocode ' + ll + ',' + ll);
                }
            });
        return deferred.promise;
    },

    determineLocation: function(address) {

        var deferred = new Ext.Deferred();

        if (!Ext.isString(address)) deferred.reject('determineLocation() requires one parameter, an address.');

        address = '' || address;
        address = address.trim();
        if (address) {
            this.getGeocoder().geocode({
                    address: address
                },
                function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var latLng = results[0].geometry.location;
                        deferred.resolve({
                            latitude: latLng.lat(),
                            longitude: latLng.lng()
                        });
                    } else {
                        deferred.reject('Could not geocode "' + address + '"');
                    }
                });
        } else {
            this.determineCurrentLocation().then(function(coordinates) {
                deferred.resolve(coordinates);
            }, function(error) {
                deferred.reject(error);
            });
        }

        return deferred.promise;
    }
});
