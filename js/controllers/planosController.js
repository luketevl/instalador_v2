(function(){
  'use strict';
  angular.module('gerenciadorErp').controller('PlanosCtrl', PlanosCtrl);

  // injector
  PlanosCtrl.$inject = ['$scope' ,'PageService', 'gestaoAPI'];

  // Funcation
  function PlanosCtrl($scope, PageService, gestaoAPI){
    PageService.setTitle('Planos');
    $scope.servicos = [];
    $scope.titulo   = 'Escolha o Plano';

    // BUSCA DADOS SERVIÇOS
    gestaoAPI.getPlanos().then(function(response){

        response.data.forEach(function(el){
          // Verifica se existe posicao
          if(el.extra !== undefined && el.extra !== null && el.extra){
            // Tratamento de erro para parser json invalido
            try{
              el.extra = JSON.parse(el.extra);
            }
            catch(ex){
              console.log(ex);
            }
          }
          else{
            el.extra = [];
          }
          console.log(el);
          // Adiciona no array
          $scope.servicos.push(el);
        });
      console.log($scope.servicos);
    }, function(error){
      console.log(error);
    });
  }
})();
