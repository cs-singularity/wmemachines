# LikeSew Notes

This file tracks LikeSew-specific behavior, quirks, workarounds, and implementation decisions for the Western Maine Machines homepage redesign.

The goal is to avoid rediscovering platform behavior and to preserve working solutions as the codebase evolves.

## General Principles

- Prefer styling the outer custom layout without overriding LikeSew’s internal layout unless necessary.
- Avoid changing working LikeSew structures just to make them cleaner.
- Use custom classes for all custom homepage sections.
- Keep CSS organized by numbered sections.
- When a LikeSew-generated component behaves unexpectedly, inspect the rendered DOM before writing new selectors.
- Do not assume the editor DOM and published DOM are identical.
- Use `!important` only where needed to override LikeSew or legacy site CSS.

## Global CSS / JS

LikeSew supports:

- Global CSS
- Global JS

Important:

- Global CSS is entered as raw CSS.
- Global JS must be wrapped in `<script>` tags.

Example:

```html
<script>
(function () {
    // custom JS
})();
</script>
```

## Dev Testing Page

Current testing page:

```text
/dev-testing.htm
```

Testing-only CSS/JS should be scoped with:

```js
if (window.location.pathname !== "/dev-testing.htm") return;
```

This allows the redesign to be tested without affecting the live homepage.

## Public Sans

The redesign uses Public Sans.

Google Fonts can be loaded dynamically in testing JS:

```js
const fontLink = document.createElement("link");

fontLink.rel = "stylesheet";
fontLink.href =
    "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap";

document.head.appendChild(fontLink);
```

Legacy site heading CSS used Cinzel with `!important`, so custom heading rules must also use sufficient specificity and `!important`.

Primary heading color:

```text
#2C4251
```

## Legacy Site CSS

The existing site contains legacy rules that can interfere with the redesign.

Known examples include:

```css
h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 700 !important;
    line-height: 1.2 !important;
    font-family: "Cinzel", serif !important;
}
```

and:

```css
a:not(.ignore-site-layout-styles a),
a:visited:not(.ignore-site-layout-styles a) {
    color: #c43a3a !important;
    font-weight: bold !important;
}
```

This second rule can cause custom button text to become red.

Custom button selectors may need higher specificity.

## LikeSew Content Modules

Custom homepage HTML is inserted using Content modules.

Use the source HTML editor (`<>`) when entering custom HTML.

LikeSew preserves custom classes inside Content modules.

## LikeSew Module Containers

LikeSew wraps Content modules in containers such as:

```text
.vue-component-wrapper
.container
.container.vue-component-row
```

These can introduce:

- width restrictions
- padding
- margins

Known fix:

```css
.container.vue-component-row {
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
}
```

## Navigation

The LikeSew navigation is generated automatically.

Important DOM structure:

```html
<div class="menubg">
    <div class="container">
        <nav id="mainNav" class="navbar navbar-default">
            <div class="container-fluid">
                <div id="navbar-collapse-1" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        ...
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</div>
```

A legacy rule was forcing the nav left:

```css
.menubg nav {
    float: left !important;
}
```

Fix:

```css
@media (min-width: 768px) {
    .menubg nav,
    #mainNav {
        float: none !important;
    }
}
```

This was critical for centering the navigation.

## Native Search

The native LikeSew search form uses:

```text
action="/module/search_content.htm"
method="get"
```

Required hidden input:

```html
<input type="hidden" name="showSearchResults" value="1">
```

Search input:

```html
<input type="search" name="search_keyword">
```

Submit button:

```html
<button type="submit" name="image" value="Search">
```

This structure should be preserved if using a custom search form.

## Topbar Search Form

LikeSew global form styles caused the search button to wrap below the input.

Working fix required:

```css
display: flex !important;
flex-wrap: nowrap !important;
```

Input:

```css
flex: 1 1 auto !important;
width: auto !important;
min-width: 0 !important;
```

Button:

```css
flex: 0 0 auto !important;
```

This same general pattern may be useful for other forms.

## Featured Products Module

LikeSew’s Featured Products module should retain control of its own internal product layout.

Do NOT override the module with custom grid or flex layout.

In particular, avoid changing:

```text
.featuredProductContainer
.row
[class*="col-"]
```

unless absolutely necessary.

Previous attempts to force custom grid behavior caused products to become too small or break layout.

General rule:

> Custom CSS controls the outer composition. LikeSew controls the internal Featured Products grid.

## Featured Products DOM

LikeSew product images are not always rendered as `<img>` elements.

