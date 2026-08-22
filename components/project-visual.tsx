import type { ProjectVisual as ProjectVisualType } from "@/data/projects";

interface ProjectVisualProps {
  readonly type: ProjectVisualType;
}

const days = ["MON 12", "TUE 13", "WED 14", "THU 15", "FRI 16"];

function CalendarVisual() {
  return (
    <div className="product-window calendar-window">
      <div className="product-window__bar">
        <span />
        <span />
        <span />
        <b>My schedule</b>
      </div>
      <div className="calendar-toolbar">
        <strong>May 12 – 16</strong>
        <div>
          <span>Day</span>
          <span className="is-active">Week</span>
          <span>Month</span>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-grid__times">
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
        </div>
        {days.map((day, index) => (
          <div className="calendar-day" key={day}>
            <strong>{day}</strong>
            {index !== 3 ? (
              <span
                className={`calendar-event calendar-event--${(index % 3) + 1}`}
                style={{
                  height: index === 1 ? "42%" : "50%",
                  marginTop: index === 2 ? "32%" : "18%",
                }}
              >
                {index === 2 ? "Training" : "08:30 · Shift"}
              </span>
            ) : (
              <span className="calendar-dayoff">Day off</span>
            )}
          </div>
        ))}
      </div>
      <div className="floating-chip floating-chip--calendar">
        <span /> Time zone aware
      </div>
    </div>
  );
}

function ImportVisual() {
  return (
    <div className="product-window import-window">
      <div className="product-window__bar">
        <span />
        <span />
        <span />
        <b>Import custom metrics</b>
      </div>
      <div className="import-progress">
        <div className="is-complete"><span>1</span> Upload</div>
        <i />
        <div className="is-complete"><span>2</span> Preview</div>
        <i />
        <div className="is-complete"><span>3</span> Map</div>
        <i />
        <div className="is-current"><span>4</span> Execute</div>
      </div>
      <div className="import-panel">
        <div className="file-icon">CSV</div>
        <div className="import-panel__copy">
          <strong>performance_metrics_may.csv</strong>
          <span>2,480 rows · 1.8 MB</span>
        </div>
        <span className="status-pill">Processing</span>
      </div>
      <div className="progress-track"><span /></div>
      <div className="import-stats">
        <div><span>Processed</span><strong>1,984</strong></div>
        <div><span>Successful</span><strong>1,962</strong></div>
        <div><span>Needs review</span><strong>22</strong></div>
      </div>
      <div className="floating-chip floating-chip--import">
        <span /> Safe to leave this page
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [48, 66, 58, 78, 72, 88, 82];

  return (
    <div className="product-window analytics-window">
      <div className="product-window__bar">
        <span />
        <span />
        <span />
        <b>Coaching effectiveness</b>
      </div>
      <div className="analytics-filters">
        <span>Past 3 days⌄</span>
        <span>Quality score⌄</span>
      </div>
      <div className="metric-row">
        <div><span>Previous KPI</span><strong>78.6</strong></div>
        <div><span>Current KPI</span><strong>84.2</strong></div>
        <div><span>Improvement</span><strong className="positive">+7.1%</strong></div>
      </div>
      <div className="chart-area">
        <div className="chart-bars">
          {bars.map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M0,120 C60,112 70,82 135,92 S220,68 275,78 S355,42 410,52 S465,24 500,28" />
        </svg>
        <div className="chart-labels">
          <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
        </div>
      </div>
      <div className="floating-chip floating-chip--analytics">
        <span>↗</span> 8.6 pts after coaching
      </div>
    </div>
  );
}

export function ProjectVisual({ type }: ProjectVisualProps) {
  switch (type) {
    case "calendar":
      return <CalendarVisual />;
    case "import":
      return <ImportVisual />;
    case "analytics":
      return <AnalyticsVisual />;
    default: {
      const exhaustiveCheck: never = type;
      return exhaustiveCheck;
    }
  }
}
