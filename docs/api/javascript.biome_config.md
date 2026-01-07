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
| <code><a href="#projen.javascript.biome_config.Actions.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the assist actions recommended by Biome. |
| <code><a href="#projen.javascript.biome_config.Actions.property.source">source</a></code> | <code>projen.javascript.biome_config.Source</code> | *No description.* |

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome_config.Actions.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the assist actions recommended by Biome.

`true` by default.

---

##### `source`<sup>Optional</sup> <a name="source" id="projen.javascript.biome_config.Actions.property.source"></a>

```typescript
public readonly source: Source;
```

- *Type:* projen.javascript.biome_config.Source

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
| <code><a href="#projen.javascript.biome_config.AssistConfiguration.property.actions">actions</a></code> | <code>projen.javascript.biome_config.Actions</code> | Whether Biome should fail in CLI if the assist were not applied to the code. |
| <code><a href="#projen.javascript.biome_config.AssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Whether Biome should enable assist via LSP and CLI. |
| <code><a href="#projen.javascript.biome_config.AssistConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns. |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="projen.javascript.biome_config.AssistConfiguration.property.actions"></a>

```typescript
public readonly actions: Actions;
```

- *Type:* projen.javascript.biome_config.Actions

Whether Biome should fail in CLI if the assist were not applied to the code.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.AssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether Biome should enable assist via LSP and CLI.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.AssistConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns.

Biome will include files/folders that will
match these patterns.

---

### BiomeConfiguration <a name="BiomeConfiguration" id="projen.javascript.biome_config.BiomeConfiguration"></a>

