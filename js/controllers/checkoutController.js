angular.module('gerenciadorErp').controller('checkoutController', function($scope, $timeout, $filter, $mdDialog, PageService, ToastService ,installerAPI){
  // Setando titulo da Pagina
   PageService.setTitle("Criar Sistema");

   // Variaveis
   $scope.disponivelSistema = false;
   $scope.dadosPassos = {
     1 : {
       titulo: 'Novo Sistema',
       show: true
     },
     2 : {
       titulo: 'Passo 2',
       show: false
     },
     3 : {
       titulo: 'Passo 3',
       show: false
     },
   };
   $scope.titulo       = $scope.dadosPassos[1].titulo;
   // Funcoes

   // Muda titulo da sessao e toggle elemento
   $scope.tooglePassos = function(numPassoAtual, numPassoProximo){
     // Passo Antigo
     $scope.dadosPassos[numPassoAtual].show = false;

     // Passo novo
     $scope.titulo = $scope.dadosPassos[numPassoProximo].titulo;
     $scope.dadosPassos[numPassoProximo].show = true;
   };

   // Pesquisa disponibilidade do endereco_sistema
  var searchTimeout;
   $scope.verificaDisponibilidade = function(pasta){
     if(pasta === undefined) return false;
     $timeout.cancel(searchTimeout);
     searchTimeout = $timeout(function() {
       $scope.loader = true;
       installerAPI.pastaExiste(pasta).then(function(response){
         $scope.disponivelSistema = response.data;
         if(!$scope.disponivelSistema){
           ToastService.showCustomToast('Sistema ' + pasta +' nao esta disponivel');
         }
         console.log(response.status);
         $scope.loader = false;
         console.log(response);
       }, function(error){
         console.log(error);
         $scope.loader = false;
       });
     }, 1000);
   };

  // Funcao para insalar sistema
  $scope.instalar = function(ev){
  $scope.showAdvanced(ev);
  };

  // FEEDBACK CLIENTES_URL
  $scope.showAdvanced = function(ev) {
   $mdDialog.show({
     controller: DialogController,
     templateUrl: 'views/moleculas/dialogInstall.tmpl.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(answer) {
     $scope.status = 'You said the information was "' + answer + '".';
   }, function() {
     $scope.status = 'You cancelled the dialog.';
   });
 };

});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
