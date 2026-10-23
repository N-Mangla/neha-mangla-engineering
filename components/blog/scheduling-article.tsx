export function SchedulingArticle() {
  return (
    <div className="article-body">
      <p className="article-lead">
        Most calendar bugs I&apos;ve dealt with were not about drawing events on a screen.
        They came from the assumptions around those events: what a date means,
        what someone is allowed to see, and when data needs to be fetched again.
      </p>
      <p>
        On a workforce scheduling project built with React, TypeScript, and Bryntum,
        we had shifts, overtime, absences, and days off arriving through different
        services. The same information also had to behave consistently in day,
        week, month, and team views.
      </p>
      <p>
        The approach that held up best was to settle the meaning of an event before
        passing it to the calendar library.
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
        Consider a day-off record for <code>2026-10-23</code>. If that value
        means “this calendar day,” treating it as midnight UTC and converting
        it into the viewer&apos;s timezone can move it to October 22. The conversion
        is technically valid for a timestamp, but wrong for the business record.
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
        I would test this with the same date-only value in timezones on either side
        of UTC, then check the result in each calendar view. A passing unit test
        for the converter alone would not catch a view that applied another
        conversion while rendering.
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
        I treat the selected date and view as navigation context, not as proof that
        previously loaded events are still current. Persisting that context and
        revalidating server data are two different decisions. In a React app,
        the store you choose matters less than making that distinction explicit.
      </p>

      <h2 id="verification">What I wanted the tests to catch</h2>
      <p>
        I spent more attention on cases where a wrong result could look plausible:
        a date shifted by one day, an absence rendered with too much detail,
        or a cached range that never refreshed. They are easy to miss if testing
        stops after confirming that events appear on the screen.
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

      <h2 id="takeaway">Where I would draw the boundary again</h2>
      <p>
        Scheduling pulls several concerns into one screen: service contracts,
        business dates, permissions, navigation, and a third-party UI library.
        Problems appear when those concerns start making decisions for each other.
      </p>
      <p>
        The most useful decision was giving those rules a stable home outside
        the UI library. Once the event model owned the meaning of the data,
        it became easier to reason about different views, test failures, and
        adapt the implementation without reinterpreting the same rules in
        multiple places.
      </p>
      <p className="article-note">
        Examples in this article are simplified to explain the engineering
        decisions; they do not reproduce employer code or internal contracts.
      </p>
    </div>
  );
}
