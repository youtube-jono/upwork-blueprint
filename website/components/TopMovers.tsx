'use client';

type Mover = { title: string; why: string; do: string; test?: { stage: string }; evidence?: { name: string }[] };
type Diagnosis = { week: string; stuck: string; areas: Record<string, { title: string; movers?: Mover[] }> };

/** The stuck stage's 1 to 3 changes, first thing under the funnel: what to do now for the biggest result.
 *  The stage's own checks below no longer repeat them. */
export default function TopMovers({ diagnosis, week }: { diagnosis: Diagnosis | null | undefined; week?: string }) {
  if (!diagnosis?.areas || (week && diagnosis.week !== week)) return null;
  const step = diagnosis.areas[diagnosis.stuck];
  const movers = step?.movers || [];
  if (!movers.length) return null;
  return <section className="tm" aria-label="Do these first">
    <p className="cl-grp tm-head">{movers.length === 1 ? 'Do this first' : `Do these ${movers.length} first`} · {step.title}</p>
    <ol className="mv-list">{movers.map((m, i) => <li key={i}>
      <strong>{m.title}{m.test && <span className="mv-test">Split testing this</span>}</strong>
      <p className="mv-why">{m.why}</p>
      <p className="mv-do"><span>Do this:</span> {m.do}</p>
      {!!m.evidence?.length && <p className="mv-from">From your data: {m.evidence.map(e => e.name).join(' · ')}</p>}
    </li>)}</ol>
  </section>;
}
