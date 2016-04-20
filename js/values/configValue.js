angular.module('gerenciadorErp').value("config", {
  // PROTOCOLOS
  SECURE:   "https://",
  UNSECURE: "http://",

  // DEFINICOES DO REST
  INSTALLER_URL: "http://lanternaverde.gat/installer/rest/",
  GESTAO_URL:    "http://lanternaverde.gat/gaterp/rest/",
  USER_REST:     "admin",
  PASS_REST:     "g4tt3c",

    // CAMINHOS REST
    CAMINHO_REST_CLIENTE:   "clientes_rest/",
    CAMINHO_REST_SALDO:     "saldos_rest/",
    CAMINHO_REST_CONTRATO:  "contrato_rest/",
    CAMINHO_REST_SERVICO:   "servicos_rest/",

  CLIENTES_URL: 'https://app.tagplus.com.br/',

  // DEFINICOES DO TEMA
  TEMA: 'tagplus',


// Constantes diversas
  CONTRATO_TESTE:   'T',
});
