const dateExample = `type CalendarRecord =
  | { kind: "dayOff"; date: string }
  | { kind: "shift"; startsAt: string };

function toCalendarEvent(record: CalendarRecord) {
  if (record.kind === "dayOff") {
    // Keep the calendar date as a date, not a UTC timestamp.
    return { kind: "dayOff", calendarDate: record.date };
  }

  // A timestamp represents an instant; localize at display time.
  return { kind: "shift", startsAt: record.startsAt };
}`;

export function SchedulingArticle() {
  return (
    <article className="article-body article-body--focused">
      <p className="article-lead">
        On screen, a shift and a day off are both calendar events. In code,
        treating them as the same kind of date can quietly put one of them
        on the wrong day.
      </p>
      <p>
        I worked on a workforce calendar built with React, TypeScript, and
        Bryntum. Shifts, absences, overtime, and days off came from different
        services, with different rules for dates and visibility. The difficult
        part was getting those rules to agree before anything was rendered.
      </p>

      <h2 id="dates">A day off that moves to yesterday</h2>
      <p>
        Take a day-off record with the value <code>2026-10-23</code>. Parsing
        that string as midnight UTC and displaying it in Los Angeles can
        produce October 22. The browser has converted an instant correctly;
        the mistake is that a day off was never meant to be an instant.
      </p>
      <div className="article-result" role="group" aria-label="Date interpretation example">
        <div><span className="article-result__eyebrow">Input</span><strong>2026-10-23</strong><small>Date-only day off</small></div>
        <div><span className="article-result__eyebrow">Incorrect interpretation</span><strong>Oct 22</strong><small>UTC midnight formatted in Los Angeles</small></div>
        <div><span className="article-result__eyebrow">Expected result</span><strong>Oct 23</strong><small>Preserve the intended calendar day</small></div>
      </div>
      <p>
        A shift timestamp is different: it represents a moment that may be
        displayed at different local times. We kept those two paths separate.
        Here&apos;s a reduced TypeScript illustration of that boundary:
      </p>
      <div className="article-code">
        <div className="article-code__header"><span>TypeScript · illustrative model</span><span>Not production source</span></div>
        <pre><code>{dateExample}</code></pre>
      </div>
      <p>
        The important choice is that the date-only branch does not call
        <code>new Date()</code> or silently apply timezone conversion.
        In a real application, the downstream rendering adapter also needs
        to preserve that meaning. I would test the same record across timezones
        and calendar views, not just test the conversion function in isolation.
      </p>

      <h2 id="boundary">The boundary before Bryntum</h2>
      <p>
        The services weren&apos;t returning one shared event format. I introduced
        an application event model so that IDs, categories, date handling,
        and permission metadata had a consistent shape. Bryntum received
        the normalized result, rather than needing to understand every service.
      </p>
      <figure className="article-transform">
        <figcaption>Two different records, one deliberate rendering boundary</figcaption>
        <div className="article-transform__inputs">
          <div><span>DATE-ONLY SOURCE</span><strong>Day off</strong><code>date: "2026-10-23"</code></div>
          <div><span>TIMED SOURCE</span><strong>Shift</strong><code>startsAt: "...09:00Z"</code></div>
        </div>
        <div className="article-transform__arrow" aria-hidden="true">↓</div>
        <div className="article-transform__model"><strong>Application event model</strong><span>Identity · record kind · permissions · date semantics</span></div>
        <div className="article-transform__arrow" aria-hidden="true">↓</div>
        <div className="article-transform__outputs">
          <div><strong>Calendar date stays fixed</strong><span>Day off remains October 23</span></div>
          <div><strong>Timestamp uses timezone</strong><span>Shift time is localized for display</span></div>
        </div>
        <div className="article-transform__footer">Bryntum handles calendar interaction and rendering</div>
      </figure>
      <p>
        That mapping layer was another thing to maintain and test, but it
        stopped service contracts and view-specific rendering details from
        becoming tangled together. Permission rules also had to remain
        consistent in day, week, month, and team views.
      </p>

      <h2 id="navigation">A responsive calendar still needs fresh data</h2>
      <p>
        Calendar navigation creates an awkward balance. People move between
        weeks and return to ranges they recently viewed. Fetching everything
        again makes the UI feel slow; never refreshing cached results can
        leave an old schedule on screen.
      </p>
      <div className="article-choices">
        <div><span>KEEP THE CONTEXT</span><strong>Selected date and view</strong><p>Restore where someone was working.</p></div>
        <div><span>REUSE, THEN REVALIDATE</span><strong>Visible-range events</strong><p>Show useful cached data while checking whether the schedule changed.</p></div>
      </div>
      <p>
        We used range-based reuse, debounced rapid navigation, and background
        refreshes. The visible range needed a stable identity, and a late
        response from an older navigation couldn&apos;t be allowed to replace
        the current view. This was a data-lifecycle decision, not just a
        loading-spinner optimization.
      </p>

      <h2 id="verification">What I checked beyond the happy path</h2>
      <p>
        A populated calendar isn&apos;t proof that its data is right.
        The cases worth checking were the quiet failures: date-only records
        shifting days, confidential absence details showing in another view,
        cached ranges not refreshing, and an old request returning after the
        user had navigated somewhere else.
      </p>
      <p>
        If I were building this again, I&apos;d keep the same separation:
        the application decides what an event means and who may see it;
        the calendar library handles interaction and presentation.
      </p>
      <p className="article-note">
        Examples are simplified to explain the approach. They do not reproduce
        employer source code or internal service contracts.
      </p>
    </article>
  );
}
