// PAGE ROUTING
function showPage(name) {
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  const el = document.getElementById('page-' + name);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  updateNavState();
}

function setActive(el) {
  document.querySelectorAll('.nav-links a').forEach((a) => a.classList.remove('active'));
  el.classList.add('active');
  return false;
}

// MOBILE MENU
const mobHam = document.getElementById('mob-ham');
const mobOverlay = document.getElementById('mob-overlay');
const mobMenu = document.getElementById('mob-menu');
const mobMenuX = document.getElementById('mob-menu-x');
const mobMenuClose = document.getElementById('mob-menu-close');

function openMobileMenu() {
  if (mobOverlay) mobOverlay.classList.add('is-open');
  if (mobMenu) mobMenu.classList.add('is-open');
}

function closeMobileMenu() {
  if (mobOverlay) mobOverlay.classList.remove('is-open');
  if (mobMenu) mobMenu.classList.remove('is-open');
}

if (mobHam) mobHam.addEventListener('click', openMobileMenu);
if (mobMenuX) mobMenuX.addEventListener('click', closeMobileMenu);
if (mobMenuClose) mobMenuClose.addEventListener('click', closeMobileMenu);
if (mobOverlay) mobOverlay.addEventListener('click', closeMobileMenu);

// NAV SCROLL STATE
function updateNavState() {
  const nav = document.getElementById('site-header');
  const homePage = document.getElementById('page-home');
  if (!nav || !homePage) return;
  const isHomeActive = homePage.classList.contains('active');
  const shouldSolid = window.scrollY > 24 || !isHomeActive;
  nav.classList.toggle('scrolled', shouldSolid);
}

window.addEventListener('scroll', updateNavState);

// HERO SLIDER
let heroIndex = 0;
let heroAutoplay;
const heroSlides = Array.from(document.querySelectorAll('#homeHero .hero-slide'));
const heroDots = Array.from(document.querySelectorAll('#homeHero .hero-dot'));
const heroThumbs = Array.from(document.querySelectorAll('#homeHero .hero-thumb'));

function heroShowSlide(index) {
  if (!heroSlides.length) return;
  const total = heroSlides.length;
  heroIndex = (index + total) % total;
  heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === heroIndex));
  heroDots.forEach((dot, i) => dot.classList.toggle('active', i === heroIndex));
  heroThumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === heroIndex));
}

function heroResetAutoplay() {
  clearInterval(heroAutoplay);
  if (!heroSlides.length) return;
  heroAutoplay = setInterval(() => heroShowSlide(heroIndex + 1), 5000);
}

function heroChangeSlide(direction) {
  heroShowSlide(heroIndex + direction);
  heroResetAutoplay();
}

function heroGoToSlide(index) {
  heroShowSlide(index);
  heroResetAutoplay();
}

// GALLERY
const galleryTabs = Array.from(document.querySelectorAll('.gallery-tab'));
const galleryMainGrid = document.getElementById('homeGalleryGrid');
const galleryRow2 = document.getElementById('homeGalleryRow2');
const galleryContent = [
  {
    main: [
      { icon: 'H1', label: 'Hospital Building', feature: true },
      { icon: 'O2', label: 'OPD Ward' },
      { icon: 'P3', label: 'Panchkarma Room' },
      { icon: 'M4', label: 'Pharmacy' },
      { icon: 'V5', label: 'Hospital Tour', video: true }
    ],
    row2: [
      { icon: 'L6', label: 'Lab' },
      { icon: 'I7', label: 'IPD Ward' },
      { icon: 'D8', label: 'Doctors' }
    ]
  },
  {
    main: [
      { icon: 'P1', label: 'Happy Patients', feature: true },
      { icon: 'F2', label: 'Follow-up Care' },
      { icon: 'S3', label: 'Senior Care' },
      { icon: 'C4', label: 'Consultation' },
      { icon: 'V5', label: 'Patient Story', video: true }
    ],
    row2: [
      { icon: 'R6', label: 'Recovery' },
      { icon: 'D7', label: 'Diagnosis' },
      { icon: 'S8', label: 'Support' }
    ]
  },
  {
    main: [
      { icon: 'V1', label: 'Hospital Overview', feature: true, video: true },
      { icon: 'V2', label: 'Panchkarma Demo', video: true },
      { icon: 'V3', label: 'Rehab Session', video: true },
      { icon: 'V4', label: 'Emergency Care', video: true },
      { icon: 'V5', label: 'Facility Walkthrough', video: true }
    ],
    row2: [
      { icon: 'A6', label: 'Doctor Advice' },
      { icon: 'T7', label: 'Health Talk' },
      { icon: 'G8', label: 'Patient Guide' }
    ]
  }
];

