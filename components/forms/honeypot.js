// Visually hidden honeypot field. Real humans never fill it; bots that
// scrape and submit forms typically do. Server-side checks for `_hp` and
// silently succeeds if it's populated.
//
// Rendered off-screen with tabindex=-1 and autocomplete=off so no screen
// reader or keyboard user ever encounters it.

export default function Honeypot() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      <label>
        Do not fill this in
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );
}
