(function(){
  'use strict';
  angular.module('gerenciadorErp').controller('PlanosCtrl', PlanosCtrl);

  // injector
  PlanosCtrl.$inject = ['$scope' ,'PageService', 'gestaoAPI', 'resolveServicos', '$routeParams'];

  // Funcation
  function PlanosCtrl($scope, PageService, gestaoAPI, resolveServicos, $routeParams){
    PageService.setTitle('Planos');
    $scope.app.codCliente = $routeParams.codCliente;
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
           PageService.setServico = plano;
           // Montando recorrencia
           $scope.dados_plano.recorrencias = [
                                                   {
                                                     descricao: 'Plano Mensal',
                                                     valor: plano.valorPromocionalMensal,
                                                     original: plano.vr_hora_servico,
                                                     label: 'mes',
                                                   },
                                                   {
                                                   descricao: 'Plano Anual',
                                                   valor: plano.valorPromocionalAnual,
                                                   original: plano.vr_hora_servico * 10,
                                                   label: 'ano',
                                                 },
                                             ];
         }

       };

    // BUSCA DADOS SERVIÇOS
        resolveServicos.data.forEach(function(el){
          el.valorPromocionalMensal = el.vr_hora_servico;
          el.valorPromocionalAnual  = el.vr_hora_servico * 10;

          // Verifica se existe posicao
          if(el.extra !== undefined && el.extra !== null && el.extra){
            // Tratamento de erro para parser json invalido
            try{
              el.extra = JSON.parse(el.extra);
              console.log(el.extra.promocoes[$routeParams.codPromocao]);
              if(el.extra.promocoes[$routeParams.codPromocao] !== undefined ){
                if(el.extra.promocoes[$routeParams.codPromocao].mensal > 0){
                  el.valorPromocionalMensal  = el.extra.promocoes[$routeParams.codPromocao].mensal;
                }
                if(el.extra.promocoes[$routeParams.codPromocao].anual > 0){
                  el.valorPromocionalAnual   = el.extra.promocoes[$routeParams.codPromocao].anual;
                }
              }
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
  }
})();
