var DIRECTIONS = [
    'towards-rome',
    'towards-ostia'
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
            Timetables.getLastNTimes(scope.stationId, DIRECTIONS[0], new XDate, 60);
        }
    };
});
