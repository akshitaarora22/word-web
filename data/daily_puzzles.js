/* daily_puzzles.js — auto-generated wrapper around data/daily_puzzles.json.
   See tools/generate_chains.py to regenerate. Loaded as a plain global (no
   build step / fetch, so it works from file://) matching data/dataset.js. */
window.WORDWEB_DAILY_PUZZLES = {
 "version": 2,
 "chain_length": 5,
 "puzzles": [
  {
   "id": 1,
   "quality": 3,
   "start_word": "biography",
   "start_definition": "An account of a person's life written by someone else.",
   "chain": [
    "biography",
    "bibliography",
    "bibliophile",
    "philanthropy",
    "misanthrope"
   ],
   "pivot_roots": [
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "biography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "bibliography",
      "grandiloquent",
      "conflagration",
      "gradation"
     ]
    },
    {
     "from": "bibliography",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "bibliophile",
      "credible",
      "discernible",
      "plausible"
     ]
    },
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "annihilate",
      "philanthropy",
      "semblance",
      "pusillanimous"
     ]
    },
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chromosome",
      "chronometer",
      "spendthrift",
      "misanthrope"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "monos",
    "root": "monos",
    "meaning": "one",
    "origin": "Greek"
   },
   "options": [
    "monotonous",
    "monocle",
    "monogamous",
    "monotony",
    "monolith"
   ],
   "rounds": [
    {
     "definition": "Lack of variety and interest; tedious sameness.",
     "answer": "monotony"
    },
    {
     "definition": "Dull and repetitive; lacking variety.",
     "answer": "monotonous"
    },
    {
     "definition": "Having only one spouse or partner at a time.",
     "answer": "monogamous"
    },
    {
     "definition": "A large single upright block of stone; also, a large, unified, and unchanging organization.",
     "answer": "monolith"
    }
   ],
   "gre_count": 1,
   "id": 2
  },
  {
   "type": "cluster",
   "root": {
    "id": "ducere",
    "root": "duco, ductus",
    "meaning": "to lead",
    "origin": "Latin"
   },
   "options": [
    "conduct",
    "seduce",
    "deduce",
    "induct",
    "translucent"
   ],
   "rounds": [
    {
     "definition": "To reach a conclusion by reasoning from known facts.",
     "answer": "deduce"
    },
    {
     "definition": "To formally admit someone into a position, office, or society.",
     "answer": "induct"
    },
    {
     "definition": "To tempt someone into a course of action, often unwisely.",
     "answer": "seduce"
    },
    {
     "definition": "To organize and carry out a particular activity.",
     "answer": "conduct"
    }
   ],
   "gre_count": 0,
   "id": 3
  },
  {
   "id": 4,
   "quality": 3,
   "start_word": "polyandrous",
   "start_definition": "Having more than one husband at a time.",
   "chain": [
    "polyandrous",
    "polygamous",
    "misogamy",
    "misanthrope",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "polys",
     "root": "polys",
     "meaning": "many"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "polyandrous",
     "root": "polys",
     "root_display": "polys",
     "root_meaning": "many",
     "answer": "polygamous",
     "answer_definition": "Having more than one spouse at once.",
     "options": [
      "politic",
      "cosmopolitan",
      "geopolitical",
      "polygamous"
     ]
    },
    {
     "from": "polygamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "misogamy",
      "surrogate",
      "prerogative",
      "derogatory"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chronicle",
      "misanthrope",
      "pantheon",
      "anthropological"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "spendthrift",
      "chronicle",
      "anachronism",
      "philanthropy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "vertere",
    "root": "verto, versus",
    "meaning": "to turn",
    "origin": "Latin"
   },
   "options": [
    "inadvertent",
    "versatile",
    "introvert",
    "adverse",
    "divert"
   ],
   "rounds": [
    {
     "definition": "Able to adapt to many functions.",
     "answer": "versatile"
    },
    {
     "definition": "Unintentional; done without noticing.",
     "answer": "inadvertent"
    },
    {
     "definition": "To turn aside from a course.",
     "answer": "divert"
    },
    {
     "definition": "Unfavorable or harmful.",
     "answer": "adverse"
    }
   ],
   "gre_count": 2,
   "id": 5
  },
  {
   "type": "cluster",
   "root": {
    "id": "derma",
    "root": "derma",
    "meaning": "skin",
    "origin": "Greek"
   },
   "options": [
    "thermometer",
    "taxidermy",
    "dermatitis",
    "pachyderm",
    "dermatology"
   ],
   "rounds": [
    {
     "definition": "A thick-skinned mammal such as an elephant or rhinoceros.",
     "answer": "pachyderm"
    },
    {
     "definition": "The art of preparing and mounting animal skins to look lifelike.",
     "answer": "taxidermy"
    },
    {
     "definition": "The branch of medicine dealing with the skin.",
     "answer": "dermatology"
    },
    {
     "definition": "Inflammation of the skin.",
     "answer": "dermatitis"
    }
   ],
   "gre_count": 0,
   "id": 6
  },
  {
   "id": 7,
   "quality": 3,
   "start_word": "philanthropy",
   "start_definition": "The desire to help others, expressed especially through generous giving.",
   "chain": [
    "philanthropy",
    "misanthrope",
    "misogynous",
    "androgynous",
    "polyandrous"
   ],
   "pivot_roots": [
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "andros",
     "root": "andros",
     "meaning": "man, male"
    }
   ],
   "links": [
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chromosome",
      "spendthrift",
      "misanthrope",
      "chronicle"
     ]
    },
    {
     "from": "misanthrope",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "epidermis",
      "miserly",
      "misogynous",
      "commiserate"
     ]
    },
    {
     "from": "misogynous",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "androgynous",
     "answer_definition": "Having both male and female characteristics; neither clearly male nor female.",
     "options": [
      "penurious",
      "androgynous",
      "bigamous",
      "rigorous"
     ]
    },
    {
     "from": "androgynous",
     "root": "andros",
     "root_display": "andros",
     "root_meaning": "man, male",
     "answer": "polyandrous",
     "answer_definition": "Having more than one husband at a time.",
     "options": [
      "outlandish",
      "pandemic",
      "maladroit",
      "polyandrous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "credere",
    "root": "credo, creditus",
    "meaning": "to believe",
    "origin": "Latin"
   },
   "options": [
    "miscreant",
    "hereditary",
    "credulous",
    "credence",
    "incredulous"
   ],
   "rounds": [
    {
     "definition": "Unwilling or unable to believe something.",
     "answer": "incredulous"
    },
    {
     "definition": "Too ready to believe things; easily deceived.",
     "answer": "credulous"
    },
    {
     "definition": "A person who behaves badly or unlawfully.",
     "answer": "miscreant"
    },
    {
     "definition": "Belief in or acceptance of something as true.",
     "answer": "credence"
    }
   ],
   "gre_count": 3,
   "id": 8
  },
  {
   "type": "cluster",
   "root": {
    "id": "philein",
    "root": "philein",
    "meaning": "to love",
    "origin": "Greek"
   },
   "options": [
    "philander",
    "pusillanimous",
    "philanderer",
    "philosophy",
    "philanthropy"
   ],
   "rounds": [
    {
     "definition": "The desire to help others, expressed especially through generous giving.",
     "answer": "philanthropy"
    },
    {
     "definition": "The study of knowledge, reality, and existence (love of wisdom).",
     "answer": "philosophy"
    },
    {
     "definition": "A man who engages in casual love affairs.",
     "answer": "philanderer"
    },
    {
     "definition": "To have casual romantic affairs, especially by a man.",
     "answer": "philander"
    }
   ],
   "gre_count": 1,
   "id": 9
  },
  {
   "id": 10,
   "quality": 3,
   "start_word": "microphone",
   "start_definition": "A device that converts sound into an electrical signal.",
   "chain": [
    "microphone",
    "cacophony",
    "cacography",
    "orthography",
    "orthodox"
   ],
   "pivot_roots": [
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    }
   ],
   "links": [
    {
     "from": "microphone",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "xenophobia",
      "cacophony",
      "photograph",
      "graphology"
     ]
    },
    {
     "from": "cacophony",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "cacography",
      "efficacious",
      "efficacy",
      "perspicacious"
     ]
    },
    {
     "from": "cacography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "orthography",
      "gradation",
      "gravitas",
      "psychotherapy"
     ]
    },
    {
     "from": "orthography",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthodox",
     "answer_definition": "Following established or traditional beliefs.",
     "options": [
      "contort",
      "tortuous",
      "distort",
      "orthodox"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "sophos",
    "root": "sophos",
    "meaning": "wise",
    "origin": "Greek"
   },
   "options": [
    "sophomoric",
    "sophistry",
    "philanthropy",
    "sophisticated",
    "sophist"
   ],
   "rounds": [
    {
     "definition": "A person who reasons with clever but misleading arguments.",
     "answer": "sophist"
    },
    {
     "definition": "The use of clever but false arguments, especially to deceive.",
     "answer": "sophistry"
    },
    {
     "definition": "Immature and overconfident despite pretensions to sophistication.",
     "answer": "sophomoric"
    },
    {
     "definition": "Having, revealing, or involving great worldly experience or refinement.",
     "answer": "sophisticated"
    }
   ],
   "gre_count": 2,
   "id": 11
  },
  {
   "type": "cluster",
   "root": {
    "id": "gnostos",
    "root": "gnostos",
    "meaning": "known",
    "origin": "Greek"
   },
   "options": [
    "agnostic",
    "chirography",
    "prognosticate",
    "diagnosis",
    "prognosis"
   ],
   "rounds": [
    {
     "definition": "A forecast of the likely course of a disease or situation.",
     "answer": "prognosis"
    },
    {
     "definition": "The identification of the nature of an illness or problem.",
     "answer": "diagnosis"
    },
    {
     "definition": "Holding that the existence of God is unknown or unknowable.",
     "answer": "agnostic"
    },
    {
     "definition": "To forecast or predict something from present indications.",
     "answer": "prognosticate"
    }
   ],
   "gre_count": 1,
   "id": 12
  },
  {
   "id": 13,
   "quality": 3,
   "start_word": "philanthropy",
   "start_definition": "The desire to help others, expressed especially through generous giving.",
   "chain": [
    "philanthropy",
    "bibliophile",
    "bibliography",
    "monogram",
    "monotonous"
   ],
   "pivot_roots": [
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    }
   ],
   "links": [
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "sophist",
      "sophistry",
      "bibliophile",
      "annihilate"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "accessible",
      "incorrigible",
      "susceptible",
      "bibliography"
     ]
    },
    {
     "from": "bibliography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "monogram",
      "gravitas",
      "aggravate",
      "gradation"
     ]
    },
    {
     "from": "monogram",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monotonous",
     "answer_definition": "Dull and repetitive; lacking variety.",
     "options": [
      "sanctimonious",
      "monotonous",
      "monocle",
      "autonomous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "facere",
    "root": "facio",
    "meaning": "to do, make",
    "origin": "Latin"
   },
   "options": [
    "officious",
    "faction",
    "factious",
    "deface"
   ],
   "rounds": [
    {
     "definition": "Given to or characterized by internal conflict and dissent.",
     "answer": "factious"
    },
    {
     "definition": "Intrusively offering unwanted help or authority.",
     "answer": "officious"
    },
    {
     "definition": "A small dissenting group within a larger one.",
     "answer": "faction"
    },
    {
     "definition": "To spoil the surface or appearance of.",
     "answer": "deface"
    }
   ],
   "gre_count": 4,
   "id": 14
  },
  {
   "type": "cluster",
   "root": {
    "id": "sequi",
    "root": "sequor",
    "meaning": "to follow",
    "origin": "Latin"
   },
   "options": [
    "equanimity",
    "sequacious",
    "consequential",
    "obsequious",
    "subsequent"
   ],
   "rounds": [
    {
     "definition": "Having significant effects; important.",
     "answer": "consequential"
    },
    {
     "definition": "Excessively eager to please or obey; fawning.",
     "answer": "obsequious"
    },
    {
     "definition": "Blindly following the lead of another; unquestioningly obedient.",
     "answer": "sequacious"
    },
    {
     "definition": "Coming after something else in time; following.",
     "answer": "subsequent"
    }
   ],
   "gre_count": 2,
   "id": 15
  },
  {
   "id": 16,
   "quality": 3,
   "start_word": "polymath",
   "start_definition": "A person of wide-ranging knowledge or learning.",
   "chain": [
    "polymath",
    "polygyny",
    "misogynous",
    "misanthrope",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "polys",
     "root": "polys",
     "meaning": "many"
    },
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "polymath",
     "root": "polys",
     "root_display": "polys",
     "root_meaning": "many",
     "answer": "polygyny",
     "answer_definition": "The custom of one man having several wives.",
     "options": [
      "metropolis",
      "polygyny",
      "apologist",
      "policy"
     ]
    },
    {
     "from": "polygyny",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "misogynous",
      "polyandrous",
      "dolorous",
      "unanimous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anthropological",
      "synchronous",
      "chronicle",
      "misanthrope"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "chronometer",
      "chromosome",
      "philanthropy",
      "spendthrift"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "misein",
    "root": "misein",
    "meaning": "to hate",
    "origin": "Greek"
   },
   "options": [
    "misanthropic",
    "misanthrope",
    "anthropological",
    "misogynous",
    "misogamy"
   ],
   "rounds": [
    {
     "definition": "A person who dislikes and avoids other people.",
     "answer": "misanthrope"
    },
    {
     "definition": "Showing hatred or contempt for women.",
     "answer": "misogynous"
    },
    {
     "definition": "Disliking or shunning other people.",
     "answer": "misanthropic"
    },
    {
     "definition": "Hatred of marriage.",
     "answer": "misogamy"
    }
   ],
   "gre_count": 1,
   "id": 17
  },
  {
   "type": "cluster",
   "root": {
    "id": "mutare",
    "root": "muto, mutatus",
    "meaning": "to change",
    "origin": "Latin"
   },
   "options": [
    "immutable",
    "transmute",
    "permutation",
    "mutiny"
   ],
   "rounds": [
    {
     "definition": "An open rebellion against a person in authority.",
     "answer": "mutiny"
    },
    {
     "definition": "Unchanging over time or unable to be changed.",
     "answer": "immutable"
    },
    {
     "definition": "To change in form, nature, or substance.",
     "answer": "transmute"
    },
    {
     "definition": "One of several possible ways a set of things can be ordered or combined.",
     "answer": "permutation"
    }
   ],
   "gre_count": 1,
   "id": 18
  },
  {
   "id": 19,
   "quality": 3,
   "start_word": "philanthropy",
   "start_definition": "The desire to help others, expressed especially through generous giving.",
   "chain": [
    "philanthropy",
    "bibliophile",
    "bibliography",
    "orthography",
    "orthodox"
   ],
   "pivot_roots": [
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    }
   ],
   "links": [
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "bibliophile",
      "sophistry",
      "annihilate",
      "sophist"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "accessible",
      "bibliography",
      "susceptible",
      "plausible"
     ]
    },
    {
     "from": "bibliography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "conflagration",
      "gradation",
      "orthography",
      "gravitas"
     ]
    },
    {
     "from": "orthography",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthodox",
     "answer_definition": "Following established or traditional beliefs.",
     "options": [
      "orthodox",
      "distort",
      "contort",
      "tortuous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "potens",
    "root": "potens",
    "meaning": "powerful",
    "origin": "Latin"
   },
   "options": [
    "potency",
    "potentate",
    "tenacious",
    "omnipotent",
    "potent"
   ],
   "rounds": [
    {
     "definition": "The power or strength of something, or the strength of its effect.",
     "answer": "potency"
    },
    {
     "definition": "A ruler or monarch, especially one with great power.",
     "answer": "potentate"
    },
    {
     "definition": "Having unlimited power.",
     "answer": "omnipotent"
    },
    {
     "definition": "Having great power, influence, or effect.",
     "answer": "potent"
    }
   ],
   "gre_count": 0,
   "id": 20
  },
  {
   "type": "cluster",
   "root": {
    "id": "bellum",
    "root": "bellum",
    "meaning": "war",
    "origin": "Latin"
   },
   "options": [
    "antebellum",
    "rebellion",
    "belligerent",
    "bellicose",
    "calligraphy"
   ],
   "rounds": [
    {
     "definition": "Demonstrating aggression and willingness to fight.",
     "answer": "bellicose"
    },
    {
     "definition": "An act of open, armed resistance to an established authority.",
     "answer": "rebellion"
    },
    {
     "definition": "Occurring before a particular war, especially the American Civil War.",
     "answer": "antebellum"
    },
    {
     "definition": "Hostile and aggressive; also, a party engaged in war.",
     "answer": "belligerent"
    }
   ],
   "gre_count": 2,
   "id": 21
  },
  {
   "id": 22,
   "quality": 3,
   "start_word": "polymath",
   "start_definition": "A person of wide-ranging knowledge or learning.",
   "chain": [
    "polymath",
    "polygamous",
    "misogamy",
    "misanthrope",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "polys",
     "root": "polys",
     "meaning": "many"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "polymath",
     "root": "polys",
     "root_display": "polys",
     "root_meaning": "many",
     "answer": "polygamous",
     "answer_definition": "Having more than one spouse at once.",
     "options": [
      "cosmopolitan",
      "polygamous",
      "geopolitical",
      "politic"
     ]
    },
    {
     "from": "polygamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "surrogate",
      "prerogative",
      "misogamy",
      "derogatory"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chronicle",
      "pantheon",
      "misanthrope",
      "anthropological"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "anachronism",
      "philanthropy",
      "chronicle",
      "chromosome"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "jacere",
    "root": "jacio, jactus",
    "meaning": "to throw",
    "origin": "Latin"
   },
   "options": [
    "abject",
    "objective",
    "adjacent",
    "subjective",
    "circumspect"
   ],
   "rounds": [
    {
     "definition": "Experienced or present to the maximum degree, especially of something bad; utterly hopeless.",
     "answer": "abject"
    },
    {
     "definition": "Next to or adjoining something else.",
     "answer": "adjacent"
    },
    {
     "definition": "Based on or influenced by personal feelings or opinions rather than facts.",
     "answer": "subjective"
    },
    {
     "definition": "Not influenced by personal feelings; based on facts.",
     "answer": "objective"
    }
   ],
   "gre_count": 2,
   "id": 23
  },
  {
   "type": "cluster",
   "root": {
    "id": "petere",
    "root": "peto, petitus",
    "meaning": "to seek, rush at",
    "origin": "Latin"
   },
   "options": [
    "petulant",
    "implicit",
    "impetuous",
    "competent",
    "impetus"
   ],
   "rounds": [
    {
     "definition": "Acting quickly without thought or care for consequences.",
     "answer": "impetuous"
    },
    {
     "definition": "Something that makes a process or activity happen, or happen faster.",
     "answer": "impetus"
    },
    {
     "definition": "Having the necessary skill or knowledge to do something successfully.",
     "answer": "competent"
    },
    {
     "definition": "Childishly sulky or bad-tempered.",
     "answer": "petulant"
    }
   ],
   "gre_count": 3,
   "id": 24
  },
  {
   "id": 25,
   "quality": 3,
   "start_word": "monotonous",
   "start_definition": "Dull and repetitive; lacking variety.",
   "chain": [
    "monotonous",
    "monogamous",
    "misogamy",
    "misanthropic",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "monotonous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "monocle",
      "monogamous",
      "mnemonic",
      "acrimonious"
     ]
    },
    {
     "from": "monogamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "surrogate",
      "derogatory",
      "prerogative",
      "misogamy"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthropic",
     "answer_definition": "Disliking or shunning other people.",
     "options": [
      "anachronistic",
      "anthropological",
      "misanthropic",
      "synchronous"
     ]
    },
    {
     "from": "misanthropic",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "spendthrift",
      "philanthropy",
      "chronicle",
      "anachronism"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "chronos",
    "root": "chronos",
    "meaning": "time",
    "origin": "Greek"
   },
   "options": [
    "misanthrope",
    "synchronous",
    "anachronistic",
    "chronological",
    "anachronism"
   ],
   "rounds": [
    {
     "definition": "Arranged in the order of time.",
     "answer": "chronological"
    },
    {
     "definition": "Belonging to the wrong period; out of date.",
     "answer": "anachronistic"
    },
    {
     "definition": "Something out of its proper time period.",
     "answer": "anachronism"
    },
    {
     "definition": "Happening at the same time and rate.",
     "answer": "synchronous"
    }
   ],
   "gre_count": 3,
   "id": 26
  },
  {
   "type": "cluster",
   "root": {
    "id": "philein",
    "root": "philein",
    "meaning": "to love",
    "origin": "Greek"
   },
   "options": [
    "philander",
    "bibliophile",
    "philanderer",
    "pusillanimous",
    "philanthropy"
   ],
   "rounds": [
    {
     "definition": "The desire to help others, expressed especially through generous giving.",
     "answer": "philanthropy"
    },
    {
     "definition": "To have casual romantic affairs, especially by a man.",
     "answer": "philander"
    },
    {
     "definition": "A man who engages in casual love affairs.",
     "answer": "philanderer"
    },
    {
     "definition": "A lover or collector of books.",
     "answer": "bibliophile"
    }
   ],
   "gre_count": 1,
   "id": 27
  },
  {
   "id": 28,
   "quality": 3,
   "start_word": "philanthropy",
   "start_definition": "The desire to help others, expressed especially through generous giving.",
   "chain": [
    "philanthropy",
    "bibliophile",
    "bibliography",
    "cacography",
    "cacophony"
   ],
   "pivot_roots": [
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    }
   ],
   "links": [
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "annihilate",
      "sophisticated",
      "bibliophile",
      "sophistry"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "plausible",
      "bibliography",
      "irascible",
      "incorrigible"
     ]
    },
    {
     "from": "bibliography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "gravitas",
      "gradation",
      "cacography",
      "ingrate"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "perspicacious",
      "efficacy",
      "efficacious",
      "cacophony"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "quaerere",
    "root": "quaero",
    "meaning": "to seek, ask",
    "origin": "Latin"
   },
   "options": [
    "exquisite",
    "acquisitive",
    "altruism",
    "inquisitive",
    "perquisite"
   ],
   "rounds": [
    {
     "definition": "Excessively interested in acquiring money or possessions.",
     "answer": "acquisitive"
    },
    {
     "definition": "Curious or inquiring, sometimes excessively so.",
     "answer": "inquisitive"
    },
    {
     "definition": "Extremely beautiful and delicate; carefully made.",
     "answer": "exquisite"
    },
    {
     "definition": "A benefit enjoyed as a result of one's job or position.",
     "answer": "perquisite"
    }
   ],
   "gre_count": 1,
   "id": 29
  },
  {
   "type": "cluster",
   "root": {
    "id": "secare",
    "root": "seco, sectus",
    "meaning": "to cut",
    "origin": "Latin"
   },
   "options": [
    "intersect",
    "dissect",
    "sector",
    "circumspect",
    "bisect"
   ],
   "rounds": [
    {
     "definition": "To cut apart for examination, or to analyze in detail.",
     "answer": "dissect"
    },
    {
     "definition": "To divide something into two equal or roughly equal parts.",
     "answer": "bisect"
    },
    {
     "definition": "To divide something by passing through or across it; to cross.",
     "answer": "intersect"
    },
    {
     "definition": "A distinct part or subdivision of something, such as an economy.",
     "answer": "sector"
    }
   ],
   "gre_count": 0,
   "id": 30
  },
  {
   "id": 31,
   "quality": 3,
   "start_word": "polygamous",
   "start_definition": "Having more than one spouse at once.",
   "chain": [
    "polygamous",
    "polygyny",
    "misogynous",
    "misanthrope",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "polys",
     "root": "polys",
     "meaning": "many"
    },
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "polygamous",
     "root": "polys",
     "root_display": "polys",
     "root_meaning": "many",
     "answer": "polygyny",
     "answer_definition": "The custom of one man having several wives.",
     "options": [
      "polygyny",
      "policy",
      "apologist",
      "metropolis"
     ]
    },
    {
     "from": "polygyny",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "polyandrous",
      "misogynous",
      "unanimous",
      "autonomous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "synchronous",
      "anthropological",
      "anachronism",
      "misanthrope"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "chromosome",
      "philanthropy",
      "chronicle",
      "chronometer"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "legere",
    "root": "lego, lectus",
    "meaning": "to read, choose",
    "origin": "Latin"
   },
   "options": [
    "circumspect",
    "intellect",
    "dialect",
    "predilection",
    "sacrilege"
   ],
   "rounds": [
    {
     "definition": "A regional or social variety of a language.",
     "answer": "dialect"
    },
    {
     "definition": "The faculty of reasoning and understanding objectively.",
     "answer": "intellect"
    },
    {
     "definition": "A violation of something regarded as sacred.",
     "answer": "sacrilege"
    },
    {
     "definition": "A preference or special liking for something.",
     "answer": "predilection"
    }
   ],
   "gre_count": 2,
   "id": 32
  },
  {
   "type": "cluster",
   "root": {
    "id": "dicere",
    "root": "dico, dictus",
    "meaning": "to say",
    "origin": "Latin"
   },
   "options": [
    "vindicate",
    "orthopedic",
    "abdicate",
    "judicious",
    "vindictive"
   ],
   "rounds": [
    {
     "definition": "To renounce a throne, right, or responsibility formally.",
     "answer": "abdicate"
    },
    {
     "definition": "Having or showing good judgment; sensible and careful.",
     "answer": "judicious"
    },
    {
     "definition": "To clear someone of blame or suspicion, or to justify a claim.",
     "answer": "vindicate"
    },
    {
     "definition": "Having or showing a strong desire for revenge.",
     "answer": "vindictive"
    }
   ],
   "gre_count": 4,
   "id": 33
  },
  {
   "id": 34,
   "quality": 3,
   "start_word": "monotonous",
   "start_definition": "Dull and repetitive; lacking variety.",
   "chain": [
    "monotonous",
    "monogram",
    "cacography",
    "cacophony",
    "phonetics"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "monotonous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "cosmonaut",
      "matrimony",
      "monocle",
      "monogram"
     ]
    },
    {
     "from": "monogram",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "gradation",
      "cacography",
      "ingrate",
      "gravitas"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "cacophony",
      "efficacy",
      "efficacious",
      "perspicacious"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "phonetics",
     "answer_definition": "The study of the sounds of speech.",
     "options": [
      "phonetics",
      "graphology",
      "photograph",
      "xenophobia"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "malus",
    "root": "malus",
    "meaning": "bad",
    "origin": "Latin"
   },
   "options": [
    "malign",
    "malfeasance",
    "malevolent",
    "maladroit",
    "geothermal"
   ],
   "rounds": [
    {
     "definition": "Wrongdoing, especially by a public official.",
     "answer": "malfeasance"
    },
    {
     "definition": "Having or showing a wish to do evil to others.",
     "answer": "malevolent"
    },
    {
     "definition": "Clumsy; lacking skill or tact.",
     "answer": "maladroit"
    },
    {
     "definition": "To speak about someone in a spitefully critical way.",
     "answer": "malign"
    }
   ],
   "gre_count": 4,
   "id": 35
  },
  {
   "type": "cluster",
   "root": {
    "id": "astron",
    "root": "astron",
    "meaning": "star",
    "origin": "Greek"
   },
   "options": [
    "aster",
    "disaster",
    "alter ego",
    "asterisk",
    "astrology"
   ],
   "rounds": [
    {
     "definition": "A star-shaped flower.",
     "answer": "aster"
    },
    {
     "definition": "A sudden great misfortune (literally, an ill star).",
     "answer": "disaster"
    },
    {
     "definition": "A star-shaped symbol (*) used to mark text.",
     "answer": "asterisk"
    },
    {
     "definition": "The belief that the stars influence human affairs.",
     "answer": "astrology"
    }
   ],
   "gre_count": 0,
   "id": 36
  },
  {
   "id": 37,
   "quality": 3,
   "start_word": "monogram",
   "start_definition": "A design combining a person's initials.",
   "chain": [
    "monogram",
    "monogamous",
    "misogamy",
    "misanthrope",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "monogram",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "acrimonious",
      "monocle",
      "mnemonic",
      "monogamous"
     ]
    },
    {
     "from": "monogamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "surrogate",
      "misogamy",
      "derogatory",
      "prerogative"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chromosome",
      "anachronism",
      "anthropological",
      "misanthrope"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "philanthropy",
      "chronometer",
      "chronicle",
      "anachronism"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "vertere",
    "root": "verto, versus",
    "meaning": "to turn",
    "origin": "Latin"
   },
   "options": [
    "divert",
    "introvert",
    "inadvertent",
    "adverse",
    "subversive"
   ],
   "rounds": [
    {
     "definition": "Unfavorable or harmful.",
     "answer": "adverse"
    },
    {
     "definition": "Seeking to undermine an established system or institution.",
     "answer": "subversive"
    },
    {
     "definition": "Unintentional; done without noticing.",
     "answer": "inadvertent"
    },
    {
     "definition": "To turn aside from a course.",
     "answer": "divert"
    }
   ],
   "gre_count": 2,
   "id": 38
  },
  {
   "type": "cluster",
   "root": {
    "id": "os_oris",
    "root": "os, oris",
    "meaning": "mouth",
    "origin": "Latin"
   },
   "options": [
    "orator",
    "oration",
    "oracle",
    "extemporaneous",
    "inexorable"
   ],
   "rounds": [
    {
     "definition": "A person or thing regarded as a source of wise counsel or prophecy.",
     "answer": "oracle"
    },
    {
     "definition": "A skilled and eloquent public speaker.",
     "answer": "orator"
    },
    {
     "definition": "A formal speech, especially one delivered on a ceremonial occasion.",
     "answer": "oration"
    },
    {
     "definition": "Impossible to stop or persuade; relentless.",
     "answer": "inexorable"
    }
   ],
   "gre_count": 1,
   "id": 39
  },
  {
   "id": 40,
   "quality": 3,
   "start_word": "orthodox",
   "start_definition": "Following established or traditional beliefs.",
   "chain": [
    "orthodox",
    "orthography",
    "cacography",
    "cacophony",
    "phonetics"
   ],
   "pivot_roots": [
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "orthodox",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "tortuous",
      "contort",
      "orthography",
      "distort"
     ]
    },
    {
     "from": "orthography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "cacography",
      "gradation",
      "gravitas",
      "conflagration"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "cacophony",
      "efficacy",
      "efficacious",
      "perspicacious"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "phonetics",
     "answer_definition": "The study of the sounds of speech.",
     "options": [
      "phonetics",
      "photograph",
      "xenophobia",
      "graphology"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "graphein",
    "root": "graphein, gramma",
    "meaning": "to write",
    "origin": "Greek"
   },
   "options": [
    "photograph",
    "orthography",
    "psychotherapy",
    "telegraph",
    "geography"
   ],
   "rounds": [
    {
     "definition": "A system for sending messages over distance by signal.",
     "answer": "telegraph"
    },
    {
     "definition": "The study of the earth's features, peoples, and places.",
     "answer": "geography"
    },
    {
     "definition": "The conventional spelling system of a language.",
     "answer": "orthography"
    },
    {
     "definition": "An image made with a camera.",
     "answer": "photograph"
    }
   ],
   "gre_count": 0,
   "id": 41
  },
  {
   "type": "cluster",
   "root": {
    "id": "agogos",
    "root": "agogos",
    "meaning": "leading",
    "origin": "Greek"
   },
   "options": [
    "pedagogue",
    "magnanimous",
    "demagoguery",
    "pedagogy",
    "demagogue"
   ],
   "rounds": [
    {
     "definition": "A leader who wins support by stirring up emotions and prejudice.",
     "answer": "demagogue"
    },
    {
     "definition": "The practice of appealing to fear and prejudice to gain power.",
     "answer": "demagoguery"
    },
    {
     "definition": "The method and practice of teaching.",
     "answer": "pedagogy"
    },
    {
     "definition": "A teacher, especially a strict or pedantic one.",
     "answer": "pedagogue"
    }
   ],
   "gre_count": 1,
   "id": 42
  },
  {
   "id": 43,
   "quality": 3,
   "start_word": "polyglot",
   "start_definition": "Knowing or using several languages.",
   "chain": [
    "polyglot",
    "polygamous",
    "misogamy",
    "misanthrope",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "polys",
     "root": "polys",
     "meaning": "many"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "polyglot",
     "root": "polys",
     "root_display": "polys",
     "root_meaning": "many",
     "answer": "polygamous",
     "answer_definition": "Having more than one spouse at once.",
     "options": [
      "cosmopolitan",
      "polygamous",
      "geopolitical",
      "politic"
     ]
    },
    {
     "from": "polygamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "arrogate",
      "surrogate",
      "prerogative",
      "misogamy"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anthropological",
      "misanthrope",
      "spendthrift",
      "anachronism"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "chronometer",
      "chronicle",
      "philanthropy",
      "spendthrift"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "metron",
    "root": "metron",
    "meaning": "measure",
    "origin": "Greek"
   },
   "options": [
    "geometric",
    "symmetry",
    "alter ego",
    "perimeter",
    "metric"
   ],
   "rounds": [
    {
     "definition": "The outer boundary or its length.",
     "answer": "perimeter"
    },
    {
     "definition": "Relating to measurement, especially the metric system.",
     "answer": "metric"
    },
    {
     "definition": "Relating to geometry; made of regular shapes and lines.",
     "answer": "geometric"
    },
    {
     "definition": "Balanced proportion; matching form on either side.",
     "answer": "symmetry"
    }
   ],
   "gre_count": 0,
   "id": 44
  },
  {
   "type": "cluster",
   "root": {
    "id": "pendere",
    "root": "pendo, pensus",
    "meaning": "to hang, weigh",
    "origin": "Latin"
   },
   "options": [
    "compensate",
    "pendulous",
    "penchant",
    "penurious",
    "propensity"
   ],
   "rounds": [
    {
     "definition": "To make up for something by an equal counteracting force.",
     "answer": "compensate"
    },
    {
     "definition": "Hanging down loosely, especially so as to swing.",
     "answer": "pendulous"
    },
    {
     "definition": "A strong habitual liking for something.",
     "answer": "penchant"
    },
    {
     "definition": "A natural tendency to behave in a particular way.",
     "answer": "propensity"
    }
   ],
   "gre_count": 3,
   "id": 45
  },
  {
   "id": 46,
   "quality": 3,
   "start_word": "orthodox",
   "start_definition": "Following established or traditional beliefs.",
   "chain": [
    "orthodox",
    "orthography",
    "cacography",
    "cacophony",
    "symphony"
   ],
   "pivot_roots": [
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "orthodox",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "contort",
      "pathology",
      "orthography",
      "tortuous"
     ]
    },
    {
     "from": "orthography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "ingrate",
      "psychotherapy",
      "cacography",
      "gravitas"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "perspicacious",
      "efficacy",
      "efficacious",
      "cacophony"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "symphony",
     "answer_definition": "An elaborate musical composition for a full orchestra.",
     "options": [
      "symphony",
      "xenophobia",
      "graphology",
      "photograph"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "bios",
    "root": "bios",
    "meaning": "life",
    "origin": "Greek"
   },
   "options": [
    "biosphere",
    "symbiosis",
    "biopsy",
    "autobiography"
   ],
   "rounds": [
    {
     "definition": "The story of a person's life written by that person.",
     "answer": "autobiography"
    },
    {
     "definition": "The regions of Earth occupied by living things.",
     "answer": "biosphere"
    },
    {
     "definition": "A close relationship between two different organisms, often to mutual benefit.",
     "answer": "symbiosis"
    },
    {
     "definition": "The removal of tissue to examine it for disease.",
     "answer": "biopsy"
    }
   ],
   "gre_count": 1,
   "id": 47
  },
  {
   "type": "cluster",
   "root": {
    "id": "grex",
    "root": "grex, gregis",
    "meaning": "herd, flock",
    "origin": "Latin"
   },
   "options": [
    "aggregate",
    "digress",
    "gregarious",
    "egregious",
    "congregate"
   ],
   "rounds": [
    {
     "definition": "Outstandingly bad; shocking.",
     "answer": "egregious"
    },
    {
     "definition": "To gather together in a crowd.",
     "answer": "congregate"
    },
    {
     "definition": "To gather into a total or whole.",
     "answer": "aggregate"
    },
    {
     "definition": "Fond of company; sociable.",
     "answer": "gregarious"
    }
   ],
   "gre_count": 3,
   "id": 48
  },
  {
   "id": 49,
   "quality": 3,
   "start_word": "misanthropic",
   "start_definition": "Disliking or shunning other people.",
   "chain": [
    "misanthropic",
    "misanthrope",
    "misogamy",
    "monogamous",
    "monotonous"
   ],
   "pivot_roots": [
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    }
   ],
   "links": [
    {
     "from": "misanthropic",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "pantheon",
      "misanthrope",
      "spendthrift",
      "chromosome"
     ]
    },
    {
     "from": "misanthrope",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "commiserate",
      "misnomer",
      "miserly",
      "misogamy"
     ]
    },
    {
     "from": "misogamy",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "unanimous",
      "monogamous",
      "autonomous",
      "magnanimous"
     ]
    },
    {
     "from": "monogamous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monotonous",
     "answer_definition": "Dull and repetitive; lacking variety.",
     "options": [
      "mnemonic",
      "monotonous",
      "monocle",
      "sanctimonious"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "demos",
    "root": "demos",
    "meaning": "people",
    "origin": "Greek"
   },
   "options": [
    "epidemic",
    "pandemic",
    "endemic",
    "democracy",
    "demagogue"
   ],
   "rounds": [
    {
     "definition": "Regularly found in a particular area or group.",
     "answer": "endemic"
    },
    {
     "definition": "A leader who wins support by stirring up emotions and prejudice.",
     "answer": "demagogue"
    },
    {
     "definition": "A widespread outbreak of disease in a community.",
     "answer": "epidemic"
    },
    {
     "definition": "A system of government by the whole population.",
     "answer": "democracy"
    }
   ],
   "gre_count": 2,
   "id": 50
  },
  {
   "type": "cluster",
   "root": {
    "id": "tome",
    "root": "tome",
    "meaning": "a cutting",
    "origin": "Greek"
   },
   "options": [
    "anatomical",
    "dichotomy",
    "optometry",
    "epitome",
    "atomic"
   ],
   "rounds": [
    {
     "definition": "A division into two sharply opposed parts.",
     "answer": "dichotomy"
    },
    {
     "definition": "A perfect example of a quality or type.",
     "answer": "epitome"
    },
    {
     "definition": "Relating to atoms or atomic energy.",
     "answer": "atomic"
    },
    {
     "definition": "Relating to the structure of the body.",
     "answer": "anatomical"
    }
   ],
   "gre_count": 1,
   "id": 51
  },
  {
   "id": 52,
   "quality": 3,
   "start_word": "microphone",
   "start_definition": "A device that converts sound into an electrical signal.",
   "chain": [
    "microphone",
    "cacophony",
    "cacography",
    "monogram",
    "monotonous"
   ],
   "pivot_roots": [
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    }
   ],
   "links": [
    {
     "from": "microphone",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "graphology",
      "xenophobia",
      "cacophony",
      "photograph"
     ]
    },
    {
     "from": "cacophony",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "cacography",
      "efficacy",
      "perspicacious",
      "efficacious"
     ]
    },
    {
     "from": "cacography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "monogram",
      "aggravate",
      "gradation",
      "gravitas"
     ]
    },
    {
     "from": "monogram",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monotonous",
     "answer_definition": "Dull and repetitive; lacking variety.",
     "options": [
      "monocle",
      "autonomous",
      "monotonous",
      "astronomical"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "grex",
    "root": "grex, gregis",
    "meaning": "herd, flock",
    "origin": "Latin"
   },
   "options": [
    "egregious",
    "congregation",
    "aggregate",
    "gregarious",
    "digress"
   ],
   "rounds": [
    {
     "definition": "Outstandingly bad; shocking.",
     "answer": "egregious"
    },
    {
     "definition": "A group of people gathered, especially for worship.",
     "answer": "congregation"
    },
    {
     "definition": "Fond of company; sociable.",
     "answer": "gregarious"
    },
    {
     "definition": "To gather into a total or whole.",
     "answer": "aggregate"
    }
   ],
   "gre_count": 3,
   "id": 53
  },
  {
   "type": "cluster",
   "root": {
    "id": "aequus",
    "root": "aequus",
    "meaning": "equal",
    "origin": "Latin"
   },
   "options": [
    "equitable",
    "equilibrium",
    "unequivocal",
    "colloquial",
    "equivocate"
   ],
   "rounds": [
    {
     "definition": "A state of balance between opposing forces.",
     "answer": "equilibrium"
    },
    {
     "definition": "Leaving no doubt; entirely clear.",
     "answer": "unequivocal"
    },
    {
     "definition": "Fair and impartial.",
     "answer": "equitable"
    },
    {
     "definition": "To speak vaguely to avoid committing oneself.",
     "answer": "equivocate"
    }
   ],
   "gre_count": 3,
   "id": 54
  },
  {
   "id": 55,
   "quality": 3,
   "start_word": "autonomous",
   "start_definition": "Self-governing; acting independently.",
   "chain": [
    "autonomous",
    "autograph",
    "bibliography",
    "bibliophile",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "cosmonaut",
      "autograph",
      "plutocracy",
      "autocratic"
     ]
    },
    {
     "from": "autograph",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "bibliography",
      "grandiloquent",
      "psychotherapy",
      "gradation"
     ]
    },
    {
     "from": "bibliography",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "discernible",
      "bibliophile",
      "plausible",
      "gullible"
     ]
    },
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "annihilate",
      "pusillanimous",
      "philanthropy",
      "semblance"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "tempus",
    "root": "tempus",
    "meaning": "time",
    "origin": "Latin"
   },
   "options": [
    "empathy",
    "extemporaneous",
    "contemporary",
    "temporal",
    "extemporize"
   ],
   "rounds": [
    {
     "definition": "To improvise, especially a speech or performance, without preparation.",
     "answer": "extemporize"
    },
    {
     "definition": "Relating to time, as opposed to eternity or the spiritual.",
     "answer": "temporal"
    },
    {
     "definition": "Living or occurring at the same time; also, modern.",
     "answer": "contemporary"
    },
    {
     "definition": "Spoken or done without preparation; improvised.",
     "answer": "extemporaneous"
    }
   ],
   "gre_count": 1,
   "id": 56
  },
  {
   "type": "cluster",
   "root": {
    "id": "senex",
    "root": "senex",
    "meaning": "old",
    "origin": "Latin"
   },
   "options": [
    "senior",
    "psychogenic",
    "senile",
    "senility",
    "senescent"
   ],
   "rounds": [
    {
     "definition": "Showing mental decline associated with old age.",
     "answer": "senile"
    },
    {
     "definition": "Growing old; aging.",
     "answer": "senescent"
    },
    {
     "definition": "An older or more experienced person; an elder.",
     "answer": "senior"
    },
    {
     "definition": "The mental and physical decline of old age.",
     "answer": "senility"
    }
   ],
   "gre_count": 0,
   "id": 57
  },
  {
   "id": 58,
   "quality": 3,
   "start_word": "orthodox",
   "start_definition": "Following established or traditional beliefs.",
   "chain": [
    "orthodox",
    "orthography",
    "cacography",
    "cacophony",
    "telephone"
   ],
   "pivot_roots": [
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "orthodox",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "tortuous",
      "orthography",
      "pathology",
      "contort"
     ]
    },
    {
     "from": "orthography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "gravitas",
      "conflagration",
      "psychotherapy",
      "cacography"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "efficacious",
      "perspicacious",
      "cacophony",
      "efficacy"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "telephone",
     "answer_definition": "A device for speaking to someone at a distance.",
     "options": [
      "telephone",
      "xenophobia",
      "photograph",
      "graphology"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "dolere",
    "root": "doleo",
    "meaning": "to grieve",
    "origin": "Latin"
   },
   "options": [
    "condolence",
    "indolent",
    "endodontist",
    "doleful",
    "dolorous"
   ],
   "rounds": [
    {
     "definition": "An expression of sympathy for someone else's grief.",
     "answer": "condolence"
    },
    {
     "definition": "Wanting to avoid activity or exertion; lazy.",
     "answer": "indolent"
    },
    {
     "definition": "Expressing sorrow; mournful.",
     "answer": "doleful"
    },
    {
     "definition": "Feeling or expressing great sorrow or distress.",
     "answer": "dolorous"
    }
   ],
   "gre_count": 1,
   "id": 59
  },
  {
   "type": "cluster",
   "root": {
    "id": "animus",
    "root": "animus",
    "meaning": "mind, spirit",
    "origin": "Latin"
   },
   "options": [
    "animus",
    "magnanimous",
    "equanimity",
    "egomaniacal",
    "animosity"
   ],
   "rounds": [
    {
     "definition": "Strong hostility or resentment.",
     "answer": "animosity"
    },
    {
     "definition": "Calmness and composure under strain.",
     "answer": "equanimity"
    },
    {
     "definition": "Generous and forgiving, especially toward a rival.",
     "answer": "magnanimous"
    },
    {
     "definition": "Hostility or ill feeling; also, an underlying motivation.",
     "answer": "animus"
    }
   ],
   "gre_count": 4,
   "id": 60
  },
  {
   "id": 61,
   "quality": 3,
   "start_word": "philanthropy",
   "start_definition": "The desire to help others, expressed especially through generous giving.",
   "chain": [
    "philanthropy",
    "misanthrope",
    "misogamy",
    "monogamous",
    "monolith"
   ],
   "pivot_roots": [
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    }
   ],
   "links": [
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "spendthrift",
      "anachronism",
      "chronicle",
      "misanthrope"
     ]
    },
    {
     "from": "misanthrope",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "epidermis",
      "misogamy",
      "commiserate",
      "miserly"
     ]
    },
    {
     "from": "misogamy",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "magnanimous",
      "pusillanimous",
      "monogamous",
      "autonomous"
     ]
    },
    {
     "from": "monogamous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monolith",
     "answer_definition": "A large single upright block of stone; also, a large, unified, and unchanging organization.",
     "options": [
      "monolith",
      "monocle",
      "monarch",
      "matrimony"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "cernere",
    "root": "cerno, cretus",
    "meaning": "to separate, discern",
    "origin": "Latin"
   },
   "options": [
    "disaster",
    "indiscriminate",
    "discreet",
    "discretion",
    "discernible"
   ],
   "rounds": [
    {
     "definition": "Done without careful distinction or judgment; random and unselective.",
     "answer": "indiscriminate"
    },
    {
     "definition": "The freedom to decide what should be done in a particular situation.",
     "answer": "discretion"
    },
    {
     "definition": "Able to be perceived or recognized clearly.",
     "answer": "discernible"
    },
    {
     "definition": "Careful and circumspect in speech or action, especially to avoid causing offense or to keep something confidential.",
     "answer": "discreet"
    }
   ],
   "gre_count": 2,
   "id": 62
  },
  {
   "type": "cluster",
   "root": {
    "id": "syn",
    "root": "syn, sym",
    "meaning": "together, with",
    "origin": "Greek"
   },
   "options": [
    "sympathy",
    "synchronous",
    "symbiosis",
    "symphony"
   ],
   "rounds": [
    {
     "definition": "An elaborate musical composition for a full orchestra.",
     "answer": "symphony"
    },
    {
     "definition": "Shared feeling, especially sorrow for another's misfortune.",
     "answer": "sympathy"
    },
    {
     "definition": "A close relationship between two different organisms, often to mutual benefit.",
     "answer": "symbiosis"
    },
    {
     "definition": "Happening at the same time and rate.",
     "answer": "synchronous"
    }
   ],
   "gre_count": 2,
   "id": 63
  },
  {
   "id": 64,
   "quality": 3,
   "start_word": "monotonous",
   "start_definition": "Dull and repetitive; lacking variety.",
   "chain": [
    "monotonous",
    "monogram",
    "cacography",
    "cacophony",
    "telephone"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "monotonous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "cosmonaut",
      "monogram",
      "monocle",
      "monarch"
     ]
    },
    {
     "from": "monogram",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "gravitas",
      "cacography",
      "conflagration",
      "gradation"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "efficacy",
      "efficacious",
      "perspicacious",
      "cacophony"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "telephone",
     "answer_definition": "A device for speaking to someone at a distance.",
     "options": [
      "graphology",
      "telephone",
      "photograph",
      "xenophobia"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "geo",
    "root": "ge (geo-)",
    "meaning": "earth",
    "origin": "Greek"
   },
   "options": [
    "geology",
    "geothermal",
    "burgeon",
    "geography",
    "geometric"
   ],
   "rounds": [
    {
     "definition": "The science of the earth's physical structure and history.",
     "answer": "geology"
    },
    {
     "definition": "The study of the earth's features, peoples, and places.",
     "answer": "geography"
    },
    {
     "definition": "Relating to heat from within the earth.",
     "answer": "geothermal"
    },
    {
     "definition": "Relating to geometry; made of regular shapes and lines.",
     "answer": "geometric"
    }
   ],
   "gre_count": 0,
   "id": 65
  },
  {
   "type": "cluster",
   "root": {
    "id": "sonus",
    "root": "sonus, sonitus",
    "meaning": "sound",
    "origin": "Latin"
   },
   "options": [
    "astronaut",
    "resonant",
    "sonorous",
    "dissonance",
    "unison"
   ],
   "rounds": [
    {
     "definition": "Deep, clear, and continuing to sound or reverberate; also, evocative.",
     "answer": "resonant"
    },
    {
     "definition": "A lack of harmony or agreement, especially in sound or ideas.",
     "answer": "dissonance"
    },
    {
     "definition": "Producing a deep, rich, or resonant sound.",
     "answer": "sonorous"
    },
    {
     "definition": "Simultaneous performance of action or sound; complete agreement.",
     "answer": "unison"
    }
   ],
   "gre_count": 2,
   "id": 66
  },
  {
   "id": 67,
   "quality": 3,
   "start_word": "autonomous",
   "start_definition": "Self-governing; acting independently.",
   "chain": [
    "autonomous",
    "autobiography",
    "bibliography",
    "bibliophile",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autobiography",
     "answer_definition": "The story of a person's life written by that person.",
     "options": [
      "autobiography",
      "plutocracy",
      "autocratic",
      "astronaut"
     ]
    },
    {
     "from": "autobiography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "gradation",
      "bibliography",
      "conflagration",
      "grandiloquent"
     ]
    },
    {
     "from": "bibliography",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "accessible",
      "fallible",
      "tangible",
      "bibliophile"
     ]
    },
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "pusillanimous",
      "languish",
      "annihilate",
      "philanthropy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "regere",
    "root": "rego, rectus",
    "meaning": "to rule, keep straight",
    "origin": "Latin"
   },
   "options": [
    "regnant",
    "regime",
    "rectify",
    "rectitude",
    "chiropractic"
   ],
   "rounds": [
    {
     "definition": "To put something right; to correct an error or fault.",
     "answer": "rectify"
    },
    {
     "definition": "A government, especially an authoritarian one; also, a system or method.",
     "answer": "regime"
    },
    {
     "definition": "Reigning; also, dominant or widespread in influence.",
     "answer": "regnant"
    },
    {
     "definition": "Moral integrity; adherence to strict standards of conduct.",
     "answer": "rectitude"
    }
   ],
   "gre_count": 1,
   "id": 68
  },
  {
   "type": "cluster",
   "root": {
    "id": "tendere",
    "root": "tendo",
    "meaning": "to stretch",
    "origin": "Latin"
   },
   "options": [
    "pretentious",
    "tenuous",
    "attenuate",
    "omnipotent",
    "ostentatious"
   ],
   "rounds": [
    {
     "definition": "Claiming greater importance or merit than is deserved.",
     "answer": "pretentious"
    },
    {
     "definition": "To reduce in force, value, or thickness.",
     "answer": "attenuate"
    },
    {
     "definition": "Very weak or slight; thin.",
     "answer": "tenuous"
    },
    {
     "definition": "Showy in a way meant to impress.",
     "answer": "ostentatious"
    }
   ],
   "gre_count": 4,
   "id": 69
  },
  {
   "id": 70,
   "quality": 3,
   "start_word": "monotonous",
   "start_definition": "Dull and repetitive; lacking variety.",
   "chain": [
    "monotonous",
    "monogamous",
    "misogamy",
    "misanthrope",
    "anthropological"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "monotonous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "monogamous",
      "monocle",
      "acrimonious",
      "mnemonic"
     ]
    },
    {
     "from": "monogamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "prerogative",
      "misogamy",
      "interrogate",
      "surrogate"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "misanthrope",
      "philanthropy",
      "chromosome",
      "chronicle"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "anthropological",
     "answer_definition": "Relating to the study of humankind.",
     "options": [
      "chronological",
      "anachronistic",
      "anthropological",
      "synchronous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "verus",
    "root": "verus",
    "meaning": "true",
    "origin": "Latin"
   },
   "options": [
    "aver",
    "veracious",
    "introvert",
    "veracity",
    "veritable"
   ],
   "rounds": [
    {
     "definition": "To state something confidently as being the case.",
     "answer": "aver"
    },
    {
     "definition": "Speaking or representing the truth; truthful.",
     "answer": "veracious"
    },
    {
     "definition": "Used to emphasize the aptness of a metaphor or description; genuine.",
     "answer": "veritable"
    },
    {
     "definition": "Conformity to facts; accuracy or truthfulness.",
     "answer": "veracity"
    }
   ],
   "gre_count": 2,
   "id": 71
  },
  {
   "type": "cluster",
   "root": {
    "id": "omnis",
    "root": "omnis",
    "meaning": "all",
    "origin": "Latin"
   },
   "options": [
    "omniscient",
    "omnivore",
    "omnipotent",
    "omnipresent",
    "calumniate"
   ],
   "rounds": [
    {
     "definition": "Having unlimited power.",
     "answer": "omnipotent"
    },
    {
     "definition": "Present everywhere at once.",
     "answer": "omnipresent"
    },
    {
     "definition": "An animal that eats both plants and meat.",
     "answer": "omnivore"
    },
    {
     "definition": "Knowing everything.",
     "answer": "omniscient"
    }
   ],
   "gre_count": 0,
   "id": 72
  },
  {
   "id": 73,
   "quality": 3,
   "start_word": "orthodox",
   "start_definition": "Following established or traditional beliefs.",
   "chain": [
    "orthodox",
    "orthography",
    "autograph",
    "autonomous",
    "economy"
   ],
   "pivot_roots": [
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    }
   ],
   "links": [
    {
     "from": "orthodox",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "pathology",
      "tortuous",
      "contort",
      "orthography"
     ]
    },
    {
     "from": "orthography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "ingratiate",
      "ingrate",
      "psychotherapy",
      "autograph"
     ]
    },
    {
     "from": "autograph",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "autocratic",
      "nautical",
      "cosmonaut",
      "autonomous"
     ]
    },
    {
     "from": "autonomous",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "economy",
     "answer_definition": "Careful management of available resources; also, the wealth of a region.",
     "options": [
      "misnomer",
      "monocle",
      "economy",
      "chronometer"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "lux",
    "root": "lux, lucis",
    "meaning": "light",
    "origin": "Latin"
   },
   "options": [
    "lucid",
    "pellucid",
    "placid",
    "elucidate",
    "translucent"
   ],
   "rounds": [
    {
     "definition": "Clear and easy to understand; mentally sharp.",
     "answer": "lucid"
    },
    {
     "definition": "To make clear; to explain.",
     "answer": "elucidate"
    },
    {
     "definition": "Allowing light through but not fully transparent.",
     "answer": "translucent"
    },
    {
     "definition": "Transparently clear.",
     "answer": "pellucid"
    }
   ],
   "gre_count": 2,
   "id": 74
  },
  {
   "type": "cluster",
   "root": {
    "id": "scribere",
    "root": "scribo, scriptus",
    "meaning": "to write",
    "origin": "Latin"
   },
   "options": [
    "ascribe",
    "libertine",
    "inscribe",
    "circumscribe",
    "proscribe"
   ],
   "rounds": [
    {
     "definition": "To restrict within limits.",
     "answer": "circumscribe"
    },
    {
     "definition": "To write or carve onto a surface.",
     "answer": "inscribe"
    },
    {
     "definition": "To attribute to a cause or author.",
     "answer": "ascribe"
    },
    {
     "definition": "To forbid officially.",
     "answer": "proscribe"
    }
   ],
   "gre_count": 3,
   "id": 75
  },
  {
   "id": 76,
   "quality": 3,
   "start_word": "bibliography",
   "start_definition": "A list of the books and sources used in a work.",
   "chain": [
    "bibliography",
    "bibliophile",
    "philanthropy",
    "misanthropic",
    "misanthrope"
   ],
   "pivot_roots": [
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    }
   ],
   "links": [
    {
     "from": "bibliography",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "plausible",
      "bibliophile",
      "accessible",
      "incorrigible"
     ]
    },
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "languish",
      "pusillanimous",
      "philanthropy",
      "annihilate"
     ]
    },
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthropic",
     "answer_definition": "Disliking or shunning other people.",
     "options": [
      "synchronous",
      "chronological",
      "misanthropic",
      "anachronistic"
     ]
    },
    {
     "from": "misanthropic",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chronometer",
      "misanthrope",
      "pantheon",
      "anthropological"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "specere",
    "root": "specio",
    "meaning": "to look",
    "origin": "Latin"
   },
   "options": [
    "retrospective",
    "specious",
    "sociology",
    "circumspect",
    "spectrum"
   ],
   "rounds": [
    {
     "definition": "Seeming right but actually false.",
     "answer": "specious"
    },
    {
     "definition": "Looking back on past events.",
     "answer": "retrospective"
    },
    {
     "definition": "Cautious; considering all circumstances.",
     "answer": "circumspect"
    },
    {
     "definition": "A full range of related qualities or ideas.",
     "answer": "spectrum"
    }
   ],
   "gre_count": 4,
   "id": 77
  },
  {
   "type": "cluster",
   "root": {
    "id": "frangere",
    "root": "frango",
    "meaning": "to break",
    "origin": "Latin"
   },
   "options": [
    "fracture",
    "fractious",
    "refractory",
    "fraught",
    "fragment"
   ],
   "rounds": [
    {
     "definition": "A small part broken off or detached from something larger.",
     "answer": "fragment"
    },
    {
     "definition": "Stubborn or unmanageable; resistant to treatment.",
     "answer": "refractory"
    },
    {
     "definition": "Irritable and quarrelsome; hard to control.",
     "answer": "fractious"
    },
    {
     "definition": "A break or crack, especially in a bone or rigid structure.",
     "answer": "fracture"
    }
   ],
   "gre_count": 2,
   "id": 78
  },
  {
   "id": 79,
   "quality": 3,
   "start_word": "monotonous",
   "start_definition": "Dull and repetitive; lacking variety.",
   "chain": [
    "monotonous",
    "monogram",
    "cacography",
    "cacophony",
    "symphony"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "monotonous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "monogram",
      "economy",
      "monocle",
      "chronometer"
     ]
    },
    {
     "from": "monogram",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "cacography",
      "ingrate",
      "gradation",
      "gravitas"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "efficacy",
      "efficacious",
      "perspicacious",
      "cacophony"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "symphony",
     "answer_definition": "An elaborate musical composition for a full orchestra.",
     "options": [
      "xenophobia",
      "photograph",
      "graphology",
      "symphony"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "durus",
    "root": "durus",
    "meaning": "hard",
    "origin": "Latin"
   },
   "options": [
    "durable",
    "duress",
    "neuralgia",
    "obdurate",
    "duration"
   ],
   "rounds": [
    {
     "definition": "Able to withstand wear; hard-wearing.",
     "answer": "durable"
    },
    {
     "definition": "Stubbornly refusing to change one's opinion or course of action.",
     "answer": "obdurate"
    },
    {
     "definition": "The length of time something continues.",
     "answer": "duration"
    },
    {
     "definition": "Threats or force used to coerce someone into doing something.",
     "answer": "duress"
    }
   ],
   "gre_count": 2,
   "id": 80
  },
  {
   "type": "cluster",
   "root": {
    "id": "currere",
    "root": "curro, cursus",
    "meaning": "to run",
    "origin": "Latin"
   },
   "options": [
    "precursor",
    "unprecedented",
    "concur",
    "recourse",
    "cursory"
   ],
   "rounds": [
    {
     "definition": "A source of help in a difficult situation.",
     "answer": "recourse"
    },
    {
     "definition": "To agree; to have the same opinion.",
     "answer": "concur"
    },
    {
     "definition": "A person or thing that comes before another of the same kind; a forerunner.",
     "answer": "precursor"
    },
    {
     "definition": "Hasty and therefore not thorough or detailed.",
     "answer": "cursory"
    }
   ],
   "gre_count": 1,
   "id": 81
  },
  {
   "id": 82,
   "quality": 3,
   "start_word": "androgynous",
   "start_definition": "Having both male and female characteristics; neither clearly male nor female.",
   "chain": [
    "androgynous",
    "misogynous",
    "misanthrope",
    "philanthropy",
    "philander"
   ],
   "pivot_roots": [
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "androgynous",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "misogynous",
      "dolorous",
      "avaricious",
      "pusillanimous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "misanthrope",
      "pantheon",
      "synchronous",
      "anthropological"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "spendthrift",
      "anachronism",
      "philanthropy",
      "chronicle"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philander",
     "answer_definition": "To have casual romantic affairs, especially by a man.",
     "options": [
      "languid",
      "annihilate",
      "languish",
      "philander"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "ludere",
    "root": "ludo, lusus",
    "meaning": "to play",
    "origin": "Latin"
   },
   "options": [
    "illusory",
    "collusion",
    "pusillanimous",
    "allude",
    "prelude"
   ],
   "rounds": [
    {
     "definition": "Secret cooperation for a deceitful or illegal purpose.",
     "answer": "collusion"
    },
    {
     "definition": "An introductory event or action preceding something more important.",
     "answer": "prelude"
    },
    {
     "definition": "To suggest or refer to something indirectly.",
     "answer": "allude"
    },
    {
     "definition": "Based on illusion; not real, though it appears to be.",
     "answer": "illusory"
    }
   ],
   "gre_count": 2,
   "id": 83
  },
  {
   "type": "cluster",
   "root": {
    "id": "oculus",
    "root": "oculus",
    "meaning": "eye",
    "origin": "Latin"
   },
   "options": [
    "ocular",
    "inoculate",
    "binoculars",
    "circumlocution",
    "oculist"
   ],
   "rounds": [
    {
     "definition": "Relating to the eye or vision.",
     "answer": "ocular"
    },
    {
     "definition": "A device with two lenses for viewing distant objects with both eyes.",
     "answer": "binoculars"
    },
    {
     "definition": "An eye doctor (an older term for an ophthalmologist).",
     "answer": "oculist"
    },
    {
     "definition": "To introduce a substance into the body to build immunity.",
     "answer": "inoculate"
    }
   ],
   "gre_count": 0,
   "id": 84
  },
  {
   "id": 85,
   "quality": 3,
   "start_word": "philanthropy",
   "start_definition": "The desire to help others, expressed especially through generous giving.",
   "chain": [
    "philanthropy",
    "misanthrope",
    "misogamy",
    "monogamous",
    "monotony"
   ],
   "pivot_roots": [
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    }
   ],
   "links": [
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anachronism",
      "misanthrope",
      "chromosome",
      "chronometer"
     ]
    },
    {
     "from": "misanthrope",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "epidermis",
      "miserly",
      "misogamy",
      "commiserate"
     ]
    },
    {
     "from": "misogamy",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "magnanimous",
      "autonomous",
      "pusillanimous",
      "monogamous"
     ]
    },
    {
     "from": "monogamous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monotony",
     "answer_definition": "Lack of variety and interest; tedious sameness.",
     "options": [
      "matrimony",
      "chronometer",
      "monotony",
      "monocle"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "fluere",
    "root": "fluo",
    "meaning": "to flow",
    "origin": "Latin"
   },
   "options": [
    "superfluous",
    "mellifluous",
    "influx",
    "confluence"
   ],
   "rounds": [
    {
     "definition": "Unnecessary, especially through being more than what is needed.",
     "answer": "superfluous"
    },
    {
     "definition": "A coming together of people or things; also, where two rivers meet.",
     "answer": "confluence"
    },
    {
     "definition": "An arrival or entry of large numbers of people or things.",
     "answer": "influx"
    },
    {
     "definition": "Sweet or musical to hear; pleasingly smooth.",
     "answer": "mellifluous"
    }
   ],
   "gre_count": 3,
   "id": 86
  },
  {
   "type": "cluster",
   "root": {
    "id": "astron",
    "root": "astron",
    "meaning": "star",
    "origin": "Greek"
   },
   "options": [
    "disaster",
    "astronomical",
    "disastrous",
    "asteroid",
    "alter ego"
   ],
   "rounds": [
    {
     "definition": "A sudden great misfortune (literally, an ill star).",
     "answer": "disaster"
    },
    {
     "definition": "Causing great damage or ruin.",
     "answer": "disastrous"
    },
    {
     "definition": "A small rocky body orbiting the sun.",
     "answer": "asteroid"
    },
    {
     "definition": "Relating to astronomy; also, enormously large.",
     "answer": "astronomical"
    }
   ],
   "gre_count": 0,
   "id": 87
  },
  {
   "id": 88,
   "quality": 3,
   "start_word": "astronomical",
   "start_definition": "Relating to astronomy; also, enormously large.",
   "chain": [
    "astronomical",
    "autonomous",
    "autograph",
    "orthography",
    "orthodox"
   ],
   "pivot_roots": [
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    }
   ],
   "links": [
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "chronometer",
      "nominal",
      "misnomer",
      "autonomous"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "astronaut",
      "autograph",
      "autocratic",
      "cosmonaut"
     ]
    },
    {
     "from": "autograph",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "psychotherapy",
      "gravitas",
      "gradation",
      "orthography"
     ]
    },
    {
     "from": "orthography",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthodox",
     "answer_definition": "Following established or traditional beliefs.",
     "options": [
      "tortuous",
      "contort",
      "orthodox",
      "distort"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "genesis",
    "root": "genesis",
    "meaning": "birth, origin",
    "origin": "Greek"
   },
   "options": [
    "ingenuity",
    "homogeneous",
    "ingenuous",
    "cogent",
    "congenial"
   ],
   "rounds": [
    {
     "definition": "The quality of being clever, original, and inventive.",
     "answer": "ingenuity"
    },
    {
     "definition": "Innocent and unsuspecting; artlessly frank.",
     "answer": "ingenuous"
    },
    {
     "definition": "Pleasant or agreeable because suited to one's taste or nature.",
     "answer": "congenial"
    },
    {
     "definition": "Uniform in structure or composition throughout; all of the same kind.",
     "answer": "homogeneous"
    }
   ],
   "gre_count": 4,
   "id": 89
  },
  {
   "type": "cluster",
   "root": {
    "id": "gamos",
    "root": "gamos",
    "meaning": "marriage",
    "origin": "Greek"
   },
   "options": [
    "polygamous",
    "bigamous",
    "autonomous",
    "misogamy",
    "monogamous"
   ],
   "rounds": [
    {
     "definition": "Having only one spouse or partner at a time.",
     "answer": "monogamous"
    },
    {
     "definition": "Having more than one spouse at once.",
     "answer": "polygamous"
    },
    {
     "definition": "Involving marriage to two people at the same time.",
     "answer": "bigamous"
    },
    {
     "definition": "Hatred of marriage.",
     "answer": "misogamy"
    }
   ],
   "gre_count": 0,
   "id": 90
  },
  {
   "id": 91,
   "quality": 3,
   "start_word": "orthodox",
   "start_definition": "Following established or traditional beliefs.",
   "chain": [
    "orthodox",
    "orthography",
    "autobiography",
    "autonomous",
    "astronomical"
   ],
   "pivot_roots": [
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    }
   ],
   "links": [
    {
     "from": "orthodox",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "orthography",
      "mortgage",
      "tortuous",
      "contort"
     ]
    },
    {
     "from": "orthography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "autobiography",
     "answer_definition": "The story of a person's life written by that person.",
     "options": [
      "autobiography",
      "ingratiate",
      "gratuitous",
      "psychotherapy"
     ]
    },
    {
     "from": "autobiography",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "nautical",
      "cosmonaut",
      "autonomous",
      "autocratic"
     ]
    },
    {
     "from": "autonomous",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "astronomical",
      "synchronous",
      "chronometer",
      "monotonous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "genesis",
    "root": "genesis",
    "meaning": "birth, origin",
    "origin": "Greek"
   },
   "options": [
    "disingenuous",
    "engender",
    "cogent",
    "homogeneous",
    "ingenuous"
   ],
   "rounds": [
    {
     "definition": "Innocent and unsuspecting; artlessly frank.",
     "answer": "ingenuous"
    },
    {
     "definition": "Uniform in structure or composition throughout; all of the same kind.",
     "answer": "homogeneous"
    },
    {
     "definition": "To cause or give rise to a feeling, situation, or condition.",
     "answer": "engender"
    },
    {
     "definition": "Not candid or sincere, typically by pretending ignorance.",
     "answer": "disingenuous"
    }
   ],
   "gre_count": 4,
   "id": 92
  },
  {
   "type": "cluster",
   "root": {
    "id": "vincere",
    "root": "vinco, victus",
    "meaning": "to conquer",
    "origin": "Latin"
   },
   "options": [
    "convince",
    "evince",
    "consummate",
    "convict",
    "conviction"
   ],
   "rounds": [
    {
     "definition": "A firmly held belief, or a formal declaration of guilt in a court of law.",
     "answer": "conviction"
    },
    {
     "definition": "To formally declare someone guilty of a criminal offense.",
     "answer": "convict"
    },
    {
     "definition": "To cause someone to believe firmly in the truth of something.",
     "answer": "convince"
    },
    {
     "definition": "To clearly reveal or demonstrate a feeling or quality.",
     "answer": "evince"
    }
   ],
   "gre_count": 1,
   "id": 93
  },
  {
   "id": 94,
   "quality": 3,
   "start_word": "bible",
   "start_definition": "A book regarded as authoritative on a subject.",
   "chain": [
    "bible",
    "bibliophile",
    "philanthropy",
    "misanthropic",
    "misanthrope"
   ],
   "pivot_roots": [
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    }
   ],
   "links": [
    {
     "from": "bible",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "bibliophile",
      "incorrigible",
      "irascible",
      "fungible"
     ]
    },
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "pusillanimous",
      "philanthropy",
      "semblance",
      "annihilate"
     ]
    },
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthropic",
     "answer_definition": "Disliking or shunning other people.",
     "options": [
      "chronological",
      "anachronistic",
      "misanthropic",
      "synchronous"
     ]
    },
    {
     "from": "misanthropic",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anthropological",
      "chronicle",
      "spendthrift",
      "misanthrope"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "habere",
    "root": "habeo, habitus",
    "meaning": "to hold",
    "origin": "Latin"
   },
   "options": [
    "habitat",
    "prohibit",
    "exhibit",
    "inhibit",
    "probity"
   ],
   "rounds": [
    {
     "definition": "To formally forbid something, especially by law or rule.",
     "answer": "prohibit"
    },
    {
     "definition": "To publicly display something, or to show a quality or feeling.",
     "answer": "exhibit"
    },
    {
     "definition": "To hinder, restrain, or prevent an action or process.",
     "answer": "inhibit"
    },
    {
     "definition": "The natural home or environment of an animal, plant, or other organism.",
     "answer": "habitat"
    }
   ],
   "gre_count": 0,
   "id": 95
  },
  {
   "type": "cluster",
   "root": {
    "id": "ferre",
    "root": "fero",
    "meaning": "to carry",
    "origin": "Latin"
   },
   "options": [
    "proliferate",
    "vociferous",
    "deference",
    "fervent",
    "confer"
   ],
   "rounds": [
    {
     "definition": "To grant, or to consult together.",
     "answer": "confer"
    },
    {
     "definition": "Respectful submission to another's judgment.",
     "answer": "deference"
    },
    {
     "definition": "Loud and insistent in expressing opinion.",
     "answer": "vociferous"
    },
    {
     "definition": "To increase rapidly in number; to multiply.",
     "answer": "proliferate"
    }
   ],
   "gre_count": 4,
   "id": 96
  },
  {
   "id": 97,
   "quality": 3,
   "start_word": "monotonous",
   "start_definition": "Dull and repetitive; lacking variety.",
   "chain": [
    "monotonous",
    "monogamous",
    "misogamy",
    "misanthrope",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "monotonous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "monocle",
      "monogamous",
      "mnemonic",
      "sonorous"
     ]
    },
    {
     "from": "monogamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "prerogative",
      "surrogate",
      "arrogate",
      "misogamy"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anachronism",
      "anthropological",
      "misanthrope",
      "chronicle"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "spendthrift",
      "chromosome",
      "chronometer",
      "philanthropy"
     ]
    }
   ],
   "gre_count": 3,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "gradi",
    "root": "gradior",
    "meaning": "to step",
    "origin": "Latin"
   },
   "options": [
    "egress",
    "adroitness",
    "transgression",
    "retrograde",
    "digress"
   ],
   "rounds": [
    {
     "definition": "To depart from the main subject.",
     "answer": "digress"
    },
    {
     "definition": "An act that breaks a law or moral rule.",
     "answer": "transgression"
    },
    {
     "definition": "The action of going out; an exit.",
     "answer": "egress"
    },
    {
     "definition": "Directed or moving backward; reverting to an earlier state.",
     "answer": "retrograde"
    }
   ],
   "gre_count": 4,
   "id": 98
  },
  {
   "type": "cluster",
   "root": {
    "id": "frangere",
    "root": "frango",
    "meaning": "to break",
    "origin": "Latin"
   },
   "options": [
    "fragment",
    "frailty",
    "chiropractic",
    "fractious",
    "refractory"
   ],
   "rounds": [
    {
     "definition": "Irritable and quarrelsome; hard to control.",
     "answer": "fractious"
    },
    {
     "definition": "A small part broken off or detached from something larger.",
     "answer": "fragment"
    },
    {
     "definition": "The condition of being weak or easily broken; a weakness in character.",
     "answer": "frailty"
    },
    {
     "definition": "Stubborn or unmanageable; resistant to treatment.",
     "answer": "refractory"
    }
   ],
   "gre_count": 2,
   "id": 99
  },
  {
   "id": 100,
   "quality": 3,
   "start_word": "economy",
   "start_definition": "Careful management of available resources; also, the wealth of a region.",
   "chain": [
    "economy",
    "autonomous",
    "autograph",
    "cacography",
    "cacophony"
   ],
   "pivot_roots": [
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    }
   ],
   "links": [
    {
     "from": "economy",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "autonomous",
      "nominal",
      "misnomer",
      "chronometer"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "cosmonaut",
      "autograph",
      "plutocracy",
      "autocratic"
     ]
    },
    {
     "from": "autograph",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "cacography",
      "conflagration",
      "psychotherapy",
      "gradation"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "efficacy",
      "perspicacious",
      "efficacious",
      "cacophony"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "dominus",
    "root": "dominus",
    "meaning": "master",
    "origin": "Latin"
   },
   "options": [
    "indomitable",
    "predominant",
    "astronomical",
    "dominant",
    "domineering"
   ],
   "rounds": [
    {
     "definition": "Impossible to subdue or defeat; unyielding.",
     "answer": "indomitable"
    },
    {
     "definition": "Present as the main or strongest element.",
     "answer": "predominant"
    },
    {
     "definition": "Tending to control others in an overbearing way.",
     "answer": "domineering"
    },
    {
     "definition": "Most important, powerful, or influential.",
     "answer": "dominant"
    }
   ],
   "gre_count": 1,
   "id": 101
  },
  {
   "type": "cluster",
   "root": {
    "id": "valere",
    "root": "valeo",
    "meaning": "to be strong",
    "origin": "Latin"
   },
   "options": [
    "validate",
    "convalescent",
    "dialect",
    "ambivalent",
    "equivalent"
   ],
   "rounds": [
    {
     "definition": "Having mixed feelings or contradictory ideas about something.",
     "answer": "ambivalent"
    },
    {
     "definition": "To confirm the accuracy or worth of something.",
     "answer": "validate"
    },
    {
     "definition": "Recovering from an illness or medical treatment.",
     "answer": "convalescent"
    },
    {
     "definition": "Equal in value, amount, function, or meaning.",
     "answer": "equivalent"
    }
   ],
   "gre_count": 1,
   "id": 102
  },
  {
   "id": 103,
   "quality": 3,
   "start_word": "bibliography",
   "start_definition": "A list of the books and sources used in a work.",
   "chain": [
    "bibliography",
    "bibliophile",
    "philanthropy",
    "misanthrope",
    "misogamy"
   ],
   "pivot_roots": [
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    }
   ],
   "links": [
    {
     "from": "bibliography",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "discernible",
      "irascible",
      "fallible",
      "bibliophile"
     ]
    },
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "pusillanimous",
      "annihilate",
      "philanthropy",
      "languish"
     ]
    },
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "misanthrope",
      "chronometer",
      "spendthrift",
      "chronicle"
     ]
    },
    {
     "from": "misanthrope",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "commiserate",
      "misnomer",
      "miserly",
      "misogamy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "kratos",
    "root": "kratos",
    "meaning": "power, rule",
    "origin": "Greek"
   },
   "options": [
    "plutocracy",
    "autocratic",
    "chiropractic",
    "meritocracy",
    "bureaucracy"
   ],
   "rounds": [
    {
     "definition": "A system of government or administration run by many officials and fixed rules.",
     "answer": "bureaucracy"
    },
    {
     "definition": "A system in which advancement is based on individual ability or achievement.",
     "answer": "meritocracy"
    },
    {
     "definition": "Relating to a ruler who has absolute power; domineering.",
     "answer": "autocratic"
    },
    {
     "definition": "A society or government controlled by the wealthy.",
     "answer": "plutocracy"
    }
   ],
   "gre_count": 2,
   "id": 104
  },
  {
   "type": "cluster",
   "root": {
    "id": "gyne",
    "root": "gyne",
    "meaning": "woman",
    "origin": "Greek"
   },
   "options": [
    "gynecology",
    "monogamous",
    "polygyny",
    "misogynous",
    "androgynous"
   ],
   "rounds": [
    {
     "definition": "Having both male and female characteristics; neither clearly male nor female.",
     "answer": "androgynous"
    },
    {
     "definition": "Showing hatred or contempt for women.",
     "answer": "misogynous"
    },
    {
     "definition": "The branch of medicine dealing with women's health.",
     "answer": "gynecology"
    },
    {
     "definition": "The custom of one man having several wives.",
     "answer": "polygyny"
    }
   ],
   "gre_count": 0,
   "id": 105
  },
  {
   "id": 106,
   "quality": 3,
   "start_word": "bibliophile",
   "start_definition": "A lover or collector of books.",
   "chain": [
    "bibliophile",
    "philanthropy",
    "misanthrope",
    "misogynous",
    "androgynous"
   ],
   "pivot_roots": [
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    }
   ],
   "links": [
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "pusillanimous",
      "philanthropy",
      "languid",
      "annihilate"
     ]
    },
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chronometer",
      "pantheon",
      "misanthrope",
      "spendthrift"
     ]
    },
    {
     "from": "misanthrope",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "commiserate",
      "miserly",
      "epidermis",
      "misogynous"
     ]
    },
    {
     "from": "misogynous",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "androgynous",
     "answer_definition": "Having both male and female characteristics; neither clearly male nor female.",
     "options": [
      "vivacious",
      "prodigious",
      "androgynous",
      "bigamous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "scribere",
    "root": "scribo, scriptus",
    "meaning": "to write",
    "origin": "Latin"
   },
   "options": [
    "tripod",
    "circumscribe",
    "ascribe",
    "conscription",
    "proscribe"
   ],
   "rounds": [
    {
     "definition": "Compulsory enrollment, especially for military service.",
     "answer": "conscription"
    },
    {
     "definition": "To restrict within limits.",
     "answer": "circumscribe"
    },
    {
     "definition": "To forbid officially.",
     "answer": "proscribe"
    },
    {
     "definition": "To attribute to a cause or author.",
     "answer": "ascribe"
    }
   ],
   "gre_count": 3,
   "id": 107
  },
  {
   "type": "cluster",
   "root": {
    "id": "clamare",
    "root": "clamo",
    "meaning": "to shout",
    "origin": "Latin"
   },
   "options": [
    "ironclad",
    "declaim",
    "claim",
    "acclaim",
    "clamor"
   ],
   "rounds": [
    {
     "definition": "To speak rhetorically or passionately.",
     "answer": "declaim"
    },
    {
     "definition": "To praise enthusiastically and publicly.",
     "answer": "acclaim"
    },
    {
     "definition": "A loud, confused noise or vehement protest.",
     "answer": "clamor"
    },
    {
     "definition": "To state that something is true, especially without proof; to formally request something owed.",
     "answer": "claim"
    }
   ],
   "gre_count": 2,
   "id": 108
  },
  {
   "id": 109,
   "quality": 3,
   "start_word": "economy",
   "start_definition": "Careful management of available resources; also, the wealth of a region.",
   "chain": [
    "economy",
    "autonomous",
    "autobiography",
    "cacography",
    "cacophony"
   ],
   "pivot_roots": [
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    }
   ],
   "links": [
    {
     "from": "economy",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "misnomer",
      "chronometer",
      "nominal",
      "autonomous"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autobiography",
     "answer_definition": "The story of a person's life written by that person.",
     "options": [
      "autobiography",
      "cosmonaut",
      "plutocracy",
      "autocratic"
     ]
    },
    {
     "from": "autobiography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "gravitas",
      "ingrate",
      "conflagration",
      "cacography"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "efficacious",
      "perspicacious",
      "cacophony",
      "efficacy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "senex",
    "root": "senex",
    "meaning": "old",
    "origin": "Latin"
   },
   "options": [
    "senility",
    "senescent",
    "senile",
    "senate",
    "omnipresent"
   ],
   "rounds": [
    {
     "definition": "A governing council, originally an assembly of elders.",
     "answer": "senate"
    },
    {
     "definition": "Growing old; aging.",
     "answer": "senescent"
    },
    {
     "definition": "The mental and physical decline of old age.",
     "answer": "senility"
    },
    {
     "definition": "Showing mental decline associated with old age.",
     "answer": "senile"
    }
   ],
   "gre_count": 0,
   "id": 110
  },
  {
   "type": "cluster",
   "root": {
    "id": "mors",
    "root": "mors, mortis",
    "meaning": "death",
    "origin": "Latin"
   },
   "options": [
    "amortize",
    "mortgage",
    "moribund",
    "mortify",
    "orthodontia"
   ],
   "rounds": [
    {
     "definition": "To cause someone to feel deeply embarrassed or humiliated.",
     "answer": "mortify"
    },
    {
     "definition": "A loan used to purchase property, secured by that property.",
     "answer": "mortgage"
    },
    {
     "definition": "To gradually pay off a debt over time through regular installments.",
     "answer": "amortize"
    },
    {
     "definition": "In a state of stagnation or decline; approaching death.",
     "answer": "moribund"
    }
   ],
   "gre_count": 1,
   "id": 111
  },
  {
   "id": 112,
   "quality": 3,
   "start_word": "misogynous",
   "start_definition": "Showing hatred or contempt for women.",
   "chain": [
    "misogynous",
    "misanthrope",
    "philanthropy",
    "bibliophile",
    "bible"
   ],
   "pivot_roots": [
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    }
   ],
   "links": [
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "misanthrope",
      "anachronism",
      "synchronous",
      "anthropological"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "anachronism",
      "spendthrift",
      "philanthropy",
      "chronicle"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "bibliophile",
      "annihilate",
      "sophist",
      "sophistry"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bible",
     "answer_definition": "A book regarded as authoritative on a subject.",
     "options": [
      "fallible",
      "gullible",
      "bible",
      "credible"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "ego",
    "root": "ego",
    "meaning": "I, self",
    "origin": "Latin"
   },
   "options": [
    "egoism",
    "egotist",
    "egomaniacal",
    "alter ego"
   ],
   "rounds": [
    {
     "definition": "A second self; a trusted friend or a contrasting side of one's character.",
     "answer": "alter ego"
    },
    {
     "definition": "A person who talks about themselves constantly and boastfully.",
     "answer": "egotist"
    },
    {
     "definition": "The ethical view that self-interest is the proper basis of action.",
     "answer": "egoism"
    },
    {
     "definition": "Marked by an obsessive preoccupation with oneself.",
     "answer": "egomaniacal"
    }
   ],
   "gre_count": 0,
   "id": 113
  },
  {
   "type": "cluster",
   "root": {
    "id": "animus",
    "root": "animus",
    "meaning": "mind, spirit",
    "origin": "Latin"
   },
   "options": [
    "egomaniacal",
    "animus",
    "pusillanimous",
    "animosity",
    "equanimity"
   ],
   "rounds": [
    {
     "definition": "Hostility or ill feeling; also, an underlying motivation.",
     "answer": "animus"
    },
    {
     "definition": "Strong hostility or resentment.",
     "answer": "animosity"
    },
    {
     "definition": "Timid; lacking courage.",
     "answer": "pusillanimous"
    },
    {
     "definition": "Calmness and composure under strain.",
     "answer": "equanimity"
    }
   ],
   "gre_count": 4,
   "id": 114
  },
  {
   "id": 115,
   "quality": 3,
   "start_word": "economy",
   "start_definition": "Careful management of available resources; also, the wealth of a region.",
   "chain": [
    "economy",
    "autonomous",
    "autograph",
    "monogram",
    "monotonous"
   ],
   "pivot_roots": [
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    }
   ],
   "links": [
    {
     "from": "economy",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "misnomer",
      "nominal",
      "chronometer",
      "autonomous"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "astronaut",
      "autograph",
      "autocratic",
      "plutocracy"
     ]
    },
    {
     "from": "autograph",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "monogram",
      "gravitas",
      "aggravate",
      "gradation"
     ]
    },
    {
     "from": "monogram",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monotonous",
     "answer_definition": "Dull and repetitive; lacking variety.",
     "options": [
      "chronological",
      "monotonous",
      "mnemonic",
      "monocle"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "pungere",
    "root": "pungo, punctus",
    "meaning": "to prick, pierce",
    "origin": "Latin"
   },
   "options": [
    "pungent",
    "expunge",
    "punctilious",
    "compunction",
    "fungible"
   ],
   "rounds": [
    {
     "definition": "To erase or remove completely.",
     "answer": "expunge"
    },
    {
     "definition": "Having a sharply strong taste or smell.",
     "answer": "pungent"
    },
    {
     "definition": "Showing great attention to detail or correct behavior.",
     "answer": "punctilious"
    },
    {
     "definition": "A feeling of guilt or unease about one's actions.",
     "answer": "compunction"
    }
   ],
   "gre_count": 3,
   "id": 116
  },
  {
   "type": "cluster",
   "root": {
    "id": "orthos",
    "root": "orthos",
    "meaning": "straight, correct",
    "origin": "Greek"
   },
   "options": [
    "orthopedic",
    "pathology",
    "orthodox",
    "orthography",
    "orthodontia"
   ],
   "rounds": [
    {
     "definition": "The dental practice of straightening teeth.",
     "answer": "orthodontia"
    },
    {
     "definition": "Relating to the correction of bones and muscles.",
     "answer": "orthopedic"
    },
    {
     "definition": "Following established or traditional beliefs.",
     "answer": "orthodox"
    },
    {
     "definition": "The conventional spelling system of a language.",
     "answer": "orthography"
    }
   ],
   "gre_count": 1,
   "id": 117
  },
  {
   "id": 118,
   "quality": 3,
   "start_word": "engender",
   "start_definition": "To cause or give rise to a feeling, situation, or condition.",
   "chain": [
    "engender",
    "genealogy",
    "gynecology",
    "misogynous",
    "misanthrope"
   ],
   "pivot_roots": [
    {
     "id": "genesis",
     "root": "genesis",
     "meaning": "birth, origin"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    }
   ],
   "links": [
    {
     "from": "engender",
     "root": "genesis",
     "root_display": "genesis",
     "root_meaning": "birth, origin",
     "answer": "genealogy",
     "answer_definition": "The study of family lines and descent.",
     "options": [
      "genealogy",
      "exigent",
      "tangential",
      "astringent"
     ]
    },
    {
     "from": "genealogy",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gynecology",
     "answer_definition": "The branch of medicine dealing with women's health.",
     "options": [
      "gynecology",
      "androgynous",
      "pedagogy",
      "dolorous"
     ]
    },
    {
     "from": "gynecology",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "audacious",
      "gratuitous",
      "misogynous",
      "dolorous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anthropological",
      "philanthropy",
      "synchronous",
      "misanthrope"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "autos",
    "root": "autos",
    "meaning": "self",
    "origin": "Greek"
   },
   "options": [
    "autonomous",
    "autopsy",
    "autograph",
    "astronaut",
    "automatic"
   ],
   "rounds": [
    {
     "definition": "A person's own signature, especially a celebrity's.",
     "answer": "autograph"
    },
    {
     "definition": "Self-governing; acting independently.",
     "answer": "autonomous"
    },
    {
     "definition": "Working by itself without direct human control.",
     "answer": "automatic"
    },
    {
     "definition": "An examination of a body to determine the cause of death.",
     "answer": "autopsy"
    }
   ],
   "gre_count": 1,
   "id": 119
  },
  {
   "type": "cluster",
   "root": {
    "id": "manus",
    "root": "manus",
    "meaning": "hand",
    "origin": "Latin"
   },
   "options": [
    "mandate",
    "egomaniacal",
    "manual",
    "manifest",
    "emancipate"
   ],
   "rounds": [
    {
     "definition": "Operated or done by hand rather than automatically.",
     "answer": "manual"
    },
    {
     "definition": "Clear or obvious to the eye or mind.",
     "answer": "manifest"
    },
    {
     "definition": "To set free from legal, social, or political restrictions.",
     "answer": "emancipate"
    },
    {
     "definition": "An official order or authorization to act in a particular way.",
     "answer": "mandate"
    }
   ],
   "gre_count": 1,
   "id": 120
  },
  {
   "id": 121,
   "quality": 3,
   "start_word": "misogynous",
   "start_definition": "Showing hatred or contempt for women.",
   "chain": [
    "misogynous",
    "misanthrope",
    "philanthropy",
    "bibliophile",
    "bibliography"
   ],
   "pivot_roots": [
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    }
   ],
   "links": [
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "misanthrope",
      "synchronous",
      "anthropological",
      "chronicle"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "anachronism",
      "chromosome",
      "chronicle",
      "philanthropy"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "bibliophile",
      "sophisticated",
      "sophist",
      "sophistry"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "discernible",
      "irascible",
      "plausible",
      "bibliography"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "sacer",
    "root": "sacer, sanctus",
    "meaning": "sacred, holy",
    "origin": "Latin"
   },
   "options": [
    "sacrosanct",
    "sanctimonious",
    "sanction",
    "sacrilege"
   ],
   "rounds": [
    {
     "definition": "A violation of something regarded as sacred.",
     "answer": "sacrilege"
    },
    {
     "definition": "Making a show of being morally superior to others.",
     "answer": "sanctimonious"
    },
    {
     "definition": "Official permission for an action, or a penalty for breaking a rule.",
     "answer": "sanction"
    },
    {
     "definition": "Regarded as too important or sacred to be interfered with.",
     "answer": "sacrosanct"
    }
   ],
   "gre_count": 3,
   "id": 122
  },
  {
   "type": "cluster",
   "root": {
    "id": "derma",
    "root": "derma",
    "meaning": "skin",
    "origin": "Greek"
   },
   "options": [
    "hypodermic",
    "dermatology",
    "dermatitis",
    "thermometer",
    "pachyderm"
   ],
   "rounds": [
    {
     "definition": "Inflammation of the skin.",
     "answer": "dermatitis"
    },
    {
     "definition": "Relating to or delivered beneath the skin.",
     "answer": "hypodermic"
    },
    {
     "definition": "The branch of medicine dealing with the skin.",
     "answer": "dermatology"
    },
    {
     "definition": "A thick-skinned mammal such as an elephant or rhinoceros.",
     "answer": "pachyderm"
    }
   ],
   "gre_count": 0,
   "id": 123
  },
  {
   "id": 124,
   "quality": 3,
   "start_word": "astronomical",
   "start_definition": "Relating to astronomy; also, enormously large.",
   "chain": [
    "astronomical",
    "autonomous",
    "autobiography",
    "monogram",
    "monotonous"
   ],
   "pivot_roots": [
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    }
   ],
   "links": [
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "misnomer",
      "nominal",
      "chronometer",
      "autonomous"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autobiography",
     "answer_definition": "The story of a person's life written by that person.",
     "options": [
      "autocratic",
      "plutocracy",
      "autobiography",
      "astronaut"
     ]
    },
    {
     "from": "autobiography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "gradation",
      "aggravate",
      "gravitas",
      "monogram"
     ]
    },
    {
     "from": "monogram",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monotonous",
     "answer_definition": "Dull and repetitive; lacking variety.",
     "options": [
      "monocle",
      "sonorous",
      "mnemonic",
      "monotonous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "caput_capitis",
    "root": "caput, capitis",
    "meaning": "head",
    "origin": "Latin"
   },
   "options": [
    "precipitate",
    "capitalize",
    "capitulate",
    "decapitate",
    "epitome"
   ],
   "rounds": [
    {
     "definition": "To cut off the head of.",
     "answer": "decapitate"
    },
    {
     "definition": "To take advantage of an opportunity; also, to provide with funds.",
     "answer": "capitalize"
    },
    {
     "definition": "To cease resisting and accept an opponent's demands.",
     "answer": "capitulate"
    },
    {
     "definition": "To cause an event or situation to happen suddenly or sooner than expected.",
     "answer": "precipitate"
    }
   ],
   "gre_count": 2,
   "id": 125
  },
  {
   "type": "cluster",
   "root": {
    "id": "gravis",
    "root": "gravis",
    "meaning": "heavy, serious",
    "origin": "Latin"
   },
   "options": [
    "aggrieved",
    "cardiogram",
    "aggravate",
    "gravitas",
    "grievous"
   ],
   "rounds": [
    {
     "definition": "To make a problem or situation worse; also, to irritate.",
     "answer": "aggravate"
    },
    {
     "definition": "Very severe or serious; causing grief or suffering.",
     "answer": "grievous"
    },
    {
     "definition": "Feeling resentment at having been unfairly treated.",
     "answer": "aggrieved"
    },
    {
     "definition": "Dignity, seriousness, or solemnity of manner.",
     "answer": "gravitas"
    }
   ],
   "gre_count": 2,
   "id": 126
  },
  {
   "id": 127,
   "quality": 3,
   "start_word": "philanderer",
   "start_definition": "A man who engages in casual love affairs.",
   "chain": [
    "philanderer",
    "philanthropy",
    "misanthrope",
    "misogamy",
    "monogamous"
   ],
   "pivot_roots": [
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    }
   ],
   "links": [
    {
     "from": "philanderer",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "pusillanimous",
      "semblance",
      "philanthropy",
      "languish"
     ]
    },
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chronometer",
      "chromosome",
      "misanthrope",
      "chronicle"
     ]
    },
    {
     "from": "misanthrope",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "commiserate",
      "misogamy",
      "miserly",
      "epidermis"
     ]
    },
    {
     "from": "misogamy",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "monogamous",
     "answer_definition": "Having only one spouse or partner at a time.",
     "options": [
      "paramount",
      "magnanimous",
      "pusillanimous",
      "monogamous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "clamare",
    "root": "clamo",
    "meaning": "to shout",
    "origin": "Latin"
   },
   "options": [
    "clamor",
    "declaim",
    "claim",
    "proclaim",
    "ironclad"
   ],
   "rounds": [
    {
     "definition": "To state that something is true, especially without proof; to formally request something owed.",
     "answer": "claim"
    },
    {
     "definition": "To announce publicly and formally.",
     "answer": "proclaim"
    },
    {
     "definition": "A loud, confused noise or vehement protest.",
     "answer": "clamor"
    },
    {
     "definition": "To speak rhetorically or passionately.",
     "answer": "declaim"
    }
   ],
   "gre_count": 2,
   "id": 128
  },
  {
   "type": "cluster",
   "root": {
    "id": "pellere",
    "root": "pello, pulsus",
    "meaning": "to drive",
    "origin": "Latin"
   },
   "options": [
    "propel",
    "pellucid",
    "expel",
    "compel",
    "repel"
   ],
   "rounds": [
    {
     "definition": "To force someone to leave a place or organization.",
     "answer": "expel"
    },
    {
     "definition": "To drive or push something forward.",
     "answer": "propel"
    },
    {
     "definition": "To force or oblige someone to do something.",
     "answer": "compel"
    },
    {
     "definition": "To drive back or ward off an attack, or to cause disgust.",
     "answer": "repel"
    }
   ],
   "gre_count": 0,
   "id": 129
  },
  {
   "id": 130,
   "quality": 3,
   "start_word": "misogamy",
   "start_definition": "Hatred of marriage.",
   "chain": [
    "misogamy",
    "misanthrope",
    "philanthropy",
    "bibliophile",
    "bible"
   ],
   "pivot_roots": [
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    }
   ],
   "links": [
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "pantheon",
      "anthropological",
      "misanthrope",
      "chronometer"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "chronometer",
      "spendthrift",
      "philanthropy",
      "chromosome"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "sophistry",
      "bibliophile",
      "sophisticated",
      "annihilate"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bible",
     "answer_definition": "A book regarded as authoritative on a subject.",
     "options": [
      "credible",
      "fungible",
      "gullible",
      "bible"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "syn",
    "root": "syn, sym",
    "meaning": "together, with",
    "origin": "Greek"
   },
   "options": [
    "symbiosis",
    "symmetry",
    "synopsis",
    "synchronous"
   ],
   "rounds": [
    {
     "definition": "Happening at the same time and rate.",
     "answer": "synchronous"
    },
    {
     "definition": "Balanced proportion; matching form on either side.",
     "answer": "symmetry"
    },
    {
     "definition": "A brief summary or outline.",
     "answer": "synopsis"
    },
    {
     "definition": "A close relationship between two different organisms, often to mutual benefit.",
     "answer": "symbiosis"
    }
   ],
   "gre_count": 2,
   "id": 131
  },
  {
   "type": "cluster",
   "root": {
    "id": "plenus",
    "root": "plenus",
    "meaning": "full",
    "origin": "Latin"
   },
   "options": [
    "plenary",
    "complementary",
    "complement",
    "replete",
    "supple"
   ],
   "rounds": [
    {
     "definition": "Combining in a way that enhances or completes something else.",
     "answer": "complementary"
    },
    {
     "definition": "Filled or well-supplied with something.",
     "answer": "replete"
    },
    {
     "definition": "To complete or enhance by adding something that works well together.",
     "answer": "complement"
    },
    {
     "definition": "Complete in every respect; also, attended by all members.",
     "answer": "plenary"
    }
   ],
   "gre_count": 2,
   "id": 132
  },
  {
   "id": 133,
   "quality": 3,
   "start_word": "gynecology",
   "start_definition": "The branch of medicine dealing with women's health.",
   "chain": [
    "gynecology",
    "misogynous",
    "misanthrope",
    "philanthropy",
    "philander"
   ],
   "pivot_roots": [
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "gynecology",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "misogynous",
      "pusillanimous",
      "timorous",
      "dolorous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "synchronous",
      "chronicle",
      "misanthrope",
      "anthropological"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "philanthropy",
      "chronicle",
      "spendthrift",
      "anachronism"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philander",
     "answer_definition": "To have casual romantic affairs, especially by a man.",
     "options": [
      "philander",
      "languid",
      "pusillanimous",
      "languish"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "pan",
    "root": "pan",
    "meaning": "all",
    "origin": "Greek"
   },
   "options": [
    "panache",
    "discrepancy",
    "panacea",
    "panegyric",
    "pandemic"
   ],
   "rounds": [
    {
     "definition": "Occurring over a wide geographic area and affecting a large proportion of a population.",
     "answer": "pandemic"
    },
    {
     "definition": "A solution or remedy claimed to fix every problem.",
     "answer": "panacea"
    },
    {
     "definition": "A public speech or piece of writing praising someone or something highly.",
     "answer": "panegyric"
    },
    {
     "definition": "Flamboyant confidence of style or manner.",
     "answer": "panache"
    }
   ],
   "gre_count": 2,
   "id": 134
  },
  {
   "type": "cluster",
   "root": {
    "id": "vivere",
    "root": "vivo",
    "meaning": "to live",
    "origin": "Latin"
   },
   "options": [
    "vivacious",
    "convivial",
    "vivid",
    "revive"
   ],
   "rounds": [
    {
     "definition": "Producing powerful feelings or clear images in the mind.",
     "answer": "vivid"
    },
    {
     "definition": "Full of energy and enthusiasm; lively.",
     "answer": "vivacious"
    },
    {
     "definition": "Friendly, lively, and enjoyable, especially in atmosphere.",
     "answer": "convivial"
    },
    {
     "definition": "To restore to life, consciousness, or vigor.",
     "answer": "revive"
    }
   ],
   "gre_count": 2,
   "id": 135
  },
  {
   "id": 136,
   "quality": 3,
   "start_word": "monogamous",
   "start_definition": "Having only one spouse or partner at a time.",
   "chain": [
    "monogamous",
    "misogamy",
    "misanthrope",
    "philanthropy",
    "bibliophile"
   ],
   "pivot_roots": [
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "monogamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "misogamy",
      "prerogative",
      "derogatory",
      "surrogate"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anachronism",
      "chronicle",
      "misanthrope",
      "anthropological"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "chronometer",
      "anachronism",
      "chronicle",
      "philanthropy"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "sophist",
      "bibliophile",
      "annihilate",
      "sophistry"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "videre",
    "root": "video, visus",
    "meaning": "to see",
    "origin": "Latin"
   },
   "options": [
    "vision",
    "visionary",
    "supervision",
    "invidious",
    "recidivism"
   ],
   "rounds": [
    {
     "definition": "Thinking about or planning the future with imagination and wisdom.",
     "answer": "visionary"
    },
    {
     "definition": "The ability to see, or a vivid mental image of the future.",
     "answer": "vision"
    },
    {
     "definition": "Likely to cause resentment or anger by seeming unfair.",
     "answer": "invidious"
    },
    {
     "definition": "The action of overseeing and directing the work of others.",
     "answer": "supervision"
    }
   ],
   "gre_count": 1,
   "id": 137
  },
  {
   "type": "cluster",
   "root": {
    "id": "gratus",
    "root": "gratus",
    "meaning": "pleasing",
    "origin": "Latin"
   },
   "options": [
    "ingratiate",
    "gratuitous",
    "ingrate",
    "cardiogram",
    "gratify"
   ],
   "rounds": [
    {
     "definition": "An ungrateful person.",
     "answer": "ingrate"
    },
    {
     "definition": "Uncalled for; given without cause.",
     "answer": "gratuitous"
    },
    {
     "definition": "To give pleasure or satisfaction.",
     "answer": "gratify"
    },
    {
     "definition": "To bring oneself into favor, often by flattery.",
     "answer": "ingratiate"
    }
   ],
   "gre_count": 2,
   "id": 138
  },
  {
   "id": 139,
   "quality": 3,
   "start_word": "monotonous",
   "start_definition": "Dull and repetitive; lacking variety.",
   "chain": [
    "monotonous",
    "monogram",
    "autograph",
    "autonomous",
    "astronomical"
   ],
   "pivot_roots": [
    {
     "id": "monos",
     "root": "monos",
     "meaning": "one"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    }
   ],
   "links": [
    {
     "from": "monotonous",
     "root": "monos",
     "root_display": "monos",
     "root_meaning": "one",
     "answer": "monogram",
     "answer_definition": "A design combining a person's initials.",
     "options": [
      "monocle",
      "economy",
      "chronometer",
      "monogram"
     ]
    },
    {
     "from": "monogram",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "autograph",
      "gratuitous",
      "gratify",
      "ingrate"
     ]
    },
    {
     "from": "autograph",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "autocratic",
      "nautical",
      "autonomous",
      "cosmonaut"
     ]
    },
    {
     "from": "autonomous",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "synchronous",
      "astronomical",
      "chronometer",
      "chronological"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "graphein",
    "root": "graphein, gramma",
    "meaning": "to write",
    "origin": "Greek"
   },
   "options": [
    "paragraph",
    "telegraph",
    "cardiograph",
    "graphology",
    "psychotherapy"
   ],
   "rounds": [
    {
     "definition": "A distinct section of writing, usually several sentences.",
     "answer": "paragraph"
    },
    {
     "definition": "A system for sending messages over distance by signal.",
     "answer": "telegraph"
    },
    {
     "definition": "The instrument that records the heart's activity.",
     "answer": "cardiograph"
    },
    {
     "definition": "The study of handwriting, often to interpret character.",
     "answer": "graphology"
    }
   ],
   "gre_count": 0,
   "id": 140
  },
  {
   "type": "cluster",
   "root": {
    "id": "neuron",
    "root": "neuron",
    "meaning": "nerve",
    "origin": "Greek"
   },
   "options": [
    "connoisseur",
    "neuritis",
    "neurology",
    "neuralgic",
    "neurotic"
   ],
   "rounds": [
    {
     "definition": "Inflammation of a nerve.",
     "answer": "neuritis"
    },
    {
     "definition": "The branch of medicine dealing with the nervous system.",
     "answer": "neurology"
    },
    {
     "definition": "Anxious, obsessive, or excessively worried.",
     "answer": "neurotic"
    },
    {
     "definition": "Relating to sharp nerve pain.",
     "answer": "neuralgic"
    }
   ],
   "gre_count": 0,
   "id": 141
  },
  {
   "id": 142,
   "quality": 3,
   "start_word": "ingenuity",
   "start_definition": "The quality of being clever, original, and inventive.",
   "chain": [
    "ingenuity",
    "genealogy",
    "gynecology",
    "misogynous",
    "misanthrope"
   ],
   "pivot_roots": [
    {
     "id": "genesis",
     "root": "genesis",
     "meaning": "birth, origin"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    }
   ],
   "links": [
    {
     "from": "ingenuity",
     "root": "genesis",
     "root_display": "genesis",
     "root_meaning": "birth, origin",
     "answer": "genealogy",
     "answer_definition": "The study of family lines and descent.",
     "options": [
      "exigent",
      "negligent",
      "genealogy",
      "cogent"
     ]
    },
    {
     "from": "genealogy",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gynecology",
     "answer_definition": "The branch of medicine dealing with women's health.",
     "options": [
      "gynecology",
      "pedagogy",
      "androgynous",
      "dolorous"
     ]
    },
    {
     "from": "gynecology",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "autonomous",
      "dolorous",
      "misogynous",
      "audacious"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "synchronous",
      "misanthrope",
      "philanthropy",
      "anthropological"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "opsis",
    "root": "opsis, optikos",
    "meaning": "sight",
    "origin": "Greek"
   },
   "options": [
    "synopsis",
    "autopsy",
    "optical",
    "optometry"
   ],
   "rounds": [
    {
     "definition": "The practice of testing eyes and prescribing corrective lenses.",
     "answer": "optometry"
    },
    {
     "definition": "Relating to sight or light.",
     "answer": "optical"
    },
    {
     "definition": "A brief summary or outline.",
     "answer": "synopsis"
    },
    {
     "definition": "An examination of a body to determine the cause of death.",
     "answer": "autopsy"
    }
   ],
   "gre_count": 0,
   "id": 143
  },
  {
   "type": "cluster",
   "root": {
    "id": "phone",
    "root": "phone",
    "meaning": "sound",
    "origin": "Greek"
   },
   "options": [
    "cacophony",
    "graphology",
    "telephone",
    "symphony",
    "microphone"
   ],
   "rounds": [
    {
     "definition": "A harsh, discordant mixture of sounds.",
     "answer": "cacophony"
    },
    {
     "definition": "A device for speaking to someone at a distance.",
     "answer": "telephone"
    },
    {
     "definition": "An elaborate musical composition for a full orchestra.",
     "answer": "symphony"
    },
    {
     "definition": "A device that converts sound into an electrical signal.",
     "answer": "microphone"
    }
   ],
   "gre_count": 1,
   "id": 144
  },
  {
   "id": 145,
   "quality": 3,
   "start_word": "monogamous",
   "start_definition": "Having only one spouse or partner at a time.",
   "chain": [
    "monogamous",
    "misogamy",
    "misanthrope",
    "philanthropy",
    "philosophy"
   ],
   "pivot_roots": [
    {
     "id": "gamos",
     "root": "gamos",
     "meaning": "marriage"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "monogamous",
     "root": "gamos",
     "root_display": "gamos",
     "root_meaning": "marriage",
     "answer": "misogamy",
     "answer_definition": "Hatred of marriage.",
     "options": [
      "misogamy",
      "prerogative",
      "surrogate",
      "arrogate"
     ]
    },
    {
     "from": "misogamy",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chromosome",
      "anthropological",
      "chronometer",
      "misanthrope"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "chronicle",
      "chronometer",
      "philanthropy",
      "spendthrift"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philosophy",
     "answer_definition": "The study of knowledge, reality, and existence (love of wisdom).",
     "options": [
      "philosophy",
      "sophistry",
      "sophist",
      "sophisticated"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "fides",
    "root": "fides",
    "meaning": "faith, trust",
    "origin": "Latin"
   },
   "options": [
    "confide",
    "perfidy",
    "ambidextrous",
    "diffident",
    "fidelity"
   ],
   "rounds": [
    {
     "definition": "To tell someone a secret or private matter, trusting them.",
     "answer": "confide"
    },
    {
     "definition": "Modest or shy because of a lack of self-confidence.",
     "answer": "diffident"
    },
    {
     "definition": "Faithfulness to a person, cause, or belief.",
     "answer": "fidelity"
    },
    {
     "definition": "Deceitfulness; betrayal of trust.",
     "answer": "perfidy"
    }
   ],
   "gre_count": 2,
   "id": 146
  },
  {
   "type": "cluster",
   "root": {
    "id": "podos",
    "root": "pous, podos",
    "meaning": "foot",
    "origin": "Greek"
   },
   "options": [
    "podiatric",
    "tripod",
    "chiropody",
    "hypodermic",
    "podium"
   ],
   "rounds": [
    {
     "definition": "Relating to the care of the feet.",
     "answer": "podiatric"
    },
    {
     "definition": "A raised platform on which a person stands.",
     "answer": "podium"
    },
    {
     "definition": "The treatment of foot ailments.",
     "answer": "chiropody"
    },
    {
     "definition": "A three-legged stand, especially for a camera.",
     "answer": "tripod"
    }
   ],
   "gre_count": 0,
   "id": 147
  },
  {
   "id": 148,
   "quality": 3,
   "start_word": "cacophony",
   "start_definition": "A harsh, discordant mixture of sounds.",
   "chain": [
    "cacophony",
    "cacography",
    "autograph",
    "autonomous",
    "astronomical"
   ],
   "pivot_roots": [
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    }
   ],
   "links": [
    {
     "from": "cacophony",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "cacography",
      "perspicacious",
      "efficacy",
      "efficacious"
     ]
    },
    {
     "from": "cacography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "gratuitous",
      "ingratiate",
      "ingrate",
      "autograph"
     ]
    },
    {
     "from": "autograph",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "autonomous",
      "plutocracy",
      "nautical",
      "autocratic"
     ]
    },
    {
     "from": "autonomous",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "astronomical",
      "synchronous",
      "chronological",
      "chronometer"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "unda",
    "root": "unda",
    "meaning": "wave",
    "origin": "Latin"
   },
   "options": [
    "abound",
    "moribund",
    "inundate",
    "redundancy",
    "undulate"
   ],
   "rounds": [
    {
     "definition": "To overwhelm with a large amount of something.",
     "answer": "inundate"
    },
    {
     "definition": "The state of being no longer needed; unnecessary repetition.",
     "answer": "redundancy"
    },
    {
     "definition": "To move with a smooth, wavelike motion.",
     "answer": "undulate"
    },
    {
     "definition": "To exist in large numbers or amounts.",
     "answer": "abound"
    }
   ],
   "gre_count": 2,
   "id": 149
  },
  {
   "type": "cluster",
   "root": {
    "id": "ducere",
    "root": "duco, ductus",
    "meaning": "to lead",
    "origin": "Latin"
   },
   "options": [
    "seduce",
    "induce",
    "conduct",
    "fluctuate",
    "deduce"
   ],
   "rounds": [
    {
     "definition": "To organize and carry out a particular activity.",
     "answer": "conduct"
    },
    {
     "definition": "To reach a conclusion by reasoning from known facts.",
     "answer": "deduce"
    },
    {
     "definition": "To tempt someone into a course of action, often unwisely.",
     "answer": "seduce"
    },
    {
     "definition": "To succeed in persuading someone to do something, or to bring about.",
     "answer": "induce"
    }
   ],
   "gre_count": 0,
   "id": 150
  },
  {
   "id": 151,
   "quality": 3,
   "start_word": "gynecology",
   "start_definition": "The branch of medicine dealing with women's health.",
   "chain": [
    "gynecology",
    "misogynous",
    "misanthrope",
    "philanthropy",
    "philology"
   ],
   "pivot_roots": [
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "gynecology",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "pusillanimous",
      "timorous",
      "misogynous",
      "dolorous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "misanthrope",
      "synchronous",
      "anachronism",
      "anthropological"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "chronicle",
      "philanthropy",
      "chronometer",
      "spendthrift"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philology",
     "answer_definition": "The study of language in historical texts.",
     "options": [
      "sophist",
      "philology",
      "annihilate",
      "sophistry"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "similis",
    "root": "similis",
    "meaning": "like, similar",
    "origin": "Latin"
   },
   "options": [
    "semblance",
    "assimilate",
    "verisimilitude",
    "equanimity",
    "dissemble"
   ],
   "rounds": [
    {
     "definition": "To take in and fully understand information, or to become part of a larger group.",
     "answer": "assimilate"
    },
    {
     "definition": "The appearance of being true or real.",
     "answer": "verisimilitude"
    },
    {
     "definition": "The outward appearance or impression of something, often a false one.",
     "answer": "semblance"
    },
    {
     "definition": "To conceal one's true motives or feelings behind a false appearance.",
     "answer": "dissemble"
    }
   ],
   "gre_count": 2,
   "id": 152
  },
  {
   "type": "cluster",
   "root": {
    "id": "pathos",
    "root": "pathos",
    "meaning": "feeling, suffering",
    "origin": "Greek"
   },
   "options": [
    "antipathy",
    "pathology",
    "sympathy",
    "apathy",
    "anticipate"
   ],
   "rounds": [
    {
     "definition": "A lack of interest, feeling, or concern.",
     "answer": "apathy"
    },
    {
     "definition": "The study of the causes and effects of disease.",
     "answer": "pathology"
    },
    {
     "definition": "A deep, settled feeling of dislike.",
     "answer": "antipathy"
    },
    {
     "definition": "Shared feeling, especially sorrow for another's misfortune.",
     "answer": "sympathy"
    }
   ],
   "gre_count": 1,
   "id": 153
  },
  {
   "id": 154,
   "quality": 3,
   "start_word": "autonomous",
   "start_definition": "Self-governing; acting independently.",
   "chain": [
    "autonomous",
    "autograph",
    "cacography",
    "cacophony",
    "phonetics"
   ],
   "pivot_roots": [
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "autograph",
      "astronaut",
      "cosmonaut",
      "autocratic"
     ]
    },
    {
     "from": "autograph",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "ingrate",
      "cacography",
      "conflagration",
      "psychotherapy"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "efficacious",
      "efficacy",
      "perspicacious",
      "cacophony"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "phonetics",
     "answer_definition": "The study of the sounds of speech.",
     "options": [
      "photograph",
      "graphology",
      "phonetics",
      "xenophobia"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "loqui",
    "root": "loquor",
    "meaning": "to speak",
    "origin": "Latin"
   },
   "options": [
    "grandiloquent",
    "loquacious",
    "eloquent",
    "soliloquy"
   ],
   "rounds": [
    {
     "definition": "Using pompous, inflated language.",
     "answer": "grandiloquent"
    },
    {
     "definition": "A speech delivered while alone, revealing inner thoughts.",
     "answer": "soliloquy"
    },
    {
     "definition": "Very talkative.",
     "answer": "loquacious"
    },
    {
     "definition": "Fluent and persuasive in speech.",
     "answer": "eloquent"
    }
   ],
   "gre_count": 3,
   "id": 155
  },
  {
   "type": "cluster",
   "root": {
    "id": "autos",
    "root": "autos",
    "meaning": "self",
    "origin": "Greek"
   },
   "options": [
    "autobiography",
    "autopsy",
    "automatic",
    "autonomous",
    "astronaut"
   ],
   "rounds": [
    {
     "definition": "Self-governing; acting independently.",
     "answer": "autonomous"
    },
    {
     "definition": "An examination of a body to determine the cause of death.",
     "answer": "autopsy"
    },
    {
     "definition": "The story of a person's life written by that person.",
     "answer": "autobiography"
    },
    {
     "definition": "Working by itself without direct human control.",
     "answer": "automatic"
    }
   ],
   "gre_count": 1,
   "id": 156
  },
  {
   "id": 157,
   "quality": 3,
   "start_word": "heterogeneous",
   "start_definition": "Diverse in character or content; made up of unlike parts.",
   "chain": [
    "heterogeneous",
    "genealogy",
    "gynecology",
    "misogynous",
    "misanthrope"
   ],
   "pivot_roots": [
    {
     "id": "genesis",
     "root": "genesis",
     "meaning": "birth, origin"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    }
   ],
   "links": [
    {
     "from": "heterogeneous",
     "root": "genesis",
     "root_display": "genesis",
     "root_meaning": "birth, origin",
     "answer": "genealogy",
     "answer_definition": "The study of family lines and descent.",
     "options": [
      "genealogy",
      "benevolent",
      "beneficent",
      "cogent"
     ]
    },
    {
     "from": "genealogy",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gynecology",
     "answer_definition": "The branch of medicine dealing with women's health.",
     "options": [
      "gynecology",
      "pedagogy",
      "androgynous",
      "dolorous"
     ]
    },
    {
     "from": "gynecology",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "autonomous",
      "misogynous",
      "dolorous",
      "gratuitous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "anthropological",
      "philanthropy",
      "synchronous",
      "misanthrope"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "placere",
    "root": "placeo",
    "meaning": "to please",
    "origin": "Latin"
   },
   "options": [
    "placid",
    "complacent",
    "placate",
    "implacable",
    "egomaniacal"
   ],
   "rounds": [
    {
     "definition": "To calm someone's anger.",
     "answer": "placate"
    },
    {
     "definition": "Calm and untroubled.",
     "answer": "placid"
    },
    {
     "definition": "Impossible to appease or soften.",
     "answer": "implacable"
    },
    {
     "definition": "Smugly satisfied; unaware of danger.",
     "answer": "complacent"
    }
   ],
   "gre_count": 4,
   "id": 158
  },
  {
   "type": "cluster",
   "root": {
    "id": "odontos",
    "root": "odontos",
    "meaning": "tooth",
    "origin": "Greek"
   },
   "options": [
    "exodontist",
    "endodontist",
    "gerontology",
    "orthodontia",
    "periodontist"
   ],
   "rounds": [
    {
     "definition": "A dentist who specializes in treatment inside the tooth, such as root canals.",
     "answer": "endodontist"
    },
    {
     "definition": "A dentist who specializes in extracting teeth.",
     "answer": "exodontist"
    },
    {
     "definition": "A dentist who specializes in the gums and tissue around the teeth.",
     "answer": "periodontist"
    },
    {
     "definition": "The dental practice of straightening teeth.",
     "answer": "orthodontia"
    }
   ],
   "gre_count": 0,
   "id": 159
  },
  {
   "id": 160,
   "quality": 3,
   "start_word": "telephone",
   "start_definition": "A device for speaking to someone at a distance.",
   "chain": [
    "telephone",
    "cacophony",
    "cacography",
    "autobiography",
    "autonomous"
   ],
   "pivot_roots": [
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "telephone",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "xenophobia",
      "cacophony",
      "graphology",
      "photograph"
     ]
    },
    {
     "from": "cacophony",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "perspicacious",
      "efficacy",
      "cacography",
      "efficacious"
     ]
    },
    {
     "from": "cacography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "autobiography",
     "answer_definition": "The story of a person's life written by that person.",
     "options": [
      "autobiography",
      "psychotherapy",
      "ingrate",
      "gratuitous"
     ]
    },
    {
     "from": "autobiography",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "autocratic",
      "cosmonaut",
      "autonomous",
      "nautical"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "anthropos",
    "root": "anthropos",
    "meaning": "human being",
    "origin": "Greek"
   },
   "options": [
    "chronological",
    "anthropological",
    "misanthrope",
    "misanthropic",
    "philanthropy"
   ],
   "rounds": [
    {
     "definition": "The desire to help others, expressed especially through generous giving.",
     "answer": "philanthropy"
    },
    {
     "definition": "Disliking or shunning other people.",
     "answer": "misanthropic"
    },
    {
     "definition": "Relating to the study of humankind.",
     "answer": "anthropological"
    },
    {
     "definition": "A person who dislikes and avoids other people.",
     "answer": "misanthrope"
    }
   ],
   "gre_count": 2,
   "id": 161
  },
  {
   "type": "cluster",
   "root": {
    "id": "rogare",
    "root": "rogo, rogatus",
    "meaning": "to ask",
    "origin": "Latin"
   },
   "options": [
    "prerogative",
    "arrogate",
    "misogamy",
    "surrogate",
    "abrogate"
   ],
   "rounds": [
    {
     "definition": "To repeal or do away with a law or agreement formally.",
     "answer": "abrogate"
    },
    {
     "definition": "A substitute, especially a person deputizing for another.",
     "answer": "surrogate"
    },
    {
     "definition": "An exclusive right or privilege held by a person or group.",
     "answer": "prerogative"
    },
    {
     "definition": "To claim or take for oneself without justification.",
     "answer": "arrogate"
    }
   ],
   "gre_count": 3,
   "id": 162
  },
  {
   "id": 163,
   "quality": 3,
   "start_word": "analogous",
   "start_definition": "Comparable in certain respects; similar.",
   "chain": [
    "analogous",
    "astrology",
    "astronomical",
    "autonomous",
    "autobiography"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "analogous",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "dolorous",
      "misogynous",
      "androgynous",
      "astrology"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "strenuous",
      "terrestrial",
      "astronomical",
      "steadfast"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "nominal",
      "chronometer",
      "autonomous",
      "misnomer"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autobiography",
     "answer_definition": "The story of a person's life written by that person.",
     "options": [
      "autocratic",
      "astronaut",
      "autobiography",
      "plutocracy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "tempus",
    "root": "tempus",
    "meaning": "time",
    "origin": "Latin"
   },
   "options": [
    "temporal",
    "empathy",
    "contemporary",
    "extemporaneous",
    "temporize"
   ],
   "rounds": [
    {
     "definition": "Relating to time, as opposed to eternity or the spiritual.",
     "answer": "temporal"
    },
    {
     "definition": "Living or occurring at the same time; also, modern.",
     "answer": "contemporary"
    },
    {
     "definition": "To delay making a decision in order to gain time.",
     "answer": "temporize"
    },
    {
     "definition": "Spoken or done without preparation; improvised.",
     "answer": "extemporaneous"
    }
   ],
   "gre_count": 1,
   "id": 164
  },
  {
   "type": "cluster",
   "root": {
    "id": "venire",
    "root": "venio",
    "meaning": "to come",
    "origin": "Latin"
   },
   "options": [
    "convene",
    "prevent",
    "contravene",
    "egocentric",
    "circumvent"
   ],
   "rounds": [
    {
     "definition": "To keep something from happening or someone from doing something.",
     "answer": "prevent"
    },
    {
     "definition": "To come together for a meeting or assembly.",
     "answer": "convene"
    },
    {
     "definition": "To act in a way that conflicts with a law, rule, or agreement.",
     "answer": "contravene"
    },
    {
     "definition": "To find a way around an obstacle or rule, especially cleverly.",
     "answer": "circumvent"
    }
   ],
   "gre_count": 2,
   "id": 165
  },
  {
   "id": 166,
   "quality": 3,
   "start_word": "androgynous",
   "start_definition": "Having both male and female characteristics; neither clearly male nor female.",
   "chain": [
    "androgynous",
    "misogynous",
    "misanthrope",
    "philanthropy",
    "philology"
   ],
   "pivot_roots": [
    {
     "id": "gyne",
     "root": "gyne",
     "meaning": "woman"
    },
    {
     "id": "misein",
     "root": "misein",
     "meaning": "to hate"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "androgynous",
     "root": "gyne",
     "root_display": "gyne",
     "root_meaning": "woman",
     "answer": "misogynous",
     "answer_definition": "Showing hatred or contempt for women.",
     "options": [
      "misogynous",
      "dolorous",
      "unanimous",
      "gratuitous"
     ]
    },
    {
     "from": "misogynous",
     "root": "misein",
     "root_display": "misein",
     "root_meaning": "to hate",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "pantheon",
      "synchronous",
      "anthropological",
      "misanthrope"
     ]
    },
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "philanthropy",
      "spendthrift",
      "chronometer",
      "chromosome"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philology",
     "answer_definition": "The study of language in historical texts.",
     "options": [
      "sophistry",
      "sophist",
      "philology",
      "annihilate"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "psyche",
    "root": "psyche",
    "meaning": "mind, soul",
    "origin": "Greek"
   },
   "options": [
    "psychiatric",
    "gauche",
    "psychogenic",
    "psyche",
    "psychosis"
   ],
   "rounds": [
    {
     "definition": "The human mind, soul, or spirit.",
     "answer": "psyche"
    },
    {
     "definition": "Originating in the mind rather than the body.",
     "answer": "psychogenic"
    },
    {
     "definition": "A severe mental condition marked by loss of contact with reality.",
     "answer": "psychosis"
    },
    {
     "definition": "Relating to the medical treatment of mental illness.",
     "answer": "psychiatric"
    }
   ],
   "gre_count": 0,
   "id": 167
  },
  {
   "type": "cluster",
   "root": {
    "id": "stringere",
    "root": "stringo, strictus",
    "meaning": "to draw tight, bind",
    "origin": "Latin"
   },
   "options": [
    "astringent",
    "egocentric",
    "restraint",
    "constrict",
    "stringent"
   ],
   "rounds": [
    {
     "definition": "To make narrower, especially by squeezing or tightening.",
     "answer": "constrict"
    },
    {
     "definition": "Strict, precise, and rigorously enforced.",
     "answer": "stringent"
    },
    {
     "definition": "A measure or condition that restricts or limits something; also, self-control.",
     "answer": "restraint"
    },
    {
     "definition": "Sharp or severe in manner; also, causing tissue to contract.",
     "answer": "astringent"
    }
   ],
   "gre_count": 1,
   "id": 168
  },
  {
   "id": 169,
   "quality": 3,
   "start_word": "homogeneous",
   "start_definition": "Uniform in structure or composition throughout; all of the same kind.",
   "chain": [
    "homogeneous",
    "genealogy",
    "graphology",
    "orthography",
    "orthodox"
   ],
   "pivot_roots": [
    {
     "id": "genesis",
     "root": "genesis",
     "meaning": "birth, origin"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "orthos",
     "root": "orthos",
     "meaning": "straight, correct"
    }
   ],
   "links": [
    {
     "from": "homogeneous",
     "root": "genesis",
     "root_display": "genesis",
     "root_meaning": "birth, origin",
     "answer": "genealogy",
     "answer_definition": "The study of family lines and descent.",
     "options": [
      "genealogy",
      "astringent",
      "stringent",
      "beneficent"
     ]
    },
    {
     "from": "genealogy",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "graphology",
     "answer_definition": "The study of handwriting, often to interpret character.",
     "options": [
      "graphology",
      "misogynous",
      "pedagogy",
      "androgynous"
     ]
    },
    {
     "from": "graphology",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "orthography",
     "answer_definition": "The conventional spelling system of a language.",
     "options": [
      "psychotherapy",
      "orthography",
      "gradation",
      "gravitas"
     ]
    },
    {
     "from": "orthography",
     "root": "orthos",
     "root_display": "orthos",
     "root_meaning": "straight, correct",
     "answer": "orthodox",
     "answer_definition": "Following established or traditional beliefs.",
     "options": [
      "distort",
      "contort",
      "tortuous",
      "orthodox"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "finis",
    "root": "finis",
    "meaning": "end, limit",
    "origin": "Latin"
   },
   "options": [
    "sinister",
    "refine",
    "confine",
    "infinite",
    "define"
   ],
   "rounds": [
    {
     "definition": "Limitless or endless in space, extent, or size.",
     "answer": "infinite"
    },
    {
     "definition": "To state the exact meaning or nature of something.",
     "answer": "define"
    },
    {
     "definition": "To remove impurities from, or to improve by making small changes.",
     "answer": "refine"
    },
    {
     "definition": "To keep someone or something within certain limits.",
     "answer": "confine"
    }
   ],
   "gre_count": 0,
   "id": 170
  },
  {
   "type": "cluster",
   "root": {
    "id": "opsis",
    "root": "opsis, optikos",
    "meaning": "sight",
    "origin": "Greek"
   },
   "options": [
    "autopsy",
    "synopsis",
    "optician",
    "optometry"
   ],
   "rounds": [
    {
     "definition": "An examination of a body to determine the cause of death.",
     "answer": "autopsy"
    },
    {
     "definition": "The practice of testing eyes and prescribing corrective lenses.",
     "answer": "optometry"
    },
    {
     "definition": "A person who makes or sells eyeglasses and lenses.",
     "answer": "optician"
    },
    {
     "definition": "A brief summary or outline.",
     "answer": "synopsis"
    }
   ],
   "gre_count": 0,
   "id": 171
  },
  {
   "id": 172,
   "quality": 3,
   "start_word": "autonomous",
   "start_definition": "Self-governing; acting independently.",
   "chain": [
    "autonomous",
    "autograph",
    "cacography",
    "cacophony",
    "microphone"
   ],
   "pivot_roots": [
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "autograph",
      "autocratic",
      "cosmonaut",
      "plutocracy"
     ]
    },
    {
     "from": "autograph",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "cacography",
      "conflagration",
      "gravitas",
      "ingrate"
     ]
    },
    {
     "from": "cacography",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "perspicacious",
      "efficacy",
      "cacophony",
      "efficacious"
     ]
    },
    {
     "from": "cacophony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "microphone",
     "answer_definition": "A device that converts sound into an electrical signal.",
     "options": [
      "photograph",
      "microphone",
      "graphology",
      "xenophobia"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "algos",
    "root": "algos",
    "meaning": "pain",
    "origin": "Greek"
   },
   "options": [
    "analgesic",
    "neuralgia",
    "neurology",
    "neuralgic",
    "nostalgia"
   ],
   "rounds": [
    {
     "definition": "Relating to sharp nerve pain.",
     "answer": "neuralgic"
    },
    {
     "definition": "A sentimental longing for the past.",
     "answer": "nostalgia"
    },
    {
     "definition": "Sharp pain along the path of a nerve.",
     "answer": "neuralgia"
    },
    {
     "definition": "A medicine that relieves pain.",
     "answer": "analgesic"
    }
   ],
   "gre_count": 0,
   "id": 173
  },
  {
   "type": "cluster",
   "root": {
    "id": "cor",
    "root": "cor, cordis",
    "meaning": "heart",
    "origin": "Latin"
   },
   "options": [
    "accord",
    "discord",
    "cardiology",
    "discordant",
    "cordial"
   ],
   "rounds": [
    {
     "definition": "Warm and friendly, though often somewhat formal.",
     "answer": "cordial"
    },
    {
     "definition": "An official agreement or treaty; also, harmony of opinion.",
     "answer": "accord"
    },
    {
     "definition": "Disagreeing or incongruous; also, harsh-sounding.",
     "answer": "discordant"
    },
    {
     "definition": "Disagreement between people or things; a lack of harmony.",
     "answer": "discord"
    }
   ],
   "gre_count": 1,
   "id": 174
  },
  {
   "id": 175,
   "quality": 3,
   "start_word": "orthography",
   "start_definition": "The conventional spelling system of a language.",
   "chain": [
    "orthography",
    "bibliography",
    "bibliophile",
    "philanthropy",
    "misanthrope"
   ],
   "pivot_roots": [
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    }
   ],
   "links": [
    {
     "from": "orthography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "conflagration",
      "gradation",
      "bibliography",
      "grandiloquent"
     ]
    },
    {
     "from": "bibliography",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "bibliophile",
      "discernible",
      "fallible",
      "fungible"
     ]
    },
    {
     "from": "bibliophile",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "philanthropy",
      "pusillanimous",
      "semblance",
      "annihilate"
     ]
    },
    {
     "from": "philanthropy",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "misanthrope",
     "answer_definition": "A person who dislikes and avoids other people.",
     "options": [
      "chronometer",
      "misanthrope",
      "chronicle",
      "anachronism"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "venire",
    "root": "venio",
    "meaning": "to come",
    "origin": "Latin"
   },
   "options": [
    "egocentric",
    "avenue",
    "circumvent",
    "contravene",
    "prevent"
   ],
   "rounds": [
    {
     "definition": "To keep something from happening or someone from doing something.",
     "answer": "prevent"
    },
    {
     "definition": "A way of approaching a problem; also, a broad street.",
     "answer": "avenue"
    },
    {
     "definition": "To find a way around an obstacle or rule, especially cleverly.",
     "answer": "circumvent"
    },
    {
     "definition": "To act in a way that conflicts with a law, rule, or agreement.",
     "answer": "contravene"
    }
   ],
   "gre_count": 2,
   "id": 176
  },
  {
   "type": "cluster",
   "root": {
    "id": "vocare",
    "root": "vox, vocis",
    "meaning": "voice, to call",
    "origin": "Latin"
   },
   "options": [
    "unequivocal",
    "vociferous",
    "advocate",
    "equivocate"
   ],
   "rounds": [
    {
     "definition": "To publicly support or argue for.",
     "answer": "advocate"
    },
    {
     "definition": "Loud and insistent in expressing opinion.",
     "answer": "vociferous"
    },
    {
     "definition": "Leaving no doubt; entirely clear.",
     "answer": "unequivocal"
    },
    {
     "definition": "To speak vaguely to avoid committing oneself.",
     "answer": "equivocate"
    }
   ],
   "gre_count": 4,
   "id": 177
  },
  {
   "id": 178,
   "quality": 3,
   "start_word": "analogous",
   "start_definition": "Comparable in certain respects; similar.",
   "chain": [
    "analogous",
    "astrology",
    "astronomical",
    "autonomous",
    "autopsy"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "analogous",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "dolorous",
      "misogynous",
      "androgynous",
      "astrology"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "stringent",
      "astronomical",
      "terrestrial",
      "steadfast"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "nominal",
      "misnomer",
      "autonomous",
      "chronometer"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autopsy",
     "answer_definition": "An examination of a body to determine the cause of death.",
     "options": [
      "autopsy",
      "plutocracy",
      "autocratic",
      "cosmonaut"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "polys",
    "root": "polys",
    "meaning": "many",
    "origin": "Greek"
   },
   "options": [
    "anthropological",
    "polyglot",
    "polyandrous",
    "polymath",
    "polygamous"
   ],
   "rounds": [
    {
     "definition": "Having more than one husband at a time.",
     "answer": "polyandrous"
    },
    {
     "definition": "A person of wide-ranging knowledge or learning.",
     "answer": "polymath"
    },
    {
     "definition": "Knowing or using several languages.",
     "answer": "polyglot"
    },
    {
     "definition": "Having more than one spouse at once.",
     "answer": "polygamous"
    }
   ],
   "gre_count": 0,
   "id": 179
  },
  {
   "type": "cluster",
   "root": {
    "id": "pedis",
    "root": "pedis",
    "meaning": "foot",
    "origin": "Latin"
   },
   "options": [
    "pedestrian",
    "impede",
    "expedite",
    "pedal",
    "pediatrics"
   ],
   "rounds": [
    {
     "definition": "Lacking excitement; ordinary and uninspired.",
     "answer": "pedestrian"
    },
    {
     "definition": "A lever operated by the foot.",
     "answer": "pedal"
    },
    {
     "definition": "To speed up the progress of something.",
     "answer": "expedite"
    },
    {
     "definition": "To delay or prevent by obstructing.",
     "answer": "impede"
    }
   ],
   "gre_count": 2,
   "id": 180
  },
  {
   "id": 181,
   "quality": 3,
   "start_word": "symphony",
   "start_definition": "An elaborate musical composition for a full orchestra.",
   "chain": [
    "symphony",
    "cacophony",
    "cacography",
    "autograph",
    "autonomous"
   ],
   "pivot_roots": [
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "symphony",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "graphology",
      "cacophony",
      "photograph",
      "xenophobia"
     ]
    },
    {
     "from": "cacophony",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "perspicacious",
      "efficacious",
      "cacography",
      "efficacy"
     ]
    },
    {
     "from": "cacography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "ingratiate",
      "autograph",
      "gratify",
      "ingrate"
     ]
    },
    {
     "from": "autograph",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "cosmonaut",
      "nautical",
      "autocratic",
      "autonomous"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "tendere",
    "root": "tendo",
    "meaning": "to stretch",
    "origin": "Latin"
   },
   "options": [
    "pretentious",
    "endodontist",
    "tenuous",
    "tendentious",
    "distend"
   ],
   "rounds": [
    {
     "definition": "To swell or stretch out from internal pressure.",
     "answer": "distend"
    },
    {
     "definition": "Very weak or slight; thin.",
     "answer": "tenuous"
    },
    {
     "definition": "Promoting a particular cause; biased.",
     "answer": "tendentious"
    },
    {
     "definition": "Claiming greater importance or merit than is deserved.",
     "answer": "pretentious"
    }
   ],
   "gre_count": 4,
   "id": 182
  },
  {
   "type": "cluster",
   "root": {
    "id": "oculus",
    "root": "oculus",
    "meaning": "eye",
    "origin": "Latin"
   },
   "options": [
    "ocular",
    "monocle",
    "oculist",
    "inoculate",
    "innocuous"
   ],
   "rounds": [
    {
     "definition": "A single lens worn in front of one eye.",
     "answer": "monocle"
    },
    {
     "definition": "An eye doctor (an older term for an ophthalmologist).",
     "answer": "oculist"
    },
    {
     "definition": "To introduce a substance into the body to build immunity.",
     "answer": "inoculate"
    },
    {
     "definition": "Relating to the eye or vision.",
     "answer": "ocular"
    }
   ],
   "gre_count": 0,
   "id": 183
  },
  {
   "id": 184,
   "quality": 3,
   "start_word": "misanthrope",
   "start_definition": "A person who dislikes and avoids other people.",
   "chain": [
    "misanthrope",
    "philanthropy",
    "bibliophile",
    "bibliography",
    "photograph"
   ],
   "pivot_roots": [
    {
     "id": "anthropos",
     "root": "anthropos",
     "meaning": "human being"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    },
    {
     "id": "graphein",
     "root": "graphein, gramma",
     "meaning": "to write"
    }
   ],
   "links": [
    {
     "from": "misanthrope",
     "root": "anthropos",
     "root_display": "anthropos",
     "root_meaning": "human being",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "philanthropy",
      "anachronism",
      "chronometer",
      "spendthrift"
     ]
    },
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "sophist",
      "bibliophile",
      "annihilate",
      "sophistry"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "irascible",
      "bibliography",
      "plausible",
      "discernible"
     ]
    },
    {
     "from": "bibliography",
     "root": "graphein",
     "root_display": "graphein, gramma",
     "root_meaning": "to write",
     "answer": "photograph",
     "answer_definition": "An image made with a camera.",
     "options": [
      "photograph",
      "conflagration",
      "grandiloquent",
      "gradation"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "neuron",
    "root": "neuron",
    "meaning": "nerve",
    "origin": "Greek"
   },
   "options": [
    "neuroscience",
    "neuralgia",
    "neurology",
    "connoisseur",
    "neurosis"
   ],
   "rounds": [
    {
     "definition": "The branch of medicine dealing with the nervous system.",
     "answer": "neurology"
    },
    {
     "definition": "Sharp pain along the path of a nerve.",
     "answer": "neuralgia"
    },
    {
     "definition": "The scientific study of the nervous system and brain.",
     "answer": "neuroscience"
    },
    {
     "definition": "A mild mental disorder involving anxiety without loss of reality.",
     "answer": "neurosis"
    }
   ],
   "gre_count": 0,
   "id": 185
  },
  {
   "type": "cluster",
   "root": {
    "id": "phone",
    "root": "phone",
    "meaning": "sound",
    "origin": "Greek"
   },
   "options": [
    "graphology",
    "microphone",
    "phonetics",
    "cacophony",
    "telephone"
   ],
   "rounds": [
    {
     "definition": "A harsh, discordant mixture of sounds.",
     "answer": "cacophony"
    },
    {
     "definition": "A device for speaking to someone at a distance.",
     "answer": "telephone"
    },
    {
     "definition": "The study of the sounds of speech.",
     "answer": "phonetics"
    },
    {
     "definition": "A device that converts sound into an electrical signal.",
     "answer": "microphone"
    }
   ],
   "gre_count": 1,
   "id": 186
  },
  {
   "id": 187,
   "quality": 3,
   "start_word": "eulogy",
   "start_definition": "A speech or piece of writing praising someone, typically one who has died.",
   "chain": [
    "eulogy",
    "astrology",
    "astronomical",
    "autonomous",
    "automatic"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "eulogy",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "misogynous",
      "pedagogy",
      "astrology",
      "androgynous"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "astronomical",
      "stringent",
      "terrestrial",
      "chronological"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "misnomer",
      "chronometer",
      "autonomous",
      "nominal"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "automatic",
     "answer_definition": "Working by itself without direct human control.",
     "options": [
      "nautical",
      "autocratic",
      "automatic",
      "cosmonaut"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "tenere",
    "root": "teneo",
    "meaning": "to hold",
    "origin": "Latin"
   },
   "options": [
    "omnipotent",
    "countenance",
    "retention",
    "untenable",
    "tenacious"
   ],
   "rounds": [
    {
     "definition": "To tolerate or give approval to.",
     "answer": "countenance"
    },
    {
     "definition": "Holding firmly; stubbornly persistent.",
     "answer": "tenacious"
    },
    {
     "definition": "The act of keeping or holding on to something.",
     "answer": "retention"
    },
    {
     "definition": "Impossible to defend against objection.",
     "answer": "untenable"
    }
   ],
   "gre_count": 1,
   "id": 188
  },
  {
   "type": "cluster",
   "root": {
    "id": "metron",
    "root": "metron",
    "meaning": "measure",
    "origin": "Greek"
   },
   "options": [
    "metric",
    "chronometer",
    "epitome",
    "geometric",
    "optometry"
   ],
   "rounds": [
    {
     "definition": "The practice of testing eyes and prescribing corrective lenses.",
     "answer": "optometry"
    },
    {
     "definition": "Relating to measurement, especially the metric system.",
     "answer": "metric"
    },
    {
     "definition": "An extremely accurate timepiece.",
     "answer": "chronometer"
    },
    {
     "definition": "Relating to geometry; made of regular shapes and lines.",
     "answer": "geometric"
    }
   ],
   "gre_count": 0,
   "id": 189
  },
  {
   "id": 190,
   "quality": 3,
   "start_word": "analogous",
   "start_definition": "Comparable in certain respects; similar.",
   "chain": [
    "analogous",
    "astrology",
    "astronomical",
    "autonomous",
    "automatic"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "analogous",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "androgynous",
      "dolorous",
      "astrology",
      "misogynous"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "terrestrial",
      "astronomical",
      "retrospective",
      "chronological"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "misnomer",
      "nominal",
      "chronometer",
      "autonomous"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "automatic",
     "answer_definition": "Working by itself without direct human control.",
     "options": [
      "automatic",
      "cosmonaut",
      "nautical",
      "autocratic"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "psyche",
    "root": "psyche",
    "meaning": "mind, soul",
    "origin": "Greek"
   },
   "options": [
    "psychogenic",
    "psychotherapy",
    "dichotomy",
    "psychiatric",
    "psyche"
   ],
   "rounds": [
    {
     "definition": "Originating in the mind rather than the body.",
     "answer": "psychogenic"
    },
    {
     "definition": "Relating to the medical treatment of mental illness.",
     "answer": "psychiatric"
    },
    {
     "definition": "The human mind, soul, or spirit.",
     "answer": "psyche"
    },
    {
     "definition": "The treatment of mental disorders through talking rather than drugs.",
     "answer": "psychotherapy"
    }
   ],
   "gre_count": 0,
   "id": 191
  },
  {
   "type": "cluster",
   "root": {
    "id": "polis",
    "root": "polis",
    "meaning": "city",
    "origin": "Greek"
   },
   "options": [
    "cosmopolitan",
    "policy",
    "polygamous",
    "politic",
    "metropolis"
   ],
   "rounds": [
    {
     "definition": "A course of action adopted by a government, business, or individual.",
     "answer": "policy"
    },
    {
     "definition": "A very large or important city.",
     "answer": "metropolis"
    },
    {
     "definition": "Sensible and prudent, especially given the circumstances.",
     "answer": "politic"
    },
    {
     "definition": "Familiar with and at ease in many countries and cultures.",
     "answer": "cosmopolitan"
    }
   ],
   "gre_count": 1,
   "id": 192
  },
  {
   "id": 193,
   "quality": 3,
   "start_word": "eulogy",
   "start_definition": "A speech or piece of writing praising someone, typically one who has died.",
   "chain": [
    "eulogy",
    "astrology",
    "astronomical",
    "autonomous",
    "autopsy"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "eulogy",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "misogynous",
      "pedagogy",
      "astrology",
      "androgynous"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "astringent",
      "astronomical",
      "terrestrial",
      "stringent"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "autonomous",
      "nominal",
      "misnomer",
      "chronometer"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autopsy",
     "answer_definition": "An examination of a body to determine the cause of death.",
     "options": [
      "astronaut",
      "plutocracy",
      "autocratic",
      "autopsy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "terra",
    "root": "terra",
    "meaning": "earth, land",
    "origin": "Latin"
   },
   "options": [
    "terrestrial",
    "alter ego",
    "terrain",
    "subterranean",
    "inter"
   ],
   "rounds": [
    {
     "definition": "Relating to the earth or land.",
     "answer": "terrestrial"
    },
    {
     "definition": "To bury in the ground.",
     "answer": "inter"
    },
    {
     "definition": "A stretch of land, especially its physical features.",
     "answer": "terrain"
    },
    {
     "definition": "Existing beneath the earth's surface.",
     "answer": "subterranean"
    }
   ],
   "gre_count": 2,
   "id": 194
  },
  {
   "type": "cluster",
   "root": {
    "id": "pathos",
    "root": "pathos",
    "meaning": "feeling, suffering",
    "origin": "Greek"
   },
   "options": [
    "anticipate",
    "antipathy",
    "telepathy",
    "osteopathy",
    "apathy"
   ],
   "rounds": [
    {
     "definition": "A lack of interest, feeling, or concern.",
     "answer": "apathy"
    },
    {
     "definition": "Supposed communication of thoughts without words or signals.",
     "answer": "telepathy"
    },
    {
     "definition": "A deep, settled feeling of dislike.",
     "answer": "antipathy"
    },
    {
     "definition": "A system of medicine emphasizing the body's structure and manipulation.",
     "answer": "osteopathy"
    }
   ],
   "gre_count": 1,
   "id": 195
  },
  {
   "id": 196,
   "quality": 3,
   "start_word": "analogous",
   "start_definition": "Comparable in certain respects; similar.",
   "chain": [
    "analogous",
    "astrology",
    "astronomical",
    "autonomous",
    "autograph"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    },
    {
     "id": "autos",
     "root": "autos",
     "meaning": "self"
    }
   ],
   "links": [
    {
     "from": "analogous",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "misogynous",
      "androgynous",
      "astrology",
      "dolorous"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "terrestrial",
      "strenuous",
      "fastidious",
      "astronomical"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "chronometer",
      "misnomer",
      "nominal",
      "autonomous"
     ]
    },
    {
     "from": "autonomous",
     "root": "autos",
     "root_display": "autos",
     "root_meaning": "self",
     "answer": "autograph",
     "answer_definition": "A person's own signature, especially a celebrity's.",
     "options": [
      "plutocracy",
      "autocratic",
      "cosmonaut",
      "autograph"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "chronos",
    "root": "chronos",
    "meaning": "time",
    "origin": "Greek"
   },
   "options": [
    "chronic",
    "anachronism",
    "misanthrope",
    "synchronous",
    "chronological"
   ],
   "rounds": [
    {
     "definition": "Something out of its proper time period.",
     "answer": "anachronism"
    },
    {
     "definition": "Arranged in the order of time.",
     "answer": "chronological"
    },
    {
     "definition": "Happening at the same time and rate.",
     "answer": "synchronous"
    },
    {
     "definition": "Lasting a long time; constantly recurring.",
     "answer": "chronic"
    }
   ],
   "gre_count": 3,
   "id": 197
  },
  {
   "type": "cluster",
   "root": {
    "id": "bios",
    "root": "bios",
    "meaning": "life",
    "origin": "Greek"
   },
   "options": [
    "biopsy",
    "biological",
    "biography",
    "symbiosis"
   ],
   "rounds": [
    {
     "definition": "The removal of tissue to examine it for disease.",
     "answer": "biopsy"
    },
    {
     "definition": "An account of a person's life written by someone else.",
     "answer": "biography"
    },
    {
     "definition": "Relating to living organisms.",
     "answer": "biological"
    },
    {
     "definition": "A close relationship between two different organisms, often to mutual benefit.",
     "answer": "symbiosis"
    }
   ],
   "gre_count": 1,
   "id": 198
  },
  {
   "id": 199,
   "quality": 3,
   "start_word": "barometer",
   "start_definition": "An instrument that measures air pressure, used to forecast weather.",
   "chain": [
    "barometer",
    "chronometer",
    "chronological",
    "pathology",
    "apathy"
   ],
   "pivot_roots": [
    {
     "id": "metron",
     "root": "metron",
     "meaning": "measure"
    },
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "pathos",
     "root": "pathos",
     "meaning": "feeling, suffering"
    }
   ],
   "links": [
    {
     "from": "barometer",
     "root": "metron",
     "root_display": "metron",
     "root_meaning": "measure",
     "answer": "chronometer",
     "answer_definition": "An extremely accurate timepiece.",
     "options": [
      "inveterate",
      "chronometer",
      "veteran",
      "dexterity"
     ]
    },
    {
     "from": "chronometer",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "astronomical",
      "anthropological",
      "headstrong",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "pathology",
     "answer_definition": "The study of the causes and effects of disease.",
     "options": [
      "misogynous",
      "pedagogy",
      "dolorous",
      "pathology"
     ]
    },
    {
     "from": "pathology",
     "root": "pathos",
     "root_display": "pathos",
     "root_meaning": "feeling, suffering",
     "answer": "apathy",
     "answer_definition": "A lack of interest, feeling, or concern.",
     "options": [
      "expatriate",
      "patriarch",
      "polymath",
      "apathy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "ponere",
    "root": "pono, positus",
    "meaning": "to place",
    "origin": "Latin"
   },
   "options": [
    "apposite",
    "posit",
    "juxtapose",
    "supposition",
    "psychosis"
   ],
   "rounds": [
    {
     "definition": "To put forward as a basis for argument.",
     "answer": "posit"
    },
    {
     "definition": "Strikingly appropriate.",
     "answer": "apposite"
    },
    {
     "definition": "Something assumed without proof.",
     "answer": "supposition"
    },
    {
     "definition": "To place side by side for contrast.",
     "answer": "juxtapose"
    }
   ],
   "gre_count": 4,
   "id": 200
  },
  {
   "type": "cluster",
   "root": {
    "id": "durus",
    "root": "durus",
    "meaning": "hard",
    "origin": "Latin"
   },
   "options": [
    "duress",
    "endure",
    "durable",
    "obdurate",
    "neuralgia"
   ],
   "rounds": [
    {
     "definition": "Stubbornly refusing to change one's opinion or course of action.",
     "answer": "obdurate"
    },
    {
     "definition": "Threats or force used to coerce someone into doing something.",
     "answer": "duress"
    },
    {
     "definition": "Able to withstand wear; hard-wearing.",
     "answer": "durable"
    },
    {
     "definition": "To suffer something patiently, or to last over time.",
     "answer": "endure"
    }
   ],
   "gre_count": 2,
   "id": 201
  },
  {
   "id": 202,
   "quality": 3,
   "start_word": "diameter",
   "start_definition": "A straight line through the center of a circle.",
   "chain": [
    "diameter",
    "chronometer",
    "chronological",
    "philology",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "metron",
     "root": "metron",
     "meaning": "measure"
    },
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "diameter",
     "root": "metron",
     "root_display": "metron",
     "root_meaning": "measure",
     "answer": "chronometer",
     "answer_definition": "An extremely accurate timepiece.",
     "options": [
      "chronometer",
      "ambidexterity",
      "inveterate",
      "veteran"
     ]
    },
    {
     "from": "chronometer",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "anthropological",
      "astronomical",
      "chronological",
      "headstrong"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "philology",
     "answer_definition": "The study of language in historical texts.",
     "options": [
      "dolorous",
      "philology",
      "misogynous",
      "pedagogy"
     ]
    },
    {
     "from": "philology",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "semblance",
      "philanthropy",
      "pusillanimous",
      "annihilate"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "sciens",
    "root": "sciens",
    "meaning": "knowing",
    "origin": "Latin"
   },
   "options": [
    "nescient",
    "unconscionable",
    "prescience",
    "omniscient",
    "prescient"
   ],
   "rounds": [
    {
     "definition": "Knowing everything.",
     "answer": "omniscient"
    },
    {
     "definition": "Having knowledge of events before they happen.",
     "answer": "prescient"
    },
    {
     "definition": "Lacking knowledge; ignorant.",
     "answer": "nescient"
    },
    {
     "definition": "Knowledge of events before they happen; foresight.",
     "answer": "prescience"
    }
   ],
   "gre_count": 1,
   "id": 203
  },
  {
   "type": "cluster",
   "root": {
    "id": "cheir",
    "root": "cheir",
    "meaning": "hand",
    "origin": "Greek"
   },
   "options": [
    "chiropody",
    "chirography",
    "chiromancy",
    "psychiatric",
    "chiropractic"
   ],
   "rounds": [
    {
     "definition": "Handwriting, especially as an art or skill.",
     "answer": "chirography"
    },
    {
     "definition": "The practice of treating disorders through manual spinal adjustment.",
     "answer": "chiropractic"
    },
    {
     "definition": "The treatment of foot ailments.",
     "answer": "chiropody"
    },
    {
     "definition": "The practice of telling fortunes from the palm; palm reading.",
     "answer": "chiromancy"
    }
   ],
   "gre_count": 0,
   "id": 204
  },
  {
   "id": 205,
   "quality": 2,
   "start_word": "apathy",
   "start_definition": "A lack of interest, feeling, or concern.",
   "chain": [
    "apathy",
    "telepathy",
    "telephone",
    "cacophony",
    "cacography"
   ],
   "pivot_roots": [
    {
     "id": "pathos",
     "root": "pathos",
     "meaning": "feeling, suffering"
    },
    {
     "id": "tele",
     "root": "tele",
     "meaning": "distant, far"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    },
    {
     "id": "kakos",
     "root": "kakos",
     "meaning": "bad"
    }
   ],
   "links": [
    {
     "from": "apathy",
     "root": "pathos",
     "root_display": "pathos",
     "root_meaning": "feeling, suffering",
     "answer": "telepathy",
     "answer_definition": "Supposed communication of thoughts without words or signals.",
     "options": [
      "expatriate",
      "polymath",
      "telepathy",
      "patriarch"
     ]
    },
    {
     "from": "telepathy",
     "root": "tele",
     "root_display": "tele",
     "root_meaning": "distant, far",
     "answer": "telephone",
     "answer_definition": "A device for speaking to someone at a distance.",
     "options": [
      "elevate",
      "telephone",
      "intellect",
      "microphone"
     ]
    },
    {
     "from": "telephone",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "photograph",
      "graphology",
      "xenophobia",
      "cacophony"
     ]
    },
    {
     "from": "cacophony",
     "root": "kakos",
     "root_display": "kakos",
     "root_meaning": "bad",
     "answer": "cacography",
     "answer_definition": "Bad handwriting or poor spelling.",
     "options": [
      "perspicacious",
      "efficacious",
      "efficacy",
      "cacography"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "sonus",
    "root": "sonus, sonitus",
    "meaning": "sound",
    "origin": "Latin"
   },
   "options": [
    "unison",
    "dissonance",
    "consonant",
    "sonorous"
   ],
   "rounds": [
    {
     "definition": "Simultaneous performance of action or sound; complete agreement.",
     "answer": "unison"
    },
    {
     "definition": "A lack of harmony or agreement, especially in sound or ideas.",
     "answer": "dissonance"
    },
    {
     "definition": "Producing a deep, rich, or resonant sound.",
     "answer": "sonorous"
    },
    {
     "definition": "In agreement or harmony with something.",
     "answer": "consonant"
    }
   ],
   "gre_count": 2,
   "id": 206
  },
  {
   "type": "cluster",
   "root": {
    "id": "cadere",
    "root": "cado, casus",
    "meaning": "to fall",
    "origin": "Latin"
   },
   "options": [
    "incidental",
    "decadent",
    "cascade",
    "recidivism",
    "placid"
   ],
   "rounds": [
    {
     "definition": "Occurring as a minor accompaniment to something else.",
     "answer": "incidental"
    },
    {
     "definition": "The tendency of a convicted criminal to reoffend.",
     "answer": "recidivism"
    },
    {
     "definition": "A small waterfall, or a process happening in successive stages.",
     "answer": "cascade"
    },
    {
     "definition": "Marked by excessive self-indulgence and moral decline.",
     "answer": "decadent"
    }
   ],
   "gre_count": 2,
   "id": 207
  },
  {
   "id": 208,
   "quality": 2,
   "start_word": "synchronous",
   "start_definition": "Happening at the same time and rate.",
   "chain": [
    "synchronous",
    "chronological",
    "gerontology",
    "geriatric",
    "psychiatric"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geras",
     "root": "geras",
     "meaning": "old age"
    },
    {
     "id": "iatreia",
     "root": "iatreia",
     "meaning": "healing"
    }
   ],
   "links": [
    {
     "from": "synchronous",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "chronological",
      "headstrong",
      "astronomical",
      "anthropological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gerontology",
     "answer_definition": "The study of aging and the problems of the old.",
     "options": [
      "misogynous",
      "dolorous",
      "gerontology",
      "pedagogy"
     ]
    },
    {
     "from": "gerontology",
     "root": "geras",
     "root_display": "geras",
     "root_meaning": "old age",
     "answer": "geriatric",
     "answer_definition": "Relating to old age or its medical care.",
     "options": [
      "skulduggery",
      "geriatric",
      "belligerent",
      "biological"
     ]
    },
    {
     "from": "geriatric",
     "root": "iatreia",
     "root_display": "iatreia",
     "root_meaning": "healing",
     "answer": "psychiatric",
     "answer_definition": "Relating to the medical treatment of mental illness.",
     "options": [
      "psychiatric",
      "eccentric",
      "egocentric",
      "ingratiate"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "solvere",
    "root": "solvo",
    "meaning": "to loosen",
    "origin": "Latin"
   },
   "options": [
    "resolute",
    "absolve",
    "dissolution",
    "soliloquy",
    "irresolute"
   ],
   "rounds": [
    {
     "definition": "Admirably purposeful and determined; unwavering.",
     "answer": "resolute"
    },
    {
     "definition": "The breaking up or ending of something.",
     "answer": "dissolution"
    },
    {
     "definition": "To free from blame or obligation.",
     "answer": "absolve"
    },
    {
     "definition": "Unable to decide; hesitating.",
     "answer": "irresolute"
    }
   ],
   "gre_count": 2,
   "id": 209
  },
  {
   "type": "cluster",
   "root": {
    "id": "jus_juris",
    "root": "jus, juris",
    "meaning": "law, right",
    "origin": "Latin"
   },
   "options": [
    "penury",
    "perjury",
    "abjure",
    "jury",
    "adjure"
   ],
   "rounds": [
    {
     "definition": "A body of citizens sworn to render a verdict in a legal case.",
     "answer": "jury"
    },
    {
     "definition": "The offense of lying while under oath in a court.",
     "answer": "perjury"
    },
    {
     "definition": "To urge or command someone earnestly, as if under oath.",
     "answer": "adjure"
    },
    {
     "definition": "To solemnly renounce a belief, cause, or claim.",
     "answer": "abjure"
    }
   ],
   "gre_count": 2,
   "id": 210
  },
  {
   "id": 211,
   "quality": 2,
   "start_word": "anachronism",
   "start_definition": "Something out of its proper time period.",
   "chain": [
    "anachronism",
    "chronological",
    "gerontology",
    "geriatric",
    "psychiatric"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geras",
     "root": "geras",
     "meaning": "old age"
    },
    {
     "id": "iatreia",
     "root": "iatreia",
     "meaning": "healing"
    }
   ],
   "links": [
    {
     "from": "anachronism",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "chronological",
      "headstrong",
      "misanthropic",
      "astronomical"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gerontology",
     "answer_definition": "The study of aging and the problems of the old.",
     "options": [
      "androgynous",
      "gerontology",
      "dolorous",
      "pedagogy"
     ]
    },
    {
     "from": "gerontology",
     "root": "geras",
     "root_display": "geras",
     "root_meaning": "old age",
     "answer": "geriatric",
     "answer_definition": "Relating to old age or its medical care.",
     "options": [
      "biological",
      "geriatric",
      "belligerent",
      "skulduggery"
     ]
    },
    {
     "from": "geriatric",
     "root": "iatreia",
     "root_display": "iatreia",
     "root_meaning": "healing",
     "answer": "psychiatric",
     "answer_definition": "Relating to the medical treatment of mental illness.",
     "options": [
      "ingratiate",
      "psychiatric",
      "appropriate",
      "egocentric"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "tenere",
    "root": "teneo",
    "meaning": "to hold",
    "origin": "Latin"
   },
   "options": [
    "omnipotent",
    "countenance",
    "tenacious",
    "tenet",
    "retention"
   ],
   "rounds": [
    {
     "definition": "To tolerate or give approval to.",
     "answer": "countenance"
    },
    {
     "definition": "Holding firmly; stubbornly persistent.",
     "answer": "tenacious"
    },
    {
     "definition": "The act of keeping or holding on to something.",
     "answer": "retention"
    },
    {
     "definition": "A principle held to be true by a group.",
     "answer": "tenet"
    }
   ],
   "gre_count": 1,
   "id": 212
  },
  {
   "type": "cluster",
   "root": {
    "id": "solvere",
    "root": "solvo",
    "meaning": "to loosen",
    "origin": "Latin"
   },
   "options": [
    "absolve",
    "soliloquy",
    "dissolute",
    "irresolute",
    "dissolution"
   ],
   "rounds": [
    {
     "definition": "The breaking up or ending of something.",
     "answer": "dissolution"
    },
    {
     "definition": "Unable to decide; hesitating.",
     "answer": "irresolute"
    },
    {
     "definition": "Lacking moral restraint; debauched.",
     "answer": "dissolute"
    },
    {
     "definition": "To free from blame or obligation.",
     "answer": "absolve"
    }
   ],
   "gre_count": 2,
   "id": 213
  },
  {
   "id": 214,
   "quality": 2,
   "start_word": "synchronous",
   "start_definition": "Happening at the same time and rate.",
   "chain": [
    "synchronous",
    "chronological",
    "gerontology",
    "geriatric",
    "pediatrics"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geras",
     "root": "geras",
     "meaning": "old age"
    },
    {
     "id": "iatreia",
     "root": "iatreia",
     "meaning": "healing"
    }
   ],
   "links": [
    {
     "from": "synchronous",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "misanthropic",
      "chronological",
      "headstrong",
      "anthropological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gerontology",
     "answer_definition": "The study of aging and the problems of the old.",
     "options": [
      "pedagogy",
      "dolorous",
      "androgynous",
      "gerontology"
     ]
    },
    {
     "from": "gerontology",
     "root": "geras",
     "root_display": "geras",
     "root_meaning": "old age",
     "answer": "geriatric",
     "answer_definition": "Relating to old age or its medical care.",
     "options": [
      "biological",
      "belligerent",
      "geriatric",
      "skulduggery"
     ]
    },
    {
     "from": "geriatric",
     "root": "iatreia",
     "root_display": "iatreia",
     "root_meaning": "healing",
     "answer": "pediatrics",
     "answer_definition": "The branch of medicine dealing with children.",
     "options": [
      "matrimony",
      "patronize",
      "pediatrics",
      "expatriate"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "rogare",
    "root": "rogo, rogatus",
    "meaning": "to ask",
    "origin": "Latin"
   },
   "options": [
    "abrogate",
    "misogamy",
    "derogatory",
    "arrogate",
    "prerogative"
   ],
   "rounds": [
    {
     "definition": "To claim or take for oneself without justification.",
     "answer": "arrogate"
    },
    {
     "definition": "Showing a critical or disrespectful attitude.",
     "answer": "derogatory"
    },
    {
     "definition": "An exclusive right or privilege held by a person or group.",
     "answer": "prerogative"
    },
    {
     "definition": "To repeal or do away with a law or agreement formally.",
     "answer": "abrogate"
    }
   ],
   "gre_count": 3,
   "id": 215
  },
  {
   "type": "cluster",
   "root": {
    "id": "videre",
    "root": "video, visus",
    "meaning": "to see",
    "origin": "Latin"
   },
   "options": [
    "vision",
    "recidivism",
    "improvise",
    "invidious",
    "provident"
   ],
   "rounds": [
    {
     "definition": "To create or perform something spontaneously, without preparation.",
     "answer": "improvise"
    },
    {
     "definition": "Making thrifty and careful provision for the future.",
     "answer": "provident"
    },
    {
     "definition": "Likely to cause resentment or anger by seeming unfair.",
     "answer": "invidious"
    },
    {
     "definition": "The ability to see, or a vivid mental image of the future.",
     "answer": "vision"
    }
   ],
   "gre_count": 1,
   "id": 216
  },
  {
   "id": 217,
   "quality": 2,
   "start_word": "synchronous",
   "start_definition": "Happening at the same time and rate.",
   "chain": [
    "synchronous",
    "chronological",
    "gerontology",
    "geriatric",
    "podiatric"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geras",
     "root": "geras",
     "meaning": "old age"
    },
    {
     "id": "iatreia",
     "root": "iatreia",
     "meaning": "healing"
    }
   ],
   "links": [
    {
     "from": "synchronous",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "chronological",
      "anthropological",
      "astronomical",
      "misanthropic"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gerontology",
     "answer_definition": "The study of aging and the problems of the old.",
     "options": [
      "gerontology",
      "androgynous",
      "pedagogy",
      "dolorous"
     ]
    },
    {
     "from": "gerontology",
     "root": "geras",
     "root_display": "geras",
     "root_meaning": "old age",
     "answer": "geriatric",
     "answer_definition": "Relating to old age or its medical care.",
     "options": [
      "biological",
      "geriatric",
      "belligerent",
      "skulduggery"
     ]
    },
    {
     "from": "geriatric",
     "root": "iatreia",
     "root_display": "iatreia",
     "root_meaning": "healing",
     "answer": "podiatric",
     "answer_definition": "Relating to the care of the feet.",
     "options": [
      "podiatric",
      "appropriate",
      "ingratiate",
      "cordial"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "archein",
    "root": "archein",
    "meaning": "to rule",
    "origin": "Greek"
   },
   "options": [
    "archaic",
    "gauche",
    "anarchy",
    "hierarchy",
    "archetype"
   ],
   "rounds": [
    {
     "definition": "A very typical example of a certain person or thing; an original model.",
     "answer": "archetype"
    },
    {
     "definition": "A state of disorder due to absence of authority.",
     "answer": "anarchy"
    },
    {
     "definition": "A system in which people or things are ranked one above another.",
     "answer": "hierarchy"
    },
    {
     "definition": "Very old or old-fashioned; belonging to an earlier period.",
     "answer": "archaic"
    }
   ],
   "gre_count": 4,
   "id": 218
  },
  {
   "type": "cluster",
   "root": {
    "id": "valere",
    "root": "valeo",
    "meaning": "to be strong",
    "origin": "Latin"
   },
   "options": [
    "ambivalent",
    "equivalent",
    "dialect",
    "valor",
    "validate"
   ],
   "rounds": [
    {
     "definition": "Having mixed feelings or contradictory ideas about something.",
     "answer": "ambivalent"
    },
    {
     "definition": "Great courage in the face of danger.",
     "answer": "valor"
    },
    {
     "definition": "Equal in value, amount, function, or meaning.",
     "answer": "equivalent"
    },
    {
     "definition": "To confirm the accuracy or worth of something.",
     "answer": "validate"
    }
   ],
   "gre_count": 1,
   "id": 219
  },
  {
   "id": 220,
   "quality": 2,
   "start_word": "anachronism",
   "start_definition": "Something out of its proper time period.",
   "chain": [
    "anachronism",
    "chronological",
    "gerontology",
    "geriatric",
    "podiatric"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geras",
     "root": "geras",
     "meaning": "old age"
    },
    {
     "id": "iatreia",
     "root": "iatreia",
     "meaning": "healing"
    }
   ],
   "links": [
    {
     "from": "anachronism",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "chronological",
      "headstrong",
      "astronomical",
      "misanthropic"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "gerontology",
     "answer_definition": "The study of aging and the problems of the old.",
     "options": [
      "dolorous",
      "gerontology",
      "androgynous",
      "pedagogy"
     ]
    },
    {
     "from": "gerontology",
     "root": "geras",
     "root_display": "geras",
     "root_meaning": "old age",
     "answer": "geriatric",
     "answer_definition": "Relating to old age or its medical care.",
     "options": [
      "skulduggery",
      "belligerent",
      "biological",
      "geriatric"
     ]
    },
    {
     "from": "geriatric",
     "root": "iatreia",
     "root_display": "iatreia",
     "root_meaning": "healing",
     "answer": "podiatric",
     "answer_definition": "Relating to the care of the feet.",
     "options": [
      "podiatric",
      "cordial",
      "deviate",
      "appropriate"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "facere",
    "root": "facio",
    "meaning": "to do, make",
    "origin": "Latin"
   },
   "options": [
    "pacific",
    "facetious",
    "efficacious",
    "artifice",
    "officious"
   ],
   "rounds": [
    {
     "definition": "Successful in producing the intended result; effective.",
     "answer": "efficacious"
    },
    {
     "definition": "Joking about something that deserves seriousness.",
     "answer": "facetious"
    },
    {
     "definition": "Clever or cunning devices or expedients, especially involving deception.",
     "answer": "artifice"
    },
    {
     "definition": "Intrusively offering unwanted help or authority.",
     "answer": "officious"
    }
   ],
   "gre_count": 4,
   "id": 221
  },
  {
   "type": "cluster",
   "root": {
    "id": "cheir",
    "root": "cheir",
    "meaning": "hand",
    "origin": "Greek"
   },
   "options": [
    "psychiatric",
    "chiropractic",
    "chiromancy",
    "chiromantic",
    "chiropody"
   ],
   "rounds": [
    {
     "definition": "The practice of telling fortunes from the palm; palm reading.",
     "answer": "chiromancy"
    },
    {
     "definition": "The treatment of foot ailments.",
     "answer": "chiropody"
    },
    {
     "definition": "Relating to palm reading.",
     "answer": "chiromantic"
    },
    {
     "definition": "The practice of treating disorders through manual spinal adjustment.",
     "answer": "chiropractic"
    }
   ],
   "gre_count": 0,
   "id": 222
  },
  {
   "id": 223,
   "quality": 2,
   "start_word": "analogous",
   "start_definition": "Comparable in certain respects; similar.",
   "chain": [
    "analogous",
    "pathology",
    "telepathy",
    "telephone",
    "cacophony"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "pathos",
     "root": "pathos",
     "meaning": "feeling, suffering"
    },
    {
     "id": "tele",
     "root": "tele",
     "meaning": "distant, far"
    },
    {
     "id": "phone",
     "root": "phone",
     "meaning": "sound"
    }
   ],
   "links": [
    {
     "from": "analogous",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "pathology",
     "answer_definition": "The study of the causes and effects of disease.",
     "options": [
      "dolorous",
      "androgynous",
      "pathology",
      "misogynous"
     ]
    },
    {
     "from": "pathology",
     "root": "pathos",
     "root_display": "pathos",
     "root_meaning": "feeling, suffering",
     "answer": "telepathy",
     "answer_definition": "Supposed communication of thoughts without words or signals.",
     "options": [
      "telepathy",
      "polymath",
      "expatriate",
      "patriarch"
     ]
    },
    {
     "from": "telepathy",
     "root": "tele",
     "root_display": "tele",
     "root_meaning": "distant, far",
     "answer": "telephone",
     "answer_definition": "A device for speaking to someone at a distance.",
     "options": [
      "elevate",
      "linguistics",
      "intellect",
      "telephone"
     ]
    },
    {
     "from": "telephone",
     "root": "phone",
     "root_display": "phone",
     "root_meaning": "sound",
     "answer": "cacophony",
     "answer_definition": "A harsh, discordant mixture of sounds.",
     "options": [
      "xenophobia",
      "cacophony",
      "photograph",
      "graphology"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "stare",
    "root": "sto, status",
    "meaning": "to stand",
    "origin": "Latin"
   },
   "options": [
    "nostalgia",
    "substantiate",
    "circumstance",
    "static",
    "inconstancy"
   ],
   "rounds": [
    {
     "definition": "Not moving or changing.",
     "answer": "static"
    },
    {
     "definition": "The quality of changing frequently; unreliability.",
     "answer": "inconstancy"
    },
    {
     "definition": "To support with evidence.",
     "answer": "substantiate"
    },
    {
     "definition": "A condition or fact connected with an event.",
     "answer": "circumstance"
    }
   ],
   "gre_count": 3,
   "id": 224
  },
  {
   "type": "cluster",
   "root": {
    "id": "pugnare",
    "root": "pugno, pugnatus",
    "meaning": "to fight",
    "origin": "Latin"
   },
   "options": [
    "pugilist",
    "impugn",
    "pugnacious",
    "repugnant"
   ],
   "rounds": [
    {
     "definition": "To dispute the truth, validity, or honesty of something.",
     "answer": "impugn"
    },
    {
     "definition": "A fighter, especially a professional boxer.",
     "answer": "pugilist"
    },
    {
     "definition": "Extremely distasteful or unacceptable.",
     "answer": "repugnant"
    },
    {
     "definition": "Eager or quick to argue or fight.",
     "answer": "pugnacious"
    }
   ],
   "gre_count": 3,
   "id": 225
  },
  {
   "id": 226,
   "quality": 2,
   "start_word": "anachronism",
   "start_definition": "Something out of its proper time period.",
   "chain": [
    "anachronism",
    "chronological",
    "geology",
    "geometric",
    "thermometer"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geo",
     "root": "ge (geo-)",
     "meaning": "earth"
    },
    {
     "id": "metron",
     "root": "metron",
     "meaning": "measure"
    }
   ],
   "links": [
    {
     "from": "anachronism",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "headstrong",
      "anthropological",
      "chronological",
      "misanthropic"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "geology",
     "answer_definition": "The science of the earth's physical structure and history.",
     "options": [
      "astronaut",
      "pedagogy",
      "geology",
      "dolorous"
     ]
    },
    {
     "from": "geology",
     "root": "geo",
     "root_display": "ge (geo-)",
     "root_meaning": "earth",
     "answer": "geometric",
     "answer_definition": "Relating to geometry; made of regular shapes and lines.",
     "options": [
      "curmudgeon",
      "astrology",
      "geometric",
      "burgeon"
     ]
    },
    {
     "from": "geometric",
     "root": "metron",
     "root_display": "metron",
     "root_meaning": "measure",
     "answer": "thermometer",
     "answer_definition": "An instrument for measuring temperature.",
     "options": [
      "mettlesome",
      "metropolis",
      "thermometer",
      "intersect"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "probare",
    "root": "probo",
    "meaning": "to test, prove",
    "origin": "Latin"
   },
   "options": [
    "probity",
    "reprobate",
    "approbation",
    "progeny",
    "opprobrium"
   ],
   "rounds": [
    {
     "definition": "The quality of having strong moral principles; honesty.",
     "answer": "probity"
    },
    {
     "definition": "Harsh criticism or public disgrace resulting from shameful conduct.",
     "answer": "opprobrium"
    },
    {
     "definition": "Approval or praise, especially of an official kind.",
     "answer": "approbation"
    },
    {
     "definition": "An unprincipled person; a scoundrel.",
     "answer": "reprobate"
    }
   ],
   "gre_count": 4,
   "id": 227
  },
  {
   "type": "cluster",
   "root": {
    "id": "logos",
    "root": "logos",
    "meaning": "word, study",
    "origin": "Greek"
   },
   "options": [
    "eulogy",
    "chronological",
    "analogous",
    "cardiology"
   ],
   "rounds": [
    {
     "definition": "A speech or piece of writing praising someone, typically one who has died.",
     "answer": "eulogy"
    },
    {
     "definition": "Arranged in the order of time.",
     "answer": "chronological"
    },
    {
     "definition": "The branch of medicine dealing with the heart.",
     "answer": "cardiology"
    },
    {
     "definition": "Comparable in certain respects; similar.",
     "answer": "analogous"
    }
   ],
   "gre_count": 3,
   "id": 228
  },
  {
   "id": 229,
   "quality": 2,
   "start_word": "eulogy",
   "start_definition": "A speech or piece of writing praising someone, typically one who has died.",
   "chain": [
    "eulogy",
    "geology",
    "geometric",
    "chronometer",
    "anachronism"
   ],
   "pivot_roots": [
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geo",
     "root": "ge (geo-)",
     "meaning": "earth"
    },
    {
     "id": "metron",
     "root": "metron",
     "meaning": "measure"
    },
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    }
   ],
   "links": [
    {
     "from": "eulogy",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "geology",
     "answer_definition": "The science of the earth's physical structure and history.",
     "options": [
      "androgynous",
      "geology",
      "misogynous",
      "pedagogy"
     ]
    },
    {
     "from": "geology",
     "root": "geo",
     "root_display": "ge (geo-)",
     "root_meaning": "earth",
     "answer": "geometric",
     "answer_definition": "Relating to geometry; made of regular shapes and lines.",
     "options": [
      "geometric",
      "burgeon",
      "curmudgeon",
      "zoology"
     ]
    },
    {
     "from": "geometric",
     "root": "metron",
     "root_display": "metron",
     "root_meaning": "measure",
     "answer": "chronometer",
     "answer_definition": "An extremely accurate timepiece.",
     "options": [
      "veteran",
      "metropolis",
      "terrestrial",
      "chronometer"
     ]
    },
    {
     "from": "chronometer",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "anachronism",
     "answer_definition": "Something out of its proper time period.",
     "options": [
      "anachronism",
      "chromosome",
      "misanthrope",
      "gerontology"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "odontos",
    "root": "odontos",
    "meaning": "tooth",
    "origin": "Greek"
   },
   "options": [
    "endodontist",
    "periodontist",
    "pedodontist",
    "gerontology",
    "orthodontia"
   ],
   "rounds": [
    {
     "definition": "A dentist who specializes in children's teeth.",
     "answer": "pedodontist"
    },
    {
     "definition": "A dentist who specializes in treatment inside the tooth, such as root canals.",
     "answer": "endodontist"
    },
    {
     "definition": "The dental practice of straightening teeth.",
     "answer": "orthodontia"
    },
    {
     "definition": "A dentist who specializes in the gums and tissue around the teeth.",
     "answer": "periodontist"
    }
   ],
   "gre_count": 0,
   "id": 230
  },
  {
   "type": "cluster",
   "root": {
    "id": "ludere",
    "root": "ludo, lusus",
    "meaning": "to play",
    "origin": "Latin"
   },
   "options": [
    "collusion",
    "allusion",
    "illusory",
    "pusillanimous",
    "prelude"
   ],
   "rounds": [
    {
     "definition": "An indirect or passing reference to something.",
     "answer": "allusion"
    },
    {
     "definition": "An introductory event or action preceding something more important.",
     "answer": "prelude"
    },
    {
     "definition": "Secret cooperation for a deceitful or illegal purpose.",
     "answer": "collusion"
    },
    {
     "definition": "Based on illusion; not real, though it appears to be.",
     "answer": "illusory"
    }
   ],
   "gre_count": 2,
   "id": 231
  },
  {
   "id": 232,
   "quality": 2,
   "start_word": "synchronous",
   "start_definition": "Happening at the same time and rate.",
   "chain": [
    "synchronous",
    "chronological",
    "geology",
    "geometric",
    "optometry"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "geo",
     "root": "ge (geo-)",
     "meaning": "earth"
    },
    {
     "id": "metron",
     "root": "metron",
     "meaning": "measure"
    }
   ],
   "links": [
    {
     "from": "synchronous",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "anthropological",
      "headstrong",
      "misanthropic",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "geology",
     "answer_definition": "The science of the earth's physical structure and history.",
     "options": [
      "dolorous",
      "pedagogy",
      "astronaut",
      "geology"
     ]
    },
    {
     "from": "geology",
     "root": "geo",
     "root_display": "ge (geo-)",
     "root_meaning": "earth",
     "answer": "geometric",
     "answer_definition": "Relating to geometry; made of regular shapes and lines.",
     "options": [
      "burgeon",
      "curmudgeon",
      "astrology",
      "geometric"
     ]
    },
    {
     "from": "geometric",
     "root": "metron",
     "root_display": "metron",
     "root_meaning": "measure",
     "answer": "optometry",
     "answer_definition": "The practice of testing eyes and prescribing corrective lenses.",
     "options": [
      "optometry",
      "metropolis",
      "chromosome",
      "misnomer"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "crescere",
    "root": "cresco",
    "meaning": "to grow",
    "origin": "Latin"
   },
   "options": [
    "crescendo",
    "accretion",
    "accrue",
    "senescent",
    "increment"
   ],
   "rounds": [
    {
     "definition": "A gradual increase in volume or intensity.",
     "answer": "crescendo"
    },
    {
     "definition": "Gradual growth by accumulation.",
     "answer": "accretion"
    },
    {
     "definition": "To accumulate over time.",
     "answer": "accrue"
    },
    {
     "definition": "A small increase or addition.",
     "answer": "increment"
    }
   ],
   "gre_count": 2,
   "id": 233
  },
  {
   "type": "cluster",
   "root": {
    "id": "lex_legis",
    "root": "lex, legis",
    "meaning": "law",
    "origin": "Latin"
   },
   "options": [
    "legitimate",
    "legislate",
    "privilege",
    "illegitimate",
    "telegraph"
   ],
   "rounds": [
    {
     "definition": "A special right or advantage granted to a particular person or group.",
     "answer": "privilege"
    },
    {
     "definition": "Not authorized by law; not sanctioned by official rules.",
     "answer": "illegitimate"
    },
    {
     "definition": "To make or enact laws.",
     "answer": "legislate"
    },
    {
     "definition": "Conforming to the law or to accepted standards; genuine.",
     "answer": "legitimate"
    }
   ],
   "gre_count": 0,
   "id": 234
  },
  {
   "id": 235,
   "quality": 2,
   "start_word": "anachronistic",
   "start_definition": "Belonging to the wrong period; out of date.",
   "chain": [
    "anachronistic",
    "chronological",
    "astrology",
    "astronomical",
    "autonomous"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    }
   ],
   "links": [
    {
     "from": "anachronistic",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "misanthropic",
      "anthropological",
      "headstrong",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "astrology",
      "astronaut",
      "pedagogy",
      "dolorous"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "headstrong",
      "astronomical",
      "terrestrial",
      "pedestrian"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "autonomous",
      "misnomer",
      "nominal",
      "chronometer"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "plicare",
    "root": "plico",
    "meaning": "to fold",
    "origin": "Latin"
   },
   "options": [
    "duplicity",
    "supplicate",
    "implication",
    "policy",
    "explicit"
   ],
   "rounds": [
    {
     "definition": "A conclusion drawn from something not explicitly stated.",
     "answer": "implication"
    },
    {
     "definition": "Stated clearly and in detail.",
     "answer": "explicit"
    },
    {
     "definition": "To ask humbly and earnestly.",
     "answer": "supplicate"
    },
    {
     "definition": "Deceitfulness; acting in two contradictory ways.",
     "answer": "duplicity"
    }
   ],
   "gre_count": 4,
   "id": 236
  },
  {
   "type": "cluster",
   "root": {
    "id": "torquere",
    "root": "torqueo, tortus",
    "meaning": "to twist",
    "origin": "Latin"
   },
   "options": [
    "contort",
    "distort",
    "orthodontia",
    "torque",
    "tortuous"
   ],
   "rounds": [
    {
     "definition": "To pull or twist out of shape, or to give a misleading account of something.",
     "answer": "distort"
    },
    {
     "definition": "Full of twists and turns; excessively complex or lengthy.",
     "answer": "tortuous"
    },
    {
     "definition": "To twist or bend out of the normal shape.",
     "answer": "contort"
    },
    {
     "definition": "A twisting force that tends to cause rotation.",
     "answer": "torque"
    }
   ],
   "gre_count": 1,
   "id": 237
  },
  {
   "id": 238,
   "quality": 2,
   "start_word": "anachronism",
   "start_definition": "Something out of its proper time period.",
   "chain": [
    "anachronism",
    "chronological",
    "astrology",
    "astronomical",
    "autonomous"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "astron",
     "root": "astron",
     "meaning": "star"
    },
    {
     "id": "nomos",
     "root": "nomos",
     "meaning": "law, order"
    }
   ],
   "links": [
    {
     "from": "anachronism",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "anthropological",
      "misanthropic",
      "headstrong",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "astrology",
     "answer_definition": "The belief that the stars influence human affairs.",
     "options": [
      "pedagogy",
      "dolorous",
      "astronaut",
      "astrology"
     ]
    },
    {
     "from": "astrology",
     "root": "astron",
     "root_display": "astron",
     "root_meaning": "star",
     "answer": "astronomical",
     "answer_definition": "Relating to astronomy; also, enormously large.",
     "options": [
      "astronomical",
      "estranged",
      "steadfast",
      "terrestrial"
     ]
    },
    {
     "from": "astronomical",
     "root": "nomos",
     "root_display": "nomos",
     "root_meaning": "law, order",
     "answer": "autonomous",
     "answer_definition": "Self-governing; acting independently.",
     "options": [
      "chronometer",
      "misnomer",
      "autonomous",
      "nominal"
     ]
    }
   ],
   "gre_count": 3,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "kratos",
    "root": "kratos",
    "meaning": "power, rule",
    "origin": "Greek"
   },
   "options": [
    "autocratic",
    "aristocracy",
    "bureaucracy",
    "plutocracy",
    "chiropractic"
   ],
   "rounds": [
    {
     "definition": "A system of government or administration run by many officials and fixed rules.",
     "answer": "bureaucracy"
    },
    {
     "definition": "A ruling class of people of high social rank.",
     "answer": "aristocracy"
    },
    {
     "definition": "Relating to a ruler who has absolute power; domineering.",
     "answer": "autocratic"
    },
    {
     "definition": "A society or government controlled by the wealthy.",
     "answer": "plutocracy"
    }
   ],
   "gre_count": 2,
   "id": 239
  },
  {
   "type": "cluster",
   "root": {
    "id": "minuere",
    "root": "minuo, minutus",
    "meaning": "to lessen",
    "origin": "Latin"
   },
   "options": [
    "minimal",
    "diminutive",
    "luminous",
    "minute",
    "diminish"
   ],
   "rounds": [
    {
     "definition": "Extremely or unusually small.",
     "answer": "diminutive"
    },
    {
     "definition": "Extremely small; of very little importance.",
     "answer": "minute"
    },
    {
     "definition": "To make or become smaller or less.",
     "answer": "diminish"
    },
    {
     "definition": "Of a minimum amount, quantity, or degree; negligible.",
     "answer": "minimal"
    }
   ],
   "gre_count": 1,
   "id": 240
  },
  {
   "id": 241,
   "quality": 2,
   "start_word": "synchronous",
   "start_definition": "Happening at the same time and rate.",
   "chain": [
    "synchronous",
    "chronological",
    "pathology",
    "telepathy",
    "telegraph"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "pathos",
     "root": "pathos",
     "meaning": "feeling, suffering"
    },
    {
     "id": "tele",
     "root": "tele",
     "meaning": "distant, far"
    }
   ],
   "links": [
    {
     "from": "synchronous",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "anthropological",
      "headstrong",
      "astronomical",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "pathology",
     "answer_definition": "The study of the causes and effects of disease.",
     "options": [
      "misogynous",
      "dolorous",
      "pathology",
      "philanthropy"
     ]
    },
    {
     "from": "pathology",
     "root": "pathos",
     "root_display": "pathos",
     "root_meaning": "feeling, suffering",
     "answer": "telepathy",
     "answer_definition": "Supposed communication of thoughts without words or signals.",
     "options": [
      "polymath",
      "telepathy",
      "expatriate",
      "patriarch"
     ]
    },
    {
     "from": "telepathy",
     "root": "tele",
     "root_display": "tele",
     "root_meaning": "distant, far",
     "answer": "telegraph",
     "answer_definition": "A system for sending messages over distance by signal.",
     "options": [
      "elevate",
      "telegraph",
      "intellect",
      "empathy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "iatreia",
    "root": "iatreia",
    "meaning": "healing",
    "origin": "Greek"
   },
   "options": [
    "cardiac",
    "podiatric",
    "geriatric",
    "psychiatric",
    "pediatrics"
   ],
   "rounds": [
    {
     "definition": "Relating to the care of the feet.",
     "answer": "podiatric"
    },
    {
     "definition": "Relating to the medical treatment of mental illness.",
     "answer": "psychiatric"
    },
    {
     "definition": "Relating to old age or its medical care.",
     "answer": "geriatric"
    },
    {
     "definition": "The branch of medicine dealing with children.",
     "answer": "pediatrics"
    }
   ],
   "gre_count": 0,
   "id": 242
  },
  {
   "type": "cluster",
   "root": {
    "id": "socius",
    "root": "socius",
    "meaning": "companion",
    "origin": "Latin"
   },
   "options": [
    "sociology",
    "vociferous",
    "associate",
    "social",
    "asocial"
   ],
   "rounds": [
    {
     "definition": "The study of human society and social behavior.",
     "answer": "sociology"
    },
    {
     "definition": "Relating to society or interaction among people.",
     "answer": "social"
    },
    {
     "definition": "Avoiding social interaction; inconsiderate of others.",
     "answer": "asocial"
    },
    {
     "definition": "To connect in the mind, or to keep company with.",
     "answer": "associate"
    }
   ],
   "gre_count": 0,
   "id": 243
  },
  {
   "id": 244,
   "quality": 2,
   "start_word": "anachronism",
   "start_definition": "Something out of its proper time period.",
   "chain": [
    "anachronism",
    "chronological",
    "pathology",
    "telepathy",
    "telephone"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "pathos",
     "root": "pathos",
     "meaning": "feeling, suffering"
    },
    {
     "id": "tele",
     "root": "tele",
     "meaning": "distant, far"
    }
   ],
   "links": [
    {
     "from": "anachronism",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "astronomical",
      "chronological",
      "headstrong",
      "misanthropic"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "pathology",
     "answer_definition": "The study of the causes and effects of disease.",
     "options": [
      "dolorous",
      "pathology",
      "misogynous",
      "pedagogy"
     ]
    },
    {
     "from": "pathology",
     "root": "pathos",
     "root_display": "pathos",
     "root_meaning": "feeling, suffering",
     "answer": "telepathy",
     "answer_definition": "Supposed communication of thoughts without words or signals.",
     "options": [
      "expatriate",
      "polymath",
      "telepathy",
      "patriarch"
     ]
    },
    {
     "from": "telepathy",
     "root": "tele",
     "root_display": "tele",
     "root_meaning": "distant, far",
     "answer": "telephone",
     "answer_definition": "A device for speaking to someone at a distance.",
     "options": [
      "telephone",
      "intellect",
      "clamor",
      "elevate"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "fluere",
    "root": "fluo",
    "meaning": "to flow",
    "origin": "Latin"
   },
   "options": [
    "fluctuate",
    "influx",
    "superfluous",
    "mellifluous"
   ],
   "rounds": [
    {
     "definition": "Sweet or musical to hear; pleasingly smooth.",
     "answer": "mellifluous"
    },
    {
     "definition": "An arrival or entry of large numbers of people or things.",
     "answer": "influx"
    },
    {
     "definition": "To rise and fall irregularly in number or amount.",
     "answer": "fluctuate"
    },
    {
     "definition": "Unnecessary, especially through being more than what is needed.",
     "answer": "superfluous"
    }
   ],
   "gre_count": 3,
   "id": 245
  },
  {
   "type": "cluster",
   "root": {
    "id": "gravis",
    "root": "gravis",
    "meaning": "heavy, serious",
    "origin": "Latin"
   },
   "options": [
    "gravitas",
    "gaucherie",
    "grievance",
    "aggravate",
    "grievous"
   ],
   "rounds": [
    {
     "definition": "Very severe or serious; causing grief or suffering.",
     "answer": "grievous"
    },
    {
     "definition": "Dignity, seriousness, or solemnity of manner.",
     "answer": "gravitas"
    },
    {
     "definition": "A real or imagined wrong regarded as grounds for complaint.",
     "answer": "grievance"
    },
    {
     "definition": "To make a problem or situation worse; also, to irritate.",
     "answer": "aggravate"
    }
   ],
   "gre_count": 2,
   "id": 246
  },
  {
   "id": 247,
   "quality": 2,
   "start_word": "anachronism",
   "start_definition": "Something out of its proper time period.",
   "chain": [
    "anachronism",
    "chronological",
    "philology",
    "bibliophile",
    "bibliography"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "biblion",
     "root": "biblion",
     "meaning": "book"
    }
   ],
   "links": [
    {
     "from": "anachronism",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "anthropological",
      "headstrong",
      "misanthropic",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "philology",
     "answer_definition": "The study of language in historical texts.",
     "options": [
      "misogynous",
      "philology",
      "philanthropy",
      "dolorous"
     ]
    },
    {
     "from": "philology",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "bibliophile",
     "answer_definition": "A lover or collector of books.",
     "options": [
      "sophisticated",
      "annihilate",
      "sophistry",
      "bibliophile"
     ]
    },
    {
     "from": "bibliophile",
     "root": "biblion",
     "root_display": "biblion",
     "root_meaning": "book",
     "answer": "bibliography",
     "answer_definition": "A list of the books and sources used in a work.",
     "options": [
      "susceptible",
      "accessible",
      "plausible",
      "bibliography"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "demos",
    "root": "demos",
    "meaning": "people",
    "origin": "Greek"
   },
   "options": [
    "pandemic",
    "democracy",
    "endemic",
    "demagoguery",
    "demagogue"
   ],
   "rounds": [
    {
     "definition": "Regularly found in a particular area or group.",
     "answer": "endemic"
    },
    {
     "definition": "The practice of appealing to fear and prejudice to gain power.",
     "answer": "demagoguery"
    },
    {
     "definition": "A system of government by the whole population.",
     "answer": "democracy"
    },
    {
     "definition": "A leader who wins support by stirring up emotions and prejudice.",
     "answer": "demagogue"
    }
   ],
   "gre_count": 2,
   "id": 248
  },
  {
   "type": "cluster",
   "root": {
    "id": "manus",
    "root": "manus",
    "meaning": "hand",
    "origin": "Latin"
   },
   "options": [
    "egomaniacal",
    "manual",
    "mandate",
    "manacle",
    "manifest"
   ],
   "rounds": [
    {
     "definition": "Clear or obvious to the eye or mind.",
     "answer": "manifest"
    },
    {
     "definition": "Operated or done by hand rather than automatically.",
     "answer": "manual"
    },
    {
     "definition": "A metal restraint fastened around a wrist; a shackle.",
     "answer": "manacle"
    },
    {
     "definition": "An official order or authorization to act in a particular way.",
     "answer": "mandate"
    }
   ],
   "gre_count": 1,
   "id": 249
  },
  {
   "id": 250,
   "quality": 2,
   "start_word": "symmetry",
   "start_definition": "Balanced proportion; matching form on either side.",
   "chain": [
    "symmetry",
    "chronometer",
    "chronological",
    "pathology",
    "apathy"
   ],
   "pivot_roots": [
    {
     "id": "metron",
     "root": "metron",
     "meaning": "measure"
    },
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "pathos",
     "root": "pathos",
     "meaning": "feeling, suffering"
    }
   ],
   "links": [
    {
     "from": "symmetry",
     "root": "metron",
     "root_display": "metron",
     "root_meaning": "measure",
     "answer": "chronometer",
     "answer_definition": "An extremely accurate timepiece.",
     "options": [
      "mettlesome",
      "metropolis",
      "chronometer",
      "veteran"
     ]
    },
    {
     "from": "chronometer",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "headstrong",
      "anthropological",
      "misanthropic",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "pathology",
     "answer_definition": "The study of the causes and effects of disease.",
     "options": [
      "pathology",
      "dolorous",
      "misogynous",
      "misanthrope"
     ]
    },
    {
     "from": "pathology",
     "root": "pathos",
     "root_display": "pathos",
     "root_meaning": "feeling, suffering",
     "answer": "apathy",
     "answer_definition": "A lack of interest, feeling, or concern.",
     "options": [
      "loathe",
      "polymath",
      "patriarch",
      "apathy"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "pendere",
    "root": "pendo, pensus",
    "meaning": "to hang, weigh",
    "origin": "Latin"
   },
   "options": [
    "penchant",
    "pendulous",
    "dispense",
    "propensity",
    "penurious"
   ],
   "rounds": [
    {
     "definition": "To distribute or provide something; also, to do without (dispense with).",
     "answer": "dispense"
    },
    {
     "definition": "A strong habitual liking for something.",
     "answer": "penchant"
    },
    {
     "definition": "Hanging down loosely, especially so as to swing.",
     "answer": "pendulous"
    },
    {
     "definition": "A natural tendency to behave in a particular way.",
     "answer": "propensity"
    }
   ],
   "gre_count": 3,
   "id": 251
  },
  {
   "type": "cluster",
   "root": {
    "id": "ego",
    "root": "ego",
    "meaning": "I, self",
    "origin": "Latin"
   },
   "options": [
    "alter ego",
    "egoist",
    "egotist",
    "egotistical"
   ],
   "rounds": [
    {
     "definition": "A second self; a trusted friend or a contrasting side of one's character.",
     "answer": "alter ego"
    },
    {
     "definition": "Excessively conceited or self-absorbed.",
     "answer": "egotistical"
    },
    {
     "definition": "A person who talks about themselves constantly and boastfully.",
     "answer": "egotist"
    },
    {
     "definition": "Someone preoccupied with their own interests above everyone else's.",
     "answer": "egoist"
    }
   ],
   "gre_count": 0,
   "id": 252
  },
  {
   "id": 253,
   "quality": 2,
   "start_word": "perimeter",
   "start_definition": "The outer boundary or its length.",
   "chain": [
    "perimeter",
    "chronometer",
    "chronological",
    "philology",
    "philanthropy"
   ],
   "pivot_roots": [
    {
     "id": "metron",
     "root": "metron",
     "meaning": "measure"
    },
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    }
   ],
   "links": [
    {
     "from": "perimeter",
     "root": "metron",
     "root_display": "metron",
     "root_meaning": "measure",
     "answer": "chronometer",
     "answer_definition": "An extremely accurate timepiece.",
     "options": [
      "inveterate",
      "veteran",
      "contretemps",
      "chronometer"
     ]
    },
    {
     "from": "chronometer",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "anthropological",
      "chronological",
      "misanthropic",
      "headstrong"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "philology",
     "answer_definition": "The study of language in historical texts.",
     "options": [
      "philology",
      "dolorous",
      "pedagogy",
      "misogynous"
     ]
    },
    {
     "from": "philology",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philanthropy",
     "answer_definition": "The desire to help others, expressed especially through generous giving.",
     "options": [
      "pusillanimous",
      "annihilate",
      "philanthropy",
      "pathology"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "ponere",
    "root": "pono, positus",
    "meaning": "to place",
    "origin": "Latin"
   },
   "options": [
    "supposition",
    "posit",
    "exponent",
    "apposite"
   ],
   "rounds": [
    {
     "definition": "A person who promotes or explains an idea.",
     "answer": "exponent"
    },
    {
     "definition": "Something assumed without proof.",
     "answer": "supposition"
    },
    {
     "definition": "To put forward as a basis for argument.",
     "answer": "posit"
    },
    {
     "definition": "Strikingly appropriate.",
     "answer": "apposite"
    }
   ],
   "gre_count": 4,
   "id": 254
  },
  {
   "type": "cluster",
   "root": {
    "id": "trahere",
    "root": "traho, tractus",
    "meaning": "to drag, pull",
    "origin": "Latin"
   },
   "options": [
    "abstract",
    "protract",
    "intractable",
    "chiropractic",
    "tractable"
   ],
   "rounds": [
    {
     "definition": "Easy to control or influence; manageable.",
     "answer": "tractable"
    },
    {
     "definition": "Hard to control or deal with; stubbornly unmanageable.",
     "answer": "intractable"
    },
    {
     "definition": "To prolong or extend something beyond its usual length.",
     "answer": "protract"
    },
    {
     "definition": "Existing in thought or as an idea, not having a physical or concrete existence.",
     "answer": "abstract"
    }
   ],
   "gre_count": 2,
   "id": 255
  },
  {
   "id": 256,
   "quality": 1,
   "start_word": "synchronous",
   "start_definition": "Happening at the same time and rate.",
   "chain": [
    "synchronous",
    "chronological",
    "neurology",
    "neuralgic",
    "nostalgia"
   ],
   "pivot_roots": [
    {
     "id": "chronos",
     "root": "chronos",
     "meaning": "time"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "neuron",
     "root": "neuron",
     "meaning": "nerve"
    },
    {
     "id": "algos",
     "root": "algos",
     "meaning": "pain"
    }
   ],
   "links": [
    {
     "from": "synchronous",
     "root": "chronos",
     "root_display": "chronos",
     "root_meaning": "time",
     "answer": "chronological",
     "answer_definition": "Arranged in the order of time.",
     "options": [
      "headstrong",
      "anthropological",
      "misanthropic",
      "chronological"
     ]
    },
    {
     "from": "chronological",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "neurology",
     "answer_definition": "The branch of medicine dealing with the nervous system.",
     "options": [
      "dolorous",
      "neurology",
      "pedagogy",
      "calligraphy"
     ]
    },
    {
     "from": "neurology",
     "root": "neuron",
     "root_display": "neuron",
     "root_meaning": "nerve",
     "answer": "neuralgic",
     "answer_definition": "Relating to sharp nerve pain.",
     "options": [
      "dermatology",
      "connoisseur",
      "neuralgic",
      "cordial"
     ]
    },
    {
     "from": "neuralgic",
     "root": "algos",
     "root_display": "algos",
     "root_meaning": "pain",
     "answer": "nostalgia",
     "answer_definition": "A sentimental longing for the past.",
     "options": [
      "nostalgia",
      "preternatural",
      "biological",
      "callipygian"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "trahere",
    "root": "traho, tractus",
    "meaning": "to drag, pull",
    "origin": "Latin"
   },
   "options": [
    "tractable",
    "abstract",
    "retract",
    "chiropractic",
    "intractable"
   ],
   "rounds": [
    {
     "definition": "Existing in thought or as an idea, not having a physical or concrete existence.",
     "answer": "abstract"
    },
    {
     "definition": "Easy to control or influence; manageable.",
     "answer": "tractable"
    },
    {
     "definition": "Hard to control or deal with; stubbornly unmanageable.",
     "answer": "intractable"
    },
    {
     "definition": "To withdraw a statement as untrue or unjustified.",
     "answer": "retract"
    }
   ],
   "gre_count": 2,
   "id": 257
  },
  {
   "type": "cluster",
   "root": {
    "id": "cedere",
    "root": "cedo, cessus",
    "meaning": "to go, yield",
    "origin": "Latin"
   },
   "options": [
    "accede",
    "unprecedented",
    "pedestrian",
    "incessant",
    "concede"
   ],
   "rounds": [
    {
     "definition": "To admit or surrender something.",
     "answer": "concede"
    },
    {
     "definition": "To agree to a demand or request.",
     "answer": "accede"
    },
    {
     "definition": "Continuing without pause or interruption.",
     "answer": "incessant"
    },
    {
     "definition": "Never done or known before.",
     "answer": "unprecedented"
    }
   ],
   "gre_count": 4,
   "id": 258
  },
  {
   "id": 259,
   "quality": 1,
   "start_word": "philanthropy",
   "start_definition": "The desire to help others, expressed especially through generous giving.",
   "chain": [
    "philanthropy",
    "philology",
    "neurology",
    "neuroscience",
    "prescient"
   ],
   "pivot_roots": [
    {
     "id": "philein",
     "root": "philein",
     "meaning": "to love"
    },
    {
     "id": "logos",
     "root": "logos",
     "meaning": "word, study"
    },
    {
     "id": "neuron",
     "root": "neuron",
     "meaning": "nerve"
    },
    {
     "id": "sciens",
     "root": "sciens",
     "meaning": "knowing"
    }
   ],
   "links": [
    {
     "from": "philanthropy",
     "root": "philein",
     "root_display": "philein",
     "root_meaning": "to love",
     "answer": "philology",
     "answer_definition": "The study of language in historical texts.",
     "options": [
      "annihilate",
      "sophist",
      "sophistry",
      "philology"
     ]
    },
    {
     "from": "philology",
     "root": "logos",
     "root_display": "logos",
     "root_meaning": "word, study",
     "answer": "neurology",
     "answer_definition": "The branch of medicine dealing with the nervous system.",
     "options": [
      "neurology",
      "misogynous",
      "androgynous",
      "pedagogy"
     ]
    },
    {
     "from": "neurology",
     "root": "neuron",
     "root_display": "neuron",
     "root_meaning": "nerve",
     "answer": "neuroscience",
     "answer_definition": "The scientific study of the nervous system and brain.",
     "options": [
      "neuroscience",
      "pathology",
      "connoisseur",
      "dermatology"
     ]
    },
    {
     "from": "neuroscience",
     "root": "sciens",
     "root_display": "sciens",
     "root_meaning": "knowing",
     "answer": "prescient",
     "answer_definition": "Having knowledge of events before they happen.",
     "options": [
      "sapient",
      "incipient",
      "prescient",
      "subservient"
     ]
    }
   ],
   "gre_count": 2,
   "type": "chain"
  },
  {
   "type": "cluster",
   "root": {
    "id": "errare",
    "root": "erro",
    "meaning": "to wander",
    "origin": "Latin"
   },
   "options": [
    "erroneous",
    "aberration",
    "aberrant",
    "erratic",
    "terrestrial"
   ],
   "rounds": [
    {
     "definition": "Wrong; incorrect, based on faulty information or reasoning.",
     "answer": "erroneous"
    },
    {
     "definition": "Not consistent or regular in pattern or movement.",
     "answer": "erratic"
    },
    {
     "definition": "Departing from an accepted standard; deviating from the norm.",
     "answer": "aberrant"
    },
    {
     "definition": "A departure from what is normal, usual, or expected.",
     "answer": "aberration"
    }
   ],
   "gre_count": 4,
   "id": 260
  },
  {
   "type": "cluster",
   "root": {
    "id": "plicare",
    "root": "plico",
    "meaning": "to fold",
    "origin": "Latin"
   },
   "options": [
    "explicit",
    "supplicate",
    "duplicitous",
    "implicit",
    "policy"
   ],
   "rounds": [
    {
     "definition": "Deceitful; acting in two contradictory ways.",
     "answer": "duplicitous"
    },
    {
     "definition": "Stated clearly and in detail.",
     "answer": "explicit"
    },
    {
     "definition": "To ask humbly and earnestly.",
     "answer": "supplicate"
    },
    {
     "definition": "Implied but not directly stated.",
     "answer": "implicit"
    }
   ],
   "gre_count": 4,
   "id": 261
  },
  {
   "type": "cluster",
   "root": {
    "id": "sciens",
    "root": "sciens",
    "meaning": "knowing",
    "origin": "Latin"
   },
   "options": [
    "prescient",
    "unconscionable",
    "prescience",
    "omniscient",
    "neuroscience"
   ],
   "rounds": [
    {
     "definition": "Knowledge of events before they happen; foresight.",
     "answer": "prescience"
    },
    {
     "definition": "The scientific study of the nervous system and brain.",
     "answer": "neuroscience"
    },
    {
     "definition": "Knowing everything.",
     "answer": "omniscient"
    },
    {
     "definition": "Having knowledge of events before they happen.",
     "answer": "prescient"
    }
   ],
   "gre_count": 1,
   "id": 262
  },
  {
   "type": "cluster",
   "root": {
    "id": "fides",
    "root": "fides",
    "meaning": "faith, trust",
    "origin": "Latin"
   },
   "options": [
    "confide",
    "infidel",
    "perfidy",
    "ambidextrous",
    "diffident"
   ],
   "rounds": [
    {
     "definition": "A person who does not believe in a particular religion.",
     "answer": "infidel"
    },
    {
     "definition": "Deceitfulness; betrayal of trust.",
     "answer": "perfidy"
    },
    {
     "definition": "To tell someone a secret or private matter, trusting them.",
     "answer": "confide"
    },
    {
     "definition": "Modest or shy because of a lack of self-confidence.",
     "answer": "diffident"
    }
   ],
   "gre_count": 2,
   "id": 263
  },
  {
   "type": "cluster",
   "root": {
    "id": "turbare",
    "root": "turbo, turbatus",
    "meaning": "to disturb",
    "origin": "Latin"
   },
   "options": [
    "turbid",
    "stature",
    "perturb",
    "turbulent",
    "imperturbable"
   ],
   "rounds": [
    {
     "definition": "Cloudy or opaque, especially from disturbed sediment; also, confused.",
     "answer": "turbid"
    },
    {
     "definition": "Unable to be upset or excited; calm.",
     "answer": "imperturbable"
    },
    {
     "definition": "Characterized by conflict, disorder, or confusion.",
     "answer": "turbulent"
    },
    {
     "definition": "To make someone anxious or unsettled.",
     "answer": "perturb"
    }
   ],
   "gre_count": 2,
   "id": 264
  },
  {
   "type": "cluster",
   "root": {
    "id": "polys",
    "root": "polys",
    "meaning": "many",
    "origin": "Greek"
   },
   "options": [
    "anthropological",
    "polyandrous",
    "polymath",
    "polyglot",
    "polygyny"
   ],
   "rounds": [
    {
     "definition": "Knowing or using several languages.",
     "answer": "polyglot"
    },
    {
     "definition": "A person of wide-ranging knowledge or learning.",
     "answer": "polymath"
    },
    {
     "definition": "Having more than one husband at a time.",
     "answer": "polyandrous"
    },
    {
     "definition": "The custom of one man having several wives.",
     "answer": "polygyny"
    }
   ],
   "gre_count": 0,
   "id": 265
  },
  {
   "type": "cluster",
   "root": {
    "id": "monos",
    "root": "monos",
    "meaning": "one",
    "origin": "Greek"
   },
   "options": [
    "monocle",
    "monotonous",
    "monogram",
    "monolith",
    "monogamous"
   ],
   "rounds": [
    {
     "definition": "Dull and repetitive; lacking variety.",
     "answer": "monotonous"
    },
    {
     "definition": "A design combining a person's initials.",
     "answer": "monogram"
    },
    {
     "definition": "A large single upright block of stone; also, a large, unified, and unchanging organization.",
     "answer": "monolith"
    },
    {
     "definition": "Having only one spouse or partner at a time.",
     "answer": "monogamous"
    }
   ],
   "gre_count": 1,
   "id": 266
  },
  {
   "type": "cluster",
   "root": {
    "id": "cadere",
    "root": "cado, casus",
    "meaning": "to fall",
    "origin": "Latin"
   },
   "options": [
    "placid",
    "incidental",
    "decadent",
    "recidivism",
    "coincide"
   ],
   "rounds": [
    {
     "definition": "The tendency of a convicted criminal to reoffend.",
     "answer": "recidivism"
    },
    {
     "definition": "Marked by excessive self-indulgence and moral decline.",
     "answer": "decadent"
    },
    {
     "definition": "Occurring as a minor accompaniment to something else.",
     "answer": "incidental"
    },
    {
     "definition": "To occur at the same time, or to be in agreement.",
     "answer": "coincide"
    }
   ],
   "gre_count": 2,
   "id": 267
  }
 ]
};
