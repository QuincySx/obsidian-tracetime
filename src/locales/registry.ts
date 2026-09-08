// src/locales/registry.ts
// Único trabalho deste arquivo: importar cada idioma e montar as tabelas
// de lookup. Nenhuma lógica de resolução aqui — pra adicionar um idioma
// novo, só mexe neste arquivo (import + 1 linha em cada tabela abaixo).

import en, { monthNamesShort as monthNamesEn } from "./en";
import zh, { monthNamesShort as monthNamesZh } from "./zh";
import ptBR, { monthNamesShort as monthNamesPtbr } from "./pt-BR";

// "Partial" porque um idioma novo pode não ter todas as chaves ainda —
// o fallback pro "en" cobre o que faltar.
export type Locale = typeof en;

export const locales: Record<string, Partial<Locale>> = {
	en,
	zh,
	"pt-BR": ptBR,
    pt: ptBR
};

export const monthNames: Record<string, string[]> = {
	en: monthNamesEn,
	zh: monthNamesZh,
	"pt-BR": monthNamesPtbr,
    pt: monthNamesPtbr
};