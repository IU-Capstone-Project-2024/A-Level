import './TileUploadedFile.css';

interface TileProps {
    image: string;
    title: string;
    onClick: ()=>void;
}

export default function TileUploadedFile ({ image, title, onClick }:TileProps) {
    return (
      <div className="tile-outer" onClick={onClick}>
        <div className='tile-inner'>
            <img src={image} alt={title} className="tile-image" />
            <div className="tile-title">{title}</div>
        </div>
      </div>
    );
};