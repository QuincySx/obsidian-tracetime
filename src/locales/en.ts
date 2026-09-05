// src/locales/en.ts
// Base locale — the source of truth. Every other locale falls back to this
// one for any key it doesn't define.

export const monthNamesShort = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const en = {
	// --- Output labels (shown on every note, from format.ts) ---
	justNow: "Just now",
	minutesAgo: (n: number) => `${n} minute${n === 1 ? "" : "s"} ago`,
	hoursAgo: (n: number) => `${n} hour${n === 1 ? "" : "s"} ago`,
	yesterdayAt: (time: string) => `Yesterday ${time}`,
	daysAgo: (n: number) => `${n} day${n === 1 ? "" : "s"} ago`,

	// --- Date format presets (dropdown options) ---
	dateFormatPresets: [
		"YYYY-MM-DD HH:mm",
		"YY-MM-DD HH:mm",
		"MM-DD HH:mm",
		"MMM D HH:mm",
		"MMM D",
		"'Week' W, MMM",
		"'Week' W",
		"HH:mm MM/DD YY",
		"HH:mm MM-DD",
		"HH:mm M/D",
		"HH:mm MMM D",
	],

	// --- Settings panel ---
	displayRulesName: "Display rules",
	displayRulesDesc:
		"Matched top to bottom; the first match wins. Disabling a tier falls through to the next one, with the full date format as the final fallback.",

	rung1Name: "1. Just now",
    rung1Example: "e.g.: a block edited 2 minutes ago → Just now",

    rung2Name: "2. N minutes ago",
    rung2Example: "e.g.: a block edited 45 minutes ago → 45 minutes ago",
    
    rung3Name: "3. N hours ago",
    rung3Example:
    "e.g.: a block edited 3 hours ago → 3 hours ago (to show today's exact time instead, disable this tier and enable the next one)",
    
    rung6Name: "6. N days ago",
    rung6Example: "e.g.: a block edited 5 days ago → 5 days ago",

	unitMinutes: "minutes",
	unitHours: "hours",
	unitDays: "days",
	thresholdDesc: (example: string, unit: string) => `${example}. Threshold unit: ${unit}`,

	todayTimeOnlyName: "4. Today: show time only",
	todayTimeOnlyDesc:
		'Blocks edited today show "14:35". Mutually exclusive with the tier above: if both are on, "N hours ago" takes priority.',

	yesterdayName: '5. Yesterday: show "Yesterday HH:mm"',
	yesterdayDesc: 'Blocks edited yesterday show "Yesterday 18:05".',

	thisYearName: '7. This year: show "MM-DD"',
	thisYearDesc: 'Earlier blocks from this year show "03-08"; blocks from previous years use the full date format.',

	fontSizeName: "Label font size",
	fontSizeDesc: "Font size (px) of the time label; slightly smaller than body text by default.",

	labelVerticalName: "Label vertical position",
	labelVerticalDesc:
		"Height at which the time label sits within the block: first/last line centers inline with that line; middle centers vertically across the whole block.",
	optionBlockStart: "Block's first line",
	optionBlockMiddle: "Block's middle",
	optionBlockEnd: "Block's last line",

	compactModeName: "Compact mode",
	compactModeDesc:
		'When "limit line width" is off, the label collapses to a small dot at the right edge and expands on hover; when it\'s on, the full time always shows.',

	fullDateFormatName: "Full date format",
	fullDateFormatDesc: "Fallback display when none of the tiers above match; each option shows its actual rendered result.",
	customOption: "Custom…",

	customFormatName: "Custom format",
	customFormatDesc:
		"Placeholders: YYYY=4-digit year, YY=2-digit year, MM=month, M=month w/o leading zero, DD=day, D=day w/o leading zero, HH=hour, mm=minute, MMM=short month name, W=week of month. e.g.: MMM D → Jul 22.",

	rollbackName: "Restore timestamps",
	rollbackDesc:
		"A backup of the previous generation is kept automatically before every write. If timestamps get corrupted, restore them from the currently open file's backup; the restore itself is backed up too, so you can roll back again.",
	rollbackButton: "Restore backup for current file",
	noticeOpenFileFirst: "TraceTime: please open a Markdown file first",
	noticeRestored: "TraceTime: timestamps restored from backup",
	noticeNoBackup: "TraceTime: no backup available for this file",

	previewTitle: "Live preview",
	previewSeconds: (n: number) => `Edited ${n} seconds ago`,
	previewMinutes: (n: number) => `Edited ${n} minutes ago`,
	previewHours: (n: number) => `Edited ${n} hours ago`,
	previewYesterday: (time: string) => `Edited yesterday at ${time}`,
	previewDays: (n: number) => `Edited ${n} days ago`,
};

export default en;