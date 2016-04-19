angular.module('gerenciadorErp').controller('meuPlanoController', function($scope, PageService, config, gestaoAPI){
  PageService.setTitle("Meu Plano");

  // Va
  $scope.contrato_teste     = true;
  $scope.contrato_descricao = 'Periodo de Teste';
  $scope.descricao_pagina   = "Deseja adquirir o Tagplus?";
  $scope.itens              = [];
  // Metodos

  // Busca HISTORICO de SALDOS do cliente
  gestaoAPI.getSaldoHistoricoByCod('157').then(function(response){
    $scope.saldo_historico = response.data.dados;
    console.log($scope.saldo_historico );
  }, function(error){
    console.log(error);
  });

  // Busca dados do Contrato
  gestaoAPI.getContratosByCod('157').then(function(response){
    if(response.data.status){
      $scope.contrato_dados = response.data.contratos[0];
      if($scope.contrato_dados.situacao != config.CONTRATO_TESTE){
          $scope.contrato_descricao = 'Normal';
          $scope.contrato_teste     = false;
          $scope.itens              = $scope.contrato_dados.itens_contrato.map(function(el){
            return el.descricao_produto;
          });
          console.log($scope.itens);
          $scope.descricao_pagina   = $scope.itens.join(' + ');
          if($scope.contrato_dados.recorrencia_automatica){
            getDadosCartaoByCod('157');
          }
      }
    }
    console.log($scope.contrato_dados);
  }, function(error){
    console.log(error);
  });

  // Busca dados do Cartão do cliente
  var getDadosCartaoByCod = function(cod){
    gestaoAPI.getDadosCartaoByCod(cod).then(function(response){
      $scope.cartao_dados = response.data;
      console.log($scope.cartao_dados);
    }, function(error){
      console.log(error);
    });
  }
});
``
