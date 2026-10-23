export function SchedulingArticle() {
  return (
    <article className="article-body article-body--focused">
      <p className="article-lead">
        A shift, a day off, and an absence can all appear as blocks on a calendar.
        But they don&apos;t mean the same thing. I ran into that distinction while
        working on a workforce scheduling interface with React, TypeScript, and Bryntum.
      </p>
      <p>
        The calendar had to bring together records from different services and
        show them consistently across day, week, month, and team views.
        Before worrying about colors or event layouts, we needed agreement on
        the dates, permissions, and data each view could use.
      </p>

      <h2 id="dates">When an all-day event lands on the wrong date</h2>
      <p>
        Here&apos;s a small example of why I treat date-only values differently
        from timestamps. These are illustrative records, not application code:
      </p>
      <div className="article-example-grid">
        <div className="article-example">
          <span className="article-example__label">Day off · calendar date</span>
          <pre><code>{'{ type: "dayOff", date: "2026-10-23" }'}</code></pre>
          <p>The day off belongs to 23 October, regardless of the viewer&apos;s timezone.</p>
        </div>
        <div className="article-example">
          <span className="article-example__label">Shift · moment in time</span>
          <pre><code>{'{ type: "shift", start: "2026-10-23T09:00:00Z" }'}</code></pre>
          <p>A shift&apos;s displayed clock time can change with the selected timezone.</p>
        </div>
      </div>
      <p>
        Parsing <code>2026-10-23</code> as midnight UTC and then formatting it
        in a timezone behind UTC can show October 22. That&apos;s valid conversion
        of an instant, but it&apos;s not what the date-only record meant.
        We kept calendar dates and timed events on separate conversion paths.
      </p>

      <h2 id="boundary">What belonged to the app, not the calendar library</h2>
      <p>
        Shifts, overtime, and absence responses had different fields and rules.
        Instead of wiring each service response into Bryntum, I used a typed
        application event model. It kept event identity, date meaning,
        categories, and permission metadata consistent before rendering.
      </p>
      <figure className="article-diagram article-diagram--compact">
        <figcaption>How the rendering boundary works (simplified)</figcaption>
        <div className="article-diagram__sources">
          <span>Shifts / overtime</span><span>Absences / days off</span><span>Categories / permissions</span>
        </div>
        <div className="article-diagram__arrow" aria-hidden="true">↓</div>
        <div className="article-diagram__core">Application event model
          <small>Stable IDs · date rules · event category · visibility</small>
        </div>
        <div className="article-diagram__arrow" aria-hidden="true">↓</div>
        <div className="article-diagram__sources">
          <span>Day / week</span><span>Month / team</span><span>Bryntum rendering</span>
        </div>
      </figure>
      <p>
        This introduced a mapping layer we had to maintain. I preferred that
        cost to repeating data conversion and visibility checks across views.
        It also gave us one boundary to test when service contracts changed.
      </p>

      <h2 id="navigation">Fast navigation without assuming cached data is current</h2>
      <p>
        Someone browsing a schedule might switch views, jump forward a week,
        and return to a range they&apos;ve just seen. Fetching the same range every
        time makes navigation sluggish; never refreshing it risks showing an
        old schedule.
      </p>
      <div className="article-example-grid">
        <div className="article-example">
          <span className="article-example__label">Restore navigation context</span>
          <p>Selected date and calendar view. These help a user pick up where they left off.</p>
        </div>
        <div className="article-example">
          <span className="article-example__label">Revalidate server data</span>
          <p>Visible-range events and schedule changes. Reusing a range should not disable refresh.</p>
        </div>
      </div>
      <p>
        We reused loaded ranges, debounced quick navigation, and refreshed in
        the background when appropriate. A stable range key matters here,
        as does guarding against an older request updating a view the user
        has already left. Persisting UI context is a different choice from
        treating cached schedule records as permanently valid.
      </p>

      <h2 id="testing">The checks I cared about</h2>
      <p>
        The awkward failures were often subtle: a day off shown one date early,
        confidential absence details visible in the wrong view, or an old
        response replacing newer data. They wouldn&apos;t necessarily make the
        screen look broken.
      </p>
      <ul className="article-checks">
        <li>Date-only records remain on the intended date across timezones and views.</li>
        <li>Privacy rules still apply when switching between individual and team views.</li>
        <li>Revisiting a cached range doesn&apos;t prevent a later refresh.</li>
        <li>A failed service request doesn&apos;t take down the surrounding interface.</li>
        <li>Rapid navigation doesn&apos;t let an earlier response overwrite the active range.</li>
      </ul>

      <p>
        If I built this again, I&apos;d still keep product rules outside the calendar
        component. Bryntum should handle interaction and rendering; it shouldn&apos;t
        decide what a business date means or which absence details someone can see.
      </p>
      <p className="article-note">
        Examples are simplified for illustration. They don&apos;t reproduce employer
        source code or internal service contracts.
      </p>
    </article>
  );
}
