from cltk.tag.pos import POSTag
from cltk.morphology.lat import CollatinusDecliner
from cltk.lemmatize.lat import LatinBackoffLemmatizer
from cltk.prosody.lat.macronizer import Macronizer

from decode_tags import parse_tag, organize_conjugations

# TODO: find out why there are so many missing word forms lol

decliner = CollatinusDecliner()
macronizer = Macronizer("tag_ngram_123_backoff")
lemmatizer = LatinBackoffLemmatizer()

def lemmatize(word: list[str]):
    lemma = lemmatizer.lemmatize(word[0])
    return lemma

def macronize(word: tuple[str, str], _lemma_tag_cache=None):
    if _lemma_tag_cache is None:
        # Run the "lemma stuff" only once
        lemma = word[0]
        lemma_tagged = macronizer._retrieve_tag(lemma)[0][1]
        if lemma_tagged is not None:
            lemma_tag = lemma_tagged.lower()
        else:
            lemma_tag = None
        _lemma_tag_cache = lemma_tag

    lemma_tag = _lemma_tag_cache

    word_entries = macronizer._retrieve_morpheus_entry(word[0])

    w = None 

    if word_entries:
        if word_entries[0][0][0] == 'n' and lemma_tagged != None:
            for entry in word_entries:
                # print(list(entry[0]))
                if (list(word[1])[0:3], lemma_tag[6], list(word[1])[7]) == (list(entry[0])[0:3], list(entry[0])[6], list(entry[0])[7]):
                    w = (word[0], entry[0])
                    break
        else:
            w = (word[0], word[1])
    if w is not None:
        macronized_word = macronizer._macronize_word(w)
        return macronized_word
    else:
        return None
    
    # macronized_word = macronizer._macronize_word(w)
    # return macronized_word

def decline(word: str):
    declined_word = decliner.decline(word)

    word_list = []
    for w in declined_word:
        macronized_word = macronize(w)
        if macronized_word != None:
            word_list.append((macronized_word[2], macronized_word[1]))
    return word_list

word = "fero"
res = decline(word)

print(res)
# def get_parsed_forms(word: str):
#     res = decline(word)
#     parsed_forms = []

#     for w in res:
#         parsed_forms.append({w[0]: parse_tag(w[1])})
#     return parsed_forms

