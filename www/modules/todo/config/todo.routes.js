/**
 * Created by movibe on 25/12/14.
 */
'use strict';
angular.module ('com.todoParse.routes', [])
    .config (function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state ('todos', {
        url: "/todos",
        controller: 'TodoListCtrl',
        templateUrl: "modules/todo/views/todo-list.html"
    })
        .state ('createTodo', {
        url: "/todo/new",
        controller: 'TodoCreateCtrl',
        templateUrl: "modules/todo/views/todo-create.html"
    })
        .state ('editTodo', {
        url: "/todo/edit/:id/:content",
        controller: 'TodoEditCtrl',
        templateUrl: "modules/todo/views/todo-edit.html"
    });
    $urlRouterProvider.otherwise ('/todos');
});
