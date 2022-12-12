import sharp from 'sharp';
import { getThumbImgPath, __FullDirPath } from './utils';
import path from 'path';

export const ResizeImage = async (
  filename: string,
  width: string,
  height: string
): Promise<void> => {
  const fullImgPath: string = path.resolve(__FullDirPath, `${filename}.jpg`);
  const thumbImgPath: string = getThumbImgPath(filename, width, height);

  await sharp(fullImgPath)
    .resize({
      width: +width,
      height: +height,
      fit: 'fill',
    })
    .toFile(thumbImgPath);
};
