# `javascript.biome.biome_config` Submodule <a name="`javascript.biome.biome_config` Submodule" id="projen.javascript.biome.biome_config"></a>




## Protocols <a name="Protocols" id="Protocols"></a>

### IA11y <a name="IA11y" id="projen.javascript.biome.biome_config.IA11y"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IA11y

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noAccessKey">noAccessKey</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that the accessKey attribute is not used on any HTML element. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noAriaHiddenOnFocusable">noAriaHiddenOnFocusable</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that aria-hidden="true" is not set on focusable elements. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noAriaUnsupportedElements">noAriaUnsupportedElements</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noAutofocus">noAutofocus</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that autoFocus prop is not used on elements. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noBlankTarget">noBlankTarget</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions</code> | Disallow target="_blank" attribute without rel="noreferrer". |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noDistractingElements">noDistractingElements</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforces that no distracting elements are used. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noHeaderScope">noHeaderScope</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | The scope prop should be used only on \<th> elements. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noInteractiveElementToNoninteractiveRole">noInteractiveElementToNoninteractiveRole</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noLabelWithoutControl">noLabelWithoutControl</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions</code> | Enforce that a label element or component has a text label and an associated input. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noNoninteractiveElementToInteractiveRole">noNoninteractiveElementToInteractiveRole</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noNoninteractiveTabindex">noNoninteractiveTabindex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that tabIndex is not assigned to non-interactive HTML elements. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noPositiveTabindex">noPositiveTabindex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prevent the usage of positive integers on tabIndex property. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noRedundantAlt">noRedundantAlt</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce img alt prop does not contain the word "image", "picture", or "photo". |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noRedundantRoles">noRedundantRoles</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce explicit role property is not the same as implicit/default role property on an element. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.noSvgWithoutTitle">noSvgWithoutTitle</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforces the usage of the title element for the svg element. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useAltText">useAltText</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that all elements that require alternative text have meaningful information to relay back to the end user. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useAnchorContent">useAnchorContent</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that anchors have content and that the content is accessible to screen readers. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useAriaActivedescendantWithTabindex">useAriaActivedescendantWithTabindex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce that tabIndex is assigned to non-interactive HTML elements with aria-activedescendant. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useAriaPropsForRole">useAriaPropsForRole</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that elements with ARIA roles must have all required ARIA attributes for that role. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useButtonType">useButtonType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforces the usage of the attribute type for the element button. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useFocusableInteractive">useFocusableInteractive</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Elements with an interactive role and interaction handlers must be focusable. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useGenericFontNames">useGenericFontNames</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow a missing generic family keyword within font families. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useHeadingContent">useHeadingContent</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useHtmlLang">useHtmlLang</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that html element has lang attribute. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useIframeTitle">useIframeTitle</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforces the usage of the attribute title for the element iframe. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useKeyWithClickEvents">useKeyWithClickEvents</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useKeyWithMouseEvents">useKeyWithMouseEvents</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce onMouseOver / onMouseOut are accompanied by onFocus / onBlur. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useMediaCaption">useMediaCaption</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforces that audio and video elements must have a track for captions. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useSemanticElements">useSemanticElements</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | It detects the use of role attributes in JSX elements and suggests using semantic elements instead. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useValidAnchor">useValidAnchor</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that all anchors are valid, and they are navigable elements. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useValidAriaProps">useValidAriaProps</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Ensures that ARIA properties aria-* are all valid. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useValidAriaRole">useValidAriaRole</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions</code> | Elements with ARIA roles must use a valid, non-abstract ARIA role. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useValidAriaValues">useValidAriaValues</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that ARIA state and property values are valid. |
| <code><a href="#projen.javascript.biome.biome_config.IA11y.property.useValidLang">useValidLang</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Ensure that the attribute passed to the lang attribute is a correct ISO language and/or country. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.IA11y.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noAccessKey`<sup>Optional</sup> <a name="noAccessKey" id="projen.javascript.biome.biome_config.IA11y.property.noAccessKey"></a>

```typescript
public readonly noAccessKey: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that the accessKey attribute is not used on any HTML element.

---

##### `noAriaHiddenOnFocusable`<sup>Optional</sup> <a name="noAriaHiddenOnFocusable" id="projen.javascript.biome.biome_config.IA11y.property.noAriaHiddenOnFocusable"></a>

```typescript
public readonly noAriaHiddenOnFocusable: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that aria-hidden="true" is not set on focusable elements.

---

##### `noAriaUnsupportedElements`<sup>Optional</sup> <a name="noAriaUnsupportedElements" id="projen.javascript.biome.biome_config.IA11y.property.noAriaUnsupportedElements"></a>

```typescript
public readonly noAriaUnsupportedElements: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.

---

##### `noAutofocus`<sup>Optional</sup> <a name="noAutofocus" id="projen.javascript.biome.biome_config.IA11y.property.noAutofocus"></a>

```typescript
public readonly noAutofocus: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that autoFocus prop is not used on elements.

---

##### `noBlankTarget`<sup>Optional</sup> <a name="noBlankTarget" id="projen.javascript.biome.biome_config.IA11y.property.noBlankTarget"></a>

```typescript
public readonly noBlankTarget: string | IRuleWithAllowDomainOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions

Disallow target="_blank" attribute without rel="noreferrer".

---

##### `noDistractingElements`<sup>Optional</sup> <a name="noDistractingElements" id="projen.javascript.biome.biome_config.IA11y.property.noDistractingElements"></a>

```typescript
public readonly noDistractingElements: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforces that no distracting elements are used.

---

##### `noHeaderScope`<sup>Optional</sup> <a name="noHeaderScope" id="projen.javascript.biome.biome_config.IA11y.property.noHeaderScope"></a>

```typescript
public readonly noHeaderScope: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

The scope prop should be used only on \<th> elements.

---

##### `noInteractiveElementToNoninteractiveRole`<sup>Optional</sup> <a name="noInteractiveElementToNoninteractiveRole" id="projen.javascript.biome.biome_config.IA11y.property.noInteractiveElementToNoninteractiveRole"></a>

```typescript
public readonly noInteractiveElementToNoninteractiveRole: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements.

---

##### `noLabelWithoutControl`<sup>Optional</sup> <a name="noLabelWithoutControl" id="projen.javascript.biome.biome_config.IA11y.property.noLabelWithoutControl"></a>

```typescript
public readonly noLabelWithoutControl: string | IRuleWithNoLabelWithoutControlOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions

Enforce that a label element or component has a text label and an associated input.

---

##### `noNoninteractiveElementToInteractiveRole`<sup>Optional</sup> <a name="noNoninteractiveElementToInteractiveRole" id="projen.javascript.biome.biome_config.IA11y.property.noNoninteractiveElementToInteractiveRole"></a>

```typescript
public readonly noNoninteractiveElementToInteractiveRole: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements.

---

##### `noNoninteractiveTabindex`<sup>Optional</sup> <a name="noNoninteractiveTabindex" id="projen.javascript.biome.biome_config.IA11y.property.noNoninteractiveTabindex"></a>

```typescript
public readonly noNoninteractiveTabindex: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that tabIndex is not assigned to non-interactive HTML elements.

---

##### `noPositiveTabindex`<sup>Optional</sup> <a name="noPositiveTabindex" id="projen.javascript.biome.biome_config.IA11y.property.noPositiveTabindex"></a>

```typescript
public readonly noPositiveTabindex: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prevent the usage of positive integers on tabIndex property.

---

##### `noRedundantAlt`<sup>Optional</sup> <a name="noRedundantAlt" id="projen.javascript.biome.biome_config.IA11y.property.noRedundantAlt"></a>

```typescript
public readonly noRedundantAlt: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce img alt prop does not contain the word "image", "picture", or "photo".

---

##### `noRedundantRoles`<sup>Optional</sup> <a name="noRedundantRoles" id="projen.javascript.biome.biome_config.IA11y.property.noRedundantRoles"></a>

```typescript
public readonly noRedundantRoles: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce explicit role property is not the same as implicit/default role property on an element.

---

##### `noSvgWithoutTitle`<sup>Optional</sup> <a name="noSvgWithoutTitle" id="projen.javascript.biome.biome_config.IA11y.property.noSvgWithoutTitle"></a>

```typescript
public readonly noSvgWithoutTitle: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforces the usage of the title element for the svg element.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.IA11y.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

##### `useAltText`<sup>Optional</sup> <a name="useAltText" id="projen.javascript.biome.biome_config.IA11y.property.useAltText"></a>

```typescript
public readonly useAltText: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that all elements that require alternative text have meaningful information to relay back to the end user.

---

##### `useAnchorContent`<sup>Optional</sup> <a name="useAnchorContent" id="projen.javascript.biome.biome_config.IA11y.property.useAnchorContent"></a>

```typescript
public readonly useAnchorContent: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that anchors have content and that the content is accessible to screen readers.

---

##### `useAriaActivedescendantWithTabindex`<sup>Optional</sup> <a name="useAriaActivedescendantWithTabindex" id="projen.javascript.biome.biome_config.IA11y.property.useAriaActivedescendantWithTabindex"></a>

```typescript
public readonly useAriaActivedescendantWithTabindex: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce that tabIndex is assigned to non-interactive HTML elements with aria-activedescendant.

---

##### `useAriaPropsForRole`<sup>Optional</sup> <a name="useAriaPropsForRole" id="projen.javascript.biome.biome_config.IA11y.property.useAriaPropsForRole"></a>

```typescript
public readonly useAriaPropsForRole: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that elements with ARIA roles must have all required ARIA attributes for that role.

---

##### `useButtonType`<sup>Optional</sup> <a name="useButtonType" id="projen.javascript.biome.biome_config.IA11y.property.useButtonType"></a>

```typescript
public readonly useButtonType: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforces the usage of the attribute type for the element button.

---

##### `useFocusableInteractive`<sup>Optional</sup> <a name="useFocusableInteractive" id="projen.javascript.biome.biome_config.IA11y.property.useFocusableInteractive"></a>

```typescript
public readonly useFocusableInteractive: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Elements with an interactive role and interaction handlers must be focusable.

---

##### `useGenericFontNames`<sup>Optional</sup> <a name="useGenericFontNames" id="projen.javascript.biome.biome_config.IA11y.property.useGenericFontNames"></a>

```typescript
public readonly useGenericFontNames: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow a missing generic family keyword within font families.

---

##### `useHeadingContent`<sup>Optional</sup> <a name="useHeadingContent" id="projen.javascript.biome.biome_config.IA11y.property.useHeadingContent"></a>

```typescript
public readonly useHeadingContent: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop.

---

##### `useHtmlLang`<sup>Optional</sup> <a name="useHtmlLang" id="projen.javascript.biome.biome_config.IA11y.property.useHtmlLang"></a>

```typescript
public readonly useHtmlLang: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that html element has lang attribute.

---

##### `useIframeTitle`<sup>Optional</sup> <a name="useIframeTitle" id="projen.javascript.biome.biome_config.IA11y.property.useIframeTitle"></a>

```typescript
public readonly useIframeTitle: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforces the usage of the attribute title for the element iframe.

---

##### `useKeyWithClickEvents`<sup>Optional</sup> <a name="useKeyWithClickEvents" id="projen.javascript.biome.biome_config.IA11y.property.useKeyWithClickEvents"></a>

```typescript
public readonly useKeyWithClickEvents: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress.

---

##### `useKeyWithMouseEvents`<sup>Optional</sup> <a name="useKeyWithMouseEvents" id="projen.javascript.biome.biome_config.IA11y.property.useKeyWithMouseEvents"></a>

```typescript
public readonly useKeyWithMouseEvents: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce onMouseOver / onMouseOut are accompanied by onFocus / onBlur.

---

##### `useMediaCaption`<sup>Optional</sup> <a name="useMediaCaption" id="projen.javascript.biome.biome_config.IA11y.property.useMediaCaption"></a>

```typescript
public readonly useMediaCaption: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforces that audio and video elements must have a track for captions.

---

##### `useSemanticElements`<sup>Optional</sup> <a name="useSemanticElements" id="projen.javascript.biome.biome_config.IA11y.property.useSemanticElements"></a>

```typescript
public readonly useSemanticElements: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

It detects the use of role attributes in JSX elements and suggests using semantic elements instead.

---

##### `useValidAnchor`<sup>Optional</sup> <a name="useValidAnchor" id="projen.javascript.biome.biome_config.IA11y.property.useValidAnchor"></a>

```typescript
public readonly useValidAnchor: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that all anchors are valid, and they are navigable elements.

---

##### `useValidAriaProps`<sup>Optional</sup> <a name="useValidAriaProps" id="projen.javascript.biome.biome_config.IA11y.property.useValidAriaProps"></a>

```typescript
public readonly useValidAriaProps: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Ensures that ARIA properties aria-* are all valid.

---

##### `useValidAriaRole`<sup>Optional</sup> <a name="useValidAriaRole" id="projen.javascript.biome.biome_config.IA11y.property.useValidAriaRole"></a>

```typescript
public readonly useValidAriaRole: string | IRuleWithValidAriaRoleOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions

Elements with ARIA roles must use a valid, non-abstract ARIA role.

---

##### `useValidAriaValues`<sup>Optional</sup> <a name="useValidAriaValues" id="projen.javascript.biome.biome_config.IA11y.property.useValidAriaValues"></a>

```typescript
public readonly useValidAriaValues: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that ARIA state and property values are valid.

---

##### `useValidLang`<sup>Optional</sup> <a name="useValidLang" id="projen.javascript.biome.biome_config.IA11y.property.useValidLang"></a>

```typescript
public readonly useValidLang: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Ensure that the attribute passed to the lang attribute is a correct ISO language and/or country.

---

### IActions <a name="IActions" id="projen.javascript.biome.biome_config.IActions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IActions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IActions.property.source">source</a></code> | <code>projen.javascript.biome.biome_config.ISource</code> | *No description.* |

---

##### `source`<sup>Optional</sup> <a name="source" id="projen.javascript.biome.biome_config.IActions.property.source"></a>

```typescript
public readonly source: ISource;
```

- *Type:* projen.javascript.biome.biome_config.ISource

---

### IAllowDomainOptions <a name="IAllowDomainOptions" id="projen.javascript.biome.biome_config.IAllowDomainOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IAllowDomainOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IAllowDomainOptions.property.allowDomains">allowDomains</a></code> | <code>string[]</code> | List of domains to allow `target="_blank"` without `rel="noreferrer"`. |

---

##### `allowDomains`<sup>Optional</sup> <a name="allowDomains" id="projen.javascript.biome.biome_config.IAllowDomainOptions.property.allowDomains"></a>

```typescript
public readonly allowDomains: string[];
```

- *Type:* string[]

List of domains to allow `target="_blank"` without `rel="noreferrer"`.

---

### IAssistsConfiguration <a name="IAssistsConfiguration" id="projen.javascript.biome.biome_config.IAssistsConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IAssistsConfiguration


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IAssistsConfiguration.property.actions">actions</a></code> | <code>projen.javascript.biome.biome_config.IActions</code> | Whether Biome should fail in CLI if the assists were not applied to the code. |
| <code><a href="#projen.javascript.biome.biome_config.IAssistsConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Whether Biome should enable assists via LSP. |
| <code><a href="#projen.javascript.biome.biome_config.IAssistsConfiguration.property.ignore">ignore</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IAssistsConfiguration.property.include">include</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="projen.javascript.biome.biome_config.IAssistsConfiguration.property.actions"></a>

```typescript
public readonly actions: IActions;
```

- *Type:* projen.javascript.biome.biome_config.IActions

Whether Biome should fail in CLI if the assists were not applied to the code.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IAssistsConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether Biome should enable assists via LSP.

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="projen.javascript.biome.biome_config.IAssistsConfiguration.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will ignore files/folders that will match these patterns.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.javascript.biome.biome_config.IAssistsConfiguration.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will include files/folders that will match these patterns.

---

### IComplexity <a name="IComplexity" id="projen.javascript.biome.biome_config.IComplexity"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IComplexity

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noBannedTypes">noBannedTypes</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow primitive type aliases and misleading types. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noEmptyTypeParameters">noEmptyTypeParameters</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow empty type parameters in type aliases and interfaces. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noExcessiveCognitiveComplexity">noExcessiveCognitiveComplexity</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithComplexityOptions</code> | Disallow functions that exceed a given Cognitive Complexity score. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noExcessiveNestedTestSuites">noExcessiveNestedTestSuites</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | This rule enforces a maximum depth to nested describe() in test files. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noExtraBooleanCast">noExtraBooleanCast</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary boolean casts. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noForEach">noForEach</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prefer for...of statement instead of Array.forEach. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noMultipleSpacesInRegularExpressionLiterals">noMultipleSpacesInRegularExpressionLiterals</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unclear usage of consecutive space characters in regular expression literals. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noStaticOnlyClass">noStaticOnlyClass</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noThisInStatic">noThisInStatic</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow this and super in static contexts. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessCatch">noUselessCatch</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary catch clauses. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessConstructor">noUselessConstructor</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary constructors. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessEmptyExport">noUselessEmptyExport</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow empty exports that don't change anything in a module file. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessFragments">noUselessFragments</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary fragments. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessLabel">noUselessLabel</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary labels. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessLoneBlockStatements">noUselessLoneBlockStatements</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary nested block statements. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessRename">noUselessRename</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow renaming import, export, and destructured assignments to the same name. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessStringConcat">noUselessStringConcat</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary concatenation of string or template literals. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessSwitchCase">noUselessSwitchCase</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow useless case in switch statements. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessTernary">noUselessTernary</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow ternary operators when simpler alternatives exist. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessThisAlias">noUselessThisAlias</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow useless this aliasing. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessTypeConstraint">noUselessTypeConstraint</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow using any or unknown as type constraint. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noUselessUndefinedInitialization">noUselessUndefinedInitialization</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow initializing variables to undefined. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noVoid">noVoid</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of void operators, which is not a familiar operator. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.noWith">noWith</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow with statements in non-strict contexts. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useArrowFunction">useArrowFunction</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use arrow functions over function expressions. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useDateNow">useDateNow</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use Date.now() to get the number of milliseconds since the Unix Epoch. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useFlatMap">useFlatMap</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Promotes the use of .flatMap() when map().flat() are used together. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useLiteralKeys">useLiteralKeys</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the usage of a literal access to properties over computed property access. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useOptionalChain">useOptionalChain</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce using concise optional chain instead of chained logical expressions. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useRegexLiterals">useRegexLiterals</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the use of the regular expression literals instead of the RegExp constructor if possible. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useSimpleNumberKeys">useSimpleNumberKeys</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow number literal object member names which are not base10 or uses underscore as separator. |
| <code><a href="#projen.javascript.biome.biome_config.IComplexity.property.useSimplifiedLogicExpression">useSimplifiedLogicExpression</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Discard redundant terms from logical expressions. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.IComplexity.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noBannedTypes`<sup>Optional</sup> <a name="noBannedTypes" id="projen.javascript.biome.biome_config.IComplexity.property.noBannedTypes"></a>

```typescript
public readonly noBannedTypes: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow primitive type aliases and misleading types.

---

##### `noEmptyTypeParameters`<sup>Optional</sup> <a name="noEmptyTypeParameters" id="projen.javascript.biome.biome_config.IComplexity.property.noEmptyTypeParameters"></a>

```typescript
public readonly noEmptyTypeParameters: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow empty type parameters in type aliases and interfaces.

---

##### `noExcessiveCognitiveComplexity`<sup>Optional</sup> <a name="noExcessiveCognitiveComplexity" id="projen.javascript.biome.biome_config.IComplexity.property.noExcessiveCognitiveComplexity"></a>

```typescript
public readonly noExcessiveCognitiveComplexity: string | IRuleWithComplexityOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithComplexityOptions

Disallow functions that exceed a given Cognitive Complexity score.

---

##### `noExcessiveNestedTestSuites`<sup>Optional</sup> <a name="noExcessiveNestedTestSuites" id="projen.javascript.biome.biome_config.IComplexity.property.noExcessiveNestedTestSuites"></a>

```typescript
public readonly noExcessiveNestedTestSuites: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

This rule enforces a maximum depth to nested describe() in test files.

---

##### `noExtraBooleanCast`<sup>Optional</sup> <a name="noExtraBooleanCast" id="projen.javascript.biome.biome_config.IComplexity.property.noExtraBooleanCast"></a>

```typescript
public readonly noExtraBooleanCast: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary boolean casts.

---

##### `noForEach`<sup>Optional</sup> <a name="noForEach" id="projen.javascript.biome.biome_config.IComplexity.property.noForEach"></a>

```typescript
public readonly noForEach: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prefer for...of statement instead of Array.forEach.

---

##### `noMultipleSpacesInRegularExpressionLiterals`<sup>Optional</sup> <a name="noMultipleSpacesInRegularExpressionLiterals" id="projen.javascript.biome.biome_config.IComplexity.property.noMultipleSpacesInRegularExpressionLiterals"></a>

```typescript
public readonly noMultipleSpacesInRegularExpressionLiterals: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unclear usage of consecutive space characters in regular expression literals.

---

##### `noStaticOnlyClass`<sup>Optional</sup> <a name="noStaticOnlyClass" id="projen.javascript.biome.biome_config.IComplexity.property.noStaticOnlyClass"></a>

```typescript
public readonly noStaticOnlyClass: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace.

---

##### `noThisInStatic`<sup>Optional</sup> <a name="noThisInStatic" id="projen.javascript.biome.biome_config.IComplexity.property.noThisInStatic"></a>

```typescript
public readonly noThisInStatic: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow this and super in static contexts.

---

##### `noUselessCatch`<sup>Optional</sup> <a name="noUselessCatch" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessCatch"></a>

```typescript
public readonly noUselessCatch: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary catch clauses.

---

##### `noUselessConstructor`<sup>Optional</sup> <a name="noUselessConstructor" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessConstructor"></a>

```typescript
public readonly noUselessConstructor: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary constructors.

---

##### `noUselessEmptyExport`<sup>Optional</sup> <a name="noUselessEmptyExport" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessEmptyExport"></a>

```typescript
public readonly noUselessEmptyExport: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow empty exports that don't change anything in a module file.

---

##### `noUselessFragments`<sup>Optional</sup> <a name="noUselessFragments" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessFragments"></a>

```typescript
public readonly noUselessFragments: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary fragments.

---

##### `noUselessLabel`<sup>Optional</sup> <a name="noUselessLabel" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessLabel"></a>

```typescript
public readonly noUselessLabel: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary labels.

---

##### `noUselessLoneBlockStatements`<sup>Optional</sup> <a name="noUselessLoneBlockStatements" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessLoneBlockStatements"></a>

```typescript
public readonly noUselessLoneBlockStatements: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary nested block statements.

---

##### `noUselessRename`<sup>Optional</sup> <a name="noUselessRename" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessRename"></a>

```typescript
public readonly noUselessRename: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow renaming import, export, and destructured assignments to the same name.

---

##### `noUselessStringConcat`<sup>Optional</sup> <a name="noUselessStringConcat" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessStringConcat"></a>

```typescript
public readonly noUselessStringConcat: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary concatenation of string or template literals.

---

##### `noUselessSwitchCase`<sup>Optional</sup> <a name="noUselessSwitchCase" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessSwitchCase"></a>

```typescript
public readonly noUselessSwitchCase: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow useless case in switch statements.

---

##### `noUselessTernary`<sup>Optional</sup> <a name="noUselessTernary" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessTernary"></a>

```typescript
public readonly noUselessTernary: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow ternary operators when simpler alternatives exist.

---

##### `noUselessThisAlias`<sup>Optional</sup> <a name="noUselessThisAlias" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessThisAlias"></a>

```typescript
public readonly noUselessThisAlias: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow useless this aliasing.

---

##### `noUselessTypeConstraint`<sup>Optional</sup> <a name="noUselessTypeConstraint" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessTypeConstraint"></a>

