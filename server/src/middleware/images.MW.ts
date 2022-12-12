import { Request, Response, NextFunction } from 'express';
import { createAssetsDirIfNotExists, getFullImgPath } from '../utils/utils';

export const fullImageHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check for existance of the full image
  //filename is always exists, as we use this middleware after the paramsHandler middleware
  const filename = req.query.filename as string;
  const imagePath = getFullImgPath(filename);
  if (!imagePath) {
    res.status(404).json({ message: `file ${filename}.jpg is not found` });
    return;
  }
  next();
};

export const paramsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Check for the existence & validation of params
  const { filename, width, height } = req.query;

  if (!(filename && +(width as string) && +(height as string))) {
    //if params is null or undefined
    res.status(400).json({
      message:
        'Missing or invalid params :\n require[ filename, width(number), height(number)]',
    });
    return;
  }

  if (width && height) {
    if (+width < 50 || +height < 50 || +width >= 9999 || +height >= 9999) {
      //if width and height are strings but less than 50 px
      res.status(400).json({
        message: '[width,height] must be (9999>= width,height >= 50)',
      });
      return;
    }
  }

  next();
};

export const assetsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createAssetsDirIfNotExists();

  next();
};
