(function(){
  'use strict';
  angular.module('gerenciadorErp').config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider){

    // ROTA MEU PLANO
    $routeProvider.when('/meu_plano/:codCliente', {
      templateUrl: 'views/meu_plano.html',
      controller: 'meuPlanoController',
    });

    // ROTA NOVO SISTEMA
    $routeProvider.when('/checkout', {
      templateUrl: 'views/checkout/index.html',
      controller: 'checkoutController',
    });

    // ROTA LISTAGEM DE SISTEMAS
    $routeProvider.when('/lista_sistemas', {
      templateUrl: 'views/lista_sistemas.html',
      controller: 'listarSistemasController',
    });

    // ROTA PLANOS
    $routeProvider.when('/planos/:codCliente/:codPromocao', {
      templateUrl: 'views/escolher_plano.html',
      controller: 'PlanosCtrl',
      resolve : {
        resolveServicos: function(gestaoAPI){
          return gestaoAPI.getPlanos();
        },
      }
    });

    $routeProvider.when('/planos/:codCliente', {
      templateUrl: 'views/escolher_plano.html',
      controller: 'PlanosCtrl',
      resolve : {
        resolveServicos: function(gestaoAPI){
          return gestaoAPI.getPlanos();
        },
      }
    });

    $routeProvider.when('/pagamento/:codCliente', {
      templateUrl: 'views/pagamento/index.html',
      controller: 'pagamentoCtrl',
    });

    $routeProvider.when('/sucesso/plano', {
      templateUrl: 'views/sucesso_plano.html',
    });

    // ROTA PADRAO para quando nao existir nenhuma
    $routeProvider.otherwise({redirectTo: '/checkout'});
  }
})();
