export function HeroSystem() {
  return (
    <div className="hero-system" aria-hidden="true">
      <div className="hero-system__orbit hero-system__orbit--one" />
      <div className="hero-system__orbit hero-system__orbit--two" />

      <div className="hero-system__core">
        <span>PRODUCT</span>
        <strong>CLARITY</strong>
        <i />
      </div>

      <div className="hero-panel hero-panel--calendar">
        <div className="hero-panel__bar">
          <span /> <span /> <span />
          <b>Schedule</b>
        </div>
        <div className="mini-calendar">
          <div>
            <span>MON</span>
            <i className="mini-event mini-event--blue" />
          </div>
          <div>
            <span>TUE</span>
            <i className="mini-event mini-event--cyan" />
          </div>
          <div>
            <span>WED</span>
            <i className="mini-event mini-event--lime" />
          </div>
          <div>
            <span>THU</span>
            <i className="mini-event mini-event--short" />
          </div>
        </div>
        <p>
          <span /> Time-zone aligned
        </p>
      </div>

      <div className="hero-panel hero-panel--import">
        <div className="mini-import__head">
          <span>CSV</span>
          <div>
            <strong>2,480 rows</strong>
            <small>Processing safely</small>
          </div>
          <b>76%</b>
        </div>
        <div className="mini-progress">
          <span />
        </div>
        <div className="mini-import__states">
          <span>Validated</span>
          <i />
          <span>Processing</span>
          <i />
          <span>Complete</span>
        </div>
      </div>

      <div className="hero-panel hero-panel--metric">
        <span>IMPROVEMENT</span>
        <strong>+12.4%</strong>
        <div className="mini-chart">
          {[28, 42, 36, 58, 52, 75, 68].map((height, index) => (
            <i key={index} style={{ height: height + "%" }} />
          ))}
        </div>
      </div>

      <div className="hero-system__label hero-system__label--api">
        <span /> API state
      </div>
      <div className="hero-system__label hero-system__label--roles">
        <span /> Role aware
      </div>
    </div>
  );
}
