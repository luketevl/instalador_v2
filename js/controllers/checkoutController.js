angular.module('gerenciadorErp').controller('checkoutController', function($scope, $timeout, $filter, PageService, installerAPI){
  // Setando titulo da Pagina
   PageService.setTitle("Criar Sistema");

   // Variaveis
   $scope.titulo            = 'Novo Sistema';
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
       installerAPI.pastaExiste(pasta).then(function(data){
         $scope.disponivelSistema = (data)? true: false;
         $scope.loader = false;
         console.log(data);
       }, function(error){
         console.error(error);
         $scope.loader = false;
       });
     }, 1000);
   };


});
