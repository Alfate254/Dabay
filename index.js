// Dabay Sports Shop: all the page's behaviour (catalog, navigation, cart, search)
// Wait until the whole page has loaded before running any code
document.addEventListener("DOMContentLoaded", () => {

    // ---- SHOP SETTINGS ----
    // Your WhatsApp number in international format, no + or spaces (Kenya example: 2547XXXXXXXX)
    // Customer orders are sent to this number. REMEMBER to replace the X's with your real number.
    const WHATSAPP_NUMBER = "2547XXXXXXXX";

    // ---- SPORTS: [id, name, home-page tile text, page subtitle] ----
    // To add a new sport, add a line here AND a matching entry in RAW below.
    const SPORTS = [
        ["football", "Football", "Boots, balls, jerseys and accessories.", "Find equipment and accessories for football players and fans."],
        ["basketball", "Basketball", "Shoes, balls, jerseys and equipment.", "Explore our basketball equipment and accessories."],
        ["swimming", "Swimming", "Goggles, costumes, caps and training gear.", "Find swimming equipment for beginners and experienced swimmers."],
        ["volleyball", "Volleyball", "Volleyballs, shoes, knee pads and nets.", "Explore our volleyball products and playing accessories."],
        ["gym", "Gym", "Dumbbells, weights and fitness equipment.", "Find equipment for home workouts and professional gyms."],
        ["rugby", "Rugby", "Boots, balls, jerseys and protection.", "Gear up for the scrum, the sevens and everything between."],
        ["tennis", "Tennis", "Rackets, balls, shoes and accessories.", "Rackets, balls and court gear for every level."],
        ["athletics", "Athletics", "Running shoes, spikes and running wear.", "Everything for road, track and cross-country runners."]
    ];

    // ---- CATALOG ----
    // Each product type: [type name, product noun, description, "Brand line:price|Brand line:price|..."]
    // Product name = "<brand line> <noun>" (leave noun empty to use the brand line as the full name).
    // Photos: images/<product-name>.jpg, then images/<type-name>.jpg, then a placeholder.
    // Prices are in Kenya Shillings (KSh). To change a price, edit the number after the colon.
    const RAW = {
        football: [
            ["Football Boots", "Boots", "Boots for matches, firm ground and training.", "Nike Mercurial:9500|Nike Phantom:9000|Nike Tiempo:7500|Adidas Predator:8500|Adidas F50:8500|Puma Future:7000|Everyday Training:4500"],
            ["Footballs", "Football", "Durable footballs for training and matches.", "Adidas Match:4500|Nike Pitch:3800|Puma Orbita:3500|Mikasa Training:2800|Everyday Training:2000"],
            ["Football Jerseys", "Jersey", "Replica jerseys for players and supporters.", "Arsenal:2500|Manchester United:2500|Liverpool:2500|Real Madrid:2500|Barcelona:2500|Harambee Stars:2000|Gor Mahia:2000"],
            ["Goalkeeper Gloves", "Goalkeeper Gloves", "Gloves designed for grip and hand protection.", "Adidas Predator:3500|Nike Vapor Grip:3800|Puma Future:3000|Uhlsport:4500|Everyday:1500"],
            ["Football Accessories", "", "Essential kit for training and match day.", "Shin Guards:800|Football Socks:500|Football Shorts:1000|Training Cones:700|Football Pump:600|Captain Armband:300|Football Bag:1800"]
        ],
        basketball: [
            ["Basketball Shoes", "Basketball Shoes", "Court shoes for grip, comfort and movement.", "Nike LeBron:13500|Air Jordan:12500|Nike KD:10500|Adidas Harden:10000|Under Armour Curry:11500|Everyday Court:5500"],
            ["Basketballs", "Basketball", "Quality basketballs for training and matches.", "Spalding:3800|Wilson Evolution:4800|Molten:4200|Nike Elite:4500|Everyday Training:2500"],
            ["Basketball Jerseys", "Jersey", "Lightweight jerseys for players and fans.", "Los Angeles Lakers:2500|Golden State Warriors:2500|Chicago Bulls:2500|Boston Celtics:2500|Everyday Training:1800"],
            ["Basketball Equipment", "", "Hoops and accessories for practice and games.", "Basketball Hoop:8000|Basketball Shorts:1200|Basketball Socks:600|Basketball Pump:600|Wristbands:400|Mouthguard:700|Ball Bag:1500"]
        ],
        swimming: [
            ["Swimming Goggles", "Goggles", "Goggles designed to protect the eyes while swimming.", "Speedo:1800|Arena:1700|TYR:2000|Aqua Sphere:1900|Everyday:1000"],
            ["Swimming Costumes", "Swimming Costume", "Comfortable swimwear for swimming and training.", "Speedo:3500|Arena:3000|Everyday:2000"],
            ["Swim Trunks", "Swim Trunks", "Quick-drying trunks for pool and training sessions.", "Speedo:2500|Arena:2200|Everyday:1500"],
            ["Swimming Caps", "Swimming Cap", "A cap that keeps hair contained while swimming.", "Speedo:900|Arena:800|Everyday Silicone:600"],
            ["Training Gear", "", "Training aids and accessories for the pool.", "Swimming Fins:2500|Kickboard:1200|Pull Buoy:1300|Quick-Dry Towel:1200|Ear Plugs and Nose Clip:400|Waterproof Bag:1000"]
        ],
        volleyball: [
            ["Volleyballs", "Volleyball", "Volleyballs for training and competitive games.", "Mikasa:4500|Molten:4200|Wilson:3800|Everyday Training:2000"],
            ["Volleyball Shoes", "Volleyball Shoes", "Shoes for movement and court performance.", "Mizuno Wave:9000|Asics Gel:8500|Nike Hyperspike:7500|Everyday Court:4500"],
            ["Knee Pads", "Knee Pads", "Protective knee pads for players during matches.", "Mizuno:1800|Asics:1700|Everyday:1000"],
            ["Volleyball Jerseys", "Jersey", "Sports jerseys designed for volleyball players.", "Mizuno:2500|Asics:2500|Everyday Team:1500"],
            ["Volleyball Equipment", "", "Nets and accessories for training and matches.", "Volleyball Net:3500|Volleyball Shorts:1200|Ankle Brace:900|Volleyball Socks:500|Volleyball Pump:600"]
        ],
        gym: [
            ["Dumbbells", "Dumbbells", "Weights for strength training and muscle exercises.", "Rubber Hex:3500|Adjustable:8000|Vinyl Coated:2500|Cast Iron:3000"],
            ["Barbells and Plates", "", "Equipment for weightlifting and strength training.", "Olympic Barbell:8000|Standard Barbell:6000|EZ Curl Bar:3500|Weight Plates:4500"],
            ["Cardio Machines", "", "Machines and tools for cardio workouts.", "Treadmill:65000|Exercise Bike:28000|Rowing Machine:42000|Skipping Rope:500"],
            ["Gym Accessories", "", "Everyday gear for home workouts and gyms.", "Exercise Mat:1500|Resistance Bands:800|Kettlebell:3000|Weight Bench:12000|Pull-Up Bar:3500|Gym Gloves:900|Foam Roller:1800"]
        ],
        rugby: [
            ["Rugby Boots", "Rugby Boots", "Boots with grip for the scrum, tackles and sprints.", "Adidas Malice:8500|Canterbury Stampede:8000|Gilbert Barbarian:7500|Everyday Training:4000"],
            ["Rugby Balls", "Rugby Ball", "Balls for matches, sevens and training.", "Gilbert Match:4500|Canterbury Match:3800|Everyday Training:2200"],
            ["Rugby Jerseys", "Jersey", "Durable jerseys for players and supporters.", "Kenya Shujaa:2500|Kenya Simbas:2500|Everyday Team:1800"],
            ["Rugby Protection and Kit", "", "Protection and training kit for the pitch.", "Scrum Cap:2500|Mouthguard:700|Shoulder Pads:3500|Rugby Shorts:1200|Tackle Bag:6500"]
        ],
        tennis: [
            ["Tennis Rackets", "Racket", "Rackets for control, power and spin.", "Wilson Pro Staff:14000|Babolat Pure Drive:15500|Head Speed:13500|Yonex:12500|Everyday Beginner:4500"],
            ["Tennis Balls", "Tennis Balls", "Tube of 3 balls for matches and practice.", "Wilson:800|Penn:700|Dunlop:750|Slazenger:800"],
            ["Tennis Shoes", "Tennis Shoes", "Court shoes built for quick side-to-side movement.", "Nike Court:9000|Adidas Barricade:9500|Asics Gel-Resolution:10500|Everyday Court:4500"],
            ["Tennis Accessories", "", "Bags, grips and wear for the court.", "Racket Bag:3500|Overgrips (3 Pack):600|Wristbands:400|Headband:300|Tennis Cap:900"]
        ],
        athletics: [
            ["Running Shoes", "Running Shoes", "Cushioned shoes for road running and training.", "Nike Pegasus:11000|Adidas Adizero:10500|Asics Gel-Nimbus:12500|Brooks Ghost:12000|Puma Deviate:9500|Everyday Trainers:4000"],
            ["Track Spikes", "Track Spikes", "Lightweight spikes for sprints and middle distance.", "Nike Zoom:9500|Adidas Adizero:8500|Puma evoSPEED:8000|Everyday Spikes:4500"],
            ["Running Wear", "", "Light, breathable clothing for runners.", "Running Shorts:1200|Running Vest:1000|Compression Tights:2200|Running Cap:700|Running Socks:600"],
            ["Running Accessories", "", "Tools to carry, time and fuel your runs.", "Water Bottle:700|Running Armband:900|Hydration Belt:1800|Stopwatch:1200|Sports Watch:6500"]
        ]
    };

    // Turn the compact text above into product objects
    // CATALOG = products grouped by sport and type (used to build each sport page)
    // ALL     = one flat list of every product (used by the search box)
    const CATALOG = {};
    const ALL = [];
    SPORTS.forEach(([id, label]) => {
        CATALOG[id] = RAW[id].map(([type, noun, desc, text]) => {
            // Split "Nike Mercurial:9500|Nike Phantom:9000" into separate products
            const items = text.split("|").map(s => {
                const [line, price] = s.split(":");
                return { sport: id, sportLabel: label, type, line, desc,
                         name: noun ? `${line} ${noun}` : line, price: Number(price) };
            });
            ALL.push(...items);
            return { type, items };
        });
    });

    // ---- BUILD THE PAGE ----
    // Turns a name into a file-friendly text, e.g. "Nike Mercurial Boots" -> "nike-mercurial-boots"
    // (this is how the script finds the matching photo in the images folder)
    const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    // Creates the HTML for ONE product card: photo, name, description, price, Add to Cart button
    function card(p) {
        return `
            <div class="product">
                <img src="images/${slug(p.name)}.jpg" data-fb="images/${slug(p.type)}.jpg" alt="${p.name}" loading="lazy">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <p class="price">KSh ${p.price.toLocaleString()}</p>
                <button class="add-cart" data-name="${p.name}" data-price="${p.price}">Add to Cart</button>
            </div>`;
    }

    // Adds one link per sport to the navigation bar
    document.getElementById("nav-links").insertAdjacentHTML("beforeend",
        SPORTS.map(([id, label]) => `<a href="#${id}" data-section="${id}">${label}</a>`).join(""));

    // Builds the sport tiles on the home page
    document.querySelector(".categories").innerHTML = SPORTS.map(([id, label, tile]) => `
        <div class="category">
            <h3>${label}</h3>
            <p>${tile}</p>
            <button class="view-button" data-section="${id}">View Products</button>
        </div>`).join("");

    // Builds an empty page for every sport (tabs, brand chips and product grid get filled in later)
    const sectionsHost = document.getElementById("sport-sections");
    sectionsHost.innerHTML = SPORTS.map(([id, label, , subtitle]) => `
        <section id="${id}" class="sport-section" hidden>
            <button class="back-button" data-home>&larr; Back to Home</button>
            <h2>${label} Products</h2>
            <p class="section-subtitle">${subtitle}</p>
            <div class="type-tabs"></div>
            <div class="line-chips"></div>
            <div class="products"></div>
        </section>`).join("");

    // Which product type (tab) and brand line (chip) is selected in each sport
    // t = tab number (0 is the first tab), l = chosen brand ("" means All)
    const view = {};
    SPORTS.forEach(([id]) => view[id] = { t: 0, l: "" });

    // Draws (or redraws) one sport page: the tabs, the brand chips and the products
    function renderSport(id) {
        const sec = document.getElementById(id);
        const v = view[id];
        const types = CATALOG[id];
        const current = types[v.t];

        // Tabs, e.g. "Football Boots | Footballs | Football Jerseys"
        sec.querySelector(".type-tabs").innerHTML = types.map((t, i) =>
            `<button class="type-tab${i === v.t ? " active" : ""}" data-t="${i}">${t.type}</button>`).join("");

        // Brand chips, e.g. "All | Nike | Adidas" (skipped if there is only one brand)
        const names = current.items.map(p => p.line);
        sec.querySelector(".line-chips").innerHTML = names.length > 1
            ? ["All", ...names].map(n => {
                const val = n === "All" ? "" : n;
                return `<button class="chip${val === v.l ? " active" : ""}" data-l="${val}">${n}</button>`;
            }).join("")
            : "";

        // Product cards, filtered by the selected brand chip
        sec.querySelector(".products").innerHTML =
            current.items.filter(p => !v.l || p.line === v.l).map(card).join("");
    }

    // Draw every sport page once at the start
    SPORTS.forEach(([id]) => renderSport(id));

    // When a tab or brand chip is clicked, remember the choice and redraw that sport page
    sectionsHost.addEventListener("click", (e) => {
        const btn = e.target.closest(".type-tab, .chip");
        if (!btn) return;
        const id = btn.closest(".sport-section").id;
        if (btn.classList.contains("type-tab")) {
            view[id] = { t: Number(btn.dataset.t), l: "" };   // new tab: reset brand to All
        } else {
            view[id].l = btn.dataset.l;                       // new brand chip
        }
        renderSport(id);
    });

    // If a photo is missing: try the product-type photo, then show a neat placeholder
    document.addEventListener("error", (e) => {
        const img = e.target;
        if (img.tagName !== "IMG" || img.dataset.done) return;
        // Step 1: try the product-type photo (e.g. images/football-boots.jpg)
        if (img.dataset.fb && !img.dataset.triedFb) {
            img.dataset.triedFb = "1";
            img.src = img.dataset.fb;
            return;
        }
        // Step 2: draw a plain blue box showing the product name
        img.dataset.done = "1";
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="180"><rect width="240" height="180" fill="#edf3ff"/><text x="120" y="95" font-family="Arial" font-size="15" font-weight="bold" fill="#0b1f4b" text-anchor="middle">${img.alt}</text></svg>`;
        img.src = "data:image/svg+xml," + encodeURIComponent(svg);
    }, true);

    // ---- ELEMENTS ----
    // Grab the parts of the page we need to control, so we can use them below
    const homeSection = document.getElementById("home");
    const sportSections = document.querySelectorAll(".sport-section");
    const cartSection = document.getElementById("cart-section");
    const navLinks = document.querySelectorAll("nav a");
    const navLinksContainer = document.getElementById("nav-links");
    const menuToggle = document.getElementById("menu-toggle");

    const cartButton = document.getElementById("cart-button");
    const cartCountEl = document.getElementById("cart-count");
    const cartItemsEl = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const emptyCartMsg = document.getElementById("empty-cart-msg");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout-btn");

    const searchInput = document.getElementById("search-input");
    const searchResultsContainer = document.getElementById("search-results-container");
    const searchResultsGrid = document.getElementById("search-results");

    // ---- CART STATE (saved in the browser so it survives a refresh) ----
    // The cart is a list of { name, price, qty }
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("dabay-cart")) || []; } catch (err) { cart = []; }

    // Saves the cart in the browser's storage
    function saveCart() {
        try { localStorage.setItem("dabay-cart", JSON.stringify(cart)); } catch (err) { /* storage unavailable */ }
    }

    // ---- NAVIGATION ----
    // Hamburger button opens/closes the menu on phones
    menuToggle.addEventListener("click", () => navLinksContainer.classList.toggle("active"));

    // Hides every page (home, sports, cart) and closes the phone menu
    function hideAllSections() {
        homeSection.hidden = true;
        cartSection.hidden = true;
        sportSections.forEach(sec => sec.hidden = true);
        navLinksContainer.classList.remove("active");
    }

    // Highlights the current page's link in the navigation bar
    function setActiveNav(target) {
        navLinks.forEach(link => link.classList.remove("active"));
        if (target) target.classList.add("active");
    }

    // Shows the home page
    function showHome() {
        hideAllSections();
        homeSection.hidden = false;
        setActiveNav(document.querySelector("nav a[data-home]"));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Shows one sport page (e.g. "football")
    function showSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        hideAllSections();
        targetSection.hidden = false;
        setActiveNav(document.querySelector(`nav a[data-section="${sectionId}"]`));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Every "Home" link and "Back to Home" button takes you to the home page
    document.querySelectorAll("[data-home]").forEach(btn => {
        btn.addEventListener("click", (e) => { e.preventDefault(); showHome(); });
    });

    // Every sport link and "View Products" button opens that sport's page
    document.querySelectorAll("[data-section]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showSection(btn.getAttribute("data-section"));
        });
    });

    // Cart button opens the cart page
    cartButton.addEventListener("click", () => {
        hideAllSections();
        cartSection.hidden = false;
        setActiveNav(null);
        renderCart();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ---- CART ----
    // Updates the number on the Cart button (total of all quantities)
    function updateCartCount() {
        cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    }

    // Adds a product to the cart (or adds 1 more if it is already there)
    function addToCart(name, price, buttonEl) {
        const existing = cart.find(item => item.name === name);
        if (existing) existing.qty += 1;
        else cart.push({ name, price: Number(price), qty: 1 });
        saveCart();
        updateCartCount();

        // Brief green "Added!" feedback on the button for 0.8 seconds
        const originalText = buttonEl.textContent;
        buttonEl.textContent = "Added!";
        buttonEl.style.backgroundColor = "#006b3c";
        setTimeout(() => {
            buttonEl.textContent = originalText;
            buttonEl.style.backgroundColor = "";
        }, 800);
    }

    // Draws the cart page: each item with its quantity buttons, plus the total price
    function renderCart() {
        cartItemsEl.innerHTML = "";
        let total = 0;
        const empty = cart.length === 0;
        // Show the "cart is empty" message, or the Clear/Order buttons, but not both
        emptyCartMsg.hidden = !empty;
        clearCartBtn.hidden = empty;
        checkoutBtn.hidden = empty;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="cart-line"><strong>${item.name}</strong><small>KSh ${itemTotal.toLocaleString()}</small></span>
                <span class="qty-controls">
                    <button class="qty-btn" data-index="${index}" data-delta="-1" aria-label="Remove one ${item.name}">&minus;</button>
                    <span class="qty">${item.qty}</span>
                    <button class="qty-btn" data-index="${index}" data-delta="1" aria-label="Add one ${item.name}">+</button>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </span>`;
            cartItemsEl.appendChild(li);
        });

        cartTotalEl.textContent = total.toLocaleString();
    }

    // Handles the +, − and Remove buttons inside the cart
    cartItemsEl.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        if (btn.classList.contains("remove-item")) {
            cart.splice(idx, 1);                              // delete the item
        } else if (btn.classList.contains("qty-btn")) {
            cart[idx].qty += Number(btn.dataset.delta);       // +1 or -1
            if (cart[idx].qty <= 0) cart.splice(idx, 1);      // remove if quantity hits 0
        } else return;
        saveCart();
        updateCartCount();
        renderCart();
    });

    // "Clear Cart" button empties the whole cart
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        saveCart();
        updateCartCount();
        renderCart();
    });

    // "Order on WhatsApp": builds a message listing the items and total,
    // then opens WhatsApp with that message ready to send to the shop's number
    checkoutBtn.addEventListener("click", () => {
        const lines = cart.map(i => `- ${i.name} x ${i.qty}: KSh ${(i.price * i.qty).toLocaleString()}`);
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const text = `Hello Dabay Sports Shop, I would like to order:\n${lines.join("\n")}\nTotal: KSh ${total.toLocaleString()}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });

    // One listener for every "Add to Cart" button on the site
    // (works even for cards created later, such as search results)
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-cart")) {
            addToCart(e.target.dataset.name, e.target.dataset.price, e.target);
        }
    });

    // ---- LIVE SEARCH (matches sport, brand, product type, name and description) ----
    // Runs every time the visitor types in the search box
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        searchResultsGrid.innerHTML = "";

        // Empty box: hide the results area
        if (!query) {
            searchResultsContainer.hidden = true;
            return;
        }

        // Keep every product whose details contain the typed text
        const matches = ALL.filter(p =>
            `${p.name} ${p.type} ${p.sportLabel} ${p.desc}`.toLowerCase().includes(query));

        searchResultsContainer.hidden = false;

        if (matches.length === 0) {
            // Nothing found: show a friendly message
            const msg = document.createElement("p");
            msg.textContent = `No products found matching "${searchInput.value.trim()}".`;
            searchResultsGrid.appendChild(msg);
        } else {
            // Show the matching product cards
            searchResultsGrid.innerHTML = matches.map(card).join("");
        }
    });

    // Final setup when the page opens: show the saved cart count and prepare the cart page
    updateCartCount();
    renderCart();
});