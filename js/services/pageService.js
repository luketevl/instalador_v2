(function(){
  'use strict';

  angular.module('gerenciadorErp').factory('PageService', PageService);

  PageService.$inject = ['$rootScope'];

  function PageService($rootScope){
    var _servico      = {};
    var _recorrencia  = {};
    var _contrato     = {};
    var _saldo        = undefined;

    var _getServico   = function(){
      return _servico;
    };
    var _setServico   = function(obj){
      _servico = obj;
    };
    var _setRecorrencia   = function(obj){
      _recorrencia = obj;
    };
    var _getRecorrencia   = function(){
      return _recorrencia;
    };

    var _getContrato  = function(){
      return _contrato;
    };
    var _setContrato   = function(obj){
      _contrato = obj;
    };

    var _getSaldo  = function(){
      return _saldo;
    };
    var _setSaldo  = function(saldo){
      _saldo = saldo;
    };

    var _setTitle     = function(title){
        $rootScope.title = title;
    };

    return {
      getServico:     _getServico,
      setServico:     _setServico,
      setRecorrencia: _setRecorrencia,
      getRecorrencia: _getRecorrencia,
      getContrato:    _getContrato,
      setContrato:    _setContrato,
      getSaldo:       _getSaldo,
      setSaldo:       _setSaldo,
      setTitle:       _setTitle,
    }
  }
})();
