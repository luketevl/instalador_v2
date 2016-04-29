angular.module('gerenciadorErp').controller('meuPlanoController', function($scope, PageService, config, gestaoAPI, $routeParams){
  PageService.setTitle("Meu Plano");

  if($routeParams.codCliente !== undefined){
    $scope.app.codCliente = $routeParams.codCliente;
  }

  // Va
  $scope.contrato_teste     = true;
  $scope.contrato_descricao = 'Periodo de Teste';
  $scope.descricao_pagina   = "Deseja adquirir o Tagplus?";
  $scope.itens              = [];
  // Metodos

  // Busca HISTORICO de SALDOS do cliente
  gestaoAPI.getSaldoHistoricoByCod($scope.app.codCliente).then(function(response){
    $scope.saldo_historico = response.data.dados;
    console.log($scope.saldo_historico );
  }, function(error){
    console.log(error);
  });


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

  // Busca dados do Contrato
  gestaoAPI.getContratosByCod($scope.app.codCliente).then(function(response){
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
            getDadosCartaoByCod($scope.app.codCliente);
          }
      }
    }
    PageService.setContrato($scope.contrato_dados);
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
