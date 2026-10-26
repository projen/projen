# `javascript.biome_config` Submodule <a name="`javascript.biome_config` Submodule" id="projen.javascript.biome_config"></a>


## Structs <a name="Structs" id="Structs"></a>

### Actions <a name="Actions" id="projen.javascript.biome_config.Actions"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.Actions.Initializer"></a>

```typescript
import { javascript } from 'projen'

const actions: javascript.biome_config.Actions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.Actions.property.preset">preset</a></code> | <code>projen.javascript.biome_config.PresetConfig</code> | Selects the baseline set of assist actions. |
| <code><a href="#projen.javascript.biome_config.Actions.property.recommended">recommended</a></code> | <code>boolean</code> | Enables or disables Biome's recommended assist actions across all action groups. |
| <code><a href="#projen.javascript.biome_config.Actions.property.source">source</a></code> | <code>projen.javascript.biome_config.Source</code> | Configures source-level actions such as organizing imports and sorting declarations. |

---

##### `preset`<sup>Optional</sup> <a name="preset" id="projen.javascript.biome_config.Actions.property.preset"></a>

```typescript
public readonly preset: PresetConfig;
```

- *Type:* projen.javascript.biome_config.PresetConfig
- *Default:* recommended`.

Selects the baseline set of assist actions.

`recommended` enables Biome's
recommended actions, `all` enables all actions, and `none` starts with no actions
enabled. Group presets and explicit action settings override this preset.
Defaults to `recommended`.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome_config.Actions.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean
- *Default:* true`.

Enables or disables Biome's recommended assist actions across all action groups.

Defaults to `true`.

---

##### `source`<sup>Optional</sup> <a name="source" id="projen.javascript.biome_config.Actions.property.source"></a>

```typescript
public readonly source: Source;
```

- *Type:* projen.javascript.biome_config.Source

Configures source-level actions such as organizing imports and sorting declarations.

These actions are exposed through editor source actions and through CLI checking and application.

---

### AssistConfiguration <a name="AssistConfiguration" id="projen.javascript.biome_config.AssistConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.AssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const assistConfiguration: javascript.biome_config.AssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.AssistConfiguration.property.actions">actions</a></code> | <code>projen.javascript.biome_config.Actions</code> | The assist-action configuration. |
| <code><a href="#projen.javascript.biome_config.AssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables configured assist actions in the CLI and editor integrations. |
| <code><a href="#projen.javascript.biome_config.AssistConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns selecting files on which assist actions can run. |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="projen.javascript.biome_config.AssistConfiguration.property.actions"></a>

```typescript
public readonly actions: Actions;
```

- *Type:* projen.javascript.biome_config.Actions

The assist-action configuration.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.AssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* true`.

Enables configured assist actions in the CLI and editor integrations.

Defaults to `true`.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.AssistConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns selecting files on which assist actions can run.

If omitted, all files
selected by `files.includes` remain eligible for assist actions. An empty list selects no
files. This option can only narrow the files selected by `files.includes`.

---

### BiomeConfiguration <a name="BiomeConfiguration" id="projen.javascript.biome_config.BiomeConfiguration"></a>

The configuration contained in `biome.json` or `biome.jsonc`.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.BiomeConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const biomeConfiguration: javascript.biome_config.BiomeConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.AssistConfiguration</code> | The assist configuration. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.css">css</a></code> | <code>projen.javascript.biome_config.CssConfiguration</code> | Configuration specific to CSS. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.extends">extends</a></code> | <code>any</code> | Extends the current configuration with settings from one or more other Biome configurations. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.files">files</a></code> | <code>projen.javascript.biome_config.FilesConfiguration</code> | Configures which files Biome can discover and process. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.FormatterConfiguration</code> | Configures formatting for selected files. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.graphql">graphql</a></code> | <code>projen.javascript.biome_config.GraphqlConfiguration</code> | Configuration specific to GraphQL. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.grit">grit</a></code> | <code>projen.javascript.biome_config.GritConfiguration</code> | Configuration specific to GritQL. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.html">html</a></code> | <code>projen.javascript.biome_config.HtmlConfiguration</code> | Configuration specific to HTML. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.javascript">javascript</a></code> | <code>projen.javascript.biome_config.JsConfiguration</code> | Configuration specific to JavaScript. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.json">json</a></code> | <code>projen.javascript.biome_config.JsonConfiguration</code> | Configuration specific to JSON. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.LinterConfiguration</code> | The linter configuration. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.markdown">markdown</a></code> | <code>projen.javascript.biome_config.MarkdownConfiguration</code> | Configuration specific to Markdown. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.overrides">overrides</a></code> | <code>projen.javascript.biome_config.OverridePattern[]</code> | Configures settings for files selected by each override. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.plugins">plugins</a></code> | <code>any[]</code> | A list of GritQL plugins to load. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.root">root</a></code> | <code>boolean</code> | Marks whether this file is the root configuration for a Biome project. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.schema">schema</a></code> | <code>string</code> | The JSON Schema used to validate the configuration and provide editor completion. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.tailwind">tailwind</a></code> | <code>projen.javascript.biome_config.TailwindConfiguration</code> | Configures how Biome recognizes Tailwind class strings. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.vcs">vcs</a></code> | <code>projen.javascript.biome_config.VcsConfiguration</code> | The version control integration configuration. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.yaml">yaml</a></code> | <code>projen.javascript.biome_config.YamlConfiguration</code> | Configuration specific to YAML. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.BiomeConfiguration.property.assist"></a>

```typescript
public readonly assist: AssistConfiguration;
```

- *Type:* projen.javascript.biome_config.AssistConfiguration

The assist configuration.

---

##### `css`<sup>Optional</sup> <a name="css" id="projen.javascript.biome_config.BiomeConfiguration.property.css"></a>

```typescript
public readonly css: CssConfiguration;
```

- *Type:* projen.javascript.biome_config.CssConfiguration

Configuration specific to CSS.

---

##### `extends`<sup>Optional</sup> <a name="extends" id="projen.javascript.biome_config.BiomeConfiguration.property.extends"></a>

```typescript
public readonly extends: any;
```

- *Type:* any

Extends the current configuration with settings from one or more other Biome configurations.

Use `"//"` in a nested configuration to extend the root configuration at any nesting depth.
Use an array to extend configurations by relative path or installed package specifier.

Biome merges configurations from left to right. Later configurations take precedence for
single-value options, list entries are combined, and the current file is applied last.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.biome_config.BiomeConfiguration.property.files"></a>

```typescript
public readonly files: FilesConfiguration;
```

- *Type:* projen.javascript.biome_config.FilesConfiguration

Configures which files Biome can discover and process.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.BiomeConfiguration.property.formatter"></a>

```typescript
public readonly formatter: FormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.FormatterConfiguration

Configures formatting for selected files.

---

##### `graphql`<sup>Optional</sup> <a name="graphql" id="projen.javascript.biome_config.BiomeConfiguration.property.graphql"></a>

```typescript
public readonly graphql: GraphqlConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlConfiguration

Configuration specific to GraphQL.

---

##### `grit`<sup>Optional</sup> <a name="grit" id="projen.javascript.biome_config.BiomeConfiguration.property.grit"></a>

```typescript
public readonly grit: GritConfiguration;
```

- *Type:* projen.javascript.biome_config.GritConfiguration

Configuration specific to GritQL.

---

##### `html`<sup>Optional</sup> <a name="html" id="projen.javascript.biome_config.BiomeConfiguration.property.html"></a>

```typescript
public readonly html: HtmlConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlConfiguration

Configuration specific to HTML.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.javascript.biome_config.BiomeConfiguration.property.javascript"></a>

```typescript
public readonly javascript: JsConfiguration;
```

- *Type:* projen.javascript.biome_config.JsConfiguration

Configuration specific to JavaScript.

---

##### `json`<sup>Optional</sup> <a name="json" id="projen.javascript.biome_config.BiomeConfiguration.property.json"></a>

```typescript
public readonly json: JsonConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonConfiguration

Configuration specific to JSON.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.BiomeConfiguration.property.linter"></a>

```typescript
public readonly linter: LinterConfiguration;
```

- *Type:* projen.javascript.biome_config.LinterConfiguration

The linter configuration.

---

##### `markdown`<sup>Optional</sup> <a name="markdown" id="projen.javascript.biome_config.BiomeConfiguration.property.markdown"></a>

```typescript
public readonly markdown: MarkdownConfiguration;
```

- *Type:* projen.javascript.biome_config.MarkdownConfiguration

Configuration specific to Markdown.

---

##### `overrides`<sup>Optional</sup> <a name="overrides" id="projen.javascript.biome_config.BiomeConfiguration.property.overrides"></a>

```typescript
public readonly overrides: OverridePattern[];
```

- *Type:* projen.javascript.biome_config.OverridePattern[]

Configures settings for files selected by each override.

When multiple overrides configure
the same single-value setting, the last matching override takes precedence.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.javascript.biome_config.BiomeConfiguration.property.plugins"></a>

```typescript
public readonly plugins: any[];
```

- *Type:* any[]

A list of GritQL plugins to load.

---

##### `root`<sup>Optional</sup> <a name="root" id="projen.javascript.biome_config.BiomeConfiguration.property.root"></a>

```typescript
public readonly root: boolean;
```

- *Type:* boolean
- *Default:* true`. Biome implicitly treats `root` as `false` when a nested configuration uses

Marks whether this file is the root configuration for a Biome project.

The root configuration
establishes the project's base settings, while `false` marks a configuration found inside the
project as nested rather than a second project root.

Defaults to `true`. Biome implicitly treats `root` as `false` when a nested configuration uses
`"extends": "//"`. All other nested configurations must explicitly set `root` to `false`.

---

##### `schema`<sup>Optional</sup> <a name="schema" id="projen.javascript.biome_config.BiomeConfiguration.property.schema"></a>

```typescript
public readonly schema: string;
```

- *Type:* string

The JSON Schema used to validate the configuration and provide editor completion.

Biome
emits a diagnostic when a `biomejs.dev` schema URL specifies a version that differs from the
running CLI version.

---

##### `tailwind`<sup>Optional</sup> <a name="tailwind" id="projen.javascript.biome_config.BiomeConfiguration.property.tailwind"></a>

```typescript
public readonly tailwind: TailwindConfiguration;
```

- *Type:* projen.javascript.biome_config.TailwindConfiguration

Configures how Biome recognizes Tailwind class strings.

---

##### `vcs`<sup>Optional</sup> <a name="vcs" id="projen.javascript.biome_config.BiomeConfiguration.property.vcs"></a>

```typescript
public readonly vcs: VcsConfiguration;
```

- *Type:* projen.javascript.biome_config.VcsConfiguration

The version control integration configuration.

---

##### `yaml`<sup>Optional</sup> <a name="yaml" id="projen.javascript.biome_config.BiomeConfiguration.property.yaml"></a>

```typescript
public readonly yaml: YamlConfiguration;
```

- *Type:* projen.javascript.biome_config.YamlConfiguration

Configuration specific to YAML.

---

### CssAssistConfiguration <a name="CssAssistConfiguration" id="projen.javascript.biome_config.CssAssistConfiguration"></a>

Options that change how CSS assist behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssAssistConfiguration: javascript.biome_config.CssAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables assist actions for CSS. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.CssAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables assist actions for CSS.

---

### CssConfiguration <a name="CssConfiguration" id="projen.javascript.biome_config.CssConfiguration"></a>

Options applied to CSS and languages that extend it.

Language-specific settings take precedence over corresponding global settings. Global settings
apply when their language-specific counterparts are omitted, unless stated otherwise.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssConfiguration: javascript.biome_config.CssConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.CssAssistConfiguration</code> | CSS assist options. |
| <code><a href="#projen.javascript.biome_config.CssConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.CssFormatterConfiguration</code> | CSS formatter options. |
| <code><a href="#projen.javascript.biome_config.CssConfiguration.property.globals">globals</a></code> | <code>string[]</code> | Reserved for future CSS analyzer support. |
| <code><a href="#projen.javascript.biome_config.CssConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.CssLinterConfiguration</code> | CSS linter options. |
| <code><a href="#projen.javascript.biome_config.CssConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome_config.CssParserConfiguration</code> | CSS parsing options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.CssConfiguration.property.assist"></a>

```typescript
public readonly assist: CssAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.CssAssistConfiguration

CSS assist options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.CssConfiguration.property.formatter"></a>

```typescript
public readonly formatter: CssFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.CssFormatterConfiguration

CSS formatter options.

---

##### `globals`<sup>Optional</sup> <a name="globals" id="projen.javascript.biome_config.CssConfiguration.property.globals"></a>

```typescript
public readonly globals: string[];
```

- *Type:* string[]

Reserved for future CSS analyzer support.

This option currently has no effect.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.CssConfiguration.property.linter"></a>

```typescript
public readonly linter: CssLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.CssLinterConfiguration

CSS linter options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome_config.CssConfiguration.property.parser"></a>

```typescript
public readonly parser: CssParserConfiguration;
```

- *Type:* projen.javascript.biome_config.CssParserConfiguration

CSS parsing options.

---

### CssFormatterConfiguration <a name="CssFormatterConfiguration" id="projen.javascript.biome_config.CssFormatterConfiguration"></a>

Options that change how the CSS formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssFormatterConfiguration: javascript.biome_config.CssFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.delimiterSpacing">delimiterSpacing</a></code> | <code>boolean</code> | Controls spaces inside CSS parentheses and square brackets when their content fits on one line. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter for CSS and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to CSS and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The indentation width applied to CSS and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The line ending applied to CSS and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | The preferred maximum line width for CSS and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.quoteStyle">quoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | Selects the preferred quote style for CSS strings. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |

---

##### `delimiterSpacing`<sup>Optional</sup> <a name="delimiterSpacing" id="projen.javascript.biome_config.CssFormatterConfiguration.property.delimiterSpacing"></a>

```typescript
public readonly delimiterSpacing: boolean;
```

- *Type:* boolean

Controls spaces inside CSS parentheses and square brackets when their content fits on one line.

When enabled, `rgb(0, 0, 0)` becomes `rgb( 0, 0, 0 )` and `[data-attr]` becomes
`[ data-attr ]`. Empty delimiters are unchanged.

If unset, inherits the global delimiter spacing setting.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.CssFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the formatter for CSS and languages that extend it.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.CssFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to CSS and languages that extend it.

If unset, inherits the global
indentation style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.CssFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The indentation width applied to CSS and languages that extend it.

If unset, inherits the
global indentation width.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.CssFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The line ending applied to CSS and languages that extend it.

If unset, inherits the global
line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.CssFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

The preferred maximum line width for CSS and languages that extend it.

