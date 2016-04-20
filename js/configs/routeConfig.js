(function(){
  'use strict';
  angular.module('gerenciadorErp').config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider){

    // ROTA MEU PLANO
    $routeProvider.when('/meu_plano', {
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
    $routeProvider.when('/planos', {
      templateUrl: 'views/escolher_plano.html',
      controller: 'PlanosCtrl',
    });

    // ROTA PADRAO para quando nao existir nenhuma
    $routeProvider.otherwise({redirectTo: '/checkout'});

  }
})();
