// src/locales/zh.ts

export const monthNamesShort = [
	"1月", "2月", "3月", "4月", "5月", "6月",
	"7月", "8月", "9月", "10月", "11月", "12月",
];

const zh = {
	// --- Output labels (shown on every note, from format.ts) ---
	justNow: "刚刚",
	minutesAgo: (n: number) => `${n} 分钟前`,
	hoursAgo: (n: number) => `${n} 小时前`,
	yesterdayAt: (time: string) => `昨天 ${time}`,
	daysAgo: (n: number) => `${n} 天前`,

	// --- Date format presets (dropdown options) ---
	dateFormatPresets: [
		"YYYY-MM-DD HH:mm",
		"YY-MM-DD HH:mm",
		"MM-DD HH:mm",
		"M月D日 HH:mm",
		"M月D日",
		"M月第W周 HH:mm",
		"M月第W周",
		"HH:mm MM/DD YY",
		"HH:mm MM-DD",
		"HH:mm M/D",
		"HH:mm M月D日",
	],

	// --- Settings panel ---
	displayRulesName: "显示规则",
	displayRulesDesc: "按从上到下的顺序匹配，命中即停；关闭某档会落到下一档，最后由完整日期格式兜底。",

	rung1Name: "1. 刚刚",
	rung1Example: "例：2 分钟前编辑的块 → 刚刚",
	rung2Name: "2. N 分钟前",
	rung2Example: "例：45 分钟前编辑的块 → 45 分钟前",
	rung3Name: "3. N 小时前",
	rung3Example: "例：3 小时前编辑的块 → 3 小时前（想在今天显示几点几分就关掉这档、打开下一档）",
	rung6Name: "6. N 天前",
	rung6Example: "例：5 天前编辑的块 → 5 天前",

	unitMinutes: "分钟",
	unitHours: "小时",
	unitDays: "天",

	todayTimeOnlyName: "4. 今天只显示时间",
	todayTimeOnlyDesc: "今天编辑的块显示「14:35」。和上一档互斥：都开时“N 小时前”优先",

	yesterdayName: "5. 昨天显示“昨天 HH:mm”",
	yesterdayDesc: "昨天编辑的块显示「昨天 18:05」",

	thisYearName: "7. 今年显示“MM-DD”",
	thisYearDesc: "今年更早的块显示「03-08」，跨年走完整格式",

	fontSizeName: "标签字号",
	fontSizeDesc: "时间标签的字号（px），默认比正文小一点",

	labelVerticalName: "标签垂直位置",
	labelVerticalDesc: "时间标签显示在块的哪个高度：首行/末行是该行的行内居中，中间是整个块的垂直居中",
	optionBlockStart: "块首行",
	optionBlockMiddle: "块中间",
	optionBlockEnd: "块末行",

	compactModeName: "紧凑模式",
	compactModeDesc: "关闭「限制行宽」时，标签收起为右缘的小圆点，鼠标悬停才展开完整时间；开启「限制行宽」时始终完整显示",

	fullDateFormatName: "完整日期格式",
	fullDateFormatDesc: "以上档位都没命中时的兜底显示，选项就是实际效果",
	customOption: "自定义…",

	customFormatName: "自定义格式",
	customFormatDesc:
		"占位符：YYYY=4位年 YY=2位年 MM=月 M=月不补零 DD=日 D=日不补零 HH=时 mm=分 W=当月第几周。例：M月D日 → 7月22日；M月第W周 → 7月第4周",

	rollbackName: "回滚时间戳",
	rollbackDesc: "每次写入前都会自动留一份上一代备份。时间戳被误刷后，可用当前打开文件的备份恢复；回滚本身也会留档，可再次滚回。",
	rollbackButton: "恢复当前文件的备份",
	noticeOpenFileFirst: "TraceTime: 请先打开一个 Markdown 文件",
	noticeRestored: "TraceTime: 已从备份恢复时间戳",
	noticeNoBackup: "TraceTime: 该文件没有可用备份",

	previewTitle: "实时预览",
	previewSeconds: (n: number) => `${n} 秒前编辑`,
	previewMinutes: (n: number) => `${n} 分钟前编辑`,
	previewHours: (n: number) => `${n} 小时前编辑`,
	previewYesterday: (time: string) => `昨天 ${time} 编辑`,
	previewDays: (n: number) => `${n} 天前编辑`,
};

export default zh;