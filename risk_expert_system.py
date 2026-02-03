from knowledge_base import KnowledgeBase
from reasoning_engine import ReasoningEngine

class RiskExpertSystem:

    def __init__(self):
        kb = KnowledgeBase()
        risk_rules = kb.get_risk_rules()
        self.engine = ReasoningEngine(risk_rules)

    def evaluate_risk(self, facts):
        # Initialize default risk levels if not provided
        complete_facts = facts.copy()
        if 'driver_risk' not in complete_facts:
            complete_facts['driver_risk'] = 'low'
        if 'car_risk' not in complete_facts:
            complete_facts['car_risk'] = 'low'
        if 'external_risk' not in complete_facts:
            complete_facts['external_risk'] = 'low'
        
        # 1. Forward chaining to derive all facts (including intermediate risks)
        enriched_facts = self.engine.infer(complete_facts)
        
        # 2. Get explanations for what triggered
        triggered = self.engine.evaluate(enriched_facts)

        if not triggered:
            return "low", ["No specific risk conditions triggered"]

        explanations = []
        for rule in triggered:
            explanations.append(f"{rule['id']}: {rule['explanation']}")

        # 3. Return final_risk from rules (R33–R41 in risk_rules.csv; global_risk removed)
        if "final_risk" in enriched_facts:
            return enriched_facts["final_risk"], explanations

        return "low", explanations
