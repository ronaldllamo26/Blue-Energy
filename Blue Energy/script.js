/* ======================================================
   BLUE ENERGY CAREERS - FIXED EMAIL SENDING
   ====================================================== */

/* ===== EMAILJS CONFIG - CONFIGURED! ✅ ===== */
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_c8i64am',
    TEMPLATE_ID: 'template_6es0g5j',
    PUBLIC_KEY: 'eLH9WKBio1tBidgRd'
};

/* ===== ENGINE MODELS DATA WITH PARTS ===== */
const engineModels = [
    { 
        name: "WD615", 
        brand: "Weichai", 
        image: "wd615.jpg",
        parts: ["Cylinder Head", "Piston Set", "Connecting Rod", "Crankshaft", "Oil Pump", "Water Pump", "Fuel Injector", "Turbocharger"]
    },
    { 
        name: "WD618", 
        brand: "Weichai", 
        image: "WD618.jpg",
        parts: ["Cylinder Block", "Piston Kit", "Cylinder Liner", "Gasket Set", "Oil Filter", "Fuel Pump", "Starter Motor", "Alternator"]
    },
    { 
        name: "WD10", 
        brand: "Weichai", 
        image: "wd10.jpg",
        parts: ["Cylinder Head Assembly", "Valve Train Kit", "Timing Gear", "Oil Pan", "Radiator", "Fan Belt", "Tensioner", "Idler Pulley"]
    },
    { 
        name: "D12", 
        brand: "Weichai", 
        image: "d12.jpg",
        parts: ["Engine Block", "Piston Ring Set", "Main Bearing", "Rod Bearing", "Thrust Washer", "Camshaft", "Valve Set", "Rocker Arm"]
    },
    { 
        name: "WP6", 
        brand: "Weichai", 
        image: "wp6.jpg",
        parts: ["Cylinder Head Cover", "Intake Manifold", "Exhaust Manifold", "Turbo Kit", "Intercooler", "EGR Valve", "Sensors", "Gaskets"]
    },
    { 
        name: "WP3", 
        brand: "Weichai", 
        image: "wp3.jpg",
        parts: ["Fuel System Kit", "Injection Pump", "Common Rail", "Injectors", "Fuel Filter", "Air Filter", "Oil Cooler", "Thermostat"]
    },
    { 
        name: "ISM11", 
        brand: "Cummins", 
        image: "ism11.jpg",
        parts: ["Cylinder Head", "Piston Assembly", "Connecting Rod", "Crankshaft", "Flywheel", "Oil Pump", "Water Pump", "Turbocharger"]
    },
    { 
        name: "6LT", 
        brand: "Cummins", 
        image: "6lt.webp",
        parts: ["Engine Gasket Kit", "Piston Kit", "Liner Kit", "Bearing Set", "Valve Set", "Timing Kit", "Belt Tensioner", "Pulley Assembly"]
    },
    { 
        name: "YN33", 
        brand: "Yuchai", 
        image: "yn33.avif",
        parts: ["Cylinder Block", "Head Assembly", "Piston Ring", "Oil Seal Kit", "Fuel Injector", "Glow Plug", "Starter", "Alternator"]
    },
    { 
        name: "D19", 
        brand: "Weichai", 
        image: "d19.jpg",
        parts: ["Complete Gasket Set", "Piston Kit", "Liner Set", "Bearing Kit", "Valve Kit", "Oil Pump", "Water Pump", "Fan Assembly"]
    },
    { 
        name: "ISF 3.8", 
        brand: "Cummins", 
        image: "isf.jpg",
        parts: ["Cylinder Head", "Fuel Pump", "Injector Set", "Turbo Assembly", "Exhaust Manifold", "Intake Manifold", "Sensors", "Filters"]
    },
    { 
        name: "ISF 2.8", 
        brand: "Cummins", 
        image: "isf2.8.jpg",
        parts: ["Engine Block", "Piston Set", "Crankshaft", "Camshaft", "Timing Belt", "Water Pump", "Oil Pump", "Alternator"]
    },
    { 
        name: "QC480D", 
        brand: "Quanchai", 
        image: "qc480d.webp",
        parts: ["Cylinder Kit", "Piston Ring", "Gasket Set", "Bearing Set", "Valve Set", "Oil Filter", "Fuel Filter", "Air Filter"]
    },
    { 
        name: "QC380D", 
        brand: "Quanchai", 
        image: "qc380d.avif",
        parts: ["Head Gasket", "Cylinder Liner", "Piston Assembly", "Rod Assembly", "Seal Kit", "Belt Kit", "Pulley Set", "Tensioner"]
    },
    { 
        name: "CA4110", 
        brand: "FAW", 
        image: "ca4110.jpg",
        parts: ["Engine Head", "Block Assembly", "Piston Kit", "Connecting Rod", "Crankshaft", "Flywheel", "Clutch Kit", "Bearing Set"]
    },
    { 
        name: "CA4DL2", 
        brand: "FAW", 
        image: "ca4dl2.jpg",
        parts: ["Fuel System", "Injection Pump", "Injector Kit", "Turbo Unit", "Oil Cooler", "Radiator", "Fan Assembly", "Hoses"]
    },
    { 
        name: "CA498", 
        brand: "FAW", 
        image: "ca498.jpg",
        parts: ["Gasket Full Set", "Piston Ring Set", "Valve Kit", "Bearing Kit", "Seal Kit", "Oil Pump", "Water Pump", "Filters"]
    },
    { 
        name: "YC6MK-420", 
        brand: "Yuchai", 
        image: "yc6.jpg",
        parts: ["Cylinder Head", "Engine Block", "Piston Assembly", "Turbocharger", "Fuel Injector", "Oil Pump", "Water Pump", "Starter Motor"]
    },
];

