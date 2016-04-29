(function(){
  'use strict';
  angular.module('gerenciadorErp').controller('PlanosCtrl', PlanosCtrl);

  // injector
  PlanosCtrl.$inject = ['$scope' ,'PageService', 'gestaoAPI', 'resolveServicos', '$routeParams', '$location', 'config'];

  // Funcation
  function PlanosCtrl($scope, PageService, gestaoAPI, resolveServicos, $routeParams, $location, config){
    PageService.setTitle('Planos');
    $scope.app.codCliente = $routeParams.codCliente;
    $scope.servicos     = [];
    $scope.dados_plano  = [];
    var codCliente = ($scope.app.codCliente !== undefined) ? $scope.app.codCliente : $routeParams.codCliente;
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

         if(numPassoProximo == 2){
           $scope.dados_plano.plano = plano;
           PageService.setServico(plano);
           // Montando recorrencia
           $scope.dados_plano.recorrencias = [
                                                   {
                                                     descricao_recorrencia: 'Plano Mensal',
                                                     valor_recorrencia: plano.valorPromocionalMensal,
                                                     original_recorrencia: plano.vr_hora_servico,
                                                     label_recorrencia: 'mes',
                                                     isMensal_recorrencia: true,
                                                   },
                                                   {
                                                   descricao_recorrencia: 'Plano Anual',
                                                   valor_recorrencia: plano.valorPromocionalAnual,
                                                   original_recorrencia: plano.vr_hora_servico * 10,
                                                   label_recorrencia: 'ano',
                                                   isMensal_recorrencia: false,
                                                 },
                                             ];
                                             /*
            var contrato = PageService.getContrato();
            if(contrato.recorrencia == config.CONTRATO_RECORRENCIA_ANUAL){
              $scope.passoFinal($scope.dados_plano.recorrencias[1]);
            } */
         }
        $scope.dadosPassos[numPassoProximo].show = true;
       };

       // Ultimo passo, define se vai ser pagamento ou precessar atualizacao
       $scope.passoFinal = function(recorrencia){
        PageService.setRecorrencia(recorrencia);

        var contrato = PageService.getContrato();
        if(contrato.recorrencia_automatica == config.CONTRATO_RECORRENCIA_BOLETO_AUTOMATICO || contrato.recorrencia_automatica == config.CONTRATO_RECORRENCIA_CARTAO_AUTOMATICO){
        $scope.passoFinal($scope.dados_plano.recorrencias[1]);
        }
        else{
          $location.path('pagamento/'+codCliente);
        }
       };

       var trataContrato = function(){
         var contrato = PageService.getContrato();
           if(!contrato.length){
             // Buscar Contrato
             // Busca dados do Contrato

             gestaoAPI.getContratosByCod(codCliente).then(function(response){
               if(response.data.status){
                 contrato = response.data.contratos[0];
                 PageService.setContrato(contrato);
               }
             }, function(error){
               console.log(error);
             });
           }
       };

       trataContrato();
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

      // Busca SALDO DO CLIENTE
      if(PageService.getSaldo() == undefined){
        gestaoAPI.getSaldoByCod($scope.app.codCliente).then(function(response){
          console.log(response);
          PageService.setSaldo(response.data);
          $scope.saldoAtual = PageService.getSaldo();
        }, function(error){
          console.log(error);
        });
      }
      $scope.saldoAtual = PageService.getSaldo();
  }
})();
