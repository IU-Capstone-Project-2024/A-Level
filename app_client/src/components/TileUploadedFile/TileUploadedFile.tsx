import './TileUploadedFile.css';

interface TileProps {
    image: string;
    title: string;
    id: number;
}

function switchToDoc(id:number) {
  //change the function here when a tile will be clicked
  console.log(id);
}

export default function TileUploadedFile ({ image, title, id }:TileProps) {
    return (
      <div className="tile-outer" onClick={()=>switchToDoc(id)}>
        <div className='tile-inner'>
            <img src={image} alt={title} className="tile-image" />
            <div className="tile-title">{title}</div>
        </div>
      </div>
    );
};