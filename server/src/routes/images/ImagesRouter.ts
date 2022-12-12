import express, { Request, response, Response } from 'express';
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
  __ThumbsDirPath,
} from '../../utils/utils';
import fs from 'fs';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { ResizeImage } from '../../utils/imagesProccessing';

const images = express.Router();

images.use(assetsHandler);

images.get(
  '/',
  paramsHandler,
  fullImageHandler,
  async (req: Request, res: Response) => {
    const { filename, width, height } = req.query;
    const thumbImgPath: string = path.resolve(
      __ThumbsDirPath,
      getFullThumbsName(filename as string, width as string, height as string)
    );
    try {
      if (fs.existsSync(thumbImgPath)) {
        res.status(200).sendFile(thumbImgPath);
      } else {
        await ResizeImage(
          filename as string,
          width as string,
          height as string
        );
      }
    } catch (e) {
      res.status(500).json({ message: 'Failed to save thumb file' });
    } finally {
      res.status(200).sendFile(thumbImgPath);
    }
  }
);

images.get('/all', (req: Request, res: Response): void => {
  let arrImg: string[];
  fs.readdir(__FullDirPath, (err, files) => {
    if (err) response.status(404).json({ message: 'Failed to find Directory' });
    arrImg = files.map((file) => file.split('.')[0]);
    res.status(200).send(arrImg);
  });
});

images.get('/:name', (req: Request, res: Response): void => {
  const fileName = req.params.name;
  const filePath = getFullImgPath(fileName);
  if (filePath) res.status(200).sendFile(filePath);
  else res.status(404).json({ message: 'File not found' });
});

images.post('/upload', fileUpload(), (req: Request, res: Response): void => {
  if (req.files && Object.keys(req.files).length !== 0) {
    const uploadedFile = req.files.file as UploadedFile;
    const filePath: string = path.join(__FullDirPath, uploadedFile.name);

    uploadedFile.mv(filePath, (err: Error) => {
      if (err) {
        res.status(500).send('Failed');
      } else res.send({ message: err });
    });
  } else res.status(404).json({ message: 'File not found' });
});
export default images;
