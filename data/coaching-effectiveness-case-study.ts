export const coachingEffectivenessCaseStudy = {
  eyebrow: "Case study 03 · Performance analytics",
  title:
    "Engineering a clear view of performance after coaching.",
  lead:
    "I led the full stack delivery of Coaching Effectiveness, defining how filters, KPI calculations, aggregation rules, API responses, and chart behaviour worked as one analytical contract.",
  facts: [
    { label: "Role", value: "Senior Full Stack Engineer" },
    {
      label: "Ownership",
      value: "Technical direction across backend, analytical contracts, and interface delivery",
    },
    {
      label: "Decision",
      value: "How did KPI performance move after coaching?",
    },
    {
      label: "Stack",
      value: "React, TypeScript, ApexCharts, Python, Django Ninja, PostgreSQL",
    },
  ],
  premise: {
    title:
      "Coaching effectiveness required a consistent comparison contract across calculations, APIs, filters, and charts.",
    body:
      "The experience shows observed KPI movement in context; it does not treat correlation as proof that coaching caused the change. Time context, calculation rules, and incomplete evidence remain consistent across the API and interface.",
    questions: [
      {
        number: "01",
        title: "What moved?",
        body: "Compare KPI performance before and after the selected coaching context while keeping both values visible.",
      },
      {
        number: "02",
        title: "By how much?",
        body: "Express movement without hiding the baseline or confusing points with percentages.",
      },
      {
        number: "03",
        title: "Over which period?",
        body: "Keep the comparison legible as the view moves between daily, weekly, and monthly evidence.",
      },
    ],
  },
  evidence: {
    eyebrow: "The comparison contract",
    title: "One answer needed three values and several conditions.",
    body:
      "I defined the metric contract before designing the chart so the summary cards, series, tooltips, and backend response could not disagree about what improvement meant.",
    values: [
      {
        label: "Baseline",
        value: "Previous KPI",
        body: "The reference value that gives the change meaning.",
      },
      {
        label: "Current",
        value: "New KPI",
        body: "The result for the selected comparison window.",
      },
      {
        label: "Improvement",
        value: "Relative change",
        body: "The percentage movement calculated from the same two values.",
      },
    ],
    formula: "((New KPI − Previous KPI) ÷ Previous KPI) × 100",
    guardrail:
      "When the baseline is missing or zero, the product must not manufacture a percentage. It should explain that the comparison cannot be calculated.",
  },
  surface: {
    title: "The interface made context, comparison, and time grain visible together.",
    body:
      "The reading order was deliberate: choose the coaching context, see the headline evidence, then inspect how the result changed over time.",
    filters: [
      {
        label: "Path",
        body: "Choose the coaching journey or population being evaluated.",
      },
      {
        label: "KPI",
        body: "Choose the performance measure that defines success.",
      },
      {
        label: "Period",
        body: "Start with a useful default while keeping the comparison configurable.",
      },
    ],
  },
  aggregation: [
    {
      label: "Daily",
      title: "Keep individual dates visible",
      body:
        "Useful for short windows where each day carries enough context to stand alone.",
      example: "14 Aug",
    },
    {
      label: "Weekly",
      title: "Show the range, not only a week number",
      body:
        "The tooltip names the start and end dates so an aggregated point remains traceable.",
      example: "11 Aug to 17 Aug",
    },
    {
      label: "Monthly",
      title: "Reduce noise without losing direction",
      body:
        "Longer windows group evidence into a stable trend while preserving the selected KPI meaning.",
      example: "August 2026",
    },
  ],
  contract: {
    title: "The interface and service shared one decision contract.",
    body:
      "I governed both sides of the boundary so filters, calculations, grouping, and incomplete states remained consistent from PostgreSQL to the rendered chart.",
    rows: [
      {
        question: "Which evidence is being compared?",
        interface:
          "Make Path, KPI, and period explicit, with stable defaults and clear selected state.",
        service:
          "Validate the request and return one comparison contract for the selected context.",
      },
      {
        question: "How should time be grouped?",
        interface:
          "Render daily, weekly, and monthly labels without changing the meaning of a point.",
        service:
          "Aggregate at the requested grain and return the boundaries required by labels and tooltips.",
      },
      {
        question: "How is improvement interpreted?",
        interface:
          "Show KPI value and percentage movement together, each with explicit units.",
        service:
          "Apply the same baseline and current formula and return a clear unavailable state when the calculation is not valid.",
      },
      {
        question: "What if evidence is incomplete?",
        interface:
          "Distinguish no result, insufficient comparison data, and a genuine zero.",
        service:
          "Preserve missing values instead of converting absence into a misleading result.",
      },
    ],
    tradeoff:
      "Keeping aggregation and comparison logic in the service made the API contract more explicit and the query layer more complex, but prevented different clients from calculating different answers.",
  },
  truthConditions: [
    {
      number: "01",
      title: "Observed movement is not proof of causation",
      body:
        "The dashboard presents a before and after comparison. It does not claim that coaching alone produced the change.",
    },
    {
      number: "02",
      title: "Percentage movement is not a point difference",
      body:
        "The two axes keep KPI values and relative percentage movement connected without presenting them as the same unit.",
    },
    {
      number: "03",
      title: "No evidence is not zero performance",
      body:
        "An unavailable baseline, an empty result, and a failed service response remain distinct instead of collapsing into a misleading zero.",
    },
  ],
  verification: [
    "Default Path, KPI, and period behaviour",
    "Positive, negative, zero, and unavailable comparisons",
    "Daily, weekly, and monthly grouping",
    "Tooltip context plus loading, empty, and failed responses",
  ],
  outcomes: [
    {
      value: "Explainable movement",
      label: "the result, its baseline, and the calculation stayed visible together",
    },
    {
      value: "Consistent meaning",
      label: "summary cards, chart series, tooltips, and APIs followed one contract",
    },
    {
      value: "Flexible time context",
      label: "daily, weekly, and monthly views stayed interpretable",
    },
    {
      value: "Honest attribution",
      label: "the experience showed observed change without overstating what the data could prove",
    },
  ],
  reflection: {
    title:
      "A chart is only as trustworthy as the comparison contract behind it.",
    body:
      "Making units, time grain, missing evidence, and attribution explicit mattered more than choosing the visualization.",
  },
} as const;
