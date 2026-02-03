from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from risk_expert_system import RiskExpertSystem
from recommendation_expert_system import RecommendationExpertSystem
import os

app = Flask(__name__)
CORS(app)

# Initialize expert systems
risk_system = RiskExpertSystem()
rec_system = RecommendationExpertSystem()

# Arabic translations for rule explanations (risk_rules + recommendation_rules)
EXPLANATIONS_AR = {
    # Risk rules R1–R41
    "R1": "الحرمان من النوم يدل على التعب الخطير",
    "R2": "احمرار أو تدلي العيون يدل على التعب",
    "R3": "السائق يبلغ عن الشعور بالنعاس",
    "R4": "الأدوية قد تقلل اليقظة",
    "R5": "القيادة الطويلة بالأمس تزيد التعب",
    "R6": "القيادة الليلية تقلل اليقظة",
    "R7": "عدم تناول الكافيين قد يقلل اليقظة",
    "R8": "انخفاض الزيت يزيد من خطر تلف المحرك",
    "R9": "انخفاض السائل التبريد يزيد من خطر ارتفاع الحرارة",
    "R10": "ارتفاع درجة الحرارة يدل على ارتفاع حرارة المحرك",
    "R11": "حالة الإطارات السيئة تؤثر على السلامة",
    "R12": "ضوضاء الفرامل تدل على مشاكل في الفرامل",
    "R13": "وقود منخفض قد يسبب توقفاً مفاجئاً",
    "R14": "تغيير الزيت متأخر",
    "R15": "المطر يقلل من الرؤية",
    "R16": "الضباب يقلل بشدة من الرؤية",
    "R17": "الرياح قد تؤثر على الثبات",
    "R18": "الطرق الجبلية تزيد من الخطر",
    "R19": "الطريق التالف يزيد من المخاطر",
    "R20": "الطرق الرطبة تقلل التماسك",
    "R21": "المرور الكثيف يزيد الحاجة للانتباه",
    "R22": "أعمال الطريق تتطلب الحذر",
    "R23": "المسافات الطويلة تزيد التعب",
    "R24": "قلة محطات الوقود تزيد المخاطر",
    "R25": "استخدام الهاتف يزيد التشويش",
    "R26": "استخدام الشاشة يقلل التركيز",
    "R27": "كبار السن قد تكون ردود فعلهم أبطأ",
    "R28": "ضعف الرؤية يقلل السلامة",
    "R29": "التوتر يؤثر على التركيز",
    "R30": "عدم الأكل منذ فترة يقلل الطاقة",
    "R31": "التعب قد يسبب الحوادث",
    "R32": "خطر منخفض مع بعض التعب",
    "R33": "عدم وجود مخاطر كبيرة يعني أن الخطر النهائي منخفض",
    "R34": "إذا كان أي من المخاطر مرتفعاً فإن الخطر النهائي مرتفع",
    "R35": "خطران متوسطان يعنيان خطراً مرتفعاً",
    "R36": "خطران متوسطان يعنيان خطراً مرتفعاً",
    "R37": "خطران متوسطان يعنيان خطراً مرتفعاً",
    "R38": "خطر واحد متوسط والباقي منخفض يعني خطراً متوسطاً",
    "R39": "خطران مرتفعان يعنيان خطراً حرجاً",
    "R40": "خطران مرتفعان يعنيان خطراً حرجاً",
    "R41": "خطران مرتفعان يعنيان خطراً حرجاً",
    # Recommendation rules RR1–RR35
    "RR1": "الظروف غير آمنة لتشغيل المركبة",
    "RR2": "يجب على السائق التوقف فوراً",
    "RR3": "تم رصد خطر متوسط",
    "RR4": "الظروف طبيعية وآمنة",
    "RR5": "السائق يحتاج راحة",
    "RR6": "النعاس أثناء القيادة خطر",
    "RR7": "نوم غير كافٍ",
    "RR8": "انخفاض الطاقة يؤثر على اليقظة",
    "RR9": "كبار السن يتخذون احتياطات إضافية",
    "RR10": "الرؤية تؤثر على السلامة",
    "RR11": "منع تلف المحرك",
    "RR12": "يجب تصحيح انخفاض الزيت",
    "RR13": "صيانة مطلوبة",
    "RR14": "فحص الفرامل مطلوب",
    "RR15": "ضبط ضغط الإطارات",
    "RR16": "وقود منخفض",
    "RR17": "الطقس الرطب يتطلب قيادة أبطأ",
    "RR18": "الضباب يتطلب سلامة إضافية",
    "RR19": "الرياح تؤثر على التوجيه",
    "RR20": "استخدم غياراً منخفضاً في الجبال",
    "RR21": "الطرق السيئة تتطلب حذراً",
    "RR22": "الطرق الرطبة تزيد مسافة التوقف",
    "RR23": "المرور الكثيف يتطلب انتباهاً",
    "RR24": "الالتزام بلافتات الأشغال",
    "RR25": "إلغاء التشويش",
    "RR26": "تقليل التشويش البصري",
    "RR27": "يُنصح بأخذ استراحة للتنفس",
    "RR28": "التخطيط لرحلة طويلة مطلوب",
    "RR29": "القيادة الطويلة تتطلب استراحات",
    "RR30": "الرؤية الليلية منخفضة",
    "RR31": "مشكلة ميكانيكية حرجة",
    "RR32": "خطر خارجي مرتفع مع التعب",
    "RR33": "خطر ميكانيكي وطقس",
    "RR34": "حاجة لاستراحة قصيرة",
    "RR35": "كل شيء طبيعي",
}


