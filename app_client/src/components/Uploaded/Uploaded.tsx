import './Uploaded.css';
import Grid from '../GridUploadedFile/GridUploadedFile';
import { useState } from 'react';
import Pagination from '../PaginationUploaded/PaginationUploaded';

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
]

const tilesCount = tiles.length;
const maxTilesPerPage = 5;



export default function Uploaded(){
    return (
        <div>
            <Grid tiles={tiles}/>
            <Pagination total={Math.ceil(tilesCount/maxTilesPerPage)}/>
        </div>
    );
};