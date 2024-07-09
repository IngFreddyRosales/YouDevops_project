/* import path from "path"; // Asegúrate de importar path correctamente

const urlBase = 'public/imagenes';
const validExtensions = ['png', 'jpg', 'jpeg', 'webp'];

export async function saveImage(folder, image, id){
    const extension = image.name.split('.').pop();	
    if (!validExtensions.includes(extension)) {
        throw new Error('Invalid extension');
    }

    const imagePath = path.join(urlBase, folder, `${id}.${extension}`);
    await image.mv(imagePath);
    return imagePath;
} */
