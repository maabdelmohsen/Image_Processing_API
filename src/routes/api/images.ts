import express from 'express';
const images = express.Router();

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

images.get('/', (req, res) => {
  
  const fullpath: string = path.join(__dirname, '..', '\\images\\full\\');
  const thumbpath: string = path.join(__dirname, '..', '\\images\\thumb\\');
  
  const filename: string = ((req.query.filename as unknown) as string);
  const width: number = (req.query.width) ? parseInt( (req.query.width as unknown) as string ) : 400;
  const high: number = (req.query.high) ? parseInt( (req.query.high as unknown) as string ) : 400;
  
  const thumb_filename: string = filename.split('.').slice(0, -1).join('.') + '_thumb.jpg';
  
  try {
	
	fs.accessSync(thumbpath + thumb_filename);
    res.sendFile(thumbpath + thumb_filename);
  } catch (err) {
	
    sharp(fullpath + filename).resize(width, high).toFile(thumbpath + thumb_filename, (err: any, info: any) => {
    
      if (err){
        res.send( '"' + thumb_filename + '" Does not Exist!' );
      }else{
        res.sendFile(thumbpath + thumb_filename);
      }
	});
  }
  
});

export default images;