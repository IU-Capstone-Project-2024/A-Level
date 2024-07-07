import './ContactLink.css';

interface ContactProps {
  id: string;
  reference: string;
  source: string;
  alt: string;
}

export default function ContactLink(props: ContactProps) {
  return (
    <a id={props.id} href={props.reference} target="_blank" rel="noreferrer">
      <img
        className="social_media_link"
        src={props.source}
        alt={props.alt}
        width="100"
        height="132"
      />
    </a>
  );
}
