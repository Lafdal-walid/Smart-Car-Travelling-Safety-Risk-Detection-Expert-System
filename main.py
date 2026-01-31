from risk_expert_system import RiskExpertSystem
from recommendation_expert_system import RecommendationExpertSystem
import pprint

# Example facts based on the CSV rules
facts = {
    "driver_age": 65,             # Triggers age>60 -> driver_risk=medium
    "vision_quality": "poor",     # Triggers driver_risk=medium
    "weather": "rain",            # Triggers external_risk=medium
    "tire_condition": "worn",     # Triggers car_risk=medium
    "phone_usage": "yes",         # Triggers driver_risk=high
    "sleep_hours": 3,             # Triggers driver_fatigue=yes
    "eyes_red": "yes",            # Triggers driver_fatigue=yes
}

print("--- INPUT FACTS ---")
pprint.pprint(facts)
print("\n--- INFERENCE START ---")

risk_system = RiskExpertSystem()
rec_system = RecommendationExpertSystem()

# Risk System now does inference internally
risk_level, risk_expl = risk_system.evaluate_risk(facts)

# Recommendation System
recommendation, rec_expl = rec_system.get_recommendation(facts, risk_level)

print("\n--- RESULTS ---")
print("Risk Level:", risk_level)
print("Risk Explanations:")
for exp in risk_expl:
    print(f"  - {exp}")

print("\nRecommendation:", recommendation)
print("Recommendation Explanations:")
for exp in rec_expl:
    print(f"  - {exp}")