If unset, inherits
the global line width.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome_config.CssFormatterConfiguration.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double`.

Selects the preferred quote style for CSS strings.

Biome may use the alternate quote when
that avoids additional escaping. Quotes in `@charset` rules are currently preserved.
Defaults to `double`.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.CssFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean

Whether to add a trailing newline at the end of the file.

If unset, inherits the global
trailing newline setting.

---

### CssLinterConfiguration <a name="CssLinterConfiguration" id="projen.javascript.biome_config.CssLinterConfiguration"></a>

Options that change how the CSS linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssLinterConfiguration: javascript.biome_config.CssLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter for CSS. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.CssLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the linter for CSS.

---

### CssParserConfiguration <a name="CssParserConfiguration" id="projen.javascript.biome_config.CssParserConfiguration"></a>

Options that change how the CSS parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssParserConfiguration: javascript.biome_config.CssParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssParserConfiguration.property.allowWrongLineComments">allowWrongLineComments</a></code> | <code>boolean</code> | Enables `//` line comments in plain CSS. |
| <code><a href="#projen.javascript.biome_config.CssParserConfiguration.property.cssModules">cssModules</a></code> | <code>boolean</code> | Enables CSS Modules-specific syntax such as `:local`, `:global`, `composes`, and `@value`. |
| <code><a href="#projen.javascript.biome_config.CssParserConfiguration.property.tailwindDirectives">tailwindDirectives</a></code> | <code>boolean</code> | Enables parsing Tailwind CSS 4.0 directives and functions, including `@theme`, `@utility`, `@variant`, `@source`, and `@apply`. Defaults to `false`. |

---

##### `allowWrongLineComments`<sup>Optional</sup> <a name="allowWrongLineComments" id="projen.javascript.biome_config.CssParserConfiguration.property.allowWrongLineComments"></a>

```typescript
public readonly allowWrongLineComments: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables `//` line comments in plain CSS.

Standard CSS treats `//` as delimiter characters
rather than as a comment, and SCSS accepts `//` comments independently of this option.
Defaults to `false`.

---

##### `cssModules`<sup>Optional</sup> <a name="cssModules" id="projen.javascript.biome_config.CssParserConfiguration.property.cssModules"></a>

```typescript
public readonly cssModules: boolean;
```

- *Type:* boolean

Enables CSS Modules-specific syntax such as `:local`, `:global`, `composes`, and `@value`.

When unset, Biome enables this syntax automatically for files whose names end in
`.module.css` or `.module.scss; otherwise, it defaults to `false`. Enable it explicitly when CSS Module files
use another naming convention.

---

##### `tailwindDirectives`<sup>Optional</sup> <a name="tailwindDirectives" id="projen.javascript.biome_config.CssParserConfiguration.property.tailwindDirectives"></a>

```typescript
public readonly tailwindDirectives: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables parsing Tailwind CSS 4.0 directives and functions, including `@theme`, `@utility`, `@variant`, `@source`, and `@apply`. Defaults to `false`.

---

### FilesConfiguration <a name="FilesConfiguration" id="projen.javascript.biome_config.FilesConfiguration"></a>

The file handling configuration.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.FilesConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const filesConfiguration: javascript.biome_config.FilesConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.experimentalScannerIgnores">experimentalScannerIgnores</a></code> | <code>string[]</code> | **Deprecated:** Please use _force-ignore syntax_ in `files.includes` instead: <https://biomejs.dev/reference/configuration/#filesincludes>. |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.ignoreUnknown">ignoreUnknown</a></code> | <code>boolean</code> | Prevents Biome from emitting diagnostics for unrecognized file types. |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns selecting which files and directories Biome can process. |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.maxSize">maxSize</a></code> | <code>number</code> | The maximum source-file size in bytes. |

---

##### `experimentalScannerIgnores`<sup>Optional</sup> <a name="experimentalScannerIgnores" id="projen.javascript.biome_config.FilesConfiguration.property.experimentalScannerIgnores"></a>

```typescript
public readonly experimentalScannerIgnores: string[];
```

- *Type:* string[]

**Deprecated:** Please use _force-ignore syntax_ in `files.includes` instead: <https://biomejs.dev/reference/configuration/#filesincludes>.

File or directory names that the scanner ignores unconditionally while crawling. Each value
matches a complete path component, not a glob. Ignored files are not added to the module graph,
so types are not inferred from them.

---

##### `ignoreUnknown`<sup>Optional</sup> <a name="ignoreUnknown" id="projen.javascript.biome_config.FilesConfiguration.property.ignoreUnknown"></a>

```typescript
public readonly ignoreUnknown: boolean;
```

- *Type:* boolean
- *Default:* false`.

Prevents Biome from emitting diagnostics for unrecognized file types.

Defaults to `false`.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.FilesConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns selecting which files and directories Biome can process.

If omitted,
this option does not further restrict the supported files Biome can process. An empty list
selects no files. Biome ignores files under `node_modules` even when they match a pattern.

The scanner uses these patterns and, when enabled, VCS ignore files while discovering nested
configuration and ignore files. When enabled rules use the `project` or `types` domains, it
also indexes source files and project dependencies. It may still discover required metadata or
index excluded source files needed for analysis. A pattern beginning with `!!` prevents the
scanner from indexing matching paths. Patterns are evaluated in order, and a pattern beginning
with `!` excludes matches.

---

##### `maxSize`<sup>Optional</sup> <a name="maxSize" id="projen.javascript.biome_config.FilesConfiguration.property.maxSize"></a>

```typescript
public readonly maxSize: number;
```

- *Type:* number
- *Default:* 1 MiB`.

The maximum source-file size in bytes.

Biome skips larger files and emits a warning
diagnostic. Defaults to `1 MiB`.

---

### FormatterConfiguration <a name="FormatterConfiguration" id="projen.javascript.biome_config.FormatterConfiguration"></a>

Configures formatting for selected files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.FormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const formatterConfiguration: javascript.biome_config.FormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style in HTML-like languages. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Controls the placement of the closing bracket for multiline HTML and JSX opening tags. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Controls spaces inside braces in supported single-line structures. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.delimiterSpacing">delimiterSpacing</a></code> | <code>boolean</code> | Controls spaces immediately inside supported delimiters when their content fits on one line. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Controls whether arrays and objects are formatted on one line or multiple lines. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.formatWithErrors">formatWithErrors</a></code> | <code>boolean</code> | Allows formatting files that contain syntax errors when set to `true`. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns selecting files to format. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | Uses tabs or spaces for indentation. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | Sets the indentation width. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | Selects the line ending. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | Sets the preferred maximum line width used when deciding where to wrap code. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.useEditorconfig">useEditorconfig</a></code> | <code>boolean</code> | Controls whether Biome loads formatter settings from an `.editorconfig` file. Biome reads `indent_style`, `indent_size`, `end_of_line`, and `insert_final_newline`. Settings in `biome.json` or `biome.jsonc` take precedence. Biome loads only one `.editorconfig`. Nested cascading configurations and the EditorConfig `root` property are not supported. Defaults to `false`. |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.FormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition
- *Default:* auto`.

The attribute position style in HTML-like languages.

Defaults to `auto`.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.FormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean
- *Default:* false`.

Controls the placement of the closing bracket for multiline HTML and JSX opening tags.

Biome
places the bracket at the end of the last attribute line when enabled and on its own line when
disabled. This also affects self-closing HTML elements, but self-closing JSX elements are
unaffected. Defaults to `false`.

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.FormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean
- *Default:* true`.

Controls spaces inside braces in supported single-line structures.

The affected structures
vary by language. Defaults to `true`.

---

##### `delimiterSpacing`<sup>Optional</sup> <a name="delimiterSpacing" id="projen.javascript.biome_config.FormatterConfiguration.property.delimiterSpacing"></a>

```typescript
public readonly delimiterSpacing: boolean;
```

- *Type:* boolean
- *Default:* false`.

Controls spaces immediately inside supported delimiters when their content fits on one line.

It doesn't add spaces before opening delimiters or inside empty delimiters.

The affected delimiters vary by language. Defaults to `false`.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.FormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* true`.

Enables or disables the formatter.

Defaults to `true`.

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.FormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand
- *Default:* auto`.

Controls whether arrays and objects are formatted on one line or multiple lines.

`auto` formats objects on multiple lines if the first property has a newline, and arrays on
one line if they fit.

`always` formats arrays and objects on multiple lines.

`never` formats arrays and objects on one line if they fit.

Defaults to `auto`.

When formatting `package.json`, Biome uses `always` unless configured otherwise.

---

##### `formatWithErrors`<sup>Optional</sup> <a name="formatWithErrors" id="projen.javascript.biome_config.FormatterConfiguration.property.formatWithErrors"></a>

```typescript
public readonly formatWithErrors: boolean;
```

- *Type:* boolean
- *Default:* false`.

Allows formatting files that contain syntax errors when set to `true`.

Defaults to `false`.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.FormatterConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns selecting files to format.

If omitted, all files selected by
`files.includes` remain eligible for formatting. An empty list selects no files. This option
can only narrow the files selected by `files.includes`.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.FormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle
- *Default:* tab`.

Uses tabs or spaces for indentation.

Defaults to `tab`.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.FormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2`.

Sets the indentation width.

With space indentation, this is the number of spaces emitted per
indentation level. With tab indentation, Biome emits one tab per level and uses this value as
the tab's display width when calculating line length. Accepted values are `0` through `24`.
Defaults to `2`.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.FormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding
- *Default:* lf`.

Selects the line ending.

`auto` uses the platform convention. Defaults to `lf`.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.FormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80`.

Sets the preferred maximum line width used when deciding where to wrap code.

Some content,
such as long unbreakable strings, may still exceed this width. Accepted values are `1` through
`320`. Defaults to `80`.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.FormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean
- *Default:* true`. Disabling

Whether to add a trailing newline at the end of the file.

Defaults to `true`. Disabling
this option can cause compatibility problems with other tools.

---

##### `useEditorconfig`<sup>Optional</sup> <a name="useEditorconfig" id="projen.javascript.biome_config.FormatterConfiguration.property.useEditorconfig"></a>

```typescript
public readonly useEditorconfig: boolean;
```

- *Type:* boolean
- *Default:* false`.

Controls whether Biome loads formatter settings from an `.editorconfig` file. Biome reads `indent_style`, `indent_size`, `end_of_line`, and `insert_final_newline`. Settings in `biome.json` or `biome.jsonc` take precedence. Biome loads only one `.editorconfig`. Nested cascading configurations and the EditorConfig `root` property are not supported. Defaults to `false`.

---

### GraphqlAssistConfiguration <a name="GraphqlAssistConfiguration" id="projen.javascript.biome_config.GraphqlAssistConfiguration"></a>

Options that change how GraphQL assist behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GraphqlAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const graphqlAssistConfiguration: javascript.biome_config.GraphqlAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GraphqlAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables assist actions for GraphQL. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GraphqlAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables or disables assist actions for GraphQL.

Defaults to `false`.

---

### GraphqlConfiguration <a name="GraphqlConfiguration" id="projen.javascript.biome_config.GraphqlConfiguration"></a>

Options applied to GraphQL files.

Language-specific settings take precedence over corresponding global settings. Global settings
apply when their language-specific counterparts are omitted, unless stated otherwise.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GraphqlConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const graphqlConfiguration: javascript.biome_config.GraphqlConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GraphqlConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.GraphqlAssistConfiguration</code> | GraphQL assist options. |
| <code><a href="#projen.javascript.biome_config.GraphqlConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.GraphqlFormatterConfiguration</code> | GraphQL formatter options. |
| <code><a href="#projen.javascript.biome_config.GraphqlConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.GraphqlLinterConfiguration</code> | GraphQL linter options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.GraphqlConfiguration.property.assist"></a>

```typescript
public readonly assist: GraphqlAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlAssistConfiguration

GraphQL assist options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.GraphqlConfiguration.property.formatter"></a>

```typescript
public readonly formatter: GraphqlFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlFormatterConfiguration

GraphQL formatter options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.GraphqlConfiguration.property.linter"></a>

```typescript
public readonly linter: GraphqlLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlLinterConfiguration

GraphQL linter options.

---

### GraphqlFormatterConfiguration <a name="GraphqlFormatterConfiguration" id="projen.javascript.biome_config.GraphqlFormatterConfiguration"></a>

Options that change how the GraphQL formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const graphqlFormatterConfiguration: javascript.biome_config.GraphqlFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Controls spaces inside the braces of single-line GraphQL object values. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter for GraphQL. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The indentation width applied to GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The line ending applied to GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | The preferred maximum line width for GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.quoteStyle">quoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | Reserved for future formatter support. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Controls spaces inside the braces of single-line GraphQL object values.

Biome formats
`{name: "Biome"}` when disabled and `{ name: "Biome" }` when enabled. If unset, inherits the
global bracket spacing setting.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the formatter for GraphQL.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to GraphQL files.

If unset, inherits the global indentation style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The indentation width applied to GraphQL files.

If unset, inherits the global indentation
width.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The line ending applied to GraphQL files.

If unset, inherits the global line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

The preferred maximum line width for GraphQL files.

If unset, inherits the global line
width.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle

Reserved for future formatter support.

The current formatter preserves standard
double-quoted GraphQL strings and does not use this setting.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean

Whether to add a trailing newline at the end of the file.

If unset, inherits the global
trailing newline setting.

---

### GraphqlLinterConfiguration <a name="GraphqlLinterConfiguration" id="projen.javascript.biome_config.GraphqlLinterConfiguration"></a>

Options that change how the GraphQL linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GraphqlLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const graphqlLinterConfiguration: javascript.biome_config.GraphqlLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GraphqlLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter for GraphQL. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GraphqlLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the linter for GraphQL.

---

### GritAssistConfiguration <a name="GritAssistConfiguration" id="projen.javascript.biome_config.GritAssistConfiguration"></a>

Options that change how GritQL assist behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritAssistConfiguration: javascript.biome_config.GritAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables assist actions for GritQL. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GritAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables assist actions for GritQL.

---

### GritConfiguration <a name="GritConfiguration" id="projen.javascript.biome_config.GritConfiguration"></a>

Options applied to GritQL files.

Language-specific settings take precedence over corresponding global settings. Global settings
apply when their language-specific counterparts are omitted, unless stated otherwise.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritConfiguration: javascript.biome_config.GritConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.GritAssistConfiguration</code> | GritQL assist options. |
| <code><a href="#projen.javascript.biome_config.GritConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.GritFormatterConfiguration</code> | GritQL formatter options. |
| <code><a href="#projen.javascript.biome_config.GritConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.GritLinterConfiguration</code> | GritQL linter options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.GritConfiguration.property.assist"></a>

```typescript
public readonly assist: GritAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.GritAssistConfiguration

GritQL assist options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.GritConfiguration.property.formatter"></a>

```typescript
public readonly formatter: GritFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.GritFormatterConfiguration

GritQL formatter options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.GritConfiguration.property.linter"></a>

