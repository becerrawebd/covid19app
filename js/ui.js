class UI {

    constructor() {
        this.controller = this.inicializarGlobo();
    }

    inicializarGlobo() {
        var container = document.getElementById("globalArea");
        var controller = new GIO.Controller(container);
        var colorPrimario = "#00ffff"
        controller.setSurfaceColor(colorPrimario);
        controller.setSelectedColor(colorPrimario);
        controller.setHaloColor(colorPrimario);
        controller.adjustOceanBrightness(0.3);
        controller.setTransparentBackground(true);
        controller.setInitCountry("AR");
        controller.init();
        return controller
    }

    llenarSelectPaises(paises) {
        const select = document.querySelector('#nombre_pais');
        paises.forEach(pais => {
            if (pais.iso2 != null && pais.iso3 != null) {
                const opcion = document.createElement('option');
                opcion.text = pais.name;
                opcion.setAttribute('data-iso2', pais.iso2);
                opcion.setAttribute('data-iso3', pais.iso3);
                select.appendChild(opcion);
            }
        });
    }

    colocarBanderaPais(codigoIso3) {
        const img = document.querySelector('#img_pais');
        img.setAttribute('src', `https://restcountries.eu/data/${codigoIso3.toLowerCase()}.svg`);
    }

    seleccionarPaisGlobo(codigoIso2) {
        this.controller.switchCountry(codigoIso2);
    }

    llenarCards(datos, idConfirmados, idRecuperados, idMuertes) {
        const confirmados = document.querySelector(`#${idConfirmados}`);
        const recuperados = document.querySelector(`#${idRecuperados}`);
        const muertes = document.querySelector(`#${idMuertes}`);
        confirmados.textContent = new Intl.NumberFormat('es').format(datos.confirmed.value)
        recuperados.textContent = new Intl.NumberFormat('es').format(datos.recovered.value);
        muertes.textContent = new Intl.NumberFormat('es').format(datos.deaths.value);
    }

}