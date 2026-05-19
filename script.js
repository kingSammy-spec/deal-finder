const rawProducts = [
    { category: "Electronics", title: "Sony WH-1000XM5 Noise Cancelling Headphones", discount: "25% OFF", desc: "Industry-leading noise cancellation and 30-hour battery life. Premium sound quality.", code: "SONY25", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Electronics", title: "Samsung Galaxy S24 Ultra", discount: "15% OFF", desc: "The ultimate smartphone with advanced AI features, 200MP camera, and titanium frame.", code: "GALAXY15", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Electronics", title: "Apple MacBook Air M3", discount: "10% OFF", desc: "Supercharged by M3. 13-inch liquid retina display, incredibly thin and light.", code: "MACM310", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Fashion", title: "Nike Air Force 1 '07", discount: "30% OFF", desc: "The classic sneaker that revolutionized the game. Durable leather and responsive Air cushioning.", code: "NIKEAF30", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Fashion", title: "Levi's 501 Original Fit Jeans", discount: "40% OFF", desc: "The original blue jean since 1873. A cultural icon worn by generations.", code: "LEVI40", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Fashion", title: "Patagonia Better Sweater Fleece", discount: "20% OFF", desc: "Warm, 100% recycled polyester quarter-zip fleece pullover.", code: "FLEECE20", img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Travel", title: "7-Night Caribbean Royal Cruise", discount: "50% OFF", desc: "Set sail to the Bahamas, Jamaica, and Cozumel. All-inclusive luxury suite.", code: "CRUISE50", img: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Travel", title: "Roundtrip Flight to Tokyo, Japan", discount: "35% OFF", desc: "Direct flights on ANA or Japan Airlines. Explore the vibrant culture of Tokyo.", code: "TOKYO35", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Travel", title: "5-Star Resort Stay in Maldives", discount: "45% OFF", desc: "Overwater bungalow with private pool. Breakfast and spa credits included.", code: "MALDIVES45", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Electronics", title: "LG C3 Series 65-Inch OLED TV", discount: "25% OFF", desc: "Stunning OLED evo picture quality, self-lit pixels, and incredibly slim design.", code: "LGOLED25", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Fashion", title: "The North Face Nuptse Jacket", discount: "20% OFF", desc: "Iconic down puffer jacket providing incredible warmth in harsh winter conditions.", code: "NUPTSE20", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Travel", title: "Weekend Getaway in Paris", discount: "30% OFF", desc: "3 nights at a boutique hotel near the Eiffel Tower with romantic Seine river cruise.", code: "PARIS30", img: "https://images.unsplash.com/photo-1502602898657-3e907a5ea82c?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Electronics", title: "Dyson V15 Detect Cordless Vacuum", discount: "15% OFF", desc: "Laser reveals microscopic dust. Intelligently optimizes suction and run time.", code: "DYSON15", img: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Fashion", title: "Ray-Ban Classic Wayfarer Sunglasses", discount: "25% OFF", desc: "The most recognizable style in the history of sunglasses. Polarized lenses.", code: "RAYBAN25", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&h=300&q=80" },
    { category: "Travel", title: "All-Inclusive Resort in Cancun", discount: "40% OFF", desc: "Enjoy pristine beaches, unlimited dining, and premium drinks in Mexico.", code: "CANCUN40", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&h=300&q=80" }
];

// Shuffle array algorithm
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Generate more deals to fill the grid by repeating and shuffling
const duplicatedProducts = [...rawProducts, ...rawProducts, ...rawProducts, ...rawProducts];
let dealsData = shuffleArray(duplicatedProducts).map((prod, i) => ({
    ...prod,
    id: i + 1
}));

let currentFilter = 'All';

function renderDeals() {
    const grid = document.getElementById('dealGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const searchInput = document.getElementById('deal-search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const sortSelect = document.getElementById('deal-sort-select');
    const sortValue = sortSelect ? sortSelect.value : 'default';

    // Filter by Category
    let filtered = currentFilter === 'All' 
        ? dealsData 
        : dealsData.filter(d => d.category === currentFilter);

    // Filter by Search Term
    if (searchTerm) {
        filtered = filtered.filter(d => 
            d.title.toLowerCase().includes(searchTerm) || 
            d.desc.toLowerCase().includes(searchTerm) || 
            d.category.toLowerCase().includes(searchTerm)
        );
    }

    // Sort by Discount
    if (sortValue !== 'default') {
        filtered.sort((a, b) => {
            const valA = parseInt(a.discount);
            const valB = parseInt(b.discount);
            if (sortValue === 'discount-high') return valB - valA;
            if (sortValue === 'discount-low') return valA - valB;
            return 0;
        });
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); font-size: 1.1rem; padding: 3rem;">No deals found matching your search. Try different keywords.</p>`;
    }

    filtered.forEach((d, index) => {
        const card = document.createElement('div');
        card.className = 'deal-card';
        card.innerHTML = `
            <div class="discount">${d.discount}</div>
            <div class="card-image" style="height:170px; background:url('${d.img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=300&q=80'}') center/cover; border-radius:12px; margin-bottom:1.2rem; border:1px solid rgba(255,255,255,0.04);"></div>
            <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800; text-transform:uppercase; letter-spacing:1px;">${d.category}</span>
            <h3>${d.title}</h3>
            <p>${d.desc.substring(0, 75)}...</p>
            <div style="display:flex; gap:12px; margin-top:auto;">
                <button onclick="revealCode(this, '${d.code}', event)" style="flex:1;">Get Code</button>
                <button onclick="openDetail(${d.id})" style="flex:1;">Details</button>
            </div>
        `;
        grid.appendChild(card);

        // Inject Native Ad Card every 4 deals
        if ((index + 1) % 4 === 0) {
            const adCard = document.createElement('div');
            adCard.className = 'deal-card ad-card';
            adCard.innerHTML = `
                <div class="discount" style="background:var(--primary); color:#000;">HOT</div>
                <span class="ad-tag" style="position:static; transform:none; display:inline-block; margin-bottom: 0.5rem;">SPONSORED DEAL</span>
                <h3>Win a $500 Amazon Gift Card</h3>
                <p>Complete our quick shopping survey to enter the weekly draw for a chance to win big!</p>
                <button onclick="window.open('#', '_blank')" style="margin-top:auto;">Enter Survey</button>
            `;
            grid.appendChild(adCard);
        }
    });
}

function filterCategory(cat) {
    currentFilter = cat;
    document.querySelectorAll('.nav-filters a').forEach(a => {
        if (a.innerText === cat.toUpperCase()) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

    showSessionInterstitialAd(() => {
        renderDeals();
    });
}

const RETAIL_CAMPAIGNS = [
    {
        title: 'RewardPro: Exclusive Cashback',
        desc: 'Get up to 15% cashback on all your Amazon purchases with RewardPro.',
        promo: 'CODE "CASHBACK15" FOR 15% REBATE',
        img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Walmart $50 Gift Card',
        desc: 'Claim your free $50 Walmart digital shopping voucher on all fashion orders.',
        promo: 'CLAIM GIFT VOUCHER: WALMART50',
        img: 'https://images.unsplash.com/photo-1538356111088-f5428f519257?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Target RedCard: 5% Off Daily',
        desc: 'Get an instant 5% discount at checkout on Target orders, free shipping, and extended returns.',
        promo: 'CLAIM REDCARD 5% SAVE: TARGET5RED',
        img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Groupon: Local Flash Savings',
        desc: 'Save up to 70% on local dining, spa services, activities, and weekend getaways.',
        promo: 'CLAIM LOCAL FLASH OFFER: GROUPONLOCAL',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Rakuten: Automated Coupons',
        desc: 'Auto-apply verified coupon codes at checkout with Rakutens shopping extension.',
        promo: 'INSTALL RAKUTEN CHROME: RAKUTENEXT',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Honey: Price Watch Scanner',
        desc: 'Compare historical pricing across 10,000+ merchants and receive instant drops notifications.',
        promo: 'ACTIVATE HONEY WATCHDOG: HONEYDROP',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&h=200&q=80'
    }
];

let adsDisabled = false;
let interactionCount = 0;

// Inspect verified coupon detailed modal popup
function openDetail(id) {
    const d = dealsData.find(item => item.id === id);
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    body.innerHTML = `
        <div class="modal-hero" style="background:url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=600&q=80') center/cover; height:260px; border-radius:16px; margin-bottom:2rem; box-shadow:0 10px 25px rgba(0,0,0,0.05); border:1px solid var(--border);"></div>
        <div class="discount" style="position:static; display:inline-block; margin-bottom:1.5rem; transform:none;">${d.discount}</div>
        <h2 style="font-size:2.2rem; font-family:'Space Grotesk',sans-serif; font-weight:700; margin:1rem 0; color:#090b0e; letter-spacing:-0.5px; line-height:1.1;">${d.title}</h2>
        <p style="font-size:1.05rem; color:#444; line-height:1.6; margin-bottom:2rem;">${d.desc} Additional structural monitoring confirms merchant volumes are holding, with localized rebates active.</p>
        
        <div class="extensive-info" style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:2rem;">
            <div style="background:#fafafa; border:1px solid rgba(0,0,0,0.06); padding:1.8rem; border-radius:16px;">
                <h3 style="margin-bottom:0.8rem; font-size:1.1rem; color:#090b0e; font-family:'Space Grotesk',sans-serif;">Verification Index</h3>
                <ul style="list-style:none; padding:0; color:#444; font-size:0.88rem; display:flex; flex-direction:column; gap:0.4rem;">
                    <li>🔥 Verified status: Active</li>
                    <li>🌍 Global success rate: 98%</li>
                    <li>⏱️ Last verified: Today</li>
                </ul>
            </div>
            <div style="background:#fafafa; border:1px solid rgba(0,0,0,0.06); padding:1.8rem; border-radius:16px;">
                <h3 style="margin-bottom:0.8rem; font-size:1.1rem; color:#090b0e; font-family:'Space Grotesk',sans-serif;">Deal Terms</h3>
                <p style="font-size:0.88rem; color:#444; line-height:1.5;">Subject to stock limits. One coupon per active account. Non-transferable.</p>
            </div>
        </div>

        <button class="ad-btn" id="modal-reveal-btn-${d.id}" style="width:100%; padding:1.2rem; font-size:1.1rem;" onclick="revealCode(this, '${d.code}', event)">REVEAL COUPON CODE</button>
    `;
    
    // Choose details modal sponsor campaign
    const detailCampaign = RETAIL_CAMPAIGNS[id % RETAIL_CAMPAIGNS.length];
    const detailImg = document.getElementById('detail-ad-img');
    const detailTitle = document.getElementById('detail-ad-title');
    const detailDesc = document.getElementById('detail-ad-desc');
    
    if (detailImg) detailImg.src = detailCampaign.img;
    if (detailTitle) detailTitle.innerText = detailCampaign.title;
    if (detailDesc) detailDesc.innerText = detailCampaign.desc;

    modal.style.display = 'flex';
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('detailModal').style.display = 'none';
});

window.onclick = (event) => {
    const modal = document.getElementById('detailModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// --- 2. Custom Coupon Registry Selector ---
const couponModal = document.getElementById('couponModal');
const btnOpenCouponCreator = document.getElementById('btn-open-coupon-creator');
const btnCloseCouponModal = document.getElementById('btn-close-coupon-modal');

if (btnOpenCouponCreator) {
    btnOpenCouponCreator.addEventListener('click', () => {
        if (couponModal) couponModal.style.display = 'flex';
    });
}

if (btnCloseCouponModal) {
    btnCloseCouponModal.addEventListener('click', () => {
        if (couponModal) couponModal.style.display = 'none';
    });
}

function submitCustomCoupon() {
    const title = document.getElementById('coupon-title-input').value.trim();
    const discount = document.getElementById('coupon-discount-input').value.trim();
    const code = document.getElementById('coupon-code-input').value.trim().toUpperCase();

    if (!title || !discount || !code) {
        alert('❌ Please supply coupon registry variables.');
        return;
    }

    const newDeal = {
        id: dealsData.length + 1,
        category: "Electronics",
        title: title,
        discount: discount.includes('%') ? discount : discount + '% OFF',
        desc: `Special user-submitted coupon for ${title}. Verified active at checkout.`,
        code: code
    };

    if (couponModal) couponModal.style.display = 'none';
    document.getElementById('custom-coupon-form').reset();

    // Trigger interstitial skip-ad overlay before updating
    showSessionInterstitialAd(() => {
        dealsData.unshift(newDeal);
        renderDeals();
    });
}

function revealCode(btn, code, event) {
    if (event) event.stopPropagation();
    
    // Copy code to clipboard!
    navigator.clipboard.writeText(code).then(() => {
        showSessionInterstitialAd(() => {
            btn.innerText = "COPIED: " + code;
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            btn.style.color = "#fff";
        });
    }).catch(() => {
        showSessionInterstitialAd(() => {
            btn.innerText = code;
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            btn.style.color = "#fff";
        });
    });
}


// --- 3. Programmatic Rotating Sponsor Banner ---
let bannerIndex = 0;
function startRotatingBanner() {
    const banner = document.getElementById('floating-ad-banner');
    if (!banner || adsDisabled) return;

    const campaign = RETAIL_CAMPAIGNS[bannerIndex];
    bannerIndex = (bannerIndex + 1) % RETAIL_CAMPAIGNS.length;

    banner.innerHTML = `
        <div class="ad-sponsor-container">
            <img src="${campaign.img}" alt="${campaign.title}">
            <div class="banner-content">
                <p>Curated Campaign Sponsor</p>
                <strong>${campaign.title}</strong>
            </div>
        </div>
        <div class="banner-actions">
            <button class="btn-banner-action" id="btn-banner-claim">Claim Resource</button>
            <button class="btn-banner-close" id="btn-banner-close">×</button>
        </div>
    `;

    banner.style.display = 'flex';

    // Hook listeners
    document.getElementById('btn-banner-claim')?.addEventListener('click', () => {
        alert(`🎉 Copied coupon code: "${campaign.promo.split('"')[1] || 'CASHBACK15'}" to clipboard!`);
        window.open('#', '_blank');
    });

    document.getElementById('btn-banner-close')?.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

// Initial banner launch and rotate every 10 seconds
setTimeout(() => {
    startRotatingBanner();
    setInterval(startRotatingBanner, 10000);
}, 2000);


// --- 4. Decoupled Timed Interstitial Countdown System ---
let interstitialCallback = null;
let interstitialTimer = null;
const interstitialModal = document.getElementById('interstitialModal');
const btnSkipAd = document.getElementById('btn-skip-ad');
const btnClaimAd = document.getElementById('btn-claim-ad');

function showSessionInterstitialAd(onClosed) {
    if (adsDisabled || !interstitialModal) {
        onClosed();
        return;
    }
    
    interstitialCallback = onClosed;
    
    // Choose a random campaign
    const campaign = RETAIL_CAMPAIGNS[Math.floor(Math.random() * RETAIL_CAMPAIGNS.length)];
    const imgEl = document.getElementById('interstitial-ad-img');
    const titleEl = document.getElementById('interstitial-ad-title');
    const descEl = document.getElementById('interstitial-ad-desc');
    const promoEl = document.getElementById('interstitial-ad-promo');
    
    if (imgEl) imgEl.src = campaign.img;
    if (titleEl) titleEl.innerText = campaign.title;
    if (descEl) descEl.innerText = campaign.desc;
    if (promoEl) promoEl.innerText = campaign.promo;

    interstitialModal.style.display = 'flex';
    
    btnSkipAd.disabled = true;
    btnSkipAd.style.opacity = '0.4';
    btnSkipAd.style.cursor = 'not-allowed';
    btnSkipAd.innerText = 'Skip Ad in 5s';
    
    let count = 5;
    if (interstitialTimer) clearInterval(interstitialTimer);
    
    interstitialTimer = setInterval(() => {
        count--;
        if (count > 0) {
            btnSkipAd.innerText = `Skip Ad in ${count}s`;
        } else {
            clearInterval(interstitialTimer);
            btnSkipAd.innerText = 'Skip Ad';
            btnSkipAd.disabled = false;
            btnSkipAd.style.opacity = '1';
            btnSkipAd.style.cursor = 'pointer';
        }
    }, 1000);
}

if (btnSkipAd) {
    btnSkipAd.addEventListener('click', () => {
        interstitialModal.style.display = 'none';
        
        // Trigger success synchronization celebration modal!
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

if (btnClaimAd) {
    btnClaimAd.addEventListener('click', () => {
        alert('🎉 Shopping rebate whitelisted to active session!');
        interstitialModal.style.display = 'none';
        
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

// Celebration close handler
const btnCloseCelebrationModal = document.getElementById('btn-close-celebration');
if (btnCloseCelebrationModal) {
    btnCloseCelebrationModal.addEventListener('click', () => {
        document.getElementById('celebrationModal').style.display = 'none';
        if (interstitialCallback) {
            interstitialCallback();
            interstitialCallback = null;
        }
    });
}


// --- 5. Scarcity Upgrade Tier & Timer Engine ---
let upgradeTimer = null;
const premiumUpgradeModal = document.getElementById('premiumUpgradeModal');

function triggerUpgradeModal() {
    if (adsDisabled || !premiumUpgradeModal) return;
    
    premiumUpgradeModal.style.display = 'flex';
    let duration = 600; // 10 minutes
    const countdownEl = document.getElementById('scarcity-countdown');

    if (upgradeTimer) clearInterval(upgradeTimer);

    upgradeTimer = setInterval(() => {
        duration--;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        if (countdownEl) {
            countdownEl.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        if (duration <= 0) {
            clearInterval(upgradeTimer);
            premiumUpgradeModal.style.display = 'none';
        }
    }, 1000);
}

// Trigger upgrade modal after 40 seconds of active coupon searches
setTimeout(triggerUpgradeModal, 40000);

document.getElementById('btn-skip-upgrade')?.addEventListener('click', () => {
    premiumUpgradeModal.style.display = 'none';
    clearInterval(upgradeTimer);
});

// Acknowledge upgrade purchase (disable ads)
document.getElementById('btn-upgrade-now')?.addEventListener('click', () => {
    alert('🏆 Welcome to PromoRadar Elite! Real-time Cashback unlocked, coupon sponsors deactivated.');
    adsDisabled = true;
    premiumUpgradeModal.style.display = 'none';
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
    clearInterval(upgradeTimer);
});


// --- 6. Exit Intent & Mock Ad-Blocker Overlays ---
let exitIntentShown = false;
document.addEventListener("mouseout", (e) => {
    if (e.clientY < 0 && !exitIntentShown && !adsDisabled) {
        exitIntentShown = true;
        const exitModal = document.getElementById("exitIntentModal");
        if (exitModal) exitModal.style.display = "flex";
    }
});

document.getElementById("closeExitIntent")?.addEventListener("click", () => {
    document.getElementById("exitIntentModal").style.display = "none";
});
document.getElementById("declineExitIntent")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("exitIntentModal").style.display = "none";
});

// Trigger Mock ad blocker Whitelist popups after 5 seconds
setTimeout(() => {
    if (adsDisabled) return;
    const isAdBlockerActive = Math.random() < 0.15; // 15% simulation chance
    if (isAdBlockerActive) {
        const adBlockModal = document.getElementById("adBlockModal");
        if (adBlockModal) adBlockModal.style.display = "flex";
    }
}, 5000);

document.getElementById('btn-adblock-premium')?.addEventListener('click', () => {
    alert('🏆 Pro Activated! Ad banners disabled.');
    adsDisabled = true;
    document.getElementById("adBlockModal").style.display = "none";
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
});

// Initial compile
window.onload = () => {
    renderDeals();
};
