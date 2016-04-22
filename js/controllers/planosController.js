(function(){
  'use strict';
  angular.module('gerenciadorErp').controller('PlanosCtrl', PlanosCtrl);

  // injector
  PlanosCtrl.$inject = ['$scope' ,'PageService', 'gestaoAPI'];

  // Funcation
  function PlanosCtrl($scope, PageService, gestaoAPI){
    PageService.setTitle('Planos');
    $scope.servicos     = [];
    $scope.dados_plano  = [];
    $scope.dadosPassos  = {
      1 : {
        titulo: 'Escolha o Plano',
        show: true
      },
      2 : {
        titulo: 'Escolha a Recorrência',
        show: false
      },
    };
    $scope.titulo       = $scope.dadosPassos[1].titulo;

       // Muda titulo da sessao e toggle elemento
       $scope.tooglePassos = function(numPassoAtual, numPassoProximo, plano){
         // Passo Antigo
         $scope.dadosPassos[numPassoAtual].show = false;

         // Passo novo
         $scope.titulo            = $scope.dadosPassos[numPassoProximo].titulo;
         $scope.dadosPassos[numPassoProximo].show = true;
         if(numPassoProximo == 2){
           $scope.dados_plano.plano = plano;
           console.log(plano);

           // Montando recorrencia
           $scope.dados_plano.recorrencias = [
                                                   {
                                                     descricao: 'Plano Mensal',
                                                     valor: plano.vr_hora_servico,
                                                   },
                                                   {
                                                   descricao: 'Plano Anual',
                                                   valor: (plano.vr_hora_servico * 12),
                                                 },
                                             ];
         }

       };

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
