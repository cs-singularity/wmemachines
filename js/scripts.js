<script>
/*
 * WME HOMEPAGE STYLING
 * Runs on the live homepage and dev-testing page.
 */
(function () {

    const path = window.location.pathname;

    const isWmeHomepage =
        path === "/" ||
        path === "/index.htm" ||
        path === "/dev-testing.htm";

    if (!isWmeHomepage) return;


    /* ========================================
       HOMEPAGE-SPECIFIC STYLES
    ======================================== */

    const style = document.createElement("style");

    style.textContent = `

        /* ========================================
           REMOVE OLD MAIN BACKGROUND
        ======================================== */

        .homePageBg,
        .secondaryPageBg {
            background: #fff !important;
            background-image: none !important;
        }


        /* ========================================
           REMOVE OLD HEADER BACKGROUND
        ======================================== */

        .headerBg {
            background: #fff !important;
            background-image: none !important;
        }


        /* ========================================
           REMOVE OLD FOOTER BACKGROUND
        ======================================== */

        .footer-main {
            background-image: none !important;
        }


        /* ========================================
           FREE MAIN PAGE WIDTH
        ======================================== */

        .homePageBg > .container,
        .secondaryPageBg > .container {
            width: 100% !important;
            max-width: none !important;

            padding-left: 0 !important;
            padding-right: 0 !important;
        }


        /* ========================================
           FREE LIKESEW CONTENT MODULE WIDTH
        ======================================== */

        .vue-component-wrapper > .container,
        .vue-component-wrapper > .container-fluid,
        .container.vue-component-row {
            width: 100% !important;
            max-width: none !important;

            padding-left: 0 !important;
            padding-right: 0 !important;
        }


        /* ========================================
           HIDE LEGACY LIVE-SITE FOOTER
        ======================================== */

        .container.footer {
            display: none !important;
        }



        /* ========================================
           TOPBAR LINK COLORS
        ======================================== */

        html body .wme-topbar-links a,
        html body .wme-topbar-links a:visited {
            color: #2C4251 !important;
            font-size: 14px !important;
        }

        html body .wme-topbar-links a:hover,
        html body .wme-topbar-links a:focus {
            color: var(--wme-red) !important;
        }


        /* ========================================
           WME HEADING COLOR
        ======================================== */

        html body .wme-home h1,
        html body .wme-home h2,
        html body .wme-home h3,
        html body .wme-home h4,
        html body .wme-home h5,
        html body .wme-home h6,

        html body .wme-shop-paths h2,
        html body .wme-new-items h2,
        html body .wme-events-section h2,
        html body .wme-promotions h2,
        html body .wme-howto h2,
        html body .wme-howto h3,
        html body .wme-testimonials h2,
        html body .wme-footer h2,
        html body .wme-footer h3 {
            color: #2C4251 !important;
        }


        /* ========================================
           WHITE OVERLAY TEXT
        ======================================== */

        html body .wme-hero-content,
        html body .wme-hero-content h2,
        html body .wme-hero-content span,

        html body .wme-event-content,
        html body .wme-event-content h2,
        html body .wme-event-content span {
            color: #fff !important;
        }


        /* ========================================
           REMOVE LIKESEW MODULE PADDING
        ======================================== */

        .container.vue-component-row {
            width: 100% !important;
            max-width: none !important;

            padding: 0 !important;
        }


        /* ========================================
           CUSTOM BUTTON LINK COLORS
        ======================================== */

        html body a.wme-button,
        html body a.wme-button:visited,

        html body a.wme-secondary-button,
        html body a.wme-secondary-button:visited,

        html body a.wme-event-button,
        html body a.wme-event-button:visited,

        html body a.wme-event-video-button,
        html body a.wme-event-video-button:visited,

        html body a.wme-howto-shop-button,
        html body a.wme-howto-shop-button:visited {
            color: #fff !important;
            text-decoration: none !important;
        }

        html body a.wme-button:hover,
        html body a.wme-button:focus,

        html body a.wme-secondary-button:hover,
        html body a.wme-secondary-button:focus,

        html body a.wme-event-button:hover,
        html body a.wme-event-button:focus,

        html body a.wme-event-video-button:hover,
        html body a.wme-event-video-button:focus,

        html body a.wme-howto-shop-button:hover,
        html body a.wme-howto-shop-button:focus {
            color: #fff !important;
            text-decoration: none !important;
        }

    `;

    document.head.appendChild(style);

})();
</script>


