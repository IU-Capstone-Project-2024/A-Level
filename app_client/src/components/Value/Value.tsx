import './Value.css';

interface ValueProps {
  value: string;
  description: string;
}
export default function Value({ value, description }: ValueProps) {
  return (
    <div className="value-container">
      <div className="value-title">
        <h3 className="value-title-text">{value}</h3>
      </div>
      <p className="value-description">{description}</p>
    </div>
  );
}
