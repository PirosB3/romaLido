var DIRECTIONS_TO_SCOPE = [
    ['towards-rome', 'nextTrainsTowardsRome'],
    ['towards-ostia', 'nextTrainsTowardsOstia']
];

angular.module('starter.directives', [])

.directive('stationCard', function($rootScope, Storage, Timetables) {
    return {
        restrict: 'E',
        scope: {
            stationName: "=",
            stationId: "="
        },
        templateUrl: '/templates/directive-station.html',
        replace: true,
        link: function(scope, el, attrs) {

            $rootScope.$on('stations.reload', function() {
                reload();
            });
            $rootScope.$on('storage.changed', function() {
                reloadIsFavourite();
            });

            var reload = function() {
                var now = new XDate;
                DIRECTIONS_TO_SCOPE.forEach(function(dir_and_scope) {
                    var direction = dir_and_scope[0]; var scopeName = dir_and_scope[1];
                    Timetables.getLastNTimes(scope.stationId, direction, now, 2)
                        .then(function(tt) {
                            var splits = tt.map(function(dt) {
                                return "" + dt.getHours() + ":" + dt.getMinutes() +  " (in " + now.diffMinutes(dt) + " min)";
                            });
                            scope[scopeName] = splits.join(', ');
                        });
                });
            }

            var reloadIsFavourite = function() {
                var favs = Storage.getObject('favourites');
                scope.isFavourite = favs[scope.stationId] === true;
            }

            scope.toggleFavourites = function() {
                var favs = Storage.getObject('favourites');
                if (angular.isUndefined(favs[scope.stationId])) {
                    favs[scope.stationId] = true;
                } else {
                    favs[scope.stationId] = !favs[scope.stationId];
                }
                Storage.setObject('favourites', favs);
            }

            reload();
            reloadIsFavourite();
        }
    };
});
