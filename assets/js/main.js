// ── PAGE ROUTING ──
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + name);
  if (el) { el.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
}
function setActive(el) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
  return false;
}

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── QR CHIP SELECT ──
document.querySelectorAll('.qb-chip').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('.qb-chip').forEach(x => x.classList.remove('sel'));
    c.classList.add('sel');
  });
});

// ── CAROUSEL ──
let carIdx = 0;
const track = document.getElementById('revTrack');
const cards = track ? track.querySelectorAll('.rev-card') : [];
const totalSlides = cards.length;
let slidesPerView = window.innerWidth < 768 ? 1 : 2;

function buildDots() {
  const container = document.getElementById('carDots');
  if (!container) return;
  container.innerHTML = '';
  const numDots = Math.ceil(totalSlides / slidesPerView);
  for (let i = 0; i < numDots; i++) {
    const d = document.createElement('div');
    d.className = 'c-dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    container.appendChild(d);
  }
}

function goTo(idx) {
  const numDots = Math.ceil(totalSlides / slidesPerView);
  carIdx = Math.max(0, Math.min(idx, numDots - 1));
  if (!track) return;
  const cardW = track.querySelector('.rev-card')?.offsetWidth + 20 || 0;
  track.style.transform = `translateX(-${carIdx * slidesPerView * cardW}px)`;
  document.querySelectorAll('.c-dot').forEach((d,i) => d.classList.toggle('active', i === carIdx));
}

function moveCarousel(dir) { goTo(carIdx + dir); }

window.addEventListener('resize', () => {
  slidesPerView = window.innerWidth < 768 ? 1 : 2;
  buildDots(); goTo(0);
});

buildDots();

// Auto-play
setInterval(() => {
  const numDots = Math.ceil(totalSlides / slidesPerView);
  goTo((carIdx + 1) % numDots);
}, 5000);

