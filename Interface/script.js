// ============================================
// CARAWARE - Language & UI Controller
// ============================================

// Current language state
let currentLang = 'ar';

// Translations
const translations = {
    ar: {
        // Header
        title: 'نظام تقييم مخاطر القيادة',
        subtitle: 'أدخل المعاملات للحصول على مستوى المخاطر والتوصيات',
        
        // Cards
        external_facts: 'حقائق خارجية',
        driver_facts: 'حقائق السائق',
        car_facts: 'حقائق السيارة',
        click_to_enter: 'اضغط للإدخال',
        
        // Buttons
        assess_btn: 'نتائج التقييم',
        loading: 'جاري تحليل البيانات...',
        
        // Results
        risk_level: 'مستوى المخاطر:',
        recommendation: 'التوصية',
        precaution: 'يمكنك متابعة القيادة مع الحذر.',
        explanation: 'الشرح',
        
        // Risk levels
        risk_high: 'مرتفع',
        risk_medium: 'متوسط',
        risk_low: 'منخفض',
        
        // Common
        select: 'اختر...',
        yes: 'نعم',
        no: 'لا',
        good: 'جيدة',
        medium: 'متوسطة',
        poor: 'ضعيفة',
        low: 'منخفضة',
        high: 'عالية',
        worn: 'متآكلة',
        bad: 'سيئة',
        
        // External facts
        weather: 'الطقس',
        clear: 'صافي',
        rain: 'مطر',
        fog: 'ضباب',
        wind: 'رياح',
        snow: 'ثلج',
        road_type: 'نوع الطريق',
        highway: 'طريق سريع',
        city: 'مدينة',
        mountain: 'جبلي',
        bad_road: 'سيء',
        rural: 'ريفي',
        traffic_density: 'كثافة المرور',
        time_of_day: 'وقت اليوم',
        morning: 'صباح',
        afternoon: 'بعد الظهر',
        evening: 'مساء',
        night: 'ليل',
        
        // Driver facts
        driver_age: 'عمر السائق',
        vision_quality: 'جودة الرؤية',
        sleep_hours: 'ساعات النوم',
        eyes_red: 'احمرار العيون',
        felt_sleepy: 'شعور بالنعاس',
        medication_drowsy: 'أدوية تسبب النعاس',
        phone_usage: 'استخدام الهاتف',
        yesterday_drive: 'ساعات القيادة بالأمس',
        night_drive: 'قيادة ليلية',
        caffeine_last2h: 'كافيين في الساعتين الماضيتين',
        
        // Car facts
        oil_level: 'مستوى الزيت (%)',
        water_level: 'مستوى الماء (%)',
        engine_temp: 'درجة حرارة المحرك (C°)',
        tire_condition: 'حالة الإطارات',
        brakes_noise: 'ضوضاء الفرامل',
        fuel_level: 'مستوى الوقود (%)',
        km_since_oil: 'الكيلومترات منذ تغيير الزيت',
        
        // Placeholders
        example_7: 'مثال: 7',
        example_4: 'مثال: 4',
        example_5000: 'مثال: 5000',
        
        // Recommendations
        rec_high: 'توقف فوراً عن القيادة. المخاطر عالية جداً وتعرض حياتك وحياة الآخرين للخطر.',
        rec_medium: 'خذ قسطاً من الراحة قبل القيادة. الحالة تتطلب الحذر.',
        rec_low: 'يمكنك متابعة القيادة بحذر. الحالة مقبولة.',
        
        // Risk explanations
        R1: 'R1: الحرمان من النوم يدل على التعب الخطير',
        R2: 'R2: احمرار أو تدلي العيون يدل على التعب',
        R3: 'R3: السائق يبلغ عن الشعور بالنعاس',
        R4: 'R4: الأدوية قد تقلل اليقظة',
        R5: 'R5: القيادة الطويلة بالأمس تزيد التعب',
        R6: 'R6: القيادة الليلية تقلل اليقظة',
        R7: 'R7: عدم تناول الكافيين قد يقلل اليقظة',
        R8: 'R8: انخفاض الزيت يزيد من خطر تلف المحرك',
        R9: 'R9: انخفاض السائل التبريد يزيد من خطر ارتفاع الحرارة',
        R10: 'R10: ارتفاع درجة الحرارة يدل على ارتفاع حرارة المحرك',
        R11: 'R11: حالة الإطارات السيئة تؤثر على السلامة',
        R12: 'R12: ضوضاء الفرامل تدل على مشاكل في الفرامل',
        R13: 'R13: وقود منخفض قد يسبب توقفاً مفاجئاً',
        R14: 'R14: تغيير الزيت متأخر',
        R15: 'R15: المطر يقلل من الرؤية',
        R16: 'R16: الضباب يقلل بشدة من الرؤية',
        R18: 'R18: الطرق الجبلية تزيد من الخطر',
        R19: 'R19: الطريق التالف يزيد من المخاطر',
        R25: 'R25: استخدام الهاتف أثناء القيادة خطير جداً',
        R27: 'R27: العمر المتقدم يزيد من مخاطر القيادة',
        R28: 'R28: ضعف الرؤية يزيد من مخاطر القيادة',
        
        no_result: 'لم يتم تحديد النتيجة.'
    },
    en: {
        // Header
        title: 'Driving Risk Assessment',
        subtitle: 'Enter parameters to get risk level and recommendations',
        
        // Cards
        external_facts: 'External Facts',
        driver_facts: 'Driver Facts',
        car_facts: 'Car Facts',
        click_to_enter: 'Click to enter',
        
        // Buttons
        assess_btn: 'Assessment Results',
        loading: 'Analyzing data...',
        
        // Results
        risk_level: 'Risk Level:',
        recommendation: 'Recommendation',
        precaution: 'You may continue driving with caution.',
        explanation: 'Explanation',
        
        // Risk levels
        risk_high: 'High',
        risk_medium: 'Medium',
        risk_low: 'Low',
        
        // Common
        select: 'Select...',
        yes: 'Yes',
        no: 'No',
        good: 'Good',
        medium: 'Medium',
        poor: 'Poor',
        low: 'Low',
        high: 'High',
        worn: 'Worn',
        bad: 'Bad',
        
        // External facts
        weather: 'Weather',
        clear: 'Clear',
        rain: 'Rain',
        fog: 'Fog',
        wind: 'Wind',
        snow: 'Snow',
        road_type: 'Road Type',
        highway: 'Highway',
        city: 'City',
        mountain: 'Mountain',
        bad_road: 'Bad',
        rural: 'Rural',
        traffic_density: 'Traffic Density',
        time_of_day: 'Time of Day',
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening',
        night: 'Night',
        
        // Driver facts
        driver_age: 'Driver Age',
        vision_quality: 'Vision Quality',
        sleep_hours: 'Sleep Hours',
        eyes_red: 'Red Eyes',
        felt_sleepy: 'Feeling Sleepy',
        medication_drowsy: 'Drowsy Medication',
        phone_usage: 'Phone Usage',
        yesterday_drive: 'Hours Driven Yesterday',
        night_drive: 'Night Driving',
        caffeine_last2h: 'Caffeine in Last 2 Hours',
        
        // Car facts
        oil_level: 'Oil Level (%)',
        water_level: 'Water Level (%)',
        engine_temp: 'Engine Temperature (°C)',
        tire_condition: 'Tire Condition',
        brakes_noise: 'Brake Noise',
        fuel_level: 'Fuel Level (%)',
        km_since_oil: 'KM Since Oil Change',
        
        // Placeholders
        example_7: 'e.g. 7',
        example_4: 'e.g. 4',
        example_5000: 'e.g. 5000',
        
        // Recommendations
        rec_high: 'Stop driving immediately. Risk is too high and endangers your life and others.',
        rec_medium: 'Take a rest before driving. The situation requires caution.',
        rec_low: 'You may continue driving with caution. Conditions are acceptable.',
        
        // Risk explanations
        R1: 'R1: Sleep deprivation indicates serious fatigue',
        R2: 'R2: Red or droopy eyes indicate fatigue',
        R3: 'R3: Driver reports feeling sleepy',
        R4: 'R4: Medication may reduce alertness',
        R5: 'R5: Extended driving yesterday increases fatigue',
        R6: 'R6: Night driving reduces alertness',
        R7: 'R7: No caffeine may reduce alertness',
        R8: 'R8: Low oil increases engine damage risk',
        R9: 'R9: Low coolant increases overheating risk',
        R10: 'R10: High temperature indicates engine overheating',
        R11: 'R11: Poor tire condition affects safety',
        R12: 'R12: Brake noise indicates brake problems',
        R13: 'R13: Low fuel may cause sudden stop',
        R14: 'R14: Oil change is overdue',
        R15: 'R15: Rain reduces visibility',
        R16: 'R16: Fog severely reduces visibility',
        R18: 'R18: Mountain roads increase risk',
        R19: 'R19: Damaged road increases risks',
        R25: 'R25: Phone use while driving is very dangerous',
        R27: 'R27: Advanced age increases driving risks',
        R28: 'R28: Poor vision increases driving risks',
        
        no_result: 'No result determined.'
    }
};

