const jokeUrl = 'https://api.chucknorris.io/jokes/random';
const userUrl = 'https://reqres.in/api/users?page=2';

// Cloudinary
// const cloudPreset = process.env.CLOUD_PRESET;
// const cloudUrl = process.env.CLOUD_URL;

const obtenerChiste = async() => {

    try {
        const resp = await fetch(jokeUrl);
        if ( !resp.ok ) throw 'No se pudo realizar la peticion';

        const { icon_url, id, value } = await resp.json();
        return { icon_url, id, value };
         
    } catch (error) {
        throw error;
    }
};

const obtenerUsuarios = async() => {

    try {
        const resp = await fetch(userUrl);
        const { data:usuarios } = await resp.json();
        return usuarios;

    } catch (error) {
        console.log(error);
    }
}

// ArchivoSubir :: File
const subirImagen = async( archivoSubir ) => {
    const formData = new FormData();
    formData.append('upload_preset', cloudPreset);
    formData.append('file', archivoSubir);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(resp.ok){
            const cloudResp = await resp.json();
            console.log(cloudResp);
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }
}
export {
    obtenerChiste,
    obtenerUsuarios,
    subirImagen
}