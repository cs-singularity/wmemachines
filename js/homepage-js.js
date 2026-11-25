<script>
(function () {

    const path = window.location.pathname;

    const isWmeHomepage =
        path === "/" ||
        path === "/index.htm";

    if (!isWmeHomepage) return;


    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.wmemachines.com/#organization",
                "name": "Western Maine Machines",
                "url": "https://www.wmemachines.com/",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://media.rainpos.com/13632/wme_logo.png"
                }
            },
            {
                "@type": "Store",
                "@id": "https://www.wmemachines.com/#turner",
                "name": "Western Maine Machines - Turner",
                "url": "https://www.wmemachines.com/",
                "mainEntityOfPage": "https://www.wmemachines.com/",
                "image": "https://media.rainpos.com/13632/wme_logo.png",
                "telephone": "+1-207-224-0188",
                "parentOrganization": {
                    "@id": "https://www.wmemachines.com/#organization"
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "470 Auburn Rd",
                    "addressLocality": "Turner",
                    "addressRegion": "ME",
                    "postalCode": "04282",
                    "addressCountry": "US"
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday"
                        ],
                        "opens": "10:00",
                        "closes": "17:00"
                    },
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": "Saturday",
                        "opens": "10:00",
                        "closes": "15:00"
                    }
                ]
            },
            {
                "@type": "Store",
                "@id": "https://www.wmemachines.com/#scarborough",
                "name": "Western Maine Machines - Scarborough",
                "url": "https://www.wmemachines.com/",
                "mainEntityOfPage": "https://www.wmemachines.com/",
                "image": "https://media.rainpos.com/13632/wme_logo.png",
                "telephone": "+1-207-303-0185",
                "parentOrganization": {
                    "@id": "https://www.wmemachines.com/#organization"
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "426 US Route 1 #4",
                    "addressLocality": "Scarborough",
                    "addressRegion": "ME",
                    "postalCode": "04074",
                    "addressCountry": "US"
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday"
                        ],
                        "opens": "10:00",
                        "closes": "17:00"
                    },
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": "Saturday",
                        "opens": "10:00",
                        "closes": "15:00"
                    }
                ]
            }
        ]
    };


    const script = document.createElement("script");

    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);

    document.head.appendChild(script);

})();
</script>

<script>
(function () {

    function moveFeaturedProducts() {
        const target = document.querySelector(".wme-new-items-products");
        const firstProduct = document.querySelector(".featuredProductContainer");

        if (!target || !firstProduct) {
            return false;
        }

        const productRow = firstProduct.closest(".row");

        if (!productRow) {
            return false;
        }

        if (target.contains(productRow)) {
            return true;
        }

        target.appendChild(productRow);

        return true;
    }

    let attempts = 0;

    const timer = setInterval(function () {

        attempts++;

        if (moveFeaturedProducts() || attempts >= 30) {
            clearInterval(timer);
        }

    }, 250);

})();
</script>

<script>
document.addEventListener("click", function (event) {

    const trigger = event.target.closest(".wme-video-launch");

    if (!trigger) return;

    event.preventDefault();

    const videoId = trigger.getAttribute("data-video-id");

    if (!videoId) return;

    const container =
        trigger.closest(".wme-howto-video") ||
        trigger.closest(".wme-howto-featured");

    if (!container) return;

    const iframe = document.createElement("iframe");

    iframe.src =
        "https://www.youtube.com/embed/" +
        videoId +
        "?autoplay=1&rel=0";

    iframe.title = "YouTube video player";

    iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );

    iframe.setAttribute("allowfullscreen", "");

    container.innerHTML = "";
    container.appendChild(iframe);

});
</script>

<script>
(function () {

    function addViewProductButtons() {

        const products =
            document.querySelectorAll(".featuredProductContainer");

        if (!products.length) {
            return false;
        }

        products.forEach((product) => {

            if (product.querySelector(".wme-product-button")) {
                return;
            }

            const button = document.createElement("span");

            button.className = "wme-product-button";
            button.textContent = "View Product";

            product.appendChild(button);

        });

        return true;
    }


    /* Try immediately */

    addViewProductButtons();


    /* Keep checking while LikeSew loads the modules */

    let attempts = 0;

    const timer = setInterval(function () {

        attempts++;

        addViewProductButtons();

        if (attempts >= 40) {
            clearInterval(timer);
        }

    }, 250);

})();
</script>

<!-- MOVE THE NEWSLETTER BLOCK -->

<script>
(function () {

    function moveNewsletterSignup() {

        const target =
            document.querySelector(
                ".wme-footer-newsletter-native"
            );

        const form =
            document.querySelector(
                'form[action="/subscribe.php"]'
            );

        if (!target || !form) {
            return false;
        }

        const moduleRow =
            form.closest(".row.paddingXLarge");

        if (!moduleRow) {
            return false;
        }

        if (target.contains(moduleRow)) {
            return true;
        }

        target.appendChild(moduleRow);

        return true;
    }


    let attempts = 0;

    const timer = setInterval(function () {

        attempts++;

        if (
            moveNewsletterSignup() ||
            attempts >= 40
        ) {
            clearInterval(timer);
        }

    }, 250);

})();
</script>