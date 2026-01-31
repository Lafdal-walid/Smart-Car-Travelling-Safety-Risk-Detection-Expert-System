import pandas as pd

class KnowledgeBase:
    def __init__(self, risk_file="risk_rules.csv", rec_file="recommendation_rules.csv"):
        self.risk_rules = pd.read_csv(risk_file)
        self.rec_rules = pd.read_csv(rec_file)

    def get_risk_rules(self):
        return self.risk_rules

    def get_recommendation_rules(self):
        return self.rec_rules
