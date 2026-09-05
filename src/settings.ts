import { App, Notice, PluginSettingTab, Setting, TextComponent } from "obsidian";
import type TraceTimePlugin from "./main";
import { DEFAULT_SETTINGS, formatTimestamp, renderDateFormat, TraceTimeSettings } from "./format";
import { t } from "./locales";

export { DEFAULT_SETTINGS };
export type { TraceTimeSettings };

/** Presets for "full date format": the dropdown renders the actual result, no need to decode placeholders */
const DATE_FORMAT_PRESETS = t.dateFormatPresets;
const CUSTOM_FORMAT = "__custom__";

function parseNonNegativeInt(value: string, fallback: number): number {
	const n = Number.parseInt(value.trim(), 10);
	return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export class TraceTimeSettingTab extends PluginSettingTab {
	constructor(app: App, private plugin: TraceTimePlugin) {
		super(app, plugin);
	}

		display(): void {
		const { containerEl } = this;
		containerEl.empty();
		const settings = this.plugin.settings;

		// Live preview: a set of samples at different ages, rendered with the
		// current rules; refreshes immediately on any option change.
		const previewEl = containerEl.createDiv({ cls: "tracetime-settings-preview" });
		const updatePreview = () => this.renderPreview(previewEl);
		updatePreview();

		new Setting(containerEl)
			.setName(t.displayRulesName)
			.setDesc(t.displayRulesDesc)
			.setHeading();

				this.addThresholdRung(containerEl, updatePreview, {
			name: t.rung1Name,
			example: t.rung1Example,
			unit: t.unitMinutes,
			get: () => settings.justNowMinutes,
			fallback: DEFAULT_SETTINGS.justNowMinutes,
			set: (v) => (settings.justNowMinutes = v),
		});

		this.addThresholdRung(containerEl, updatePreview, {
			name: t.rung2Name,
			example: t.rung2Example,
			unit: t.unitMinutes,
			get: () => settings.minutesAgoLimit,
			fallback: DEFAULT_SETTINGS.minutesAgoLimit,
			set: (v) => (settings.minutesAgoLimit = v),
		});

		this.addThresholdRung(containerEl, updatePreview, {
			name: t.rung3Name,
			example: t.rung3Example,
			unit: t.unitHours,
			get: () => settings.hoursAgoLimit,
			fallback: DEFAULT_SETTINGS.hoursAgoLimit,
			set: (v) => (settings.hoursAgoLimit = v),
		});

				new Setting(containerEl)
			.setName(t.todayTimeOnlyName)
			.setDesc(t.todayTimeOnlyDesc)
			.addToggle((toggle) =>
				toggle.setValue(settings.todayTimeOnly).onChange(async (value) => {
					settings.todayTimeOnly = value;
					await this.plugin.saveSettings();
					updatePreview();
				})
			);

		new Setting(containerEl)
			.setName(t.yesterdayName)
			.setDesc(t.yesterdayDesc)
			.addToggle((toggle) =>
				toggle.setValue(settings.yesterdayWithTime).onChange(async (value) => {
					settings.yesterdayWithTime = value;
					await this.plugin.saveSettings();
					updatePreview();
				})
			);

		this.addThresholdRung(containerEl, updatePreview, {
			name: t.rung6Name,
			example: t.rung6Example,
			unit: t.unitDays,
			get: () => settings.daysAgoLimit,
			fallback: 30,
			set: (v) => (settings.daysAgoLimit = v),
		});

		new Setting(containerEl)
			.setName(t.thisYearName)
			.setDesc(t.thisYearDesc)
			.addToggle((toggle) =>
				toggle.setValue(settings.thisYearShort).onChange(async (value) => {
					settings.thisYearShort = value;
					await this.plugin.saveSettings();
					updatePreview();
				})
			);

				new Setting(containerEl)
			.setName(t.fontSizeName)
			.setDesc(t.fontSizeDesc)
			.addSlider((slider) =>
				slider
					.setLimits(9, 20, 1)
					.setValue(settings.labelFontSize)
					.onChange(async (value) => {
						settings.labelFontSize = value;
						await this.plugin.saveSettings();
						updatePreview();
					})
			);

		new Setting(containerEl)
			.setName(t.labelVerticalName)
			.setDesc(t.labelVerticalDesc)
			.addDropdown((drop) =>
				drop
					.addOption("start", t.optionBlockStart)
					.addOption("middle", t.optionBlockMiddle)
					.addOption("end", t.optionBlockEnd)
					.setValue(settings.labelVertical)
					.onChange(async (value) => {
						settings.labelVertical = value as TraceTimeSettings["labelVertical"];
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t.compactModeName)
			.setDesc(t.compactModeDesc)
			.addToggle((toggle) =>
				toggle.setValue(settings.compactLabels).onChange(async (value) => {
					settings.compactLabels = value;
					await this.plugin.saveSettings();
				})
			);

				const formatNow = new Date();
		const isCustomFormat = !DATE_FORMAT_PRESETS.includes(settings.dateFormat);

		let customFormatSetting: Setting;
		new Setting(containerEl)
			.setName(t.fullDateFormatName)
			.setDesc(t.fullDateFormatDesc)
			.addDropdown((drop) => {
				for (const p of DATE_FORMAT_PRESETS) drop.addOption(p, renderDateFormat(p, formatNow));
				drop.addOption(CUSTOM_FORMAT, t.customOption);
				drop.setValue(isCustomFormat ? CUSTOM_FORMAT : settings.dateFormat).onChange(async (value) => {
					if (value === CUSTOM_FORMAT) {
						customFormatSetting.settingEl.show();
					} else {
						customFormatSetting.settingEl.hide();
						settings.dateFormat = value;
						await this.plugin.saveSettings();
						updatePreview();
					}
				});
			});

		customFormatSetting = new Setting(containerEl)
			.setName(t.customFormatName)
			.setDesc(t.customFormatDesc)
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.dateFormat)
					.setValue(settings.dateFormat)
					.onChange(async (value) => {
						settings.dateFormat = value.trim() || DEFAULT_SETTINGS.dateFormat;
						await this.plugin.saveSettings();
						updatePreview();
					})
			);
		if (!isCustomFormat) customFormatSetting.settingEl.hide();

				new Setting(containerEl)
			.setName(t.rollbackName)
			.setDesc(t.rollbackDesc)
			.addButton((button) =>
				button.setButtonText(t.rollbackButton).onClick(async () => {
					const file = this.app.workspace.getActiveFile();
					if (!file || file.extension !== "md") {
						new Notice(t.noticeOpenFileFirst);
						return;
					}
					const ok = await this.plugin.tracker.restoreFromBackup(file);
					new Notice(ok ? t.noticeRestored : t.noticeNoBackup);
				})
			);
	}

	/** 带“开关 + 阈值输入”的档位行；关闭 = 阈值存 0，重新开启时恢复输入框里的值 */
	private addThresholdRung(
		containerEl: HTMLElement,
		updatePreview: () => void,
		rung: {
			name: string;
			example: string;
			unit: string;
			get: () => number;
			fallback: number;
			set: (v: number) => void;
		}
	): void {
		let textInput: TextComponent;
		new Setting(containerEl)
			.setName(rung.name)
			.setDesc(t.thresholdDesc(rung.example, rung.unit))
			.addText((text) => {
				textInput = text;
				text
					.setPlaceholder(String(rung.fallback))
					.setValue(String(rung.get() || rung.fallback))
					.setDisabled(rung.get() <= 0)
					.onChange(async (value) => {
						rung.set(parseNonNegativeInt(value, rung.fallback));
						await this.plugin.saveSettings();
						updatePreview();
					});
			})
			.addToggle((toggle) =>
				toggle.setValue(rung.get() > 0).onChange(async (value) => {
					rung.set(value ? parseNonNegativeInt(textInput.getValue(), rung.fallback) : 0);
					textInput.setDisabled(!value);
					await this.plugin.saveSettings();
					updatePreview();
				})
			);
	}

		private renderPreview(el: HTMLElement): void {
		el.empty();
		el.createDiv({ cls: "tracetime-preview-title", text: t.previewTitle });
		const now = new Date();
		const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18, 0);
		const samples: [string, Date][] = [
			[t.previewSeconds(30), new Date(now.getTime() - 30 * 1000)],
			[t.previewMinutes(2), new Date(now.getTime() - 2 * 60000)],
			[t.previewMinutes(45), new Date(now.getTime() - 45 * 60000)],
			[t.previewHours(3), new Date(now.getTime() - 3 * 3600000)],
			[t.previewHours(10), new Date(now.getTime() - 10 * 3600000)],
			[t.previewYesterday("18:00"), yesterday],
			[t.previewDays(5), new Date(now.getTime() - 5 * 86400000)],
			[t.previewDays(40), new Date(now.getTime() - 40 * 86400000)],
			[t.previewDays(200), new Date(now.getTime() - 200 * 86400000)],
		];
		for (const [label, at] of samples) {
			const row = el.createDiv({ cls: "tracetime-preview-row" });
			row.createSpan({ cls: "tracetime-preview-sample", text: label });
			const result = row.createSpan({
				cls: "tracetime-preview-result",
				text: formatTimestamp(Math.floor(at.getTime() / 60000), this.plugin.settings, now),
			});
			result.style.fontSize = `${this.plugin.settings.labelFontSize}px`;
		}
	}
}
