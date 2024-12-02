from collections import defaultdict

def parse_tag(tag):
    # decoding a CLTK tag into a structured dictionary
    tag_mapping = { # mapping each variable of the tag to its corresponding part of speech
        "pos": {"n": "noun", "v": "verb", "t": "participle", "a": "adjective", "d": "adverb", "c": "conjunction", "r": "preposition", "p": "pronoun", "m": "numeral", "i": "interjection", "e": "exclamation", "u": "punctuation"},
        "person": {"1": "first", "2": "second", "3": "third"},
        "number": {"s": "singular", "p": "plural"},
        "tense": {"p": "present", "i": "imperfect", "r": "perfect", "l": "pluperfect", "t": "future perfect", "f": "future"},
        "mood": {"i": "indicative", "s": "subjunctive", "n": "infinitive", "m": "imperative", "p": "participle", "d": "gerund", "g": "gerundive", "u": "supine"},
        "voice": {"a": "active", "p": "passive"},
        "gender": {"m": "masculine", "f": "feminine", "n": "neuter"},
        "case": {"n": "nominative", "g": "genitive", "d": "dative", "a": "accusative", "b": "ablative", "v": "vocative", "l": "locative"},
        "degree": {"c": "comparative", "s": "superlative"},
    }

    attributes = { # assigning each variable in a list of attributes 
        "pos": tag_mapping["pos"].get(tag[0], None),
        "person": tag_mapping["person"].get(tag[1], None),
        "number": tag_mapping["number"].get(tag[2], None),
        "tense": tag_mapping["tense"].get(tag[3], None),
        "mood": tag_mapping["mood"].get(tag[4], None),
        "voice": tag_mapping["voice"].get(tag[5], None),
        "gender": tag_mapping["gender"].get(tag[6], None),
        "case": tag_mapping["case"].get(tag[7], None),
        "degree": tag_mapping["degree"].get(tag[8], None),
    }

    return {x: y for x, y in attributes.items() if y is not None}

def organize_conjugations(conjugations):
    # organizing declensions/conjunctions in a list w/ attributes
    structured_data = defaultdict(list)

    for form, tag in conjugations:
        attributes = parse_tag(tag)
        structured_data[form].append(attributes)
    return dict(structured_data)

