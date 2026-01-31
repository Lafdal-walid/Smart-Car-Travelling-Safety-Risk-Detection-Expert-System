function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) modal.classList.add('show');
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) modal.classList.remove('show');
}

async function generateAssessment() {
    document.getElementById('loading').classList.add('show');
    document.getElementById('results').classList.remove('show');

    const facts = {};
    const fields = [
        // حقائق السيارة
        'oil_level', 'water_level', 'engine_temp', 'tire_condition',
        'brakes_noise', 'fuel_level', 'km_since_oil',
        // حقائق السائق
        'driver_age', 'vision_quality', 'sleep_hours', 'eyes_red',
        'felt_sleepy', 'medication_drowsy', 'phone_usage',
        'yesterday_drive', 'night_drive', 'caffeine_last2h',
        // حقائق خارجية
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
            throw new Error('فشل في الاتصال بالخادم');
        }

        const result = await response.json();
        displayResults(result);

        document.getElementById('loading').classList.remove('show');
        document.getElementById('results').classList.add('show');

    } catch (error) {
        console.error('Error:', error);
        const mockResponse = simulateRiskAssessment(facts);
        displayResults(mockResponse);

        document.getElementById('loading').classList.remove('show');
        document.getElementById('results').classList.add('show');
    }
}

function simulateRiskAssessment(facts) {
    const num = (v) => (v === '' || v === undefined) ? undefined : Number(v);
    const riskRules = [
        // R1–R7: حقائق السائق / التعب
        { condition: () => num(facts.sleep_hours) !== undefined && num(facts.sleep_hours) < 4, score: 3, msg: "R1: الحرمان من النوم يدل على التعب الخطير" },
        { condition: () => facts.eyes_red === 'yes', score: 2, msg: "R2: احمرار أو تدلي العيون يدل على التعب" },
        { condition: () => facts.felt_sleepy === 'yes', score: 2, msg: "R3: السائق يبلغ عن الشعور بالنعاس" },
        { condition: () => facts.medication_drowsy === 'yes', score: 2, msg: "R4: الأدوية قد تقلل اليقظة" },
        { condition: () => num(facts.yesterday_drive) !== undefined && num(facts.yesterday_drive) > 6, score: 2, msg: "R5: القيادة الطويلة بالأمس تزيد التعب" },
        { condition: () => facts.night_drive === 'yes', score: 2, msg: "R6: القيادة الليلية تقلل اليقظة" },
        { condition: () => facts.caffeine_last2h === 'no' && (facts.felt_sleepy === 'yes' || num(facts.sleep_hours) < 6), score: 1, msg: "R7: عدم تناول الكافيين قد يقلل اليقظة" },
        // R8–R14: حقائق السيارة
        { condition: () => num(facts.oil_level) !== undefined && num(facts.oil_level) < 25, score: 3, msg: "R8: انخفاض الزيت يزيد من خطر تلف المحرك" },
        { condition: () => num(facts.water_level) !== undefined && num(facts.water_level) < 30, score: 2, msg: "R9: انخفاض السائل التبريد يزيد من خطر ارتفاع الحرارة" },
        { condition: () => num(facts.engine_temp) !== undefined && num(facts.engine_temp) > 95, score: 3, msg: "R10: ارتفاع درجة الحرارة يدل على ارتفاع حرارة المحرك" },
        { condition: () => facts.tire_condition === 'worn', score: 2, msg: "R11: حالة الإطارات السيئة تؤثر على السلامة" },
        { condition: () => facts.tire_condition === 'bad', score: 3, msg: "R11: حالة الإطارات السيئة تؤثر على السلامة" },
        { condition: () => facts.brakes_noise === 'yes', score: 3, msg: "R12: ضوضاء الفرامل تدل على مشاكل في الفرامل" },
        { condition: () => num(facts.fuel_level) !== undefined && num(facts.fuel_level) < 15, score: 1, msg: "R13: وقود منخفض قد يسبب توقفاً مفاجئاً" },
        { condition: () => num(facts.km_since_oil) !== undefined && num(facts.km_since_oil) > 8000, score: 1, msg: "R14: تغيير الزيت متأخر" },
        // R15–R19: حقائق خارجية
        { condition: () => facts.weather === 'rain', score: 2, msg: "R15: المطر يقلل من الرؤية" },
        { condition: () => facts.weather === 'fog', score: 3, msg: "R16: الضباب يقلل بشدة من الرؤية" },
        { condition: () => facts.road_type === 'mountain', score: 2, msg: "R18: الطرق الجبلية تزيد من الخطر" },
        { condition: () => facts.road_type === 'bad', score: 2, msg: "R19: الطريق التالف يزيد من المخاطر" },
        // R25–R28: السائق
        { condition: () => facts.phone_usage === 'yes', score: 3, msg: "R25: استخدام الهاتف أثناء القيادة خطير جداً" },
        { condition: () => num(facts.driver_age) > 60, score: 1, msg: "R27: العمر المتقدم يزيد من مخاطر القيادة" },
        { condition: () => facts.vision_quality === 'poor', score: 2, msg: "R28: ضعف الرؤية يزيد من مخاطر القيادة" }
    ];

    const explanations = [];
    let riskScore = 0;

    riskRules.forEach(rule => {
        if (rule.condition()) {
            riskScore += rule.score;
            explanations.push(rule.msg);
        }
    });

    const riskLevel = riskScore >= 8 ? 'high' : riskScore >= 4 ? 'medium' : 'low';
    const recommendations = {
        'high': 'توقف فوراً عن القيادة. المخاطر عالية جداً وتعرض حياتك وحياة الآخرين للخطر.',
        'medium': 'خذ قسطاً من الراحة قبل القيادة. الحالة تتطلب الحذر.',
        'low': 'يمكنك متابعة القيادة بحذر. الحالة مقبولة.'
    };

    return {
        risk_level: riskLevel,
        risk_explanations: explanations,
        recommendation: recommendations[riskLevel]
    };
}

function displayResults(results) {
    if (!results || !results.risk_level) {
        results = { risk_level: 'low', risk_explanations: [], recommendation: 'لم يتم تحديد النتيجة.' };
    }
    const riskText = {
        'high': 'مرتفع',
        'medium': 'متوسط',
        'low': 'منخفض'
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
