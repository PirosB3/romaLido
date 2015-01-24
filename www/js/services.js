angular.module('starter.services', [])

.factory('Timetables', function($http, $q) {

    var tables = $q.defer();
    $http.get('/js/data/timetables-mon-fri.js')
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
        { name: "Cristoforo Colombo", id: "COLOMBO" },
        { name: "Castel Fusano", id: "CASTELFUSANO" },
        { name: "Stella Polare", id: "STELLA POLARE" },
        { name: "Lido Centro", id: "LIDO CENTRO" },
        { name: "Lido Nord", id: "LIDO NORD" },
        { name: "Ostia Antica", id: "OSTIA ANTICA" },
        { name: "Acilia", id: "ACILIA" },
        { name: "Casal Bernocchi", id: "CASAL BERNOCCHI" },
        { name: "Vitinia", id: "VITINIA" },
        { name: "Tor di Valle", id: "TOR DI VALLE" },
        { name: "EUR Magliana", id: "EUR MAGLIANA" },
        { name: "Basilica S. Paolo", id: "BASILICA SAN PAOLO" },
        { name: "Porta S. Paolo", id: "PORTA SAN PAOLO" },
    ];
});
