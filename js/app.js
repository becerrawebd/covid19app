
//Variables
const api = new API();
const ui = new UI();
const selectPaises = document.querySelector('#nombre_pais');


//addEventListeners
function addEventListeners(){
    document.addEventListener('DOMContentLoaded',inicializarDOM);
    selectPaises.addEventListener('change',procesarPais)
    ui.controller.onCountryPicked(seleccionarPaisPickeado);
}

addEventListeners();


function seleccionarPaisPickeado(paisPickeado){
    const opciones = selectPaises.querySelectorAll('option')
    opciones.forEach(opcion => {
        if(opcion.getAttribute('data-iso2')===paisPickeado.ISOCode){
            opcion.selected = true;
        }
    })
    procesarPais()
}

function inicializarDOM(){
    const jsonPaises = 'https://covid19.mathdro.id/api/countries/';
    const jsonMundial = 'https://covid19.mathdro.id/api/';
    api.consultarAPI(jsonPaises)
        .then( data => {
            const { datos: {countries} } = data;
            ui.llenarSelectPaises(countries)
            seleccionarPaisPickeado({ISOCode: 'AR'})
        })
        .catch(error => console.log(error))
    
    api.consultarAPI(jsonMundial)
        .then( data => {
            const {datos} = data
            ui.llenarCards(datos,'confirmados_total','recuperados_total','muertes_total');
            ultimaActualizacion(datos.lastUpdate)
        })
        .catch( error => console.log(error))
}

function procesarPais(){
    const codigoIso2 = selectPaises.options[selectPaises.selectedIndex].getAttribute('data-iso2');
    const codigoIso3 = selectPaises.options[selectPaises.selectedIndex].getAttribute('data-iso3');
    ui.colocarBanderaPais(codigoIso3);
    ui.seleccionarPaisGlobo(codigoIso2);
    const jsonInfoPais = `https://covid19.mathdro.id/api/countries/${codigoIso2}`; 
    api.consultarAPI(jsonInfoPais)
        .then( data => {
            const { datos } = data;
            ui.llenarCards(datos,'confirmados_pais','recuperados_pais','muertes_pais');
        })
        .catch( error => console.log(error))
}

function ultimaActualizacion(time){
    const date = new Date(time).toLocaleString('es-AR');
    const actualizacion = document.querySelector('#actualizacion');
    actualizacion.textContent = `Ultima actualizacion: ${date} - Hora de Argentina`;
}
