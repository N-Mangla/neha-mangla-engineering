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
        A day off looked straightforward until I considered what happens when
        a date-only record is treated like a timestamp. In a scheduling UI,
        that small distinction can put an event on the wrong day.
      </p>
      <p>
        I worked on a workforce calendar using React, TypeScript, and Bryntum.
        It combined shifts, absences, overtime, and days off from separate
        services. They looked similar in the calendar, but their date handling
        and visibility rules were not interchangeable.
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
        <figcaption>Where service-specific data stops and calendar rendering begins</figcaption>
        <div className="article-transform__inputs">
          <div><span>SERVICE CONTRACTS</span><strong>Shifts · overtime</strong><code>Identifiers and time fields</code></div>
          <div><span>SERVICE CONTRACTS</span><strong>Absences · days off</strong><code>Categories and visibility rules</code></div>
        </div>
        <div className="article-transform__arrow" aria-hidden="true">↓</div>
        <div className="article-transform__model"><strong>Typed application event model</strong><span>Stable identity · date handling · categories · permission metadata</span></div>
        <div className="article-transform__arrow" aria-hidden="true">↓</div>
        <div className="article-transform__outputs">
          <div><strong>Product rules</strong><span>Normalized events and consistent access rules</span></div>
          <div><strong>View adapters</strong><span>Day · week · month · team</span></div>
        </div>
        <div className="article-transform__footer">Bryntum: event layout, interactions, and presentation</div>
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
      <figure className="article-range-flow">
        <figcaption>Example: moving across weeks, then returning</figcaption>
        <div className="article-range-flow__steps">
          <div><span>01</span><strong>Week 42</strong><small>Load the visible range</small></div>
          <div><span>02</span><strong>Week 43</strong><small>Navigate forward</small></div>
          <div><span>03</span><strong>Week 42</strong><small>Reuse cached results; revalidate</small></div>
        </div>
      </figure>
      <p>
        We reused loaded ranges, debounced quick navigation, and refreshed in the
        background when needed. The selected date and view could be restored,
        but the schedule itself still needed revalidation. Another important
        check was ensuring a late response from an earlier range could not
        overwrite the one currently on screen.
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
        I&apos;d make that same separation again. A calendar library is useful for
        rendering and interaction, but I don&apos;t want its configuration to
        become the place where service contracts, business dates, and privacy
        rules are interpreted. Those decisions are easier to maintain and
        test when the application owns them.
      </p>
      <p className="article-note">
        Examples are simplified to explain the approach. They do not reproduce
        employer source code or internal service contracts.
      </p>
    </article>
  );
}
