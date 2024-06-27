import './BrowseFile.css';
import axios from "axios";
import CloudArrowUp from '../../images/CloudArrowUp.svg';
import PDF from '../../images/PDF.svg';
import done from '../../images/done.svg';
import React, { useState} from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';


export default function BrowseFile(){
    const [browsed, setBrowsed] = useState(false);
    const [file, setFile] = useState<File>();
    const [uploadError, setUploadError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    


    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }
    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault();
    }
    async function onDropHandler(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault();
        let files = Array.from(e.dataTransfer.files);
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

    async function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
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

      const renderPDFToImage = async (fileURL: string) => {
        try {
            GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;
    
          const pdf = await getDocument(fileURL).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({scale: 0.8});
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
    
          if (!context) {
            throw new Error('Canvas context not available');
          }

          canvas.height = viewport.height*4/7;
          canvas.width = viewport.width;
    
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
    
          await page.render(renderContext).promise;
          setImageSrc(canvas.toDataURL());
        } catch (error) {
          console.error('Error rendering PDF:', error);
        }
      };

    
      async function onSubmitHandler(){
        const formData = new FormData();
        formData.append('uploaded_file', file as File);
        try{
            const response =  await axios.post('http://0.0.0.0:8000/document/upload', formData);

            if (response.status === 200){
                const formData = new FormData();
                formData.append('img', imageSrc as string);
                const responseImg = await axios.post(`http://0.0.0.0:8000/document/${response.data._id}/img`, formData);
                if (responseImg.status === 200){

                    
                }else{
                    setSubmitError('An error occurred while uploading the file');
                }


            } else {
                setSubmitError('An error occurred while uploading the file');
            }


        } catch (error) {
            if (axios.isAxiosError(error)){
                setSubmitError('An error occurred while uploading the file');
            }else{
                setSubmitError('An unexpected error occurred');
            }
        }
    }


    return (
        <div>

        <div className="browsing-page">
            {!browsed && 
            <div className="upload-container">
                <div className="upload" onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}>
                    <img className='upload-icon' src={CloudArrowUp} alt='File uploader'></img>
                    <h3 className="upload-heading">Upload your file</h3>
                    <p className="upload-description">Click to browse or drag and drop your file</p>
                </div>
                <div className="inner-upload-container">
                    <div className="upload-input">
                        <label>
                            <input type="file" className='file' onChange={handleFileChange}/>
                            <span>Click to browse</span>
                        </label> 
                    </div>
                    <p className="upload-error-message">{uploadError}</p>
                </div>
            </div>}
            {browsed && <div className="uploaded-container">
                <div className="upload">
                <img className='upload-icon' src={PDF} alt='PDF file'></img>
                <h3 className="upload-heading">{file?.name}</h3>
                <div className="upload-description">
                    <img id="done" src={done} alt='completed'></img>
                    <p id="upload-text">Upload complete</p>
                </div>
            </div>
            {imageSrc && <img className="pdf-preview" src={imageSrc} alt="PDF preview" />}
            </div>}
        </div>
        <div className='submit-container'>
                <p className="submit-error-message">{submitError}</p>
                <button className={"submit-button "+ (browsed ? "enabled" : "disabled")} onClick={browsed ? onSubmitHandler : () => ''}>Submit</button>
        </div>
        

       
        </div>
    );
}