The configuration that is contained inside the file `biome.json`.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.BiomeConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const biomeConfiguration: javascript.biome_config.BiomeConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.AssistConfiguration</code> | Specific configuration for assists. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.css">css</a></code> | <code>projen.javascript.biome_config.CssConfiguration</code> | Specific configuration for the Css language. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.extends">extends</a></code> | <code>string[]</code> | A list of paths to other JSON files, used to extends the current configuration. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.files">files</a></code> | <code>projen.javascript.biome_config.FilesConfiguration</code> | The configuration of the filesystem. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.FormatterConfiguration</code> | The configuration of the formatter. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.graphql">graphql</a></code> | <code>projen.javascript.biome_config.GraphqlConfiguration</code> | Specific configuration for the GraphQL language. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.grit">grit</a></code> | <code>projen.javascript.biome_config.GritConfiguration</code> | Specific configuration for the GraphQL language. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.html">html</a></code> | <code>projen.javascript.biome_config.HtmlConfiguration</code> | Specific configuration for the HTML language. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.javascript">javascript</a></code> | <code>projen.javascript.biome_config.JsConfiguration</code> | Specific configuration for the JavaScript language. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.json">json</a></code> | <code>projen.javascript.biome_config.JsonConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.LinterConfiguration</code> | The configuration for the linter. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.overrides">overrides</a></code> | <code>projen.javascript.biome_config.OverridePattern[]</code> | A list of granular patterns that should be applied only to a sub set of files. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.plugins">plugins</a></code> | <code>string[]</code> | List of plugins to load. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.root">root</a></code> | <code>boolean</code> | Indicates whether this configuration file is at the root of a Biome project. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.schema">schema</a></code> | <code>string</code> | A field for the [JSON schema](https://json-schema.org/) specification. |
| <code><a href="#projen.javascript.biome_config.BiomeConfiguration.property.vcs">vcs</a></code> | <code>projen.javascript.biome_config.VcsConfiguration</code> | The configuration of the VCS integration. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.BiomeConfiguration.property.assist"></a>

```typescript
public readonly assist: AssistConfiguration;
```

- *Type:* projen.javascript.biome_config.AssistConfiguration

Specific configuration for assists.

---

##### `css`<sup>Optional</sup> <a name="css" id="projen.javascript.biome_config.BiomeConfiguration.property.css"></a>

```typescript
public readonly css: CssConfiguration;
```

- *Type:* projen.javascript.biome_config.CssConfiguration

Specific configuration for the Css language.

---

##### `extends`<sup>Optional</sup> <a name="extends" id="projen.javascript.biome_config.BiomeConfiguration.property.extends"></a>

```typescript
public readonly extends: string[];
```

- *Type:* string[]

A list of paths to other JSON files, used to extends the current configuration.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.biome_config.BiomeConfiguration.property.files"></a>

```typescript
public readonly files: FilesConfiguration;
```

- *Type:* projen.javascript.biome_config.FilesConfiguration

The configuration of the filesystem.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.BiomeConfiguration.property.formatter"></a>

```typescript
public readonly formatter: FormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.FormatterConfiguration

The configuration of the formatter.

---

##### `graphql`<sup>Optional</sup> <a name="graphql" id="projen.javascript.biome_config.BiomeConfiguration.property.graphql"></a>

```typescript
public readonly graphql: GraphqlConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlConfiguration

Specific configuration for the GraphQL language.

---

##### `grit`<sup>Optional</sup> <a name="grit" id="projen.javascript.biome_config.BiomeConfiguration.property.grit"></a>

```typescript
public readonly grit: GritConfiguration;
```

- *Type:* projen.javascript.biome_config.GritConfiguration

Specific configuration for the GraphQL language.

---

##### `html`<sup>Optional</sup> <a name="html" id="projen.javascript.biome_config.BiomeConfiguration.property.html"></a>

```typescript
public readonly html: HtmlConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlConfiguration

Specific configuration for the HTML language.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.javascript.biome_config.BiomeConfiguration.property.javascript"></a>

```typescript
public readonly javascript: JsConfiguration;
```

- *Type:* projen.javascript.biome_config.JsConfiguration

Specific configuration for the JavaScript language.

---

##### `json`<sup>Optional</sup> <a name="json" id="projen.javascript.biome_config.BiomeConfiguration.property.json"></a>

```typescript
public readonly json: JsonConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonConfiguration

Specific configuration for the Json language.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.BiomeConfiguration.property.linter"></a>

```typescript
public readonly linter: LinterConfiguration;
```

- *Type:* projen.javascript.biome_config.LinterConfiguration

The configuration for the linter.

---

##### `overrides`<sup>Optional</sup> <a name="overrides" id="projen.javascript.biome_config.BiomeConfiguration.property.overrides"></a>

```typescript
public readonly overrides: OverridePattern[];
```

- *Type:* projen.javascript.biome_config.OverridePattern[]

A list of granular patterns that should be applied only to a sub set of files.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.javascript.biome_config.BiomeConfiguration.property.plugins"></a>

```typescript
public readonly plugins: string[];
```

- *Type:* string[]

List of plugins to load.

---

##### `root`<sup>Optional</sup> <a name="root" id="projen.javascript.biome_config.BiomeConfiguration.property.root"></a>

```typescript
public readonly root: boolean;
```

- *Type:* boolean

Indicates whether this configuration file is at the root of a Biome project.

By default, this is `true`.

---

##### `schema`<sup>Optional</sup> <a name="schema" id="projen.javascript.biome_config.BiomeConfiguration.property.schema"></a>

```typescript
public readonly schema: string;
```

- *Type:* string

A field for the [JSON schema](https://json-schema.org/) specification.

---

##### `vcs`<sup>Optional</sup> <a name="vcs" id="projen.javascript.biome_config.BiomeConfiguration.property.vcs"></a>

```typescript
public readonly vcs: VcsConfiguration;
```

- *Type:* projen.javascript.biome_config.VcsConfiguration

The configuration of the VCS integration.

---

### CssAssistConfiguration <a name="CssAssistConfiguration" id="projen.javascript.biome_config.CssAssistConfiguration"></a>

Options that changes how the CSS assist behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssAssistConfiguration: javascript.biome_config.CssAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the assist for CSS files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.CssAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the assist for CSS files.

---

### CssConfiguration <a name="CssConfiguration" id="projen.javascript.biome_config.CssConfiguration"></a>

Options applied to CSS files.

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
| <code><a href="#projen.javascript.biome_config.CssConfiguration.property.globals">globals</a></code> | <code>string[]</code> | CSS globals. |
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

CSS globals.

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

Options that changes how the CSS formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssFormatterConfiguration: javascript.biome_config.CssFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.CssFormatterConfiguration.property.quoteStyle">quoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | The type of quotes used in CSS code. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.CssFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for CSS (and its super languages) files.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.CssFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to CSS (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.CssFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to CSS (and its super languages) files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.CssFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to CSS (and its super languages) files.

`auto` uses CRLF on Windows and LF on other platforms.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.CssFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to CSS (and its super languages) files.

Defaults to 80.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome_config.CssFormatterConfiguration.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double.

The type of quotes used in CSS code.

Defaults to double.

---

### CssLinterConfiguration <a name="CssLinterConfiguration" id="projen.javascript.biome_config.CssLinterConfiguration"></a>

Options that changes how the CSS linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssLinterConfiguration: javascript.biome_config.CssLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for CSS files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.CssLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for CSS files.

---

### CssParserConfiguration <a name="CssParserConfiguration" id="projen.javascript.biome_config.CssParserConfiguration"></a>

Options that changes how the CSS parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.CssParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const cssParserConfiguration: javascript.biome_config.CssParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.CssParserConfiguration.property.allowWrongLineComments">allowWrongLineComments</a></code> | <code>boolean</code> | Allow comments to appear on incorrect lines in `.css` files. |
| <code><a href="#projen.javascript.biome_config.CssParserConfiguration.property.cssModules">cssModules</a></code> | <code>boolean</code> | Enables parsing of CSS Modules specific features. |
| <code><a href="#projen.javascript.biome_config.CssParserConfiguration.property.tailwindDirectives">tailwindDirectives</a></code> | <code>boolean</code> | Enables parsing of Tailwind CSS 4.0 directives and functions. |

---

##### `allowWrongLineComments`<sup>Optional</sup> <a name="allowWrongLineComments" id="projen.javascript.biome_config.CssParserConfiguration.property.allowWrongLineComments"></a>

```typescript
public readonly allowWrongLineComments: boolean;
```

- *Type:* boolean

Allow comments to appear on incorrect lines in `.css` files.

---

##### `cssModules`<sup>Optional</sup> <a name="cssModules" id="projen.javascript.biome_config.CssParserConfiguration.property.cssModules"></a>

```typescript
public readonly cssModules: boolean;
```

- *Type:* boolean

Enables parsing of CSS Modules specific features.

---

##### `tailwindDirectives`<sup>Optional</sup> <a name="tailwindDirectives" id="projen.javascript.biome_config.CssParserConfiguration.property.tailwindDirectives"></a>

```typescript
public readonly tailwindDirectives: boolean;
```

- *Type:* boolean

Enables parsing of Tailwind CSS 4.0 directives and functions.

---

### FilesConfiguration <a name="FilesConfiguration" id="projen.javascript.biome_config.FilesConfiguration"></a>

The configuration of the filesystem.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.FilesConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const filesConfiguration: javascript.biome_config.FilesConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.experimentalScannerIgnores">experimentalScannerIgnores</a></code> | <code>string[]</code> | **Deprecated:** Please use _force-ignore syntax_ in `files.includes` instead: <https://biomejs.dev/reference/configuration/#filesincludes>. |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.ignoreUnknown">ignoreUnknown</a></code> | <code>boolean</code> | Tells Biome to not emit diagnostics when handling files that it doesn't know. |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns. |
| <code><a href="#projen.javascript.biome_config.FilesConfiguration.property.maxSize">maxSize</a></code> | <code>number</code> | The maximum allowed size for source code files in bytes. |

---

##### `experimentalScannerIgnores`<sup>Optional</sup> <a name="experimentalScannerIgnores" id="projen.javascript.biome_config.FilesConfiguration.property.experimentalScannerIgnores"></a>

```typescript
public readonly experimentalScannerIgnores: string[];
```

- *Type:* string[]

**Deprecated:** Please use _force-ignore syntax_ in `files.includes` instead: <https://biomejs.dev/reference/configuration/#filesincludes>.

Set of file and folder names that should be unconditionally ignored by
Biome's scanner.

---

##### `ignoreUnknown`<sup>Optional</sup> <a name="ignoreUnknown" id="projen.javascript.biome_config.FilesConfiguration.property.ignoreUnknown"></a>

```typescript
public readonly ignoreUnknown: boolean;
```

- *Type:* boolean

Tells Biome to not emit diagnostics when handling files that it doesn't know.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.FilesConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns.

Biome will handle only those files/folders that will
match these patterns.

---

##### `maxSize`<sup>Optional</sup> <a name="maxSize" id="projen.javascript.biome_config.FilesConfiguration.property.maxSize"></a>

```typescript
public readonly maxSize: number;
```

- *Type:* number
- *Default:* 1 MiB

The maximum allowed size for source code files in bytes.

Files above
this limit will be ignored for performance reasons. Defaults to 1 MiB

---

### FormatterConfiguration <a name="FormatterConfiguration" id="projen.javascript.biome_config.FormatterConfiguration"></a>

Generic options applied to all files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.FormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const formatterConfiguration: javascript.biome_config.FormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style in HTML-ish languages. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Put the `>` of a multi-line HTML or JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements). |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Whether to expand arrays and objects on multiple lines. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.formatWithErrors">formatWithErrors</a></code> | <code>boolean</code> | Whether formatting should be allowed to proceed if a given file has syntax errors. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation, 2 by default. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line. |
| <code><a href="#projen.javascript.biome_config.FormatterConfiguration.property.useEditorconfig">useEditorconfig</a></code> | <code>boolean</code> | Use any `.editorconfig` files to configure the formatter. Configuration in `biome.json` will override `.editorconfig` configuration. |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.FormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition
- *Default:* auto.

The attribute position style in HTML-ish languages.

Defaults to auto.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.FormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean

Put the `>` of a multi-line HTML or JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.FormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean
- *Default:* true.

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.FormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.FormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand
- *Default:* auto".

Whether to expand arrays and objects on multiple lines.

When set to `auto`, object literals are formatted on multiple lines if the first property has a newline,
and array literals are formatted on a single line if it fits in the line.
When set to `always`, these literals are formatted on multiple lines, regardless of length of the list.
When set to `never`, these literals are formatted on a single line if it fits in the line.
When formatting `package.json`, Biome will use `always` unless configured otherwise. Defaults to "auto".

---

##### `formatWithErrors`<sup>Optional</sup> <a name="formatWithErrors" id="projen.javascript.biome_config.FormatterConfiguration.property.formatWithErrors"></a>

```typescript
public readonly formatWithErrors: boolean;
```

- *Type:* boolean

Whether formatting should be allowed to proceed if a given file has syntax errors.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.FormatterConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns.

The formatter will include files/folders that will
match these patterns.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.FormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.FormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation, 2 by default.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.FormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.FormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line.

Defaults to 80.

---

##### `useEditorconfig`<sup>Optional</sup> <a name="useEditorconfig" id="projen.javascript.biome_config.FormatterConfiguration.property.useEditorconfig"></a>

```typescript
public readonly useEditorconfig: boolean;
```

- *Type:* boolean

Use any `.editorconfig` files to configure the formatter. Configuration in `biome.json` will override `.editorconfig` configuration.

Default: `true`.

---

### GraphqlAssistConfiguration <a name="GraphqlAssistConfiguration" id="projen.javascript.biome_config.GraphqlAssistConfiguration"></a>

Options that changes how the GraphQL linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GraphqlAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const graphqlAssistConfiguration: javascript.biome_config.GraphqlAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GraphqlAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for GraphQL files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GraphqlAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for GraphQL files.

---

### GraphqlConfiguration <a name="GraphqlConfiguration" id="projen.javascript.biome_config.GraphqlConfiguration"></a>

Options applied to GraphQL files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GraphqlConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const graphqlConfiguration: javascript.biome_config.GraphqlConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GraphqlConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.GraphqlAssistConfiguration</code> | Assist options. |
| <code><a href="#projen.javascript.biome_config.GraphqlConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.GraphqlFormatterConfiguration</code> | GraphQL formatter options. |
| <code><a href="#projen.javascript.biome_config.GraphqlConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.GraphqlLinterConfiguration</code> | *No description.* |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.GraphqlConfiguration.property.assist"></a>

```typescript
public readonly assist: GraphqlAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlAssistConfiguration

Assist options.

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

---

### GraphqlFormatterConfiguration <a name="GraphqlFormatterConfiguration" id="projen.javascript.biome_config.GraphqlFormatterConfiguration"></a>

Options that changes how the GraphQL formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const graphqlFormatterConfiguration: javascript.biome_config.GraphqlFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to GraphQL files. |
| <code><a href="#projen.javascript.biome_config.GraphqlFormatterConfiguration.property.quoteStyle">quoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | The type of quotes used in GraphQL code. |

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean
- *Default:* true.

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for GraphQL files.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to GraphQL files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to GraphQL files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to GraphQL files.

`auto` uses CRLF on Windows and LF on other platforms.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to GraphQL files.

Defaults to 80.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome_config.GraphqlFormatterConfiguration.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double.

The type of quotes used in GraphQL code.

Defaults to double.

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
| <code><a href="#projen.javascript.biome_config.GraphqlLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for GraphQL files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GraphqlLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for GraphQL files.

---

### GritAssistConfiguration <a name="GritAssistConfiguration" id="projen.javascript.biome_config.GritAssistConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritAssistConfiguration: javascript.biome_config.GritAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the assist functionality for Grit files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GritAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the assist functionality for Grit files.

---

### GritConfiguration <a name="GritConfiguration" id="projen.javascript.biome_config.GritConfiguration"></a>

Options applied to GritQL files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritConfiguration: javascript.biome_config.GritConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.GritAssistConfiguration</code> | Assist options. |
| <code><a href="#projen.javascript.biome_config.GritConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.GritFormatterConfiguration</code> | Formatting options. |
| <code><a href="#projen.javascript.biome_config.GritConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.GritLinterConfiguration</code> | Formatting options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.GritConfiguration.property.assist"></a>

```typescript
public readonly assist: GritAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.GritAssistConfiguration

Assist options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.GritConfiguration.property.formatter"></a>

```typescript
public readonly formatter: GritFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.GritFormatterConfiguration

Formatting options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.GritConfiguration.property.linter"></a>

```typescript
public readonly linter: GritLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.GritLinterConfiguration

Formatting options.

---

### GritFormatterConfiguration <a name="GritFormatterConfiguration" id="projen.javascript.biome_config.GritFormatterConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritFormatterConfiguration: javascript.biome_config.GritFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for Grit files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to Grit files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to Grit files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to Grit files. |
| <code><a href="#projen.javascript.biome_config.GritFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to Grit files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GritFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for Grit files.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.GritFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to Grit files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.GritFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to Grit files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.GritFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to Grit files.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.GritFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to Grit files.

Defaults to 80.

---

### GritLinterConfiguration <a name="GritLinterConfiguration" id="projen.javascript.biome_config.GritLinterConfiguration"></a>

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.GritLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const gritLinterConfiguration: javascript.biome_config.GritLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.GritLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for Grit files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.GritLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for Grit files.

---

### HtmlAssistConfiguration <a name="HtmlAssistConfiguration" id="projen.javascript.biome_config.HtmlAssistConfiguration"></a>

Options that changes how the HTML assist behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlAssistConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlAssistConfiguration: javascript.biome_config.HtmlAssistConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the assist for HTML (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.HtmlAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the assist for HTML (and its super languages) files.

---

### HtmlConfiguration <a name="HtmlConfiguration" id="projen.javascript.biome_config.HtmlConfiguration"></a>

Options applied to HTML files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlConfiguration: javascript.biome_config.HtmlConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.HtmlAssistConfiguration</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.experimentalFullSupportEnabled">experimentalFullSupportEnabled</a></code> | <code>boolean</code> | Enables full support for HTML, Vue, Svelte and Astro files. |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.HtmlFormatterConfiguration</code> | HTML formatter options. |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.HtmlLinterConfiguration</code> | HTML linter options. |
| <code><a href="#projen.javascript.biome_config.HtmlConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome_config.HtmlParserConfiguration</code> | HTML parsing options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.HtmlConfiguration.property.assist"></a>

```typescript
public readonly assist: HtmlAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlAssistConfiguration

---

##### `experimentalFullSupportEnabled`<sup>Optional</sup> <a name="experimentalFullSupportEnabled" id="projen.javascript.biome_config.HtmlConfiguration.property.experimentalFullSupportEnabled"></a>

```typescript
public readonly experimentalFullSupportEnabled: boolean;
```

- *Type:* boolean

Enables full support for HTML, Vue, Svelte and Astro files.

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

Options that changes how the HTML formatter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlFormatterConfiguration: javascript.biome_config.HtmlFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style in HTML elements. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Whether to hug the closing bracket of multiline HTML tags to the end of the last line, rather than being alone on the following line. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for HTML (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentScriptAndStyle">indentScriptAndStyle</a></code> | <code>boolean</code> | Whether to indent the `<script>` and `<style>` tags for HTML (and its super languages). |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to HTML (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to HTML (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to HTML (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to HTML (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.selfCloseVoidElements">selfCloseVoidElements</a></code> | <code>projen.javascript.biome_config.SelfCloseVoidElements</code> | Whether void elements should be self-closed. |
| <code><a href="#projen.javascript.biome_config.HtmlFormatterConfiguration.property.whitespaceSensitivity">whitespaceSensitivity</a></code> | <code>projen.javascript.biome_config.WhitespaceSensitivity</code> | Whether to account for whitespace sensitivity when formatting HTML (and its super languages). |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition
- *Default:* auto.

The attribute position style in HTML elements.

Defaults to auto.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean
- *Default:* false.

Whether to hug the closing bracket of multiline HTML tags to the end of the last line, rather than being alone on the following line.

Defaults to false.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for HTML (and its super languages) files.

---

##### `indentScriptAndStyle`<sup>Optional</sup> <a name="indentScriptAndStyle" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentScriptAndStyle"></a>

```typescript
public readonly indentScriptAndStyle: boolean;
```

- *Type:* boolean
- *Default:* false.

Whether to indent the `<script>` and `<style>` tags for HTML (and its super languages).

Defaults to false.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to HTML (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to HTML (and its super languages) files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to HTML (and its super languages) files.

`auto` uses CRLF on Windows and LF on other platforms.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to HTML (and its super languages) files.

Defaults to 80.

---

##### `selfCloseVoidElements`<sup>Optional</sup> <a name="selfCloseVoidElements" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.selfCloseVoidElements"></a>

```typescript
public readonly selfCloseVoidElements: SelfCloseVoidElements;
```

- *Type:* projen.javascript.biome_config.SelfCloseVoidElements
- *Default:* never.

Whether void elements should be self-closed.

Defaults to never.

---

##### `whitespaceSensitivity`<sup>Optional</sup> <a name="whitespaceSensitivity" id="projen.javascript.biome_config.HtmlFormatterConfiguration.property.whitespaceSensitivity"></a>

```typescript
public readonly whitespaceSensitivity: WhitespaceSensitivity;
```

- *Type:* projen.javascript.biome_config.WhitespaceSensitivity
- *Default:* css".

Whether to account for whitespace sensitivity when formatting HTML (and its super languages).

Defaults to "css".

---

### HtmlLinterConfiguration <a name="HtmlLinterConfiguration" id="projen.javascript.biome_config.HtmlLinterConfiguration"></a>

Options that changes how the HTML linter behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlLinterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlLinterConfiguration: javascript.biome_config.HtmlLinterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for HTML (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.HtmlLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for HTML (and its super languages) files.

---

### HtmlParserConfiguration <a name="HtmlParserConfiguration" id="projen.javascript.biome_config.HtmlParserConfiguration"></a>

Options that changes how the HTML parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.HtmlParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const htmlParserConfiguration: javascript.biome_config.HtmlParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.HtmlParserConfiguration.property.interpolation">interpolation</a></code> | <code>boolean</code> | Enables the parsing of double text expressions such as `{{ expression }}` inside `.html` files. |

---

##### `interpolation`<sup>Optional</sup> <a name="interpolation" id="projen.javascript.biome_config.HtmlParserConfiguration.property.interpolation"></a>

```typescript
public readonly interpolation: boolean;
```

- *Type:* boolean

Enables the parsing of double text expressions such as `{{ expression }}` inside `.html` files.

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
| <code><a href="#projen.javascript.biome_config.JsAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the assist for JavaScript (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the assist for JavaScript (and its super languages) files.

---

### JsConfiguration <a name="JsConfiguration" id="projen.javascript.biome_config.JsConfiguration"></a>

A set of options applied to the JavaScript files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsConfiguration: javascript.biome_config.JsConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.assist">assist</a></code> | <code>projen.javascript.biome_config.JsAssistConfiguration</code> | Assist options. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.JsFormatterConfiguration</code> | Formatting options. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.globals">globals</a></code> | <code>string[]</code> | A list of global bindings that should be ignored by the analyzers. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.jsxRuntime">jsxRuntime</a></code> | <code>projen.javascript.biome_config.JsxRuntime</code> | Indicates the type of runtime or transformation used for interpreting JSX. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome_config.JsLinterConfiguration</code> | Linter options. |
| <code><a href="#projen.javascript.biome_config.JsConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome_config.JsParserConfiguration</code> | Parsing options. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.JsConfiguration.property.assist"></a>

```typescript
public readonly assist: JsAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.JsAssistConfiguration

Assist options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.JsConfiguration.property.formatter"></a>

```typescript
public readonly formatter: JsFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.JsFormatterConfiguration

Formatting options.

---

##### `globals`<sup>Optional</sup> <a name="globals" id="projen.javascript.biome_config.JsConfiguration.property.globals"></a>

```typescript
public readonly globals: string[];
```

- *Type:* string[]

A list of global bindings that should be ignored by the analyzers.

If defined here, they should not emit diagnostics.

---

##### `jsxRuntime`<sup>Optional</sup> <a name="jsxRuntime" id="projen.javascript.biome_config.JsConfiguration.property.jsxRuntime"></a>

```typescript
public readonly jsxRuntime: JsxRuntime;
```

- *Type:* projen.javascript.biome_config.JsxRuntime

Indicates the type of runtime or transformation used for interpreting JSX.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.JsConfiguration.property.linter"></a>

```typescript
public readonly linter: JsLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.JsLinterConfiguration

Linter options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome_config.JsConfiguration.property.parser"></a>

```typescript
public readonly parser: JsParserConfiguration;
```

- *Type:* projen.javascript.biome_config.JsParserConfiguration

Parsing options.

---

### JsFormatterConfiguration <a name="JsFormatterConfiguration" id="projen.javascript.biome_config.JsFormatterConfiguration"></a>

Formatting options specific to the JavaScript files.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsFormatterConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsFormatterConfiguration: javascript.biome_config.JsFormatterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.arrowParentheses">arrowParentheses</a></code> | <code>projen.javascript.biome_config.ArrowParentheses</code> | Whether to add non-necessary parentheses to arrow functions. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style in JSX elements. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line, rather than being alone on the following line. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Whether to expand arrays and objects on multiple lines. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.jsxQuoteStyle">jsxQuoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | The type of quotes used in JSX. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.operatorLinebreak">operatorLinebreak</a></code> | <code>projen.javascript.biome_config.OperatorLinebreak</code> | When breaking binary expressions into multiple lines, whether to break them before or after the binary operator. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.quoteProperties">quoteProperties</a></code> | <code>projen.javascript.biome_config.QuoteProperties</code> | When properties in objects are quoted. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.quoteStyle">quoteStyle</a></code> | <code>projen.javascript.biome_config.QuoteStyle</code> | The type of quotes used in JavaScript code. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.semicolons">semicolons</a></code> | <code>projen.javascript.biome_config.Semicolons</code> | Whether the formatter prints semicolons for all statements or only in for statements where it is necessary because of ASI. |
| <code><a href="#projen.javascript.biome_config.JsFormatterConfiguration.property.trailingCommas">trailingCommas</a></code> | <code>projen.javascript.biome_config.JsTrailingCommas</code> | Print trailing commas wherever possible in multi-line comma-separated syntactic structures. |

---

##### `arrowParentheses`<sup>Optional</sup> <a name="arrowParentheses" id="projen.javascript.biome_config.JsFormatterConfiguration.property.arrowParentheses"></a>

```typescript
public readonly arrowParentheses: ArrowParentheses;
```

- *Type:* projen.javascript.biome_config.ArrowParentheses
- *Default:* always".

Whether to add non-necessary parentheses to arrow functions.

Defaults to "always".

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.JsFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition
- *Default:* auto.

The attribute position style in JSX elements.

Defaults to auto.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean
- *Default:* false.

Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line, rather than being alone on the following line.

Defaults to false.

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.JsFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean
- *Default:* true.

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for JavaScript (and its super languages) files.

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.JsFormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand
- *Default:* auto".

Whether to expand arrays and objects on multiple lines.

When set to `auto`, object literals are formatted on multiple lines if the first property has a newline,
and array literals are formatted on a single line if it fits in the line.
When set to `always`, these literals are formatted on multiple lines, regardless of length of the list.
When set to `never`, these literals are formatted on a single line if it fits in the line.
When formatting `package.json`, Biome will use `always` unless configured otherwise. Defaults to "auto".

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.JsFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to JavaScript (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.JsFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to JavaScript (and its super languages) files.

Default to 2.

---

##### `jsxQuoteStyle`<sup>Optional</sup> <a name="jsxQuoteStyle" id="projen.javascript.biome_config.JsFormatterConfiguration.property.jsxQuoteStyle"></a>

```typescript
public readonly jsxQuoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double.

The type of quotes used in JSX.

Defaults to double.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.JsFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to JavaScript (and its super languages) files.

`auto` uses CRLF on Windows and LF on other platforms.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.JsFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to JavaScript (and its super languages) files.

Defaults to 80.

---

##### `operatorLinebreak`<sup>Optional</sup> <a name="operatorLinebreak" id="projen.javascript.biome_config.JsFormatterConfiguration.property.operatorLinebreak"></a>

```typescript
public readonly operatorLinebreak: OperatorLinebreak;
```

- *Type:* projen.javascript.biome_config.OperatorLinebreak
- *Default:* after".

When breaking binary expressions into multiple lines, whether to break them before or after the binary operator.

Defaults to "after".

---

##### `quoteProperties`<sup>Optional</sup> <a name="quoteProperties" id="projen.javascript.biome_config.JsFormatterConfiguration.property.quoteProperties"></a>

```typescript
public readonly quoteProperties: QuoteProperties;
```

- *Type:* projen.javascript.biome_config.QuoteProperties
- *Default:* asNeeded.

When properties in objects are quoted.

Defaults to asNeeded.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome_config.JsFormatterConfiguration.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: QuoteStyle;
```

- *Type:* projen.javascript.biome_config.QuoteStyle
- *Default:* double.

The type of quotes used in JavaScript code.

Defaults to double.

---

##### `semicolons`<sup>Optional</sup> <a name="semicolons" id="projen.javascript.biome_config.JsFormatterConfiguration.property.semicolons"></a>

```typescript
public readonly semicolons: Semicolons;
```

- *Type:* projen.javascript.biome_config.Semicolons

Whether the formatter prints semicolons for all statements or only in for statements where it is necessary because of ASI.

---

##### `trailingCommas`<sup>Optional</sup> <a name="trailingCommas" id="projen.javascript.biome_config.JsFormatterConfiguration.property.trailingCommas"></a>

```typescript
public readonly trailingCommas: JsTrailingCommas;
```

- *Type:* projen.javascript.biome_config.JsTrailingCommas
- *Default:* all".

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

Defaults to "all".

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
| <code><a href="#projen.javascript.biome_config.JsLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for JavaScript (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for JavaScript (and its super languages) files.

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
| <code><a href="#projen.javascript.biome_config.JsonAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the assist for JSON (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsonAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the assist for JSON (and its super languages) files.

---

### JsonConfiguration <a name="JsonConfiguration" id="projen.javascript.biome_config.JsonConfiguration"></a>

Options applied to JSON files.

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
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Whether to expand arrays and objects on multiple lines. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome_config.JsonFormatterConfiguration.property.trailingCommas">trailingCommas</a></code> | <code>projen.javascript.biome_config.JsonTrailingCommas</code> | Print trailing commas wherever possible in multi-line comma-separated syntactic structures. |

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean
- *Default:* true.

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for JSON (and its super languages) files.

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand
- *Default:* auto".

Whether to expand arrays and objects on multiple lines.

When set to `auto`, object literals are formatted on multiple lines if the first property has a newline,
and array literals are formatted on a single line if it fits in the line.
When set to `always`, these literals are formatted on multiple lines, regardless of length of the list.
When set to `never`, these literals are formatted on a single line if it fits in the line.
When formatting `package.json`, Biome will use `always` unless configured otherwise. Defaults to "auto".

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style applied to JSON (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number
- *Default:* 2.

The size of the indentation applied to JSON (and its super languages) files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending applied to JSON (and its super languages) files.

`auto` uses CRLF on Windows and LF on other platforms.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line applied to JSON (and its super languages) files.

Defaults to 80.

---

##### `trailingCommas`<sup>Optional</sup> <a name="trailingCommas" id="projen.javascript.biome_config.JsonFormatterConfiguration.property.trailingCommas"></a>

```typescript
public readonly trailingCommas: JsonTrailingCommas;
```

- *Type:* projen.javascript.biome_config.JsonTrailingCommas
- *Default:* none".

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

Defaults to "none".

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
| <code><a href="#projen.javascript.biome_config.JsonLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for JSON (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.JsonLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for JSON (and its super languages) files.

---

### JsonParserConfiguration <a name="JsonParserConfiguration" id="projen.javascript.biome_config.JsonParserConfiguration"></a>

Options that changes how the JSON parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsonParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsonParserConfiguration: javascript.biome_config.JsonParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsonParserConfiguration.property.allowComments">allowComments</a></code> | <code>boolean</code> | Allow parsing comments in `.json` files. |
| <code><a href="#projen.javascript.biome_config.JsonParserConfiguration.property.allowTrailingCommas">allowTrailingCommas</a></code> | <code>boolean</code> | Allow parsing trailing commas in `.json` files. |

---

##### `allowComments`<sup>Optional</sup> <a name="allowComments" id="projen.javascript.biome_config.JsonParserConfiguration.property.allowComments"></a>

```typescript
public readonly allowComments: boolean;
```

- *Type:* boolean

Allow parsing comments in `.json` files.

---

##### `allowTrailingCommas`<sup>Optional</sup> <a name="allowTrailingCommas" id="projen.javascript.biome_config.JsonParserConfiguration.property.allowTrailingCommas"></a>

```typescript
public readonly allowTrailingCommas: boolean;
```

- *Type:* boolean

Allow parsing trailing commas in `.json` files.

---

### JsParserConfiguration <a name="JsParserConfiguration" id="projen.javascript.biome_config.JsParserConfiguration"></a>

Options that changes how the JavaScript parser behaves.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.JsParserConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const jsParserConfiguration: javascript.biome_config.JsParserConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.JsParserConfiguration.property.gritMetavariables">gritMetavariables</a></code> | <code>boolean</code> | Enables parsing of Grit metavariables. |
| <code><a href="#projen.javascript.biome_config.JsParserConfiguration.property.jsxEverywhere">jsxEverywhere</a></code> | <code>boolean</code> | When enabled, files like `.js`/`.mjs`/`.cjs` may contain JSX syntax. |
| <code><a href="#projen.javascript.biome_config.JsParserConfiguration.property.unsafeParameterDecoratorsEnabled">unsafeParameterDecoratorsEnabled</a></code> | <code>boolean</code> | It enables the experimental and unsafe parsing of parameter decorators. |

---

##### `gritMetavariables`<sup>Optional</sup> <a name="gritMetavariables" id="projen.javascript.biome_config.JsParserConfiguration.property.gritMetavariables"></a>

```typescript
public readonly gritMetavariables: boolean;
```

- *Type:* boolean
- *Default:* false`.

Enables parsing of Grit metavariables.

Defaults to `false`.

---

##### `jsxEverywhere`<sup>Optional</sup> <a name="jsxEverywhere" id="projen.javascript.biome_config.JsParserConfiguration.property.jsxEverywhere"></a>

```typescript
public readonly jsxEverywhere: boolean;
```

- *Type:* boolean
- *Default:* true`.

When enabled, files like `.js`/`.mjs`/`.cjs` may contain JSX syntax.

Defaults to `true`.

---

##### `unsafeParameterDecoratorsEnabled`<sup>Optional</sup> <a name="unsafeParameterDecoratorsEnabled" id="projen.javascript.biome_config.JsParserConfiguration.property.unsafeParameterDecoratorsEnabled"></a>

```typescript
public readonly unsafeParameterDecoratorsEnabled: boolean;
```

- *Type:* boolean

It enables the experimental and unsafe parsing of parameter decorators.

These decorators belong to an old proposal, and they are subject to change.

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
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.domains">domains</a></code> | <code>{[ key: string ]: projen.javascript.biome_config.RuleDomainValue}</code> | An object where the keys are the names of the domains, and the values are `all`, `recommended`, or `none`. |
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | if `false`, it disables the feature and the linter won't be executed. |
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns. |
| <code><a href="#projen.javascript.biome_config.LinterConfiguration.property.rules">rules</a></code> | <code>projen.javascript.biome_config.Rules</code> | List of rules. |

---

##### `domains`<sup>Optional</sup> <a name="domains" id="projen.javascript.biome_config.LinterConfiguration.property.domains"></a>

```typescript
public readonly domains: {[ key: string ]: RuleDomainValue};
```

- *Type:* {[ key: string ]: projen.javascript.biome_config.RuleDomainValue}

An object where the keys are the names of the domains, and the values are `all`, `recommended`, or `none`.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.LinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

if `false`, it disables the feature and the linter won't be executed.

`true` by default

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.LinterConfiguration.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns.

The analyzer will handle only those files/folders that will
match these patterns.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.biome_config.LinterConfiguration.property.rules"></a>

```typescript
public readonly rules: Rules;
```

- *Type:* projen.javascript.biome_config.Rules

List of rules.

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
| <code><a href="#projen.javascript.biome_config.OverrideAssistConfiguration.property.actions">actions</a></code> | <code>projen.javascript.biome_config.Actions</code> | List of actions. |
| <code><a href="#projen.javascript.biome_config.OverrideAssistConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | if `false`, it disables the feature and the assist won't be executed. |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="projen.javascript.biome_config.OverrideAssistConfiguration.property.actions"></a>

```typescript
public readonly actions: Actions;
```

- *Type:* projen.javascript.biome_config.Actions

List of actions.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.OverrideAssistConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

if `false`, it disables the feature and the assist won't be executed.

`true` by default

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
| <code><a href="#projen.javascript.biome_config.OverrideFilesConfiguration.property.maxSize">maxSize</a></code> | <code>number</code> | File size limit in bytes. |

---

##### `maxSize`<sup>Optional</sup> <a name="maxSize" id="projen.javascript.biome_config.OverrideFilesConfiguration.property.maxSize"></a>

```typescript
public readonly maxSize: number;
```

- *Type:* number

File size limit in bytes.

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
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>projen.javascript.biome_config.AttributePosition</code> | The attribute position style. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Put the `>` of a multi-line HTML or JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements). |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.expand">expand</a></code> | <code>projen.javascript.biome_config.Expand</code> | Whether to expand arrays and objects on multiple lines. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.formatWithErrors">formatWithErrors</a></code> | <code>boolean</code> | Stores whether formatting should be allowed to proceed if a given file has syntax errors. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentSize">indentSize</a></code> | <code>number</code> | The size of the indentation, 2 by default (deprecated, use `indent-width`). |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>projen.javascript.biome_config.IndentStyle</code> | The indent style. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation, 2 by default. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>projen.javascript.biome_config.LineEnding</code> | The type of line ending. |
| <code><a href="#projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line. |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: AttributePosition;
```

- *Type:* projen.javascript.biome_config.AttributePosition

The attribute position style.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean

Put the `>` of a multi-line HTML or JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean
- *Default:* true.

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

##### `expand`<sup>Optional</sup> <a name="expand" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.expand"></a>

```typescript
public readonly expand: Expand;
```

- *Type:* projen.javascript.biome_config.Expand
- *Default:* auto".

Whether to expand arrays and objects on multiple lines.

When set to `auto`, object literals are formatted on multiple lines if the first property has a newline,
and array literals are formatted on a single line if it fits in the line.
When set to `always`, these literals are formatted on multiple lines, regardless of length of the list.
When set to `never`, these literals are formatted on a single line if it fits in the line.
When formatting `package.json`, Biome will use `always` unless configured otherwise. Defaults to "auto".

---

##### `formatWithErrors`<sup>Optional</sup> <a name="formatWithErrors" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.formatWithErrors"></a>

```typescript
public readonly formatWithErrors: boolean;
```

- *Type:* boolean

Stores whether formatting should be allowed to proceed if a given file has syntax errors.

---

##### `indentSize`<sup>Optional</sup> <a name="indentSize" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentSize"></a>

```typescript
public readonly indentSize: number;
```

- *Type:* number

The size of the indentation, 2 by default (deprecated, use `indent-width`).

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: IndentStyle;
```

- *Type:* projen.javascript.biome_config.IndentStyle

The indent style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation, 2 by default.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: LineEnding;
```

- *Type:* projen.javascript.biome_config.LineEnding

The type of line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome_config.OverrideFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number
- *Default:* 80.

What's the max width of a line.

Defaults to 80.

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
| <code><a href="#projen.javascript.biome_config.OverrideLinterConfiguration.property.domains">domains</a></code> | <code>{[ key: string ]: projen.javascript.biome_config.RuleDomainValue}</code> | List of rules. |
| <code><a href="#projen.javascript.biome_config.OverrideLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | if `false`, it disables the feature and the linter won't be executed. |
| <code><a href="#projen.javascript.biome_config.OverrideLinterConfiguration.property.rules">rules</a></code> | <code>projen.javascript.biome_config.Rules</code> | List of rules. |

---

##### `domains`<sup>Optional</sup> <a name="domains" id="projen.javascript.biome_config.OverrideLinterConfiguration.property.domains"></a>

```typescript
public readonly domains: {[ key: string ]: RuleDomainValue};
```

- *Type:* {[ key: string ]: projen.javascript.biome_config.RuleDomainValue}

List of rules.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.OverrideLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

if `false`, it disables the feature and the linter won't be executed.

`true` by default

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.biome_config.OverrideLinterConfiguration.property.rules"></a>

```typescript
public readonly rules: Rules;
```

- *Type:* projen.javascript.biome_config.Rules

List of rules.

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
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.assist">assist</a></code> | <code>projen.javascript.biome_config.OverrideAssistConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.css">css</a></code> | <code>projen.javascript.biome_config.CssConfiguration</code> | Specific configuration for the CSS language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.files">files</a></code> | <code>projen.javascript.biome_config.OverrideFilesConfiguration</code> | Specific configuration for the filesystem. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.formatter">formatter</a></code> | <code>projen.javascript.biome_config.OverrideFormatterConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.graphql">graphql</a></code> | <code>projen.javascript.biome_config.GraphqlConfiguration</code> | Specific configuration for the Graphql language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.grit">grit</a></code> | <code>projen.javascript.biome_config.GritConfiguration</code> | Specific configuration for the GritQL language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.html">html</a></code> | <code>projen.javascript.biome_config.HtmlConfiguration</code> | Specific configuration for the GritQL language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.includes">includes</a></code> | <code>string[]</code> | A list of glob patterns. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.javascript">javascript</a></code> | <code>projen.javascript.biome_config.JsConfiguration</code> | Specific configuration for the JavaScript language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.json">json</a></code> | <code>projen.javascript.biome_config.JsonConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.linter">linter</a></code> | <code>projen.javascript.biome_config.OverrideLinterConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome_config.OverridePattern.property.plugins">plugins</a></code> | <code>string[]</code> | Specific configuration for additional plugins. |

---

##### `assist`<sup>Optional</sup> <a name="assist" id="projen.javascript.biome_config.OverridePattern.property.assist"></a>

```typescript
public readonly assist: OverrideAssistConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideAssistConfiguration

Specific configuration for the Json language.

---

##### `css`<sup>Optional</sup> <a name="css" id="projen.javascript.biome_config.OverridePattern.property.css"></a>

```typescript
public readonly css: CssConfiguration;
```

- *Type:* projen.javascript.biome_config.CssConfiguration

Specific configuration for the CSS language.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.biome_config.OverridePattern.property.files"></a>

```typescript
public readonly files: OverrideFilesConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideFilesConfiguration

Specific configuration for the filesystem.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome_config.OverridePattern.property.formatter"></a>

```typescript
public readonly formatter: OverrideFormatterConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideFormatterConfiguration

Specific configuration for the Json language.

---

##### `graphql`<sup>Optional</sup> <a name="graphql" id="projen.javascript.biome_config.OverridePattern.property.graphql"></a>

```typescript
public readonly graphql: GraphqlConfiguration;
```

- *Type:* projen.javascript.biome_config.GraphqlConfiguration

Specific configuration for the Graphql language.

---

##### `grit`<sup>Optional</sup> <a name="grit" id="projen.javascript.biome_config.OverridePattern.property.grit"></a>

```typescript
public readonly grit: GritConfiguration;
```

- *Type:* projen.javascript.biome_config.GritConfiguration

Specific configuration for the GritQL language.

---

##### `html`<sup>Optional</sup> <a name="html" id="projen.javascript.biome_config.OverridePattern.property.html"></a>

```typescript
public readonly html: HtmlConfiguration;
```

- *Type:* projen.javascript.biome_config.HtmlConfiguration

Specific configuration for the GritQL language.

---

##### `includes`<sup>Optional</sup> <a name="includes" id="projen.javascript.biome_config.OverridePattern.property.includes"></a>

```typescript
public readonly includes: string[];
```

- *Type:* string[]

A list of glob patterns.

Biome will include files/folders that will
match these patterns.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.javascript.biome_config.OverridePattern.property.javascript"></a>

```typescript
public readonly javascript: JsConfiguration;
```

- *Type:* projen.javascript.biome_config.JsConfiguration

Specific configuration for the JavaScript language.

---

##### `json`<sup>Optional</sup> <a name="json" id="projen.javascript.biome_config.OverridePattern.property.json"></a>

```typescript
public readonly json: JsonConfiguration;
```

- *Type:* projen.javascript.biome_config.JsonConfiguration

Specific configuration for the Json language.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome_config.OverridePattern.property.linter"></a>

```typescript
public readonly linter: OverrideLinterConfiguration;
```

- *Type:* projen.javascript.biome_config.OverrideLinterConfiguration

Specific configuration for the Json language.

---

##### `plugins`<sup>Optional</sup> <a name="plugins" id="projen.javascript.biome_config.OverridePattern.property.plugins"></a>

```typescript
public readonly plugins: string[];
```

- *Type:* string[]

Specific configuration for additional plugins.

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
| <code><a href="#projen.javascript.biome_config.Rules.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the lint rules recommended by Biome. |
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

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome_config.Rules.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the lint rules recommended by Biome.

`true` by default.

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

A list of rules that belong to this group.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.Source.Initializer"></a>

```typescript
import { javascript } from 'projen'

const source: javascript.biome_config.Source = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.Source.property.organizeImports">organizeImports</a></code> | <code>any</code> | Provides a code action to sort the imports and exports in the file using a built-in or custom order. |
| <code><a href="#projen.javascript.biome_config.Source.property.recommended">recommended</a></code> | <code>boolean</code> | Enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedAttributes">useSortedAttributes</a></code> | <code>any</code> | Enforce attribute sorting in JSX elements. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedKeys">useSortedKeys</a></code> | <code>any</code> | Sort the keys of a JSON object in natural order. |
| <code><a href="#projen.javascript.biome_config.Source.property.useSortedProperties">useSortedProperties</a></code> | <code>any</code> | Enforce ordering of CSS properties and nested rules. |

---

##### `organizeImports`<sup>Optional</sup> <a name="organizeImports" id="projen.javascript.biome_config.Source.property.organizeImports"></a>

```typescript
public readonly organizeImports: any;
```

- *Type:* any

Provides a code action to sort the imports and exports in the file using a built-in or custom order.

See <https://biomejs.dev/assist/actions/organize-imports>

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome_config.Source.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

Enables the recommended rules for this group.

---

##### `useSortedAttributes`<sup>Optional</sup> <a name="useSortedAttributes" id="projen.javascript.biome_config.Source.property.useSortedAttributes"></a>

```typescript
public readonly useSortedAttributes: any;
```

- *Type:* any

Enforce attribute sorting in JSX elements.

See <https://biomejs.dev/assist/actions/use-sorted-attributes>

---

##### `useSortedKeys`<sup>Optional</sup> <a name="useSortedKeys" id="projen.javascript.biome_config.Source.property.useSortedKeys"></a>

```typescript
public readonly useSortedKeys: any;
```

- *Type:* any

Sort the keys of a JSON object in natural order.

See <https://biomejs.dev/assist/actions/use-sorted-keys>

---

##### `useSortedProperties`<sup>Optional</sup> <a name="useSortedProperties" id="projen.javascript.biome_config.Source.property.useSortedProperties"></a>

```typescript
public readonly useSortedProperties: any;
```

- *Type:* any

Enforce ordering of CSS properties and nested rules.

See <https://biomejs.dev/assist/actions/use-sorted-properties>

---

### VcsConfiguration <a name="VcsConfiguration" id="projen.javascript.biome_config.VcsConfiguration"></a>

Set of properties to integrate Biome with a VCS software.

#### Initializer <a name="Initializer" id="projen.javascript.biome_config.VcsConfiguration.Initializer"></a>

```typescript
import { javascript } from 'projen'

const vcsConfiguration: javascript.biome_config.VcsConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.clientKind">clientKind</a></code> | <code>projen.javascript.biome_config.VcsClientKind</code> | The kind of client. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.defaultBranch">defaultBranch</a></code> | <code>string</code> | The main branch of the project. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Whether Biome should integrate itself with the VCS client. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.root">root</a></code> | <code>string</code> | The folder where Biome should check for VCS files. |
| <code><a href="#projen.javascript.biome_config.VcsConfiguration.property.useIgnoreFile">useIgnoreFile</a></code> | <code>boolean</code> | Whether Biome should use the VCS ignore file. |

---

##### `clientKind`<sup>Optional</sup> <a name="clientKind" id="projen.javascript.biome_config.VcsConfiguration.property.clientKind"></a>

```typescript
public readonly clientKind: VcsClientKind;
```

- *Type:* projen.javascript.biome_config.VcsClientKind

The kind of client.

---

##### `defaultBranch`<sup>Optional</sup> <a name="defaultBranch" id="projen.javascript.biome_config.VcsConfiguration.property.defaultBranch"></a>

```typescript
public readonly defaultBranch: string;
```

- *Type:* string

The main branch of the project.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome_config.VcsConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether Biome should integrate itself with the VCS client.

---

##### `root`<sup>Optional</sup> <a name="root" id="projen.javascript.biome_config.VcsConfiguration.property.root"></a>

```typescript
public readonly root: string;
```

- *Type:* string

The folder where Biome should check for VCS files.

By default, Biome will use the same
folder where `biome.json` was found.

If Biome can't find the configuration, it will attempt to use the current working directory.
If no current working directory can't be found, Biome won't use the VCS integration, and a diagnostic
will be emitted

---

##### `useIgnoreFile`<sup>Optional</sup> <a name="useIgnoreFile" id="projen.javascript.biome_config.VcsConfiguration.property.useIgnoreFile"></a>

```typescript
public readonly useIgnoreFile: boolean;
```

- *Type:* boolean

Whether Biome should use the VCS ignore file.

When [true], Biome will ignore the files
specified in the ignore file.

---



## Enums <a name="Enums" id="Enums"></a>

### ArrowParentheses <a name="ArrowParentheses" id="projen.javascript.biome_config.ArrowParentheses"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.ArrowParentheses.ALWAYS">ALWAYS</a></code> | always. |
| <code><a href="#projen.javascript.biome_config.ArrowParentheses.AS_NEEDED">AS_NEEDED</a></code> | asNeeded. |

---

##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.ArrowParentheses.ALWAYS"></a>

always.

---


##### `AS_NEEDED` <a name="AS_NEEDED" id="projen.javascript.biome_config.ArrowParentheses.AS_NEEDED"></a>

asNeeded.

---


### AttributePosition <a name="AttributePosition" id="projen.javascript.biome_config.AttributePosition"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.AttributePosition.AUTO">AUTO</a></code> | auto. |
| <code><a href="#projen.javascript.biome_config.AttributePosition.MULTILINE">MULTILINE</a></code> | multiline. |

---

##### `AUTO` <a name="AUTO" id="projen.javascript.biome_config.AttributePosition.AUTO"></a>

auto.

---


##### `MULTILINE` <a name="MULTILINE" id="projen.javascript.biome_config.AttributePosition.MULTILINE"></a>

multiline.

---


### Expand <a name="Expand" id="projen.javascript.biome_config.Expand"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.Expand.AUTO">AUTO</a></code> | Objects are expanded when the first property has a leading newline. |
| <code><a href="#projen.javascript.biome_config.Expand.ALWAYS">ALWAYS</a></code> | Objects and arrays are always expanded. |
| <code><a href="#projen.javascript.biome_config.Expand.NEVER">NEVER</a></code> | Objects and arrays are never expanded, if they are shorter than the line width. |

---

##### `AUTO` <a name="AUTO" id="projen.javascript.biome_config.Expand.AUTO"></a>

Objects are expanded when the first property has a leading newline.

Arrays are always
expanded if they are shorter than the line width. (auto)

---


##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.Expand.ALWAYS"></a>

Objects and arrays are always expanded.

(always)

---


##### `NEVER` <a name="NEVER" id="projen.javascript.biome_config.Expand.NEVER"></a>

Objects and arrays are never expanded, if they are shorter than the line width.

(never)

---


### IndentStyle <a name="IndentStyle" id="projen.javascript.biome_config.IndentStyle"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.IndentStyle.TAB">TAB</a></code> | Indent with Tab (tab). |
| <code><a href="#projen.javascript.biome_config.IndentStyle.SPACE">SPACE</a></code> | Indent with Space (space). |

---

##### `TAB` <a name="TAB" id="projen.javascript.biome_config.IndentStyle.TAB"></a>

Indent with Tab (tab).

---


##### `SPACE` <a name="SPACE" id="projen.javascript.biome_config.IndentStyle.SPACE"></a>

Indent with Space (space).

---


### JsonTrailingCommas <a name="JsonTrailingCommas" id="projen.javascript.biome_config.JsonTrailingCommas"></a>

Print trailing commas wherever possible in multi-line comma-separated syntactic structures for JSON files.

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

Indicates the type of runtime or transformation used for interpreting JSX.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.JsxRuntime.TRANSPARENT">TRANSPARENT</a></code> | Indicates a modern or native JSX environment, that doesn't require special handling by Biome. |
| <code><a href="#projen.javascript.biome_config.JsxRuntime.REACT_CLASSIC">REACT_CLASSIC</a></code> | Indicates a classic React environment that requires the `React` import. |

---

##### `TRANSPARENT` <a name="TRANSPARENT" id="projen.javascript.biome_config.JsxRuntime.TRANSPARENT"></a>

Indicates a modern or native JSX environment, that doesn't require special handling by Biome.

(transparent)

---


##### `REACT_CLASSIC` <a name="REACT_CLASSIC" id="projen.javascript.biome_config.JsxRuntime.REACT_CLASSIC"></a>

Indicates a classic React environment that requires the `React` import.

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


### QuoteProperties <a name="QuoteProperties" id="projen.javascript.biome_config.QuoteProperties"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.QuoteProperties.AS_NEEDED">AS_NEEDED</a></code> | asNeeded. |
| <code><a href="#projen.javascript.biome_config.QuoteProperties.PRESERVE">PRESERVE</a></code> | preserve. |

---

##### `AS_NEEDED` <a name="AS_NEEDED" id="projen.javascript.biome_config.QuoteProperties.AS_NEEDED"></a>

asNeeded.

---


##### `PRESERVE` <a name="PRESERVE" id="projen.javascript.biome_config.QuoteProperties.PRESERVE"></a>

preserve.

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
| <code><a href="#projen.javascript.biome_config.RuleDomainValue.ALL">ALL</a></code> | Enables all the rules that belong to this domain (all). |
| <code><a href="#projen.javascript.biome_config.RuleDomainValue.NONE">NONE</a></code> | Disables all the rules that belong to this domain (none). |
| <code><a href="#projen.javascript.biome_config.RuleDomainValue.RECOMMENDED">RECOMMENDED</a></code> | Enables only the recommended rules for this domain (recommended). |

---

##### `ALL` <a name="ALL" id="projen.javascript.biome_config.RuleDomainValue.ALL"></a>

Enables all the rules that belong to this domain (all).

---


##### `NONE` <a name="NONE" id="projen.javascript.biome_config.RuleDomainValue.NONE"></a>

Disables all the rules that belong to this domain (none).

---


##### `RECOMMENDED` <a name="RECOMMENDED" id="projen.javascript.biome_config.RuleDomainValue.RECOMMENDED"></a>

Enables only the recommended rules for this domain (recommended).

---


### SelfCloseVoidElements <a name="SelfCloseVoidElements" id="projen.javascript.biome_config.SelfCloseVoidElements"></a>

Controls whether void-elements should be self closed.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.SelfCloseVoidElements.NEVER">NEVER</a></code> | The `/` inside void elements is removed by the formatter (never). |
| <code><a href="#projen.javascript.biome_config.SelfCloseVoidElements.ALWAYS">ALWAYS</a></code> | The `/` inside void elements is always added (always). |

---

##### `NEVER` <a name="NEVER" id="projen.javascript.biome_config.SelfCloseVoidElements.NEVER"></a>

The `/` inside void elements is removed by the formatter (never).

---


##### `ALWAYS` <a name="ALWAYS" id="projen.javascript.biome_config.SelfCloseVoidElements.ALWAYS"></a>

The `/` inside void elements is always added (always).

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

Integration with the git client as VCS.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#projen.javascript.biome_config.VcsClientKind.GIT">GIT</a></code> | git. |

---

##### `GIT` <a name="GIT" id="projen.javascript.biome_config.VcsClientKind.GIT"></a>

git.

---


### WhitespaceSensitivity <a name="WhitespaceSensitivity" id="projen.javascript.biome_config.WhitespaceSensitivity"></a>

Whitespace sensitivity for HTML formatting.

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
| <code><a href="#projen.javascript.biome_config.WhitespaceSensitivity.CSS">CSS</a></code> | The formatter considers whitespace significant for elements that have an "inline" display style by default in browser's user agent style sheets. |
| <code><a href="#projen.javascript.biome_config.WhitespaceSensitivity.STRICT">STRICT</a></code> | Leading and trailing whitespace in content is considered significant for all elements. |
| <code><a href="#projen.javascript.biome_config.WhitespaceSensitivity.IGNORE">IGNORE</a></code> | Whitespace is considered insignificant. |

---

##### `CSS` <a name="CSS" id="projen.javascript.biome_config.WhitespaceSensitivity.CSS"></a>

The formatter considers whitespace significant for elements that have an "inline" display style by default in browser's user agent style sheets.

(css)

---


##### `STRICT` <a name="STRICT" id="projen.javascript.biome_config.WhitespaceSensitivity.STRICT"></a>

Leading and trailing whitespace in content is considered significant for all elements.

The formatter should leave at least one whitespace character if whitespace is present.
Otherwise, if there is no whitespace, it should not add any after `>` or before `<`. In other words, if there's no whitespace, the text content should hug the tags.

Example of text hugging the tags:
```html
<b
>content</b
>
``` (strict)

---


##### `IGNORE` <a name="IGNORE" id="projen.javascript.biome_config.WhitespaceSensitivity.IGNORE"></a>

Whitespace is considered insignificant.

The formatter is free to remove or add whitespace as it sees fit. (ignore)

---

