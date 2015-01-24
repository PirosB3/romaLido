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
        { name: "Acilia", id: "ACILIA" },
        { name: "Tor di Valle", id: "TOR DI VALLE" },
    ];
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
