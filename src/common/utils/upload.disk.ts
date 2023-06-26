// // import path from 'path';

// import { createWriteStream } from 'fs';
// import { join } from 'path';
// import { v4 } from 'uuid';

// interface UploadResult {
//   message: string;
//   file: Express.Multer.File;
//   filePath: string;
//   uniqueName: string;
// }

// export const uploadToDisk = (file) => {
//   const uploadPath = join(process.cwd(), 'src', 'dist', 'images');
//   //   const date_now = new Date();
//   const uuid = v4();
//   const uniqueName = `${uuid}-${file.originalname}`;
//   const filePath = join(uploadPath, uniqueName);

//   const writeStream = createWriteStream(filePath);

//   return new Promise((resolve, reject) => {
//     writeStream
//       .on('finish', () => {
//         // resolve({
//         //   message: 'Image uploaded and saved successfully',
//         //   file: file,
//         //   filePath,
//         //   uniqueName,
//         // });
//         const result: UploadResult = {
//           message: 'Image uploaded and saved successfully',
//           file,
//           filePath,
//           uniqueName,
//         };
//         resolve(result);
//       })
//       .on('error', (error) => {
//         reject(error);
//       });

//     writeStream.write(file.buffer);
//     writeStream.end();
//   });
// };

import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 } from 'uuid';

interface UploadResult {
  message: string;
  file: Express.Multer.File;
  filePath: string;
  uniqueName: string;
}

export const uploadToDisk = (file): Promise<UploadResult> => {
  const uploadPath = join(process.cwd(), 'src', 'dist', 'images');
  const uuid = v4();
  const uniqueName = `${uuid}-${file.originalname}`;
  const filePath = join(uploadPath, uniqueName);

  const writeStream = createWriteStream(filePath);

  return new Promise<UploadResult>((resolve, reject) => {
    writeStream
      .on('finish', () => {
        const result: UploadResult = {
          message: 'Image uploaded and saved successfully',
          file,
          filePath,
          uniqueName,
        };
        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });

    writeStream.write(file.buffer);
    writeStream.end();
  });
};