```typescript
public readonly linter: GritLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.GritLinterConfiguration

GritQL linter options.

---

### GritFormatterConfiguration <a name="GritFormatterConfiguration" id="projen.javascript.biome_config.GritFormatterConfiguration"></a>

Options that change how the GritQL formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritFormatterConfiguration: javascript.biome_config.GritFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter for GritQL. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to GritQL files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The indentation width applied to GritQL files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The line ending applied to GritQL files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | The preferred maximum line width for GritQL files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GritFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the formatter for GritQL.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.GritFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to GritQL files.

If unset, inherits the global indentation style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.GritFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The indentation width applied to GritQL files.

If unset, inherits the global indentation
width.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.GritFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The line ending applied to GritQL files.

If unset, inherits the global line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.GritFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

The preferred maximum line width for GritQL files.

If unset, inherits the global line width.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.GritFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean

Whether to add a trailing newline at the end of the file.

If unset, inherits the global
trailing newline setting.

---

### GritLinterConfiguration <a name="GritLinterConfiguration" id="projen.javascript.biome_config.GritLinterConfiguration"></a>

Options that change how the GritQL linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritLinterConfiguration: javascript.biome_config.GritLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter for GritQL. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GritLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the linter for GritQL.

---

### HtmlAssistConfiguration <a name="HtmlAssistConfiguration" id="projen.javascript.biome_config.HtmlAssistConfiguration"></a>

Options that change how HTML assist behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlAssistConfiguration: javascript.biome_config.HtmlAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables assist actions for HTML and languages that extend it. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.HtmlAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables assist actions for HTML and languages that extend it.

---

### HtmlConfiguration <a name="HtmlConfiguration" id="projen.javascript.biome_config.HtmlConfiguration"></a>

Options applied to HTML and languages that extend it.

Full HTML support and the HTML formatter are experimental. Biome aims to minimize breaking
changes, but bug fixes and new features may change formatting output or diagnostics.

Language-specific settings take precedence over corresponding global settings. Global settings
apply when their language-specific counterparts are omitted, unless stated otherwise.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlConfiguration: javascript.biome_config.HtmlConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.HtmlAssistConfiguration</code> | HTML assist options. |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.experimentalFullSupportEnabled">experimentalFullSupportEnabled</a></code> | <code>boolean</code> | Enables Biome's experimental full support for `.html`, `.vue`, `.svelte`, and `.astro` files. In this mode, Biome parses the complete document and can analyze or format its markup and supported embedded languages. |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.HtmlFormatterConfiguration</code> | HTML formatter options. |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.HtmlLinterConfiguration</code> | HTML linter options. |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome_config.HtmlParserConfiguration</code> | HTML parsing options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.HtmlConfiguration.property.assist"></a>

```typescript
public readonly assist: HtmlAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlAssistConfiguration

HTML assist options.

---

##### `experimentalFullSupportEnabled`<sup>Optional</sup> <a name="experimentalFullSupportEnabled" id="projen.javascript.biome_config.HtmlConfiguration.property.experimentalFullSupportEnabled"></a>

```typescript
public readonly experimentalFullSupportEnabled: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables Biome's experimental full support for `.html`, `.vue`, `.svelte`, and `.astro` files. In this mode, Biome parses the complete document and can analyze or format its markup and supported embedded languages.

When disabled, `.vue`, `.svelte`, and `.astro` files use legacy handling, which extracts their
JavaScript or TypeScript portions and leaves the rest unchanged. This option selects how
these files are processed. It does not enable the HTML formatter. Set
`html.formatter.enabled` to `true` to format complete HTML, Vue, Svelte, and Astro files.
Defaults to `false`.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.HtmlConfiguration.property.formatter"></a>

```typescript
public readonly formatter: HtmlFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlFormatterConfiguration

HTML formatter options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.HtmlConfiguration.property.linter"></a>

```typescript
public readonly linter: HtmlLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlLinterConfiguration

HTML linter options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome_config.HtmlConfiguration.property.parser"></a>

```typescript
public readonly parser: HtmlParserConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlParserConfiguration

HTML parsing options.

---

### HtmlFormatterConfiguration <a name="HtmlFormatterConfiguration" id="projen.javascript.biome_config.HtmlFormatterConfiguration"></a>

Options that change how the HTML formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlFormatterConfiguration: javascript.biome_config.HtmlFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style in HTML elements. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Controls the placement of the closing bracket for multiline HTML opening tags. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter for HTML and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentScriptAndStyle">indentScriptAndStyle</a></code> | <code>boolean</code> | Controls whether the content of `<script>` and `<style>` tags is indented by one level in HTML, Vue, Svelte, and Astro files. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to HTML and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The indentation width applied to HTML and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The line ending applied to HTML and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | The preferred maximum line width for HTML and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.selfCloseVoidElements">selfCloseVoidElements</a></code> | <code>projen.javascript.biome_config.SelfCloseVoidElements</code> | Controls whether void elements are self-closed. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.whitespaceSensitivity">whitespaceSensitivity</a></code> | <code>projen.javascript.biome_config.WhitespaceSensitivity</code> | Controls how the formatter treats whitespace around text and child elements in HTML, Vue, Svelte, and Astro markup. |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition

The attribute position style in HTML elements.

If unset, inherits the global attribute
position setting.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean

Controls the placement of the closing bracket for multiline HTML opening tags.

Biome places
the bracket at the end of the last attribute line when enabled and on its own line after the
last attribute when disabled. This option also affects self-closing HTML elements. If unset,
inherits the global `bracketSameLine` setting.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the formatter for HTML and languages that extend it.

The formatter is
experimental and disabled by default. Formatting complete HTML, Vue, Svelte, and Astro files
requires `html.experimentalFullSupportEnabled` to be `true`.

---

##### `indentScriptAndStyle`<sup>Optional</sup> <a name="indentScriptAndStyle" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentScriptAndStyle"></a>

```typescript
public readonly indentScriptAndStyle: boolean;
```

- *Type:* boolean
- *Default:* false`.

Controls whether the content of `<script>` and `<style>` tags is indented by one level in HTML, Vue, Svelte, and Astro files.

Defaults to `false`.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to HTML and languages that extend it.

If unset, inherits the global
indentation style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The indentation width applied to HTML and languages that extend it.

If unset, inherits the
global indentation width.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The line ending applied to HTML and languages that extend it.

If unset, inherits the global
line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

The preferred maximum line width for HTML and languages that extend it.

If unset, inherits
the global line width.

---

##### `selfCloseVoidElements`<sup>Optional</sup> <a name="selfCloseVoidElements" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.selfCloseVoidElements"></a>

```typescript
public readonly selfCloseVoidElements: SelfCloseVoidElements;
```

- *Type:* projen.javascript.biome_config.SelfCloseVoidElements
- *Default:* never`.

Controls whether void elements are self-closed.

Defaults to `never`.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean

Whether to add a trailing newline at the end of the file.

Unlike other language-specific
trailing newline settings, this option defaults to `true` instead of inheriting the global
setting.

---

##### `whitespaceSensitivity`<sup>Optional</sup> <a name="whitespaceSensitivity" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.whitespaceSensitivity"></a>

```typescript
public readonly whitespaceSensitivity: WhitespaceSensitivity;
```

- *Type:* projen.javascript.biome_config.WhitespaceSensitivity
- *Default:* css`.

Controls how the formatter treats whitespace around text and child elements in HTML, Vue, Svelte, and Astro markup.

The `ignore` setting should be used only when whitespace cannot
affect rendered output. Defaults to `css`.

---

### HtmlLinterConfiguration <a name="HtmlLinterConfiguration" id="projen.javascript.biome_config.HtmlLinterConfiguration"></a>

Options that change how the HTML linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlLinterConfiguration: javascript.biome_config.HtmlLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter for HTML and languages that extend it. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.HtmlLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the linter for HTML and languages that extend it.

---

### HtmlParserConfiguration <a name="HtmlParserConfiguration" id="projen.javascript.biome_config.HtmlParserConfiguration"></a>

Options that change how the HTML parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlParserConfiguration: javascript.biome_config.HtmlParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlParserConfiguration.property.interpolation">interpolation</a></code> | <code>boolean</code> | Enables double-curly interpolation expressions such as `{{ expression }}` in `.html` files. Defaults to `false`. |
| <code><a href="#projen.javascript.biome_config.HtmlParserConfiguration.property.vue">vue</a></code> | <code>boolean</code> | Enables parsing Vue syntax (`v-if`, `v-bind`, etc.) in `.html` files. Enabling this option also enables `interpolation` implicitly. |

---

##### `interpolation`<sup>Optional</sup> <a name="interpolation" id="projen.javascript.biome_config.HtmlParserConfiguration.property.interpolation"></a>

```typescript
public readonly interpolation: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables double-curly interpolation expressions such as `{{ expression }}` in `.html` files. Defaults to `false`.

---

##### `vue`<sup>Optional</sup> <a name="vue" id="projen.javascript.biome_config.HtmlParserConfiguration.property.vue"></a>

```typescript
public readonly vue: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables parsing Vue syntax (`v-if`, `v-bind`, etc.) in `.html` files. Enabling this option also enables `interpolation` implicitly.

Biome will already automatically enable Vue parsing in `.vue` files, so you probably don't need
to enable this option. This only affects `.html` files, and does not change how `.vue`, `.svelte`,
or `.astro` files are parsed. Defaults to `false`.

---

### JsAssistConfiguration <a name="JsAssistConfiguration" id="projen.javascript.biome_config.JsAssistConfiguration"></a>

Assist options specific to the JavaScript assist.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsAssistConfiguration: javascript.biome_config.JsAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables assist actions for JavaScript and languages that extend it. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables assist actions for JavaScript and languages that extend it.

---

### JsConfiguration <a name="JsConfiguration" id="projen.javascript.biome_config.JsConfiguration"></a>

Options applied to JavaScript, TypeScript, JSX, TSX, and supported languages that embed JavaScript.

Language-specific settings take precedence over corresponding global settings. Global settings
apply when their language-specific counterparts are omitted, unless stated otherwise.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsConfiguration: javascript.biome_config.JsConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.JsAssistConfiguration</code> | JavaScript assist options. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.experimentalEmbeddedSnippetsEnabled">experimentalEmbeddedSnippetsEnabled</a></code> | <code>boolean</code> | Enables experimental parsing, formatting, linting, diagnostics, and fixes for CSS and GraphQL snippets embedded in JavaScript and TypeScript template literals. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.JsFormatterConfiguration</code> | JavaScript formatter options. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.globals">globals</a></code> | <code>string[]</code> | A list of additional names that Biome's JavaScript linter treats as predefined global bindings. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.jsxRuntime">jsxRuntime</a></code> | <code>projen.javascript.biome_config.JsxRuntime</code> | Configures how the analyzer accounts for imports used by JSX. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.JsLinterConfiguration</code> | JavaScript linter options. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome_config.JsParserConfiguration</code> | JavaScript parser options. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.resolver">resolver</a></code> | <code>projen.javascript.biome_config.JsResolverConfiguration</code> | JavaScript module and dependency resolver options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.JsConfiguration.property.assist"></a>

```typescript
public readonly assist: JsAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.JsAssistConfiguration

JavaScript assist options.

---

##### `experimentalEmbeddedSnippetsEnabled`<sup>Optional</sup> <a name="experimentalEmbeddedSnippetsEnabled" id="projen.javascript.biome_config.JsConfiguration.property.experimentalEmbeddedSnippetsEnabled"></a>

```typescript
public readonly experimentalEmbeddedSnippetsEnabled: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables experimental parsing, formatting, linting, diagnostics, and fixes for CSS and GraphQL snippets embedded in JavaScript and TypeScript template literals.

Biome recognizes CSS in `css` and `styled` templates and GraphQL in `gql` and `graphql`
templates or calls. Templates containing interpolations are not currently supported.
Defaults to `false`.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.JsConfiguration.property.formatter"></a>

```typescript
public readonly formatter: JsFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.JsFormatterConfiguration

JavaScript formatter options.

---

##### `globals`<sup>Optional</sup> <a name="globals" id="projen.javascript.biome_config.JsConfiguration.property.globals"></a>

```typescript
public readonly globals: string[];
```

- *Type:* string[]

A list of additional names that Biome's JavaScript linter treats as predefined global bindings.

Use this for globals supplied by a runtime, framework, or external script that are not
declared in the source file.

---

##### `jsxRuntime`<sup>Optional</sup> <a name="jsxRuntime" id="projen.javascript.biome_config.JsConfiguration.property.jsxRuntime"></a>

```typescript
public readonly jsxRuntime: JsxRuntime;
```

- *Type:* projen.javascript.biome_config.JsxRuntime
- *Default:* transparent`.

Configures how the analyzer accounts for imports used by JSX.

This option does not transform
JSX or select a runtime for a build tool. Defaults to `transparent`.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.JsConfiguration.property.linter"></a>

```typescript
public readonly linter: JsLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.JsLinterConfiguration

JavaScript linter options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome_config.JsConfiguration.property.parser"></a>

```typescript
public readonly parser: JsParserConfiguration;
```

- *Type:* projen.javascript.biome_config.JsParserConfiguration

JavaScript parser options.

---

##### `resolver`<sup>Optional</sup> <a name="resolver" id="projen.javascript.biome_config.JsConfiguration.property.resolver"></a>

```typescript
public readonly resolver: JsResolverConfiguration;
```

- *Type:* projen.javascript.biome_config.JsResolverConfiguration

JavaScript module and dependency resolver options.

---

### JsFormatterConfiguration <a name="JsFormatterConfiguration" id="projen.javascript.biome_config.JsFormatterConfiguration"></a>

Formatting options specific to JavaScript and languages that extend it.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsFormatterConfiguration: javascript.biome_config.JsFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.arrowParentheses">arrowParentheses</a></code> | <code>projen.javascript.biome_config.ArrowParentheses</code> | Controls parentheses around arrow-function parameters. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style in JSX elements. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Controls the placement of the closing bracket for multiline JSX opening tags. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Controls spaces inside the braces of single-line object literals. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.delimiterSpacing">delimiterSpacing</a></code> | <code>boolean</code> | Controls spaces immediately inside supported JavaScript and TypeScript delimiters when their content fits on one line. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter for JavaScript and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Uses the same `auto`, `always`, and `never` behavior as the global expansion setting. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to JavaScript and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The indentation width applied to JavaScript and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.jsxQuoteStyle">jsxQuoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | Selects the preferred quote style for JSX attribute values. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The line ending applied to JavaScript and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | The preferred maximum line width applied to JavaScript and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.operatorLinebreak">operatorLinebreak</a></code> | <code>projen.javascript.biome_config.OperatorLinebreak</code> | When breaking binary expressions into multiple lines, whether to break them before or after the binary operator. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.quoteProperties">quoteProperties</a></code> | <code>projen.javascript.biome_config.QuoteProperties</code> | Controls whether quotes around object property names are preserved. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.quoteStyle">quoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | Selects the preferred quote style for JavaScript and TypeScript string literals. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.semicolons">semicolons</a></code> | <code>projen.javascript.biome_config.Semicolons</code> | Prints semicolons after every statement or only where needed to avoid automatic semicolon insertion hazards. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.trailingCommas">trailingCommas</a></code> | <code>projen.javascript.biome_config.JsTrailingCommas</code> | Controls trailing commas in multiline comma-separated structures. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |

---

##### `arrowParentheses`<sup>Optional</sup> <a name="arrowParentheses" id="projen.javascript.biome_config.JsFormatterConfiguration.property.arrowParentheses"></a>

```typescript
public readonly arrowParentheses: ArrowParentheses;
```

