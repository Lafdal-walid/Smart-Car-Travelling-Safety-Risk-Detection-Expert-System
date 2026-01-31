import re

class ReasoningEngine:

    def __init__(self, rules_df):
        self.rules = rules_df

    def infer(self, initial_facts):
        """
        Forward chaining: Keep applying rules until no new facts are derived.
        Modifies and returns the 'facts' dictionary.
        Prevents infinite loops by tracking triggered rule IDs.
        Resolves conflicts for risk levels by taking the highest severity.
        """
        facts = initial_facts.copy()
        triggered_ids = set()
        
        # Priority mapping for risk resolution
        risk_priority = {"critical": 4, "high": 3, "medium": 2, "low": 1}
        
        while True:
            new_facts_derived = False

            for _, row in self.rules.iterrows():
                rule_id = row['id']
                
                # Rule Refraction: Do not fire the same rule instance twice
                # (Simple version: rule ID fires once globally per inference)
                if rule_id in triggered_ids:
                    continue

                conditions = row['conditions']
                if self.check_conditions(conditions, facts):
                    conclusion = row['conclusion']
                    
                    # Parse conclusion "key=value"
                    if "=" in conclusion:
                        k, v = conclusion.split("=", 1)
                        k = k.strip()
                        v = v.strip()
                        
                        # Logic to update facts
                        should_update = False
                        
                        if k not in facts:
                            should_update = True
                        elif facts[k] != v:
                            # Conflict resolution for risks
                            if k.endswith("_risk") or k == "risk":
                                current_p = risk_priority.get(str(facts[k]).lower(), 0)
                                new_p = risk_priority.get(v.lower(), 0)
                                if new_p > current_p:
                                    should_update = True
                            else:
                                # Overwrite for non-risk values (last rule wins behavior)
                                # But combined with 'fire once', this means first fired wins?
                                # Actually loop order matters. R1..R40. 
                                # If R25 (High) fires, then R27 (Medium) - R27 won't overwrite High due to logic above
                                should_update = True

                        if should_update:
                            facts[k] = v
                            new_facts_derived = True
                            triggered_ids.add(rule_id)

            if not new_facts_derived:
                break
        
        return facts

    def evaluate(self, facts):
        """
        Returns the list of triggered rules based on CURRENT facts (snapshot).
        Useful for final explanation generation.
        """
        triggered_rules = []

        for _, row in self.rules.iterrows():
            conditions = row['conditions']
            if self.check_conditions(conditions, facts):
                triggered_rules.append({
                    "id": row["id"],
                    "conclusion": row["conclusion"],
                    "explanation": row["explanation"]
                })

        return triggered_rules

    def check_conditions(self, cond_str, facts):
        # Normalize separators: AND usage
        # Expected format: "age>10 AND risk==high"
        conditions = cond_str.split(" AND ")

        for cond in conditions:
            cond = cond.strip()
            if not cond:
                continue

            # Check operators
            if "==" in cond:
                key, value = cond.split("==")
                key = key.strip()
                value = value.strip()
                
                if key not in facts:
                    return False # Strict: missing fact = False
                    
                if str(facts[key]).lower() != value.lower():
                    return False

            elif ">" in cond:
                # e.g. age>60
                match = re.search(r'(.+)>(.+)', cond)
                if match:
                    key = match.group(1).strip()
                    value = match.group(2).strip()
                    
                    if key not in facts:
                        return False
                        
                    try:
                        if float(facts[key]) <= float(value):
                            return False
                    except ValueError:
                        return False

            elif "<" in cond:
                match = re.search(r'(.+)<(.+)', cond)
                if match:
                    key = match.group(1).strip()
                    value = match.group(2).strip()
                    
                    if key not in facts:
                        return False
                        
                    try:
                        if float(facts[key]) >= float(value):
                            return False
                    except ValueError:
                        return False
            
            else:
               pass

        return True
