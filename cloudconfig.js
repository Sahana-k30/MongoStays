const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.cloudname,
    cloud_api:process.env.cloudapi,
    cloud_secret:process.env.cloudapisecret
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => 'computed-filename-using-request',
    },
  });

  module.exports={
    cloudinary,
    storage,
  }