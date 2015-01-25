angular.module('starter.filters', [])

.filter('distance', function() {
    return function(items, position) {
        if (angular.isUndefined(position)) {
            return items;
        }

        var toRad = function(el) {
           return el * Math.PI / 180;
        }

        var score = function(el) {
            var lat2 = position.latitude;
            var lon2 = position.longitude; 
            var lat1 = el.lat;
            var lon1 = el.lng;

            var R = 6371;
            var x1 = lat2-lat1;
            var dLat = toRad(x1)
            var x2 = lon2-lon1;
            var dLon = toRad(x2);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                            Math.sin(dLon/2) * Math.sin(dLon/2);  
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; 
            return d;
        }


        items = items.map(function(a) {
            return [score(a), a];
        });

        items = items.sort();
        return items.map(function(a) {
            return a[1];
        });
    }
});