function renderGalleryTab(index) {
  if (!galleryMainGrid || !galleryRow2) return;
  const tabData = galleryContent[index];
  galleryMainGrid.innerHTML = tabData.main
    .map(
      (item) => `
      <div class="gallery-cell ${item.feature ? 'feature' : ''} ${item.video ? 'video' : ''}">
        <strong>${item.icon}</strong>
        <span>${item.label}</span>
      </div>`
    )
    .join('');
  galleryRow2.innerHTML = tabData.row2
    .map(
      (item) => `
      <div class="gallery-cell">
        <strong>${item.icon}</strong>
        <span>${item.label}</span>
      </div>`
    )
    .join('');
}

function switchGalleryTab(index) {
  galleryTabs.forEach((tab, i) => tab.classList.toggle('active', i === index));
  renderGalleryTab(index);
}

// TESTIMONIALS
const testiTrack = document.getElementById('testiTrack');
const testiDots = document.getElementById('testiDots');
let testiIndex = 0;
let testiPerView = 3;
let testiAutoplay;

function getTestimonialsPerView() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1180) return 2;
  return 3;
}

function testimonialPages() {
  const count = testiTrack ? testiTrack.children.length : 0;
  return count ? Math.ceil(count / testiPerView) : 0;
}

function renderTestimonialDots() {
  if (!testiDots) return;
  const pages = testimonialPages();
  testiDots.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === testiIndex ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to testimonial page ${i + 1}`);
    dot.addEventListener('click', () => testimonialGoTo(i));
    testiDots.appendChild(dot);
  }
}

function testimonialGoTo(index) {
  if (!testiTrack) return;
  const pages = testimonialPages();
  if (!pages) return;
  testiIndex = (index + pages) % pages;
  const card = testiTrack.querySelector('.testi-card');
  const gap = 14;
  const cardWidth = card ? card.getBoundingClientRect().width + gap : 0;
  testiTrack.style.transform = `translateX(-${testiIndex * testiPerView * cardWidth}px)`;
  testiDots.querySelectorAll('.testi-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === testiIndex);
  });
}

function resetTestimonialsAutoplay() {
  clearInterval(testiAutoplay);
  if (!testiTrack) return;
  testiAutoplay = setInterval(() => testimonialGoTo(testiIndex + 1), 5000);
}

function moveTestimonials(direction) {
  testimonialGoTo(testiIndex + direction);
  resetTestimonialsAutoplay();
}

// Legacy alias
function moveCarousel(direction) {
  moveTestimonials(direction);
}

function handleResize() {
  testiPerView = getTestimonialsPerView();
  renderTestimonialDots();
  testimonialGoTo(0);
  updateNavState();
}

window.addEventListener('resize', handleResize);

if (heroSlides.length) {
  heroShowSlide(0);
  heroResetAutoplay();
  const heroStage = document.getElementById('heroStage');
  if (heroStage) {
    heroStage.addEventListener('mouseenter', () => clearInterval(heroAutoplay));
    heroStage.addEventListener('mouseleave', heroResetAutoplay);
  }
}

if (galleryTabs.length) {
  renderGalleryTab(0);
}

if (testiTrack) {
  testiPerView = getTestimonialsPerView();
  renderTestimonialDots();
  testimonialGoTo(0);
  resetTestimonialsAutoplay();
  const testiWindow = document.querySelector('.testi-window');
  if (testiWindow) {
    testiWindow.addEventListener('mouseenter', () => clearInterval(testiAutoplay));
    testiWindow.addEventListener('mouseleave', resetTestimonialsAutoplay);
  }
}

updateNavState();

// BLOG DETAILS
const blogPosts = {
  'ayurveda-digestion': {
    cat: 'Ayurveda',
    title: '5 Daily Habits for Healthy Digestion According to Ayurveda',
    author: 'Vaidya J.P. Sharma, BAMS',
    date: 'March 2024',
    icon: 'ðŸŒ¿',
    content: `
      <h2>The Ayurvedic View of Digestion</h2>
      <p>In Ayurveda, strong digestion â€” known as "Agni" â€” is considered the foundation of all health. When your digestive fire burns well, nutrients are absorbed efficiently, toxins (Ama) don't accumulate, and disease is prevented at the source.</p>
      <h2>1. Start Your Day With Warm Water</h2>
      <p>Drinking 1-2 glasses of warm (not hot) water immediately upon waking activates the digestive system, flushes overnight toxins, and prepares the gut for the day ahead. Add a squeeze of lemon for enhanced detoxifying effect.</p>
      <h2>2. Eat Your Largest Meal at Midday</h2>
      <p>Ayurveda aligns eating times with the sun's cycle. Digestive capacity (Agni) peaks at noon when the sun is at its highest. Make lunch your main meal. Eat a light dinner at least 3 hours before sleeping.</p>
      <h2>3. Avoid Ice-Cold Drinks and Food</h2>
      <p>Cold beverages and food "douse" the digestive fire according to Ayurvedic theory â€” a concept now supported by research showing cold impairs gastric enzyme activity. Prefer room temperature or warm beverages, especially during meals.</p>
      <h2>4. Practice Mindful Eating</h2>
      <p>Sit while eating. Eat without distractions. Chew each bite 20-30 times. The digestive process begins in the mouth â€” thorough chewing significantly improves nutrient absorption and reduces bloating.</p>
      <h2>5. Use Digestive Spices Daily</h2>
      <p>Ginger, cumin, coriander, fennel and turmeric are powerful digestive aids. Add them generously to cooking. Fennel seeds after meals help reduce gas and bloating effectively.</p>
      <ul>
        <li>Ginger â€” stimulates digestive enzymes</li>
        <li>Cumin â€” reduces gas and bloating</li>
        <li>Turmeric â€” anti-inflammatory gut support</li>
        <li>Fennel â€” carminative, reduces discomfort after meals</li>
      </ul>
      <h2>When to Seek Expert Help</h2>
      <p>If digestive issues persist despite these lifestyle changes, or if you experience symptoms like blood in stool, unexplained weight loss, or severe abdominal pain, please visit Akshat Hospital immediately for evaluation. Call us at 8432127462.</p>
    `
  },
  'back-pain': {
    cat: 'Physiotherapy',
    title: "Don't Ignore Back Pain: When to See a Physiotherapist",
    author: 'Dr. Gaurav Sharma, Physiotherapist',
    date: 'February 2024',
    icon: 'ðŸ¤¸',
    content: `
      <h2>How Common is Back Pain?</h2>
      <p>Back pain is one of the leading causes of disability worldwide, affecting up to 80% of adults at some point in their lives. Yet many people either ignore it or self-medicate, allowing a manageable condition to become chronic.</p>
      <h2>Warning Signs That Need Immediate Attention</h2>
      <ul>
        <li>Pain that radiates down one or both legs (sciatica)</li>
        <li>Numbness or tingling in legs or feet</li>
        <li>Weakness in the legs</li>
        <li>Pain that wakes you from sleep</li>
        <li>Back pain with fever or unexplained weight loss</li>
        <li>Loss of bladder or bowel control</li>
      </ul>
      <h2>The Role of Physiotherapy</h2>
      <p>Physiotherapy is the gold standard treatment for most mechanical back pain. A qualified physiotherapist identifies the specific cause â€” muscle imbalance, disc problem, poor posture, joint dysfunction â€” and creates a targeted rehabilitation program.</p>
      <h2>Our Physiotherapy Approach at Akshat Hospital</h2>
      <p>Dr. Gaurav Sharma provides comprehensive physiotherapy from 7:30 AM to 2:00 PM and 5:00 PM to 9:00 PM â€” one of the most accessible physiotherapy schedules in Gangapur City. Treatment includes manual therapy, therapeutic exercises, electrotherapy, and postural correction.</p>
      <h2>Prevention is Better Than Cure</h2>
      <p>Regular core strengthening exercises, ergonomic workstation setup, maintaining healthy weight, and avoiding prolonged sitting are the most effective preventive measures for back pain.</p>
    `
  },
  'psoriasis': {
    cat: 'Skin Health',
    title: 'Understanding Psoriasis: Causes, Triggers & Effective Treatments',
    author: 'Dr. K.K. Vaishnav, MD Dermatology',
    date: 'January 2024',
    icon: 'â˜€ï¸',
    content: `
      <h2>What is Psoriasis?</h2>
      <p>Psoriasis is a chronic autoimmune skin condition that speeds up the life cycle of skin cells. This causes cells to build up rapidly on the surface of the skin, forming scales and red patches that can be itchy and sometimes painful.</p>
      <h2>Common Triggers</h2>
      <ul>
        <li>Stress â€” one of the most common and significant triggers</li>
        <li>Certain medications (lithium, beta-blockers, antimalarials)</li>
        <li>Infections, particularly streptococcal throat infections</li>
        <li>Injury to skin â€” cuts, burns, insect bites</li>
        <li>Smoking and heavy alcohol consumption</li>
        <li>Extreme cold weather and low humidity</li>
      </ul>
      <h2>Modern Dermatological Treatments</h2>
      <p>Current treatments include topical corticosteroids, vitamin D analogues, retinoids, and for severe cases, systemic medications and biologics. The goal is to reduce inflammation and slow skin cell turnover.</p>
      <h2>Ayurvedic Perspective and Integrated Approach</h2>
      <p>In Ayurveda, psoriasis is classified under "Kushtha Roga" and is associated with Vata-Kapha imbalance. Panchkarma therapies â€” particularly Vamana and Virechana â€” combined with Takradhara (medicated buttermilk treatment) have shown significant results in managing psoriasis.</p>
      <p>At Akshat Hospital, we combine modern dermatological treatments with traditional Ayurvedic protocols under Dr. K.K. Vaishnav's supervision for comprehensive psoriasis management.</p>
      <h2>Consultation Hours</h2>
      <p>Dr. Vaishnav is available Monday to Saturday, 10:00 AM to 2:00 PM. Call 8432127462 to book a consultation.</p>
    `
  },
  'dengue': {
    cat: 'General Health',
    title: 'Dengue: Symptoms, Warning Signs & When to Rush to Hospital',
    author: 'Dr. R.M. Meena, MBBS MD',
    date: 'December 2023',
    icon: 'ðŸ©º',
    content: `
      <h2>What is Dengue Fever?</h2>
      <p>Dengue fever is a mosquito-borne viral infection transmitted by the Aedes aegypti mosquito. It is prevalent in tropical and subtropical regions, including Rajasthan, particularly during and after the monsoon season.</p>
      <h2>Classic Symptoms (Days 1â€“3)</h2>
      <ul>
        <li>Sudden high fever (39â€“40Â°C / 102â€“104Â°F)</li>
        <li>Severe headache, especially behind the eyes</li>
        <li>Joint and muscle pain ("breakbone fever")</li>
        <li>Skin rash appearing 2â€“5 days after fever onset</li>
        <li>Mild bleeding from gums or nose</li>
      </ul>
      <h2>Warning Signs â€” Come to Hospital Immediately</h2>
      <ul>
        <li>Severe abdominal pain or tenderness</li>
        <li>Persistent vomiting (3+ times in 24 hours)</li>
        <li>Bleeding from gums, nose, or in vomit/stool</li>
        <li>Rapid breathing, fatigue, restlessness</li>
        <li>Blood in urine (dark or tea-coloured urine)</li>
        <li>Pale, cold, clammy skin</li>
      </ul>
      <h2>Diagnosis at Akshat Hospital</h2>
      <p>Our in-house lab provides rapid NS1 antigen tests for early dengue detection and complete blood counts (CBC) for monitoring platelet levels â€” both available with same-day results.</p>
      <h2>Treatment and Prevention</h2>
      <p>There is no specific antiviral treatment for dengue. Management focuses on hydration, rest, and monitoring for complications. Aspirin and ibuprofen should be strictly avoided. Paracetamol is safe for fever control. Eliminate standing water around your home to reduce mosquito breeding.</p>
    `
  },
  'janu-basti': {
    cat: 'Ayurveda',
    title: 'Janu Basti Therapy: The Ayurvedic Solution for Knee Pain',
    author: 'Vaidya J.P. Sharma, BAMS',
    date: 'November 2023',
    icon: 'ðŸ¦µ',
    content: `
      <h2>What is Janu Basti?</h2>
      <p>Janu Basti is a specialised Ayurvedic treatment where warm medicated oil is retained over the knee joint within a dough ring (made from black gram flour). "Janu" means knee and "Basti" means to hold or contain.</p>
      <h2>Conditions Treated Effectively</h2>
      <ul>
        <li>Osteoarthritis of the knee</li>
        <li>Chronic knee pain and stiffness</li>
        <li>Cartilage degeneration</li>
        <li>Ligament and meniscus injuries</li>
        <li>Post-surgical knee rehabilitation</li>
        <li>Vata-dominant joint disorders</li>
      </ul>
      <h2>The Procedure</h2>
      <p>The patient lies comfortably while a dough ring is fixed around the knee. Warm medicated oil â€” typically Mahanarayan tail or Ksheerabala â€” is carefully poured and maintained at a specific temperature for 30â€“45 minutes. The oil is periodically reheated and recirculated to maintain temperature.</p>
      <h2>Duration and Results</h2>
      <p>A typical course consists of 7â€“14 sessions conducted daily or on alternate days. Most patients report significant reduction in pain and improved mobility after the first 5 sessions. Complete courses typically eliminate chronic pain in 80% of cases without any side effects.</p>
      <h2>Why Choose Ayurveda Over Surgery?</h2>
      <p>Many patients facing knee replacement surgery have successfully avoided it through regular Janu Basti therapy combined with Ayurvedic oral medications and lifestyle modifications. It is always worth exploring conservative Ayurvedic options before considering surgery.</p>
    `
  },
  'stroke-rehab': {
    cat: 'Physiotherapy',
    title: 'Post-Stroke Rehabilitation: The Critical First 90 Days',
    author: 'Dr. Gaurav Sharma, Physiotherapist',
    date: 'October 2023',
    icon: 'ðŸŒ¡ï¸',
    content: `
      <h2>Why the First 90 Days Matter Most</h2>
      <p>The brain has remarkable plasticity â€” particularly in the acute phase after stroke. The first 90 days represent a critical window where intensive, structured rehabilitation can dramatically improve recovery outcomes. Research shows that early rehabilitation significantly improves both the speed and extent of neurological recovery.</p>
      <h2>What to Expect in the First Week</h2>
      <p>Physiotherapy should begin within 24â€“48 hours of stroke stabilisation, focusing on passive range-of-motion exercises, positioning, and preventing complications like pressure sores, contractures, and deep vein thrombosis.</p>
      <h2>Weeks 2â€“6: Active Recovery</h2>
      <ul>
        <li>Standing and weight-bearing training</li>
        <li>Gait re-education and walking practice</li>
        <li>Upper limb functional rehabilitation</li>
        <li>Balance and coordination training</li>
        <li>Activities of daily living (ADL) training</li>
      </ul>
      <h2>Months 2â€“3: Functional Independence</h2>
      <p>The goal of this phase is maximising functional independence. This includes advanced gait training, stair climbing, community mobility, and return to meaningful activities. Family education is essential during this phase.</p>
      <h2>Our Paralysis Rehabilitation Programme</h2>
      <p>Dr. Gaurav Sharma provides structured stroke rehabilitation at Akshat Hospital. Our programme combines physiotherapy with Ayurvedic treatments (Panchkarma) for comprehensive neurological recovery. Sessions available 7:30 AM â€“ 2:00 PM and 5:00 PM â€“ 9:00 PM daily.</p>
    `
  }
};

function showBlogDetail(slug) {
  const post = blogPosts[slug];
  if (!post) return;
  document.getElementById('blogDetailContent').innerHTML = `
    <div class="blog-detail-cat">${post.cat}</div>
    <h1>${post.title}</h1>
    <div class="blog-detail-meta">
      <span>By ${post.author}</span>
      <span>Â·</span>
      <span>${post.date}</span>
    </div>
    <div class="blog-detail-img">${post.icon}</div>
    <div class="blog-content">${post.content}</div>
    <div style="margin-top:40px;padding:24px;background:var(--cream);border-radius:16px;border:1px solid var(--border)">
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;color:var(--g1);margin-bottom:8px">Have questions? Talk to our doctors.</div>
      <p style="color:var(--mid);font-size:.9rem;margin-bottom:14px">Call us for a consultation or walk in â€” we are always open.</p>
      <a href="tel:8432127462" class="btn-fill" style="display:inline-flex">ðŸ“ž Call: 8432127462</a>
    </div>
  `;
  showPage('blog-detail');
}

// SCROLL REVEAL ANIMATION
document.addEventListener("DOMContentLoaded", function() {
  const elementsToReveal = document.querySelectorAll(`
    .sec-head, 
    .serv-card, 
    .why-card, 
    .home-doctor-card, 
    .ayurveda-layout > div, 
    .ayurveda-rating-card,
    .quick-item,
    .blog-card,
    .about-grid > div,
    .value-card,
    .contact-info-item,
    .map-box,
    .form-card
  `);
  
  elementsToReveal.forEach((el, index) => {
    el.classList.add('reveal');
    if (el.classList.contains('serv-card') || el.classList.contains('why-card') || el.classList.contains('quick-item') || el.classList.contains('home-doctor-card') || el.classList.contains('value-card') || el.classList.contains('blog-card')) {
      const delay = (index % 4) + 1;
      el.classList.add('reveal-delay-' + delay);
    }
  });

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  document.querySelectorAll(".reveal").forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
});