```typescript
public readonly noUselessTypeConstraint: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow using any or unknown as type constraint.

---

##### `noUselessUndefinedInitialization`<sup>Optional</sup> <a name="noUselessUndefinedInitialization" id="projen.javascript.biome.biome_config.IComplexity.property.noUselessUndefinedInitialization"></a>

```typescript
public readonly noUselessUndefinedInitialization: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow initializing variables to undefined.

---

##### `noVoid`<sup>Optional</sup> <a name="noVoid" id="projen.javascript.biome.biome_config.IComplexity.property.noVoid"></a>

```typescript
public readonly noVoid: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of void operators, which is not a familiar operator.

---

##### `noWith`<sup>Optional</sup> <a name="noWith" id="projen.javascript.biome.biome_config.IComplexity.property.noWith"></a>

```typescript
public readonly noWith: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow with statements in non-strict contexts.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.IComplexity.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

##### `useArrowFunction`<sup>Optional</sup> <a name="useArrowFunction" id="projen.javascript.biome.biome_config.IComplexity.property.useArrowFunction"></a>

```typescript
public readonly useArrowFunction: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use arrow functions over function expressions.

---

##### `useDateNow`<sup>Optional</sup> <a name="useDateNow" id="projen.javascript.biome.biome_config.IComplexity.property.useDateNow"></a>

```typescript
public readonly useDateNow: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use Date.now() to get the number of milliseconds since the Unix Epoch.

---

##### `useFlatMap`<sup>Optional</sup> <a name="useFlatMap" id="projen.javascript.biome.biome_config.IComplexity.property.useFlatMap"></a>

```typescript
public readonly useFlatMap: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Promotes the use of .flatMap() when map().flat() are used together.

---

##### `useLiteralKeys`<sup>Optional</sup> <a name="useLiteralKeys" id="projen.javascript.biome.biome_config.IComplexity.property.useLiteralKeys"></a>

```typescript
public readonly useLiteralKeys: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the usage of a literal access to properties over computed property access.

---

##### `useOptionalChain`<sup>Optional</sup> <a name="useOptionalChain" id="projen.javascript.biome.biome_config.IComplexity.property.useOptionalChain"></a>

```typescript
public readonly useOptionalChain: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce using concise optional chain instead of chained logical expressions.

---

##### `useRegexLiterals`<sup>Optional</sup> <a name="useRegexLiterals" id="projen.javascript.biome.biome_config.IComplexity.property.useRegexLiterals"></a>

```typescript
public readonly useRegexLiterals: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the use of the regular expression literals instead of the RegExp constructor if possible.

---

##### `useSimpleNumberKeys`<sup>Optional</sup> <a name="useSimpleNumberKeys" id="projen.javascript.biome.biome_config.IComplexity.property.useSimpleNumberKeys"></a>

```typescript
public readonly useSimpleNumberKeys: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow number literal object member names which are not base10 or uses underscore as separator.

---

##### `useSimplifiedLogicExpression`<sup>Optional</sup> <a name="useSimplifiedLogicExpression" id="projen.javascript.biome.biome_config.IComplexity.property.useSimplifiedLogicExpression"></a>

```typescript
public readonly useSimplifiedLogicExpression: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Discard redundant terms from logical expressions.

---

### IComplexityOptions <a name="IComplexityOptions" id="projen.javascript.biome.biome_config.IComplexityOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IComplexityOptions

Options for the rule `noExcessiveCognitiveComplexity`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IComplexityOptions.property.maxAllowedComplexity">maxAllowedComplexity</a></code> | <code>number</code> | The maximum complexity score that we allow. |

---

##### `maxAllowedComplexity`<sup>Optional</sup> <a name="maxAllowedComplexity" id="projen.javascript.biome.biome_config.IComplexityOptions.property.maxAllowedComplexity"></a>

```typescript
public readonly maxAllowedComplexity: number;
```

- *Type:* number

The maximum complexity score that we allow.

Anything higher is considered excessive.

---

### IConfiguration <a name="IConfiguration" id="projen.javascript.biome.biome_config.IConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IConfiguration

The configuration that is contained inside the file `biome.json`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.assists">assists</a></code> | <code>projen.javascript.biome.biome_config.IAssistsConfiguration</code> | Specific configuration for assists. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.css">css</a></code> | <code>projen.javascript.biome.biome_config.ICssConfiguration</code> | Specific configuration for the Css language. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.extends">extends</a></code> | <code>string[]</code> | A list of paths to other JSON files, used to extends the current configuration. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.files">files</a></code> | <code>projen.javascript.biome.biome_config.IFilesConfiguration</code> | The configuration of the filesystem. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome.biome_config.IFormatterConfiguration</code> | The configuration of the formatter. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.graphql">graphql</a></code> | <code>projen.javascript.biome.biome_config.IGraphqlConfiguration</code> | Specific configuration for the GraphQL language. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.javascript">javascript</a></code> | <code>projen.javascript.biome.biome_config.IJavascriptConfiguration</code> | Specific configuration for the JavaScript language. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.json">json</a></code> | <code>projen.javascript.biome.biome_config.IJsonConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome.biome_config.ILinterConfiguration</code> | The configuration for the linter. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.organizeImports">organizeImports</a></code> | <code>projen.javascript.biome.biome_config.IOrganizeImports</code> | The configuration of the import sorting. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.overrides">overrides</a></code> | <code>projen.javascript.biome.biome_config.IOverridePattern[]</code> | A list of granular patterns that should be applied only to a sub set of files. |
| <code><a href="#projen.javascript.biome.biome_config.IConfiguration.property.vcs">vcs</a></code> | <code>projen.javascript.biome.biome_config.IVcsConfiguration</code> | The configuration of the VCS integration. |

---

##### `assists`<sup>Optional</sup> <a name="assists" id="projen.javascript.biome.biome_config.IConfiguration.property.assists"></a>

```typescript
public readonly assists: IAssistsConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IAssistsConfiguration

Specific configuration for assists.

---

##### `css`<sup>Optional</sup> <a name="css" id="projen.javascript.biome.biome_config.IConfiguration.property.css"></a>

```typescript
public readonly css: ICssConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.ICssConfiguration

Specific configuration for the Css language.

---

##### `extends`<sup>Optional</sup> <a name="extends" id="projen.javascript.biome.biome_config.IConfiguration.property.extends"></a>

```typescript
public readonly extends: string[];
```

- *Type:* string[]

A list of paths to other JSON files, used to extends the current configuration.

---

##### `files`<sup>Optional</sup> <a name="files" id="projen.javascript.biome.biome_config.IConfiguration.property.files"></a>

```typescript
public readonly files: IFilesConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IFilesConfiguration

The configuration of the filesystem.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome.biome_config.IConfiguration.property.formatter"></a>

```typescript
public readonly formatter: IFormatterConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IFormatterConfiguration

The configuration of the formatter.

---

##### `graphql`<sup>Optional</sup> <a name="graphql" id="projen.javascript.biome.biome_config.IConfiguration.property.graphql"></a>

```typescript
public readonly graphql: IGraphqlConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IGraphqlConfiguration

Specific configuration for the GraphQL language.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.javascript.biome.biome_config.IConfiguration.property.javascript"></a>

```typescript
public readonly javascript: IJavascriptConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IJavascriptConfiguration

Specific configuration for the JavaScript language.

---

##### `json`<sup>Optional</sup> <a name="json" id="projen.javascript.biome.biome_config.IConfiguration.property.json"></a>

```typescript
public readonly json: IJsonConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IJsonConfiguration

Specific configuration for the Json language.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome.biome_config.IConfiguration.property.linter"></a>

```typescript
public readonly linter: ILinterConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.ILinterConfiguration

The configuration for the linter.

---

##### `organizeImports`<sup>Optional</sup> <a name="organizeImports" id="projen.javascript.biome.biome_config.IConfiguration.property.organizeImports"></a>

```typescript
public readonly organizeImports: IOrganizeImports;
```

- *Type:* projen.javascript.biome.biome_config.IOrganizeImports

The configuration of the import sorting.

---

##### `overrides`<sup>Optional</sup> <a name="overrides" id="projen.javascript.biome.biome_config.IConfiguration.property.overrides"></a>

```typescript
public readonly overrides: IOverridePattern[];
```

- *Type:* projen.javascript.biome.biome_config.IOverridePattern[]

A list of granular patterns that should be applied only to a sub set of files.

---

##### `vcs`<sup>Optional</sup> <a name="vcs" id="projen.javascript.biome.biome_config.IConfiguration.property.vcs"></a>

```typescript
public readonly vcs: IVcsConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IVcsConfiguration

The configuration of the VCS integration.

---

### IConsistentArrayTypeOptions <a name="IConsistentArrayTypeOptions" id="projen.javascript.biome.biome_config.IConsistentArrayTypeOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IConsistentArrayTypeOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IConsistentArrayTypeOptions.property.syntax">syntax</a></code> | <code>string</code> | *No description.* |

---

##### `syntax`<sup>Optional</sup> <a name="syntax" id="projen.javascript.biome.biome_config.IConsistentArrayTypeOptions.property.syntax"></a>

```typescript
public readonly syntax: string;
```

- *Type:* string

---

### IConsistentMemberAccessibilityOptions <a name="IConsistentMemberAccessibilityOptions" id="projen.javascript.biome.biome_config.IConsistentMemberAccessibilityOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IConsistentMemberAccessibilityOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IConsistentMemberAccessibilityOptions.property.accessibility">accessibility</a></code> | <code>string</code> | *No description.* |

---

##### `accessibility`<sup>Optional</sup> <a name="accessibility" id="projen.javascript.biome.biome_config.IConsistentMemberAccessibilityOptions.property.accessibility"></a>

```typescript
public readonly accessibility: string;
```

- *Type:* string

---

### IConvention <a name="IConvention" id="projen.javascript.biome.biome_config.IConvention"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IConvention


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IConvention.property.formats">formats</a></code> | <code>string[]</code> | String cases to enforce. |
| <code><a href="#projen.javascript.biome.biome_config.IConvention.property.match">match</a></code> | <code>string</code> | Regular expression to enforce. |
| <code><a href="#projen.javascript.biome.biome_config.IConvention.property.selector">selector</a></code> | <code>projen.javascript.biome.biome_config.ISelector</code> | Declarations concerned by this convention. |

---

##### `formats`<sup>Optional</sup> <a name="formats" id="projen.javascript.biome.biome_config.IConvention.property.formats"></a>

```typescript
public readonly formats: string[];
```

- *Type:* string[]

String cases to enforce.

---

##### `match`<sup>Optional</sup> <a name="match" id="projen.javascript.biome.biome_config.IConvention.property.match"></a>

```typescript
public readonly match: string;
```

- *Type:* string

Regular expression to enforce.

---

##### `selector`<sup>Optional</sup> <a name="selector" id="projen.javascript.biome.biome_config.IConvention.property.selector"></a>

```typescript
public readonly selector: ISelector;
```

- *Type:* projen.javascript.biome.biome_config.ISelector

Declarations concerned by this convention.

---

### ICorrectness <a name="ICorrectness" id="projen.javascript.biome.biome_config.ICorrectness"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ICorrectness

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noChildrenProp">noChildrenProp</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevent passing of children as props. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noConstantCondition">noConstantCondition</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow constant expressions in conditions. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noConstantMathMinMaxClamp">noConstantMathMinMaxClamp</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of Math.min and Math.max to clamp a value where the result itself is constant. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noConstAssign">noConstAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prevents from having const variables being re-assigned. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noConstructorReturn">noConstructorReturn</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow returning a value from a constructor. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noEmptyCharacterClassInRegex">noEmptyCharacterClassInRegex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow empty character classes in regular expression literals. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noEmptyPattern">noEmptyPattern</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallows empty destructuring patterns. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noFlatMapIdentity">noFlatMapIdentity</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow to use unnecessary callback on flatMap. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noGlobalObjectCalls">noGlobalObjectCalls</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow calling global object properties as functions. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInnerDeclarations">noInnerDeclarations</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow function and var declarations that are accessible outside their block. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInvalidBuiltinInstantiation">noInvalidBuiltinInstantiation</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Ensure that builtins are correctly instantiated. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInvalidConstructorSuper">noInvalidConstructorSuper</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevents the incorrect use of super() inside classes. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInvalidDirectionInLinearGradient">noInvalidDirectionInLinearGradient</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow non-standard direction values for linear gradient functions. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInvalidGridAreas">noInvalidGridAreas</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallows invalid named grid areas in CSS Grid Layouts. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInvalidNewBuiltin">noInvalidNewBuiltin</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow new operators with global non-constructor functions. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInvalidPositionAtImportRule">noInvalidPositionAtImportRule</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noInvalidUseBeforeDeclaration">noInvalidUseBeforeDeclaration</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of variables and function parameters before their declaration. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noNewSymbol">noNewSymbol</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow new operators with the Symbol object. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noNodejsModules">noNodejsModules</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Forbid the use of Node.js builtin modules. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noNonoctalDecimalEscape">noNonoctalDecimalEscape</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow \8 and \9 escape sequences in string literals. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noPrecisionLoss">noPrecisionLoss</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow literal numbers that lose precision. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noRenderReturnValue">noRenderReturnValue</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevent the usage of the return value of React.render. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noSelfAssign">noSelfAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow assignments where both sides are exactly the same. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noSetterReturn">noSetterReturn</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow returning a value from a setter. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noStringCaseMismatch">noStringCaseMismatch</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow comparison of expressions modifying the string case with non-compliant value. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noSwitchDeclarations">noSwitchDeclarations</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow lexical declarations in switch clauses. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUndeclaredDependencies">noUndeclaredDependencies</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of dependencies that aren't specified in the package.json. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUndeclaredVariables">noUndeclaredVariables</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevents the usage of variables that haven't been declared inside the document. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnknownFunction">noUnknownFunction</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unknown CSS value functions. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnknownMediaFeatureName">noUnknownMediaFeatureName</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unknown media feature names. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnknownProperty">noUnknownProperty</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unknown properties. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnknownUnit">noUnknownUnit</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unknown CSS units. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnmatchableAnbSelector">noUnmatchableAnbSelector</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unmatchable An+B selectors. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnnecessaryContinue">noUnnecessaryContinue</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Avoid using unnecessary continue. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnreachable">noUnreachable</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unreachable code. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnreachableSuper">noUnreachableSuper</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Ensures the super() constructor is called exactly once on every code  path in a class constructor before this is accessed if the class has a superclass. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnsafeFinally">noUnsafeFinally</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow control flow statements in finally blocks. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnsafeOptionalChaining">noUnsafeOptionalChaining</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of optional chaining in contexts where the undefined value is not allowed. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnusedFunctionParameters">noUnusedFunctionParameters</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unused function parameters. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnusedImports">noUnusedImports</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unused imports. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnusedLabels">noUnusedLabels</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unused labels. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnusedPrivateClassMembers">noUnusedPrivateClassMembers</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unused private class members. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noUnusedVariables">noUnusedVariables</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unused variables. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noVoidElementsWithChildren">noVoidElementsWithChildren</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | This rules prevents void elements (AKA self-closing elements) from having children. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.noVoidTypeReturn">noVoidTypeReturn</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow returning a value from a function with the return type 'void'. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useArrayLiterals">useArrayLiterals</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow Array constructors. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useExhaustiveDependencies">useExhaustiveDependencies</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions</code> | Enforce all dependencies are correctly specified in a React hook. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useHookAtTopLevel">useHookAtTopLevel</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions</code> | Enforce that all React hooks are being called from the Top Level component functions. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useImportExtensions">useImportExtensions</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions</code> | Enforce file extensions for relative imports. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useIsNan">useIsNan</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Require calls to isNaN() when checking for NaN. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useJsxKeyInIterable">useJsxKeyInIterable</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow missing key props in iterators/collection literals. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useValidForDirection">useValidForDirection</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce "for" loop update clause moving the counter in the right direction. |
| <code><a href="#projen.javascript.biome.biome_config.ICorrectness.property.useYield">useYield</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Require generator functions to contain yield. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.ICorrectness.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noChildrenProp`<sup>Optional</sup> <a name="noChildrenProp" id="projen.javascript.biome.biome_config.ICorrectness.property.noChildrenProp"></a>

```typescript
public readonly noChildrenProp: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevent passing of children as props.

---

##### `noConstantCondition`<sup>Optional</sup> <a name="noConstantCondition" id="projen.javascript.biome.biome_config.ICorrectness.property.noConstantCondition"></a>

```typescript
public readonly noConstantCondition: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow constant expressions in conditions.

---

##### `noConstantMathMinMaxClamp`<sup>Optional</sup> <a name="noConstantMathMinMaxClamp" id="projen.javascript.biome.biome_config.ICorrectness.property.noConstantMathMinMaxClamp"></a>

```typescript
public readonly noConstantMathMinMaxClamp: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of Math.min and Math.max to clamp a value where the result itself is constant.

---

##### `noConstAssign`<sup>Optional</sup> <a name="noConstAssign" id="projen.javascript.biome.biome_config.ICorrectness.property.noConstAssign"></a>

```typescript
public readonly noConstAssign: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prevents from having const variables being re-assigned.

---

##### `noConstructorReturn`<sup>Optional</sup> <a name="noConstructorReturn" id="projen.javascript.biome.biome_config.ICorrectness.property.noConstructorReturn"></a>

```typescript
public readonly noConstructorReturn: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow returning a value from a constructor.

---

##### `noEmptyCharacterClassInRegex`<sup>Optional</sup> <a name="noEmptyCharacterClassInRegex" id="projen.javascript.biome.biome_config.ICorrectness.property.noEmptyCharacterClassInRegex"></a>

```typescript
public readonly noEmptyCharacterClassInRegex: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow empty character classes in regular expression literals.

---

##### `noEmptyPattern`<sup>Optional</sup> <a name="noEmptyPattern" id="projen.javascript.biome.biome_config.ICorrectness.property.noEmptyPattern"></a>

```typescript
public readonly noEmptyPattern: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallows empty destructuring patterns.

---

##### `noFlatMapIdentity`<sup>Optional</sup> <a name="noFlatMapIdentity" id="projen.javascript.biome.biome_config.ICorrectness.property.noFlatMapIdentity"></a>

```typescript
public readonly noFlatMapIdentity: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow to use unnecessary callback on flatMap.

---

##### `noGlobalObjectCalls`<sup>Optional</sup> <a name="noGlobalObjectCalls" id="projen.javascript.biome.biome_config.ICorrectness.property.noGlobalObjectCalls"></a>

```typescript
public readonly noGlobalObjectCalls: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow calling global object properties as functions.

---

##### `noInnerDeclarations`<sup>Optional</sup> <a name="noInnerDeclarations" id="projen.javascript.biome.biome_config.ICorrectness.property.noInnerDeclarations"></a>

```typescript
public readonly noInnerDeclarations: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow function and var declarations that are accessible outside their block.

---

##### `noInvalidBuiltinInstantiation`<sup>Optional</sup> <a name="noInvalidBuiltinInstantiation" id="projen.javascript.biome.biome_config.ICorrectness.property.noInvalidBuiltinInstantiation"></a>

```typescript
public readonly noInvalidBuiltinInstantiation: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Ensure that builtins are correctly instantiated.

---

##### `noInvalidConstructorSuper`<sup>Optional</sup> <a name="noInvalidConstructorSuper" id="projen.javascript.biome.biome_config.ICorrectness.property.noInvalidConstructorSuper"></a>

```typescript
public readonly noInvalidConstructorSuper: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevents the incorrect use of super() inside classes.

It also checks whether a call super() is missing from classes that extends other constructors.

---

##### `noInvalidDirectionInLinearGradient`<sup>Optional</sup> <a name="noInvalidDirectionInLinearGradient" id="projen.javascript.biome.biome_config.ICorrectness.property.noInvalidDirectionInLinearGradient"></a>

```typescript
public readonly noInvalidDirectionInLinearGradient: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow non-standard direction values for linear gradient functions.

---

##### `noInvalidGridAreas`<sup>Optional</sup> <a name="noInvalidGridAreas" id="projen.javascript.biome.biome_config.ICorrectness.property.noInvalidGridAreas"></a>

```typescript
public readonly noInvalidGridAreas: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallows invalid named grid areas in CSS Grid Layouts.

---

##### `noInvalidNewBuiltin`<sup>Optional</sup> <a name="noInvalidNewBuiltin" id="projen.javascript.biome.biome_config.ICorrectness.property.noInvalidNewBuiltin"></a>

```typescript
public readonly noInvalidNewBuiltin: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow new operators with global non-constructor functions.

---

##### `noInvalidPositionAtImportRule`<sup>Optional</sup> <a name="noInvalidPositionAtImportRule" id="projen.javascript.biome.biome_config.ICorrectness.property.noInvalidPositionAtImportRule"></a>

```typescript
public readonly noInvalidPositionAtImportRule: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of.

---

##### `noInvalidUseBeforeDeclaration`<sup>Optional</sup> <a name="noInvalidUseBeforeDeclaration" id="projen.javascript.biome.biome_config.ICorrectness.property.noInvalidUseBeforeDeclaration"></a>

```typescript
public readonly noInvalidUseBeforeDeclaration: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of variables and function parameters before their declaration.

---

##### `noNewSymbol`<sup>Optional</sup> <a name="noNewSymbol" id="projen.javascript.biome.biome_config.ICorrectness.property.noNewSymbol"></a>

```typescript
public readonly noNewSymbol: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow new operators with the Symbol object.

---

##### `noNodejsModules`<sup>Optional</sup> <a name="noNodejsModules" id="projen.javascript.biome.biome_config.ICorrectness.property.noNodejsModules"></a>

```typescript
public readonly noNodejsModules: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Forbid the use of Node.js builtin modules.

---

##### `noNonoctalDecimalEscape`<sup>Optional</sup> <a name="noNonoctalDecimalEscape" id="projen.javascript.biome.biome_config.ICorrectness.property.noNonoctalDecimalEscape"></a>

```typescript
public readonly noNonoctalDecimalEscape: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow \8 and \9 escape sequences in string literals.

---

##### `noPrecisionLoss`<sup>Optional</sup> <a name="noPrecisionLoss" id="projen.javascript.biome.biome_config.ICorrectness.property.noPrecisionLoss"></a>

```typescript
public readonly noPrecisionLoss: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow literal numbers that lose precision.

---

##### `noRenderReturnValue`<sup>Optional</sup> <a name="noRenderReturnValue" id="projen.javascript.biome.biome_config.ICorrectness.property.noRenderReturnValue"></a>

```typescript
public readonly noRenderReturnValue: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevent the usage of the return value of React.render.

---

##### `noSelfAssign`<sup>Optional</sup> <a name="noSelfAssign" id="projen.javascript.biome.biome_config.ICorrectness.property.noSelfAssign"></a>

```typescript
public readonly noSelfAssign: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow assignments where both sides are exactly the same.

---

##### `noSetterReturn`<sup>Optional</sup> <a name="noSetterReturn" id="projen.javascript.biome.biome_config.ICorrectness.property.noSetterReturn"></a>

```typescript
public readonly noSetterReturn: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow returning a value from a setter.

---

##### `noStringCaseMismatch`<sup>Optional</sup> <a name="noStringCaseMismatch" id="projen.javascript.biome.biome_config.ICorrectness.property.noStringCaseMismatch"></a>

```typescript
public readonly noStringCaseMismatch: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow comparison of expressions modifying the string case with non-compliant value.

---

##### `noSwitchDeclarations`<sup>Optional</sup> <a name="noSwitchDeclarations" id="projen.javascript.biome.biome_config.ICorrectness.property.noSwitchDeclarations"></a>

```typescript
public readonly noSwitchDeclarations: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow lexical declarations in switch clauses.

---

##### `noUndeclaredDependencies`<sup>Optional</sup> <a name="noUndeclaredDependencies" id="projen.javascript.biome.biome_config.ICorrectness.property.noUndeclaredDependencies"></a>

```typescript
public readonly noUndeclaredDependencies: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of dependencies that aren't specified in the package.json.

---

##### `noUndeclaredVariables`<sup>Optional</sup> <a name="noUndeclaredVariables" id="projen.javascript.biome.biome_config.ICorrectness.property.noUndeclaredVariables"></a>

```typescript
public readonly noUndeclaredVariables: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevents the usage of variables that haven't been declared inside the document.

