// Criando Serviço de Comunicação com o Instalador
angular.module('gerenciadorErp').factory('installerAPI', function($http, config){
  var config_http = {
                      headers: {
                                'Authorization': "Digest username=\\\"admin\\\", uri=\\\"/installer/rest/clientes_rest/pasta_existe/\\\", response=\\\"9eb1d221e72522b40e3d60d0667afc94\\\"",
                                },
                      "withCredentials" : false,
                      "Content-Type"    : "application/json"
  };

  /**
    * Verifica se pasta existe
    * @author lukete
    * @param pasta Nome da Pasta
    * @since 09/03/16
    * @return $http response
  **/
  var _pastaExiste = function(pasta){
    return $http.get(config.INSTALLER_URL + "clientes_rest/pasta_existe/"+pasta);
  };

  return{
    pastaExiste: _pastaExiste,
  };
});
