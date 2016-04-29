// Criando Serviço de Comunicação com o Instalador
angular.module('gerenciadorErp').factory('gestaoAPI', function($http, config){
  var config_http = {
                      headers: {
                                  'Authorization': "Digest username=\\\"admin\\\", uri=\\\"/gaterp/rest/clientes_rest/cliente_extras_by_email/\\\", response=\\\"9eb1d221e72522b40e3d60d0667afc94\\\"",
                                },
                      "withCredentials" : false,
                      "Content-Type"    : "application/json"
  };

  /**
    * Busca dados do sistema instalado
    * @author lukete
    * @param Email codificado
    * @since 14/04/16
    * @return $http response
  **/
  var _getSistemasByEmail = function(email){
    email = btoa(email);
    return $http.get(config.GESTAO_URL_REST + config.CAMINHO_REST_CLIENTE +"cliente_extras_by_email/email/"+email);
  };

  /**
    * Busca dados do cartao do cliente
    * @author lukete
    * @param COD cliente
    * @since 18/04/16
    * @return $http response
  **/
  var _getDadosCartaoByCod = function(cod){
    return $http.get(config.GESTAO_URL_REST + config.CAMINHO_REST_CLIENTE +"cliente_dados_cartao/cod/"+cod);
  };

  /**
    * Busca dados dos SALDOS
    * @author lukete
    * @param COD cliente
    * @since 18/04/16
    * @return $http response
  **/
  var _getSaldoHistoricoByCod = function(cod){
    return $http.get(config.GESTAO_URL_REST + config.CAMINHO_REST_SALDO +"getHistoricoCliente/cod/"+cod);
  };

  /**
    * Busca saldo ATUAL
    * @author lukete
    * @param COD cliente
    * @since 28/04/16
    * @return $http response
  **/
  var _getSaldoByCod = function(cod){
    return $http.get(config.GESTAO_URL_REST + config.CAMINHO_REST_SALDO +"getSaldo/cod/"+cod);
  };

  /**
    * Busca dados dos CONTRATOS
    * @author lukete
    * @param COD cliente
    * @since 18/04/16
    * @return $http response
  **/
  var _getContratosByCod = function(cod){
    return $http.get(config.GESTAO_URL_REST + config.CAMINHO_REST_CONTRATO +"get_contratos_by_cod_cliente/cod/"+cod);
  };

  /**
    * Busca dados dos CONTRATOS
    * @author lukete
    * @since 20/04/16
    * @return $http response
  **/
  var _getPlanos = function(){
    return $http.get(config.GESTAO_URL_REST + config.CAMINHO_REST_SERVICO +"get_servicos/ativo/1");
  };

  /**
    * Busca URL do boleto
    * @author lukete
    * @since 26/04/16
    * @return $http response
  **/
  var _getUrlBoleto = function(dados){
    return $http.post(config.GESTAO_URL_REST + config.CAMINHO_REST_CLIENTE +"getUrlBoleto", dados);
  };
  // RETORNOS
  return{
    getSistemasByEmail:     _getSistemasByEmail,
    getDadosCartaoByCod:    _getDadosCartaoByCod,
    getSaldoHistoricoByCod: _getSaldoHistoricoByCod,
    getContratosByCod:      _getContratosByCod,
    getPlanos:              _getPlanos,
    getUrlBoleto:           _getUrlBoleto,
    getSaldoByCod:          _getSaldoByCod,
  };
});