// ── BLOG DETAILS ──
const blogPosts = {
  'ayurveda-digestion': {
    cat: 'Ayurveda',
    title: '5 Daily Habits for Healthy Digestion According to Ayurveda',
    author: 'Vaidya J.P. Sharma, BAMS',
    date: 'March 2024',
    icon: '🌿',
    content: `
      <h2>The Ayurvedic View of Digestion</h2>
      <p>In Ayurveda, strong digestion — known as "Agni" — is considered the foundation of all health. When your digestive fire burns well, nutrients are absorbed efficiently, toxins (Ama) don't accumulate, and disease is prevented at the source.</p>
      <h2>1. Start Your Day With Warm Water</h2>
      <p>Drinking 1-2 glasses of warm (not hot) water immediately upon waking activates the digestive system, flushes overnight toxins, and prepares the gut for the day ahead. Add a squeeze of lemon for enhanced detoxifying effect.</p>
      <h2>2. Eat Your Largest Meal at Midday</h2>
      <p>Ayurveda aligns eating times with the sun's cycle. Digestive capacity (Agni) peaks at noon when the sun is at its highest. Make lunch your main meal. Eat a light dinner at least 3 hours before sleeping.</p>
      <h2>3. Avoid Ice-Cold Drinks and Food</h2>
      <p>Cold beverages and food "douse" the digestive fire according to Ayurvedic theory — a concept now supported by research showing cold impairs gastric enzyme activity. Prefer room temperature or warm beverages, especially during meals.</p>
      <h2>4. Practice Mindful Eating</h2>
      <p>Sit while eating. Eat without distractions. Chew each bite 20-30 times. The digestive process begins in the mouth — thorough chewing significantly improves nutrient absorption and reduces bloating.</p>
      <h2>5. Use Digestive Spices Daily</h2>
      <p>Ginger, cumin, coriander, fennel and turmeric are powerful digestive aids. Add them generously to cooking. Fennel seeds after meals help reduce gas and bloating effectively.</p>
      <ul>
        <li>Ginger — stimulates digestive enzymes</li>
        <li>Cumin — reduces gas and bloating</li>
        <li>Turmeric — anti-inflammatory gut support</li>
        <li>Fennel — carminative, reduces discomfort after meals</li>
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
    icon: '🤸',
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
      <p>Physiotherapy is the gold standard treatment for most mechanical back pain. A qualified physiotherapist identifies the specific cause — muscle imbalance, disc problem, poor posture, joint dysfunction — and creates a targeted rehabilitation program.</p>
      <h2>Our Physiotherapy Approach at Akshat Hospital</h2>
      <p>Dr. Gaurav Sharma provides comprehensive physiotherapy from 7:30 AM to 2:00 PM and 5:00 PM to 9:00 PM — one of the most accessible physiotherapy schedules in Gangapur City. Treatment includes manual therapy, therapeutic exercises, electrotherapy, and postural correction.</p>
      <h2>Prevention is Better Than Cure</h2>
      <p>Regular core strengthening exercises, ergonomic workstation setup, maintaining healthy weight, and avoiding prolonged sitting are the most effective preventive measures for back pain.</p>
    `
  },
  'psoriasis': {
    cat: 'Skin Health',
    title: 'Understanding Psoriasis: Causes, Triggers & Effective Treatments',
    author: 'Dr. K.K. Vaishnav, MD Dermatology',
    date: 'January 2024',
    icon: '☀️',
    content: `
      <h2>What is Psoriasis?</h2>
      <p>Psoriasis is a chronic autoimmune skin condition that speeds up the life cycle of skin cells. This causes cells to build up rapidly on the surface of the skin, forming scales and red patches that can be itchy and sometimes painful.</p>
      <h2>Common Triggers</h2>
      <ul>
        <li>Stress — one of the most common and significant triggers</li>
        <li>Certain medications (lithium, beta-blockers, antimalarials)</li>
        <li>Infections, particularly streptococcal throat infections</li>
        <li>Injury to skin — cuts, burns, insect bites</li>
        <li>Smoking and heavy alcohol consumption</li>
        <li>Extreme cold weather and low humidity</li>
      </ul>
      <h2>Modern Dermatological Treatments</h2>
      <p>Current treatments include topical corticosteroids, vitamin D analogues, retinoids, and for severe cases, systemic medications and biologics. The goal is to reduce inflammation and slow skin cell turnover.</p>
      <h2>Ayurvedic Perspective and Integrated Approach</h2>
      <p>In Ayurveda, psoriasis is classified under "Kushtha Roga" and is associated with Vata-Kapha imbalance. Panchkarma therapies — particularly Vamana and Virechana — combined with Takradhara (medicated buttermilk treatment) have shown significant results in managing psoriasis.</p>
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
    icon: '🩺',
    content: `
      <h2>What is Dengue Fever?</h2>
      <p>Dengue fever is a mosquito-borne viral infection transmitted by the Aedes aegypti mosquito. It is prevalent in tropical and subtropical regions, including Rajasthan, particularly during and after the monsoon season.</p>
      <h2>Classic Symptoms (Days 1–3)</h2>
      <ul>
        <li>Sudden high fever (39–40°C / 102–104°F)</li>
        <li>Severe headache, especially behind the eyes</li>
        <li>Joint and muscle pain ("breakbone fever")</li>
        <li>Skin rash appearing 2–5 days after fever onset</li>
        <li>Mild bleeding from gums or nose</li>
      </ul>
      <h2>Warning Signs — Come to Hospital Immediately</h2>
      <ul>
        <li>Severe abdominal pain or tenderness</li>
        <li>Persistent vomiting (3+ times in 24 hours)</li>
        <li>Bleeding from gums, nose, or in vomit/stool</li>
        <li>Rapid breathing, fatigue, restlessness</li>
        <li>Blood in urine (dark or tea-coloured urine)</li>
        <li>Pale, cold, clammy skin</li>
      </ul>
      <h2>Diagnosis at Akshat Hospital</h2>
      <p>Our in-house lab provides rapid NS1 antigen tests for early dengue detection and complete blood counts (CBC) for monitoring platelet levels — both available with same-day results.</p>
      <h2>Treatment and Prevention</h2>
      <p>There is no specific antiviral treatment for dengue. Management focuses on hydration, rest, and monitoring for complications. Aspirin and ibuprofen should be strictly avoided. Paracetamol is safe for fever control. Eliminate standing water around your home to reduce mosquito breeding.</p>
    `
  },
  'janu-basti': {
    cat: 'Ayurveda',
    title: 'Janu Basti Therapy: The Ayurvedic Solution for Knee Pain',
    author: 'Vaidya J.P. Sharma, BAMS',
    date: 'November 2023',
    icon: '🦵',
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
      <p>The patient lies comfortably while a dough ring is fixed around the knee. Warm medicated oil — typically Mahanarayan tail or Ksheerabala — is carefully poured and maintained at a specific temperature for 30–45 minutes. The oil is periodically reheated and recirculated to maintain temperature.</p>
      <h2>Duration and Results</h2>
      <p>A typical course consists of 7–14 sessions conducted daily or on alternate days. Most patients report significant reduction in pain and improved mobility after the first 5 sessions. Complete courses typically eliminate chronic pain in 80% of cases without any side effects.</p>
      <h2>Why Choose Ayurveda Over Surgery?</h2>
      <p>Many patients facing knee replacement surgery have successfully avoided it through regular Janu Basti therapy combined with Ayurvedic oral medications and lifestyle modifications. It is always worth exploring conservative Ayurvedic options before considering surgery.</p>
    `
  },
  'stroke-rehab': {
    cat: 'Physiotherapy',
    title: 'Post-Stroke Rehabilitation: The Critical First 90 Days',
    author: 'Dr. Gaurav Sharma, Physiotherapist',
    date: 'October 2023',
    icon: '🌡️',
    content: `
      <h2>Why the First 90 Days Matter Most</h2>
      <p>The brain has remarkable plasticity — particularly in the acute phase after stroke. The first 90 days represent a critical window where intensive, structured rehabilitation can dramatically improve recovery outcomes. Research shows that early rehabilitation significantly improves both the speed and extent of neurological recovery.</p>
      <h2>What to Expect in the First Week</h2>
      <p>Physiotherapy should begin within 24–48 hours of stroke stabilisation, focusing on passive range-of-motion exercises, positioning, and preventing complications like pressure sores, contractures, and deep vein thrombosis.</p>
      <h2>Weeks 2–6: Active Recovery</h2>
      <ul>
        <li>Standing and weight-bearing training</li>
        <li>Gait re-education and walking practice</li>
        <li>Upper limb functional rehabilitation</li>
        <li>Balance and coordination training</li>
        <li>Activities of daily living (ADL) training</li>
      </ul>
      <h2>Months 2–3: Functional Independence</h2>
      <p>The goal of this phase is maximising functional independence. This includes advanced gait training, stair climbing, community mobility, and return to meaningful activities. Family education is essential during this phase.</p>
      <h2>Our Paralysis Rehabilitation Programme</h2>
      <p>Dr. Gaurav Sharma provides structured stroke rehabilitation at Akshat Hospital. Our programme combines physiotherapy with Ayurvedic treatments (Panchkarma) for comprehensive neurological recovery. Sessions available 7:30 AM – 2:00 PM and 5:00 PM – 9:00 PM daily.</p>
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
      <span>·</span>
      <span>${post.date}</span>
    </div>
    <div class="blog-detail-img">${post.icon}</div>
    <div class="blog-content">${post.content}</div>
    <div style="margin-top:40px;padding:24px;background:var(--cream);border-radius:16px;border:1px solid var(--border)">
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;color:var(--g1);margin-bottom:8px">Have questions? Talk to our doctors.</div>
      <p style="color:var(--mid);font-size:.9rem;margin-bottom:14px">Call us for a consultation or walk in — we are always open.</p>
      <a href="tel:8432127462" class="btn-fill" style="display:inline-flex">📞 Call: 8432127462</a>
    </div>
  `;
  showPage('blog-detail');
}
