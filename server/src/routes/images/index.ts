import express, { Request, response, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import {
  assetsHandler,
  fullImageHandler,
  paramsHandler,
} from '../../middleware/images.MW';
import {
  __FullDirPath,
  getFullImgPath,
  getFullThumbsName,
} from '../../utils/utils';
import fs from 'fs';
import fileUpload, { UploadedFile } from 'express-fileupload';

const images = express.Router();

images.use(assetsHandler);

images.get(
  '/',
  paramsHandler,
  fullImageHandler,
  (req: Request, res: Response) => {
    const { filename, width, height } = req.query;

    const fullImgPath: string = path.resolve(
      'assets',
      'full',
      `${filename}.jpg`
    );
    const thumbImgPath: string = path.resolve(
      'assets',
      'thumbs',
      getFullThumbsName(filename as string, width as string, height as string)
    );
    if (fs.existsSync(thumbImgPath)) {
      res.status(200).sendFile(thumbImgPath);
    } else {
      sharp(fullImgPath)
        .resize({
          width: +(width as string),
          height: +(height as string),
          fit: 'fill',
        })
        .toFile(thumbImgPath, (err) => {
          if (err) {
            res.status(500).json({ message: 'Failed to save thumb file' });
            return;
          }
          res.status(200).sendFile(thumbImgPath);
        });
    }
  }
);

images.get('/all', (req: Request, res: Response) => {
  let arrImg: string[];
  fs.readdir(path.resolve('assets', 'full'), (err, files) => {
    if (err) response.status(404).json({ message: 'Failed to find Directory' });
    arrImg = files.map((file) => file.split('.')[0]);
    res.status(200).send(arrImg);
  });
});
images.get('/:name', (req: Request, res: Response) => {
  let fileName = req.params.name;
  const filePath = getFullImgPath(fileName);
  if (filePath) res.status(200).sendFile(filePath);
  else res.status(404).json({ message: 'File not found' });
});

images.post('/upload', fileUpload(), (req: Request, res: Response) => {
  if (req.files && Object.keys(req.files).length !== 0) {
    const uploadedFile = req.files.file as UploadedFile;
    const filePath = path.join(__FullDirPath, uploadedFile.name);

    uploadedFile.mv(filePath, (err) => {
      if (err) {
        res.status(500).send('Failed');
      } else res.send({ message: err });
    });
  } else res.status(404).json({ message: 'File not found' });
});
export default images;
