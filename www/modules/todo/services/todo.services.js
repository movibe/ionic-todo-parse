/**
 * Created by movibe on 25/12/14.
 */
'use strict';
angular.module ('com.todoParse.services', ['com.todoParse.session'])
    .value ('PARSE_CREDENTIALS', {
    APP_ID: 'tf9yeZ56waB1Kf4PVcExupQkYej5hy4X930SKq0j',
    REST_API_KEY: 'RAUBBSfiVSx1V00TkMDuU5tgOAIlpuL7r37QYMlK'
})
    .factory ('TodoModel', [
    '$http',
    '$log',
    'Session',
    'PARSE_CREDENTIALS',
    function ($http, $log, Session, PARSE_CREDENTIALS) {

        var model = {
            todos: Session.get ('todos') || []
        };

        model.all = function () {
            $http ({
                method: 'GET',
                url: 'https://api.parse.com/1/classes/Todo',
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
                }
            }).success (function (resp) {
                model.todos = resp.results;
                Session.set ('todos', resp.results);
            }).error (function (aError) {

            });

        };

        model.get = function (id) {
            return $http.get ('https://api.parse.com/1/classes/Todo/' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
                }
            });
        };

        model.create = function (data) {
            return $http.post ('https://api.parse.com/1/classes/Todo', data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            }).success (function (resp) {
                $log.log (resp);
                model.all ();
            }).error (function (aError) {

            });
        };

        model.edit = function (id, data) {
            return $http.put ('https://api.parse.com/1/classes/Todo/' + id, data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        };

        model.delete = function (id) {
            return $http.delete ('https://api.parse.com/1/classes/Todo/' + id, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            }).success (function (resp) {
                $log.log (resp);
                model.all ();
            }).error (function (aError) {

            });
        };

        return model;
    }
]);