// ============================================
// Language Functions
// ============================================

function setLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    
    // Update HTML attributes
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
        const key = el.getAttribute('data-placeholder-i18n');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    // Update page title
    document.title = lang === 'ar' 
        ? 'Caraware | نظام تقييم مخاطر القيادة'
        : 'Caraware | Driving Risk Assessment';
    
    // Store preference
    localStorage.setItem('caraware-lang', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('caraware-lang') || 'ar';
    setLanguage(savedLang);
});

// ============================================
// Modal Functions
// ============================================

function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        ['external', 'human', 'car'].forEach(type => closeModal(type));
    }
});

// ============================================
// Assessment Functions
// ============================================

async function generateAssessment() {
    document.getElementById('loading').classList.add('show');
    document.getElementById('results').classList.remove('show');

    const facts = {};
    const fields = [
        // Car facts
        'oil_level', 'water_level', 'engine_temp', 'tire_condition',
        'brakes_noise', 'fuel_level', 'km_since_oil',
        // Driver facts
        'driver_age', 'vision_quality', 'sleep_hours', 'eyes_red',
        'felt_sleepy', 'medication_drowsy', 'phone_usage',
        'yesterday_drive', 'night_drive', 'caffeine_last2h',
        // External facts
        'weather', 'road_type', 'traffic_density', 'time_of_day'
    ];

    fields.forEach(field => {
        const el = document.getElementById(field);
        if (el) {
            const value = el.value;
            if (value) facts[field] = value;
        }
    });

    try {
        const response = await fetch('/api/assess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ facts: facts })
        });

        if (!response.ok) {
            throw new Error('Server connection failed');
        }

        const result = await response.json();
        displayResults(result);

    } catch (error) {
        console.error('Error:', error);
        const mockResponse = simulateRiskAssessment(facts);
        displayResults(mockResponse);
    }

    document.getElementById('loading').classList.remove('show');
    document.getElementById('results').classList.add('show');
}

