import './ColumnChart.css';

interface ChartProps {
  data: { label: string; value: number; color: string }[];
}

export default function ColumnChart({ data }: ChartProps) {
  return (
    <div className="chart-container">
      <div className="chart">
        {data.map((chart) => (
          <div className="chart-column" key={chart.label}>
            <span className="chart-value">
              {Math.round((chart.value + Number.EPSILON) * 100)}%
            </span>
            <div
              className="chart-rectangle"
              style={{
                height: chart.value * 224,
                backgroundColor: chart.color,
              }}
            ></div>
            <div className="tooltip">{chart.label}</div>
          </div>
        ))}
      </div>
      <div className="chart-description">
        {data.map((chart) => (
          <div className="description-column" key={chart.label}>
            <div
              className="chart-color"
              style={{ backgroundColor: chart.color }}
            ></div>
            <span className="chart-title">{chart.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
