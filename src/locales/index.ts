// src/locales/index.ts
import { moment } from "obsidian";
import { locales, monthNames, Locale } from "./registry";

/**
 * Pega o idioma configurado no Obsidian e resolve pra uma chave suportada.
 * moment.locale() devolve algo como "pt-br" ou "zh-cn" (sempre minúsculo).
 * Tenta primeiro a chave completa com região normalizada (ex: "pt-BR");
 * se não achar, cai pro idioma "puro" (ex: "zh"); se nem isso, usa "en".
 */
function resolveLocale(): string {
	const raw = moment.locale();
	const [lang, region] = raw.split("-");
	const withRegion = region ? `${lang}-${region.toUpperCase()}` : undefined;

	if (withRegion && locales[withRegion]) return withRegion;
	if (locales[lang]) return lang;
	return "en";
}

const activeLocale = resolveLocale();

// Fallback automático: começa com "en" completo, sobrescreve só com o que
// o idioma ativo realmente define.
export const t: Locale = { ...locales.en, ...locales[activeLocale] } as Locale;
export const activeMonthNames: string[] = monthNames[activeLocale] ?? monthNames.en;