Observed structure:

```html
<div class="featuredProductImgContainer">
    <div style="background-image: ..."></div>
</div>
```

The inner div uses inline styles including:

```text
background-image
background-size: contain
background-position
background-repeat
height
```

To make images fill their cards:

```css
.featuredProductImgContainer > div {
    width: 100% !important;
    height: 100% !important;

    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
}
```

## Featured Products Heading

The LikeSew-generated module heading uses:

```text
.component-header
```

For New Items:

```css
.wme-new-items-products .component-header {
    display: none !important;
}
```

This is currently Section 10E.

## Featured Products Hover Behavior

LikeSew includes hover rules such as:

```css
.featuredProductContainer:hover .featuredProductTitle {
    background-color: #666;
    color: #fff !important;
}

.featuredProductContainer:hover a {
    color: #fff !important;
}
```

These can force product text white on hover.

Custom overrides may be required for:

```text
.wme-new-items-products
.wme-promotions-products
```

## Featured Products Relocation

The New Items section uses a custom placeholder:

```html
<div class="wme-new-items-products"></div>
```

A LikeSew Featured Products module is placed separately on the page and relocated into that placeholder using JS.

Reliable approach:

1. Find `.featuredProductContainer`
2. Find its closest `.row`
3. Append that `.row` into the custom placeholder

Working pattern:

```js
function moveFeaturedProducts() {

    const target =
        document.querySelector(".wme-new-items-products");

    const firstProduct =
        document.querySelector(".featuredProductContainer");

    if (!target || !firstProduct) {
        return false;
    }

    const productRow =
        firstProduct.closest(".row");

    if (!productRow) {
        return false;
    }

    if (target.contains(productRow)) {
        return true;
    }

    target.appendChild(productRow);

    return true;
}
```

A retry interval is used because LikeSew may render the module after the page initially loads.

## Promotions Relocation

Current Promotions uses a second Featured Products module.

The relocation logic must avoid moving the same row already used by New Items.

It should find a Featured Products container that is not already inside:

```text
.wme-new-items-products
.wme-promotions-products
```

Then move the remaining product row into:

```html
<div class="wme-promotions-products"></div>
```

Do not change the working New Items relocation script when modifying Promotions.

## New Items Layout

Custom section:

```text
.wme-new-items
.wme-new-items-copy
.wme-new-items-products
```

Desktop uses a two-column composition.

Important:

Do not change the LikeSew product row into custom grid/flex.

Stable product-row rule:

```css
.wme-new-items-products > .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
}
```

## Promotions Layout

Custom section:

```text
.wme-promotions
.wme-promotions-products
.wme-promotions-copy
```

Same Featured Products warning applies:

Do not override LikeSew’s internal row/column layout.

## Shop by Interest / Shop by Brand

Shared card classes:

```text
.wme-shop-card
.wme-shop-circle
```

Interest-specific:

```text
.wme-interest-card
```

Brand-specific:

```text
.wme-brand-card
.wme-brand-logo
```

Shared hover behavior should target:

```css
.wme-shop-card:hover .wme-shop-circle
```

This avoids maintaining two separate hover systems.

Current label size:

```text
18px desktop
```

Primary text color:

```text
#2C4251
```

## Events

Main wrapper:

```text
.wme-events
```

Current desired gap between event cards:

```text
5px
```

## How-To Videos

YouTube videos use custom thumbnail buttons that replace themselves with an iframe when clicked.

Button class:

```text
.wme-video-launch
```

Video ID stored in:

```html
data-video-id="..."
```

Containers:

```text
.wme-howto-video
.wme-howto-featured
```

Do not rely on LikeSew lightbox behavior for these videos.

## Testimonials

Testimonials are custom cards.

Main classes:

```text
.wme-testimonials
.wme-testimonials-grid
.wme-testimonial-card
```

Blockquotes use a custom left border instead of browser/default quote styling.

## Footer

Main footer:

```text
.wme-footer
```

Newsletter section:

```text
.wme-footer-newsletter
```

Newsletter form:

```text
.wme-footer-signup
```

Newsletter form HTML currently includes:

```html
<form class="wme-footer-signup" action="#" method="post">
    <input type="text" placeholder="Name" aria-label="Name">

    <input
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
    >

    <button type="submit">
        Subscribe
    </button>
</form>
```

Current form control height:

```text
50px
```

The newsletter form is visual only at the moment.

It is not yet connected to a confirmed LikeSew newsletter or marketing-subscription endpoint.

