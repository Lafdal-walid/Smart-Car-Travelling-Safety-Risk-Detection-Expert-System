from knowledge_base import KnowledgeBase
from reasoning_engine import ReasoningEngine

class RecommendationExpertSystem:

    def __init__(self):
        kb = KnowledgeBase()
        rec_rules = kb.get_recommendation_rules()
        self.engine = ReasoningEngine(rec_rules)

    def get_recommendation(self, facts, risk_level):
        # Add risk to facts before evaluation
        # Ensure we use the same key as in the CSV (final_risk)
        facts["final_risk"] = risk_level
        
        # 1. Forward chaining (though mostly flat for recommendations)
        enriched_facts = self.engine.infer(facts)
        
        # 2. Get triggered rules
        triggered = self.engine.evaluate(enriched_facts)

        if not triggered:
            return ["CONTINUE"], ["No recommendation rule triggered"]

        conclusions = []
        explanations = []

        for rule in triggered:
            conclusion = rule["conclusion"]
            explanation = rule["explanation"]

            if conclusion.startswith("recommendation="):
                action = conclusion.split("=")[1]
                conclusions.append(action)
                explanations.append(f"{rule['id']}: {explanation}")

        if not conclusions:
            return ["CONTINUE"], ["No applicable recommendation"]

        # Return all applicable recommendations and their explanations
        return conclusions, explanations
