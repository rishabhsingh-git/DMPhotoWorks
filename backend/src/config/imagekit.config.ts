// SDK initialization
import * as dotenv from 'dotenv';
import ImageKit = require('imagekit');

dotenv.config();

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_EBDPOINT,
});

export default imagekit;
