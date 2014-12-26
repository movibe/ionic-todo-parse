/**
 * Created by movibe on 25/12/14.
 */
/**
 * Created by movibe on 17/12/14.
 */
'use strict';
angular.module ('com.todoParse.session', ['angular-storage'])
    .factory ('Session', [
    'store',
    function (store) {

        var self = this;

        self.set = function (name, value) {
            store.set (name, value);
            return store.get (name);
        };

        self.get = function (name) {
            return store.get (name) || {};
        };

        self.remove = function (name) {
            store.remove (name);
            return store.get (name);
        };

        return self;
    }
]);