/* ===== GLOBAL STATE ===== */
let currentPage = 1;
const itemsPerPage = 6;
let filteredModels = [...engineModels];

/* ===== UTILITY FUNCTIONS ===== */
function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

/* ===== DOM READY ===== */
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init({
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY
    });
    
    console.log("✅ EmailJS initialized successfully!");
    
    renderModels();
    initPagination();
    initSearch();
    initBrandFilter();
    initSort();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initVideo();
    initContactForm();
    initScrollTop();
    initPartsModal();
});

/* ======================================================
   ENGINE MODELS RENDERING
   ====================================================== */
function renderModels() {
    const grid = document.getElementById("modelsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const models = filteredModels.slice(start, end);

    models.forEach(model => {
        const card = document.createElement("div");
        card.className = "model-card-new";

        card.innerHTML = `
            <div class="model-image">
                <img src="${model.image}" alt="${model.name}" loading="lazy">
            </div>
            <div class="model-info">
                <h3>${model.name}</h3>
                <p class="model-brand">${model.brand}</p>
                <button class="model-btn" data-model='${JSON.stringify(model)}'>View Parts</button>
            </div>
        `;

        card.querySelector(".model-btn").addEventListener("click", (e) => {
            const modelData = JSON.parse(e.target.dataset.model);
            openPartsModal(modelData);
        });

        grid.appendChild(card);
        setTimeout(() => card.classList.add("fade-in"), 50);
    });

    updatePagination();
}

/* ======================================================
   PARTS MODAL
   ====================================================== */
function initPartsModal() {
    const modal = document.getElementById("partsModal");
    const closeBtn = document.getElementById("closePartsModal");
    
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
        }
    });

    const inquiryBtn = document.getElementById("inquiryBtn");
    if (inquiryBtn) {
        inquiryBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }
}

function openPartsModal(model) {
    const modal = document.getElementById("partsModal");
    const title = document.getElementById("modalEngineTitle");
    const brand = document.getElementById("modalEngineBrand");
    const partsGrid = document.getElementById("partsGrid");
    const inquiryBtn = document.getElementById("inquiryBtn");

    if (!modal || !title || !brand || !partsGrid) return;

    title.textContent = `${model.name} - Available Parts`;
    brand.textContent = `Brand: ${model.brand}`;

    partsGrid.innerHTML = "";
    model.parts.forEach(part => {
        const partItem = document.createElement("div");
        partItem.className = "part-item";
        partItem.textContent = part;
        partsGrid.appendChild(partItem);
    });

    if (inquiryBtn) {
        inquiryBtn.onclick = () => {
            const engineInput = document.querySelector('input[name="engine"]');
            if (engineInput) engineInput.value = model.name;
            modal.classList.remove("active");
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        };
    }

    modal.classList.add("active");
}

/* ======================================================
   PAGINATION - FIXED: NO AUTO SCROLL! ✅
   ====================================================== */
function initPagination() {
    document.getElementById("prevBtn")?.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderModels();
        }
    });

    document.getElementById("nextBtn")?.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderModels();
        }
    });
}

function updatePagination() {
    const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const controls = document.getElementById("paginationControls");

    if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    if (controls) controls.style.display = totalPages <= 1 ? "none" : "flex";
}

/* ======================================================
   SEARCH + DEBOUNCE
   ====================================================== */
function initSearch() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    input.addEventListener("input", debounce(e => {
        const value = e.target.value.toLowerCase();
        filteredModels = value
            ? engineModels.filter(m =>
                m.name.toLowerCase().includes(value) ||
                m.brand.toLowerCase().includes(value)
            )
            : [...engineModels];
        currentPage = 1;
        renderModels();
    }));
}

