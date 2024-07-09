import './ReasonCard.css';

interface ReasonCardProps {
  title: string;
  description: string;
}
export default function ReasonCard({ title, description }: ReasonCardProps) {
  return (
    <div className="reason-card">
      <div className="reason-title-container">
        <h3 className="reason-title">{title}</h3>
      </div>
      <p className="reason-description">{description}</p>
    </div>
  );
}
