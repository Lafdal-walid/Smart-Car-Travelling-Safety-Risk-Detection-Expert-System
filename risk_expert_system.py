from knowledge_base import KnowledgeBase
from reasoning_engine import ReasoningEngine

class RiskExpertSystem:

    def __init__(self):
        kb = KnowledgeBase()
        risk_rules = kb.get_risk_rules()
        self.engine = ReasoningEngine(risk_rules)

    def evaluate_risk(self, facts):
        # 1. Forward chaining to derive all facts (including intermediate risks)
        enriched_facts = self.engine.infer(facts)
        
        # 2. Get explanations for what triggered
        triggered = self.engine.evaluate(enriched_facts)

        if not triggered:
            return "low", ["No specific risk conditions triggered"]

        explanations = []
        for rule in triggered:
            explanations.append(f"{rule['id']}: {rule['explanation']}")

        # 3. Check for specific final_risk (set by rules 36-40)
        if "final_risk" in enriched_facts:
            return enriched_facts["final_risk"], explanations

        # Fallback if no final_risk determined (shouldn't happen if rules cover all cases, but safety net)
        # Check global_risk
        if "global_risk" in enriched_facts:
            return enriched_facts["global_risk"], explanations

        return "low", ["No risk determined"]
