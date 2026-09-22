// Todo o texto do site mora aqui. Mudou alguma informação? Edite só este arquivo.

// Fase atual do roadmap (1 a 4). Atualize conforme o projeto andar.
export const FASE_ATUAL: 1 | 2 | 3 | 4 = 1;

// Contato. Troque pelos dados reais antes de publicar.
export const CONTATO = {
  whatsapp: "5527999999999", // só números, com DDI e DDD
  email: "contato@biocarb.com.br",
};

export const objetivos = [
  {
    titulo: "Matéria-prima que já existe",
    texto:
      "Fibra de coco e caroço de fruta que vendedores e feirantes descartam todo dia. Resíduo que hoje custa para ser jogado fora vira a base do produto.",
  },
  {
    titulo: "Ativação com H₃PO₄",
    texto:
      "Ativação química com ácido fosfórico no laboratório de Química da UVV. O processo roda em temperatura mais baixa que a ativação física e cria a porosidade que faz o carvão adsorver.",
  },
  {
    titulo: "Foco em água e efluentes",
    texto:
      "O primeiro mercado é tratamento de efluentes: ETEs, prefeituras e pequenas indústrias capixabas que já compram carvão ativado de fora.",
  },
  {
    titulo: "Produzido no ES",
    texto:
      "Uma alternativa regional a SP e RJ, com preço previsível, entrega curta e origem rastreável do resíduo até o saco de carvão.",
  },
];

export const etapas = [
  {
    titulo: "Coleta e seleção",
    dado: "Praia, quiosques, feiras e CEASA",
    texto:
      "Fibra de coco vem de vendedores de praia e quiosques. Caroço de fruta vem de feiras e da CEASA. Já na coleta a gente separa o que tem terra, sal ou matéria em decomposição, porque isso contamina o carvão.",
  },
  {
    titulo: "Trituração e secagem",
    dado: "Menos de 5 mm, 105 °C por 24 h",
    texto:
      "O material é triturado em pedaços menores que 5 mm e passa 24 horas na estufa a 105 °C. Com a umidade igual, o ácido pega do mesmo jeito em todos os lotes.",
  },
  {
    titulo: "Impregnação com H₃PO₄",
    dado: "Começando em 1:1 de ácido por biomassa",
    texto:
      "A biomassa seca fica em contato com ácido fosfórico, sob agitação. A literatura trabalha entre 1:1 e 3:1 e mostra que acima disso é reagente jogado fora. Vamos começar em 1:1, a proporção mais econômica.",
  },
  {
    titulo: "Secagem da biomassa impregnada",
    dado: "105 a 130 °C, de 12 a 24 h",
    texto:
      "O excesso de solução escorre e o material volta para a estufa. Se entrasse úmido no forno, carbonizaria de forma irregular.",
  },
  {
    titulo: "Ativação sem oxigênio",
    dado: "Assar sem oxigênio, de 400 a 600 °C",
    texto:
      "A biomassa impregnada é assada entre 400 e 600 °C em um ambiente sem oxigênio. Esse cuidado é essencial: se houver oxigênio, o carvão queima e vira cinza. Sem ele, o material carboniza e abre os poros que fazem a adsorção. O carvão esfria antes de qualquer manuseio.",
  },
  {
    titulo: "Lavagem e neutralização",
    dado: "Até o pH ficar neutro",
    texto:
      "Lavagem com água quente e depois fria até o pH neutralizar. O ácido fosfórico sai com água simples, sem o problema de corrosão de outros ativadores.",
  },
  {
    titulo: "Secagem final",
    dado: "Estufa, só para tirar a água",
    texto: "Mais uma passagem pela estufa, agora só para tirar a água da lavagem antes de moer.",
  },
  {
    titulo: "Moagem e peneiramento",
    dado: "Granulometria 8x30 mesh",
    texto:
      "O carvão é moído e peneirado em 8x30 mesh, a granulometria mais comum nos produtos vendidos no Brasil para tratamento de água e efluentes.",
  },
  {
    titulo: "Controle de qualidade",
    dado: "Azul de metileno e número de iodo",
    texto:
      "Cada lote passa pelo índice de azul de metileno e pelo número de iodo, os ensaios de adsorção mais usados na literatura. Dá para fazer com vidraria comum e espectrofotômetro, sem esperar fila de BET.",
  },
  {
    titulo: "Embalagem e entrega",
    dado: "Embalado e selado",
    texto: "Lote aprovado é embalado e selado, e segue para o cliente ou para o kit de demonstração.",
  },
];

export const aplicacoes = {
  agora: [
    {
      titulo: "Tratamento de efluentes",
      texto:
        "Remoção de corantes, matéria orgânica e poluentes em ETEs e em indústrias que precisam cumprir metas ambientais e de ESG/GRI.",
    },
    {
      titulo: "Tratamento de água",
      texto:
        "Redução de odor, cor, cloro e contaminantes orgânicos em sistemas de abastecimento e estações de tratamento.",
    },
  ],
  depois: [
    "Carvão em pó fino para saúde e cosméticos",
    "Filtragem de ar e compostos orgânicos voláteis",
  ],
};