function simulateRiskAssessment(facts) {
    const t = translations[currentLang];
    const num = (v) => (v === '' || v === undefined) ? undefined : Number(v);
    
    const riskRules = [
        // R1–R7: Driver / Fatigue facts
        { condition: () => num(facts.sleep_hours) !== undefined && num(facts.sleep_hours) < 4, score: 3, key: 'R1' },
        { condition: () => facts.eyes_red === 'yes', score: 2, key: 'R2' },
        { condition: () => facts.felt_sleepy === 'yes', score: 2, key: 'R3' },
        { condition: () => facts.medication_drowsy === 'yes', score: 2, key: 'R4' },
        { condition: () => num(facts.yesterday_drive) !== undefined && num(facts.yesterday_drive) > 6, score: 2, key: 'R5' },
        { condition: () => facts.night_drive === 'yes', score: 2, key: 'R6' },
        { condition: () => facts.caffeine_last2h === 'no' && (facts.felt_sleepy === 'yes' || num(facts.sleep_hours) < 6), score: 1, key: 'R7' },
        // R8–R14: Car facts
        { condition: () => num(facts.oil_level) !== undefined && num(facts.oil_level) < 25, score: 3, key: 'R8' },
        { condition: () => num(facts.water_level) !== undefined && num(facts.water_level) < 30, score: 2, key: 'R9' },
        { condition: () => num(facts.engine_temp) !== undefined && num(facts.engine_temp) > 95, score: 3, key: 'R10' },
        { condition: () => facts.tire_condition === 'worn', score: 2, key: 'R11' },
        { condition: () => facts.tire_condition === 'bad', score: 3, key: 'R11' },
        { condition: () => facts.brakes_noise === 'yes', score: 3, key: 'R12' },
        { condition: () => num(facts.fuel_level) !== undefined && num(facts.fuel_level) < 15, score: 1, key: 'R13' },
        { condition: () => num(facts.km_since_oil) !== undefined && num(facts.km_since_oil) > 8000, score: 1, key: 'R14' },
        // R15–R19: External facts
        { condition: () => facts.weather === 'rain', score: 2, key: 'R15' },
        { condition: () => facts.weather === 'fog', score: 3, key: 'R16' },
        { condition: () => facts.road_type === 'mountain', score: 2, key: 'R18' },
        { condition: () => facts.road_type === 'bad', score: 2, key: 'R19' },
        // R25–R28: Driver
        { condition: () => facts.phone_usage === 'yes', score: 3, key: 'R25' },
        { condition: () => num(facts.driver_age) > 60, score: 1, key: 'R27' },
        { condition: () => facts.vision_quality === 'poor', score: 2, key: 'R28' }
    ];

    const explanations = [];
    let riskScore = 0;

    riskRules.forEach(rule => {
        if (rule.condition()) {
            riskScore += rule.score;
            explanations.push(t[rule.key]);
        }
    });

    const riskLevel = riskScore >= 8 ? 'high' : riskScore >= 4 ? 'medium' : 'low';
    const recommendations = {
        'high': t.rec_high,
        'medium': t.rec_medium,
        'low': t.rec_low
    };

    return {
        risk_level: riskLevel,
        risk_explanations: explanations,
        recommendation: recommendations[riskLevel]
    };
}

function displayResults(results) {
    const t = translations[currentLang];
    
    if (!results || !results.risk_level) {
        results = { risk_level: 'low', risk_explanations: [], recommendation: t.no_result };
    }
    
    const riskText = {
        'high': t.risk_high,
        'medium': t.risk_medium,
        'low': t.risk_low
    };

    document.getElementById('riskValue').textContent = riskText[results.risk_level] || results.risk_level;
    document.getElementById('riskLevel').className = `risk-level risk-${results.risk_level}`;
    document.getElementById('recommendationText').textContent = results.recommendation;

    const barFill = document.getElementById('riskBarFill');
    if (barFill) {
        barFill.className = `risk-bar-fill risk-${results.risk_level}`;
    }

    const explanationsList = document.getElementById('explanationsList');
    explanationsList.innerHTML = '';
    (results.risk_explanations || []).forEach(exp => {
        const li = document.createElement('li');
        li.textContent = exp;
        explanationsList.appendChild(li);
    });
}

// ============================================
// Keyboard Navigation
// ============================================

document.querySelectorAll('.small-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});
