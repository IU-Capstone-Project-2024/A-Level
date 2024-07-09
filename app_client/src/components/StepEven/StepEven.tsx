import './StepEven.css';

interface StepProps {
  color: string;
  title: string;
  description: string;
  index: number;
}
export default function StepEven({
  color,
  title,
  description,
  index,
}: StepProps) {
  return (
    <div className="step-even">
      <div className="step-text">
        <h2 className="step-title" style={{ color: color }}>
          {title}
        </h2>
        <p className="step-description">{description}</p>
      </div>
      <div className="step-figures">
        <div className="rectangle-block">
          <div
            className="triangle-up"
            style={{ borderBottomColor: color }}
          ></div>
          <div className="rectangle" style={{ backgroundColor: color }}></div>
        </div>
        <div className="line" style={{ backgroundColor: color }}></div>
        <div className="circle" style={{ backgroundColor: color }}>
          <h2 className="index">{index}</h2>
        </div>
      </div>
    </div>
  );
}
