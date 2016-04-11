angular.module('gerenciadorErp').controller('checkoutController', function($scope, PageService, installerAPI){
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

   // Verifica se nome digitado esta disponivel
   $scope.verificaDisponibilidade = function(pasta){
     console.log(pasta);
     installerAPI.pastaExiste(pasta).then(function(data){
       $scope.disponivelSistema = (data)? true: false;
       console.log(data);
     }, function(error){
       console.error(error);
     });
   };

});
