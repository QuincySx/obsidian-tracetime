// src/locales/pt.ts

export const monthNamesShort = [
	"jan", "fev", "mar", "abr", "mai", "jun",
	"jul", "ago", "set", "out", "nov", "dez",
];

const pt = {
	// --- Output labels (shown on every note, from format.ts) ---
	justNow: "Agora mesmo",
	minutesAgo: (n: number) => `${n} minuto${n === 1 ? "" : "s"} atrás`,
	hoursAgo: (n: number) => `${n} hora${n === 1 ? "" : "s"} atrás`,
	yesterdayAt: (time: string) => `Ontem ${time}`,
	daysAgo: (n: number) => `${n} dia${n === 1 ? "" : "s"} atrás`,

	// --- Date format presets (dropdown options) ---
	dateFormatPresets: [
		"YYYY-MM-DD HH:mm",
		"YY-MM-DD HH:mm",
		"MM-DD HH:mm",
		"D MMM HH:mm",
		"D MMM",
		"'Semana' W, MMM",
		"'Semana' W",
		"HH:mm MM/DD YY",
		"HH:mm MM-DD",
		"HH:mm M/D",
		"HH:mm D MMM",
	],

	// --- Settings panel ---
	displayRulesName: "Regras de exibição",
	displayRulesDesc:
		"Configurações com prioridade de cima para baixo; a primeira configuração tem prioridade sobre a segunda e assim por diante. Desativar uma das configurações faz com que a próxima seja usada, e assim sucessivamente, caso todas sejam desativadas o formato de data completo será usado como último recurso.",

	rung1Name: "1. Agora",
	rung1Example: "ex.: um bloco editado há 2 minutos → Agora",
	rung2Name: "2. N minutos atrás",
	rung2Example: "ex.: um bloco editado há 45 minutos → 45 minutos atrás",
	rung3Name: "3. N horas atrás",
	rung3Example:
		"ex.: um bloco editado há 3 horas → 3 horas atrás (pra mostrar a hora exata de hoje, desative esta opção e ative a opção seguinte)",
	rung6Name: "6. N dias atrás",
	rung6Example: "ex.: um bloco editado há 5 dias → 5 dias atrás",

	unitMinutes: "minutos",
	unitHours: "horas",
	unitDays: "dias",
	thresholdDesc: (example: string, unit: string) => `${example}. Unidade do limite: ${unit}`,

	todayTimeOnlyName: "4. Hoje: mostrar só a hora",
	todayTimeOnlyDesc:
		'Blocos editados hoje mostram "14:35". Mutuamente exclusivo com a opção acima: se ambos ativos, "N horas atrás" tem prioridade.',

	yesterdayName: '5. Ontem: mostrar "Ontem HH:mm"',
	yesterdayDesc: 'Blocos editados ontem mostram "Ontem 18:05".',

	thisYearName: '7. Este ano: mostrar "MM-DD"',
	thisYearDesc: 'Blocos mais antigos deste ano mostram "03-08"; blocos de anos anteriores usam o formato de data completo.',

	fontSizeName: "Tamanho da fonte do registro de tempo",
	fontSizeDesc: "Tamanho (px) da fonte do registro de tempo; um pouco menor que a fonte do texto do corpo por padrão.",

	labelVerticalName: "Posição vertical do registro de tempo",
	labelVerticalDesc:
		"Em que altura o registro de tempo fica dentro do bloco ou parágrafo: primeira e última: Centraliza no inicio ou final do bloco/parágrafo; meio centraliza verticalmente com o parágrafo inteiro.",
	optionBlockStart: "Primeira linha do bloco ou parágrafo",
	optionBlockMiddle: "Meio do bloco ou parágrafo",
	optionBlockEnd: "Última linha do bloco ou parágrafo",

	compactModeName: "Modo compacto",
	compactModeDesc:
		'Quando "limitar largura da linha" está desligado, o rótulo encolhe pra um ponto na borda direita e expande ao passar o mouse; quando está ligado, sempre mostra a hora completa.',

	fullDateFormatName: "Formato de data completo",
	fullDateFormatDesc: "Exibição padrão quando nenhuma das opções for válida; cada opção mostra o resultado real renderizado.",
	customOption: "Personalizado…",

	customFormatName: "Formato personalizado",
	customFormatDesc:
		"Formato de Referência: YYYY=ano com 4 dígitos, YY=ano com 2 dígitos, MM=mês, M=mês sem zero à esquerda, DD=dia, D=dia sem zero à esquerda, HH=hora, mm=minuto, MMM=nome abreviado do mês, W=semana do mês. ex.: D MMM → 22 jul.",

	rollbackName: "Restaurar registros de data e hora",
	rollbackDesc:
		"Um backup da geração anterior é salvo automaticamente antes de cada escrita. Se os registros de data e hora forem corrompidos, restaure a partir do backup do arquivo atualmente aberto; a própria restauração também é salva, então dá pra reverter de novo.",
	rollbackButton: "Restaurar backup do arquivo atual",
	noticeOpenFileFirst: "TraceTime: abra um arquivo Markdown primeiro",
	noticeRestored: "TraceTime: registros de data e hora restaurados do backup",
	noticeNoBackup: "TraceTime: nenhum backup disponível para este arquivo",

	previewTitle: "Pré-visualização em tempo real",
	previewSeconds: (n: number) => `Editado há ${n} segundo${n === 1 ? "" : "s"}`,
	previewMinutes: (n: number) => `Editado há ${n} minuto${n === 1 ? "" : "s"}`,
	previewHours: (n: number) => `Editado há ${n} hora${n === 1 ? "" : "s"}`,
	previewYesterday: (time: string) => `Editado ontem às ${time}`,
	previewDays: (n: number) => `Editado há ${n} dia${n === 1 ? "" : "s"}`,
};

export default pt;