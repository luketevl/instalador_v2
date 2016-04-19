angular.module('gerenciadorErp').service('ToastService', function($mdToast){
  this.showCustomToast = function(conteudo){
    $mdToast.show($mdToast.simple()
                                    .textContent(conteudo)
                                    .position('top right')
                                    .hideDelay(5000)
                                  );
  };
});
