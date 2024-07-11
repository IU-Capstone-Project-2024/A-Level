import './Extract.css';

interface ExtractProps {
  literal: string;
  text: string;
}
export default function Extract({ literal, text }: ExtractProps) {
  return (
    <div className="extract">
      <h3 className="extract-title">Extract {literal}</h3>
      <p className="extract-text">{text}</p>
    </div>
  );
}
