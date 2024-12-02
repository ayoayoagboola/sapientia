const synopsisLabels = ["Tense", "Active", "Passive"];

export const synopsis = {
  // to map through whenever a synopsis chart is requested
  charts: {
    indicative: {
      mood: "Indicative",
      labels: synopsisLabels,
      rows: [
        "Present",
        "Imperfect",
        "Future",
        "Perfect",
        "Pluperfect",
        "Future Perfect",
      ],
    },
    subjunctive: {
      mood: "Subjunctive",
      labels: synopsisLabels,
      rows: ["Present", "Imperfect", "Perfect", "Pluperfect"],
    },
    participles: {
      mood: "Participles",
      labels: synopsisLabels,
      rows: ["Present", "Perfect", "Future"],
    },
    infinitives: {
      mood: "Infinitives",
      labels: synopsisLabels,
      rows: ["Present", "Perfect", "Future"],
    },
    imperatives: {
      mood: "Imperatives",
      labels: synopsisLabels,
      rows: ["Singular", "Plural"],
    },
  },
};
