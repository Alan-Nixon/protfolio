import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const deleteImage = async (imageUrl: string, folderName: string) => {
    try {
        const publicId = `${folderName}/${imageUrl.split('/').pop()?.split('.')[0]}`;
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== 'ok') {
            console.log(`Failed to delete image. Cloudinary response: ${result.result}`, result);
            return;
        }
        console.log(`Image with public ID ${publicId} deleted successfully`);
    } catch (error) {
        console.error('Error during image deletion:', error);
        throw new Error('Failed to delete image from Cloudinary');
    }
};



export const uploadImage = async (base64Image: string, folder: string) => {
    const result = await cloudinary.uploader.upload(base64Image, { folder });
    console.log(result.secure_url)
    return result.secure_url;
};