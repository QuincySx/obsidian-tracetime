import assert from "node:assert/strict";
import { locales } from "../src/locales/registry";

// Add an incomplete locale before importing the resolver to exercise fallback.
const rawLocale = process.env.TRACETIME_TEST_LOCALE;
if (rawLocale === "test") locales.test = { justNow: "Translated now" };

const expectedLabels = {
	en: {
		justNow: "Just now", minute: "1 minute ago", minutes: "30 minutes ago",
		hour: "1 hour ago", hours: "3 hours ago", yesterday: "Yesterday 08:00",
		day: "1 day ago", days: "5 days ago", heading: "Display rules",
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	},
	zh: {
		justNow: "刚刚", minute: "1 分钟前", minutes: "30 分钟前",
		hour: "1 小时前", hours: "3 小时前", yesterday: "昨天 08:00",
		day: "1 天前", days: "5 天前", heading: "显示规则",
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	},
	pt: {
		justNow: "Agora", minute: "1 minuto atrás", minutes: "30 minutos atrás",
		hour: "1 hora atrás", hours: "3 horas atrás", yesterday: "Ontem 08:00",
		day: "1 dia atrás", days: "5 dias atrás", heading: "Regras de exibição",
		months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
	},
};

async function main() {
	const expected = expectedLabels[process.env.TRACETIME_TEST_EXPECTED as keyof typeof expectedLabels];
	assert.ok(expected, "runner must select an explicit expected language");
	const { t, activeMonthNames } = await import("../src/locales");
	const { DEFAULT_SETTINGS, formatTimestamp, renderDateFormat } = await import("../src/format");
	const now = new Date(2026, 6, 20, 12, 0);
	const nowMinutes = now.getTime() / 60000;
	const format = (minutesAgo: number, overrides = {}) =>
		formatTimestamp(nowMinutes - minutesAgo, { ...DEFAULT_SETTINGS, ...overrides }, now);

	assert.equal(format(1), rawLocale === "test" ? "Translated now" : expected.justNow);
	assert.equal(format(1, { justNowMinutes: 0 }), expected.minute);
	assert.equal(format(30), expected.minutes);
	assert.equal(format(60), expected.hour);
	assert.equal(format(180), expected.hours);
	assert.equal(format(28 * 60), expected.yesterday);
	assert.equal(format(24 * 60, { yesterdayWithTime: false, daysAgoLimit: 30 }), expected.day);
	assert.equal(format(5 * 24 * 60, { daysAgoLimit: 30 }), expected.days);
	assert.equal(t.displayRulesName, expected.heading);
	assert.deepEqual(activeMonthNames, expected.months);

	for (let month = 0; month < 12; month++) {
		assert.equal(renderDateFormat("MMM", new Date(2025, month, 19)), expected.months[month]);
	}
	const date = new Date(2025, 6, 19, 8, 5);
	assert.equal(renderDateFormat("YYYY-MM-DD HH:mm", date), "2025-07-19 08:05");
	assert.equal(renderDateFormat("YY年M月D日", date), "25年7月19日");
	assert.equal(renderDateFormat("M月第W周", date), "7月第3周");
	assert.equal(renderDateFormat("'Week' W, MMM D HH:mm", date), `Week 3, ${expected.months[6]} 19 08:05`);
	assert.equal(renderDateFormat("'Semana' W", date), "Semana 3");
	assert.equal(renderDateFormat("'MMM YYYY W'", date), "MMM YYYY W");
	assert.equal(renderDateFormat("MMM/MM/M", date), `${expected.months[6]}/07/7`);
	if (rawLocale === "test") {
		assert.equal(t.customOption, "Custom…");
		assert.ok(t.dateFormatPresets.includes("'Week' W, MMM"));
	}
	console.log(`ok   locale ${rawLocale}: resolution, labels, pluralization, months, formats and fallback`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