- *Type:* projen.javascript.biome_config.ArrowParentheses
- *Default:* always`.

Controls parentheses around arrow-function parameters.

`always` always prints parentheses,
while `asNeeded` omits them when an arrow function has one parameter and the syntax permits
it. Defaults to `always`.

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.JsFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition

The attribute position style in JSX elements.

If unset, inherits the global attribute
position setting.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean

Controls the placement of the closing bracket for multiline JSX opening tags.

Biome places
the bracket at the end of the last attribute line when enabled and on its own line after the
last attribute when disabled. Self-closing JSX elements are unaffected. If unset, inherits
the global bracket placement setting.

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Controls spaces inside the braces of single-line object literals.

Biome formats `{value: 1}`
when disabled and `{ value: 1 }` when enabled. If unset, inherits the global bracket spacing
setting.

---

##### `delimiterSpacing`<sup>Optional</sup> <a name="delimiterSpacing" id="projen.javascript.biome_config.JsFormatterConfiguration.property.delimiterSpacing"></a>

```typescript
public readonly delimiterSpacing: boolean;
```

- *Type:* boolean

Controls spaces immediately inside supported JavaScript and TypeScript delimiters when their content fits on one line.

This affects parentheses, square brackets, template
interpolations, TypeScript angle brackets, and JSX expression braces. Empty delimiters are
unchanged.

It also controls spacing after logical NOT operators. In a chain of logical NOT operators,
only the final operator receives a following space. Biome doesn't add spaces before opening
delimiters.

If unset, inherits the global delimiter spacing setting.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the formatter for JavaScript and languages that extend it.

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.JsFormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand

Uses the same `auto`, `always`, and `never` behavior as the global expansion setting.

If unset, inherits the global expansion setting.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.JsFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to JavaScript and languages that extend it.

If unset, inherits the
global indentation style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.JsFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The indentation width applied to JavaScript and languages that extend it.

If unset,
inherits the global indentation width.

---

##### `jsxQuoteStyle`<sup>Optional</sup> <a name="jsxQuoteStyle" id="projen.javascript.biome_config.JsFormatterConfiguration.property.jsxQuoteStyle"></a>

```typescript
public readonly jsxQuoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double`.

Selects the preferred quote style for JSX attribute values.

Defaults to `double`.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.JsFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The line ending applied to JavaScript and languages that extend it.

If unset, inherits the
global line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.JsFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

The preferred maximum line width applied to JavaScript and languages that extend it.

If
unset, inherits the global line width.

---

##### `operatorLinebreak`<sup>Optional</sup> <a name="operatorLinebreak" id="projen.javascript.biome_config.JsFormatterConfiguration.property.operatorLinebreak"></a>

```typescript
public readonly operatorLinebreak: OperatorLinebreak;
```

- *Type:* projen.javascript.biome_config.OperatorLinebreak
- *Default:* after`.

When breaking binary expressions into multiple lines, whether to break them before or after the binary operator.

Defaults to `after`.

---

##### `quoteProperties`<sup>Optional</sup> <a name="quoteProperties" id="projen.javascript.biome_config.JsFormatterConfiguration.property.quoteProperties"></a>

```typescript
public readonly quoteProperties: QuoteProperties;
```

- *Type:* projen.javascript.biome_config.QuoteProperties
- *Default:* asNeeded` in configuration

Controls whether quotes around object property names are preserved.

`asNeeded` removes
quotes when the property name is valid without them, while `preserve` keeps quotes around
property names that were quoted in the input. Defaults to `asNeeded` in configuration
(`as-needed` on the CLI).

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome_config.JsFormatterConfiguration.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double`.

Selects the preferred quote style for JavaScript and TypeScript string literals.

Biome may
use the alternate quote when that avoids additional escaping. Defaults to `double`.

---

##### `semicolons`<sup>Optional</sup> <a name="semicolons" id="projen.javascript.biome_config.JsFormatterConfiguration.property.semicolons"></a>

```typescript
public readonly semicolons: Semicolons;
```

- *Type:* projen.javascript.biome_config.Semicolons
- *Default:* always`.

Prints semicolons after every statement or only where needed to avoid automatic semicolon insertion hazards.

Defaults to `always`.

---

##### `trailingCommas`<sup>Optional</sup> <a name="trailingCommas" id="projen.javascript.biome_config.JsFormatterConfiguration.property.trailingCommas"></a>

```typescript
public readonly trailingCommas: JsTrailingCommas;
```

- *Type:* projen.javascript.biome_config.JsTrailingCommas
- *Default:* all`.

Controls trailing commas in multiline comma-separated structures.

`all` adds trailing commas
wherever syntax permits, including function parameters and calls. `es5` adds them only in
constructs supported by ES5, such as array and object literals, and excludes function
parameters, function calls, and TypeScript type parameters. `none` removes trailing commas.
Defaults to `all`.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.JsFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean

Whether to add a trailing newline at the end of the file.

If unset, inherits the global
trailing newline setting.

---

### JsLinterConfiguration <a name="JsLinterConfiguration" id="projen.javascript.biome_config.JsLinterConfiguration"></a>

Linter options specific to the JavaScript linter.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsLinterConfiguration: javascript.biome_config.JsLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter for JavaScript and languages that extend it. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the linter for JavaScript and languages that extend it.

---

### JsonAssistConfiguration <a name="JsonAssistConfiguration" id="projen.javascript.biome_config.JsonAssistConfiguration"></a>

Assist options specific to the JSON linter.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsonAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsonAssistConfiguration: javascript.biome_config.JsonAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsonAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables assist actions for JSON and languages that extend it. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsonAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables assist actions for JSON and languages that extend it.

---

### JsonConfiguration <a name="JsonConfiguration" id="projen.javascript.biome_config.JsonConfiguration"></a>

Options applied to JSON, JSONC, and recognized JSON-based configuration files.

Language-specific settings take precedence over corresponding global settings. Global settings
apply when their language-specific counterparts are omitted, unless stated otherwise.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsonConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsonConfiguration: javascript.biome_config.JsonConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsonConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.JsonAssistConfiguration</code> | Assist options. |
| <code><a href="#projen.javascript.biome_config.JsonConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.JsonFormatterConfiguration</code> | Formatting options. |
| <code><a href="#projen.javascript.biome_config.JsonConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.JsonLinterConfiguration</code> | Linting options. |
| <code><a href="#projen.javascript.biome_config.JsonConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome_config.JsonParserConfiguration</code> | Parsing options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.JsonConfiguration.property.assist"></a>

```typescript
public readonly assist: JsonAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonAssistConfiguration

Assist options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.JsonConfiguration.property.formatter"></a>

```typescript
public readonly formatter: JsonFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonFormatterConfiguration

Formatting options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.JsonConfiguration.property.linter"></a>

```typescript
public readonly linter: JsonLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonLinterConfiguration

Linting options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome_config.JsonConfiguration.property.parser"></a>

```typescript
public readonly parser: JsonParserConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonParserConfiguration

Parsing options.

---

### JsonFormatterConfiguration <a name="JsonFormatterConfiguration" id="projen.javascript.biome_config.JsonFormatterConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsonFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsonFormatterConfiguration: javascript.biome_config.JsonFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces inside braces in object literals. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.delimiterSpacing">delimiterSpacing</a></code> | <code>boolean</code> | Controls spaces inside JSON square brackets when their content fits on one line. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter for JSON and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Uses the same `auto`, `always`, and `never` behavior as the global expansion setting. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to JSON and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The indentation width applied to JSON and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The line ending applied to JSON and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | The preferred maximum line width applied to JSON and languages that extend it. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.trailingCommas">trailingCommas</a></code> | <code>projen.javascript.biome_config.JsonTrailingCommas</code> | Controls trailing commas in multiline JSON arrays and objects. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Whether to insert spaces inside braces in object literals.

If unset, inherits the global
bracket spacing setting.

---

##### `delimiterSpacing`<sup>Optional</sup> <a name="delimiterSpacing" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.delimiterSpacing"></a>

```typescript
public readonly delimiterSpacing: boolean;
```

- *Type:* boolean

Controls spaces inside JSON square brackets when their content fits on one line.

When
enabled, `[1, 2, 3]` becomes `[ 1, 2, 3 ]`. Empty brackets are unchanged.

If unset, inherits the global delimiter spacing setting.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the formatter for JSON and languages that extend it.

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand

Uses the same `auto`, `always`, and `never` behavior as the global expansion setting.

If unset, inherits the global expansion setting.

When formatting `package.json`, Biome uses `always` unless configured otherwise.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to JSON and languages that extend it.

If unset, inherits the global
indentation style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The indentation width applied to JSON and languages that extend it.

If unset, inherits the
global indentation width.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The line ending applied to JSON and languages that extend it.

If unset, inherits the global
line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

The preferred maximum line width applied to JSON and languages that extend it.

If unset,
inherits the global line width.

---

##### `trailingCommas`<sup>Optional</sup> <a name="trailingCommas" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.trailingCommas"></a>

```typescript
public readonly trailingCommas: JsonTrailingCommas;
```

- *Type:* projen.javascript.biome_config.JsonTrailingCommas
- *Default:* none`.

Controls trailing commas in multiline JSON arrays and objects.

`none` removes trailing
commas, while `all` adds them wherever the JSON formatter supports them. Use `all` only for
JSON variants that allow trailing commas, and ensure `json.parser.allowTrailingCommas` is
enabled or automatically detected for those files. Defaults to `none`.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean

Whether to add a trailing newline at the end of the file.

If unset, inherits the global
trailing newline setting.

---

### JsonLinterConfiguration <a name="JsonLinterConfiguration" id="projen.javascript.biome_config.JsonLinterConfiguration"></a>

Linter options specific to the JSON linter.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsonLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsonLinterConfiguration: javascript.biome_config.JsonLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsonLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter for JSON and languages that extend it. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsonLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the linter for JSON and languages that extend it.

---

### JsonParserConfiguration <a name="JsonParserConfiguration" id="projen.javascript.biome_config.JsonParserConfiguration"></a>

Options that change how the JSON parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsonParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsonParserConfiguration: javascript.biome_config.JsonParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsonParserConfiguration.property.allowComments">allowComments</a></code> | <code>boolean</code> | Controls whether comments are allowed in files parsed as JSON. |
| <code><a href="#projen.javascript.biome_config.JsonParserConfiguration.property.allowTrailingCommas">allowTrailingCommas</a></code> | <code>boolean</code> | Controls whether trailing commas are allowed in files parsed as JSON. |

---

##### `allowComments`<sup>Optional</sup> <a name="allowComments" id="projen.javascript.biome_config.JsonParserConfiguration.property.allowComments"></a>

```typescript
public readonly allowComments: boolean;
```

- *Type:* boolean

Controls whether comments are allowed in files parsed as JSON.

When unset, Biome follows the
file type's default behavior. An explicit value overrides that behavior, except that
`biome.jsonc` always allows comments.

---

##### `allowTrailingCommas`<sup>Optional</sup> <a name="allowTrailingCommas" id="projen.javascript.biome_config.JsonParserConfiguration.property.allowTrailingCommas"></a>

```typescript
public readonly allowTrailingCommas: boolean;
```

- *Type:* boolean

Controls whether trailing commas are allowed in files parsed as JSON.

When unset, Biome
follows the file type's default behavior. An explicit value overrides that behavior, except
that `biome.jsonc` always allows trailing commas.

---

### JsParserConfiguration <a name="JsParserConfiguration" id="projen.javascript.biome_config.JsParserConfiguration"></a>

Options that change how the JavaScript parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsParserConfiguration: javascript.biome_config.JsParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsParserConfiguration.property.jsxEverywhere">jsxEverywhere</a></code> | <code>boolean</code> | Controls whether `.js`, `.mjs`, and `.cjs` files may contain JSX syntax. Disabling this option causes JSX in those files to raise a diagnostic. Defaults to `true`. |
| <code><a href="#projen.javascript.biome_config.JsParserConfiguration.property.unsafeParameterDecoratorsEnabled">unsafeParameterDecoratorsEnabled</a></code> | <code>boolean</code> | Enables parsing decorators on class parameters. |

---

##### `jsxEverywhere`<sup>Optional</sup> <a name="jsxEverywhere" id="projen.javascript.biome_config.JsParserConfiguration.property.jsxEverywhere"></a>

```typescript
public readonly jsxEverywhere: boolean;
```

- *Type:* boolean
- *Default:* true`.

Controls whether `.js`, `.mjs`, and `.cjs` files may contain JSX syntax. Disabling this option causes JSX in those files to raise a diagnostic. Defaults to `true`.

---

##### `unsafeParameterDecoratorsEnabled`<sup>Optional</sup> <a name="unsafeParameterDecoratorsEnabled" id="projen.javascript.biome_config.JsParserConfiguration.property.unsafeParameterDecoratorsEnabled"></a>

```typescript
public readonly unsafeParameterDecoratorsEnabled: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables parsing decorators on class parameters.

This syntax belongs to an old experimental
proposal and may change. Defaults to `false`.

---

### JsResolverConfiguration <a name="JsResolverConfiguration" id="projen.javascript.biome_config.JsResolverConfiguration"></a>

Resolver options specific to JavaScript files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsResolverConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsResolverConfiguration: javascript.biome_config.JsResolverConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsResolverConfiguration.property.experimentalPnpmCatalogs">experimentalPnpmCatalogs</a></code> | <code>boolean</code> | Enables pnpm workspace catalog resolution for JavaScript package manifests. |

---

##### `experimentalPnpmCatalogs`<sup>Optional</sup> <a name="experimentalPnpmCatalogs" id="projen.javascript.biome_config.JsResolverConfiguration.property.experimentalPnpmCatalogs"></a>

```typescript
public readonly experimentalPnpmCatalogs: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables pnpm workspace catalog resolution for JavaScript package manifests.

Opt-in:
- Set `javascript.resolver.experimentalPnpmCatalogs` to `true`.

Scope:
- Resolves `catalog:` and `catalog:<name>` dependency versions from
`package.json`.
- Applies to `dependencies`, `devDependencies`, and `peerDependencies`.

Fail-safe behavior:
- If `pnpm-workspace.yaml` is missing, unreadable, or cannot be parsed,
Biome silently falls back to the default behavior (as if this option
were disabled).
- Unknown keys and unsupported value shapes in `pnpm-workspace.yaml` are
ignored.

Limitations:
- Only `pnpm-workspace.yaml` is read.
- Biome only reads top-level `catalog` / `catalogs` mappings and scalar
string entries.

Defaults to `false`.

---

### LinterConfiguration <a name="LinterConfiguration" id="projen.javascript.biome_config.LinterConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.LinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const linterConfiguration: javascript.biome_config.LinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.domains">domains</a></code> | <code>projen.javascript.biome_config.RuleDomains</code> | Configures rules associated with a framework, library, project-wide analysis, or type analysis. |
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter. |
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns selecting files to lint. |
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.rules">rules</a></code> | <code>projen.javascript.biome_config.Rules</code> | The lint-rule configuration. |

---

##### `domains`<sup>Optional</sup> <a name="domains" id="projen.javascript.biome_config.LinterConfiguration.property.domains"></a>

```typescript
public readonly domains: RuleDomains;
```

- *Type:* projen.javascript.biome_config.RuleDomains

Configures rules associated with a framework, library, project-wide analysis, or type analysis.

