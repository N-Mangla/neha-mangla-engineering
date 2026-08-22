export const calendarCaseStudy = {
  eyebrow: "Case study 01 · Enterprise workforce scheduling",
  title: "Engineering a workforce calendar where every date had to be right.",
  lead:
    "I set the technical direction for MyTime+, unifying multiple service contracts, scheduling rules, permissions, and time zone behaviour behind one reliable workforce calendar.",
  facts: [
    { label: "Role", value: "Senior Full Stack Engineer" },
    {
      label: "Ownership",
      value: "Event model, data loading, privacy, and release quality",
    },
    { label: "Product surface", value: "Day, week, month, and team calendars" },
    { label: "Stack", value: "React, TypeScript, React Query, Bryntum, Vitest" },
  ],
  brief: {
    title:
      "The calendar was the interface. The real work was making every system agree.",
    assignment: [
      "Employees and managers needed one trustworthy view of shifts, overtime, absences, days off, and categories across day, week, month, and team views. Those records came from different services, followed different date rules, and exposed different information by role.",
      "A calendar could look correct while showing the wrong day, revealing confidential details, or serving stale data. Reliability depended on resolving those rules before anything reached the interface.",
    ],
    responsibility: [
      "I owned the technical direction before implementation began. I defined the application event model, loading and refresh behaviour, view rules, permission boundaries, and verification strategy that governed how service data entered the calendar.",
      "I aligned Product, Design, service teams, and vendor support around those boundaries before implementation, giving the team shared decisions to build and validate against.",
    ],
  },
  constraints: [
    {
      number: "01",
      title: "Different contracts had to preserve one meaning",
      body:
        "Shifts, overtime, absences, days off, and categories arrived with different identifiers, structures, and business rules.",
    },
    {
      number: "02",
      title: "A date was not always a timestamp",
      body:
        "Timed work followed the user time zone. Date only records had to remain on the calendar day the business intended.",
    },
    {
      number: "03",
      title: "Privacy could not depend on the view",
      body:
        "Confidential absence details had to remain protected across day, week, month, and team rendering paths.",
    },
    {
      number: "04",
      title: "Freshness could not cost continuity",
      body:
        "Schedule changes needed to appear promptly without duplicate range requests, blocking loaders, or navigation that discarded useful data.",
    },
  ],
  architecture: {
    title: "Raw service data never reached the calendar.",
    body:
      "I introduced an application event model between the service APIs and Bryntum. It normalised business meaning before rendering, gave product rules one testable boundary, and kept vendor behaviour isolated from the rest of the application.",
    stages: [
      {
        number: "01",
        label: "Services",
        title: "Resolve source contracts",
        body:
          "Schedules, categories, visible ranges, permissions, and time zones entered through explicit service boundaries.",
      },
      {
        number: "02",
        label: "Domain",
        title: "Normalise product meaning",
        body:
          "Records became stable events with preserved dates, converted times, categories, and privacy metadata.",
      },
      {
        number: "03",
        label: "State",
        title: "Preserve state continuity",
        body:
          "Range reuse, persisted context, debounced navigation, and background refreshes kept the experience responsive.",
      },
      {
        number: "04",
        label: "Experience",
        title: "Adapt each view",
        body:
          "Day, week, month, and team views received explicit behaviour instead of scattered conditions.",
      },
    ],
  },
  decisions: [
    {
      number: "01",
      title: "Own the event model",
      risk:
        "Raw API records would couple service contracts, product rules, and vendor configuration across every view.",
      decision:
        "I introduced a typed transformation boundary that converted each service response into a stable application event model. Only approved fields and product semantics were allowed to reach Bryntum.",
      tradeoff:
        "The boundary introduced one translation layer to maintain, but contained service contract changes and kept calendar library details out of product logic.",
      result:
        "Service changes were absorbed at one boundary, product rules became independently testable, and Bryntum remained a rendering detail.",
    },
    {
      number: "02",
      title: "Separate business dates from timestamps",
      risk:
        "Normal time zone conversion could move a day off to the wrong date. View specific rendering could also expose confidential absence details.",
      decision:
        "I separated calendar day records from timestamped work, converted only values that represented instants, and carried privacy metadata through the shared event model.",
      tradeoff:
        "Separate date paths added model complexity, but removed the risk of silent date movement and inconsistent privacy behaviour.",
      result:
        "Business dates stayed fixed across time zones and confidential absence details remained masked in all four views.",
    },
    {
      number: "03",
      title: "Cache for continuity, refresh for truth",
      risk:
        "Repeated range requests slowed navigation, while blocking refreshes interrupted users who already had useful schedule data.",
      decision:
        "I keyed data by visible range, reused cached results, debounced rapid navigation, and separated initial loading from background refresh before committing updates through one controlled path.",
      tradeoff:
        "Cached ranges could briefly trail the service, so background refresh and explicit reload paths balanced continuity with freshness.",
      result:
        "The approach reduced redundant API requests by approximately 80 percent while keeping navigation responsive and schedules current.",
    },
  ],
  journey: [
    {
      number: "01",
      title: "Govern the boundary",
      detail: "Application event model, date semantics, and privacy rules",
    },
    {
      number: "02",
      title: "Verify risky behaviour",
      detail: "A test matrix for time zones, loading, permissions, and failures",
    },
    {
      number: "03",
      title: "Harden the release",
      detail: "Release criteria, production validation, and targeted fixes",
    },
  ],
  resilience: [
    {
      title: "Failure isolation",
      body:
        "I isolated service failures with guarded fallbacks and a calendar error boundary so one dependency could not take down the surrounding product experience.",
    },
    {
      title: "State continuity",
      body:
        "Selected date, view context, and useful events remained intact across normal lifecycle changes, reducing unnecessary restarts and reloads.",
    },
    {
      title: "Release and support",
      body:
        "I coordinated release checks, vendor follow ups, post release validation, and targeted production fixes until the capability was stable.",
    },
  ],
  testing: [
    {
      title: "Domain behaviour",
      body: "Automated tests covered event types, stable identifiers, categories, overtime, absences, days off, privacy metadata, and safe fallbacks.",
    },
    {
      title: "Time and loading boundaries",
      body: "Tests exercised time zone conversion, business dates, cache reuse, forced refresh, empty ranges, service failures, and unmounting.",
    },
    {
      title: "Critical flow coverage",
      body: "More than 90 percent automated coverage across critical flows, reviewed for correctness, performance, privacy, and edge cases.",
    },
  ],
  outcomes: [
    {
      value: "≈80%",
      label: "fewer redundant range requests in pre-cache versus cached navigation tests",
    },
    {
      value: "90%+",
      label: "coverage across the critical calendar behaviour suite",
    },
    {
      value: "Correct dates",
      label: "business dates remained accurate across time zones",
    },
    {
      value: "Protected privacy",
      label: "confidential absence details remained consistently masked",
    },
  ],
  reflection: {
    title: "The event model became the product boundary.",
    body:
      "Services could change and calendar views could vary, while date, privacy, and loading rules still had one governed place.",
  },
} as const;
