import json 
from decliner import decline
from decode_tags import organize_conjugations

# this was mostly just for testing. the actual importation of word forms will be much more efficient + clean lol
# TODO: find a better way to insert word forms into db

def save_to_json(forms, lemma):
    with open(f"{lemma}_word_forms.json", "w") as f:
        json.dump(forms, f, ensure_ascii=False, indent=4)

lemma = "canis"

res = decline(lemma)

data = organize_conjugations(res)

save_to_json(data, lemma)

