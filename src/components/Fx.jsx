/* Ambient motion layer for a section: drifting glows and a few floating
   outline shapes. The layout is fixed per section (no randomness) and mirrored
   on alternate sections; the hero keeps its shapes to the text side. */
const TYPES = ['ring', 'plus', 'dot', 'square', 'tri', 'spark'];
const SIZES = [18, 28, 12, 22, 32];
const SPOTS = [[4, 14], [93, 10], [7, 80], [90, 72], [47, 95]];
const HERO_SPOTS = [[3, 22], [44, 16], [4, 86], [42, 92], [24, 9]];

export default function Fx({ index, hero = false }) {
  const flip = !hero && index % 2 === 1;
  return (
    <div className={'fx' + (flip ? ' fx-flip' : '')} aria-hidden="true">
      <div className="fx-orb fx-orb-a" />
      {!hero && <div className="fx-orb fx-orb-b" />}
      {(hero ? HERO_SPOTS : SPOTS).map(([x, y], j) => {
        const type = TYPES[(index + j) % TYPES.length];
        const style = {
          left: (flip ? 100 - x : x) + '%',
          top: y + '%',
          '--s': SIZES[(index + j * 2) % SIZES.length] + 'px',
          '--d': 9 + ((index + j) % 5) * 1.5 + 's',
          '--delay': '-' + (j * 1.7).toFixed(1) + 's'
        };
        return (
          <span key={j} className={'fx-shape fx-' + type} style={style}>
            {type === 'tri' && (
              <svg viewBox="0 0 24 24">
                <path d="M12 3 21 20H3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            )}
            {type === 'spark' && '✦'}
          </span>
        );
      })}
    </div>
  );
}
