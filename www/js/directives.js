var DIRECTIONS_TO_SCOPE = [
    ['towards-rome', 'nextTrainsTowardsRome'],
    ['towards-ostia', 'nextTrainsTowardsOstia']
];

angular.module('starter.directives', [])

.directive('stationCard', function(Timetables) {
    return {
        restrict: 'E',
        scope: {
            stationName: "=",
            stationId: "="
        },
        templateUrl: '/templates/directive-station.html',
        replace: true,
        link: function(scope, el, attrs) {

            var now = new XDate;

            DIRECTIONS_TO_SCOPE.forEach(function(dir_and_scope) {
                var direction = dir_and_scope[0]; var scopeName = dir_and_scope[1];
                Timetables.getLastNTimes(scope.stationId, direction, now, 3)
                    .then(function(tt) {
                        var splits = tt.map(function(dt) {
                            return "" + dt.getHours() + ":" + dt.getMinutes() +  " (in " + now.diffMinutes(dt) + " min)";
                        });
                        scope[scopeName] = splits.join(', ');
                    });
            });
        }
    };
});
