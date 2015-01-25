angular.module('starter.controllers', ['starter.directives'])

.controller('DashCtrl', function($rootScope, $scope, Stations) {
    $scope.doRefresh = function() {
        $rootScope.$emit('stations.reload');
        $scope.$broadcast('scroll.refreshComplete');
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.currentPosition = position.coords;
    }, null, options);

    $scope.stations = Stations;
})

.controller('FavouritesCtrl', function($rootScope, $scope, Stations, Storage) {

    var reload = function() {
        var favs = Storage.getObject('favourites');
        $scope.stations = Stations.filter(function(s) {
            return favs[s.id] === true;
        });
    }

    $scope.doRefresh = function() {
        $rootScope.$emit('stations.reload');
        $scope.$broadcast('scroll.refreshComplete');
    }

    $rootScope.$on('storage.changed', function() {
        reload();
    });

    reload();

})
