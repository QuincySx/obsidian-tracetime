// src/locales/index.ts
import en, { monthNamesShort as monthNamesEn } from "./en";
import zh, { monthNamesShort as monthNamesZh } from "./zh";
import pt, { monthNamesShort as monthNamesPt } from "./pt";

// Cada entrada é "Partial" porque um idioma novo pode não ter todas as
// chaves ainda — o fallback pro "en" cobre o que faltar.
type Locale = typeof en;

const locales: Record<string, Partial<Locale>> = { en, zh, pt };
const monthNames: Record<string, string[]> = {
	en: monthNamesEn,
	zh: monthNamesZh,
	pt: monthNamesPt,
};

/** Pega o idioma configurado no Obsidian e resolve pra uma chave suportada. */
function resolveLocale(): string {
	// window.moment vem do Obsidian; "pt-br" -> "pt", "zh-cn" -> "zh"
	const raw: string = (window as any).moment?.locale?.() ?? "en";
	const short = raw.split("-")[0];
	return locales[short] ? short : "en";
}

const activeLocale = resolveLocale();

// Fallback automático: começa com "en" completo, sobrescreve só com o que
// o idioma ativo realmente define.
export const t: Locale = { ...en, ...locales[activeLocale] };
export const activeMonthNames: string[] = monthNames[activeLocale] ?? monthNames.en;