---

##### `noUnknownFunction`<sup>Optional</sup> <a name="noUnknownFunction" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnknownFunction"></a>

```typescript
public readonly noUnknownFunction: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unknown CSS value functions.

---

##### `noUnknownMediaFeatureName`<sup>Optional</sup> <a name="noUnknownMediaFeatureName" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnknownMediaFeatureName"></a>

```typescript
public readonly noUnknownMediaFeatureName: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unknown media feature names.

---

##### `noUnknownProperty`<sup>Optional</sup> <a name="noUnknownProperty" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnknownProperty"></a>

```typescript
public readonly noUnknownProperty: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unknown properties.

---

##### `noUnknownUnit`<sup>Optional</sup> <a name="noUnknownUnit" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnknownUnit"></a>

```typescript
public readonly noUnknownUnit: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unknown CSS units.

---

##### `noUnmatchableAnbSelector`<sup>Optional</sup> <a name="noUnmatchableAnbSelector" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnmatchableAnbSelector"></a>

```typescript
public readonly noUnmatchableAnbSelector: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unmatchable An+B selectors.

---

##### `noUnnecessaryContinue`<sup>Optional</sup> <a name="noUnnecessaryContinue" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnnecessaryContinue"></a>

```typescript
public readonly noUnnecessaryContinue: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Avoid using unnecessary continue.

---

##### `noUnreachable`<sup>Optional</sup> <a name="noUnreachable" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnreachable"></a>

```typescript
public readonly noUnreachable: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unreachable code.

---

##### `noUnreachableSuper`<sup>Optional</sup> <a name="noUnreachableSuper" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnreachableSuper"></a>

```typescript
public readonly noUnreachableSuper: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Ensures the super() constructor is called exactly once on every code  path in a class constructor before this is accessed if the class has a superclass.

---

##### `noUnsafeFinally`<sup>Optional</sup> <a name="noUnsafeFinally" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnsafeFinally"></a>

```typescript
public readonly noUnsafeFinally: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow control flow statements in finally blocks.

---

##### `noUnsafeOptionalChaining`<sup>Optional</sup> <a name="noUnsafeOptionalChaining" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnsafeOptionalChaining"></a>

```typescript
public readonly noUnsafeOptionalChaining: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of optional chaining in contexts where the undefined value is not allowed.

---

##### `noUnusedFunctionParameters`<sup>Optional</sup> <a name="noUnusedFunctionParameters" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnusedFunctionParameters"></a>

```typescript
public readonly noUnusedFunctionParameters: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unused function parameters.

---

##### `noUnusedImports`<sup>Optional</sup> <a name="noUnusedImports" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnusedImports"></a>

```typescript
public readonly noUnusedImports: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unused imports.

---

##### `noUnusedLabels`<sup>Optional</sup> <a name="noUnusedLabels" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnusedLabels"></a>

```typescript
public readonly noUnusedLabels: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unused labels.

---

##### `noUnusedPrivateClassMembers`<sup>Optional</sup> <a name="noUnusedPrivateClassMembers" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnusedPrivateClassMembers"></a>

```typescript
public readonly noUnusedPrivateClassMembers: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unused private class members.

---

##### `noUnusedVariables`<sup>Optional</sup> <a name="noUnusedVariables" id="projen.javascript.biome.biome_config.ICorrectness.property.noUnusedVariables"></a>

```typescript
public readonly noUnusedVariables: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unused variables.

---

##### `noVoidElementsWithChildren`<sup>Optional</sup> <a name="noVoidElementsWithChildren" id="projen.javascript.biome.biome_config.ICorrectness.property.noVoidElementsWithChildren"></a>

```typescript
public readonly noVoidElementsWithChildren: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

This rules prevents void elements (AKA self-closing elements) from having children.

---

##### `noVoidTypeReturn`<sup>Optional</sup> <a name="noVoidTypeReturn" id="projen.javascript.biome.biome_config.ICorrectness.property.noVoidTypeReturn"></a>

```typescript
public readonly noVoidTypeReturn: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow returning a value from a function with the return type 'void'.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.ICorrectness.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

##### `useArrayLiterals`<sup>Optional</sup> <a name="useArrayLiterals" id="projen.javascript.biome.biome_config.ICorrectness.property.useArrayLiterals"></a>

```typescript
public readonly useArrayLiterals: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow Array constructors.

---

##### `useExhaustiveDependencies`<sup>Optional</sup> <a name="useExhaustiveDependencies" id="projen.javascript.biome.biome_config.ICorrectness.property.useExhaustiveDependencies"></a>

```typescript
public readonly useExhaustiveDependencies: string | IRuleWithUseExhaustiveDependenciesOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions

Enforce all dependencies are correctly specified in a React hook.

---

##### `useHookAtTopLevel`<sup>Optional</sup> <a name="useHookAtTopLevel" id="projen.javascript.biome.biome_config.ICorrectness.property.useHookAtTopLevel"></a>

```typescript
public readonly useHookAtTopLevel: string | IRuleWithDeprecatedHooksOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions

Enforce that all React hooks are being called from the Top Level component functions.

---

##### `useImportExtensions`<sup>Optional</sup> <a name="useImportExtensions" id="projen.javascript.biome.biome_config.ICorrectness.property.useImportExtensions"></a>

```typescript
public readonly useImportExtensions: string | IRuleWithUseImportExtensionsOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions

Enforce file extensions for relative imports.

---

##### `useIsNan`<sup>Optional</sup> <a name="useIsNan" id="projen.javascript.biome.biome_config.ICorrectness.property.useIsNan"></a>

```typescript
public readonly useIsNan: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Require calls to isNaN() when checking for NaN.

---

##### `useJsxKeyInIterable`<sup>Optional</sup> <a name="useJsxKeyInIterable" id="projen.javascript.biome.biome_config.ICorrectness.property.useJsxKeyInIterable"></a>

```typescript
public readonly useJsxKeyInIterable: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow missing key props in iterators/collection literals.

---

##### `useValidForDirection`<sup>Optional</sup> <a name="useValidForDirection" id="projen.javascript.biome.biome_config.ICorrectness.property.useValidForDirection"></a>

```typescript
public readonly useValidForDirection: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce "for" loop update clause moving the counter in the right direction.

---

##### `useYield`<sup>Optional</sup> <a name="useYield" id="projen.javascript.biome.biome_config.ICorrectness.property.useYield"></a>

```typescript
public readonly useYield: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Require generator functions to contain yield.

---

### ICssAssists <a name="ICssAssists" id="projen.javascript.biome.biome_config.ICssAssists"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ICssAssists

Options that changes how the CSS assists behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ICssAssists.property.enabled">enabled</a></code> | <code>boolean</code> | Control the assists for CSS files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.ICssAssists.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the assists for CSS files.

---

### ICssConfiguration <a name="ICssConfiguration" id="projen.javascript.biome.biome_config.ICssConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ICssConfiguration

Options applied to CSS files.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ICssConfiguration.property.assists">assists</a></code> | <code>projen.javascript.biome.biome_config.ICssAssists</code> | CSS assists options. |
| <code><a href="#projen.javascript.biome.biome_config.ICssConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome.biome_config.ICssFormatter</code> | CSS formatter options. |
| <code><a href="#projen.javascript.biome.biome_config.ICssConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome.biome_config.ICssLinter</code> | CSS linter options. |
| <code><a href="#projen.javascript.biome.biome_config.ICssConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome.biome_config.ICssParser</code> | CSS parsing options. |

---

##### `assists`<sup>Optional</sup> <a name="assists" id="projen.javascript.biome.biome_config.ICssConfiguration.property.assists"></a>

```typescript
public readonly assists: ICssAssists;
```

- *Type:* projen.javascript.biome.biome_config.ICssAssists

CSS assists options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome.biome_config.ICssConfiguration.property.formatter"></a>

```typescript
public readonly formatter: ICssFormatter;
```

- *Type:* projen.javascript.biome.biome_config.ICssFormatter

CSS formatter options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome.biome_config.ICssConfiguration.property.linter"></a>

```typescript
public readonly linter: ICssLinter;
```

- *Type:* projen.javascript.biome.biome_config.ICssLinter

CSS linter options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome.biome_config.ICssConfiguration.property.parser"></a>

```typescript
public readonly parser: ICssParser;
```

- *Type:* projen.javascript.biome.biome_config.ICssParser

CSS parsing options.

---

### ICssFormatter <a name="ICssFormatter" id="projen.javascript.biome.biome_config.ICssFormatter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ICssFormatter

Options that changes how the CSS formatter behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ICssFormatter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.ICssFormatter.property.indentStyle">indentStyle</a></code> | <code>string</code> | The indent style applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.ICssFormatter.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.ICssFormatter.property.lineEnding">lineEnding</a></code> | <code>string</code> | The type of line ending applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.ICssFormatter.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to CSS (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.ICssFormatter.property.quoteStyle">quoteStyle</a></code> | <code>string</code> | The type of quotes used in CSS code. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.ICssFormatter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for CSS (and its super languages) files.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome.biome_config.ICssFormatter.property.indentStyle"></a>

```typescript
public readonly indentStyle: string;
```

- *Type:* string

The indent style applied to CSS (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome.biome_config.ICssFormatter.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation applied to CSS (and its super languages) files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome.biome_config.ICssFormatter.property.lineEnding"></a>

```typescript
public readonly lineEnding: string;
```

- *Type:* string

The type of line ending applied to CSS (and its super languages) files.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome.biome_config.ICssFormatter.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

What's the max width of a line applied to CSS (and its super languages) files.

Defaults to 80.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome.biome_config.ICssFormatter.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: string;
```

- *Type:* string

The type of quotes used in CSS code.

Defaults to double.

---

### ICssLinter <a name="ICssLinter" id="projen.javascript.biome.biome_config.ICssLinter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ICssLinter

Options that changes how the CSS linter behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ICssLinter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for CSS files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.ICssLinter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for CSS files.

---

### ICssParser <a name="ICssParser" id="projen.javascript.biome.biome_config.ICssParser"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ICssParser

Options that changes how the CSS parser behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ICssParser.property.allowWrongLineComments">allowWrongLineComments</a></code> | <code>boolean</code> | Allow comments to appear on incorrect lines in `.css` files. |
| <code><a href="#projen.javascript.biome.biome_config.ICssParser.property.cssModules">cssModules</a></code> | <code>boolean</code> | Enables parsing of CSS Modules specific features. |

---

##### `allowWrongLineComments`<sup>Optional</sup> <a name="allowWrongLineComments" id="projen.javascript.biome.biome_config.ICssParser.property.allowWrongLineComments"></a>

```typescript
public readonly allowWrongLineComments: boolean;
```

- *Type:* boolean

Allow comments to appear on incorrect lines in `.css` files.

---

##### `cssModules`<sup>Optional</sup> <a name="cssModules" id="projen.javascript.biome.biome_config.ICssParser.property.cssModules"></a>

```typescript
public readonly cssModules: boolean;
```

- *Type:* boolean

Enables parsing of CSS Modules specific features.

---

### ICustomRestrictedTypeOptions <a name="ICustomRestrictedTypeOptions" id="projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions.property.message">message</a></code> | <code>string</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions.property.use">use</a></code> | <code>string</code> | *No description.* |

---

##### `message`<sup>Optional</sup> <a name="message" id="projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions.property.message"></a>

```typescript
public readonly message: string;
```

- *Type:* string

---

##### `use`<sup>Optional</sup> <a name="use" id="projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions.property.use"></a>

```typescript
public readonly use: string;
```

- *Type:* string

---

### IDeprecatedHooksOptions <a name="IDeprecatedHooksOptions" id="projen.javascript.biome.biome_config.IDeprecatedHooksOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IDeprecatedHooksOptions

Options for the `useHookAtTopLevel` rule have been deprecated, since we now use the React hook naming convention to determine whether a function is a hook.



### IFilenamingConventionOptions <a name="IFilenamingConventionOptions" id="projen.javascript.biome.biome_config.IFilenamingConventionOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IFilenamingConventionOptions

Rule's options.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IFilenamingConventionOptions.property.filenameCases">filenameCases</a></code> | <code>string[]</code> | Allowed cases for file names. |
| <code><a href="#projen.javascript.biome.biome_config.IFilenamingConventionOptions.property.requireAscii">requireAscii</a></code> | <code>boolean</code> | If `false`, then non-ASCII characters are allowed. |
| <code><a href="#projen.javascript.biome.biome_config.IFilenamingConventionOptions.property.strictCase">strictCase</a></code> | <code>boolean</code> | If `false`, then consecutive uppercase are allowed in _camel_ and _pascal_ cases. |

---

##### `filenameCases`<sup>Optional</sup> <a name="filenameCases" id="projen.javascript.biome.biome_config.IFilenamingConventionOptions.property.filenameCases"></a>

```typescript
public readonly filenameCases: string[];
```

- *Type:* string[]

Allowed cases for file names.

---

##### `requireAscii`<sup>Optional</sup> <a name="requireAscii" id="projen.javascript.biome.biome_config.IFilenamingConventionOptions.property.requireAscii"></a>

```typescript
public readonly requireAscii: boolean;
```

- *Type:* boolean

If `false`, then non-ASCII characters are allowed.

---

##### `strictCase`<sup>Optional</sup> <a name="strictCase" id="projen.javascript.biome.biome_config.IFilenamingConventionOptions.property.strictCase"></a>

```typescript
public readonly strictCase: boolean;
```

- *Type:* boolean

If `false`, then consecutive uppercase are allowed in _camel_ and _pascal_ cases.

This does not affect other [Case].

---

### IFilesConfiguration <a name="IFilesConfiguration" id="projen.javascript.biome.biome_config.IFilesConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IFilesConfiguration

The configuration of the filesystem.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IFilesConfiguration.property.ignore">ignore</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IFilesConfiguration.property.ignoreUnknown">ignoreUnknown</a></code> | <code>boolean</code> | Tells Biome to not emit diagnostics when handling files that doesn't know. |
| <code><a href="#projen.javascript.biome.biome_config.IFilesConfiguration.property.include">include</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IFilesConfiguration.property.maxSize">maxSize</a></code> | <code>number</code> | The maximum allowed size for source code files in bytes. |

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="projen.javascript.biome.biome_config.IFilesConfiguration.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

Biome will ignore files/folders that will match these patterns.

---

##### `ignoreUnknown`<sup>Optional</sup> <a name="ignoreUnknown" id="projen.javascript.biome.biome_config.IFilesConfiguration.property.ignoreUnknown"></a>

```typescript
public readonly ignoreUnknown: boolean;
```

- *Type:* boolean

Tells Biome to not emit diagnostics when handling files that doesn't know.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.javascript.biome.biome_config.IFilesConfiguration.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

Biome will handle only those files/folders that will match these patterns.

---

##### `maxSize`<sup>Optional</sup> <a name="maxSize" id="projen.javascript.biome.biome_config.IFilesConfiguration.property.maxSize"></a>

```typescript
public readonly maxSize: number;
```

- *Type:* number

The maximum allowed size for source code files in bytes.

Files above this limit will be ignored for performance reasons. Defaults to 1 MiB

---

### IFormatterConfiguration <a name="IFormatterConfiguration" id="projen.javascript.biome.biome_config.IFormatterConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IFormatterConfiguration

Generic options applied to all files.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>string</code> | The attribute position style in HTMLish languages. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.formatWithErrors">formatWithErrors</a></code> | <code>boolean</code> | Stores whether formatting should be allowed to proceed if a given file has syntax errors. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.ignore">ignore</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.include">include</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.indentSize">indentSize</a></code> | <code>number</code> | The size of the indentation, 2 by default (deprecated, use `indent-width`). |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>string</code> | The indent style. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation, 2 by default. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>string</code> | The type of line ending. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line. |
| <code><a href="#projen.javascript.biome.biome_config.IFormatterConfiguration.property.useEditorconfig">useEditorconfig</a></code> | <code>boolean</code> | Use any `.editorconfig` files to configure the formatter. Configuration in `biome.json` will override `.editorconfig` configuration. Default: false. |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: string;
```

- *Type:* string

The attribute position style in HTMLish languages.

By default auto.

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

##### `formatWithErrors`<sup>Optional</sup> <a name="formatWithErrors" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.formatWithErrors"></a>

```typescript
public readonly formatWithErrors: boolean;
```

- *Type:* boolean

Stores whether formatting should be allowed to proceed if a given file has syntax errors.

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will ignore files/folders that will match these patterns.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will include files/folders that will match these patterns.

---

##### `indentSize`<sup>Optional</sup> <a name="indentSize" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.indentSize"></a>

```typescript
public readonly indentSize: number;
```

- *Type:* number

The size of the indentation, 2 by default (deprecated, use `indent-width`).

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: string;
```

- *Type:* string

The indent style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation, 2 by default.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: string;
```

- *Type:* string

The type of line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

What's the max width of a line.

Defaults to 80.

---

##### `useEditorconfig`<sup>Optional</sup> <a name="useEditorconfig" id="projen.javascript.biome.biome_config.IFormatterConfiguration.property.useEditorconfig"></a>

```typescript
public readonly useEditorconfig: boolean;
```

- *Type:* boolean

Use any `.editorconfig` files to configure the formatter. Configuration in `biome.json` will override `.editorconfig` configuration. Default: false.

---

### IGraphqlConfiguration <a name="IGraphqlConfiguration" id="projen.javascript.biome.biome_config.IGraphqlConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IGraphqlConfiguration

Options applied to GraphQL files.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome.biome_config.IGraphqlFormatter</code> | GraphQL formatter options. |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome.biome_config.IGraphqlLinter</code> | *No description.* |

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome.biome_config.IGraphqlConfiguration.property.formatter"></a>

```typescript
public readonly formatter: IGraphqlFormatter;
```

- *Type:* projen.javascript.biome.biome_config.IGraphqlFormatter

GraphQL formatter options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome.biome_config.IGraphqlConfiguration.property.linter"></a>

```typescript
public readonly linter: IGraphqlLinter;
```

- *Type:* projen.javascript.biome.biome_config.IGraphqlLinter

---

### IGraphqlFormatter <a name="IGraphqlFormatter" id="projen.javascript.biome.biome_config.IGraphqlFormatter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IGraphqlFormatter

Options that changes how the GraphQL formatter behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlFormatter.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlFormatter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for GraphQL files. |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlFormatter.property.indentStyle">indentStyle</a></code> | <code>string</code> | The indent style applied to GraphQL files. |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlFormatter.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to GraphQL files. |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlFormatter.property.lineEnding">lineEnding</a></code> | <code>string</code> | The type of line ending applied to GraphQL files. |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlFormatter.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to GraphQL files. |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlFormatter.property.quoteStyle">quoteStyle</a></code> | <code>string</code> | The type of quotes used in GraphQL code. |

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome.biome_config.IGraphqlFormatter.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IGraphqlFormatter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for GraphQL files.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome.biome_config.IGraphqlFormatter.property.indentStyle"></a>

```typescript
public readonly indentStyle: string;
```

- *Type:* string

The indent style applied to GraphQL files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome.biome_config.IGraphqlFormatter.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation applied to GraphQL files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome.biome_config.IGraphqlFormatter.property.lineEnding"></a>

```typescript
public readonly lineEnding: string;
```

- *Type:* string

The type of line ending applied to GraphQL files.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome.biome_config.IGraphqlFormatter.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

What's the max width of a line applied to GraphQL files.

Defaults to 80.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome.biome_config.IGraphqlFormatter.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: string;
```

- *Type:* string

The type of quotes used in GraphQL code.

Defaults to double.

---

### IGraphqlLinter <a name="IGraphqlLinter" id="projen.javascript.biome.biome_config.IGraphqlLinter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IGraphqlLinter

Options that changes how the GraphQL linter behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IGraphqlLinter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for GraphQL files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IGraphqlLinter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for GraphQL files.

---

### IHook <a name="IHook" id="projen.javascript.biome.biome_config.IHook"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IHook


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IHook.property.closureIndex">closureIndex</a></code> | <code>number</code> | The "position" of the closure function, starting from zero. |
| <code><a href="#projen.javascript.biome.biome_config.IHook.property.dependenciesIndex">dependenciesIndex</a></code> | <code>number</code> | The "position" of the array of dependencies, starting from zero. |
| <code><a href="#projen.javascript.biome.biome_config.IHook.property.name">name</a></code> | <code>string</code> | The name of the hook. |
| <code><a href="#projen.javascript.biome.biome_config.IHook.property.stableResult">stableResult</a></code> | <code>boolean \| number[]</code> | Whether the result of the hook is stable. |

---

##### `closureIndex`<sup>Optional</sup> <a name="closureIndex" id="projen.javascript.biome.biome_config.IHook.property.closureIndex"></a>

```typescript
public readonly closureIndex: number;
```

- *Type:* number

The "position" of the closure function, starting from zero.

For example, for React's `useEffect()` hook, the closure index is 0.

---

##### `dependenciesIndex`<sup>Optional</sup> <a name="dependenciesIndex" id="projen.javascript.biome.biome_config.IHook.property.dependenciesIndex"></a>

```typescript
public readonly dependenciesIndex: number;
```

- *Type:* number

The "position" of the array of dependencies, starting from zero.

For example, for React's `useEffect()` hook, the dependencies index is 1.

---

##### `name`<sup>Optional</sup> <a name="name" id="projen.javascript.biome.biome_config.IHook.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the hook.

---

##### `stableResult`<sup>Optional</sup> <a name="stableResult" id="projen.javascript.biome.biome_config.IHook.property.stableResult"></a>

```typescript
public readonly stableResult: boolean | number[];
```

- *Type:* boolean | number[]

Whether the result of the hook is stable.

Set to `true` to mark the identity of the hook's return value as stable, or use a number/an array of numbers to mark the "positions" in the return array as stable.

For example, for React's `useRef()` hook the value would be `true`, while for `useState()` it would be `[1]`.

---

### IJavascriptAssists <a name="IJavascriptAssists" id="projen.javascript.biome.biome_config.IJavascriptAssists"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJavascriptAssists

