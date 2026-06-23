const RISKS = [
  { id: 'R1', label: 'D-Bus expuesto en red celular', p: 5, i: 5, score: 25, level: 'critical' },
  { id: 'R2', label: 'Sin segmentación CAN', p: 4, i: 5, score: 20, level: 'critical' },
  { id: 'R3', label: 'Flasheo V850 sin firma', p: 4, i: 5, score: 20, level: 'critical' },
  { id: 'R4', label: 'Escaneo masivo subred /8', p: 5, i: 4, score: 20, level: 'critical' },
  { id: 'R5', label: 'Sin actualizaciones OTA', p: 4, i: 4, score: 16, level: 'high' },
];

const PROB_LABELS = {
  5: 'Muy alta',
  4: 'Alta',
  3: 'Media',
  2: 'Baja',
  1: 'Muy baja',
};

const IMPACT_LABELS = {
  1: 'Muy bajo',
  2: 'Bajo',
  3: 'Medio',
  4: 'Alto',
  5: 'Muy alto',
};

const getCellLevel = (score) => {
  if (score >= 20) return 'critical';
  if (score >= 15) return 'high';
  if (score >= 8) return 'medium';
  return 'low';
};

const getRisksInCell = (p, i) => RISKS.filter((r) => r.p === p && r.i === i);

const RiskMatrix = () => (
  <div className="risk-matrix-panel">
    <div className="risk-matrix-chart">
      <div className="risk-matrix-y-title">Probabilidad</div>
      <div className="risk-matrix-body">
        <div className="risk-matrix-y-labels">
          {[5, 4, 3, 2, 1].map((p) => (
            <div className="risk-matrix-y-label" key={p}>
              <span className="risk-matrix-axis-num">{p}</span>
              <span className="risk-matrix-axis-text">{PROB_LABELS[p]}</span>
            </div>
          ))}
        </div>

        <div className="risk-matrix-grid-wrap">
          <div className="risk-matrix-grid">
            {[5, 4, 3, 2, 1].map((p) => (
              <div className="risk-matrix-row" key={p}>
                {[1, 2, 3, 4, 5].map((i) => {
                  const score = p * i;
                  const risks = getRisksInCell(p, i);
                  return (
                    <div
                      className={`risk-matrix-cell risk-matrix-cell-${getCellLevel(score)}`}
                      key={`${p}-${i}`}
                      aria-label={`Probabilidad ${p}, Impacto ${i}, puntaje ${score}`}
                    >
                      <span className="risk-matrix-cell-score">{score}</span>
                      <div className="risk-matrix-markers">
                        {risks.map((r) => (
                          <span className={`risk-matrix-marker risk-matrix-marker-${r.level}`} key={r.id}>
                            {r.id}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="risk-matrix-x-labels">
            {[1, 2, 3, 4, 5].map((i) => (
              <div className="risk-matrix-x-label" key={i}>
                <span className="risk-matrix-axis-num">{i}</span>
                <span className="risk-matrix-axis-text">{IMPACT_LABELS[i]}</span>
              </div>
            ))}
          </div>
          <div className="risk-matrix-x-title">Impacto sobre el activo</div>
        </div>
      </div>
    </div>

    <div className="risk-matrix-legend">
      <span className="risk-legend-item"><span className="risk-legend-swatch low" />Bajo (1–7)</span>
      <span className="risk-legend-item"><span className="risk-legend-swatch medium" />Medio (8–14)</span>
      <span className="risk-legend-item"><span className="risk-legend-swatch high" />Alto (15–19)</span>
      <span className="risk-legend-item"><span className="risk-legend-swatch critical" />Crítico (20–25)</span>
    </div>

    <div className="risk-register">
      {RISKS.map((r) => (
        <div className="risk-register-item" key={r.id}>
          <span className="risk-register-id">{r.id}</span>
          <span className="risk-register-label">{r.label}</span>
          <span className={`risk-register-score risk-register-score-${r.level}`}>
            {r.score} pts
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default RiskMatrix;
