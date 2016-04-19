angular.module('gerenciadorErp').controller('listarSistemasController', function($scope, PageService, ToastService, config, gestaoAPI){
  PageService.setTitle("Listar Sistema");
  $scope.url = config.CLIENTES_URL;
  // FUNCOES
  $scope.listaSistemasByEmail = function(email){
    gestaoAPI.getSistemasByEmail(email).then(function(response){
      // Encontrou nada pelo email
      if(response.status == 202){
        // Convertendo para json OBJETO
          $scope.user.sistemas = response.data.map(function(el){
            return JSON.parse(el.extras);
          });
      }
      else{
        delete $scope.user.sistemas;
        ToastService.showCustomToast('Nenhum Sistema encontrado com o e-mail ' + email);
      }
    }, function(error){
        console.log(error);
    });
  };

});
