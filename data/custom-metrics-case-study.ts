export const customMetricsCaseStudy = {
  eyebrow: "Case study 02 · Enterprise performance data",
  title:
    "Engineering a custom metrics import that stayed reliable after upload.",
  lead:
    "I designed and delivered the Custom Metrics workflow across file preparation, validation, schema mapping, asynchronous execution, recovery, and KPI reporting.",
  facts: [
    { label: "Role", value: "Senior Full Stack Engineer" },
    {
      label: "Ownership",
      value: "Workflow architecture through production support",
    },
    {
      label: "Processing contract",
      value: "CSV files up to 10 MB, processed in 100 record chunks",
    },
    {
      label: "System path",
      value: "React, TypeScript, REST APIs, SQS, InfluxDB, Vitest",
    },
  ],
  premise: {
    title:
      "A four step interface had to remain coherent across validation, queue processing, storage, recovery, and reporting.",
    userClock: {
      label: "The user clock",
      title: "Seconds to understand and act",
      body:
        "Users needed clear templates, early validation, a fast preview, confident mapping, and an honest explanation of what would happen next.",
    },
    systemClock: {
      label: "The system clock",
      title: "Processing continued beyond the browser request",
      body:
        "Validation, queueing, chunked processing, storage, and result aggregation continued after the browser request had finished.",
    },
    ownership:
      "I defined the workflow rules, state transitions, API expectations, polling and cleanup behaviour, recovery paths, and verification strategy. I aligned Product, Design, backend, data, and QA around one lifecycle contract so the interface never implied certainty the system did not yet have.",
  },
  workflow: [
    {
      number: "01",
      label: "Upload",
      title: "Define the contract before accepting data",
      body:
        "The user downloads the correct template, reviews the field specification, acknowledges the requirements, selects the destination metric, and uploads a CSV up to 10 MB. Invalid structure or format stops the journey before preview.",
      details: ["Template and specification", "Metric identity and CSV gate"],
      visual: "upload",
    },
    {
      number: "02",
      label: "Preview",
      title: "Show enough evidence without rendering the dataset",
      body:
        "Row and column totals establish scale while the first three records let users verify headers, values, and structure without making the interface carry the full file.",
      details: ["Row and column totals", "First three rows for confirmation"],
      visual: "preview",
    },
    {
      number: "03",
      label: "Mapping",
      title: "Preserve meaning across two schemas",
      body:
        "Required system fields are paired with CSV columns using sample values from the file. Execution remains unavailable until every mandatory mapping is complete.",
      details: ["Required field coverage", "Sample values beside each mapping"],
      visual: "mapping",
    },
    {
      number: "04",
      label: "Execute",
      title: "Hand off the work without losing the user",
      body:
        "The import enters the queue, reports its lifecycle, and resolves into processed, successful, and failed totals with duration, error recovery, another import action, and KPI dashboard navigation.",
      details: ["Recoverable queued status", "Row level results and next actions"],
      visual: "execute",
    },
  ],
  system: {
    eyebrow: "Behind Execute",
    title: "One click crossed six system boundaries.",
    body:
      "The interface stayed anchored to one import identity while responsibility moved from synchronous validation to asynchronous processing and back to a user-facing result.",
    pipeline: [
      {
        number: "01",
        label: "Browser",
        body: "File rules and required mappings",
      },
      {
        number: "02",
        label: "Import API",
        body: "Request validation and import identity",
      },
      {
        number: "03",
        label: "SQS",
        body: "Durable queue handoff",
      },
      {
        number: "04",
        label: "Worker",
        body: "Validated chunks of 100 records",
      },
      {
        number: "05",
        label: "InfluxDB",
        body: "Accepted metric data",
      },
      {
        number: "06",
        label: "Reporting API",
        body: "Accepted metrics returned to the KPI dashboard",
      },
    ],
    states: [
      { label: "Queued", tone: "waiting" },
      { label: "Processing", tone: "active" },
      { label: "Completed", tone: "success" },
      { label: "Partially failed", tone: "partial" },
      { label: "Failed", tone: "failure" },
    ],
  },
  recovery: [
    {
      number: "01",
      moment: "Before the queue",
      title: "Stop preventable errors early",
      situation:
        "A structurally valid file could still target the wrong metric or omit a required business field.",
      direction:
        "I treated specification acknowledgement, metric selection, file validation, and required mapping as product gates rather than advisory messages.",
      outcome:
        "Only data with a complete, explicit contract could reach execution.",
    },
    {
      number: "02",
      moment: "During processing",
      title: "Let users leave without losing the import",
      situation:
        "Refreshing or navigating away could interrupt polling even though accepted work continued in the backend.",
      direction:
        "I separated client request cleanup from backend execution, anchored status to the import identity, and restored active or completed work from the Custom Metrics list.",
      outcome:
        "Users could return to the latest status, results, and error report without restarting the workflow.",
    },
    {
      number: "03",
      moment: "After processing",
      title: "Make partial failure a useful result",
      situation:
        "Some rows could succeed while others failed validation, making a binary success or failure message misleading.",
      direction:
        "I presented total, successful, and failed counts together with duration, a downloadable row level error report, and distinct next actions.",
      outcome:
        "Successful records remained usable while rejected rows became specific, correctable work.",
    },
  ],
  verification: [
    {
      label: "Contract gates",
      body:
        "Specification acknowledgement, metric selection, file limits, preview readiness, and mandatory mappings.",
    },
    {
      label: "Lifecycle states",
      body:
        "Queued, processing, completed, failed, and partially failed behaviour with polling and cleanup.",
    },
    {
      label: "Recovery and release",
      body:
        "Refresh, result restoration, error reports, release validation, and targeted production fixes.",
    },
  ],
  tradeoff:
    "Preserving successful rows made the result model more complex than all or nothing processing, but kept valid data usable and turned rejected rows into specific, correctable work.",
  outcomes: [
    {
      value: "Recoverable progress",
      label: "status and results remained available after refresh or return",
    },
    {
      value: "Actionable errors",
      label: "rejected rows could be corrected from a detailed report",
    },
    {
      value: "Connected insights",
      label: "successful metrics flowed into the existing KPI experience",
    },
    {
      value: "Durable identity",
      label: "one import record connected queue progress, results, and return visits",
    },
  ],
  reflection: {
    title:
      "The durable unit was the import, not the browser session.",
    body:
      "That decision kept progress, recovery, and partial results coherent while work moved through the API, queue, worker, storage, and reporting system.",
  },
} as const;
