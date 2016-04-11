// Criando Serviço de Comunicação com o Instalador
angular.module('gerenciadorErp').factory('gestaoAPI', function($http, config){
  var config_http = {
                      headers: {
                                  'Authorization': 'Basic ' +btoa(config.USER_REST + ':' +config.PASS_REST),
                                },
                      "withCredentials" : true,
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
    console.log(config_http);
    return $http.get(config.INSTALLER_URL + "clientes_rest/pasta_existe/"+pasta, config_http);
  };
  return{
    pastaExiste: _pastaExiste,
  };
});