Keys are domain names and values are `all`, `recommended`, or `none`.
Enabling rules from the `project` or `types` domains activates project and dependency
scanning. The `types` domain also enables type-aware resolution.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.LinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* true`.

Enables or disables the linter.

Defaults to `true`.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.LinterConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns selecting files to lint.

If omitted, all files selected by
`files.includes` remain eligible for linting. An empty list selects no files. This option can
only narrow the files selected by `files.includes`.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.biome_config.LinterConfiguration.property.rules"></a>

```typescript
public readonly rules: Rules;
```

- *Type:* projen.javascript.biome_config.Rules

The lint-rule configuration.

---

### MarkdownConfiguration <a name="MarkdownConfiguration" id="projen.javascript.biome_config.MarkdownConfiguration"></a>

Options applied to Markdown files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.MarkdownConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const markdownConfiguration: javascript.biome_config.MarkdownConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.MarkdownConfiguration.property.analyzeEmbeds">analyzeEmbeds</a></code> | <code>boolean</code> | Runs the linter and assist actions on the code inside fenced code blocks, frontmatter, and HTML blocks, with the rules and actions of the code's language. |
| <code><a href="#projen.javascript.biome_config.MarkdownConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.MarkdownFormatterConfiguration</code> | Formatter options. |
| <code><a href="#projen.javascript.biome_config.MarkdownConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.MarkdownLinterConfiguration</code> | Linter options. |
| <code><a href="#projen.javascript.biome_config.MarkdownConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome_config.MarkdownParserConfiguration</code> | Parsing options. |

---

##### `analyzeEmbeds`<sup>Optional</sup> <a name="analyzeEmbeds" id="projen.javascript.biome_config.MarkdownConfiguration.property.analyzeEmbeds"></a>

```typescript
public readonly analyzeEmbeds: boolean;
```

- *Type:* boolean
- *Default:* false`.

Runs the linter and assist actions on the code inside fenced code blocks, frontmatter, and HTML blocks, with the rules and actions of the code's language.

Defaults to `false`.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.MarkdownConfiguration.property.formatter"></a>

```typescript
public readonly formatter: MarkdownFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.MarkdownFormatterConfiguration

Formatter options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.MarkdownConfiguration.property.linter"></a>

```typescript
public readonly linter: MarkdownLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.MarkdownLinterConfiguration

Linter options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome_config.MarkdownConfiguration.property.parser"></a>

```typescript
public readonly parser: MarkdownParserConfiguration;
```

- *Type:* projen.javascript.biome_config.MarkdownParserConfiguration

Parsing options.

---

### MarkdownFormatterConfiguration <a name="MarkdownFormatterConfiguration" id="projen.javascript.biome_config.MarkdownFormatterConfiguration"></a>

