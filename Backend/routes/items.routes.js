import express from 'express';
import multer from 'multer';
import { createItems,getItems,deleteItem } from '../controllers/items.controllers.js';


const Routeritems = express.Router();

const storage = multer.diskStorage({
  destination:(_req,_file,cb) => cb(null,'upload/'),
  filename:(_req,file,cb) => cb(null,`${Date.now()}-${file.originalname}`),
});

const upload = multer({storage});
Routeritems.post('/',upload.single('image'),createItems);
Routeritems.get('/',getItems);
Routeritems.delete('/:id',deleteItem);
export default Routeritems;