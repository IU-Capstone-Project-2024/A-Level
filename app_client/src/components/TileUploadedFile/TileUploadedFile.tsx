import './TileUploadedFile.css';

interface TileProps {
    image: string;
    title: string;
}

export default function TileUploadedFile ({ image, title }:TileProps) {
    return (
      <div className="tile-outer">
        <div className='tile-inner'>
            <img src={image} alt={title} className="tile-image" />
            <div className="tile-title">{title}</div>
        </div>
      </div>
    );
};