## Legacy Footer

The existing LikeSew footer includes:

```text
.container.footer
```

This is hidden on the redesign testing page:

```css
.container.footer {
    display: none !important;
}
```

## Responsiveness

Current main breakpoints:

```css
@media (max-width: 1000px) {
    /* tablet / small laptop */
}

@media (max-width: 600px) {
    /* mobile */
}
```

Responsive work is still in progress.

Do not assume previously proposed responsive rules are final until tested against the current stylesheet.

## Current Design Tokens

Primary dark blue:

```text
#2C4251
```

Primary red:

```text
#b60019
```

Primary font:

```text
Public Sans
```

## Important Working Rule

Do not break working LikeSew behavior unnecessarily.

Before replacing internal LikeSew layout:

1. Inspect the rendered DOM.
2. Identify the actual conflicting rule.
3. Override only what is necessary.
4. Preserve the platform’s working product/category layout wherever possible.
---

# 2026-09 Sitewide / Product-Page Findings

## Master-Code Workflow

The working codebase is maintained in `WME Machines/Website/Codebase`.

Primary files:

- `homepage.html` — custom homepage content.
- `styles.css` — global WME CSS.
- `scripts.txt` — global JavaScript, including sitewide shell and product-page adapters.
- `homepage-js.txt` — homepage-specific JavaScript where applicable.
- `likesew-notes.md` — this LikeSew behavior/reference file.

Important workflow rule: re-read the current master files before changing selectors, DOM adapters, or existing CSS/JS. The live LikeSew code may be newer than an older retrieved/cached copy.

## Sitewide Shell

The current WME shell is injected with JavaScript rather than replacing LikeSew's native navigation.

The shell adds:

- `.wme-topbar`
- `.wme-footer`
- homepage-only newsletter target

LikeSew's native `#mainNav` remains intact. Do not clone or replace it; preserving the native nav keeps LikeSew dropdown/mobile behavior working.

The shell waits for LikeSew DOM elements with a retry interval because LikeSew content is not guaranteed to be ready when global JS first executes.

Current homepage path detection includes:

```text
/
/index.htm
/dev-testing.htm
```

## Topbar Link Specificity

The legacy site has a strong global link rule:

```css
a:not(.ignore-site-layout-styles a),
a:visited:not(.ignore-site-layout-styles a) {
    color: #c43a3a !important;
    font-weight: bold !important;
}
```

A normal `.wme-topbar-links a` rule may lose even when it also uses `!important`, because specificity then decides the winner.

A working scoped override is:

```css
html body .wme-topbar .wme-topbar-links a:not(.ignore-site-layout-styles a),
html body .wme-topbar .wme-topbar-links a:visited:not(.ignore-site-layout-styles a) {
    color: var(--wme-dark) !important;
}

html body .wme-topbar .wme-topbar-links a:hover:not(.ignore-site-layout-styles a),
html body .wme-topbar .wme-topbar-links a:visited:hover:not(.ignore-site-layout-styles a) {
    color: var(--wme-red) !important;
}
```

Important: if the normal-state selector is strengthened, the hover selector must be at least equally strong or the dark normal state will continue to win during hover.

## LikeSew Storefront Search

The WME topbar preserves LikeSew's native storefront search endpoint:

```text
/module/search_content.htm
```

with:

```text
showSearchResults=1
search_keyword=<query>
```

No confirmed/documented support has been found for advanced storefront query operators such as:

```text
"exact phrase"
AND / OR / NOT
+required
-excluded
*
```

Do not design the storefront around those operators unless LikeSew behavior is separately verified.

# Product Pages

## Two LikeSew Product Templates Exist

WME has encountered at least two materially different LikeSew product-page templates. Product-page customization must account for both.

### Newer Product Template

The newer template contains:

```text
#product-app
#basic-product-pricing
```

The current WME product-page script detects `#product-app`, identifies the gallery and purchase columns, moves the title into the purchase column, and adds WME classes without replacing LikeSew's purchasing controls.

Important classes added/used by the redesign include:

```text
.wme-product-page
.wme-product-gallery
.wme-product-purchase
.wme-product-title
.wme-purchase-trust
```

The native LikeSew cart/pricing component remains responsible for quantity, pricing, Add to Cart, inventory/options, and cart state.

### Older / Legacy Product Template

The older template does not originally have `#product-app` and uses structures such as:

```text
.row.paddingXLarge
#productPricing
#product-details-pricing-table
.btn-add-to-cart
```

