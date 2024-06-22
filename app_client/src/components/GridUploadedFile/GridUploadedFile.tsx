import TileUploadedFile from '../TileUploadedFile/TileUploadedFile';
import './GridUploadedFile.css'


interface TileData {
    image: string;
    title: string;
}

interface TileElements {
    tiles: TileData[];
}

export default function Grid ({ tiles }:TileElements) {
    return (
      <div className="grid">
        {tiles.map((tile, index) => (
          <TileUploadedFile key={index} image={tile.image} title={tile.title} />
        ))}
      </div>
    );
};