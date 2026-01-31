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
        recommendation, rec_expl = rec_system.get_recommendation(processed_facts, risk_level)
        
        # Combine explanations
        all_explanations = risk_expl + rec_expl
        
        # Translate recommendation to Arabic
        arabic_recommendations = {
            'STOP_NOW': 'توقف فوراً عن القيادة. هناك خطر وشيك!',
            'STOP_IMMEDIATELY': 'توقف فوراً عن القيادة. المخاطر عالية جداً!',
            'DO_NOT_DRIVE': 'لا تقم بالقيادة في هذه الحالة',
            'STOP_AND_COOL_ENGINE': 'توقف وبرد المحرك',
            'VISIT_MECHANIC': 'قم بزيارة الميكانيكي في أقرب وقت',
            'IMMEDIATE_STOP': 'توقف فوراً',
            'REST_BEFORE_DRIVING': 'خذ قسطاً من الراحة قبل القيادة',
            'REST_20_MIN': 'استرح لمدة 20 دقيقة على الأقل',
            'CONTINUE': 'يمكنك متابعة القيادة بحذر'
        }
        
        arabic_recommendation = arabic_recommendations.get(recommendation, recommendation)
        
        return jsonify({
            'risk_level': risk_level,
            'risk_explanations': all_explanations,
            'recommendation': arabic_recommendation
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