<script>
/*
 * WME SITEWIDE SHELL
 *
 * Creates one shared topbar and footer across the website.
 *
 * The homepage receives a newsletter slot for the existing
 * homepage newsletter script.
 *
 * LikeSew's native navigation remains untouched.
 */
(function () {

    document.body.classList.add("wme-site-shell");

    const path = window.location.pathname;

    const isHomepage =
        path === "/" ||
        path === "/index.htm" ||
        path === "/dev-testing.htm";


    /* ========================================
       TOP UTILITY BAR
    ======================================== */

    function addTopbar() {

        if (document.querySelector(".wme-topbar")) {
            return true;
        }

        const nav = document.querySelector(".menubg");

        if (!nav) {
            return false;
        }

        const topbar = document.createElement("section");

        topbar.className = "wme-topbar";

        topbar.innerHTML = `
        <div class="wme-topbar-inner">

        <a
            class="wme-topbar-logo"
            href="/"
        >
            <img
                src="https://media.rainpos.com/13632/wme_logo.png"
                alt="Western Maine Machines"
            >
        </a>

        <form
            class="wme-topbar-search"
            action="/module/search_content.htm"
            method="get"
            name="frmSearch"
        >
            <input
                type="hidden"
                name="showSearchResults"
                value="1"
            >

            <input
                type="search"
                name="search_keyword"
                placeholder="Search"
                aria-label="Search Western Maine Machines"
            >

            <button
                type="submit"
                name="image"
                value="Search"
                aria-label="Search"
            >
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="6"
                    ></circle>

                    <line
                        x1="16"
                        y1="16"
                        x2="21"
                        y2="21"
                    ></line>
                </svg>
            </button>
        </form>

        <div class="wme-topbar-links">

            <a href="/contact-us.htm">
                Contact Us
            </a>

            <a
                href="/checkout/cart.php?1"
                class="wme-cart-link"
            >
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                >
                    <circle
                        cx="9"
                        cy="20"
                        r="1.5"
                    ></circle>

                    <circle
                        cx="18"
                        cy="20"
                        r="1.5"
                    ></circle>

                    <path
                        d="M3 4h2l2.2 10.5h10.6l2-7.5H6"
                    ></path>
                </svg>

                <span>Go to Cart</span>
            </a>

        </div>

        </div>
    `;

        nav.parentNode.insertBefore(
            topbar,
            nav
        );

        /* Move LikeSew's native cart out of the legacy footer */
        const nativeCart = document.querySelector("#cartDiv");

        if (nativeCart) {
            topbar.appendChild(nativeCart);
            nativeCart.classList.add("wme-cart-hidden");
        }
        document.addEventListener("click", function (event) {
        const addToCart = event.target.closest(
        ".btn-add-to-cart, #add-to-cart-button-wrapper button, #add-to-cart-button-wrapper a"
    );

    if (!addToCart) return;

    const nativeCart = document.querySelector("#cartDiv");

    if (nativeCart) {
        nativeCart.classList.remove("wme-cart-hidden");
    }
});

        return true;
    }


    /* ========================================
       FOOTER
    ======================================== */

    function addFooter() {

        if (document.querySelector(".wme-footer")) {
            return true;
        }

        const legacyFooter =
            document.querySelector(".container.footer");

        const footerMain =
            legacyFooter?.closest(".footer-main");

        const insertionPoint =
            footerMain ||
            legacyFooter;

        if (!insertionPoint) {
            return false;
        }

        const footer = document.createElement("section");

        footer.className = "wme-footer";


        /* HOMEPAGE-ONLY NEWSLETTER SLOT */

        const newsletterMarkup = isHomepage
            ? `
                <div class="wme-footer-newsletter">

                    <h2>Newsletter Sign-Up</h2>

                    <div
                        class="wme-footer-newsletter-native"
                    ></div>

                </div>

                <div class="wme-footer-divider"></div>
            `
            : "";


        /* SHARED FOOTER CONTENT */

        footer.innerHTML = `

            ${newsletterMarkup}

            <div class="wme-footer-columns">

                <div class="wme-footer-column">

                    <h3>Quick Info</h3>

                    <a href="/about-us.htm">
                        About Us
                    </a>

                    <a href="/contact-us.htm">
                        Contact Us
                    </a>

                    <a href="/quote.htm">
                        Quotes
                    </a>

                    <a href="/policies.htm">
                        Policies
                    </a>

                </div>


                <div class="wme-footer-column">

                    <h3>Turner Location</h3>

                    <p>
                        207-224-0188<br>
                        470 Auburn Rd<br>
                        Turner, ME 04282
                    </p>

                    <p>
                        Monday - Friday<br>
                        10AM - 5PM
                    </p>

                    <p>
                        Saturday<br>
                        10AM - 3PM
                    </p>

                    <p>
                        Closed Sunday
                    </p>

                </div>


                <div class="wme-footer-column">

                    <h3>Scarborough Location</h3>

                    <p>
                        207-303-0185<br>
                        426 US Route 1 #4<br>
                        Scarborough, ME 04074
                    </p>

                    <p>
                        Monday - Friday<br>
                        10AM - 5PM
                    </p>

                    <p>
                        Saturday<br>
                        10AM - 3PM
                    </p>

                    <p>
                        Closed Sunday
                    </p>

                </div>


                <div class="wme-footer-column">

                    <h3>Find Us on Socials</h3>

                    <a
                        href="https://www.facebook.com/wmemachines/"
                        target="_blank"
                        rel="noopener"
                    >
                        Facebook
                    </a>

                    <a
                        href="https://www.instagram.com/western_maine_machines"
                        target="_blank"
                        rel="noopener"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://www.youtube.com/channel/UCFGieNdmsLpOcqQDdEEHkgw"
                        target="_blank"
                        rel="noopener"
                    >
                        YouTube
                    </a>

                </div>

            </div>


            <div class="wme-footer-divider"></div>


            <div class="wme-footer-bottom">

                <span>
                    Copyright &copy; 2026 Western Maine Machines
                </span>

                <a href="/site-map.htm">
                    Sitemap
                </a>

                <span class="wme-footer-credit">
                    Website Design by
                    <a
                        href="https://www.singularitydesign.co/"
                        target="_blank"
                        rel="noopener"
                    >
                        Singularity Design
                    </a>
                </span>

            </div>

        `;

        insertionPoint.parentNode.insertBefore(
            footer,
            insertionPoint
        );

        return true;
    }


    /* ========================================
       LOAD SITEWIDE SHELL
    ======================================== */

    let attempts = 0;

    const shellTimer = setInterval(function () {

        attempts++;

        const topbarReady =
            addTopbar();

        const footerReady =
            addFooter();

        if (
            (topbarReady && footerReady) ||
            attempts >= 40
        ) {
            clearInterval(shellTimer);
        }

    }, 250);


})();
</script>