Typical gallery markup includes a popup image anchor whose class contains both `productImage` and `PopupLink`.

Typical old thumbnails use IDs such as:

```text
#pImgImg1
#pImgImg2
...
```

and have extensive inline float/size styles.

The WME Legacy Product Adapter normalizes this older DOM so the existing product redesign can operate on it rather than maintaining a second complete design system.

Current adapter strategy:

- Confirm the old template from `#productPricing`, `#product-details-pricing-table`, `.row.paddingXLarge`, title, and gallery image.
- Assign the legacy product row `id="product-app"`.
- Add `.wme-legacy-product`.
- Create a `#basic-product-pricing` wrapper around the existing legacy pricing table.
- Move the existing Return Policy container into the normalized pricing area.
- Add `.product-images-thumb` to old `#pImgImg...` thumbnails.
- Add an empty `#prod_description` anchor when needed so the universal description styling can target the old page.
- Leave the native LikeSew Add to Cart control and pricing table intact.

General rule: adapt the minimum DOM necessary and reuse the universal product CSS. Do not create a giant separate legacy stylesheet unless a genuine template-specific difference requires it.

## Product Title / Pricing / Purchase Column

Current redesign behavior that has tested successfully includes:

- Product title moved into the right/purchase column.
- Title uses WME dark blue.
- Sale label uses WME red.
- Original price is gray and struck through.
- Final price is prominent and dark blue.
- Original and final prices are stacked closely.
- Native quantity selector remains functional.
- Native Add to Cart remains functional and is visually restyled rather than replaced.
- Native Return Policy is retained.
- WME purchase-trust information is inserted without replacing LikeSew purchasing logic.

## Purchase Trust Row

The WME product script adds a trust row to normalized pricing when appropriate. Current messaging includes:

```text
Local Dealer Support in Turner, ME and Scarborough, ME
Secure Checkout
Shipping & Pickup
```

with WME-hosted icons.

This is presentation-only; it should not interfere with LikeSew's pricing or cart code.

## Product Description / Product Details

LikeSew can render the product-description rich text after an empty anchor:

```html
<p id="prod_description"></p>
```

The actual description may be sibling rich-text content rather than text inside that paragraph.

Do not build a parser that assumes all description content is inside `#prod_description`.

Rich-text headings (`h2`, `h3`, `h4`) can be styled directly. Rich-text images can receive a WME light-gray image stage through CSS.

Brief Description is a separate native backend field and should be treated as optional. Frontend layout should not depend on staff consistently filling it out.

## Suggested Products

The native LikeSew Suggested Products module is retained and styled rather than rebuilt.

Approved responsive layout:

```text
6 columns desktop
4 columns <= 1100px
3 columns <= 800px
2 columns <= 600px
```

Do not change the approved tablet/mobile behavior unless a specific issue is reported.

## Product Thumbnails

Both newer and legacy product templates ultimately use `.product-images-thumb` elements with old float-based inline sizing.

Observed thumbnail children commonly have:

```text
float: left
margin: 1px
width: 36px
height: 36px
```

Legacy pages may additionally put an inline fixed width such as `width: 400px` on the thumbnail-row wrapper. Newer pages may omit that width but still wrap unexpectedly because of the old float layout combined with WME thumbnail enlargement.

Preferred strategy is a shared `.wme-product-gallery` thumbnail-row normalization rather than separate old/new systems. A useful pattern is:

```css
.wme-product-gallery > div:has(> .product-images-thumb) {
    display: flex !important;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100% !important;
    height: auto !important;
    margin: 12px 0 0 !important;
}

.wme-product-gallery .product-images-thumb {
    float: none !important;
    flex: 0 0 64px;
    width: 64px !important;
    height: 64px !important;
    margin: 0 !important;
}
```

Before changing this further, inspect the current rendered nesting because the row selector assumes the thumbnail wrapper is a direct child of `.wme-product-gallery`.

## Pricing Empty-Cell Caveat

Be careful with broad rules such as:

```css
#basic-product-pricing > table > tbody > tr > td:empty
```

The legacy/native pricing DOM can contain an empty Add to Cart wrapper such as:

```text
#add-to-cart-button-wrapper
```

Collapsing every empty `td` can unintentionally collapse useful spacing or a native control target. If necessary, exclude the Add to Cart wrapper explicitly.

# Native Cart / Add-to-Cart Confirmation

## Important Discovery

LikeSew already provides its own cart/add-to-cart confirmation UI. WME should preserve it rather than implementing a second confirmation system.

