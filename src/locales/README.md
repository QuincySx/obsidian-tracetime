

# Contributing a new language

The locale system is built so that adding a new language touches only two things: one new file and a few lines in `registry.ts`. Follow every step below in order — skipping the renames is the most common way to break the build.

### Locale code and file naming

The locale file name must follow the **BCP 47** language tag format whenever a regional variant is relevant: a lowercase language code, followed by a hyphen and an uppercase region code.

For example:

- `es-ES` — Spanish as used in Spain
    
- `pt-BR` — Portuguese as used in Brazil
    
- `zh-CN` — Chinese as used in China
    

The file name must match the locale key exactly, including the lowercase language code, hyphen, and uppercase region code. This is important because the locale resolver uses the same BCP 47 format at runtime to find the corresponding translation file.

However, a region is not required when the language does not need a regional distinction. In that case, you can use only the language code, as already done with `en.ts` and `zh.ts`. For example, if there is no need to distinguish between regional variants of a language, `es.ts` is valid and can be used instead of `es-ES`.

### Internal variable name

Inside the locale file, the locale code is also used as the name of the main translation object. Since a hyphen is not valid in a JavaScript/TypeScript variable name, **remove the hyphen and use camelCase**.

There are two places that must use this name: the `const` declaration at the beginning of the file and the `export default` at the end.

For example, for `pt-BR.ts`:

```typescript
const ptBR = {
  // translations...
};

export default ptBR;
```

For `es-ES.ts`:

```typescript
const esES = {
  // translations...
};

export default esES;
```

The file itself keeps the BCP 47 name (`pt-BR.ts`), while the internal variable removes the hyphen (`ptBR`).

### Translating the values

Use `en.ts` as the source of truth and copy it when creating a new locale. Translate the **values**, but never rename the keys.

For example:

```typescript
const esES = {
  justNow: "Ahora mismo",
  minutesAgo: (n: number) => `hace ${n} minuto${n === 1 ? "" : "s"}`,
};
```

The keys `justNow` and `minutesAgo` must remain exactly the same because the rest of the application accesses them by name.

If a key is a function in `en.ts`, it must remain a function with the same parameters in the new locale. Only the returned text should be translated.

### Pluralization

Pay special attention to pluralization. The English translation may use a simple pattern such as:

```typescript
minutesAgo: (n: number) => `${n} minute${n === 1 ? "" : "s"} ago`
```

This pattern should not be copied blindly into every language. Different languages have different pluralization rules.

Keep the same function signature:

```typescript
(n: number) => string
```

but adapt the function body to the grammatical rules of the language being translated.

If the language does not require pluralization for a particular phrase, the function can still remain a function while returning the appropriate translated text.

### Month names

Month names are defined separately through the `monthNamesShort` export at the top of each locale file. Keep the export name **exactly as** `**monthNamesShort**` in every locale file.

For example:

```typescript
export const monthNamesShort = [
  "jan",
  "fev",
  "mar",
  // ...
];
```

Do not rename this export inside the locale file. The `registry.ts` handles the aliases when importing it, allowing each locale to have its own month names without name conflicts.

Month names should also follow the grammatical conventions of the target language. Some languages use capitalized month names, while others normally use lowercase names.

### Partial translations and fallback

You do not have to translate every key immediately. Locale files use `Partial<Locale>`, so missing keys automatically fall back to the English translations.

This allows a new language to be added gradually: translate the available strings, keep all existing keys and function signatures intact, and complete the remaining translations over time.

### Registering the locale in `registry.ts`

After creating and translating the new locale file, the last step is to register it in `src/locales/registry.ts`.

In most cases, you can copy an existing locale import line and replace the language and region codes with those of your new locale.

For example, starting with:

```typescript
import ptBR, { monthNamesShort as monthNamesPtbr } from "./pt-BR";
```

For Spanish from Spain, change the locale name to `esES`, the month names alias to `monthNamesEses`, and the file path to the new locale file:

```typescript
import esES, { monthNamesShort as monthNamesEses } from "./es-ES";
```

The important part is understanding what each name represents:

- `esES` is the default export from `es-ES.ts`.
    
- `monthNamesShort` is the named export that exists in every locale file.
    
- `monthNamesEses` is an alias used only inside `registry.ts` to identify the Spanish month names.
    
- `"./es-ES"` points to the locale file containing the Spanish translation.
    

After adding the import, register the locale in both lookup tables using the exact same BCP 47 locale key:

```typescript
export const locales: Record<string, Partial<Locale>> = {
	en,
	zh,
	"pt-BR": ptBR,
	"es-ES": esES,
};
```

And:

```typescript
export const monthNames: Record<string, string[]> = {
	en: monthNamesEn,
	zh: monthNamesZh,
	"pt-BR": monthNamesPtbr,
	"es-ES": monthNamesEses,
};
```

The locale key (`"es-ES"`) must match the file name and the BCP 47 identifier used by the resolver. The alias (`monthNamesEses`) only needs to match the name used in the import and in the `monthNames` table.

For a new locale, these are therefore the only parts you normally need to change in `registry.ts`: **one import, one entry in** `**locales**`, **and one entry in** `**monthNames**`
