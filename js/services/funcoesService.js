angular.module('gerenciadorErp').factory('funcoesService', funcoesService);

funcoesService.$inject = [''];

function funcoesService(){
  // Faz calculo da porcentagem
  var _calculaPorcentagem = function(a, b){
    return a * b ;
  }
  return {
    calcularPorcentagem : _calculaPorcentagem,
  };
}
