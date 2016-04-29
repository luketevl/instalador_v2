(function(){
  'use strict';
  angular.module('gerenciadorErp').controller('pagamentoCtrl', PagamentoCtrl);

  PagamentoCtrl.$inject = ['$scope' ,'PageService', 'gestaoAPI', '$routeParams', '$location', 'config'];

  function PagamentoCtrl($scope, PageService, gestaoAPI, $routeParams, $location, config){
    PageService.setTitle('Forma de Pagamento');
    $scope.titulo     = 'Escolha a forma de Pagamento';
    $scope.pagamentos = {};
    $scope.saldoAtual = PageService.getSaldo();
    
  var urlBoleto = function(){
    var serv = PageService.getServico();
    var reco = PageService.getRecorrencia();
    var data = new Date();
    var dados = {
                  cod_cliente 		: $scope.app.codCliente,
                  cod_servico 		: serv.cod_servico,
                  vr_total 			  : reco.valor_recorrencia,
                  valor_desconto  : '',
                  data_vencimento	: "'"+data.getDate() +"/0"+ (data.getMonth() + 1) +"/"+ data.getFullYear()+"'",
                  conta				    : 54384,
    };
    console.log(dados);
    gestaoAPI.getUrlBoleto(dados).then(function(response){
      console.log(response);
      $scope.pagamentos[0] = {
                            titulo    : 'Boleto Bancário',
                            icone     : 'action:ic_view_column_24px',
                            botao     : 'Gerar Boleto',
                            isBoleto  : true,
                            link      : response.data
                          };

    }, function(error){
      console.log(error);
    });
  };

  var urlCartao = function(){
    var serv = PageService.getServico();
    var reco = PageService.getRecorrencia();
    console.log(serv);
    console.log(reco);
    var dados = {
                  num_pedido    : '',
                  cod_cliente   : $scope.app.codCliente,
                  valor         : reco.valor_recorrencia,
                  desc_servico  : 'Plano: '+ serv.descricao_servico,
                  email_cliente : '',
                  tipo_transacao: config.TAGPAGO_TRANS_COBRAR_CARTAO_GERAR_TOKEN,
                  success_url   : ''
    };
    dados = btoa(JSON.stringify(dados));
    $scope.pagamentos[1] = {
      titulo:   'Cartão',
      icone:    'action:ic_credit_card_24px',
      botao:    'Pagar com cartão',
      isBoleto: false,
      link:     config.GESTAO_URL + config.URL_COBRANCA_CARTAO_FORM_ASSINATURA + dados
    };

  };
  urlBoleto();
  urlCartao();

  $scope.abrirLink = function(pagamento){
    if(pagamento.isBoleto){
      window.open(pagamento.link);
    }
    else{
      console.log(pagamento.link);
    }
  }
}
})();