Options that change how the Markdown formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const markdownFormatterConfiguration: javascript.biome_config.MarkdownFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for Markdown (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.formatEmbeds">formatEmbeds</a></code> | <code>boolean</code> | Formats the code inside fenced code blocks, frontmatter, and HTML blocks with the formatter of the code's language. |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to Markdown files. |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to Markdown files. |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to Markdown (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to Markdown files. |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.proseWrap">proseWrap</a></code> | <code>projen.javascript.biome_config.ProseWrap</code> | Controls whether Biome keeps, adds, or removes line breaks in Markdown paragraphs. |
| <code><a href="#projen.javascript.biome_config.MarkdownFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for Markdown (and its super languages) files.

---

##### `formatEmbeds`<sup>Optional</sup> <a name="formatEmbeds" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.formatEmbeds"></a>

```typescript
public readonly formatEmbeds: boolean;
```

- *Type:* boolean
- *Default:* true`.

Formats the code inside fenced code blocks, frontmatter, and HTML blocks with the formatter of the code's language.

Defaults to `true`.

A block with a syntax error stays as written, and Biome still formats the rest of the file.

When this option is `false`, Biome keeps every block as written.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to Markdown files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to Markdown files.

Defaults to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to Markdown (and its super languages) files.

`auto` uses CRLF on Windows and LF on other platforms.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to Markdown files.

Defaults to 80.

---

##### `proseWrap`<sup>Optional</sup> <a name="proseWrap" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.proseWrap"></a>

```typescript
public readonly proseWrap: ProseWrap;
```

- *Type:* projen.javascript.biome_config.ProseWrap

Controls whether Biome keeps, adds, or removes line breaks in Markdown paragraphs.

Manual line breaks are always kept. In Markdown, a manual line break is created by ending a
line with two spaces or a backslash.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.MarkdownFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean
- *Default:* true.

Whether to add a trailing newline at the end of the file.

Setting this option to `false` is **highly discouraged** because it could cause many problems with other tools:
- https://thoughtbot.com/blog/no-newline-at-end-of-file
- https://callmeryan.medium.com/no-newline-at-end-of-file-navigating-gits-warning-for-android-developers-af14e73dd804
- https://unix.stackexchange.com/questions/345548/how-to-cat-files-together-adding-missing-newlines-at-end-of-some-files

Disable the option at your own risk.

Defaults to true.

---

### MarkdownLinterConfiguration <a name="MarkdownLinterConfiguration" id="projen.javascript.biome_config.MarkdownLinterConfiguration"></a>

Options that change how the Markdown linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.MarkdownLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const markdownLinterConfiguration: javascript.biome_config.MarkdownLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.MarkdownLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for Markdown files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.MarkdownLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for Markdown files.

---

### MarkdownParserConfiguration <a name="MarkdownParserConfiguration" id="projen.javascript.biome_config.MarkdownParserConfiguration"></a>

Options that change how the Markdown parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.MarkdownParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const markdownParserConfiguration: javascript.biome_config.MarkdownParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.MarkdownParserConfiguration.property.cjkFriendlyEmphasis">cjkFriendlyEmphasis</a></code> | <code>boolean</code> | Recognizes bold, italic, and strikethrough markers placed directly next to Chinese, Japanese, or Korean text. Defaults to `false`. |
| <code><a href="#projen.javascript.biome_config.MarkdownParserConfiguration.property.frontmatter">frontmatter</a></code> | <code>boolean</code> | Enables parsing frontmatter at the start of the file. |
| <code><a href="#projen.javascript.biome_config.MarkdownParserConfiguration.property.gfm">gfm</a></code> | <code>boolean</code> | Enables GitHub Flavored Markdown extensions. |

---

##### `cjkFriendlyEmphasis`<sup>Optional</sup> <a name="cjkFriendlyEmphasis" id="projen.javascript.biome_config.MarkdownParserConfiguration.property.cjkFriendlyEmphasis"></a>

```typescript
public readonly cjkFriendlyEmphasis: boolean;
```

- *Type:* boolean
- *Default:* false`.

Recognizes bold, italic, and strikethrough markers placed directly next to Chinese, Japanese, or Korean text. Defaults to `false`.

Standard Markdown doesn't treat `**テスト。**テスト` as bold text, because the closing `**`
is between a punctuation mark and a letter with no space around it. Languages that don't
put spaces between words run into this often. When enabled, Biome follows the
[CommonMark CJK-friendly amendments](https://github.com/tats-u/markdown-cjk-friendly/blob/main/specification.md)
and treats such text as bold or italic. The option applies to `*`, `_`, and `~~` markers.
After a variation selector (an invisible character that picks a glyph style for the
character before it), Biome classifies a marker by the character before the selector.

The option can also change markers that aren't next to Chinese, Japanese, or Korean text,
because a marker that can now open or close formatting can take another marker's partner
in the same paragraph, heading, or table cell. For example, standard Markdown shows
`**テスト。**テスト a**` with `テスト a` in bold. With the option enabled, `テスト。` is bold
and the last `**` is shown as written.

The formatter and the linter both use this reading of the document. Enable the option only
when the tool that renders your Markdown also supports these amendments. Otherwise, Biome
treats as bold some text that your renderer shows with literal `**`, and formatting can
change what your renderer shows. For example, the option makes `__` after a variation
selector a bold marker, and the formatter rewrites it as `**`, which standard Markdown
shows as bold even where it showed the original `__` as written.

---

##### `frontmatter`<sup>Optional</sup> <a name="frontmatter" id="projen.javascript.biome_config.MarkdownParserConfiguration.property.frontmatter"></a>

```typescript
public readonly frontmatter: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables parsing frontmatter at the start of the file.

Defaults to `false`.

---

##### `gfm`<sup>Optional</sup> <a name="gfm" id="projen.javascript.biome_config.MarkdownParserConfiguration.property.gfm"></a>

```typescript
public readonly gfm: boolean;
```

- *Type:* boolean
- *Default:* true`.

Enables GitHub Flavored Markdown extensions.

Defaults to `true`.

---

### OverrideAssistConfiguration <a name="OverrideAssistConfiguration" id="projen.javascript.biome_config.OverrideAssistConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.OverrideAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const overrideAssistConfiguration: javascript.biome_config.OverrideAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.OverrideAssistConfiguration.property.actions">actions</a></code> | <code>projen.javascript.biome_config.Actions</code> | The assist-action configuration for matched files. |
| <code><a href="#projen.javascript.biome_config.OverrideAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables assist actions for matched files. |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="projen.javascript.biome_config.OverrideAssistConfiguration.property.actions"></a>

```typescript
public readonly actions: Actions;
```

- *Type:* projen.javascript.biome_config.Actions

The assist-action configuration for matched files.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.OverrideAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables assist actions for matched files.

---

### OverrideFilesConfiguration <a name="OverrideFilesConfiguration" id="projen.javascript.biome_config.OverrideFilesConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.OverrideFilesConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const overrideFilesConfiguration: javascript.biome_config.OverrideFilesConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.OverrideFilesConfiguration.property.maxSize">maxSize</a></code> | <code>number</code> | The maximum source-file size in bytes for matched files. |

---

##### `maxSize`<sup>Optional</sup> <a name="maxSize" id="projen.javascript.biome_config.OverrideFilesConfiguration.property.maxSize"></a>

```typescript
public readonly maxSize: number;
```

- *Type:* number

The maximum source-file size in bytes for matched files.

---

### OverrideFormatterConfiguration <a name="OverrideFormatterConfiguration" id="projen.javascript.biome_config.OverrideFormatterConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.OverrideFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const overrideFormatterConfiguration: javascript.biome_config.OverrideFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style in HTML-like languages. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Controls the placement of the closing bracket for multiline HTML and JSX opening tags. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Controls spaces inside braces in supported single-line structures. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.delimiterSpacing">delimiterSpacing</a></code> | <code>boolean</code> | Controls spaces immediately inside supported delimiters when their content fits on one line. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the formatter for matched files. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Controls whether arrays and objects are formatted on one line or multiple lines. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.formatWithErrors">formatWithErrors</a></code> | <code>boolean</code> | Allows formatting matched files that contain syntax errors. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentSize">indentSize</a></code> | <code>number</code> | The indentation width. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | Uses tabs or spaces for indentation. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | Sets the indentation width. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The line ending. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | Sets the preferred maximum line width used when deciding where to wrap code. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.trailingCommas">trailingCommas</a></code> | <code>projen.javascript.biome_config.JsTrailingCommas</code> | Prints trailing commas wherever possible in multiline comma-separated structures. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of matched files. |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition

The attribute position style in HTML-like languages.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean

Controls the placement of the closing bracket for multiline HTML and JSX opening tags.

Biome
places the bracket at the end of the last attribute line when enabled and on its own line when
disabled. This also affects self-closing HTML elements, but self-closing JSX elements are
unaffected.

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Controls spaces inside braces in supported single-line structures.

The affected structures
vary by language.

---

##### `delimiterSpacing`<sup>Optional</sup> <a name="delimiterSpacing" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.delimiterSpacing"></a>

```typescript
public readonly delimiterSpacing: boolean;
```

- *Type:* boolean

Controls spaces immediately inside supported delimiters when their content fits on one line.

It doesn't add spaces before opening delimiters or inside empty delimiters.

The affected delimiters vary by language. If unset, uses the configured formatter setting.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the formatter for matched files.

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand

Controls whether arrays and objects are formatted on one line or multiple lines.

`auto` formats objects on multiple lines if the first property has a newline, and arrays on
one line if they fit.

`always` formats arrays and objects on multiple lines.

`never` formats arrays and objects on one line if they fit.

If unset, uses the configured formatter setting.

When formatting `package.json`, Biome uses `always` unless configured otherwise.

---

##### `formatWithErrors`<sup>Optional</sup> <a name="formatWithErrors" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.formatWithErrors"></a>

```typescript
public readonly formatWithErrors: boolean;
```

- *Type:* boolean

Allows formatting matched files that contain syntax errors.

---

##### `indentSize`<sup>Optional</sup> <a name="indentSize" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentSize"></a>

```typescript
public readonly indentSize: number;
```

- *Type:* number

The indentation width.

Deprecated, use `indentWidth` instead.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

Uses tabs or spaces for indentation.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

Sets the indentation width.

With space indentation, this is the number of spaces emitted per
indentation level. With tab indentation, Biome emits one tab per level and uses this value as
the tab's display width when calculating line length. Accepted values are `0` through `24`.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

Sets the preferred maximum line width used when deciding where to wrap code.

Some content,
such as long unbreakable strings, may still exceed this width. Accepted values are `1` through
`320`.

---

##### `trailingCommas`<sup>Optional</sup> <a name="trailingCommas" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.trailingCommas"></a>

```typescript
public readonly trailingCommas: JsTrailingCommas;
```

- *Type:* projen.javascript.biome_config.JsTrailingCommas

Prints trailing commas wherever possible in multiline comma-separated structures.

This is a
legacy override option. Prefer `javascript.formatter.trailingCommas`.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean

Whether to add a trailing newline at the end of matched files.

Disabling this option can
cause compatibility problems with other tools.

---

### OverrideLinterConfiguration <a name="OverrideLinterConfiguration" id="projen.javascript.biome_config.OverrideLinterConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.OverrideLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const overrideLinterConfiguration: javascript.biome_config.OverrideLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.OverrideLinterConfiguration.property.domains">domains</a></code> | <code>projen.javascript.biome_config.RuleDomains</code> | The lint-domain configuration for matched files. |
| <code><a href="#projen.javascript.biome_config.OverrideLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables the linter for matched files. |
| <code><a href="#projen.javascript.biome_config.OverrideLinterConfiguration.property.rules">rules</a></code> | <code>projen.javascript.biome_config.Rules</code> | The lint-rule configuration for matched files. |

---

##### `domains`<sup>Optional</sup> <a name="domains" id="projen.javascript.biome_config.OverrideLinterConfiguration.property.domains"></a>

```typescript
public readonly domains: RuleDomains;
```

- *Type:* projen.javascript.biome_config.RuleDomains

The lint-domain configuration for matched files.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.OverrideLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables or disables the linter for matched files.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.biome_config.OverrideLinterConfiguration.property.rules"></a>

```typescript
public readonly rules: Rules;
```

- *Type:* projen.javascript.biome_config.Rules

The lint-rule configuration for matched files.

---

### OverridePattern <a name="OverridePattern" id="projen.javascript.biome_config.OverridePattern"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.OverridePattern.Initializer"></a>

```typescript
import { javascript } from 'projen'

const overridePattern: javascript.biome_config.OverridePattern = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.assist">assist</a></code> | <code>projen.javascript.biome_config.OverrideAssistConfiguration</code> | Assist settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.css">css</a></code> | <code>projen.javascript.biome_config.CssConfiguration</code> | CSS-specific settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.files">files</a></code> | <code>projen.javascript.biome_config.OverrideFilesConfiguration</code> | File-handling settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.OverrideFormatterConfiguration</code> | Formatter settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.graphql">graphql</a></code> | <code>projen.javascript.biome_config.GraphqlConfiguration</code> | GraphQL-specific settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.grit">grit</a></code> | <code>projen.javascript.biome_config.GritConfiguration</code> | GritQL-specific settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.html">html</a></code> | <code>projen.javascript.biome_config.HtmlConfiguration</code> | HTML-specific settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns selecting the files to which this override applies. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.javascript">javascript</a></code> | <code>projen.javascript.biome_config.JsConfiguration</code> | JavaScript-specific settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.json">json</a></code> | <code>projen.javascript.biome_config.JsonConfiguration</code> | JSON-specific settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.linter">linter</a></code> | <code>projen.javascript.biome_config.OverrideLinterConfiguration</code> | Linter settings for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.markdown">markdown</a></code> | <code>projen.javascript.biome_config.MarkdownConfiguration</code> | Specific configuration for the Markdown language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.plugins">plugins</a></code> | <code>any[]</code> | Additional plugins for matched files. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.yaml">yaml</a></code> | <code>projen.javascript.biome_config.YamlConfiguration</code> | Specific configuration for the YAML language. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.OverridePattern.property.assist"></a>

```typescript
public readonly assist: OverrideAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideAssistConfiguration

Assist settings for matched files.

---

##### `css`<sup>Optional</sup> <a name="css" id="projen.javascript.biome_config.OverridePattern.property.css"></a>

```typescript
public readonly css: CssConfiguration;
```

- *Type:* projen.javascript.biome_config.CssConfiguration

CSS-specific settings for matched files.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.biome_config.OverridePattern.property.files"></a>

```typescript
public readonly files: OverrideFilesConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideFilesConfiguration

File-handling settings for matched files.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.OverridePattern.property.formatter"></a>

```typescript
public readonly formatter: OverrideFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideFormatterConfiguration

Formatter settings for matched files.

---

##### `graphql`<sup>Optional</sup> <a name="graphql" id="projen.javascript.biome_config.OverridePattern.property.graphql"></a>

```typescript
public readonly graphql: GraphqlConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlConfiguration

GraphQL-specific settings for matched files.

---

##### `grit`<sup>Optional</sup> <a name="grit" id="projen.javascript.biome_config.OverridePattern.property.grit"></a>

```typescript
public readonly grit: GritConfiguration;
```

- *Type:* projen.javascript.biome_config.GritConfiguration

GritQL-specific settings for matched files.

---

##### `html`<sup>Optional</sup> <a name="html" id="projen.javascript.biome_config.OverridePattern.property.html"></a>

```typescript
public readonly html: HtmlConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlConfiguration

HTML-specific settings for matched files.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.OverridePattern.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns selecting the files to which this override applies.

If omitted, the
override applies to every file. An empty list applies to no files.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.javascript.biome_config.OverridePattern.property.javascript"></a>

```typescript
public readonly javascript: JsConfiguration;
```

- *Type:* projen.javascript.biome_config.JsConfiguration

JavaScript-specific settings for matched files.

---

##### `json`<sup>Optional</sup> <a name="json" id="projen.javascript.biome_config.OverridePattern.property.json"></a>

```typescript
public readonly json: JsonConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonConfiguration

JSON-specific settings for matched files.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.OverridePattern.property.linter"></a>

```typescript
public readonly linter: OverrideLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideLinterConfiguration

Linter settings for matched files.

---

##### `markdown`<sup>Optional</sup> <a name="markdown" id="projen.javascript.biome_config.OverridePattern.property.markdown"></a>

```typescript
public readonly markdown: MarkdownConfiguration;
```

- *Type:* projen.javascript.biome_config.MarkdownConfiguration

Specific configuration for the Markdown language.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.javascript.biome_config.OverridePattern.property.plugins"></a>

```typescript
public readonly plugins: any[];
```

- *Type:* any[]

Additional plugins for matched files.

---

##### `yaml`<sup>Optional</sup> <a name="yaml" id="projen.javascript.biome_config.OverridePattern.property.yaml"></a>

```typescript
public readonly yaml: YamlConfiguration;
```

- *Type:* projen.javascript.biome_config.YamlConfiguration

Specific configuration for the YAML language.

---

### RuleDomains <a name="RuleDomains" id="projen.javascript.biome_config.RuleDomains"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.RuleDomains.Initializer"></a>

```typescript
import { javascript } from 'projen'

const ruleDomains: javascript.biome_config.RuleDomains = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.astro">astro</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.drizzle">drizzle</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.next">next</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.playwright">playwright</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.project">project</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.qwik">qwik</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.react">react</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.reactNative">reactNative</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.solid">solid</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.svelte">svelte</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.tailwind">tailwind</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.test">test</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.turborepo">turborepo</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.types">types</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.RuleDomains.property.vue">vue</a></code> | <code>projen.javascript.biome_config.RuleDomainValue</code> | *No description.* |

---

##### `astro`<sup>Optional</sup> <a name="astro" id="projen.javascript.biome_config.RuleDomains.property.astro"></a>

```typescript
public readonly astro: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `drizzle`<sup>Optional</sup> <a name="drizzle" id="projen.javascript.biome_config.RuleDomains.property.drizzle"></a>

```typescript
public readonly drizzle: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `next`<sup>Optional</sup> <a name="next" id="projen.javascript.biome_config.RuleDomains.property.next"></a>

```typescript
public readonly next: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `playwright`<sup>Optional</sup> <a name="playwright" id="projen.javascript.biome_config.RuleDomains.property.playwright"></a>

```typescript
public readonly playwright: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `project`<sup>Optional</sup> <a name="project" id="projen.javascript.biome_config.RuleDomains.property.project"></a>

```typescript
public readonly project: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `qwik`<sup>Optional</sup> <a name="qwik" id="projen.javascript.biome_config.RuleDomains.property.qwik"></a>

```typescript
public readonly qwik: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `react`<sup>Optional</sup> <a name="react" id="projen.javascript.biome_config.RuleDomains.property.react"></a>

```typescript
public readonly react: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `reactNative`<sup>Optional</sup> <a name="reactNative" id="projen.javascript.biome_config.RuleDomains.property.reactNative"></a>

```typescript
public readonly reactNative: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `solid`<sup>Optional</sup> <a name="solid" id="projen.javascript.biome_config.RuleDomains.property.solid"></a>

```typescript
public readonly solid: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `svelte`<sup>Optional</sup> <a name="svelte" id="projen.javascript.biome_config.RuleDomains.property.svelte"></a>

```typescript
public readonly svelte: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `tailwind`<sup>Optional</sup> <a name="tailwind" id="projen.javascript.biome_config.RuleDomains.property.tailwind"></a>

```typescript
public readonly tailwind: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `test`<sup>Optional</sup> <a name="test" id="projen.javascript.biome_config.RuleDomains.property.test"></a>

```typescript
public readonly test: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `turborepo`<sup>Optional</sup> <a name="turborepo" id="projen.javascript.biome_config.RuleDomains.property.turborepo"></a>

```typescript
public readonly turborepo: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `types`<sup>Optional</sup> <a name="types" id="projen.javascript.biome_config.RuleDomains.property.types"></a>

```typescript
public readonly types: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

##### `vue`<sup>Optional</sup> <a name="vue" id="projen.javascript.biome_config.RuleDomains.property.vue"></a>

```typescript
public readonly vue: RuleDomainValue;
```

- *Type:* projen.javascript.biome_config.RuleDomainValue

---

### Rules <a name="Rules" id="projen.javascript.biome_config.Rules"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.Rules.Initializer"></a>

```typescript
import { javascript } from 'projen'

const rules: javascript.biome_config.Rules = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.Rules.property.a11Y">a11Y</a></code> | <code>any</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.Rules.property.complexity">complexity</a></code> | <code>any</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.Rules.property.correctness">correctness</a></code> | <code>any</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.Rules.property.nursery">nursery</a></code> | <code>any</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.Rules.property.performance">performance</a></code> | <code>any</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.Rules.property.preset">preset</a></code> | <code>projen.javascript.biome_config.PresetConfig</code> | Selects the baseline set of lint rules. |
| <code><a href="#projen.javascript.biome_config.Rules.property.recommended">recommended</a></code> | <code>boolean</code> | Enables or disables Biome's recommended non-nursery rules. Defaults to `true`. |
| <code><a href="#projen.javascript.biome_config.Rules.property.security">security</a></code> | <code>any</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.Rules.property.style">style</a></code> | <code>any</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.Rules.property.suspicious">suspicious</a></code> | <code>any</code> | *No description.* |

---

##### `a11Y`<sup>Optional</sup> <a name="a11Y" id="projen.javascript.biome_config.Rules.property.a11Y"></a>

```typescript
public readonly a11Y: any;
```

- *Type:* any

---

##### `complexity`<sup>Optional</sup> <a name="complexity" id="projen.javascript.biome_config.Rules.property.complexity"></a>

```typescript
public readonly complexity: any;
```

- *Type:* any

---

##### `correctness`<sup>Optional</sup> <a name="correctness" id="projen.javascript.biome_config.Rules.property.correctness"></a>

```typescript
public readonly correctness: any;
```

- *Type:* any

---

##### `nursery`<sup>Optional</sup> <a name="nursery" id="projen.javascript.biome_config.Rules.property.nursery"></a>

```typescript
public readonly nursery: any;
```

- *Type:* any

---

##### `performance`<sup>Optional</sup> <a name="performance" id="projen.javascript.biome_config.Rules.property.performance"></a>

```typescript
public readonly performance: any;
```

- *Type:* any

---

##### `preset`<sup>Optional</sup> <a name="preset" id="projen.javascript.biome_config.Rules.property.preset"></a>

```typescript
public readonly preset: PresetConfig;
```

- *Type:* projen.javascript.biome_config.PresetConfig
- *Default:* recommended`.

Selects the baseline set of lint rules.

`recommended` enables Biome's recommended
non-nursery rules, `all` enables all non-nursery rules, and `none` starts with no
rules enabled. Group-level settings and explicit rule settings override this
preset. Defaults to `recommended`.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome_config.Rules.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean
- *Default:* true`.

Enables or disables Biome's recommended non-nursery rules. Defaults to `true`.

**Deprecated:** This option will be removed in the next major version. Use
`linter.rules.preset` instead, or run `biome migrate` to update the configuration.

---

##### `security`<sup>Optional</sup> <a name="security" id="projen.javascript.biome_config.Rules.property.security"></a>

```typescript
public readonly security: any;
```

- *Type:* any

---

##### `style`<sup>Optional</sup> <a name="style" id="projen.javascript.biome_config.Rules.property.style"></a>

```typescript
public readonly style: any;
```

- *Type:* any

---

##### `suspicious`<sup>Optional</sup> <a name="suspicious" id="projen.javascript.biome_config.Rules.property.suspicious"></a>

```typescript
public readonly suspicious: any;
```

- *Type:* any

---

### Source <a name="Source" id="projen.javascript.biome_config.Source"></a>

Configures one group of assist actions.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.Source.Initializer"></a>

```typescript
import { javascript } from 'projen'

const source: javascript.biome_config.Source = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.Source.property.noDuplicateClasses">noDuplicateClasses</a></code> | <code>any</code> | Remove repeated CSS class names from HTML class attributes. |
| <code><a href="#projen.javascript.biome_config.Source.property.organizeImports">organizeImports</a></code> | <code>any</code> | Organize imports and exports in JavaScript and TypeScript files. |
| <code><a href="#projen.javascript.biome_config.Source.property.preset">preset</a></code> | <code>projen.javascript.biome_config.PresetConfig</code> | Selects the baseline set of assist actions for this group. |
| <code><a href="#projen.javascript.biome_config.Source.property.recommended">recommended</a></code> | <code>boolean</code> | Enables or disables the recommended actions in this group. |
| <code><a href="#projen.javascript.biome_config.Source.property.useGraphqlSortedArguments">useGraphqlSortedArguments</a></code> | <code>any</code> | Sort the arguments of GraphQL fields and directives in natural order. |
| <code><a href="#projen.javascript.biome_config.Source.property.useGraphqlSortedDefinitions">useGraphqlSortedDefinitions</a></code> | <code>any</code> | Sort the named definitions in a GraphQL document. |
| <code><a href="#projen.javascript.biome_config.Source.property.useGraphqlSortedVariables">useGraphqlSortedVariables</a></code> | <code>any</code> | Sort the variable definitions of GraphQL operations in natural order. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedAttributes">useSortedAttributes</a></code> | <code>any</code> | Sort HTML attributes and framework directives into a consistent order. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedEnumMembers">useSortedEnumMembers</a></code> | <code>any</code> | Sort GraphQL enum values in natural order. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedInterfaceMembers">useSortedInterfaceMembers</a></code> | <code>any</code> | Sort named members of a TypeScript interface. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedKeys">useSortedKeys</a></code> | <code>any</code> | Sort keys in a JSON object. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedPackageJson">useSortedPackageJson</a></code> | <code>any</code> | Organize package.json fields according to established conventions. See https://biomejs.dev/assist/actions/use-sorted-package-json. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedProperties">useSortedProperties</a></code> | <code>any</code> | Sort CSS properties and nested rules into a consistent order. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedSelectionSet">useSortedSelectionSet</a></code> | <code>any</code> | Sort selections inside GraphQL operations and fragments. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedTypeFields">useSortedTypeFields</a></code> | <code>any</code> | Sort fields in GraphQL type definitions by name. |

---

##### `noDuplicateClasses`<sup>Optional</sup> <a name="noDuplicateClasses" id="projen.javascript.biome_config.Source.property.noDuplicateClasses"></a>

```typescript
public readonly noDuplicateClasses: any;
```

- *Type:* any

Remove repeated CSS class names from HTML class attributes.

See https://biomejs.dev/assist/actions/no-duplicate-classes

---

##### `organizeImports`<sup>Optional</sup> <a name="organizeImports" id="projen.javascript.biome_config.Source.property.organizeImports"></a>

```typescript
public readonly organizeImports: any;
```

- *Type:* any

Organize imports and exports in JavaScript and TypeScript files.

See https://biomejs.dev/assist/actions/organize-imports

---

##### `preset`<sup>Optional</sup> <a name="preset" id="projen.javascript.biome_config.Source.property.preset"></a>

```typescript
public readonly preset: PresetConfig;
```

- *Type:* projen.javascript.biome_config.PresetConfig

Selects the baseline set of assist actions for this group.

`recommended` enables
the group's recommended actions, `all` enables all actions in the group, and
`none` starts with no actions enabled in the group. Explicit action settings
override this group preset, which overrides `assist.actions.preset` for the group.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome_config.Source.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

Enables or disables the recommended actions in this group.

The group's `preset`
setting takes precedence when both options are set.

---

##### `useGraphqlSortedArguments`<sup>Optional</sup> <a name="useGraphqlSortedArguments" id="projen.javascript.biome_config.Source.property.useGraphqlSortedArguments"></a>

```typescript
public readonly useGraphqlSortedArguments: any;
```

- *Type:* any

Sort the arguments of GraphQL fields and directives in natural order.

See https://biomejs.dev/assist/actions/use-graphql-sorted-arguments

---

##### `useGraphqlSortedDefinitions`<sup>Optional</sup> <a name="useGraphqlSortedDefinitions" id="projen.javascript.biome_config.Source.property.useGraphqlSortedDefinitions"></a>

```typescript
public readonly useGraphqlSortedDefinitions: any;
```

- *Type:* any

Sort the named definitions in a GraphQL document.

See https://biomejs.dev/assist/actions/use-graphql-sorted-definitions

---

##### `useGraphqlSortedVariables`<sup>Optional</sup> <a name="useGraphqlSortedVariables" id="projen.javascript.biome_config.Source.property.useGraphqlSortedVariables"></a>

```typescript
public readonly useGraphqlSortedVariables: any;
```

- *Type:* any

Sort the variable definitions of GraphQL operations in natural order.

See https://biomejs.dev/assist/actions/use-graphql-sorted-variables

---

##### `useSortedAttributes`<sup>Optional</sup> <a name="useSortedAttributes" id="projen.javascript.biome_config.Source.property.useSortedAttributes"></a>

```typescript
public readonly useSortedAttributes: any;
```

- *Type:* any

Sort HTML attributes and framework directives into a consistent order.

See https://biomejs.dev/assist/actions/use-sorted-attributes

---

##### `useSortedEnumMembers`<sup>Optional</sup> <a name="useSortedEnumMembers" id="projen.javascript.biome_config.Source.property.useSortedEnumMembers"></a>

```typescript
public readonly useSortedEnumMembers: any;
```

- *Type:* any

Sort GraphQL enum values in natural order.

See https://biomejs.dev/assist/actions/use-sorted-enum-members

---

##### `useSortedInterfaceMembers`<sup>Optional</sup> <a name="useSortedInterfaceMembers" id="projen.javascript.biome_config.Source.property.useSortedInterfaceMembers"></a>

```typescript
public readonly useSortedInterfaceMembers: any;
```

- *Type:* any

Sort named members of a TypeScript interface.

See https://biomejs.dev/assist/actions/use-sorted-interface-members

---

##### `useSortedKeys`<sup>Optional</sup> <a name="useSortedKeys" id="projen.javascript.biome_config.Source.property.useSortedKeys"></a>

```typescript
public readonly useSortedKeys: any;
```

- *Type:* any

Sort keys in a JSON object.

See https://biomejs.dev/assist/actions/use-sorted-keys

---

##### `useSortedPackageJson`<sup>Optional</sup> <a name="useSortedPackageJson" id="projen.javascript.biome_config.Source.property.useSortedPackageJson"></a>

```typescript
public readonly useSortedPackageJson: any;
```

- *Type:* any

Organize package.json fields according to established conventions. See https://biomejs.dev/assist/actions/use-sorted-package-json.

---

##### `useSortedProperties`<sup>Optional</sup> <a name="useSortedProperties" id="projen.javascript.biome_config.Source.property.useSortedProperties"></a>

```typescript
public readonly useSortedProperties: any;
```

- *Type:* any

Sort CSS properties and nested rules into a consistent order.

See https://biomejs.dev/assist/actions/use-sorted-properties

---

##### `useSortedSelectionSet`<sup>Optional</sup> <a name="useSortedSelectionSet" id="projen.javascript.biome_config.Source.property.useSortedSelectionSet"></a>

```typescript
public readonly useSortedSelectionSet: any;
```

- *Type:* any

Sort selections inside GraphQL operations and fragments.

See https://biomejs.dev/assist/actions/use-sorted-selection-set

---

##### `useSortedTypeFields`<sup>Optional</sup> <a name="useSortedTypeFields" id="projen.javascript.biome_config.Source.property.useSortedTypeFields"></a>

```typescript
public readonly useSortedTypeFields: any;
```

- *Type:* any

Sort fields in GraphQL type definitions by name.

See https://biomejs.dev/assist/actions/use-sorted-type-fields

---

### TailwindConfiguration <a name="TailwindConfiguration" id="projen.javascript.biome_config.TailwindConfiguration"></a>

Tells Biome where your code lists Tailwind CSS classes, so the Tailwind lint rules know which strings to check.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.TailwindConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const tailwindConfiguration: javascript.biome_config.TailwindConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.TailwindConfiguration.property.attributes">attributes</a></code> | <code>string[]</code> | Attributes whose values are Tailwind classes, such as `class` in `<div class="px-2 py-2">`. |
| <code><a href="#projen.javascript.biome_config.TailwindConfiguration.property.mergeFunctions">mergeFunctions</a></code> | <code>string[]</code> | Functions that combine Tailwind classes, such as `clsx` and `cn`. |
| <code><a href="#projen.javascript.biome_config.TailwindConfiguration.property.stylesheet">stylesheet</a></code> | <code>string</code> | The CSS file that holds your Tailwind CSS configuration, such as `"./src/app.css"`. A relative path starts from the folder of the Biome configuration file. |
| <code><a href="#projen.javascript.biome_config.TailwindConfiguration.property.variantFunctions">variantFunctions</a></code> | <code>string[]</code> | Functions that describe a component's styles with an object, such as `cva` and `tv`. |

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="projen.javascript.biome_config.TailwindConfiguration.property.attributes"></a>

```typescript
public readonly attributes: string[];
```

- *Type:* string[]
- *Default:* class` and `className`. In HTML, they are case-insensitive.

Attributes whose values are Tailwind classes, such as `class` in `<div class="px-2 py-2">`.

Defaults to `class` and `className`. In HTML, they are case-insensitive.

---

##### `mergeFunctions`<sup>Optional</sup> <a name="mergeFunctions" id="projen.javascript.biome_config.TailwindConfiguration.property.mergeFunctions"></a>

```typescript
public readonly mergeFunctions: string[];
```

- *Type:* string[]
- *Default:* clsx`, `tw`, `twMerge`, `twJoin`, `cn`, `cc`, `cnb`, and

Functions that combine Tailwind classes, such as `clsx` and `cn`.

Biome checks every string passed to these functions, like both strings
in `cn("px-2", "py-2")`. When an object is passed, Biome checks its
keys: in `cn({ "px-2": isActive })`, it checks `"px-2"`.

Properties of these functions are checked too, so listing `tw` also
covers `` tw.div`px-2` `` and `tw.div("px-2")`.

Defaults to `clsx`, `tw`, `twMerge`, `twJoin`, `cn`, `cc`, `cnb`, and
`ctl`.

---

##### `stylesheet`<sup>Optional</sup> <a name="stylesheet" id="projen.javascript.biome_config.TailwindConfiguration.property.stylesheet"></a>

```typescript
public readonly stylesheet: string;
```

- *Type:* string

The CSS file that holds your Tailwind CSS configuration, such as `"./src/app.css"`. A relative path starts from the folder of the Biome configuration file.

Biome reads the `@theme`, `@utility`, and `@custom-variant` rules in
this file and in the files it imports with `@import`, so that the
Tailwind rules know your theme values, utilities, and variants.

To read the file, Biome scans your project when a Tailwind rule is
enabled. Setting this option also turns on `css.parser.tailwindDirectives`,
unless you set that option yourself.

---

##### `variantFunctions`<sup>Optional</sup> <a name="variantFunctions" id="projen.javascript.biome_config.TailwindConfiguration.property.variantFunctions"></a>

```typescript
public readonly variantFunctions: string[];
```

- *Type:* string[]
- *Default:* cva` and `tv`.

Functions that describe a component's styles with an object, such as `cva` and `tv`.

Biome checks every string passed directly to these functions. In an
object passed to them, Biome checks the classes under these properties:

- `base`, `class`, and `className`: classes that always apply.
- `variants`: classes for each version of the component, such as each
button size.
- `slots`: classes for each part of the component, such as its icon.
- `compoundVariants` and `compoundSlots`: only the `class` and
`className` of each entry.

Other properties, such as `defaultVariants`, hold names rather than
classes, so Biome skips them. For example, Biome checks `"rounded"`,
`"px-2"`, and `"px-4"` here, but not `"small"`:

```js
cva("rounded", {
variants: {
size: { small: "px-2", large: "px-4" },
},
defaultVariants: { size: "small" },
});
```

Defaults to `cva` and `tv`.

---

### VcsConfiguration <a name="VcsConfiguration" id="projen.javascript.biome_config.VcsConfiguration"></a>

Configures how Biome integrates with a version control system.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.VcsConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const vcsConfiguration: javascript.biome_config.VcsConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.clientKind">clientKind</a></code> | <code>projen.javascript.biome_config.VcsClientKind</code> | Selects the version-control client. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.defaultBranch">defaultBranch</a></code> | <code>string</code> | Sets the base branch used by `--changed` when `--since` is not provided. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Enables or disables version-control integration. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.root">root</a></code> | <code>string</code> | Sets the directory where Biome looks for version-control files. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.useIgnoreFile">useIgnoreFile</a></code> | <code>boolean</code> | Controls whether Biome applies patterns from `.gitignore`, Git's local `.git/info/exclude`, and supported `.ignore` files, including nested ignore files. Patterns in the root ignore file are resolved from `vcs.root`. Patterns in nested ignore files are resolved from the directory containing that file. Defaults to `false`. |

---

##### `clientKind`<sup>Optional</sup> <a name="clientKind" id="projen.javascript.biome_config.VcsConfiguration.property.clientKind"></a>

```typescript
public readonly clientKind: VcsClientKind;
```

- *Type:* projen.javascript.biome_config.VcsClientKind

Selects the version-control client.

Currently, only `git` is supported.

---

##### `defaultBranch`<sup>Optional</sup> <a name="defaultBranch" id="projen.javascript.biome_config.VcsConfiguration.property.defaultBranch"></a>

```typescript
public readonly defaultBranch: string;
```

- *Type:* string

Sets the base branch used by `--changed` when `--since` is not provided.

If neither this option
nor `--since` is set, commands using `--changed` fail because Biome cannot determine the
comparison base.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.VcsConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* false`. Enabling integration

Enables or disables version-control integration.

Defaults to `false`. Enabling integration
requires `vcs.clientKind` to be set.

---

##### `root`<sup>Optional</sup> <a name="root" id="projen.javascript.biome_config.VcsConfiguration.property.root"></a>

```typescript
public readonly root: string;
```

- *Type:* string
- *Default:* the directory containing `biome.json` or `biome.jsonc`. If no configuration is

Sets the directory where Biome looks for version-control files.

A relative value is resolved
from the directory containing the current configuration file, while an absolute path is used
directly.

Defaults to the directory containing `biome.json` or `biome.jsonc`. If no configuration is
found, Biome uses the current working directory.

If neither directory is available, Biome disables version control integration and emits a
diagnostic.

---

##### `useIgnoreFile`<sup>Optional</sup> <a name="useIgnoreFile" id="projen.javascript.biome_config.VcsConfiguration.property.useIgnoreFile"></a>

```typescript
public readonly useIgnoreFile: boolean;
```

- *Type:* boolean
- *Default:* false`.

Controls whether Biome applies patterns from `.gitignore`, Git's local `.git/info/exclude`, and supported `.ignore` files, including nested ignore files. Patterns in the root ignore file are resolved from `vcs.root`. Patterns in nested ignore files are resolved from the directory containing that file. Defaults to `false`.

---

### YamlConfiguration <a name="YamlConfiguration" id="projen.javascript.biome_config.YamlConfiguration"></a>

Options applied to Yaml files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.YamlConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const yamlConfiguration: javascript.biome_config.YamlConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.YamlConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.YamlFormatterConfiguration</code> | Formatter options. |
| <code><a href="#projen.javascript.biome_config.YamlConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.YamlLinterConfiguration</code> | *No description.* |

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.YamlConfiguration.property.formatter"></a>

```typescript
public readonly formatter: YamlFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.YamlFormatterConfiguration

Formatter options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.YamlConfiguration.property.linter"></a>

```typescript
public readonly linter: YamlLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.YamlLinterConfiguration

---

### YamlFormatterConfiguration <a name="YamlFormatterConfiguration" id="projen.javascript.biome_config.YamlFormatterConfiguration"></a>

Options that change how the Yaml formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.YamlFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const yamlFormatterConfiguration: javascript.biome_config.YamlFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.YamlFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces inside non-empty flow mappings (`{ key: value }`) and sequences (`[ item ]`) that fit on one line. |
| <code><a href="#projen.javascript.biome_config.YamlFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for Yaml (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.YamlFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to Yaml files. |
| <code><a href="#projen.javascript.biome_config.YamlFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to Yaml (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.YamlFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to Yaml files. |
| <code><a href="#projen.javascript.biome_config.YamlFormatterConfiguration.property.quoteStyle">quoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | The type of quotes used in YAML code. |
| <code><a href="#projen.javascript.biome_config.YamlFormatterConfiguration.property.trailingNewline">trailingNewline</a></code> | <code>boolean</code> | Whether to add a trailing newline at the end of the file. |

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.YamlFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Whether to insert spaces inside non-empty flow mappings (`{ key: value }`) and sequences (`[ item ]`) that fit on one line.

If unset, inherits the
global bracket spacing setting. When neither is set, mappings have spaces
and sequences do not.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.YamlFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for Yaml (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.YamlFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to Yaml files.

Defaults to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.YamlFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to Yaml (and its super languages) files.

`auto` uses CRLF on Windows and LF on other platforms.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.YamlFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to Yaml files.

Defaults to 80.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome_config.YamlFormatterConfiguration.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double`.

The type of quotes used in YAML code.

Defaults to `double`.

---

##### `trailingNewline`<sup>Optional</sup> <a name="trailingNewline" id="projen.javascript.biome_config.YamlFormatterConfiguration.property.trailingNewline"></a>

```typescript
public readonly trailingNewline: boolean;
```

- *Type:* boolean
- *Default:* true.

Whether to add a trailing newline at the end of the file.

Setting this option to `false` is **highly discouraged** because it could cause many problems with other tools:
- https://thoughtbot.com/blog/no-newline-at-end-of-file
- https://callmeryan.medium.com/no-newline-at-end-of-file-navigating-gits-warning-for-android-developers-af14e73dd804
- https://unix.stackexchange.com/questions/345548/how-to-cat-files-together-adding-missing-newlines-at-end-of-some-files

Disable the option at your own risk.

Defaults to true.

---

### YamlLinterConfiguration <a name="YamlLinterConfiguration" id="projen.javascript.biome_config.YamlLinterConfiguration"></a>

Options that change how the Yaml linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.YamlLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const yamlLinterConfiguration: javascript.biome_config.YamlLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.YamlLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for Yaml files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.YamlLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for Yaml files.

---



## Enums <a name="Enums" id="Enums"></a>

### ArrowParentheses <a name="ArrowParentheses" id="projen.javascript.biome_config.ArrowParentheses"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.ArrowParentheses.ALWAYS">ALWAYS</a></code> | Always prints parentheses around arrow-function parameters. |
| <code><a href="#projen.javascript.biome_config.ArrowParentheses.AS_NEEDED">AS_NEEDED</a></code> | Omits parentheses when an arrow function has one parameter and the syntax permits it. |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.ArrowParentheses.ALWAYS"></a>

Always prints parentheses around arrow-function parameters.

(always)

---


##### `AS_NEEDED` <a name="AS_NEEDED" id="projen.javascript.biome_config.ArrowParentheses.AS_NEEDED"></a>

Omits parentheses when an arrow function has one parameter and the syntax permits it.

(asNeeded)

---


### AttributePosition <a name="AttributePosition" id="projen.javascript.biome_config.AttributePosition"></a>

Controls attribute placement in HTML-like languages.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.AttributePosition.AUTO">AUTO</a></code> | Places attributes automatically and wraps them when needed. |
| <code><a href="#projen.javascript.biome_config.AttributePosition.MULTILINE">MULTILINE</a></code> | Places each attribute on its own line when an element has multiple attributes. |

---

##### `AUTO` <a name="AUTO" id="projen.javascript.biome_config.AttributePosition.AUTO"></a>

Places attributes automatically and wraps them when needed.

(auto)

---


##### `MULTILINE` <a name="MULTILINE" id="projen.javascript.biome_config.AttributePosition.MULTILINE"></a>

Places each attribute on its own line when an element has multiple attributes.

(multiline)

---


### Expand <a name="Expand" id="projen.javascript.biome_config.Expand"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.Expand.AUTO">AUTO</a></code> | Objects are expanded when the first property has a leading newline. |
| <code><a href="#projen.javascript.biome_config.Expand.ALWAYS">ALWAYS</a></code> | Objects and arrays are always expanded. |
| <code><a href="#projen.javascript.biome_config.Expand.NEVER">NEVER</a></code> | Objects and arrays remain on one line if they fit. |

---

##### `AUTO` <a name="AUTO" id="projen.javascript.biome_config.Expand.AUTO"></a>

Objects are expanded when the first property has a leading newline.

Arrays remain on one
line if they fit. (auto)

---


##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.Expand.ALWAYS"></a>

Objects and arrays are always expanded.

(always)

---


##### `NEVER` <a name="NEVER" id="projen.javascript.biome_config.Expand.NEVER"></a>

Objects and arrays remain on one line if they fit.

(never)

---


### IndentStyle <a name="IndentStyle" id="projen.javascript.biome_config.IndentStyle"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.IndentStyle.TAB">TAB</a></code> | Uses tabs for indentation. |
| <code><a href="#projen.javascript.biome_config.IndentStyle.SPACE">SPACE</a></code> | Uses spaces for indentation. |

---

##### `TAB` <a name="TAB" id="projen.javascript.biome_config.IndentStyle.TAB"></a>

Uses tabs for indentation.

(tab)

---


##### `SPACE` <a name="SPACE" id="projen.javascript.biome_config.IndentStyle.SPACE"></a>

Uses spaces for indentation.

(space)

---


### JsonTrailingCommas <a name="JsonTrailingCommas" id="projen.javascript.biome_config.JsonTrailingCommas"></a>

Controls trailing commas in multiline JSON arrays and objects.

Use `all` only for JSON variants that allow trailing commas, and ensure `json.parser.allowTrailingCommas` is enabled or automatically detected for those files.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.JsonTrailingCommas.NONE">NONE</a></code> | none. |
| <code><a href="#projen.javascript.biome_config.JsonTrailingCommas.ALL">ALL</a></code> | all. |

---

##### `NONE` <a name="NONE" id="projen.javascript.biome_config.JsonTrailingCommas.NONE"></a>

none.

---


##### `ALL` <a name="ALL" id="projen.javascript.biome_config.JsonTrailingCommas.ALL"></a>

all.

---


### JsTrailingCommas <a name="JsTrailingCommas" id="projen.javascript.biome_config.JsTrailingCommas"></a>

Print trailing commas wherever possible in multi-line comma-separated syntactic structures for JavaScript/TypeScript files.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.JsTrailingCommas.ALL">ALL</a></code> | all. |
| <code><a href="#projen.javascript.biome_config.JsTrailingCommas.ES5">ES5</a></code> | es5. |
| <code><a href="#projen.javascript.biome_config.JsTrailingCommas.NONE">NONE</a></code> | none. |

---

##### `ALL` <a name="ALL" id="projen.javascript.biome_config.JsTrailingCommas.ALL"></a>

all.

---


##### `ES5` <a name="ES5" id="projen.javascript.biome_config.JsTrailingCommas.ES5"></a>

es5.

---


##### `NONE` <a name="NONE" id="projen.javascript.biome_config.JsTrailingCommas.NONE"></a>

none.

---


### JsxRuntime <a name="JsxRuntime" id="projen.javascript.biome_config.JsxRuntime"></a>

How Biome's analyzer accounts for imports used by JSX.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.JsxRuntime.TRANSPARENT">TRANSPARENT</a></code> | An automatic or native JSX environment that doesn't require an in-scope factory import. |
| <code><a href="#projen.javascript.biome_config.JsxRuntime.REACT_CLASSIC">REACT_CLASSIC</a></code> | A classic React environment that requires the React import, or custom JSX factory imports configured in `tsconfig.json`. |

---

##### `TRANSPARENT` <a name="TRANSPARENT" id="projen.javascript.biome_config.JsxRuntime.TRANSPARENT"></a>

An automatic or native JSX environment that doesn't require an in-scope factory import.

(transparent)

---


##### `REACT_CLASSIC` <a name="REACT_CLASSIC" id="projen.javascript.biome_config.JsxRuntime.REACT_CLASSIC"></a>

A classic React environment that requires the React import, or custom JSX factory imports configured in `tsconfig.json`.

Corresponds to the `react` value for the `jsx` option in TypeScript's
`tsconfig.json`.

This option should only be necessary if you cannot upgrade to a React
version that supports the new JSX runtime. For more information about
the old vs. new JSX runtime, please see:
<https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html> (reactClassic)

---


### LineEnding <a name="LineEnding" id="projen.javascript.biome_config.LineEnding"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.LineEnding.LF">LF</a></code> | Line Feed only (\n), common on Linux and macOS as well as inside git repos (lf). |
| <code><a href="#projen.javascript.biome_config.LineEnding.CRLF">CRLF</a></code> | Carriage Return + Line Feed characters (\r\n), common on Windows (crlf). |
| <code><a href="#projen.javascript.biome_config.LineEnding.CR">CR</a></code> | Carriage Return character only (\r), used very rarely (cr). |
| <code><a href="#projen.javascript.biome_config.LineEnding.AUTO">AUTO</a></code> | Automatically use CRLF on Windows and LF on other platforms (auto). |

---

##### `LF` <a name="LF" id="projen.javascript.biome_config.LineEnding.LF"></a>

Line Feed only (\n), common on Linux and macOS as well as inside git repos (lf).

---


##### `CRLF` <a name="CRLF" id="projen.javascript.biome_config.LineEnding.CRLF"></a>

Carriage Return + Line Feed characters (\r\n), common on Windows (crlf).

---


##### `CR` <a name="CR" id="projen.javascript.biome_config.LineEnding.CR"></a>

Carriage Return character only (\r), used very rarely (cr).

---


##### `AUTO` <a name="AUTO" id="projen.javascript.biome_config.LineEnding.AUTO"></a>

Automatically use CRLF on Windows and LF on other platforms (auto).

---


### OperatorLinebreak <a name="OperatorLinebreak" id="projen.javascript.biome_config.OperatorLinebreak"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.OperatorLinebreak.AFTER">AFTER</a></code> | The operator is placed after the expression (after). |
| <code><a href="#projen.javascript.biome_config.OperatorLinebreak.BEFORE">BEFORE</a></code> | The operator is placed before the expression (before). |

---

##### `AFTER` <a name="AFTER" id="projen.javascript.biome_config.OperatorLinebreak.AFTER"></a>

The operator is placed after the expression (after).

---


##### `BEFORE` <a name="BEFORE" id="projen.javascript.biome_config.OperatorLinebreak.BEFORE"></a>

The operator is placed before the expression (before).

---


### PresetConfig <a name="PresetConfig" id="projen.javascript.biome_config.PresetConfig"></a>

A preset configuration for enabling a set of rules.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.PresetConfig.RECOMMENDED">RECOMMENDED</a></code> | recommended. |
| <code><a href="#projen.javascript.biome_config.PresetConfig.ALL">ALL</a></code> | all. |
| <code><a href="#projen.javascript.biome_config.PresetConfig.NONE">NONE</a></code> | none. |

---

##### `RECOMMENDED` <a name="RECOMMENDED" id="projen.javascript.biome_config.PresetConfig.RECOMMENDED"></a>

recommended.

---


##### `ALL` <a name="ALL" id="projen.javascript.biome_config.PresetConfig.ALL"></a>

all.

---


##### `NONE` <a name="NONE" id="projen.javascript.biome_config.PresetConfig.NONE"></a>

none.

---


### ProseWrap <a name="ProseWrap" id="projen.javascript.biome_config.ProseWrap"></a>

Controls whether Biome keeps, adds, or removes line breaks in Markdown paragraphs.

Manual line breaks are always kept. In Markdown, a manual line break is created by ending a
line with two spaces or a backslash.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.ProseWrap.PRESERVE">PRESERVE</a></code> | Keep line breaks as written in the source file. |
| <code><a href="#projen.javascript.biome_config.ProseWrap.ALWAYS">ALWAYS</a></code> | Wrap paragraphs to fit the configured `lineWidth`. |
| <code><a href="#projen.javascript.biome_config.ProseWrap.NEVER">NEVER</a></code> | Remove line breaks from paragraphs so that each paragraph is on one line. |

---

##### `PRESERVE` <a name="PRESERVE" id="projen.javascript.biome_config.ProseWrap.PRESERVE"></a>

Keep line breaks as written in the source file.

This is the default. (preserve)

---


##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.ProseWrap.ALWAYS"></a>

Wrap paragraphs to fit the configured `lineWidth`.

(always)

---


##### `NEVER` <a name="NEVER" id="projen.javascript.biome_config.ProseWrap.NEVER"></a>

Remove line breaks from paragraphs so that each paragraph is on one line.

(never)

---


### QuoteProperties <a name="QuoteProperties" id="projen.javascript.biome_config.QuoteProperties"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.QuoteProperties.AS_NEEDED">AS_NEEDED</a></code> | Removes quotes when the property name is valid without them. |
| <code><a href="#projen.javascript.biome_config.QuoteProperties.PRESERVE">PRESERVE</a></code> | Preserves quotes around property names that were quoted in the input. |

---

##### `AS_NEEDED` <a name="AS_NEEDED" id="projen.javascript.biome_config.QuoteProperties.AS_NEEDED"></a>

Removes quotes when the property name is valid without them.

(asNeeded)

---


##### `PRESERVE` <a name="PRESERVE" id="projen.javascript.biome_config.QuoteProperties.PRESERVE"></a>

Preserves quotes around property names that were quoted in the input.

(preserve)

---


### QuoteStyle <a name="QuoteStyle" id="projen.javascript.biome_config.QuoteStyle"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.QuoteStyle.DOUBLE">DOUBLE</a></code> | double. |
| <code><a href="#projen.javascript.biome_config.QuoteStyle.SINGLE">SINGLE</a></code> | single. |

---

##### `DOUBLE` <a name="DOUBLE" id="projen.javascript.biome_config.QuoteStyle.DOUBLE"></a>

double.

---


##### `SINGLE` <a name="SINGLE" id="projen.javascript.biome_config.QuoteStyle.SINGLE"></a>

single.

---


### RuleDomainValue <a name="RuleDomainValue" id="projen.javascript.biome_config.RuleDomainValue"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.RuleDomainValue.ALL">ALL</a></code> | Enables all rules in the domain. |
| <code><a href="#projen.javascript.biome_config.RuleDomainValue.NONE">NONE</a></code> | Disables the domain. |
| <code><a href="#projen.javascript.biome_config.RuleDomainValue.RECOMMENDED">RECOMMENDED</a></code> | Enables the domain's recommended non-nursery rules. |

---

##### `ALL` <a name="ALL" id="projen.javascript.biome_config.RuleDomainValue.ALL"></a>

Enables all rules in the domain.

(all)

---


##### `NONE` <a name="NONE" id="projen.javascript.biome_config.RuleDomainValue.NONE"></a>

Disables the domain.

(none)

---


##### `RECOMMENDED` <a name="RECOMMENDED" id="projen.javascript.biome_config.RuleDomainValue.RECOMMENDED"></a>

Enables the domain's recommended non-nursery rules.

(recommended)

---


### SelfCloseVoidElements <a name="SelfCloseVoidElements" id="projen.javascript.biome_config.SelfCloseVoidElements"></a>

Controls whether HTML void elements such as `<img>` and `<input>` include a slash before `>`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.SelfCloseVoidElements.NEVER">NEVER</a></code> | Removes the slash, for example `<img src="image.png">`. (never). |
| <code><a href="#projen.javascript.biome_config.SelfCloseVoidElements.ALWAYS">ALWAYS</a></code> | Adds the slash, for example `<img src="image.png" />`. (always). |

---

##### `NEVER` <a name="NEVER" id="projen.javascript.biome_config.SelfCloseVoidElements.NEVER"></a>

Removes the slash, for example `<img src="image.png">`. (never).

---


##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.SelfCloseVoidElements.ALWAYS"></a>

Adds the slash, for example `<img src="image.png" />`. (always).

---


### Semicolons <a name="Semicolons" id="projen.javascript.biome_config.Semicolons"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.Semicolons.ALWAYS">ALWAYS</a></code> | always. |
| <code><a href="#projen.javascript.biome_config.Semicolons.AS_NEEDED">AS_NEEDED</a></code> | asNeeded. |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.Semicolons.ALWAYS"></a>

always.

---


##### `AS_NEEDED` <a name="AS_NEEDED" id="projen.javascript.biome_config.Semicolons.AS_NEEDED"></a>

asNeeded.

---


### VcsClientKind <a name="VcsClientKind" id="projen.javascript.biome_config.VcsClientKind"></a>

Integration with Git as the version control client.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.VcsClientKind.GIT">GIT</a></code> | git. |

---

##### `GIT` <a name="GIT" id="projen.javascript.biome_config.VcsClientKind.GIT"></a>

git.

---


### WhitespaceSensitivity <a name="WhitespaceSensitivity" id="projen.javascript.biome_config.WhitespaceSensitivity"></a>

Controls how the formatter treats whitespace around text and child elements in HTML, Vue, Svelte, and Astro markup.

The following two cases won't produce the same output:

|                |      html      |    output    |
| -------------- | :------------: | :----------: |
| with spaces    | `1<b> 2 </b>3` | 1<b> 2 </b>3 |
| without spaces |  `1<b>2</b>3`  |  1<b>2</b>3  |

This happens because whitespace is significant in inline elements.

As a consequence of this, the formatter must format blocks that look like this (assume a small line width, <20):
```html
<span>really long content</span>
```
as this, where the content hugs the tags:
```html
<span
>really long content</span
>
```

Note that this is only necessary for inline elements. Block elements do not have this restriction.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.WhitespaceSensitivity.CSS">CSS</a></code> | Treats whitespace as significant for elements that browsers display inline by default. |
| <code><a href="#projen.javascript.biome_config.WhitespaceSensitivity.STRICT">STRICT</a></code> | Treats leading and trailing whitespace as significant for every element. |
| <code><a href="#projen.javascript.biome_config.WhitespaceSensitivity.IGNORE">IGNORE</a></code> | Treats whitespace as insignificant, allowing the formatter to add or remove it. |

---

##### `CSS` <a name="CSS" id="projen.javascript.biome_config.WhitespaceSensitivity.CSS"></a>

Treats whitespace as significant for elements that browsers display inline by default.

(css)

---


##### `STRICT` <a name="STRICT" id="projen.javascript.biome_config.WhitespaceSensitivity.STRICT"></a>

Treats leading and trailing whitespace as significant for every element.

Existing whitespace
is preserved as at least one character and absent whitespace is not added.

Example of text hugging the tags:
```html
<b
>content</b
>
``` (strict)

---


##### `IGNORE` <a name="IGNORE" id="projen.javascript.biome_config.WhitespaceSensitivity.IGNORE"></a>

Treats whitespace as insignificant, allowing the formatter to add or remove it.

Use this only
when whitespace cannot affect rendered output. (ignore)

---

