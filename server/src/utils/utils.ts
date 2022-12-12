import path from 'path';
import fs from 'fs';

export const __FullDirPath: string = path.resolve('assets', 'full');
export const __ThumbsDirPath: string = path.resolve('assets', 'thumbs');

export const getFullImgPath = (imgName: string): string | null => {
  //Check if original image exists

  const imagePath: string = path.resolve(__FullDirPath, `${imgName}.jpg`);

  return fs.existsSync(imagePath) ? imagePath : null;
};

export const getThumbImgPath = (
  filename: string,
  width: string,
  height: string
) => path.resolve(__ThumbsDirPath, getFullThumbsName(filename, width, height));

export const createAssetsDirIfNotExists = (): void => {
  const fullDir: string = __FullDirPath;
  const thumbDir: string = __ThumbsDirPath;

  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });

  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });
};

export const getFullThumbsName = (
  filename: string,
  width: string,
  height: string,
  ext = 'jpg'
): string => {
  let fullWidth = '';
  for (let i = 0; i < 4 - width.length; i++) {
    fullWidth += '0';
  }
  fullWidth += width;
  let fullHeight = '';
  for (let i = 0; i < 4 - height.length; i++) {
    fullHeight += '0';
  }
  fullHeight += height;

  return filename + fullWidth + fullHeight + `.${ext}`;
};
