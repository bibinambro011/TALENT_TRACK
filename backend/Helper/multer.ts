// import { Request } from 'express';
// import multer, { FileFilterCallback, Multer } from 'multer';
// import path from 'path';


// export  interface ParsedQs {
//     [key: string]: string | undefined;
//   }

// export default  multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (
//     req: Request<any, any, any, ParsedQs>,
//     file: Express.Multer.File,
//     cb: FileFilterCallback
//   ) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//       cb(null, false);
//       return;
//     }
//     cb(null, true);
//   },
// }) as Multer;

import multer from 'multer';
import fs from 'fs';

// Define the allowed MIME types for image files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  },
});

const upload = multer({ storage: storage });

export default upload;
