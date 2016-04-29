angular.module('gerenciadorErp').directive('uiSaldoGestao', uiSaldoGestao);

function uiSaldoGestao(){
  return {
    templateUrl: 'views/directives/uiSaldoGestao.html',
    restrict: "E",
    scope: {
      valor: "@",
      frase: "@",
    },
  }
}