<script>
/*
 * WME LEGACY PRODUCT ADAPTER
 *
 * Makes older LikeSew product pages compatible
 * with our existing product-page redesign.
 */
(function () {

    if (document.querySelector("#product-app")) {
        return;
    }

    const pricing = document.querySelector(
        "#productPricing"
    );

    const legacyTable = pricing?.querySelector(
        "#product-details-pricing-table"
    );

    const productRow = pricing?.closest(
        ".row.paddingXLarge"
    );

    const title = productRow?.querySelector(
        ":scope > .col-xs-12.text-left > h1"
    );

    const gallery = productRow?.querySelector(
        'a[class*="productImage"][class*="PopupLink"]'
    );

    // Only adapt confirmed legacy product pages.
    if (
    !pricing ||
    !productRow ||
    !title ||
    !gallery
    ) {
    return;
    }

    // Give the legacy product container the same
    // selector used by our existing redesign.
    productRow.id = "product-app";
    productRow.classList.add("wme-legacy-product");

    // Normalize pricing only when the legacy table exists.
    // Products without this table retain their native markup.
    if (legacyTable) {

    const basicPricing = document.createElement("div");

    basicPricing.id = "basic-product-pricing";

    pricing.insertBefore(
        basicPricing,
        legacyTable
    );

    basicPricing.appendChild(legacyTable);

    const returnPolicy = Array.from(
        pricing.children
    ).find(element =>
        element.tagName === "DIV" &&
        element.querySelector('a[href*="return-policy"]')
    );

    if (returnPolicy) {
        basicPricing.appendChild(returnPolicy);
    }
}

    // Identify LikeSew's older image thumbnails
    // so our existing thumbnail CSS can style them.
    productRow.querySelectorAll(
        '[id^="pImgImg"]'
    ).forEach(thumb => {
        thumb.classList.add("product-images-thumb");
    });

    // The older template does not include the
    // description anchor used by our redesign.
    const descriptionColumn = Array.from(
        productRow.children
    ).find(element =>
        element.matches(".col-xs-12") &&
        !element.classList.contains("col-md-6") &&
        element.querySelector("p") &&
        element.querySelector("p").textContent.trim()
    );

    if (
        descriptionColumn &&
        !descriptionColumn.querySelector("#prod_description")
    ) {
        const anchor = document.createElement("p");

        anchor.id = "prod_description";

        descriptionColumn.insertBefore(
            anchor,
            descriptionColumn.firstChild
        );
    }

})();
</script>



