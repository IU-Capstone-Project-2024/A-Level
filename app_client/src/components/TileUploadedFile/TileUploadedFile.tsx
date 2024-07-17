'use client';
import axios, { AxiosResponse } from 'axios';
import './TileUploadedFile.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TileProps {
  image: string;
  title: string;
  id: number;
}

interface DocumentProps {
  id: string;
  path: string;
  filename: string;
  tasks: string[];
  img: string | null;
}

export default function TileUploadedFile({ image, title, id }: TileProps) {
  const router = useRouter();

  async function switchToDoc(id: number) {
    //change the function here when a tile will be clicked
    const responseDoc: AxiosResponse<DocumentProps> = await axios.get(
      `https://chartreuse-binghamite1373.my-vm.work/document/${id}`,
    );
    if (responseDoc.status === 200) {
      const doc: DocumentProps = responseDoc.data;
      router.push(`/document/${doc?.id}`);
    } else {
      console.log('An error occurred while uploading the file');
    }
  }

  return (
    <div className="tile-outer" onClick={() => switchToDoc(id)}>
      <div className="tile-inner">
        {image !== 'null' && image !== null && (
          <Image
            src={image}
            width={160}
            height={128}
            alt={title}
            className="tile-image"
          />
        )}
        <div className="tile-title">{title}</div>
      </div>
    </div>
  );
}
