export function SchedulingArticle() {
  return (
    <div className="article-body">
      <p className="article-lead">
        A calendar brings together records that look similar on screen but follow
        different rules. A shift has a start and end time. A day off refers to
        a date. An absence may be visible to a manager without exposing every
        detail. Treating them as interchangeable events is where the trouble starts.
      </p>
      <p>
        On a workforce scheduling project built with React, TypeScript, and Bryntum,
        we had shifts, overtime, absences, and days off arriving through different
        services. The same information also had to behave consistently in day,
        week, month, and team views.
      </p>
      <p>
        I wanted those differences resolved in application code rather than relying
        on each calendar view to interpret them.
      </p>

      <h2 id="event-model">The calendar should not interpret every service response</h2>
      <p>
        Shifts, overtime, and absences do not necessarily share a data contract.
        They may have different identifiers, date fields, and visibility rules.
        Passing each response straight into a calendar library makes those
        differences the rendering layer&apos;s problem. It also spreads product
        decisions across view configuration and event handlers.
      </p>
      <p>
        I used an application event model between the service APIs and the
        calendar. Each source was translated into events with consistent identity,
        date meaning, category, and permission metadata. The calendar consumed
        the result, rather than needing to understand the original service.
      </p>

      <figure className="article-diagram">
        <figcaption>One boundary for product rules before rendering</figcaption>
        <div className="article-diagram__sources">
          <span>Schedules</span><span>Absences</span><span>Overtime</span>
        </div>
        <div className="article-diagram__arrow" aria-hidden="true">↓</div>
        <div className="article-diagram__core">Typed application event model
          <small>identity · date semantics · permissions</small>
        </div>
        <div className="article-diagram__arrow" aria-hidden="true">↓</div>
        <div className="article-diagram__sources">
          <span>Day</span><span>Week</span><span>Month / team</span>
        </div>
      </figure>

      <p>
        That layer added code and tests we had to maintain. I considered that a fair
        cost compared with repeating conversion and permission rules in each
        calendar view. It also meant a change to one service contract did not
        require revisiting every rendering configuration.
      </p>

      <h2 id="dates">Some dates are days, not instants</h2>
      <p>
        Take a date-only value such as <code>2026-10-23</code>. If a JavaScript
        implementation parses it as UTC midnight, a viewer in a timezone behind
        UTC can see October 22 after local formatting. Nothing went wrong with
        converting the instant. The mistake was inventing an instant for a value
        whose meaning was a calendar date.
      </p>
      <p>
        A shift starting at a particular instant is different. Its displayed
        clock time should change with timezone. A date-only day off should keep
        its intended day. We kept those semantics separate instead of running
        everything through one date conversion path.
      </p>
      <div className="article-comparison">
        <div><strong>Date-only</strong><code>2026-10-23</code><span>The intended calendar day stays fixed.</span></div>
        <div><strong>Timestamp</strong><code>2026-10-23T09:00:00Z</code><span>The displayed local time can change.</span></div>
      </div>
      <p>
        A useful regression check is to render the same date-only record in several
        timezones and across all supported views. I would also check the
        boundaries around midnight and daylight-saving changes. A converter
        can pass its unit tests while a view still applies a second conversion.
      </p>

      <h2 id="continuity">Navigation context and server data have different lifetimes</h2>
      <p>
        People move around a calendar repeatedly. They change the view, jump
        between dates, and come back to the range they were just looking at.
        Resetting useful context on every transition makes the interface feel
        unreliable. But keeping old schedule records indefinitely creates the
        opposite problem: a smooth interface that can display out-of-date data.
      </p>
      <p>
        For this reason I separated continuity from freshness. Visible-range
        results could be reused when navigation returned to an already loaded
        range; refresh happened without always replacing useful content with a
        blocking loader. A deliberate reload path remained available when a
        fresh read was necessary.
      </p>
      <p>
        Rapid navigation was another place where it was easy to waste requests.
        Debouncing helped, but it was only one part of the solution. The visible
        range also needed a stable cache key, and a response from an earlier
        navigation could not be allowed to replace data for the range now on
        screen. Those details matter more than making a loading spinner disappear.
      </p>
      <p>
        Selected date and view are navigation context. Schedule records have a
        different owner and freshness requirement. Persisting the former may
        help someone resume their work; persisting the latter without a clear
        invalidation strategy risks displaying stale information. That boundary
        matters whether state lives in Zustand, React Query, or another tool.
      </p>

      <h2 id="verification">What I wanted the tests to catch</h2>
      <p>
        The failure cases worth checking are often quiet ones: a date shifted by
        one day, a restricted absence rendered with too much detail, or a cached
        range that no longer refreshes. A screenshot of a populated calendar
        would not catch any of them.
      </p>
      <div className="article-table-wrap">
        <table className="article-table">
          <thead><tr><th>Situation</th><th>What needs to hold</th></tr></thead>
          <tbody>
            <tr><td>A date-only record crosses timezones</td><td>It remains on the intended business day.</td></tr>
            <tr><td>A user switches views</td><td>Permissions and event meaning do not change.</td></tr>
            <tr><td>A known range is revisited</td><td>Useful data is reused without suppressing later refresh.</td></tr>
            <tr><td>A service fails</td><td>The calendar fails safely rather than taking down the surrounding interface.</td></tr>
            <tr><td>A confidential absence appears</td><td>Private details stay masked in every view.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="takeaway">The boundary I would keep</h2>
      <p>
        Scheduling pulls several concerns into one screen: service contracts,
        business dates, permissions, navigation, and a third-party UI library.
        Problems appear when those concerns start making decisions for each other.
      </p>
      <p>
        I would keep the typed event model outside the calendar integration. It
        adds a mapping step, but it also gives date rules, permission metadata,
        and service differences one place to be inspected and tested. The
        calendar component can then focus on interaction and rendering.
      </p>
      <p className="article-note">
        Examples in this article are simplified to explain the engineering
        decisions; they do not reproduce employer code or internal contracts.
      </p>
    </div>
  );
}
