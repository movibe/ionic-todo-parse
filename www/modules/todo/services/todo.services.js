/**
 * Created by movibe on 25/12/14.
 */
'use strict';
// Crio um módulo com uma dependencia de sessão para ele poder ser usado
angular.module ('com.todoParse.services', ['com.todoParse.session'])
    //Crio valores para acesso em meu módulo com as chaves PARSE.com
    .value ('PARSE_CREDENTIALS', {
    APP_ID: 'tf9yeZ56waB1Kf4PVcExupQkYej5hy4X930SKq0j',
    REST_API_KEY: 'RAUBBSfiVSx1V00TkMDuU5tgOAIlpuL7r37QYMlK'
})
    // Criação de um serviço para servir dados de uma API externa
    .factory ('TodoModel',
    function ($http, $log, Session, PARSE_CREDENTIALS) {

        //uso de self para ficar facil mudar o nome do meu serviço e reaproveitar o código
        var self = this;

        // Coloco dentro de um objeto item os meus valores da sessão ou objeto caso não tenha
        self.items = Session.get ('todos') || [];

        // Retorno o items como função
        self.list = function () {
            return self.items;
        };

        // Faço uma requisição para pegar os itens no servidor, gravo na sessão e no meu método self.items para o bind
        self.all = function () {
            //requisição
            return $http ({
                method: 'GET',
                url: 'https://api.parse.com/1/classes/Todo',
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
                }
            }).success (function (resp) {
                // atualizo meu self.items com a resposta do servidor
                self.items = resp.results;
                // Gravo os dados na sessão
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

        // Criação de um item POST
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

        // Edição de um item com PUT
        self.edit = function (id, data) {
            return $http.put ('https://api.parse.com/1/classes/Todo/' + id, data, {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        };

        // Deletar um item com DELETE
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

        //retorno meu objeto
        return self;
    }
);