angular.module('gerenciadorErp').value("config", {
  // PROTOCOLOS
  SECURE:   "https://",
  UNSECURE: "http://",

  // DEFINICOES DO REST
  INSTALLER_URL_REST: "http://lanternaverde.gat/installer/rest/",
  GESTAO_URL_REST   : "http://lanternaverde.gat/gaterp/rest/",
  USER_REST         : "admin",
  PASS_REST         : "g4tt3c",

    // CAMINHOS REST
    CAMINHO_REST_CLIENTE:   "clientes_rest/",
    CAMINHO_REST_SALDO:     "saldos_rest/",
    CAMINHO_REST_CONTRATO:  "contrato_rest/",
    CAMINHO_REST_SERVICO:   "servicos_rest/",

  GESTAO_URL    : 'http://lanternaverde.gat/gaterp/',
  CLIENTES_URL  : 'https://app.tagplus.com.br/',

  // DEFINICOES DO TEMA
  TEMA: 'tagplus',


// Constantes diversas
  CONTRATO_TESTE                          : 'T',
  CONTRATO_RECORRENCIA_MENSAL             : 'M',
  CONTRATO_RECORRENCIA_ANUAL              : 'A',
  CONTRATO_RECORRENCIA_BOLETO_AUTOMATICO  : '3',
  CONTRATO_RECORRENCIA_CARTAO_AUTOMATICO  : '1',

TAGPAGO_TRANS_COBRAR_CARTAO 			       :	'CC',
TAGPAGO_TRANS_COBRAR_CARTAO_GERAR_TOKEN  :	'CG',
TAGPAGO_TRANS_GERAR_TOKEN 			         :	'GT',

URL_COBRANCA_CARTAO_FORM_ASSINATURA      : 'cobranca/cobrancas_cartao/frame/form_assinatura/',
});