The native cart JavaScript maintains cart state and uses functions including:

```text
CreateCartArray(...)
ShowCart(...)
LoadCart(...)
```

Do not replace native Add to Cart behavior merely to show a WME confirmation.

## `#cartDiv` Exists Before Add to Cart

`#cartDiv` is present on initial page load. It is not created only when Add to Cart is clicked.

Before a cart action, LikeSew may leave it empty/minimally populated. After a successful cart change, LikeSew populates/updates its contents.

Observed native contents include:

```text
#cartform
.btnViewCart
Proceed to Checkout
cart items / subtotal
```

## Native Location of `#cartDiv`

LikeSew places the native cart under the legacy footer hierarchy:

```text
.bgFooter
└── .container.footer
    └── #cartDiv
        └── #cartform
```

This became important because the WME redesign hides the legacy `.container.footer`.

Although `#cartDiv` itself reported values such as:

```text
display: block
visibility: visible
opacity: 1
position: fixed
```

its hidden footer ancestor prevented the native cart confirmation from being visible/useful.

Therefore:

> Hiding `.container.footer` also hides LikeSew's native cart UI unless `#cartDiv` is rescued from that hidden ancestor.

## Moving `#cartDiv` Is Safe

Manual DevTools testing confirmed that moving the existing `#cartDiv` into `.wme-topbar` makes the native LikeSew cart visible again.

Use the existing element; do not clone or recreate it. `appendChild()` moves the same DOM node and preserves LikeSew's references/behavior.

The move must occur inside `addTopbar()` while the local `topbar` variable is in scope. A cart-moving block placed after `addTopbar()` cannot refer to that local `const topbar`.

Working structural pattern:

```js
nav.parentNode.insertBefore(
    topbar,
    nav
);

const nativeCart = document.querySelector("#cartDiv");

if (nativeCart) {
    topbar.appendChild(nativeCart);
}

return true;
```

## Cart Positioning

Once moved into `.wme-topbar`, LikeSew's native cart becomes visible but retains legacy positioning/appearance.

It can appear beneath the topbar and overlap the main navigation links because its positioned layout does not contribute to the topbar's normal document-flow height.

This overlap remains a future polish item. Do not solve it by replacing LikeSew's cart logic.

Potential future direction: treat the native cart as a dropdown associated with the WME View Cart link, while preserving the original `#cartDiv` and its native contents.

## Temporary Cart Visibility Workaround

Current temporary goal: do not show the native black cart UI continuously; reveal it only after the customer initiates Add to Cart.

A temporary WME class can force the moved cart hidden initially:

```css
#cartDiv.wme-cart-hidden {
    display: none !important;
}
```

and WME JS can remove that class when a native Add to Cart control is clicked.

This is intentionally a temporary click-based presentation workaround. It is not a true success callback: a click could theoretically reveal the cart even if the subsequent add fails. Long-term behavior should remain tied to LikeSew's actual native cart state if practical.

A previous attempt to hide the cart using `nativeCart.style.display = "none"` plus a MutationObserver was not reliable because LikeSew controls the native cart's display/state itself. A WME class with `!important` is more appropriate when temporary forced hiding is required.

# Newsletter / Footer Architecture

The homepage newsletter is a native LikeSew module and should remain homepage-only.

The sitewide WME footer creates a newsletter target only on homepage paths. Secondary pages omit that target.

Do not create a duplicate custom subscription backend when the native LikeSew module can be relocated/styled.

The legacy `.container.footer` may still contain platform functionality (as proven by `#cartDiv`), so hiding it can have side effects. Before hiding/removing any LikeSew container globally, inspect its descendants for functional elements that need to be preserved elsewhere.

# Current Implementation Philosophy

For LikeSew customization, follow this order:

1. Preserve native behavior whenever possible.
2. Inspect the actual rendered DOM on the affected template.
3. Identify whether the issue comes from LikeSew inline styles, legacy global CSS, WME CSS, or hidden ancestry.
4. Prefer moving/styling an existing native element over rebuilding its functionality.
5. Normalize shared old/new structures with small adapters rather than maintaining duplicate page systems.
6. Use `!important` only when needed against inline/legacy/LikeSew rules.
7. Test both known product templates after product-page changes.
8. Do not assume an element is dynamically created merely because its children appear after an action; verify whether the container already exists on page load.
9. Keep LikeSew's native navigation, Add to Cart, cart state, pricing, inventory/options, Return Policy, Suggested Products, and other functional modules intact unless there is a demonstrated reason to replace them.
