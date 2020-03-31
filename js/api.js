class API {
    
    constructor(){
        
    }

    async consultarAPI(url){
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return {
            datos
        }
    }
}