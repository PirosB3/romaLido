angular.module('starter.services', [])

.factory('Timetables', function($http, $q) {

    var tables = $q.defer();
    $http.get('js/data/timetables-mon-fri.js')
        .then(function(res) {
            var data = res.data;
            var timetables = {}
            res.data.forEach(function(station) {
                station.data.forEach(function(direction) {
                    var key = [station._id, direction.direction];
                    timetables[key] = direction.data;
                });
            });
            tables.resolve(timetables)
        });

    return {
        getLastNTimes: function(station, direction, startingTime, n) {
            var ret = $q.defer();
            tables.promise.then(function(timetables) {
                var tt = timetables[[station, direction]];
                var max_ptr = tt.length -1;
                var days = 0;
                var ptr = 0;

                var res = [];
                while (n > 0) {
                    var el = tt[ptr].split(':');
                    var hour = el[0]; var minute = el[1];
                    var clonedTime = startingTime.clone()
                        .setHours(hour)
                        .setMinutes(minute)
                        .addDays(days);
                    if (clonedTime > startingTime) {
                        res.push(clonedTime);
                        n--;
                    }
                    ptr++;
                    if (ptr > max_ptr) {
                        days++;
                        ptr = 0;
                    }
                }
                ret.resolve(res);
            });
            return ret.promise;
        }
    }
})

.factory('Stations', function() {
    return [
        { name: "Cristoforo Colombo", id: "COLOMBO", lat: 41.71457077603344, lng: 12.322139963507652 },
        { name: "Castel Fusano", id: "CASTELFUSANO", lat: 41.72072119663713, lng: 12.308664545416832 },
        { name: "Stella Polare", id: "STELLA POLARE", lat: 41.7272986, lng: 12.295014400000014 },
        { name: "Lido Centro", id: "LIDO CENTRO", lat: 41.732956220432115, lng: 12.284116968512535 },
        { name: "Lido Nord", id: "LIDO NORD", lat: 41.736836, lng: 12.282243999999992 },
        { name: "Ostia Antica", id: "OSTIA ANTICA", lat: 41.757803439847876, lng: 12.304501757025719 },
        { name: "Acilia", id: "ACILIA", lat: 41.78334506161072, lng: 12.360549196600914 },
        { name: "Casal Bernocchi", id: "CASAL BERNOCCHI", lat: 41.78932890814987, lng: 12.377457842230797 },
        { name: "Vitinia", id: "VITINIA", lat: 41.79521621201978, lng: 12.403764948248863 },
        { name: "Tor di Valle", id: "TOR DI VALLE", lat: 41.81949562460054, lng: 12.436852678656578 },
        { name: "EUR Magliana", id: "EUR MAGLIANA", lat: 41.83964150792835, lng: 12.463417276740074 },
        { name: "Basilica S. Paolo", id: "BASILICA SAN PAOLO", lat: 41.85613722260528, lng: 12.47826598584652 },
        { name: "Porta S. Paolo", id: "PORTA SAN PAOLO", lat: 41.874993389475755, lng: 12.48174212872982 },
    ];
})

.factory('Storage', ['$window', '$rootScope', function($window, $rootScope) {
  return {
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
      $rootScope.$emit('storage.changed');
    },
    getObject: function(key) {
      try {
        return JSON.parse($window.localStorage[key] || '{}');
      } catch (e) {
        return {};
      }
    }
  }
}]);