export const diferenciais = [
  {
    titulo: "Primeiro fornecedor do ES",
    texto: "Não identificamos nenhum concorrente regional. Hoje quem compra no estado compra de fora.",
  },
  {
    titulo: "Matéria-prima quase de graça",
    texto: "O insumo principal é o resíduo de vendedores e feirantes. O custo pesado é o ácido, não a biomassa.",
  },
  {
    titulo: "Base técnica na UVV",
    texto: "Processo desenvolvido e testado no laboratório de Química da universidade, com respaldo acadêmico.",
  },
  {
    titulo: "ESG que dá para mostrar",
    texto: "Resíduo capixaba virando produto capixaba. Uma história que o cliente pode colocar no próprio relatório.",
  },
];

export const canvas = {
  parcerias: [
    "Vendedores autônomos de coco no ES",
    "Feirantes e distribuidores locais de frutas",
    "Laboratório de Química da UVV (H₃PO₄ e equipamentos)",
  ],
  atividades: [
    "Coleta de fibra de coco e caroço de fruta",
    "Ativação química com H₃PO₄",
    "Produção do carvão ativado",
    "Testes básicos de qualidade",
    "Distribuição local no ES",
  ],
  recursos: [
    "Biomassa residual (fibras e caroços)",
    "H₃PO₄ via laboratório da UVV",
    "Equipe de estudantes com conhecimento técnico",
    "Equipamentos do laboratório da UVV",
  ],
  proposta: [
    "Carvão ativado produzido no Espírito Santo",
    "Matéria-prima 100% residual, de baixo custo",
    "Alternativa local a fornecedores de SP e RJ",
    "Preço previsível, sem depender de frete longo",
    "Resíduo que vira produto de valor",
    "Produção rastreável da origem ao produto final",
  ],
  relacionamento: [
    "Contato direto por WhatsApp e e-mail",
    "Amostras gratuitas para demonstração",
    "Suporte técnico da equipe",
  ],
  canais: ["Vendas diretas B2B", "Indicações pela rede UVV", "LinkedIn e eventos acadêmicos"],
  segmentos: [
    "ETEs e prefeituras capixabas",
    "Indústrias com tratamento de efluentes",
    "Empresas com metas ESG/GRI",
    "No futuro: saúde e cosméticos",
  ],
  custos: [
    "Ácido fosfórico (insumo principal)",
    "Coleta e transporte da biomassa",
    "Embalagem e distribuição",
    "Uso de equipamentos do laboratório da UVV",
    "Equipe",
  ],
  receitas: [
    "Venda de carvão ativado granulado em contratos B2B",
    "Fornecimento recorrente para ETEs e indústrias",
    "Consultoria técnica em sistemas de filtragem (futuro)",
  ],
};

export const cadeia = [
  { nome: "Vendedores de coco", papel: "Fibra e casca de coco, coleta regular" },
  { nome: "Feirantes locais", papel: "Caroços e resíduos orgânicos de fruta" },
  { nome: "Laboratório de Química da UVV", papel: "H₃PO₄, equipamentos e supervisão" },
  { nome: "Rede UVV", papel: "Indicações, eventos de inovação e contatos B2B" },
];

export const personas = [
  {
    nome: "Patrícia",
    papel: "Engenheira responsável pelo tratamento de efluentes",
    fala: "Não troco o insumo sem ver funcionando no meu efluente.",
    resposta: "Amostra gratuita e comparação direta com o carvão que ela já usa.",
  },
  {
    nome: "Ricardo",
    papel: "Dono de pequena indústria que compra carvão ativado",
    fala: "Me mostra o preço por quilo e quando chega.",
    resposta: "Comparação de custo pronta e entrega curta, feita dentro do estado.",
  },
];

export const roadmap = [
  {
    fase: "Preparação e primeiro lote",
    meses: "Meses 1 a 3",
    itens: ["Acesso ao laboratório da UVV", "Coleta de biomassa", "Primeiro lote piloto", "Marca BioCarb"],
  },
  {
    fase: "Testes e ajustes",
    meses: "Meses 4 a 6",
    itens: [
      "Comparar coco, manga, abacate e açaí",
      "Padronizar o processo",
      "Testes de qualidade",
      "Kit de demonstração (1 kg e 5 kg)",
    ],
  },
  {
    fase: "Primeiros clientes",
    meses: "Meses 7 a 9",
    itens: ["Contato com 3 ETEs ou indústrias", "Teste gratuito com o cliente zero", "Primeiro acordo de fornecimento", "Case documentado"],
  },
  {
    fase: "Consolidação local",
    meses: "Meses 10 a 12",
    itens: ["Prospecção com o case", "Produção recorrente", "Instagram e LinkedIn com vídeos do processo", "Plano do ano 2"],
  },
];

export const metasAno1 = [
  "De 1 a 3 clientes locais atendidos",
  "Processo padronizado e replicável",
  "Um case real documentado",
  "Marca com presença digital ativa",
];