def translate_explanations_to_arabic(explanations):
    """Convert list of 'ID: English text' to 'ID: Arabic text'."""
    result = []
    for exp in explanations:
        if ": " in exp:
            rule_id, _ = exp.split(": ", 1)
            if rule_id.strip() in EXPLANATIONS_AR:
                result.append(f"{rule_id}: {EXPLANATIONS_AR[rule_id.strip()]}")
            else:
                result.append(exp)
        else:
            result.append(exp)
    return result

@app.route('/')
def index():
    return send_from_directory('Interface', 'index.html')

@app.route('/styles.css')
def styles():
    return send_from_directory('Interface', 'styles.css')

@app.route('/script.js')
def script_js():
    return send_from_directory('Interface', 'script.js')

@app.route('/api/assess', methods=['POST'])
def assess_risk():
    try:
        data = request.get_json()
        facts = data.get('facts', {})
        
        # Convert string values to appropriate types
        processed_facts = {}
        for key, value in facts.items():
            if value == '' or value is None:
                continue
            if isinstance(value, (int, float)):
                processed_facts[key] = value
            elif value in ['yes', 'no']:
                processed_facts[key] = value
            else:
                s = str(value).strip()
                if not s:
                    continue
                if s.isdigit():
                    processed_facts[key] = int(s)
                elif '.' in s and s.replace('.', '', 1).isdigit():
                    processed_facts[key] = float(s)
                else:
                    processed_facts[key] = s
        
        # Evaluate risk
        risk_level, risk_expl = risk_system.evaluate_risk(processed_facts)
        
        # Get recommendation
        recommendations, rec_expl = rec_system.get_recommendation(processed_facts, risk_level)
        
        # Convert recommendations to list if it's a single string (for backward compatibility)
        if isinstance(recommendations, str):
            recommendations = [recommendations]
        
        # Combine and translate explanations to Arabic
        all_explanations = translate_explanations_to_arabic(risk_expl + rec_expl)
        
        # Translate recommendations to Arabic (matches recommendation_rules.csv)
        arabic_recommendations = {
            'DO_NOT_DRIVE': 'لا تقم بالقيادة في هذه الحالة',
            'STOP_NOW': 'توقف فوراً عن القيادة. هناك خطر وشيك!',
            'DRIVE_WITH_CAUTION': 'قد بحذر',
            'SAFE_TO_DRIVE': 'الظروف آمنة للقيادة',
            'REST_20_MIN': 'استرح لمدة 20 دقيقة على الأقل',
            'IMMEDIATE_STOP': 'توقف فوراً',
            'REST_BEFORE_DRIVING': 'خذ قسطاً من الراحة قبل القيادة',
            'EAT_SNACK': 'تناول وجبة خفيفة لتحسين اليقظة',
            'KEEP_LOW_SPEED': 'حافظ على سرعة منخفضة',
            'CHECK_EYES': 'افحص نظرك',
            'STOP_AND_COOL_ENGINE': 'توقف وبرد المحرك',
            'ADD_OIL': 'أضف زيت المحرك',
            'SCHEDULE_OIL_CHANGE': 'جدول تغيير الزيت',
            'CHECK_BRAKES': 'افحص الفرامل',
            'FILL_TIRES': 'صحّح ضغط الإطارات',
            'REFUEL_SOON': 'عبّئ الوقود قريباً',
            'REDUCE_SPEED': 'خفّف السرعة',
            'USE_FOG_LIGHTS': 'استخدم إنارة الضباب',
            'TWO_HANDS_ON_WHEEL': 'امسك المقود بيديك',
            'LOW_GEAR': 'استخدم غياراً منخفضاً',
            'DRIVE_SLOW': 'قد ببطء',
            'KEEP_DISTANCE': 'حافظ على المسافة',
            'STAY_ALERT': 'كن منتبهاً',
            'FOLLOW_SIGNS': 'التزم لافتات الطريق',
            'STOP_PHONE_USE': 'توقف عن استخدام الهاتف',
            'AVOID_SCREEN': 'تجنب الشاشات',
            'BREATHING_PAUSE': 'خذ استراحة تنفس',
            'PLAN_REFUEL_STOPS': 'خطط لمحطات الوقود',
            'TAKE_BREAKS': 'خذ استراحات',
            'INCREASE_ALERTNESS': 'زد انتباهك',
            'VISIT_MECHANIC': 'قم بزيارة الميكانيكي في أقرب وقت',
            'STOP_IMMEDIATELY': 'توقف فوراً عن القيادة. المخاطر عالية جداً!',
            'AVOID_TRAVEL': 'تجنب السفر في هذه الظروف',
            'SHORT_BREAK': 'استراحة قصيرة',
            'ENJOY_YOUR_TRIP': 'رحلة سعيدة',
            'CONTINUE': 'يمكنك متابعة القيادة بحذر'
        }
        
        # Translate all recommendations
        arabic_recommendation_list = []
        for rec in recommendations:
            arabic_rec = arabic_recommendations.get(rec, rec)
            arabic_recommendation_list.append(arabic_rec)
        
        return jsonify({
            'risk_level': risk_level,
            'risk_explanations': all_explanations,
            'recommendations': arabic_recommendation_list
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
