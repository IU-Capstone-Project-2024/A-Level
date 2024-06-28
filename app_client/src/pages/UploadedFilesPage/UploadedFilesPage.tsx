import './UploadedFilesPage.css';
import Grid from '../../components/GridUploadedFile/GridUploadedFile';
import { useState } from 'react';
import Pagination from '../../components/PaginationUploaded/PaginationUploaded';



const tiles = [
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
    {image:"https://via.placeholder.com/100", title:"pdf1"},
]

const tilesCount = tiles.length;
const maxTilesPerPage = 5;

export default function UploadedFilesPage(){
    return (
        <div className="uploaded-page-content">
            <div className="center-container">
                <Grid tiles={tiles} />
                <Pagination total={Math.ceil(tilesCount / maxTilesPerPage)} />
            </div>
        </div>
    );
}