<script>
/*
 * WME PRODUCT PAGE
 * Detects LikeSew product pages from the product DOM
 * and reorganizes the existing product content.
 */
(function () {

    const productApp = document.querySelector("#product-app");

    if (!productApp) return;

    document.body.classList.add("wme-product-page");


    /* ========================================
       PRODUCT COLUMNS
    ======================================== */

    const titleWrapper = productApp.querySelector(
        ":scope > .col-xs-12.text-left"
    );

    const title = titleWrapper?.querySelector("h1");

    const pricing = productApp.querySelector(
        "#productPricing, #basic-product-pricing"
    );

    const purchaseColumn = pricing?.closest(
        ".col-xs-12.col-md-6"
    );

    /* ========================================
   IN-STORE PURCHASE NOTICE
======================================== */

if (pricing && !pricing.querySelector(".wme-in-store-notice")) {

    const isLegacy = productApp.classList.contains(
        "wme-legacy-product"
    );

    const hasPricingTable = !!pricing.querySelector(
        "#product-details-pricing-table"
    );

    const cartWrapper = pricing.querySelector(
        "#add-to-cart-button-wrapper"
    );

    const hasPurchaseControl = !!pricing.querySelector(
        '.btn-add-to-cart, #add-to-cart-button-wrapper a, ' +
        '#add-to-cart-button-wrapper button, ' +
        '#add-to-cart-button-wrapper input[type="submit"]'
    );

    const hasPriceElement = !!pricing.querySelector(
        '[id^="spanPrice"], [itemprop="price"]'
    );

    const emptyCartWrapper = !!cartWrapper &&
        !cartWrapper.textContent.trim() &&
        !cartWrapper.querySelector("a, button, input");

    const showNotice = isLegacy
        ? !hasPricingTable && !hasPurchaseControl
        : !hasPricingTable &&
          !hasPriceElement &&
          !hasPurchaseControl &&
          emptyCartWrapper;

    if (showNotice) {

        const notice = document.createElement("div");

        notice.className = "wme-in-store-notice";

        notice.innerHTML = `
            <strong>Available for In-Store Purchase</strong>
            <p>
                This item is not available for online purchase,
                but can be purchased at one of our store locations.
            </p>
        `;

        pricing.prepend(notice);
    }
}

    /* ========================================
       MOVE TITLE INTO PURCHASE COLUMN
    ======================================== */

    if (title && purchaseColumn) {

        title.classList.add("wme-product-title");

        purchaseColumn.insertBefore(
            title,
            purchaseColumn.firstChild
        );

        if (titleWrapper && !titleWrapper.textContent.trim()) {
            titleWrapper.remove();
        }
    }


    /* ========================================
       IDENTIFY GALLERY COLUMN
    ======================================== */

    const galleryImage = productApp.querySelector(
        'a[class*="productImage"][class*="PopupLink"]'
    );

    const galleryColumn = galleryImage?.closest(
        ".col-xs-12.col-md-6"
    );

    if (galleryColumn) {
        galleryColumn.classList.add("wme-product-gallery");
    }

    if (purchaseColumn) {
        purchaseColumn.classList.add("wme-product-purchase");
    }

        /* ========================================
       PURCHASE TRUST
    ======================================== */

    const basicPricing = productApp.querySelector(
        "#basic-product-pricing"
    );

    if (basicPricing) {

        const returnPolicy = basicPricing.querySelector(
            ":scope > div:last-of-type"
        );

        if (
            returnPolicy &&
            !basicPricing.querySelector(".wme-purchase-trust")
        ) {

            const trust = document.createElement("div");

            trust.className = "wme-purchase-trust";

            trust.innerHTML = `
                <span>
                    <img
                        src="https://media.rainpos.com/13632/shop.png"
                                   alt=""
                       aria-hidden="true"
                   >
                   Local Dealer Support in Turner, ME and Scarborough, ME
               </span>

               <span>
                    <img
                        src="https://media.rainpos.com/13632/shield_check.png"
                        alt=""
                       aria-hidden="true"
                   >
                   Secure Checkout
               </span>

               <span>
                   <img
                       src="https://media.rainpos.com/13632/truck.png"
                       alt=""
                       aria-hidden="true"
                   >
                    Shipping &amp; Pickup
                </span>
            `;

            basicPricing.insertBefore(
                trust,
                returnPolicy
            );
        }
    }

})();
</script>