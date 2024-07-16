'use client';
import { useState } from 'react';
import styles from './browse.module.css';
import axios, { AxiosResponse } from 'axios';
import PDF from '../../images/PDF.svg';
import CloudArrowUp from '../../images/CloudArrowUp.svg';
import done from '../../images/done.svg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePDFJS } from '@/context/usePDFJS';

interface DocumentProps {
  id: string;
  path: string;
  filename: string;
  tasks: string[];
  img: string | null;
}

export default function BrowseFilePage() {
  const [browsed, setBrowsed] = useState(false);
  const [file, setFile] = useState<File>();
  const [uploadError, setUploadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const router = useRouter();

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  async function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const fileExtension = files[0].name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'pdf') {
      setFile(files[0]);
      const fileURL = URL.createObjectURL(files[0]);
      await renderPDFToImage(fileURL);
      setUploadError('');
      setBrowsed(true);
    } else {
      setFile(undefined);
      setUploadError('Only PDF files are allowed');
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'pdf') {
        setFile(file);
        const fileURL = URL.createObjectURL(file);
        await renderPDFToImage(fileURL);
        setUploadError('');
        setBrowsed(true);
      } else {
        setFile(undefined);
        setUploadError('Only PDF files are allowed');
      }
    }
  }

  const pdfjs = usePDFJS(async (pdfjs) => {
    console.log(pdfjs);
  });

  const renderPDFToImage = async (fileURL: string) => {
    try {
      if (pdfjs !== undefined) {
        pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;
        const pdf = await pdfjs.getDocument(fileURL).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.8 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Canvas context not available');
        }

        canvas.height = (viewport.height * 4) / 7;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        setImageSrc(canvas.toDataURL());
      }
    } catch (error) {
      console.error('Error rendering PDF:', error);
    }
  };

  async function onSubmitHandler() {
    const formData = new FormData();
    formData.append('uploaded_file', file as File);
    try {
      const response: AxiosResponse<DocumentProps> = await axios.post(
        'https://chartreuse-binghamite1373.my-vm.work/document/upload',
        formData,
      );
      if (response.status === 200) {
        const formData = new FormData();
        formData.append('img', imageSrc as string);
        const responseImg: AxiosResponse<DocumentProps> = await axios.post(
          `https://chartreuse-binghamite1373.my-vm.work/document/${response.data.id}/img`,
          formData,
        );
        if (responseImg.status === 200) {
          const doc: DocumentProps = responseImg.data;
          router.push(`/document/${doc?.id}`);
        } else {
          setSubmitError('An error occurred while uploading the file');
        }
      } else {
        setSubmitError('An error occurred while uploading the file');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError('An error occurred while uploading the file');
      } else {
        setSubmitError('An unexpected error occurred');
      }
    }
  }

  return (
    <div className={styles.browsing_main}>
      <div className={styles.browsing_page}>
        {!browsed && (
          <div className={styles.upload_container}>
            <div
              className={styles.upload}
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              <Image
                className={styles.upload_icon}
                src={CloudArrowUp}
                alt="File uploader"
              />
              <h3 className={styles.upload_heading}>Upload your file</h3>
              <p className={styles.upload_description}>
                Drag and drop your file
              </p>
            </div>
            <div className={styles.inner_upload_container}>
              <div className={styles.upload_input}>
                <label>
                  <input
                    type="file"
                    className={styles.file}
                    onChange={handleFileChange}
                  />
                  <span>Click to browse</span>
                </label>
              </div>
              <p className={styles.upload_error_message}>{uploadError}</p>
            </div>
          </div>
        )}
        {browsed && (
          <div className={styles.uploaded_container}>
            <div className={styles.upload}>
              <Image className={styles.upload_icon} src={PDF} alt="PDF file" />
              <h3 className={styles.upload_heading}>{file?.name}</h3>
              <div className={styles.upload_description}>
                <Image id={styles.done} src={done} alt="completed" />
                <p id={styles.upload_text}>Upload complete</p>
              </div>
            </div>
            {imageSrc && (
              <Image
                className={styles.pdf_preview}
                width={528}
                height={416}
                src={imageSrc}
                alt="PDF preview"
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.submit_container}>
        <p className={styles.submit_error_message}>{submitError}</p>
        <button
          className={`${styles.submit_button} ${browsed ? styles.enabled : styles.disabled}`}
          onClick={browsed ? onSubmitHandler : () => ''}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