Linter options specific to the JavaScript linter.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptAssists.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for JavaScript (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IJavascriptAssists.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for JavaScript (and its super languages) files.

---

### IJavascriptConfiguration <a name="IJavascriptConfiguration" id="projen.javascript.biome.biome_config.IJavascriptConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJavascriptConfiguration

A set of options applied to the JavaScript files.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptConfiguration.property.assists">assists</a></code> | <code>projen.javascript.biome.biome_config.IJavascriptAssists</code> | Assists options. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome.biome_config.IJavascriptFormatter</code> | Formatting options. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptConfiguration.property.globals">globals</a></code> | <code>string[]</code> | A list of global bindings that should be ignored by the analyzers. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptConfiguration.property.jsxRuntime">jsxRuntime</a></code> | <code>string</code> | Indicates the type of runtime or transformation used for interpreting JSX. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome.biome_config.IJavascriptLinter</code> | Linter options. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptConfiguration.property.organizeImports">organizeImports</a></code> | <code>projen.javascript.biome.biome_config.IJavascriptOrganizeImports</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome.biome_config.IJavascriptParser</code> | Parsing options. |

---

##### `assists`<sup>Optional</sup> <a name="assists" id="projen.javascript.biome.biome_config.IJavascriptConfiguration.property.assists"></a>

```typescript
public readonly assists: IJavascriptAssists;
```

- *Type:* projen.javascript.biome.biome_config.IJavascriptAssists

Assists options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome.biome_config.IJavascriptConfiguration.property.formatter"></a>

```typescript
public readonly formatter: IJavascriptFormatter;
```

- *Type:* projen.javascript.biome.biome_config.IJavascriptFormatter

Formatting options.

---

##### `globals`<sup>Optional</sup> <a name="globals" id="projen.javascript.biome.biome_config.IJavascriptConfiguration.property.globals"></a>

```typescript
public readonly globals: string[];
```

- *Type:* string[]

A list of global bindings that should be ignored by the analyzers.

If defined here, they should not emit diagnostics.

---

##### `jsxRuntime`<sup>Optional</sup> <a name="jsxRuntime" id="projen.javascript.biome.biome_config.IJavascriptConfiguration.property.jsxRuntime"></a>

```typescript
public readonly jsxRuntime: string;
```

- *Type:* string

Indicates the type of runtime or transformation used for interpreting JSX.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome.biome_config.IJavascriptConfiguration.property.linter"></a>

```typescript
public readonly linter: IJavascriptLinter;
```

- *Type:* projen.javascript.biome.biome_config.IJavascriptLinter

Linter options.

---

##### `organizeImports`<sup>Optional</sup> <a name="organizeImports" id="projen.javascript.biome.biome_config.IJavascriptConfiguration.property.organizeImports"></a>

```typescript
public readonly organizeImports: IJavascriptOrganizeImports;
```

- *Type:* projen.javascript.biome.biome_config.IJavascriptOrganizeImports

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome.biome_config.IJavascriptConfiguration.property.parser"></a>

```typescript
public readonly parser: IJavascriptParser;
```

- *Type:* projen.javascript.biome.biome_config.IJavascriptParser

Parsing options.

---

### IJavascriptFormatter <a name="IJavascriptFormatter" id="projen.javascript.biome.biome_config.IJavascriptFormatter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJavascriptFormatter

Formatting options specific to the JavaScript files.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.arrowParentheses">arrowParentheses</a></code> | <code>string</code> | Whether to add non-necessary parentheses to arrow functions. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.attributePosition">attributePosition</a></code> | <code>string</code> | The attribute position style in jsx elements. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.bracketSameLine">bracketSameLine</a></code> | <code>boolean</code> | Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line, rather than being alone on the following line. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.indentSize">indentSize</a></code> | <code>number</code> | The size of the indentation applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.indentStyle">indentStyle</a></code> | <code>string</code> | The indent style applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.jsxQuoteStyle">jsxQuoteStyle</a></code> | <code>string</code> | The type of quotes used in JSX. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.lineEnding">lineEnding</a></code> | <code>string</code> | The type of line ending applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to JavaScript (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.quoteProperties">quoteProperties</a></code> | <code>string</code> | When properties in objects are quoted. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.quoteStyle">quoteStyle</a></code> | <code>string</code> | The type of quotes used in JavaScript code. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.semicolons">semicolons</a></code> | <code>string</code> | Whether the formatter prints semicolons for all statements or only in for statements where it is necessary because of ASI. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.trailingComma">trailingComma</a></code> | <code>string</code> | Print trailing commas wherever possible in multi-line comma-separated syntactic structures. |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptFormatter.property.trailingCommas">trailingCommas</a></code> | <code>string</code> | Print trailing commas wherever possible in multi-line comma-separated syntactic structures. |

---

##### `arrowParentheses`<sup>Optional</sup> <a name="arrowParentheses" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.arrowParentheses"></a>

```typescript
public readonly arrowParentheses: string;
```

- *Type:* string

Whether to add non-necessary parentheses to arrow functions.

Defaults to "always".

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.attributePosition"></a>

```typescript
public readonly attributePosition: string;
```

- *Type:* string

The attribute position style in jsx elements.

Defaults to auto.

---

##### `bracketSameLine`<sup>Optional</sup> <a name="bracketSameLine" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.bracketSameLine"></a>

```typescript
public readonly bracketSameLine: boolean;
```

- *Type:* boolean

Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line, rather than being alone on the following line.

Defaults to false.

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for JavaScript (and its super languages) files.

---

##### `indentSize`<sup>Optional</sup> <a name="indentSize" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.indentSize"></a>

```typescript
public readonly indentSize: number;
```

- *Type:* number

The size of the indentation applied to JavaScript (and its super languages) files.

Default to 2.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.indentStyle"></a>

```typescript
public readonly indentStyle: string;
```

- *Type:* string

The indent style applied to JavaScript (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation applied to JavaScript (and its super languages) files.

Default to 2.

---

##### `jsxQuoteStyle`<sup>Optional</sup> <a name="jsxQuoteStyle" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.jsxQuoteStyle"></a>

```typescript
public readonly jsxQuoteStyle: string;
```

- *Type:* string

The type of quotes used in JSX.

Defaults to double.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.lineEnding"></a>

```typescript
public readonly lineEnding: string;
```

- *Type:* string

The type of line ending applied to JavaScript (and its super languages) files.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

What's the max width of a line applied to JavaScript (and its super languages) files.

Defaults to 80.

---

##### `quoteProperties`<sup>Optional</sup> <a name="quoteProperties" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.quoteProperties"></a>

```typescript
public readonly quoteProperties: string;
```

- *Type:* string

When properties in objects are quoted.

Defaults to asNeeded.

---

##### `quoteStyle`<sup>Optional</sup> <a name="quoteStyle" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.quoteStyle"></a>

```typescript
public readonly quoteStyle: string;
```

- *Type:* string

The type of quotes used in JavaScript code.

Defaults to double.

---

##### `semicolons`<sup>Optional</sup> <a name="semicolons" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.semicolons"></a>

```typescript
public readonly semicolons: string;
```

- *Type:* string

Whether the formatter prints semicolons for all statements or only in for statements where it is necessary because of ASI.

---

##### `trailingComma`<sup>Optional</sup> <a name="trailingComma" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.trailingComma"></a>

```typescript
public readonly trailingComma: string;
```

- *Type:* string

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

Defaults to "all".

---

##### `trailingCommas`<sup>Optional</sup> <a name="trailingCommas" id="projen.javascript.biome.biome_config.IJavascriptFormatter.property.trailingCommas"></a>

```typescript
public readonly trailingCommas: string;
```

- *Type:* string

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

Defaults to "all".

---

### IJavascriptLinter <a name="IJavascriptLinter" id="projen.javascript.biome.biome_config.IJavascriptLinter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJavascriptLinter

Linter options specific to the JavaScript linter.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptLinter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for JavaScript (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IJavascriptLinter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for JavaScript (and its super languages) files.

---

### IJavascriptOrganizeImports <a name="IJavascriptOrganizeImports" id="projen.javascript.biome.biome_config.IJavascriptOrganizeImports"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJavascriptOrganizeImports



### IJavascriptParser <a name="IJavascriptParser" id="projen.javascript.biome.biome_config.IJavascriptParser"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJavascriptParser

Options that changes how the JavaScript parser behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJavascriptParser.property.unsafeParameterDecoratorsEnabled">unsafeParameterDecoratorsEnabled</a></code> | <code>boolean</code> | It enables the experimental and unsafe parsing of parameter decorators. |

---

##### `unsafeParameterDecoratorsEnabled`<sup>Optional</sup> <a name="unsafeParameterDecoratorsEnabled" id="projen.javascript.biome.biome_config.IJavascriptParser.property.unsafeParameterDecoratorsEnabled"></a>

```typescript
public readonly unsafeParameterDecoratorsEnabled: boolean;
```

- *Type:* boolean

It enables the experimental and unsafe parsing of parameter decorators.

These decorators belong to an old proposal, and they are subject to change.

---

### IJsonAssists <a name="IJsonAssists" id="projen.javascript.biome.biome_config.IJsonAssists"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJsonAssists

Linter options specific to the JSON linter.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJsonAssists.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for JSON (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IJsonAssists.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for JSON (and its super languages) files.

---

### IJsonConfiguration <a name="IJsonConfiguration" id="projen.javascript.biome.biome_config.IJsonConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJsonConfiguration

Options applied to JSON files.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJsonConfiguration.property.assists">assists</a></code> | <code>projen.javascript.biome.biome_config.IJsonAssists</code> | Assists options. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonConfiguration.property.formatter">formatter</a></code> | <code>projen.javascript.biome.biome_config.IJsonFormatter</code> | Formatting options. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonConfiguration.property.linter">linter</a></code> | <code>projen.javascript.biome.biome_config.IJsonLinter</code> | Linting options. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonConfiguration.property.parser">parser</a></code> | <code>projen.javascript.biome.biome_config.IJsonParser</code> | Parsing options. |

---

##### `assists`<sup>Optional</sup> <a name="assists" id="projen.javascript.biome.biome_config.IJsonConfiguration.property.assists"></a>

```typescript
public readonly assists: IJsonAssists;
```

- *Type:* projen.javascript.biome.biome_config.IJsonAssists

Assists options.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome.biome_config.IJsonConfiguration.property.formatter"></a>

```typescript
public readonly formatter: IJsonFormatter;
```

- *Type:* projen.javascript.biome.biome_config.IJsonFormatter

Formatting options.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome.biome_config.IJsonConfiguration.property.linter"></a>

```typescript
public readonly linter: IJsonLinter;
```

- *Type:* projen.javascript.biome.biome_config.IJsonLinter

Linting options.

---

##### `parser`<sup>Optional</sup> <a name="parser" id="projen.javascript.biome.biome_config.IJsonConfiguration.property.parser"></a>

```typescript
public readonly parser: IJsonParser;
```

- *Type:* projen.javascript.biome.biome_config.IJsonParser

Parsing options.

---

### IJsonFormatter <a name="IJsonFormatter" id="projen.javascript.biome.biome_config.IJsonFormatter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJsonFormatter


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJsonFormatter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the formatter for JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonFormatter.property.indentSize">indentSize</a></code> | <code>number</code> | The size of the indentation applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonFormatter.property.indentStyle">indentStyle</a></code> | <code>string</code> | The indent style applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonFormatter.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonFormatter.property.lineEnding">lineEnding</a></code> | <code>string</code> | The type of line ending applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonFormatter.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line applied to JSON (and its super languages) files. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonFormatter.property.trailingCommas">trailingCommas</a></code> | <code>string</code> | Print trailing commas wherever possible in multi-line comma-separated syntactic structures. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IJsonFormatter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the formatter for JSON (and its super languages) files.

---

##### `indentSize`<sup>Optional</sup> <a name="indentSize" id="projen.javascript.biome.biome_config.IJsonFormatter.property.indentSize"></a>

```typescript
public readonly indentSize: number;
```

- *Type:* number

The size of the indentation applied to JSON (and its super languages) files.

Default to 2.

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome.biome_config.IJsonFormatter.property.indentStyle"></a>

```typescript
public readonly indentStyle: string;
```

- *Type:* string

The indent style applied to JSON (and its super languages) files.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome.biome_config.IJsonFormatter.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation applied to JSON (and its super languages) files.

Default to 2.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome.biome_config.IJsonFormatter.property.lineEnding"></a>

```typescript
public readonly lineEnding: string;
```

- *Type:* string

The type of line ending applied to JSON (and its super languages) files.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome.biome_config.IJsonFormatter.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

What's the max width of a line applied to JSON (and its super languages) files.

Defaults to 80.

---

##### `trailingCommas`<sup>Optional</sup> <a name="trailingCommas" id="projen.javascript.biome.biome_config.IJsonFormatter.property.trailingCommas"></a>

```typescript
public readonly trailingCommas: string;
```

- *Type:* string

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

Defaults to "none".

---

### IJsonLinter <a name="IJsonLinter" id="projen.javascript.biome.biome_config.IJsonLinter"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJsonLinter

Linter options specific to the JSON linter.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJsonLinter.property.enabled">enabled</a></code> | <code>boolean</code> | Control the linter for JSON (and its super languages) files. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IJsonLinter.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Control the linter for JSON (and its super languages) files.

---

### IJsonParser <a name="IJsonParser" id="projen.javascript.biome.biome_config.IJsonParser"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IJsonParser

Options that changes how the JSON parser behaves.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IJsonParser.property.allowComments">allowComments</a></code> | <code>boolean</code> | Allow parsing comments in `.json` files. |
| <code><a href="#projen.javascript.biome.biome_config.IJsonParser.property.allowTrailingCommas">allowTrailingCommas</a></code> | <code>boolean</code> | Allow parsing trailing commas in `.json` files. |

---

##### `allowComments`<sup>Optional</sup> <a name="allowComments" id="projen.javascript.biome.biome_config.IJsonParser.property.allowComments"></a>

```typescript
public readonly allowComments: boolean;
```

- *Type:* boolean

Allow parsing comments in `.json` files.

---

##### `allowTrailingCommas`<sup>Optional</sup> <a name="allowTrailingCommas" id="projen.javascript.biome.biome_config.IJsonParser.property.allowTrailingCommas"></a>

```typescript
public readonly allowTrailingCommas: boolean;
```

- *Type:* boolean

Allow parsing trailing commas in `.json` files.

---

### ILinterConfiguration <a name="ILinterConfiguration" id="projen.javascript.biome.biome_config.ILinterConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ILinterConfiguration


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ILinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | if `false`, it disables the feature and the linter won't be executed. |
| <code><a href="#projen.javascript.biome.biome_config.ILinterConfiguration.property.ignore">ignore</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.ILinterConfiguration.property.include">include</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.ILinterConfiguration.property.rules">rules</a></code> | <code>projen.javascript.biome.biome_config.IRules</code> | List of rules. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.ILinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

if `false`, it disables the feature and the linter won't be executed.

`true` by default

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="projen.javascript.biome.biome_config.ILinterConfiguration.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will ignore files/folders that will match these patterns.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.javascript.biome.biome_config.ILinterConfiguration.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will include files/folders that will match these patterns.

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.biome.biome_config.ILinterConfiguration.property.rules"></a>

```typescript
public readonly rules: IRules;
```

- *Type:* projen.javascript.biome.biome_config.IRules

List of rules.

---

### INamingConventionOptions <a name="INamingConventionOptions" id="projen.javascript.biome.biome_config.INamingConventionOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.INamingConventionOptions

Rule's options.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.INamingConventionOptions.property.conventions">conventions</a></code> | <code>projen.javascript.biome.biome_config.IConvention[]</code> | Custom conventions. |
| <code><a href="#projen.javascript.biome.biome_config.INamingConventionOptions.property.enumMemberCase">enumMemberCase</a></code> | <code>string</code> | Allowed cases for _TypeScript_ `enum` member names. |
| <code><a href="#projen.javascript.biome.biome_config.INamingConventionOptions.property.requireAscii">requireAscii</a></code> | <code>boolean</code> | If `false`, then non-ASCII characters are allowed. |
| <code><a href="#projen.javascript.biome.biome_config.INamingConventionOptions.property.strictCase">strictCase</a></code> | <code>boolean</code> | If `false`, then consecutive uppercase are allowed in _camel_ and _pascal_ cases. |

---

##### `conventions`<sup>Optional</sup> <a name="conventions" id="projen.javascript.biome.biome_config.INamingConventionOptions.property.conventions"></a>

```typescript
public readonly conventions: IConvention[];
```

- *Type:* projen.javascript.biome.biome_config.IConvention[]

Custom conventions.

---

##### `enumMemberCase`<sup>Optional</sup> <a name="enumMemberCase" id="projen.javascript.biome.biome_config.INamingConventionOptions.property.enumMemberCase"></a>

```typescript
public readonly enumMemberCase: string;
```

- *Type:* string

Allowed cases for _TypeScript_ `enum` member names.

---

##### `requireAscii`<sup>Optional</sup> <a name="requireAscii" id="projen.javascript.biome.biome_config.INamingConventionOptions.property.requireAscii"></a>

```typescript
public readonly requireAscii: boolean;
```

- *Type:* boolean

If `false`, then non-ASCII characters are allowed.

---

##### `strictCase`<sup>Optional</sup> <a name="strictCase" id="projen.javascript.biome.biome_config.INamingConventionOptions.property.strictCase"></a>

```typescript
public readonly strictCase: boolean;
```

- *Type:* boolean

If `false`, then consecutive uppercase are allowed in _camel_ and _pascal_ cases.

This does not affect other [Case].

---

### INoConsoleOptions <a name="INoConsoleOptions" id="projen.javascript.biome.biome_config.INoConsoleOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.INoConsoleOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.INoConsoleOptions.property.allow">allow</a></code> | <code>string[]</code> | Allowed calls on the console object. |

---

##### `allow`<sup>Required</sup> <a name="allow" id="projen.javascript.biome.biome_config.INoConsoleOptions.property.allow"></a>

```typescript
public readonly allow: string[];
```

- *Type:* string[]

Allowed calls on the console object.

---

### INoDoubleEqualsOptions <a name="INoDoubleEqualsOptions" id="projen.javascript.biome.biome_config.INoDoubleEqualsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.INoDoubleEqualsOptions

Rule's options.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.INoDoubleEqualsOptions.property.ignoreNull">ignoreNull</a></code> | <code>boolean</code> | If `true`, an exception is made when comparing with `null`, as it's often relied on to check both for `null` or `undefined`. |

---

##### `ignoreNull`<sup>Optional</sup> <a name="ignoreNull" id="projen.javascript.biome.biome_config.INoDoubleEqualsOptions.property.ignoreNull"></a>

```typescript
public readonly ignoreNull: boolean;
```

- *Type:* boolean

If `true`, an exception is made when comparing with `null`, as it's often relied on to check both for `null` or `undefined`.

If `false`, no such exception will be made.

---

### INoLabelWithoutControlOptions <a name="INoLabelWithoutControlOptions" id="projen.javascript.biome.biome_config.INoLabelWithoutControlOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.INoLabelWithoutControlOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.INoLabelWithoutControlOptions.property.inputComponents">inputComponents</a></code> | <code>string[]</code> | Array of component names that should be considered the same as an `input` element. |
| <code><a href="#projen.javascript.biome.biome_config.INoLabelWithoutControlOptions.property.labelAttributes">labelAttributes</a></code> | <code>string[]</code> | Array of attributes that should be treated as the `label` accessible text content. |
| <code><a href="#projen.javascript.biome.biome_config.INoLabelWithoutControlOptions.property.labelComponents">labelComponents</a></code> | <code>string[]</code> | Array of component names that should be considered the same as a `label` element. |

---

##### `inputComponents`<sup>Optional</sup> <a name="inputComponents" id="projen.javascript.biome.biome_config.INoLabelWithoutControlOptions.property.inputComponents"></a>

```typescript
public readonly inputComponents: string[];
```

- *Type:* string[]

Array of component names that should be considered the same as an `input` element.

---

##### `labelAttributes`<sup>Optional</sup> <a name="labelAttributes" id="projen.javascript.biome.biome_config.INoLabelWithoutControlOptions.property.labelAttributes"></a>

```typescript
public readonly labelAttributes: string[];
```

- *Type:* string[]

Array of attributes that should be treated as the `label` accessible text content.

---

##### `labelComponents`<sup>Optional</sup> <a name="labelComponents" id="projen.javascript.biome.biome_config.INoLabelWithoutControlOptions.property.labelComponents"></a>

```typescript
public readonly labelComponents: string[];
```

- *Type:* string[]

Array of component names that should be considered the same as a `label` element.

---

### INoRestrictedTypesOptions <a name="INoRestrictedTypesOptions" id="projen.javascript.biome.biome_config.INoRestrictedTypesOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.INoRestrictedTypesOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.INoRestrictedTypesOptions.property.types">types</a></code> | <code>{[ key: string ]: string \| projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions}</code> | *No description.* |

---

##### `types`<sup>Optional</sup> <a name="types" id="projen.javascript.biome.biome_config.INoRestrictedTypesOptions.property.types"></a>

```typescript
public readonly types: {[ key: string ]: string | ICustomRestrictedTypeOptions};
```

- *Type:* {[ key: string ]: string | projen.javascript.biome.biome_config.ICustomRestrictedTypeOptions}

---

### INoSecretsOptions <a name="INoSecretsOptions" id="projen.javascript.biome.biome_config.INoSecretsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.INoSecretsOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.INoSecretsOptions.property.entropyThreshold">entropyThreshold</a></code> | <code>number</code> | Set entropy threshold (default is 41). |

---

##### `entropyThreshold`<sup>Optional</sup> <a name="entropyThreshold" id="projen.javascript.biome.biome_config.INoSecretsOptions.property.entropyThreshold"></a>

```typescript
public readonly entropyThreshold: number;
```

- *Type:* number

Set entropy threshold (default is 41).

---

### INursery <a name="INursery" id="projen.javascript.biome.biome_config.INursery"></a>

- *Implemented By:* projen.javascript.biome.biome_config.INursery

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noCommonJs">noCommonJs</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow use of CommonJs module system in favor of ESM style imports. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDescendingSpecificity">noDescendingSpecificity</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow a lower specificity selector from coming after a higher specificity selector. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDocumentCookie">noDocumentCookie</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow direct assignments to document.cookie. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDocumentImportInPage">noDocumentImportInPage</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevents importing next/document outside of pages/_document.jsx in Next.js projects. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDuplicateCustomProperties">noDuplicateCustomProperties</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate custom properties within declaration blocks. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDuplicatedFields">noDuplicatedFields</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | No duplicated fields in GraphQL operations. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDuplicateElseIf">noDuplicateElseIf</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate conditions in if-else-if chains. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDuplicateProperties">noDuplicateProperties</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate properties within declaration blocks. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noDynamicNamespaceImportAccess">noDynamicNamespaceImportAccess</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow accessing namespace imports dynamically. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noEnum">noEnum</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow TypeScript enum. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noExportedImports">noExportedImports</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow exporting an imported variable. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noHeadElement">noHeadElement</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevent usage of \<head> element in a Next.js project. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noHeadImportInDocument">noHeadImportInDocument</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevent using the next/head module in pages/_document.js on Next.js projects. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noImgElement">noImgElement</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevent usage of \<img> element in a Next.js project. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noIrregularWhitespace">noIrregularWhitespace</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallows the use of irregular whitespace characters. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noMissingVarFunction">noMissingVarFunction</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow missing var function for css variables. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noNestedTernary">noNestedTernary</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow nested ternary expressions. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noOctalEscape">noOctalEscape</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow octal escape sequences in string literals. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noProcessEnv">noProcessEnv</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of process.env. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noRestrictedImports">noRestrictedImports</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions</code> | Disallow specified modules when loaded by import or require. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noRestrictedTypes">noRestrictedTypes</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions</code> | Disallow user defined types. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noSecrets">noSecrets</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions</code> | Disallow usage of sensitive data such as API keys and tokens. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noStaticElementInteractions">noStaticElementInteractions</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that static, visible elements (such as \<div>) that have click handlers use the valid role attribute. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noSubstr">noSubstr</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the use of String.slice() over String.substr() and String.substring(). |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noTemplateCurlyInString">noTemplateCurlyInString</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow template literal placeholder syntax in regular strings. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noUnknownPseudoClass">noUnknownPseudoClass</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unknown pseudo-class selectors. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noUnknownPseudoElement">noUnknownPseudoElement</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unknown pseudo-element selectors. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noUnknownTypeSelector">noUnknownTypeSelector</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unknown type selectors. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noUselessEscapeInRegex">noUselessEscapeInRegex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow unnecessary escape sequence in regular expression literals. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noUselessStringRaw">noUselessStringRaw</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unnecessary String.raw function in template string literals without any escape sequence. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.noValueAtRule">noValueAtRule</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow use of. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useAdjacentOverloadSignatures">useAdjacentOverloadSignatures</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of overload signatures that are not next to each other. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useAriaPropsSupportedByRole">useAriaPropsSupportedByRole</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce that ARIA properties are valid for the roles that are supported by the element. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useAtIndex">useAtIndex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use at() instead of integer index access. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useCollapsedIf">useCollapsedIf</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce using single if instead of nested if clauses. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useComponentExportOnlyModules">useComponentExportOnlyModules</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions</code> | Enforce declaring components only within modules that export React Components exclusively. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useConsistentCurlyBraces">useConsistentCurlyBraces</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | This rule enforces consistent use of curly braces inside JSX attributes and JSX children. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useConsistentMemberAccessibility">useConsistentMemberAccessibility</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions</code> | Require consistent accessibility modifiers on class properties and methods. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useDeprecatedReason">useDeprecatedReason</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Require specifying the reason argument when using. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useExplicitType">useExplicitType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Require explicit return types on functions and class methods. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useGoogleFontDisplay">useGoogleFontDisplay</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforces the use of a recommended display strategy with Google Fonts. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useGuardForIn">useGuardForIn</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Require for-in loops to include an if statement. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useImportRestrictions">useImportRestrictions</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallows package private imports. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useSortedClasses">useSortedClasses</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions</code> | Enforce the sorting of CSS utility classes. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useStrictMode">useStrictMode</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the use of the directive "use strict" in script files. |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useTrimStartEnd">useTrimStartEnd</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the use of String.trimStart() and String.trimEnd() over String.trimLeft() and String.trimRight(). |
| <code><a href="#projen.javascript.biome.biome_config.INursery.property.useValidAutocomplete">useValidAutocomplete</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions</code> | Use valid values for the autocomplete attribute on input elements. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.INursery.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noCommonJs`<sup>Optional</sup> <a name="noCommonJs" id="projen.javascript.biome.biome_config.INursery.property.noCommonJs"></a>

```typescript
public readonly noCommonJs: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow use of CommonJs module system in favor of ESM style imports.

---

##### `noDescendingSpecificity`<sup>Optional</sup> <a name="noDescendingSpecificity" id="projen.javascript.biome.biome_config.INursery.property.noDescendingSpecificity"></a>

```typescript
public readonly noDescendingSpecificity: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow a lower specificity selector from coming after a higher specificity selector.

---

##### `noDocumentCookie`<sup>Optional</sup> <a name="noDocumentCookie" id="projen.javascript.biome.biome_config.INursery.property.noDocumentCookie"></a>

```typescript
public readonly noDocumentCookie: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow direct assignments to document.cookie.

---

##### `noDocumentImportInPage`<sup>Optional</sup> <a name="noDocumentImportInPage" id="projen.javascript.biome.biome_config.INursery.property.noDocumentImportInPage"></a>

```typescript
public readonly noDocumentImportInPage: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevents importing next/document outside of pages/_document.jsx in Next.js projects.

---

##### `noDuplicateCustomProperties`<sup>Optional</sup> <a name="noDuplicateCustomProperties" id="projen.javascript.biome.biome_config.INursery.property.noDuplicateCustomProperties"></a>

```typescript
public readonly noDuplicateCustomProperties: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate custom properties within declaration blocks.

---

##### `noDuplicatedFields`<sup>Optional</sup> <a name="noDuplicatedFields" id="projen.javascript.biome.biome_config.INursery.property.noDuplicatedFields"></a>

```typescript
public readonly noDuplicatedFields: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

No duplicated fields in GraphQL operations.

---

##### `noDuplicateElseIf`<sup>Optional</sup> <a name="noDuplicateElseIf" id="projen.javascript.biome.biome_config.INursery.property.noDuplicateElseIf"></a>

```typescript
public readonly noDuplicateElseIf: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate conditions in if-else-if chains.

---

##### `noDuplicateProperties`<sup>Optional</sup> <a name="noDuplicateProperties" id="projen.javascript.biome.biome_config.INursery.property.noDuplicateProperties"></a>

```typescript
public readonly noDuplicateProperties: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate properties within declaration blocks.

---

##### `noDynamicNamespaceImportAccess`<sup>Optional</sup> <a name="noDynamicNamespaceImportAccess" id="projen.javascript.biome.biome_config.INursery.property.noDynamicNamespaceImportAccess"></a>

```typescript
public readonly noDynamicNamespaceImportAccess: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow accessing namespace imports dynamically.

---

##### `noEnum`<sup>Optional</sup> <a name="noEnum" id="projen.javascript.biome.biome_config.INursery.property.noEnum"></a>

```typescript
public readonly noEnum: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow TypeScript enum.

---

##### `noExportedImports`<sup>Optional</sup> <a name="noExportedImports" id="projen.javascript.biome.biome_config.INursery.property.noExportedImports"></a>

```typescript
public readonly noExportedImports: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow exporting an imported variable.

---

##### `noHeadElement`<sup>Optional</sup> <a name="noHeadElement" id="projen.javascript.biome.biome_config.INursery.property.noHeadElement"></a>

```typescript
public readonly noHeadElement: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevent usage of \<head> element in a Next.js project.

---

##### `noHeadImportInDocument`<sup>Optional</sup> <a name="noHeadImportInDocument" id="projen.javascript.biome.biome_config.INursery.property.noHeadImportInDocument"></a>

```typescript
public readonly noHeadImportInDocument: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevent using the next/head module in pages/_document.js on Next.js projects.

---

##### `noImgElement`<sup>Optional</sup> <a name="noImgElement" id="projen.javascript.biome.biome_config.INursery.property.noImgElement"></a>

```typescript
public readonly noImgElement: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevent usage of \<img> element in a Next.js project.

---

##### `noIrregularWhitespace`<sup>Optional</sup> <a name="noIrregularWhitespace" id="projen.javascript.biome.biome_config.INursery.property.noIrregularWhitespace"></a>

```typescript
public readonly noIrregularWhitespace: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallows the use of irregular whitespace characters.

---

##### `noMissingVarFunction`<sup>Optional</sup> <a name="noMissingVarFunction" id="projen.javascript.biome.biome_config.INursery.property.noMissingVarFunction"></a>

```typescript
public readonly noMissingVarFunction: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow missing var function for css variables.

---

##### `noNestedTernary`<sup>Optional</sup> <a name="noNestedTernary" id="projen.javascript.biome.biome_config.INursery.property.noNestedTernary"></a>

```typescript
public readonly noNestedTernary: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow nested ternary expressions.

---

##### `noOctalEscape`<sup>Optional</sup> <a name="noOctalEscape" id="projen.javascript.biome.biome_config.INursery.property.noOctalEscape"></a>

```typescript
public readonly noOctalEscape: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow octal escape sequences in string literals.

---

##### `noProcessEnv`<sup>Optional</sup> <a name="noProcessEnv" id="projen.javascript.biome.biome_config.INursery.property.noProcessEnv"></a>

```typescript
public readonly noProcessEnv: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of process.env.

---

##### `noRestrictedImports`<sup>Optional</sup> <a name="noRestrictedImports" id="projen.javascript.biome.biome_config.INursery.property.noRestrictedImports"></a>

```typescript
public readonly noRestrictedImports: string | IRuleWithRestrictedImportsOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions

Disallow specified modules when loaded by import or require.

---

##### `noRestrictedTypes`<sup>Optional</sup> <a name="noRestrictedTypes" id="projen.javascript.biome.biome_config.INursery.property.noRestrictedTypes"></a>

```typescript
public readonly noRestrictedTypes: string | IRuleWithNoRestrictedTypesOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions

Disallow user defined types.

---

##### `noSecrets`<sup>Optional</sup> <a name="noSecrets" id="projen.javascript.biome.biome_config.INursery.property.noSecrets"></a>

```typescript
public readonly noSecrets: string | IRuleWithNoSecretsOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions

Disallow usage of sensitive data such as API keys and tokens.

---

##### `noStaticElementInteractions`<sup>Optional</sup> <a name="noStaticElementInteractions" id="projen.javascript.biome.biome_config.INursery.property.noStaticElementInteractions"></a>

```typescript
public readonly noStaticElementInteractions: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that static, visible elements (such as \<div>) that have click handlers use the valid role attribute.

---

##### `noSubstr`<sup>Optional</sup> <a name="noSubstr" id="projen.javascript.biome.biome_config.INursery.property.noSubstr"></a>

```typescript
public readonly noSubstr: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the use of String.slice() over String.substr() and String.substring().

---

##### `noTemplateCurlyInString`<sup>Optional</sup> <a name="noTemplateCurlyInString" id="projen.javascript.biome.biome_config.INursery.property.noTemplateCurlyInString"></a>

```typescript
public readonly noTemplateCurlyInString: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow template literal placeholder syntax in regular strings.

---

##### `noUnknownPseudoClass`<sup>Optional</sup> <a name="noUnknownPseudoClass" id="projen.javascript.biome.biome_config.INursery.property.noUnknownPseudoClass"></a>

```typescript
public readonly noUnknownPseudoClass: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unknown pseudo-class selectors.

---

##### `noUnknownPseudoElement`<sup>Optional</sup> <a name="noUnknownPseudoElement" id="projen.javascript.biome.biome_config.INursery.property.noUnknownPseudoElement"></a>

```typescript
public readonly noUnknownPseudoElement: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unknown pseudo-element selectors.

---

##### `noUnknownTypeSelector`<sup>Optional</sup> <a name="noUnknownTypeSelector" id="projen.javascript.biome.biome_config.INursery.property.noUnknownTypeSelector"></a>

```typescript
public readonly noUnknownTypeSelector: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unknown type selectors.

---

##### `noUselessEscapeInRegex`<sup>Optional</sup> <a name="noUselessEscapeInRegex" id="projen.javascript.biome.biome_config.INursery.property.noUselessEscapeInRegex"></a>

```typescript
public readonly noUselessEscapeInRegex: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow unnecessary escape sequence in regular expression literals.

---

##### `noUselessStringRaw`<sup>Optional</sup> <a name="noUselessStringRaw" id="projen.javascript.biome.biome_config.INursery.property.noUselessStringRaw"></a>

```typescript
public readonly noUselessStringRaw: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unnecessary String.raw function in template string literals without any escape sequence.

---

##### `noValueAtRule`<sup>Optional</sup> <a name="noValueAtRule" id="projen.javascript.biome.biome_config.INursery.property.noValueAtRule"></a>

```typescript
public readonly noValueAtRule: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow use of.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.INursery.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

##### `useAdjacentOverloadSignatures`<sup>Optional</sup> <a name="useAdjacentOverloadSignatures" id="projen.javascript.biome.biome_config.INursery.property.useAdjacentOverloadSignatures"></a>

```typescript
public readonly useAdjacentOverloadSignatures: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of overload signatures that are not next to each other.

---

##### `useAriaPropsSupportedByRole`<sup>Optional</sup> <a name="useAriaPropsSupportedByRole" id="projen.javascript.biome.biome_config.INursery.property.useAriaPropsSupportedByRole"></a>

```typescript
public readonly useAriaPropsSupportedByRole: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce that ARIA properties are valid for the roles that are supported by the element.

---

##### `useAtIndex`<sup>Optional</sup> <a name="useAtIndex" id="projen.javascript.biome.biome_config.INursery.property.useAtIndex"></a>

```typescript
public readonly useAtIndex: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use at() instead of integer index access.

---

##### `useCollapsedIf`<sup>Optional</sup> <a name="useCollapsedIf" id="projen.javascript.biome.biome_config.INursery.property.useCollapsedIf"></a>

```typescript
public readonly useCollapsedIf: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce using single if instead of nested if clauses.

---

##### `useComponentExportOnlyModules`<sup>Optional</sup> <a name="useComponentExportOnlyModules" id="projen.javascript.biome.biome_config.INursery.property.useComponentExportOnlyModules"></a>

```typescript
public readonly useComponentExportOnlyModules: string | IRuleWithUseComponentExportOnlyModulesOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions

Enforce declaring components only within modules that export React Components exclusively.

---

##### `useConsistentCurlyBraces`<sup>Optional</sup> <a name="useConsistentCurlyBraces" id="projen.javascript.biome.biome_config.INursery.property.useConsistentCurlyBraces"></a>

```typescript
public readonly useConsistentCurlyBraces: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

This rule enforces consistent use of curly braces inside JSX attributes and JSX children.

---

##### `useConsistentMemberAccessibility`<sup>Optional</sup> <a name="useConsistentMemberAccessibility" id="projen.javascript.biome.biome_config.INursery.property.useConsistentMemberAccessibility"></a>

```typescript
public readonly useConsistentMemberAccessibility: string | IRuleWithConsistentMemberAccessibilityOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions

Require consistent accessibility modifiers on class properties and methods.

---

##### ~~`useDeprecatedReason`~~<sup>Optional</sup> <a name="useDeprecatedReason" id="projen.javascript.biome.biome_config.INursery.property.useDeprecatedReason"></a>

- *Deprecated:* directive

```typescript
public readonly useDeprecatedReason: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Require specifying the reason argument when using.

---

##### `useExplicitType`<sup>Optional</sup> <a name="useExplicitType" id="projen.javascript.biome.biome_config.INursery.property.useExplicitType"></a>

```typescript
public readonly useExplicitType: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Require explicit return types on functions and class methods.

---

##### `useGoogleFontDisplay`<sup>Optional</sup> <a name="useGoogleFontDisplay" id="projen.javascript.biome.biome_config.INursery.property.useGoogleFontDisplay"></a>

```typescript
public readonly useGoogleFontDisplay: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforces the use of a recommended display strategy with Google Fonts.

---

##### `useGuardForIn`<sup>Optional</sup> <a name="useGuardForIn" id="projen.javascript.biome.biome_config.INursery.property.useGuardForIn"></a>

```typescript
public readonly useGuardForIn: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Require for-in loops to include an if statement.

---

##### `useImportRestrictions`<sup>Optional</sup> <a name="useImportRestrictions" id="projen.javascript.biome.biome_config.INursery.property.useImportRestrictions"></a>

```typescript
public readonly useImportRestrictions: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallows package private imports.

---

##### `useSortedClasses`<sup>Optional</sup> <a name="useSortedClasses" id="projen.javascript.biome.biome_config.INursery.property.useSortedClasses"></a>

```typescript
public readonly useSortedClasses: string | IRuleWithUtilityClassSortingOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions

Enforce the sorting of CSS utility classes.

---

##### `useStrictMode`<sup>Optional</sup> <a name="useStrictMode" id="projen.javascript.biome.biome_config.INursery.property.useStrictMode"></a>

```typescript
public readonly useStrictMode: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the use of the directive "use strict" in script files.

---

##### `useTrimStartEnd`<sup>Optional</sup> <a name="useTrimStartEnd" id="projen.javascript.biome.biome_config.INursery.property.useTrimStartEnd"></a>

```typescript
public readonly useTrimStartEnd: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the use of String.trimStart() and String.trimEnd() over String.trimLeft() and String.trimRight().

---

##### `useValidAutocomplete`<sup>Optional</sup> <a name="useValidAutocomplete" id="projen.javascript.biome.biome_config.INursery.property.useValidAutocomplete"></a>

```typescript
public readonly useValidAutocomplete: string | IRuleWithUseValidAutocompleteOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions

Use valid values for the autocomplete attribute on input elements.

---

### IOrganizeImports <a name="IOrganizeImports" id="projen.javascript.biome.biome_config.IOrganizeImports"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IOrganizeImports


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IOrganizeImports.property.enabled">enabled</a></code> | <code>boolean</code> | Enables the organization of imports. |
| <code><a href="#projen.javascript.biome.biome_config.IOrganizeImports.property.ignore">ignore</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IOrganizeImports.property.include">include</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IOrganizeImports.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Enables the organization of imports.

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="projen.javascript.biome.biome_config.IOrganizeImports.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will ignore files/folders that will match these patterns.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.javascript.biome.biome_config.IOrganizeImports.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will include files/folders that will match these patterns.

---

### IOverrideFormatterConfiguration <a name="IOverrideFormatterConfiguration" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IOverrideFormatterConfiguration


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.attributePosition">attributePosition</a></code> | <code>string</code> | The attribute position style. |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.bracketSpacing">bracketSpacing</a></code> | <code>boolean</code> | Whether to insert spaces around brackets in object literals. |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.formatWithErrors">formatWithErrors</a></code> | <code>boolean</code> | Stores whether formatting should be allowed to proceed if a given file has syntax errors. |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.indentSize">indentSize</a></code> | <code>number</code> | The size of the indentation, 2 by default (deprecated, use `indent-width`). |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.indentStyle">indentStyle</a></code> | <code>string</code> | The indent style. |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.indentWidth">indentWidth</a></code> | <code>number</code> | The size of the indentation, 2 by default. |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.lineEnding">lineEnding</a></code> | <code>string</code> | The type of line ending. |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.lineWidth">lineWidth</a></code> | <code>number</code> | What's the max width of a line. |

---

##### `attributePosition`<sup>Optional</sup> <a name="attributePosition" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.attributePosition"></a>

```typescript
public readonly attributePosition: string;
```

- *Type:* string

The attribute position style.

---

##### `bracketSpacing`<sup>Optional</sup> <a name="bracketSpacing" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.bracketSpacing"></a>

```typescript
public readonly bracketSpacing: boolean;
```

- *Type:* boolean

Whether to insert spaces around brackets in object literals.

Defaults to true.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

##### `formatWithErrors`<sup>Optional</sup> <a name="formatWithErrors" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.formatWithErrors"></a>

```typescript
public readonly formatWithErrors: boolean;
```

- *Type:* boolean

Stores whether formatting should be allowed to proceed if a given file has syntax errors.

---

##### `indentSize`<sup>Optional</sup> <a name="indentSize" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.indentSize"></a>

```typescript
public readonly indentSize: number;
```

- *Type:* number

The size of the indentation, 2 by default (deprecated, use `indent-width`).

---

##### `indentStyle`<sup>Optional</sup> <a name="indentStyle" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.indentStyle"></a>

```typescript
public readonly indentStyle: string;
```

- *Type:* string

The indent style.

---

##### `indentWidth`<sup>Optional</sup> <a name="indentWidth" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.indentWidth"></a>

```typescript
public readonly indentWidth: number;
```

- *Type:* number

The size of the indentation, 2 by default.

---

##### `lineEnding`<sup>Optional</sup> <a name="lineEnding" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.lineEnding"></a>

```typescript
public readonly lineEnding: string;
```

- *Type:* string

The type of line ending.

---

##### `lineWidth`<sup>Optional</sup> <a name="lineWidth" id="projen.javascript.biome.biome_config.IOverrideFormatterConfiguration.property.lineWidth"></a>

```typescript
public readonly lineWidth: number;
```

- *Type:* number

What's the max width of a line.

Defaults to 80.

---

### IOverrideLinterConfiguration <a name="IOverrideLinterConfiguration" id="projen.javascript.biome.biome_config.IOverrideLinterConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IOverrideLinterConfiguration


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideLinterConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | if `false`, it disables the feature and the linter won't be executed. |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideLinterConfiguration.property.rules">rules</a></code> | <code>projen.javascript.biome.biome_config.IRules</code> | List of rules. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IOverrideLinterConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

if `false`, it disables the feature and the linter won't be executed.

`true` by default

---

##### `rules`<sup>Optional</sup> <a name="rules" id="projen.javascript.biome.biome_config.IOverrideLinterConfiguration.property.rules"></a>

```typescript
public readonly rules: IRules;
```

- *Type:* projen.javascript.biome.biome_config.IRules

List of rules.

---

### IOverrideOrganizeImportsConfiguration <a name="IOverrideOrganizeImportsConfiguration" id="projen.javascript.biome.biome_config.IOverrideOrganizeImportsConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IOverrideOrganizeImportsConfiguration


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IOverrideOrganizeImportsConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | if `false`, it disables the feature and the linter won't be executed. |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IOverrideOrganizeImportsConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

if `false`, it disables the feature and the linter won't be executed.

`true` by default

---

### IOverridePattern <a name="IOverridePattern" id="projen.javascript.biome.biome_config.IOverridePattern"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IOverridePattern


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.css">css</a></code> | <code>projen.javascript.biome.biome_config.ICssConfiguration</code> | Specific configuration for the Css language. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.formatter">formatter</a></code> | <code>projen.javascript.biome.biome_config.IOverrideFormatterConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.graphql">graphql</a></code> | <code>projen.javascript.biome.biome_config.IGraphqlConfiguration</code> | Specific configuration for the Graphql language. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.ignore">ignore</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.include">include</a></code> | <code>string[]</code> | A list of Unix shell style patterns. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.javascript">javascript</a></code> | <code>projen.javascript.biome.biome_config.IJavascriptConfiguration</code> | Specific configuration for the JavaScript language. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.json">json</a></code> | <code>projen.javascript.biome.biome_config.IJsonConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.linter">linter</a></code> | <code>projen.javascript.biome.biome_config.IOverrideLinterConfiguration</code> | Specific configuration for the Json language. |
| <code><a href="#projen.javascript.biome.biome_config.IOverridePattern.property.organizeImports">organizeImports</a></code> | <code>projen.javascript.biome.biome_config.IOverrideOrganizeImportsConfiguration</code> | Specific configuration for the Json language. |

---

##### `css`<sup>Optional</sup> <a name="css" id="projen.javascript.biome.biome_config.IOverridePattern.property.css"></a>

```typescript
public readonly css: ICssConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.ICssConfiguration

Specific configuration for the Css language.

---

##### `formatter`<sup>Optional</sup> <a name="formatter" id="projen.javascript.biome.biome_config.IOverridePattern.property.formatter"></a>

```typescript
public readonly formatter: IOverrideFormatterConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IOverrideFormatterConfiguration

Specific configuration for the Json language.

---

##### `graphql`<sup>Optional</sup> <a name="graphql" id="projen.javascript.biome.biome_config.IOverridePattern.property.graphql"></a>

```typescript
public readonly graphql: IGraphqlConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IGraphqlConfiguration

Specific configuration for the Graphql language.

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="projen.javascript.biome.biome_config.IOverridePattern.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will ignore files/folders that will match these patterns.

---

##### `include`<sup>Optional</sup> <a name="include" id="projen.javascript.biome.biome_config.IOverridePattern.property.include"></a>

```typescript
public readonly include: string[];
```

- *Type:* string[]

A list of Unix shell style patterns.

The formatter will include files/folders that will match these patterns.

---

##### `javascript`<sup>Optional</sup> <a name="javascript" id="projen.javascript.biome.biome_config.IOverridePattern.property.javascript"></a>

```typescript
public readonly javascript: IJavascriptConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IJavascriptConfiguration

Specific configuration for the JavaScript language.

---

##### `json`<sup>Optional</sup> <a name="json" id="projen.javascript.biome.biome_config.IOverridePattern.property.json"></a>

```typescript
public readonly json: IJsonConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IJsonConfiguration

Specific configuration for the Json language.

---

##### `linter`<sup>Optional</sup> <a name="linter" id="projen.javascript.biome.biome_config.IOverridePattern.property.linter"></a>

```typescript
public readonly linter: IOverrideLinterConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IOverrideLinterConfiguration

Specific configuration for the Json language.

---

##### `organizeImports`<sup>Optional</sup> <a name="organizeImports" id="projen.javascript.biome.biome_config.IOverridePattern.property.organizeImports"></a>

```typescript
public readonly organizeImports: IOverrideOrganizeImportsConfiguration;
```

- *Type:* projen.javascript.biome.biome_config.IOverrideOrganizeImportsConfiguration

Specific configuration for the Json language.

---

### IPerformance <a name="IPerformance" id="projen.javascript.biome.biome_config.IPerformance"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IPerformance

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IPerformance.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IPerformance.property.noAccumulatingSpread">noAccumulatingSpread</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of spread (...) syntax on accumulators. |
| <code><a href="#projen.javascript.biome.biome_config.IPerformance.property.noBarrelFile">noBarrelFile</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of barrel file. |
| <code><a href="#projen.javascript.biome.biome_config.IPerformance.property.noDelete">noDelete</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of the delete operator. |
| <code><a href="#projen.javascript.biome.biome_config.IPerformance.property.noReExportAll">noReExportAll</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Avoid re-export all. |
| <code><a href="#projen.javascript.biome.biome_config.IPerformance.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IPerformance.property.useTopLevelRegex">useTopLevelRegex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Require regex literals to be declared at the top level. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.IPerformance.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noAccumulatingSpread`<sup>Optional</sup> <a name="noAccumulatingSpread" id="projen.javascript.biome.biome_config.IPerformance.property.noAccumulatingSpread"></a>

```typescript
public readonly noAccumulatingSpread: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of spread (...) syntax on accumulators.

---

##### `noBarrelFile`<sup>Optional</sup> <a name="noBarrelFile" id="projen.javascript.biome.biome_config.IPerformance.property.noBarrelFile"></a>

```typescript
public readonly noBarrelFile: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of barrel file.

---

##### `noDelete`<sup>Optional</sup> <a name="noDelete" id="projen.javascript.biome.biome_config.IPerformance.property.noDelete"></a>

```typescript
public readonly noDelete: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of the delete operator.

---

##### `noReExportAll`<sup>Optional</sup> <a name="noReExportAll" id="projen.javascript.biome.biome_config.IPerformance.property.noReExportAll"></a>

```typescript
public readonly noReExportAll: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Avoid re-export all.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.IPerformance.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

##### `useTopLevelRegex`<sup>Optional</sup> <a name="useTopLevelRegex" id="projen.javascript.biome.biome_config.IPerformance.property.useTopLevelRegex"></a>

```typescript
public readonly useTopLevelRegex: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Require regex literals to be declared at the top level.

---

### IRestrictedGlobalsOptions <a name="IRestrictedGlobalsOptions" id="projen.javascript.biome.biome_config.IRestrictedGlobalsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRestrictedGlobalsOptions

Options for the rule `noRestrictedGlobals`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRestrictedGlobalsOptions.property.deniedGlobals">deniedGlobals</a></code> | <code>string[]</code> | A list of names that should trigger the rule. |

---

##### `deniedGlobals`<sup>Optional</sup> <a name="deniedGlobals" id="projen.javascript.biome.biome_config.IRestrictedGlobalsOptions.property.deniedGlobals"></a>

```typescript
public readonly deniedGlobals: string[];
```

- *Type:* string[]

A list of names that should trigger the rule.

---

### IRestrictedImportsOptions <a name="IRestrictedImportsOptions" id="projen.javascript.biome.biome_config.IRestrictedImportsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRestrictedImportsOptions

Options for the rule `noRestrictedImports`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRestrictedImportsOptions.property.paths">paths</a></code> | <code>{[ key: string ]: string}</code> | A list of names that should trigger the rule. |

---

##### `paths`<sup>Optional</sup> <a name="paths" id="projen.javascript.biome.biome_config.IRestrictedImportsOptions.property.paths"></a>

```typescript
public readonly paths: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A list of names that should trigger the rule.

---

### IRules <a name="IRules" id="projen.javascript.biome.biome_config.IRules"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRules


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.a11y">a11y</a></code> | <code>projen.javascript.biome.biome_config.IA11y</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules. |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.complexity">complexity</a></code> | <code>projen.javascript.biome.biome_config.IComplexity</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.correctness">correctness</a></code> | <code>projen.javascript.biome.biome_config.ICorrectness</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.nursery">nursery</a></code> | <code>projen.javascript.biome.biome_config.INursery</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.performance">performance</a></code> | <code>projen.javascript.biome.biome_config.IPerformance</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the lint rules recommended by Biome. |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.security">security</a></code> | <code>projen.javascript.biome.biome_config.ISecurity</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.style">style</a></code> | <code>projen.javascript.biome.biome_config.IStyle</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IRules.property.suspicious">suspicious</a></code> | <code>projen.javascript.biome.biome_config.ISuspicious</code> | *No description.* |

---

##### `a11y`<sup>Optional</sup> <a name="a11y" id="projen.javascript.biome.biome_config.IRules.property.a11y"></a>

```typescript
public readonly a11y: IA11y;
```

- *Type:* projen.javascript.biome.biome_config.IA11y

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.IRules.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules.

The rules that belong to `nursery` won't be enabled.

---

##### `complexity`<sup>Optional</sup> <a name="complexity" id="projen.javascript.biome.biome_config.IRules.property.complexity"></a>

```typescript
public readonly complexity: IComplexity;
```

- *Type:* projen.javascript.biome.biome_config.IComplexity

---

##### `correctness`<sup>Optional</sup> <a name="correctness" id="projen.javascript.biome.biome_config.IRules.property.correctness"></a>

```typescript
public readonly correctness: ICorrectness;
```

- *Type:* projen.javascript.biome.biome_config.ICorrectness

---

##### `nursery`<sup>Optional</sup> <a name="nursery" id="projen.javascript.biome.biome_config.IRules.property.nursery"></a>

```typescript
public readonly nursery: INursery;
```

- *Type:* projen.javascript.biome.biome_config.INursery

---

##### `performance`<sup>Optional</sup> <a name="performance" id="projen.javascript.biome.biome_config.IRules.property.performance"></a>

```typescript
public readonly performance: IPerformance;
```

- *Type:* projen.javascript.biome.biome_config.IPerformance

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.IRules.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the lint rules recommended by Biome.

`true` by default.

---

##### `security`<sup>Optional</sup> <a name="security" id="projen.javascript.biome.biome_config.IRules.property.security"></a>

```typescript
public readonly security: ISecurity;
```

- *Type:* projen.javascript.biome.biome_config.ISecurity

---

##### `style`<sup>Optional</sup> <a name="style" id="projen.javascript.biome.biome_config.IRules.property.style"></a>

```typescript
public readonly style: IStyle;
```

- *Type:* projen.javascript.biome.biome_config.IStyle

---

##### `suspicious`<sup>Optional</sup> <a name="suspicious" id="projen.javascript.biome.biome_config.IRules.property.suspicious"></a>

```typescript
public readonly suspicious: ISuspicious;
```

- *Type:* projen.javascript.biome.biome_config.ISuspicious

---

### IRuleWithAllowDomainOptions <a name="IRuleWithAllowDomainOptions" id="projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IAllowDomainOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithAllowDomainOptions.property.options"></a>

```typescript
public readonly options: IAllowDomainOptions;
```

- *Type:* projen.javascript.biome.biome_config.IAllowDomainOptions

Rule's options.

---

### IRuleWithComplexityOptions <a name="IRuleWithComplexityOptions" id="projen.javascript.biome.biome_config.IRuleWithComplexityOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithComplexityOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithComplexityOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithComplexityOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IComplexityOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithComplexityOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithComplexityOptions.property.options"></a>

```typescript
public readonly options: IComplexityOptions;
```

- *Type:* projen.javascript.biome.biome_config.IComplexityOptions

Rule's options.

---

### IRuleWithConsistentArrayTypeOptions <a name="IRuleWithConsistentArrayTypeOptions" id="projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IConsistentArrayTypeOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions.property.options"></a>

```typescript
public readonly options: IConsistentArrayTypeOptions;
```

- *Type:* projen.javascript.biome.biome_config.IConsistentArrayTypeOptions

Rule's options.

---

### IRuleWithConsistentMemberAccessibilityOptions <a name="IRuleWithConsistentMemberAccessibilityOptions" id="projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IConsistentMemberAccessibilityOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithConsistentMemberAccessibilityOptions.property.options"></a>

```typescript
public readonly options: IConsistentMemberAccessibilityOptions;
```

- *Type:* projen.javascript.biome.biome_config.IConsistentMemberAccessibilityOptions

Rule's options.

---

### IRuleWithDeprecatedHooksOptions <a name="IRuleWithDeprecatedHooksOptions" id="projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IDeprecatedHooksOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithDeprecatedHooksOptions.property.options"></a>

```typescript
public readonly options: IDeprecatedHooksOptions;
```

- *Type:* projen.javascript.biome.biome_config.IDeprecatedHooksOptions

Rule's options.

---

### IRuleWithFilenamingConventionOptions <a name="IRuleWithFilenamingConventionOptions" id="projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IFilenamingConventionOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions.property.options"></a>

```typescript
public readonly options: IFilenamingConventionOptions;
```

- *Type:* projen.javascript.biome.biome_config.IFilenamingConventionOptions

Rule's options.

---

### IRuleWithFixNoOptions <a name="IRuleWithFixNoOptions" id="projen.javascript.biome.biome_config.IRuleWithFixNoOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithFixNoOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithFixNoOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithFixNoOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithFixNoOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithFixNoOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

### IRuleWithNamingConventionOptions <a name="IRuleWithNamingConventionOptions" id="projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.INamingConventionOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions.property.options"></a>

```typescript
public readonly options: INamingConventionOptions;
```

- *Type:* projen.javascript.biome.biome_config.INamingConventionOptions

Rule's options.

---

### IRuleWithNoConsoleOptions <a name="IRuleWithNoConsoleOptions" id="projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.INoConsoleOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions.property.options"></a>

```typescript
public readonly options: INoConsoleOptions;
```

- *Type:* projen.javascript.biome.biome_config.INoConsoleOptions

Rule's options.

---

### IRuleWithNoDoubleEqualsOptions <a name="IRuleWithNoDoubleEqualsOptions" id="projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.INoDoubleEqualsOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions.property.options"></a>

```typescript
public readonly options: INoDoubleEqualsOptions;
```

- *Type:* projen.javascript.biome.biome_config.INoDoubleEqualsOptions

Rule's options.

---

### IRuleWithNoLabelWithoutControlOptions <a name="IRuleWithNoLabelWithoutControlOptions" id="projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.INoLabelWithoutControlOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithNoLabelWithoutControlOptions.property.options"></a>

```typescript
public readonly options: INoLabelWithoutControlOptions;
```

- *Type:* projen.javascript.biome.biome_config.INoLabelWithoutControlOptions

Rule's options.

---

### IRuleWithNoOptions <a name="IRuleWithNoOptions" id="projen.javascript.biome.biome_config.IRuleWithNoOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithNoOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithNoOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

### IRuleWithNoRestrictedTypesOptions <a name="IRuleWithNoRestrictedTypesOptions" id="projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.INoRestrictedTypesOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithNoRestrictedTypesOptions.property.options"></a>

```typescript
public readonly options: INoRestrictedTypesOptions;
```

- *Type:* projen.javascript.biome.biome_config.INoRestrictedTypesOptions

Rule's options.

---

### IRuleWithNoSecretsOptions <a name="IRuleWithNoSecretsOptions" id="projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.INoSecretsOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithNoSecretsOptions.property.options"></a>

```typescript
public readonly options: INoSecretsOptions;
```

- *Type:* projen.javascript.biome.biome_config.INoSecretsOptions

Rule's options.

---

### IRuleWithRestrictedGlobalsOptions <a name="IRuleWithRestrictedGlobalsOptions" id="projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IRestrictedGlobalsOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions.property.options"></a>

```typescript
public readonly options: IRestrictedGlobalsOptions;
```

- *Type:* projen.javascript.biome.biome_config.IRestrictedGlobalsOptions

Rule's options.

---

### IRuleWithRestrictedImportsOptions <a name="IRuleWithRestrictedImportsOptions" id="projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IRestrictedImportsOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithRestrictedImportsOptions.property.options"></a>

```typescript
public readonly options: IRestrictedImportsOptions;
```

- *Type:* projen.javascript.biome.biome_config.IRestrictedImportsOptions

Rule's options.

---

### IRuleWithUseComponentExportOnlyModulesOptions <a name="IRuleWithUseComponentExportOnlyModulesOptions" id="projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithUseComponentExportOnlyModulesOptions.property.options"></a>

```typescript
public readonly options: IUseComponentExportOnlyModulesOptions;
```

- *Type:* projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions

Rule's options.

---

### IRuleWithUseExhaustiveDependenciesOptions <a name="IRuleWithUseExhaustiveDependenciesOptions" id="projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithUseExhaustiveDependenciesOptions.property.options"></a>

```typescript
public readonly options: IUseExhaustiveDependenciesOptions;
```

- *Type:* projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions

Rule's options.

---

### IRuleWithUseImportExtensionsOptions <a name="IRuleWithUseImportExtensionsOptions" id="projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IUseImportExtensionsOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithUseImportExtensionsOptions.property.options"></a>

```typescript
public readonly options: IUseImportExtensionsOptions;
```

- *Type:* projen.javascript.biome.biome_config.IUseImportExtensionsOptions

Rule's options.

---

### IRuleWithUseValidAutocompleteOptions <a name="IRuleWithUseValidAutocompleteOptions" id="projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IUseValidAutocompleteOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithUseValidAutocompleteOptions.property.options"></a>

```typescript
public readonly options: IUseValidAutocompleteOptions;
```

- *Type:* projen.javascript.biome.biome_config.IUseValidAutocompleteOptions

Rule's options.

---

### IRuleWithUtilityClassSortingOptions <a name="IRuleWithUtilityClassSortingOptions" id="projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IUtilityClassSortingOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithUtilityClassSortingOptions.property.options"></a>

```typescript
public readonly options: IUtilityClassSortingOptions;
```

- *Type:* projen.javascript.biome.biome_config.IUtilityClassSortingOptions

Rule's options.

---

### IRuleWithValidAriaRoleOptions <a name="IRuleWithValidAriaRoleOptions" id="projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions.property.level">level</a></code> | <code>string</code> | The severity of the emitted diagnostics by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions.property.fix">fix</a></code> | <code>string</code> | The kind of the code actions emitted by the rule. |
| <code><a href="#projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions.property.options">options</a></code> | <code>projen.javascript.biome.biome_config.IValidAriaRoleOptions</code> | Rule's options. |

---

##### `level`<sup>Required</sup> <a name="level" id="projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions.property.level"></a>

```typescript
public readonly level: string;
```

- *Type:* string

The severity of the emitted diagnostics by the rule.

---

##### `fix`<sup>Optional</sup> <a name="fix" id="projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions.property.fix"></a>

```typescript
public readonly fix: string;
```

- *Type:* string

The kind of the code actions emitted by the rule.

---

##### `options`<sup>Optional</sup> <a name="options" id="projen.javascript.biome.biome_config.IRuleWithValidAriaRoleOptions.property.options"></a>

```typescript
public readonly options: IValidAriaRoleOptions;
```

- *Type:* projen.javascript.biome.biome_config.IValidAriaRoleOptions

Rule's options.

---

### ISecurity <a name="ISecurity" id="projen.javascript.biome.biome_config.ISecurity"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ISecurity

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ISecurity.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.ISecurity.property.noDangerouslySetInnerHtml">noDangerouslySetInnerHtml</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevent the usage of dangerous JSX props. |
| <code><a href="#projen.javascript.biome.biome_config.ISecurity.property.noDangerouslySetInnerHtmlWithChildren">noDangerouslySetInnerHtmlWithChildren</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Report when a DOM element or a component uses both children and dangerouslySetInnerHTML prop. |
| <code><a href="#projen.javascript.biome.biome_config.ISecurity.property.noGlobalEval">noGlobalEval</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of global eval(). |
| <code><a href="#projen.javascript.biome.biome_config.ISecurity.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.ISecurity.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noDangerouslySetInnerHtml`<sup>Optional</sup> <a name="noDangerouslySetInnerHtml" id="projen.javascript.biome.biome_config.ISecurity.property.noDangerouslySetInnerHtml"></a>

```typescript
public readonly noDangerouslySetInnerHtml: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevent the usage of dangerous JSX props.

---

##### `noDangerouslySetInnerHtmlWithChildren`<sup>Optional</sup> <a name="noDangerouslySetInnerHtmlWithChildren" id="projen.javascript.biome.biome_config.ISecurity.property.noDangerouslySetInnerHtmlWithChildren"></a>

```typescript
public readonly noDangerouslySetInnerHtmlWithChildren: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Report when a DOM element or a component uses both children and dangerouslySetInnerHTML prop.

---

##### `noGlobalEval`<sup>Optional</sup> <a name="noGlobalEval" id="projen.javascript.biome.biome_config.ISecurity.property.noGlobalEval"></a>

```typescript
public readonly noGlobalEval: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of global eval().

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.ISecurity.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

### ISelector <a name="ISelector" id="projen.javascript.biome.biome_config.ISelector"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ISelector


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ISelector.property.kind">kind</a></code> | <code>string</code> | Declaration kind. |
| <code><a href="#projen.javascript.biome.biome_config.ISelector.property.modifiers">modifiers</a></code> | <code>string[]</code> | Modifiers used on the declaration. |
| <code><a href="#projen.javascript.biome.biome_config.ISelector.property.scope">scope</a></code> | <code>string</code> | Scope of the declaration. |

---

##### `kind`<sup>Optional</sup> <a name="kind" id="projen.javascript.biome.biome_config.ISelector.property.kind"></a>

```typescript
public readonly kind: string;
```

- *Type:* string

Declaration kind.

---

##### `modifiers`<sup>Optional</sup> <a name="modifiers" id="projen.javascript.biome.biome_config.ISelector.property.modifiers"></a>

```typescript
public readonly modifiers: string[];
```

- *Type:* string[]

Modifiers used on the declaration.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="projen.javascript.biome.biome_config.ISelector.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

Scope of the declaration.

---

### ISource <a name="ISource" id="projen.javascript.biome.biome_config.ISource"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ISource

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ISource.property.sortJsxProps">sortJsxProps</a></code> | <code>string</code> | Enforce props sorting in JSX elements. |
| <code><a href="#projen.javascript.biome.biome_config.ISource.property.useSortedKeys">useSortedKeys</a></code> | <code>string</code> | Sorts the keys of a JSON object in natural order. |

---

##### `sortJsxProps`<sup>Optional</sup> <a name="sortJsxProps" id="projen.javascript.biome.biome_config.ISource.property.sortJsxProps"></a>

```typescript
public readonly sortJsxProps: string;
```

- *Type:* string

Enforce props sorting in JSX elements.

---

##### `useSortedKeys`<sup>Optional</sup> <a name="useSortedKeys" id="projen.javascript.biome.biome_config.ISource.property.useSortedKeys"></a>

```typescript
public readonly useSortedKeys: string;
```

- *Type:* string

Sorts the keys of a JSON object in natural order.

---

### IStyle <a name="IStyle" id="projen.javascript.biome.biome_config.IStyle"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IStyle

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noArguments">noArguments</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of arguments. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noCommaOperator">noCommaOperator</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow comma operator. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noDefaultExport">noDefaultExport</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow default exports. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noDoneCallback">noDoneCallback</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow using a callback in asynchronous tests and hooks. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noImplicitBoolean">noImplicitBoolean</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow implicit true values on JSX boolean attributes. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noInferrableTypes">noInferrableTypes</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow type annotations for variables, parameters, and class properties initialized with a literal expression. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noNamespace">noNamespace</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of TypeScript's namespaces. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noNamespaceImport">noNamespaceImport</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of namespace imports. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noNegationElse">noNegationElse</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow negation in the condition of an if statement if it has an else clause. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noNonNullAssertion">noNonNullAssertion</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow non-null assertions using the ! |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noParameterAssign">noParameterAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow reassigning function parameters. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noParameterProperties">noParameterProperties</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the use of parameter properties in class constructors. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noRestrictedGlobals">noRestrictedGlobals</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions</code> | This rule allows you to specify global variable names that you don’t want to use in your application. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noShoutyConstants">noShoutyConstants</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of constants which its value is the upper-case version of its name. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noUnusedTemplateLiteral">noUnusedTemplateLiteral</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow template literals if interpolation and special-character handling are not needed. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noUselessElse">noUselessElse</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow else block when the if block breaks early. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noVar">noVar</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of var. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.noYodaExpression">noYodaExpression</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of yoda expressions. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useAsConstAssertion">useAsConstAssertion</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the use of as const over literal type and type annotation. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useBlockStatements">useBlockStatements</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Requires following curly brace conventions. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useCollapsedElseIf">useCollapsedElseIf</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce using else if instead of nested if in else clauses. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useConsistentArrayType">useConsistentArrayType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions</code> | Require consistently using either T\[] or Array\<T>. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useConsistentBuiltinInstantiation">useConsistentBuiltinInstantiation</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the use of new for all builtins, except String, Number and Boolean. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useConst">useConst</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Require const declarations for variables that are only assigned once. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useDefaultParameterLast">useDefaultParameterLast</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce default function parameters and optional function parameters to be last. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useDefaultSwitchClause">useDefaultSwitchClause</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Require the default clause in switch statements. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useEnumInitializers">useEnumInitializers</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Require that each enum member value be explicitly initialized. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useExplicitLengthCheck">useExplicitLengthCheck</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce explicitly comparing the length, size, byteLength or byteOffset property of a value. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useExponentiationOperator">useExponentiationOperator</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of Math.pow in favor of the ** operator. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useExportType">useExportType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Promotes the use of export type for types. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useFilenamingConvention">useFilenamingConvention</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions</code> | Enforce naming conventions for JavaScript and TypeScript filenames. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useForOf">useForOf</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | This rule recommends a for-of loop when in a for loop, the index used to extract an item from the iterated array. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useFragmentSyntax">useFragmentSyntax</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | This rule enforces the use of \<>...\</> over \<Fragment>...\</Fragment>. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useImportType">useImportType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Promotes the use of import type for types. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useLiteralEnumMembers">useLiteralEnumMembers</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Require all enum members to be literal values. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useNamingConvention">useNamingConvention</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions</code> | Enforce naming conventions for everything across a codebase. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useNodeAssertStrict">useNodeAssertStrict</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Promotes the usage of node:assert/strict over node:assert. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useNodejsImportProtocol">useNodejsImportProtocol</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforces using the node: protocol for Node.js builtin modules. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useNumberNamespace">useNumberNamespace</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use the Number properties instead of global ones. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useNumericLiterals">useNumericLiterals</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useSelfClosingElements">useSelfClosingElements</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prevent extra closing tags for components without children. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useShorthandArrayType">useShorthandArrayType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | When expressing array types, this rule promotes the usage of T\[] shorthand instead of Array\<T>. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useShorthandAssign">useShorthandAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Require assignment operator shorthand where possible. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useShorthandFunctionType">useShorthandFunctionType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce using function types instead of object type with call signatures. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useSingleCaseStatement">useSingleCaseStatement</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforces switch clauses have a single statement, emits a quick fix wrapping the statements in a block. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useSingleVarDeclarator">useSingleVarDeclarator</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow multiple variable declarations in the same variable statement. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useTemplate">useTemplate</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prefer template literals over string concatenation. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useThrowNewError">useThrowNewError</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Require new when throwing an error. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useThrowOnlyError">useThrowOnlyError</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow throwing non-Error values. |
| <code><a href="#projen.javascript.biome.biome_config.IStyle.property.useWhile">useWhile</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce the use of while loops instead of for loops when the initializer and update expressions are not needed. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.IStyle.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noArguments`<sup>Optional</sup> <a name="noArguments" id="projen.javascript.biome.biome_config.IStyle.property.noArguments"></a>

```typescript
public readonly noArguments: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of arguments.

---

##### `noCommaOperator`<sup>Optional</sup> <a name="noCommaOperator" id="projen.javascript.biome.biome_config.IStyle.property.noCommaOperator"></a>

```typescript
public readonly noCommaOperator: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow comma operator.

---

##### `noDefaultExport`<sup>Optional</sup> <a name="noDefaultExport" id="projen.javascript.biome.biome_config.IStyle.property.noDefaultExport"></a>

```typescript
public readonly noDefaultExport: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow default exports.

---

##### `noDoneCallback`<sup>Optional</sup> <a name="noDoneCallback" id="projen.javascript.biome.biome_config.IStyle.property.noDoneCallback"></a>

```typescript
public readonly noDoneCallback: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow using a callback in asynchronous tests and hooks.

---

##### `noImplicitBoolean`<sup>Optional</sup> <a name="noImplicitBoolean" id="projen.javascript.biome.biome_config.IStyle.property.noImplicitBoolean"></a>

```typescript
public readonly noImplicitBoolean: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow implicit true values on JSX boolean attributes.

---

##### `noInferrableTypes`<sup>Optional</sup> <a name="noInferrableTypes" id="projen.javascript.biome.biome_config.IStyle.property.noInferrableTypes"></a>

```typescript
public readonly noInferrableTypes: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow type annotations for variables, parameters, and class properties initialized with a literal expression.

---

##### `noNamespace`<sup>Optional</sup> <a name="noNamespace" id="projen.javascript.biome.biome_config.IStyle.property.noNamespace"></a>

```typescript
public readonly noNamespace: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of TypeScript's namespaces.

---

##### `noNamespaceImport`<sup>Optional</sup> <a name="noNamespaceImport" id="projen.javascript.biome.biome_config.IStyle.property.noNamespaceImport"></a>

```typescript
public readonly noNamespaceImport: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of namespace imports.

---

##### `noNegationElse`<sup>Optional</sup> <a name="noNegationElse" id="projen.javascript.biome.biome_config.IStyle.property.noNegationElse"></a>

```typescript
public readonly noNegationElse: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow negation in the condition of an if statement if it has an else clause.

---

##### `noNonNullAssertion`<sup>Optional</sup> <a name="noNonNullAssertion" id="projen.javascript.biome.biome_config.IStyle.property.noNonNullAssertion"></a>

```typescript
public readonly noNonNullAssertion: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow non-null assertions using the !

postfix operator.

---

##### `noParameterAssign`<sup>Optional</sup> <a name="noParameterAssign" id="projen.javascript.biome.biome_config.IStyle.property.noParameterAssign"></a>

```typescript
public readonly noParameterAssign: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow reassigning function parameters.

---

##### `noParameterProperties`<sup>Optional</sup> <a name="noParameterProperties" id="projen.javascript.biome.biome_config.IStyle.property.noParameterProperties"></a>

```typescript
public readonly noParameterProperties: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the use of parameter properties in class constructors.

---

##### `noRestrictedGlobals`<sup>Optional</sup> <a name="noRestrictedGlobals" id="projen.javascript.biome.biome_config.IStyle.property.noRestrictedGlobals"></a>

```typescript
public readonly noRestrictedGlobals: string | IRuleWithRestrictedGlobalsOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithRestrictedGlobalsOptions

This rule allows you to specify global variable names that you don’t want to use in your application.

---

##### `noShoutyConstants`<sup>Optional</sup> <a name="noShoutyConstants" id="projen.javascript.biome.biome_config.IStyle.property.noShoutyConstants"></a>

```typescript
public readonly noShoutyConstants: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of constants which its value is the upper-case version of its name.

---

##### `noUnusedTemplateLiteral`<sup>Optional</sup> <a name="noUnusedTemplateLiteral" id="projen.javascript.biome.biome_config.IStyle.property.noUnusedTemplateLiteral"></a>

```typescript
public readonly noUnusedTemplateLiteral: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow template literals if interpolation and special-character handling are not needed.

---

##### `noUselessElse`<sup>Optional</sup> <a name="noUselessElse" id="projen.javascript.biome.biome_config.IStyle.property.noUselessElse"></a>

```typescript
public readonly noUselessElse: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow else block when the if block breaks early.

---

##### `noVar`<sup>Optional</sup> <a name="noVar" id="projen.javascript.biome.biome_config.IStyle.property.noVar"></a>

```typescript
public readonly noVar: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of var.

---

##### `noYodaExpression`<sup>Optional</sup> <a name="noYodaExpression" id="projen.javascript.biome.biome_config.IStyle.property.noYodaExpression"></a>

```typescript
public readonly noYodaExpression: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of yoda expressions.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.IStyle.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

##### `useAsConstAssertion`<sup>Optional</sup> <a name="useAsConstAssertion" id="projen.javascript.biome.biome_config.IStyle.property.useAsConstAssertion"></a>

```typescript
public readonly useAsConstAssertion: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the use of as const over literal type and type annotation.

---

##### `useBlockStatements`<sup>Optional</sup> <a name="useBlockStatements" id="projen.javascript.biome.biome_config.IStyle.property.useBlockStatements"></a>

```typescript
public readonly useBlockStatements: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Requires following curly brace conventions.

---

##### `useCollapsedElseIf`<sup>Optional</sup> <a name="useCollapsedElseIf" id="projen.javascript.biome.biome_config.IStyle.property.useCollapsedElseIf"></a>

```typescript
public readonly useCollapsedElseIf: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce using else if instead of nested if in else clauses.

---

##### `useConsistentArrayType`<sup>Optional</sup> <a name="useConsistentArrayType" id="projen.javascript.biome.biome_config.IStyle.property.useConsistentArrayType"></a>

```typescript
public readonly useConsistentArrayType: string | IRuleWithConsistentArrayTypeOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithConsistentArrayTypeOptions

Require consistently using either T\[] or Array\<T>.

---

##### `useConsistentBuiltinInstantiation`<sup>Optional</sup> <a name="useConsistentBuiltinInstantiation" id="projen.javascript.biome.biome_config.IStyle.property.useConsistentBuiltinInstantiation"></a>

```typescript
public readonly useConsistentBuiltinInstantiation: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the use of new for all builtins, except String, Number and Boolean.

---

##### `useConst`<sup>Optional</sup> <a name="useConst" id="projen.javascript.biome.biome_config.IStyle.property.useConst"></a>

```typescript
public readonly useConst: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Require const declarations for variables that are only assigned once.

---

##### `useDefaultParameterLast`<sup>Optional</sup> <a name="useDefaultParameterLast" id="projen.javascript.biome.biome_config.IStyle.property.useDefaultParameterLast"></a>

```typescript
public readonly useDefaultParameterLast: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce default function parameters and optional function parameters to be last.

---

##### `useDefaultSwitchClause`<sup>Optional</sup> <a name="useDefaultSwitchClause" id="projen.javascript.biome.biome_config.IStyle.property.useDefaultSwitchClause"></a>

```typescript
public readonly useDefaultSwitchClause: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Require the default clause in switch statements.

---

##### `useEnumInitializers`<sup>Optional</sup> <a name="useEnumInitializers" id="projen.javascript.biome.biome_config.IStyle.property.useEnumInitializers"></a>

```typescript
public readonly useEnumInitializers: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Require that each enum member value be explicitly initialized.

---

##### `useExplicitLengthCheck`<sup>Optional</sup> <a name="useExplicitLengthCheck" id="projen.javascript.biome.biome_config.IStyle.property.useExplicitLengthCheck"></a>

```typescript
public readonly useExplicitLengthCheck: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce explicitly comparing the length, size, byteLength or byteOffset property of a value.

---

##### `useExponentiationOperator`<sup>Optional</sup> <a name="useExponentiationOperator" id="projen.javascript.biome.biome_config.IStyle.property.useExponentiationOperator"></a>

```typescript
public readonly useExponentiationOperator: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of Math.pow in favor of the ** operator.

---

##### `useExportType`<sup>Optional</sup> <a name="useExportType" id="projen.javascript.biome.biome_config.IStyle.property.useExportType"></a>

```typescript
public readonly useExportType: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Promotes the use of export type for types.

---

##### `useFilenamingConvention`<sup>Optional</sup> <a name="useFilenamingConvention" id="projen.javascript.biome.biome_config.IStyle.property.useFilenamingConvention"></a>

```typescript
public readonly useFilenamingConvention: string | IRuleWithFilenamingConventionOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFilenamingConventionOptions

Enforce naming conventions for JavaScript and TypeScript filenames.

---

##### `useForOf`<sup>Optional</sup> <a name="useForOf" id="projen.javascript.biome.biome_config.IStyle.property.useForOf"></a>

```typescript
public readonly useForOf: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

This rule recommends a for-of loop when in a for loop, the index used to extract an item from the iterated array.

---

##### `useFragmentSyntax`<sup>Optional</sup> <a name="useFragmentSyntax" id="projen.javascript.biome.biome_config.IStyle.property.useFragmentSyntax"></a>

```typescript
public readonly useFragmentSyntax: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

This rule enforces the use of \<>...\</> over \<Fragment>...\</Fragment>.

---

##### `useImportType`<sup>Optional</sup> <a name="useImportType" id="projen.javascript.biome.biome_config.IStyle.property.useImportType"></a>

```typescript
public readonly useImportType: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Promotes the use of import type for types.

---

##### `useLiteralEnumMembers`<sup>Optional</sup> <a name="useLiteralEnumMembers" id="projen.javascript.biome.biome_config.IStyle.property.useLiteralEnumMembers"></a>

```typescript
public readonly useLiteralEnumMembers: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Require all enum members to be literal values.

---

##### `useNamingConvention`<sup>Optional</sup> <a name="useNamingConvention" id="projen.javascript.biome.biome_config.IStyle.property.useNamingConvention"></a>

```typescript
public readonly useNamingConvention: string | IRuleWithNamingConventionOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNamingConventionOptions

Enforce naming conventions for everything across a codebase.

---

##### `useNodeAssertStrict`<sup>Optional</sup> <a name="useNodeAssertStrict" id="projen.javascript.biome.biome_config.IStyle.property.useNodeAssertStrict"></a>

```typescript
public readonly useNodeAssertStrict: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Promotes the usage of node:assert/strict over node:assert.

---

##### `useNodejsImportProtocol`<sup>Optional</sup> <a name="useNodejsImportProtocol" id="projen.javascript.biome.biome_config.IStyle.property.useNodejsImportProtocol"></a>

```typescript
public readonly useNodejsImportProtocol: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforces using the node: protocol for Node.js builtin modules.

---

##### `useNumberNamespace`<sup>Optional</sup> <a name="useNumberNamespace" id="projen.javascript.biome.biome_config.IStyle.property.useNumberNamespace"></a>

```typescript
public readonly useNumberNamespace: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use the Number properties instead of global ones.

---

##### `useNumericLiterals`<sup>Optional</sup> <a name="useNumericLiterals" id="projen.javascript.biome.biome_config.IStyle.property.useNumericLiterals"></a>

```typescript
public readonly useNumericLiterals: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals.

---

##### `useSelfClosingElements`<sup>Optional</sup> <a name="useSelfClosingElements" id="projen.javascript.biome.biome_config.IStyle.property.useSelfClosingElements"></a>

```typescript
public readonly useSelfClosingElements: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prevent extra closing tags for components without children.

---

##### `useShorthandArrayType`<sup>Optional</sup> <a name="useShorthandArrayType" id="projen.javascript.biome.biome_config.IStyle.property.useShorthandArrayType"></a>

```typescript
public readonly useShorthandArrayType: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

When expressing array types, this rule promotes the usage of T\[] shorthand instead of Array\<T>.

---

##### `useShorthandAssign`<sup>Optional</sup> <a name="useShorthandAssign" id="projen.javascript.biome.biome_config.IStyle.property.useShorthandAssign"></a>

```typescript
public readonly useShorthandAssign: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Require assignment operator shorthand where possible.

---

##### `useShorthandFunctionType`<sup>Optional</sup> <a name="useShorthandFunctionType" id="projen.javascript.biome.biome_config.IStyle.property.useShorthandFunctionType"></a>

```typescript
public readonly useShorthandFunctionType: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce using function types instead of object type with call signatures.

---

##### `useSingleCaseStatement`<sup>Optional</sup> <a name="useSingleCaseStatement" id="projen.javascript.biome.biome_config.IStyle.property.useSingleCaseStatement"></a>

```typescript
public readonly useSingleCaseStatement: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforces switch clauses have a single statement, emits a quick fix wrapping the statements in a block.

---

##### `useSingleVarDeclarator`<sup>Optional</sup> <a name="useSingleVarDeclarator" id="projen.javascript.biome.biome_config.IStyle.property.useSingleVarDeclarator"></a>

```typescript
public readonly useSingleVarDeclarator: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow multiple variable declarations in the same variable statement.

---

##### `useTemplate`<sup>Optional</sup> <a name="useTemplate" id="projen.javascript.biome.biome_config.IStyle.property.useTemplate"></a>

```typescript
public readonly useTemplate: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prefer template literals over string concatenation.

---

##### `useThrowNewError`<sup>Optional</sup> <a name="useThrowNewError" id="projen.javascript.biome.biome_config.IStyle.property.useThrowNewError"></a>

```typescript
public readonly useThrowNewError: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Require new when throwing an error.

---

##### `useThrowOnlyError`<sup>Optional</sup> <a name="useThrowOnlyError" id="projen.javascript.biome.biome_config.IStyle.property.useThrowOnlyError"></a>

```typescript
public readonly useThrowOnlyError: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow throwing non-Error values.

---

##### `useWhile`<sup>Optional</sup> <a name="useWhile" id="projen.javascript.biome.biome_config.IStyle.property.useWhile"></a>

```typescript
public readonly useWhile: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce the use of while loops instead of for loops when the initializer and update expressions are not needed.

---

### ISuggestedExtensionMapping <a name="ISuggestedExtensionMapping" id="projen.javascript.biome.biome_config.ISuggestedExtensionMapping"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ISuggestedExtensionMapping


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ISuggestedExtensionMapping.property.component">component</a></code> | <code>string</code> | Extension that should be used for component file imports. |
| <code><a href="#projen.javascript.biome.biome_config.ISuggestedExtensionMapping.property.module">module</a></code> | <code>string</code> | Extension that should be used for module imports. |

---

##### `component`<sup>Optional</sup> <a name="component" id="projen.javascript.biome.biome_config.ISuggestedExtensionMapping.property.component"></a>

```typescript
public readonly component: string;
```

- *Type:* string

Extension that should be used for component file imports.

---

##### `module`<sup>Optional</sup> <a name="module" id="projen.javascript.biome.biome_config.ISuggestedExtensionMapping.property.module"></a>

```typescript
public readonly module: string;
```

- *Type:* string

Extension that should be used for module imports.

---

### ISuspicious <a name="ISuspicious" id="projen.javascript.biome.biome_config.ISuspicious"></a>

- *Implemented By:* projen.javascript.biome.biome_config.ISuspicious

A list of rules that belong to this group.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.all">all</a></code> | <code>boolean</code> | It enables ALL rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noApproximativeNumericConstant">noApproximativeNumericConstant</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use standard constants instead of approximated literals. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noArrayIndexKey">noArrayIndexKey</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Discourage the usage of Array index in keys. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noAssignInExpressions">noAssignInExpressions</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow assignments in expressions. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noAsyncPromiseExecutor">noAsyncPromiseExecutor</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallows using an async function as a Promise executor. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noCatchAssign">noCatchAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow reassigning exceptions in catch clauses. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noClassAssign">noClassAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow reassigning class members. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noCommentText">noCommentText</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prevent comments from being inserted as text nodes. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noCompareNegZero">noCompareNegZero</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow comparing against -0. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noConfusingLabels">noConfusingLabels</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow labeled statements that are not loops. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noConfusingVoidType">noConfusingVoidType</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow void type outside of generic or return types. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noConsole">noConsole</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions</code> | Disallow the use of console. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noConsoleLog">noConsoleLog</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of console.log. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noConstEnum">noConstEnum</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow TypeScript const enum. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noControlCharactersInRegex">noControlCharactersInRegex</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevents from having control characters and some escape sequences that match control characters in regular expressions. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDebugger">noDebugger</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the use of debugger. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDoubleEquals">noDoubleEquals</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions</code> | Require the use of === and !==. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateAtImportRules">noDuplicateAtImportRules</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateCase">noDuplicateCase</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate case labels. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateClassMembers">noDuplicateClassMembers</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate class members. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateFontNames">noDuplicateFontNames</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate names within font families. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateJsxProps">noDuplicateJsxProps</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Prevents JSX properties to be assigned multiple times. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateObjectKeys">noDuplicateObjectKeys</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow two keys with the same name inside objects. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateParameters">noDuplicateParameters</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate function parameter name. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateSelectorsKeyframeBlock">noDuplicateSelectorsKeyframeBlock</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow duplicate selectors within keyframe blocks. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateTestHooks">noDuplicateTestHooks</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | A describe block should not contain duplicate hooks. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noEmptyBlock">noEmptyBlock</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow CSS empty blocks. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noEmptyBlockStatements">noEmptyBlockStatements</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow empty block statements and static blocks. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noEmptyInterface">noEmptyInterface</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow the declaration of empty interfaces. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noEvolvingTypes">noEvolvingTypes</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow variables from evolving into any type through reassignments. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noExplicitAny">noExplicitAny</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow the any type usage. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noExportsInTest">noExportsInTest</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow using export or module.exports in files containing tests. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noExtraNonNullAssertion">noExtraNonNullAssertion</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prevents the wrong usage of the non-null assertion operator (!) in TypeScript files. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noFallthroughSwitchClause">noFallthroughSwitchClause</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow fallthrough of switch clauses. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noFocusedTests">noFocusedTests</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow focused tests. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noFunctionAssign">noFunctionAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow reassigning function declarations. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noGlobalAssign">noGlobalAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow assignments to native objects and read-only global variables. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noGlobalIsFinite">noGlobalIsFinite</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use Number.isFinite instead of global isFinite. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noGlobalIsNan">noGlobalIsNan</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use Number.isNaN instead of global isNaN. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noImplicitAnyLet">noImplicitAnyLet</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow use of implicit any type on variable declarations. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noImportantInKeyframe">noImportantInKeyframe</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow invalid !important within keyframe declarations. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noImportAssign">noImportAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow assigning to imported bindings. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noLabelVar">noLabelVar</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow labels that share a name with a variable. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noMisleadingCharacterClass">noMisleadingCharacterClass</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow characters made with multiple code points in character class syntax. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noMisleadingInstantiator">noMisleadingInstantiator</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce proper usage of new and constructor. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noMisplacedAssertion">noMisplacedAssertion</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Checks that the assertion function, for example expect, is placed inside an it() function call. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noMisrefactoredShorthandAssign">noMisrefactoredShorthandAssign</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow shorthand assign when variable appears on both sides. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noPrototypeBuiltins">noPrototypeBuiltins</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow direct use of Object.prototype builtins. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noReactSpecificProps">noReactSpecificProps</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prevents React-specific JSX properties from being used. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noRedeclare">noRedeclare</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow variable, function, class, and type redeclarations in the same scope. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noRedundantUseStrict">noRedundantUseStrict</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Prevents from having redundant "use strict". |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noSelfCompare">noSelfCompare</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow comparisons where both sides are exactly the same. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noShadowRestrictedNames">noShadowRestrictedNames</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow identifiers from shadowing restricted names. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noShorthandPropertyOverrides">noShorthandPropertyOverrides</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow shorthand properties that override related longhand properties. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noSkippedTests">noSkippedTests</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow disabled tests. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noSparseArray">noSparseArray</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow sparse arrays. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noSuspiciousSemicolonInJsx">noSuspiciousSemicolonInJsx</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | It detects possible "wrong" semicolons inside JSX elements. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noThenProperty">noThenProperty</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow then property. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noUnsafeDeclarationMerging">noUnsafeDeclarationMerging</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Disallow unsafe declaration merging between interfaces and classes. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.noUnsafeNegation">noUnsafeNegation</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Disallow using unsafe negation. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.recommended">recommended</a></code> | <code>boolean</code> | It enables the recommended rules for this group. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useAwait">useAwait</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Ensure async functions utilize await. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useDefaultSwitchClauseLast">useDefaultSwitchClauseLast</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce default clauses in switch statements to be last. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useErrorMessage">useErrorMessage</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce passing a message value when creating a built-in error. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useGetterReturn">useGetterReturn</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithNoOptions</code> | Enforce get methods to always return a value. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useIsArray">useIsArray</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Use Array.isArray() instead of instanceof Array. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useNamespaceKeyword">useNamespaceKeyword</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Require using the namespace keyword over the module keyword to declare TypeScript namespaces. |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useNumberToFixedDigitsArgument">useNumberToFixedDigitsArgument</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | Enforce using the digits argument with Number#toFixed(). |
| <code><a href="#projen.javascript.biome.biome_config.ISuspicious.property.useValidTypeof">useValidTypeof</a></code> | <code>string \| projen.javascript.biome.biome_config.IRuleWithFixNoOptions</code> | This rule verifies the result of typeof $expr unary expressions is being compared to valid values, either string literals containing valid type names or other typeof expressions. |

---

##### `all`<sup>Optional</sup> <a name="all" id="projen.javascript.biome.biome_config.ISuspicious.property.all"></a>

```typescript
public readonly all: boolean;
```

- *Type:* boolean

It enables ALL rules for this group.

---

##### `noApproximativeNumericConstant`<sup>Optional</sup> <a name="noApproximativeNumericConstant" id="projen.javascript.biome.biome_config.ISuspicious.property.noApproximativeNumericConstant"></a>

```typescript
public readonly noApproximativeNumericConstant: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use standard constants instead of approximated literals.

---

##### `noArrayIndexKey`<sup>Optional</sup> <a name="noArrayIndexKey" id="projen.javascript.biome.biome_config.ISuspicious.property.noArrayIndexKey"></a>

```typescript
public readonly noArrayIndexKey: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Discourage the usage of Array index in keys.

---

##### `noAssignInExpressions`<sup>Optional</sup> <a name="noAssignInExpressions" id="projen.javascript.biome.biome_config.ISuspicious.property.noAssignInExpressions"></a>

```typescript
public readonly noAssignInExpressions: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow assignments in expressions.

---

##### `noAsyncPromiseExecutor`<sup>Optional</sup> <a name="noAsyncPromiseExecutor" id="projen.javascript.biome.biome_config.ISuspicious.property.noAsyncPromiseExecutor"></a>

```typescript
public readonly noAsyncPromiseExecutor: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallows using an async function as a Promise executor.

---

##### `noCatchAssign`<sup>Optional</sup> <a name="noCatchAssign" id="projen.javascript.biome.biome_config.ISuspicious.property.noCatchAssign"></a>

```typescript
public readonly noCatchAssign: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow reassigning exceptions in catch clauses.

---

##### `noClassAssign`<sup>Optional</sup> <a name="noClassAssign" id="projen.javascript.biome.biome_config.ISuspicious.property.noClassAssign"></a>

```typescript
public readonly noClassAssign: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow reassigning class members.

---

##### `noCommentText`<sup>Optional</sup> <a name="noCommentText" id="projen.javascript.biome.biome_config.ISuspicious.property.noCommentText"></a>

```typescript
public readonly noCommentText: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prevent comments from being inserted as text nodes.

---

##### `noCompareNegZero`<sup>Optional</sup> <a name="noCompareNegZero" id="projen.javascript.biome.biome_config.ISuspicious.property.noCompareNegZero"></a>

```typescript
public readonly noCompareNegZero: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow comparing against -0.

---

##### `noConfusingLabels`<sup>Optional</sup> <a name="noConfusingLabels" id="projen.javascript.biome.biome_config.ISuspicious.property.noConfusingLabels"></a>

```typescript
public readonly noConfusingLabels: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow labeled statements that are not loops.

---

##### `noConfusingVoidType`<sup>Optional</sup> <a name="noConfusingVoidType" id="projen.javascript.biome.biome_config.ISuspicious.property.noConfusingVoidType"></a>

```typescript
public readonly noConfusingVoidType: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow void type outside of generic or return types.

---

##### `noConsole`<sup>Optional</sup> <a name="noConsole" id="projen.javascript.biome.biome_config.ISuspicious.property.noConsole"></a>

```typescript
public readonly noConsole: string | IRuleWithNoConsoleOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoConsoleOptions

Disallow the use of console.

---

##### `noConsoleLog`<sup>Optional</sup> <a name="noConsoleLog" id="projen.javascript.biome.biome_config.ISuspicious.property.noConsoleLog"></a>

```typescript
public readonly noConsoleLog: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of console.log.

---

##### `noConstEnum`<sup>Optional</sup> <a name="noConstEnum" id="projen.javascript.biome.biome_config.ISuspicious.property.noConstEnum"></a>

```typescript
public readonly noConstEnum: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow TypeScript const enum.

---

##### `noControlCharactersInRegex`<sup>Optional</sup> <a name="noControlCharactersInRegex" id="projen.javascript.biome.biome_config.ISuspicious.property.noControlCharactersInRegex"></a>

```typescript
public readonly noControlCharactersInRegex: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevents from having control characters and some escape sequences that match control characters in regular expressions.

---

##### `noDebugger`<sup>Optional</sup> <a name="noDebugger" id="projen.javascript.biome.biome_config.ISuspicious.property.noDebugger"></a>

```typescript
public readonly noDebugger: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the use of debugger.

---

##### `noDoubleEquals`<sup>Optional</sup> <a name="noDoubleEquals" id="projen.javascript.biome.biome_config.ISuspicious.property.noDoubleEquals"></a>

```typescript
public readonly noDoubleEquals: string | IRuleWithNoDoubleEqualsOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoDoubleEqualsOptions

Require the use of === and !==.

---

##### `noDuplicateAtImportRules`<sup>Optional</sup> <a name="noDuplicateAtImportRules" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateAtImportRules"></a>

```typescript
public readonly noDuplicateAtImportRules: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate.

---

##### `noDuplicateCase`<sup>Optional</sup> <a name="noDuplicateCase" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateCase"></a>

```typescript
public readonly noDuplicateCase: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate case labels.

---

##### `noDuplicateClassMembers`<sup>Optional</sup> <a name="noDuplicateClassMembers" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateClassMembers"></a>

```typescript
public readonly noDuplicateClassMembers: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate class members.

---

##### `noDuplicateFontNames`<sup>Optional</sup> <a name="noDuplicateFontNames" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateFontNames"></a>

```typescript
public readonly noDuplicateFontNames: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate names within font families.

---

##### `noDuplicateJsxProps`<sup>Optional</sup> <a name="noDuplicateJsxProps" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateJsxProps"></a>

```typescript
public readonly noDuplicateJsxProps: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Prevents JSX properties to be assigned multiple times.

---

##### `noDuplicateObjectKeys`<sup>Optional</sup> <a name="noDuplicateObjectKeys" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateObjectKeys"></a>

```typescript
public readonly noDuplicateObjectKeys: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow two keys with the same name inside objects.

---

##### `noDuplicateParameters`<sup>Optional</sup> <a name="noDuplicateParameters" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateParameters"></a>

```typescript
public readonly noDuplicateParameters: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate function parameter name.

---

##### `noDuplicateSelectorsKeyframeBlock`<sup>Optional</sup> <a name="noDuplicateSelectorsKeyframeBlock" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateSelectorsKeyframeBlock"></a>

```typescript
public readonly noDuplicateSelectorsKeyframeBlock: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow duplicate selectors within keyframe blocks.

---

##### `noDuplicateTestHooks`<sup>Optional</sup> <a name="noDuplicateTestHooks" id="projen.javascript.biome.biome_config.ISuspicious.property.noDuplicateTestHooks"></a>

```typescript
public readonly noDuplicateTestHooks: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

A describe block should not contain duplicate hooks.

---

##### `noEmptyBlock`<sup>Optional</sup> <a name="noEmptyBlock" id="projen.javascript.biome.biome_config.ISuspicious.property.noEmptyBlock"></a>

```typescript
public readonly noEmptyBlock: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow CSS empty blocks.

---

##### `noEmptyBlockStatements`<sup>Optional</sup> <a name="noEmptyBlockStatements" id="projen.javascript.biome.biome_config.ISuspicious.property.noEmptyBlockStatements"></a>

```typescript
public readonly noEmptyBlockStatements: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow empty block statements and static blocks.

---

##### `noEmptyInterface`<sup>Optional</sup> <a name="noEmptyInterface" id="projen.javascript.biome.biome_config.ISuspicious.property.noEmptyInterface"></a>

```typescript
public readonly noEmptyInterface: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow the declaration of empty interfaces.

---

##### `noEvolvingTypes`<sup>Optional</sup> <a name="noEvolvingTypes" id="projen.javascript.biome.biome_config.ISuspicious.property.noEvolvingTypes"></a>

```typescript
public readonly noEvolvingTypes: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow variables from evolving into any type through reassignments.

---

##### `noExplicitAny`<sup>Optional</sup> <a name="noExplicitAny" id="projen.javascript.biome.biome_config.ISuspicious.property.noExplicitAny"></a>

```typescript
public readonly noExplicitAny: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow the any type usage.

---

##### `noExportsInTest`<sup>Optional</sup> <a name="noExportsInTest" id="projen.javascript.biome.biome_config.ISuspicious.property.noExportsInTest"></a>

```typescript
public readonly noExportsInTest: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow using export or module.exports in files containing tests.

---

##### `noExtraNonNullAssertion`<sup>Optional</sup> <a name="noExtraNonNullAssertion" id="projen.javascript.biome.biome_config.ISuspicious.property.noExtraNonNullAssertion"></a>

```typescript
public readonly noExtraNonNullAssertion: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prevents the wrong usage of the non-null assertion operator (!) in TypeScript files.

---

##### `noFallthroughSwitchClause`<sup>Optional</sup> <a name="noFallthroughSwitchClause" id="projen.javascript.biome.biome_config.ISuspicious.property.noFallthroughSwitchClause"></a>

```typescript
public readonly noFallthroughSwitchClause: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow fallthrough of switch clauses.

---

##### `noFocusedTests`<sup>Optional</sup> <a name="noFocusedTests" id="projen.javascript.biome.biome_config.ISuspicious.property.noFocusedTests"></a>

```typescript
public readonly noFocusedTests: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow focused tests.

---

##### `noFunctionAssign`<sup>Optional</sup> <a name="noFunctionAssign" id="projen.javascript.biome.biome_config.ISuspicious.property.noFunctionAssign"></a>

```typescript
public readonly noFunctionAssign: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow reassigning function declarations.

---

##### `noGlobalAssign`<sup>Optional</sup> <a name="noGlobalAssign" id="projen.javascript.biome.biome_config.ISuspicious.property.noGlobalAssign"></a>

```typescript
public readonly noGlobalAssign: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow assignments to native objects and read-only global variables.

---

##### `noGlobalIsFinite`<sup>Optional</sup> <a name="noGlobalIsFinite" id="projen.javascript.biome.biome_config.ISuspicious.property.noGlobalIsFinite"></a>

```typescript
public readonly noGlobalIsFinite: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use Number.isFinite instead of global isFinite.

---

##### `noGlobalIsNan`<sup>Optional</sup> <a name="noGlobalIsNan" id="projen.javascript.biome.biome_config.ISuspicious.property.noGlobalIsNan"></a>

```typescript
public readonly noGlobalIsNan: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use Number.isNaN instead of global isNaN.

---

##### `noImplicitAnyLet`<sup>Optional</sup> <a name="noImplicitAnyLet" id="projen.javascript.biome.biome_config.ISuspicious.property.noImplicitAnyLet"></a>

```typescript
public readonly noImplicitAnyLet: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow use of implicit any type on variable declarations.

---

##### `noImportantInKeyframe`<sup>Optional</sup> <a name="noImportantInKeyframe" id="projen.javascript.biome.biome_config.ISuspicious.property.noImportantInKeyframe"></a>

```typescript
public readonly noImportantInKeyframe: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow invalid !important within keyframe declarations.

---

##### `noImportAssign`<sup>Optional</sup> <a name="noImportAssign" id="projen.javascript.biome.biome_config.ISuspicious.property.noImportAssign"></a>

```typescript
public readonly noImportAssign: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow assigning to imported bindings.

---

##### `noLabelVar`<sup>Optional</sup> <a name="noLabelVar" id="projen.javascript.biome.biome_config.ISuspicious.property.noLabelVar"></a>

```typescript
public readonly noLabelVar: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow labels that share a name with a variable.

---

##### `noMisleadingCharacterClass`<sup>Optional</sup> <a name="noMisleadingCharacterClass" id="projen.javascript.biome.biome_config.ISuspicious.property.noMisleadingCharacterClass"></a>

```typescript
public readonly noMisleadingCharacterClass: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow characters made with multiple code points in character class syntax.

---

##### `noMisleadingInstantiator`<sup>Optional</sup> <a name="noMisleadingInstantiator" id="projen.javascript.biome.biome_config.ISuspicious.property.noMisleadingInstantiator"></a>

```typescript
public readonly noMisleadingInstantiator: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce proper usage of new and constructor.

---

##### `noMisplacedAssertion`<sup>Optional</sup> <a name="noMisplacedAssertion" id="projen.javascript.biome.biome_config.ISuspicious.property.noMisplacedAssertion"></a>

```typescript
public readonly noMisplacedAssertion: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Checks that the assertion function, for example expect, is placed inside an it() function call.

---

##### `noMisrefactoredShorthandAssign`<sup>Optional</sup> <a name="noMisrefactoredShorthandAssign" id="projen.javascript.biome.biome_config.ISuspicious.property.noMisrefactoredShorthandAssign"></a>

```typescript
public readonly noMisrefactoredShorthandAssign: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow shorthand assign when variable appears on both sides.

---

##### `noPrototypeBuiltins`<sup>Optional</sup> <a name="noPrototypeBuiltins" id="projen.javascript.biome.biome_config.ISuspicious.property.noPrototypeBuiltins"></a>

```typescript
public readonly noPrototypeBuiltins: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow direct use of Object.prototype builtins.

---

##### `noReactSpecificProps`<sup>Optional</sup> <a name="noReactSpecificProps" id="projen.javascript.biome.biome_config.ISuspicious.property.noReactSpecificProps"></a>

```typescript
public readonly noReactSpecificProps: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prevents React-specific JSX properties from being used.

---

##### `noRedeclare`<sup>Optional</sup> <a name="noRedeclare" id="projen.javascript.biome.biome_config.ISuspicious.property.noRedeclare"></a>

```typescript
public readonly noRedeclare: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow variable, function, class, and type redeclarations in the same scope.

---

##### `noRedundantUseStrict`<sup>Optional</sup> <a name="noRedundantUseStrict" id="projen.javascript.biome.biome_config.ISuspicious.property.noRedundantUseStrict"></a>

```typescript
public readonly noRedundantUseStrict: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Prevents from having redundant "use strict".

---

##### `noSelfCompare`<sup>Optional</sup> <a name="noSelfCompare" id="projen.javascript.biome.biome_config.ISuspicious.property.noSelfCompare"></a>

```typescript
public readonly noSelfCompare: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow comparisons where both sides are exactly the same.

---

##### `noShadowRestrictedNames`<sup>Optional</sup> <a name="noShadowRestrictedNames" id="projen.javascript.biome.biome_config.ISuspicious.property.noShadowRestrictedNames"></a>

```typescript
public readonly noShadowRestrictedNames: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow identifiers from shadowing restricted names.

---

##### `noShorthandPropertyOverrides`<sup>Optional</sup> <a name="noShorthandPropertyOverrides" id="projen.javascript.biome.biome_config.ISuspicious.property.noShorthandPropertyOverrides"></a>

```typescript
public readonly noShorthandPropertyOverrides: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow shorthand properties that override related longhand properties.

---

##### `noSkippedTests`<sup>Optional</sup> <a name="noSkippedTests" id="projen.javascript.biome.biome_config.ISuspicious.property.noSkippedTests"></a>

```typescript
public readonly noSkippedTests: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow disabled tests.

---

##### `noSparseArray`<sup>Optional</sup> <a name="noSparseArray" id="projen.javascript.biome.biome_config.ISuspicious.property.noSparseArray"></a>

```typescript
public readonly noSparseArray: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow sparse arrays.

---

##### `noSuspiciousSemicolonInJsx`<sup>Optional</sup> <a name="noSuspiciousSemicolonInJsx" id="projen.javascript.biome.biome_config.ISuspicious.property.noSuspiciousSemicolonInJsx"></a>

```typescript
public readonly noSuspiciousSemicolonInJsx: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

It detects possible "wrong" semicolons inside JSX elements.

---

##### `noThenProperty`<sup>Optional</sup> <a name="noThenProperty" id="projen.javascript.biome.biome_config.ISuspicious.property.noThenProperty"></a>

```typescript
public readonly noThenProperty: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow then property.

---

##### `noUnsafeDeclarationMerging`<sup>Optional</sup> <a name="noUnsafeDeclarationMerging" id="projen.javascript.biome.biome_config.ISuspicious.property.noUnsafeDeclarationMerging"></a>

```typescript
public readonly noUnsafeDeclarationMerging: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Disallow unsafe declaration merging between interfaces and classes.

---

##### `noUnsafeNegation`<sup>Optional</sup> <a name="noUnsafeNegation" id="projen.javascript.biome.biome_config.ISuspicious.property.noUnsafeNegation"></a>

```typescript
public readonly noUnsafeNegation: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Disallow using unsafe negation.

---

##### `recommended`<sup>Optional</sup> <a name="recommended" id="projen.javascript.biome.biome_config.ISuspicious.property.recommended"></a>

```typescript
public readonly recommended: boolean;
```

- *Type:* boolean

It enables the recommended rules for this group.

---

##### `useAwait`<sup>Optional</sup> <a name="useAwait" id="projen.javascript.biome.biome_config.ISuspicious.property.useAwait"></a>

```typescript
public readonly useAwait: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Ensure async functions utilize await.

---

##### `useDefaultSwitchClauseLast`<sup>Optional</sup> <a name="useDefaultSwitchClauseLast" id="projen.javascript.biome.biome_config.ISuspicious.property.useDefaultSwitchClauseLast"></a>

```typescript
public readonly useDefaultSwitchClauseLast: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce default clauses in switch statements to be last.

---

##### `useErrorMessage`<sup>Optional</sup> <a name="useErrorMessage" id="projen.javascript.biome.biome_config.ISuspicious.property.useErrorMessage"></a>

```typescript
public readonly useErrorMessage: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce passing a message value when creating a built-in error.

---

##### `useGetterReturn`<sup>Optional</sup> <a name="useGetterReturn" id="projen.javascript.biome.biome_config.ISuspicious.property.useGetterReturn"></a>

```typescript
public readonly useGetterReturn: string | IRuleWithNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithNoOptions

Enforce get methods to always return a value.

---

##### `useIsArray`<sup>Optional</sup> <a name="useIsArray" id="projen.javascript.biome.biome_config.ISuspicious.property.useIsArray"></a>

```typescript
public readonly useIsArray: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Use Array.isArray() instead of instanceof Array.

---

##### `useNamespaceKeyword`<sup>Optional</sup> <a name="useNamespaceKeyword" id="projen.javascript.biome.biome_config.ISuspicious.property.useNamespaceKeyword"></a>

```typescript
public readonly useNamespaceKeyword: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Require using the namespace keyword over the module keyword to declare TypeScript namespaces.

---

##### `useNumberToFixedDigitsArgument`<sup>Optional</sup> <a name="useNumberToFixedDigitsArgument" id="projen.javascript.biome.biome_config.ISuspicious.property.useNumberToFixedDigitsArgument"></a>

```typescript
public readonly useNumberToFixedDigitsArgument: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

Enforce using the digits argument with Number#toFixed().

---

##### `useValidTypeof`<sup>Optional</sup> <a name="useValidTypeof" id="projen.javascript.biome.biome_config.ISuspicious.property.useValidTypeof"></a>

```typescript
public readonly useValidTypeof: string | IRuleWithFixNoOptions;
```

- *Type:* string | projen.javascript.biome.biome_config.IRuleWithFixNoOptions

This rule verifies the result of typeof $expr unary expressions is being compared to valid values, either string literals containing valid type names or other typeof expressions.

---

### IUseComponentExportOnlyModulesOptions <a name="IUseComponentExportOnlyModulesOptions" id="projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions.property.allowConstantExport">allowConstantExport</a></code> | <code>boolean</code> | Allows the export of constants. |
| <code><a href="#projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions.property.allowExportNames">allowExportNames</a></code> | <code>string[]</code> | A list of names that can be additionally exported from the module This option is for exports that do not hinder [React Fast Refresh](https://github.com/facebook/react/tree/main/packages/react-refresh), such as [`meta` in Remix](https://remix.run/docs/en/main/route/meta). |

---

##### `allowConstantExport`<sup>Optional</sup> <a name="allowConstantExport" id="projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions.property.allowConstantExport"></a>

```typescript
public readonly allowConstantExport: boolean;
```

- *Type:* boolean

Allows the export of constants.

This option is for environments that support it, such as [Vite](https://vitejs.dev/)

---

##### `allowExportNames`<sup>Optional</sup> <a name="allowExportNames" id="projen.javascript.biome.biome_config.IUseComponentExportOnlyModulesOptions.property.allowExportNames"></a>

```typescript
public readonly allowExportNames: string[];
```

- *Type:* string[]

A list of names that can be additionally exported from the module This option is for exports that do not hinder [React Fast Refresh](https://github.com/facebook/react/tree/main/packages/react-refresh), such as [`meta` in Remix](https://remix.run/docs/en/main/route/meta).

---

### IUseExhaustiveDependenciesOptions <a name="IUseExhaustiveDependenciesOptions" id="projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions

Options for the rule `useExhaustiveDependencies`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions.property.hooks">hooks</a></code> | <code>projen.javascript.biome.biome_config.IHook[]</code> | List of hooks of which the dependencies should be validated. |
| <code><a href="#projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions.property.reportMissingDependenciesArray">reportMissingDependenciesArray</a></code> | <code>boolean</code> | Whether to report an error when a hook has no dependencies array. |
| <code><a href="#projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions.property.reportUnnecessaryDependencies">reportUnnecessaryDependencies</a></code> | <code>boolean</code> | Whether to report an error when a dependency is listed in the dependencies array but isn't used. |

---

##### `hooks`<sup>Optional</sup> <a name="hooks" id="projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions.property.hooks"></a>

```typescript
public readonly hooks: IHook[];
```

- *Type:* projen.javascript.biome.biome_config.IHook[]

List of hooks of which the dependencies should be validated.

---

##### `reportMissingDependenciesArray`<sup>Optional</sup> <a name="reportMissingDependenciesArray" id="projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions.property.reportMissingDependenciesArray"></a>

```typescript
public readonly reportMissingDependenciesArray: boolean;
```

- *Type:* boolean

Whether to report an error when a hook has no dependencies array.

---

##### `reportUnnecessaryDependencies`<sup>Optional</sup> <a name="reportUnnecessaryDependencies" id="projen.javascript.biome.biome_config.IUseExhaustiveDependenciesOptions.property.reportUnnecessaryDependencies"></a>

```typescript
public readonly reportUnnecessaryDependencies: boolean;
```

- *Type:* boolean

Whether to report an error when a dependency is listed in the dependencies array but isn't used.

Defaults to true.

---

### IUseImportExtensionsOptions <a name="IUseImportExtensionsOptions" id="projen.javascript.biome.biome_config.IUseImportExtensionsOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IUseImportExtensionsOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IUseImportExtensionsOptions.property.suggestedExtensions">suggestedExtensions</a></code> | <code>{[ key: string ]: projen.javascript.biome.biome_config.ISuggestedExtensionMapping}</code> | A map of custom import extension mappings, where the key is the inspected file extension, and the value is a pair of `module` extension and `component` import extension. |

---

##### `suggestedExtensions`<sup>Optional</sup> <a name="suggestedExtensions" id="projen.javascript.biome.biome_config.IUseImportExtensionsOptions.property.suggestedExtensions"></a>

```typescript
public readonly suggestedExtensions: {[ key: string ]: ISuggestedExtensionMapping};
```

- *Type:* {[ key: string ]: projen.javascript.biome.biome_config.ISuggestedExtensionMapping}

A map of custom import extension mappings, where the key is the inspected file extension, and the value is a pair of `module` extension and `component` import extension.

---

### IUseValidAutocompleteOptions <a name="IUseValidAutocompleteOptions" id="projen.javascript.biome.biome_config.IUseValidAutocompleteOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IUseValidAutocompleteOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IUseValidAutocompleteOptions.property.inputComponents">inputComponents</a></code> | <code>string[]</code> | `input` like custom components that should be checked. |

---

##### `inputComponents`<sup>Optional</sup> <a name="inputComponents" id="projen.javascript.biome.biome_config.IUseValidAutocompleteOptions.property.inputComponents"></a>

```typescript
public readonly inputComponents: string[];
```

- *Type:* string[]

`input` like custom components that should be checked.

---

### IUtilityClassSortingOptions <a name="IUtilityClassSortingOptions" id="projen.javascript.biome.biome_config.IUtilityClassSortingOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IUtilityClassSortingOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IUtilityClassSortingOptions.property.attributes">attributes</a></code> | <code>string[]</code> | Additional attributes that will be sorted. |
| <code><a href="#projen.javascript.biome.biome_config.IUtilityClassSortingOptions.property.functions">functions</a></code> | <code>string[]</code> | Names of the functions or tagged templates that will be sorted. |

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="projen.javascript.biome.biome_config.IUtilityClassSortingOptions.property.attributes"></a>

```typescript
public readonly attributes: string[];
```

- *Type:* string[]

Additional attributes that will be sorted.

---

##### `functions`<sup>Optional</sup> <a name="functions" id="projen.javascript.biome.biome_config.IUtilityClassSortingOptions.property.functions"></a>

```typescript
public readonly functions: string[];
```

- *Type:* string[]

Names of the functions or tagged templates that will be sorted.

---

### IValidAriaRoleOptions <a name="IValidAriaRoleOptions" id="projen.javascript.biome.biome_config.IValidAriaRoleOptions"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IValidAriaRoleOptions


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IValidAriaRoleOptions.property.allowInvalidRoles">allowInvalidRoles</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#projen.javascript.biome.biome_config.IValidAriaRoleOptions.property.ignoreNonDom">ignoreNonDom</a></code> | <code>boolean</code> | *No description.* |

---

##### `allowInvalidRoles`<sup>Optional</sup> <a name="allowInvalidRoles" id="projen.javascript.biome.biome_config.IValidAriaRoleOptions.property.allowInvalidRoles"></a>

```typescript
public readonly allowInvalidRoles: string[];
```

- *Type:* string[]

---

##### `ignoreNonDom`<sup>Optional</sup> <a name="ignoreNonDom" id="projen.javascript.biome.biome_config.IValidAriaRoleOptions.property.ignoreNonDom"></a>

```typescript
public readonly ignoreNonDom: boolean;
```

- *Type:* boolean

---

### IVcsConfiguration <a name="IVcsConfiguration" id="projen.javascript.biome.biome_config.IVcsConfiguration"></a>

- *Implemented By:* projen.javascript.biome.biome_config.IVcsConfiguration

Set of properties to integrate Biome with a VCS software.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#projen.javascript.biome.biome_config.IVcsConfiguration.property.clientKind">clientKind</a></code> | <code>string</code> | The kind of client. |
| <code><a href="#projen.javascript.biome.biome_config.IVcsConfiguration.property.defaultBranch">defaultBranch</a></code> | <code>string</code> | The main branch of the project. |
| <code><a href="#projen.javascript.biome.biome_config.IVcsConfiguration.property.enabled">enabled</a></code> | <code>boolean</code> | Whether Biome should integrate itself with the VCS client. |
| <code><a href="#projen.javascript.biome.biome_config.IVcsConfiguration.property.root">root</a></code> | <code>string</code> | The folder where Biome should check for VCS files. |
| <code><a href="#projen.javascript.biome.biome_config.IVcsConfiguration.property.useIgnoreFile">useIgnoreFile</a></code> | <code>boolean</code> | Whether Biome should use the VCS ignore file. |

---

##### `clientKind`<sup>Optional</sup> <a name="clientKind" id="projen.javascript.biome.biome_config.IVcsConfiguration.property.clientKind"></a>

```typescript
public readonly clientKind: string;
```

- *Type:* string

The kind of client.

---

##### `defaultBranch`<sup>Optional</sup> <a name="defaultBranch" id="projen.javascript.biome.biome_config.IVcsConfiguration.property.defaultBranch"></a>

```typescript
public readonly defaultBranch: string;
```

- *Type:* string

The main branch of the project.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="projen.javascript.biome.biome_config.IVcsConfiguration.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether Biome should integrate itself with the VCS client.

---

##### `root`<sup>Optional</sup> <a name="root" id="projen.javascript.biome.biome_config.IVcsConfiguration.property.root"></a>

```typescript
public readonly root: string;
```

- *Type:* string

The folder where Biome should check for VCS files.

By default, Biome will use the same folder where `biome.json` was found.

If Biome can't find the configuration, it will attempt to use the current working directory. If no current working directory can't be found, Biome won't use the VCS integration, and a diagnostic will be emitted

---

##### `useIgnoreFile`<sup>Optional</sup> <a name="useIgnoreFile" id="projen.javascript.biome.biome_config.IVcsConfiguration.property.useIgnoreFile"></a>

```typescript
public readonly useIgnoreFile: boolean;
```

- *Type:* boolean

Whether Biome should use the VCS ignore file.

When [true], Biome will ignore the files specified in the ignore file.

---

