/**
 * Created by movibe on 25/12/14.
 */
'use strict';
angular.module ('com.todoParse.controllers', [
    'com.todoParse.services'
])
    .controller ('TodoListCtrl',
    function ($scope, Session, TodoModel) {
        // Pego toda as tarefas do servidor

        $scope.todos = function () {
            return TodoModel.list ();
        };

        $scope.refresh = function () {
            TodoModel.all ();
            $scope.$broadcast ('scroll.refreshComplete');
        };

        // Deleto uma tarefa no servidor e tiro da minha lista
        $scope.delete = function (item) {
            TodoModel.delete (item.objectId);
        };

    }
)

    .controller ('TodoCreateCtrl',
    function ($scope, TodoModel, $state) {

        $scope.init = function () {
            $scope.todo = {};
        };

        $scope.create = function () {
            TodoModel
                .create ({content: $scope.todo.content})
                .success (function () {
                $state.go ('todos');
            });
        };

    }
)

    .controller ('TodoEditCtrl',
    function ($scope, TodoModel, $state, $stateParams) {

        $scope.todo = {
            id: $stateParams.id,
            content: $stateParams.content
        };

        $scope.edit = function () {
            TodoModel
                .edit ($scope.todo.id, {
                content: $scope.todo.content
            })
                .success (function (data) {
                TodoModel.all ();
                $state.go ('todos');
            });
        };

    }
);