/* ======================================================
   BRAND FILTER DROPDOWN
   ====================================================== */
function initBrandFilter() {
    const select = document.getElementById("brandFilter");
    if (!select) return;

    const brands = ["All", ...new Set(engineModels.map(m => m.brand))];
    brands.forEach(b => {
        const opt = document.createElement("option");
        opt.value = b;
        opt.textContent = b;
        select.appendChild(opt);
    });

    select.addEventListener("change", () => {
        const value = select.value;
        filteredModels = value === "All"
            ? [...engineModels]
            : engineModels.filter(m => m.brand === value);
        currentPage = 1;
        renderModels();
    });
}

/* ======================================================
   SORT MODE
   ====================================================== */
function initSort() {
    const select = document.getElementById("sortSelect");
    if (!select) return;

    select.addEventListener("change", () => {
        const value = select.value;
        if (value === "name-asc") {
            filteredModels.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === "name-desc") {
            filteredModels.sort((a, b) => b.name.localeCompare(a.name));
        }
        currentPage = 1;
        renderModels();
    });
}

/* ======================================================
   MOBILE MENU
   ====================================================== */
function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const links = document.getElementById("navLinks");
    if (!btn || !links) return;

    btn.addEventListener("click", () => {
        links.classList.toggle("active");
        btn.textContent = links.classList.contains("active") ? "✕" : "☰";
    });

    links.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            links.classList.remove("active");
            btn.textContent = "☰";
        });
    });
}

/* ======================================================
   SMOOTH SCROLL
   ====================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        });
    });
}

/* ======================================================
   NAVBAR EFFECT
   ====================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    window.addEventListener("scroll", () => {
        navbar.style.boxShadow =
            window.scrollY > 50
                ? "0 5px 20px rgba(0,0,0,.15)"
                : "0 2px 10px rgba(0,0,0,.1)";
    });
}

/* ======================================================
   VIDEO CONTROLS
   ====================================================== */
function initVideo() {
    const video = document.querySelector(".hero-video");
    const btn = document.getElementById("videoControl");
    const icon = document.getElementById("videoIcon");
    if (!video) return;

    video.play().catch(() => {});
    document.addEventListener("click", () => video.play(), { once: true });

    if (!btn || !icon) return;
    btn.addEventListener("click", e => {
        e.stopPropagation();
        if (video.paused) {
            video.play(); icon.textContent = "⏸";
        } else {
            video.pause(); icon.textContent = "▶";
        }
    });
}

/* ======================================================
   CONTACT FORM - AYOS NA TO PRE! 📧
   ====================================================== */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById("submitBtn");
        const btnText = document.getElementById("btnText");
        const btnLoader = document.getElementById("btnLoader");

        const templateParams = {
            from_name: form.from_name.value.trim(),
            from_email: form.from_email.value.trim(),
            phone: form.phone.value.trim(),
            engine: form.engine.value.trim(),
            message: form.message.value.trim()
        };

        if (!templateParams.from_name || !templateParams.from_email || !templateParams.message) {
            showStatus("❌ Please fill in all required fields!", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(templateParams.from_email)) {
            showStatus("❌ Invalid email address!", "error");
            return;
        }

        submitBtn.disabled = true;
        btnText.style.display = "none";
        btnLoader.style.display = "inline";

        try {
            console.log("📤 Sending email...", templateParams);
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );

            console.log("✅ Email sent successfully!", response);
            
            showStatus(`✅ Thank you ${templateParams.from_name}! We have received your inquiry. We will contact you at ${templateParams.from_email}`, "success");
            
            form.reset();

        } catch (error) {
            console.error("❌ Email sending failed:", error);
            
            let errorMsg = "❌ Failed to send message. ";
            if (error.text) {
                errorMsg += `Error: ${error.text}. `;
            }
            errorMsg += "Please call us instead: 0917 107 6107";
            
            showStatus(errorMsg, "error");
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = "inline";
            btnLoader.style.display = "none";
        }
    });

    function showStatus(message, type) {
        const formStatus = document.getElementById("formStatus");
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.style.color = type === "success" ? "#28a745" : "#dc3545";
        formStatus.style.padding = "1rem";
        formStatus.style.borderRadius = "8px";
        formStatus.style.backgroundColor = type === "success" ? "#d4edda" : "#f8d7da";
        
        setTimeout(() => {
            formStatus.textContent = "";
            formStatus.style.padding = "0";
            formStatus.style.backgroundColor = "transparent";
        }, 8000);
    }
}

/* ======================================================
   SCROLL TO TOP BUTTON
   ====================================================== */
function initScrollTop() {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

console.log("✅ Blue Energy Careers - NO AUTO SCROLL VERSION loaded!");