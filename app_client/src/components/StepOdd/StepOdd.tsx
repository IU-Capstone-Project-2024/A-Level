import './StepOdd.css';

interface StepProps {
  color: string;
  title: string;
  description: string;
  index: number;
}
export default function StepOdd({
  color,
  title,
  description,
  index,
}: StepProps) {
  return (
    <div className="step-odd">
      <div className="step-figures">
        <div className="circle" style={{ backgroundColor: color }}>
          <h2 className="index">{index}</h2>
        </div>
        <div className="line" style={{ backgroundColor: color }}></div>
        <div className="rectangle-block">
          <div className="rectangle" style={{ backgroundColor: color }}></div>
          <div
            className="triangle-down"
            style={{ borderTopColor: color }}
          ></div>
        </div>
        <div className="step-text">
          <h2 className="step-title" style={{ color: color }}>
            {title}
          </h2>
          <p className="step-description">{description}</p>
        </div>
      </div>
    </div>
  );
}
