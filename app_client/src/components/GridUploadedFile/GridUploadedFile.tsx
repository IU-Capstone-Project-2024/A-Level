import TileUploadedFile from '../TileUploadedFile/TileUploadedFile';
import './GridUploadedFile.css'


interface TileData {
    image: string;
    title: string;
    id: number;
}

interface TileElements {
    tiles: TileData[];
}

const test = ()=>console.log("change this function to preview document");

export default function Grid ({ tiles }:TileElements) {
    return (
      <div className="grid">
        {tiles.map((tile, index) => (
           <TileUploadedFile key={index} image={tile.image} title={tile.title} id={tile.id} />
        ))}
      </div>
    );
};