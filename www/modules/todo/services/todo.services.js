/**
 * Created by movibe on 25/12/14.
 */
'use strict';
angular.module ('com.todoParse.services', ['com.todoParse.session'])
    .value ('PARSE_CREDENTIALS', {
    APP_ID: 'tf9yeZ56waB1Kf4PVcExupQkYej5hy4X930SKq0j',
    REST_API_KEY: 'RAUBBSfiVSx1V00TkMDuU5tgOAIlpuL7r37QYMlK'
})
    .factory ('TodoModel',
    function ($http, $log, Session, PARSE_CREDENTIALS) {
        var self = this;

        self.items = Session.get ('todos') || [];

        self.list = function () {
            return self.items;
        };

        self.all = function () {
            return $http ({
                method: 'GET',
                url: 'https://api.parse.com/1/classes/Todo',
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
                }
            }).success (function (resp) {
                self.items = resp.results;
                Session.set ('todos', resp.results);
            }).error (function (aError) {
            });
        };

        self.get = function (id) {
            return $http.get ('https://api.parse.com/1/classes/Todo/' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
                }
            });
        };

        self.create = function (data) {
            return $http.post ('https://api.parse.com/1/classes/Todo', data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            }).success (function (resp) {
                $log.log (resp);
                self.all ();
            }).error (function (aError) {
            });
        };

        self.edit = function (id, data) {
            return $http.put ('https://api.parse.com/1/classes/Todo/' + id, data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        };

        self.delete = function (id) {
            return $http.delete ('https://api.parse.com/1/classes/Todo/' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            }).success (function (resp) {
                $log.log (resp);
                self.all ();
            }).error (function (aError) {
            });
        };

        return self;
    }
);