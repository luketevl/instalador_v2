angular.module('gerenciadorErp').directive('uiPorcentagem', uiPorcentagem);


function uiPorcentagem(){
  return {
    templateUrl: 'views/directives/uiPorcentagem.html',
    restrict: "E",
    scope: {
      original: "@",
      promocional: "@",
    },
    link: function (scope, element, attrs) {
      scope.porcentagem = Math.round(((scope.promocional*100) / scope.original));
		},
  }
}
