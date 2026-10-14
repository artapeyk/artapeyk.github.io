/* ==================== منوی موبایل ==================== */
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // بستن منو با کلیک روی هر لینک
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

/* ==================== فرم رهگیری مرسوله ==================== */
const trackingForm = document.getElementById('trackingForm');
const trackingInput = document.getElementById('trackingInput');
const trackingResult = document.getElementById('trackingResult');

if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const code = trackingInput.value.trim();

        if (!code) {
            trackingResult.innerHTML =
                '<span style="color:#FFC107">⚠️ لطفاً کد رهگیری را وارد کنید</span>';
            return;
        }

        // نمایش حالت در حال بررسی
        trackingResult.innerHTML =
            '<span style="color:#FFC107">⏳ در حال بررسی...</span>';

        // شبیه‌سازی جستجو (بعداً می‌تونی به سیستم واقعی وصل کنی)
        setTimeout(() => {
            trackingResult.innerHTML = `
                <div style="background:rgba(255,193,7,0.15);padding:20px;border-radius:12px;text-align:right;margin-top:15px;">
                    <div style="color:#FFC107;font-weight:700;margin-bottom:10px;">📦 کد رهگیری: ${code}</div>
                    <div style="color:#fff;margin-bottom:8px;">وضعیت: <strong style="color:#FFC107">در حال ارسال</strong></div>
                    <div style="color:#fff;opacity:0.8;font-size:14px;">برای اطلاعات بیشتر با پشتیبانی تماس بگیرید</div>
                </div>
            `;
        }, 1000);
    });
}

/* ==================== انیمیشن اسکرول (نمایش تدریجی بخش‌ها) ==================== */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// اعمال انیمیشن روی کارت‌ها و بخش‌ها
document.querySelectorAll(
    '.service-card, .why-item, .stat-item, .contact-item'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ==================== فرم تماس (نمایش پیام موفقیت) ==================== */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = '✅ پیام شما ارسال شد';
        btn.style.background = '#28a745';
        btn.style.color = '#fff';

        contactForm.reset();

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    });
}

/* ==================== اسکرول نرم برای لینک‌های داخلی ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================== افکت هدر هنگام اسکرول ==================== */
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});