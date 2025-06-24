let pelis = [
    {
        name: 'Terminator',
        year: '1985',
        description: 'Un robot viaja al pasado, para asesinar a la madre del lider de la resistencia del futuro.',
        url: './assets/Terminator.jpg',
        genre: 'Accion'

    },
    {
        name: 'Shrek',
        year: '2001',
        description: 'Un ogro y un burro en busca del amor',
        url:'./assets/Shrek.jpg',
        genre: 'Comedia'
    },
    {
        name: 'Ghostland',
        year: '2018',
        description: 'Un par de asesinos en serie se cuelan en la casa de una familia recien llegada a la ciudad',
        url: './assets/Ghostland.jpg',
        genre: 'Terror',
    },
    {
        name: 'Titanic',
        year: '1998',
        description: 'La dama y el vagabundo en un crucero, live action',
        url: './assets/Titanic.jpg',
        genre: 'Romantica'
    }
]


/******************* Render listas pelis ********************/

function renderListaPelis(datosPelis) {
    const listaPelis = document.getElementById('pelis');
    listaPelis.innerHTML = '';

    datosPelis.forEach((pelis) => {
        const table = document.createElement('tr');
        table.innerHTML =`
                <td data-label='Nombre'>${pelis.name}</td>
                <td data-label='Año'>${pelis.year}</td> 
                <td data-label='Descripción'>${pelis.description}</td> 
                <td data-label='Género'>${pelis.genre}</td> 
                <td data-label='Imagen'><img src=${pelis.url}></td> 
        `;
            listaPelis.appendChild(table);   
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderListaPelis(pelis);
});

/********************Envio del formulario ****************/

document.getElementById('pelisform').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = event.target.elements.name.value.trim();
    const year = event.target.elements.year.value;
    const description = event.target.elements.description.value.trim(); 
    const url = event.target.elements.url.value.trim();
    const genre = event.target.elements.genre.value.trim();

    /********************* Validacion *********************/

let msj = '';

if (name.length < 1 || name.length > 50) {
    console.log('Nombre fuera de rango: 1-50');
    msj += 'Nombre fuera de rango: 1-50\n';
}

const minDate = 1800;
const currentDate = new Date();

if (year === '' || (year < minDate || year > currentDate.getFullYear())) {
    console.log('Fecha incorrecta, no existen peliculas anteriores al año 1800 o posteriores al año actual');
    msj += 'Fecha incorrecta, no existen peliculas anteriores al año 1800 o posteriores al año actual\n';
}

if (description.length < 3 || description.length > 100) {
    console.log('Descripcion fuera de rango: 3-100');
    msj += 'Descripcion fuera de rango: 3-100\n';
}

const genreValid = ['Accion', 'Terror', 'Comedia', 'Romantica'];

if (!genreValid.includes(genre)) {
    console.log('Género no valido');
    msj += 'Género no valido\n';
}

const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;

if (!regex.test(url)){
    console.log('URL no es valido');
    msj += 'URL no es valido\n';
} 

if (msj.length !=0) {
    alert(msj);
    let p = document.createElement('pre');
    let message = document.createTextNode(msj);
    p.style.color = '#DD1C1A';
    p.style.fontSize = '16px';
    p.appendChild(message);

     document.getElementById('pelisform').appendChild(p)
}
else  {
        const nuevaPeli = {name, year, description, url, genre};
        pelis.push(nuevaPeli);
        renderListaPelis(pelis);
        event.target.reset();
    }
})

/***************** Filtro *****************/

function filterByGenre(genre) {
    for(let i=0; i< pelis.length; i++)
        if(pelis[i].genre === genre) {
            return pelis[i];
        }

}           

document.getElementById('filtropelis').addEventListener('change', function () {
    const genre = this.value;
    const peli = filterByGenre(genre);

    const listaPelis = document.getElementById('pelis');
    listaPelis.innerHTML = '';

    if(peli) {
        const table = document.createElement('tr');
        table.innerHTML =`
                <td data-label='Nombre'>${peli.name}</td>
                <td data-label='Año'>${peli.year}</td> 
                <td data-label='Descripción'>${peli.description}</td> 
                <td data-label='Género'>${peli.genre}</td> 
                <td data-label='Imgen'><img src=${peli.url}></td> 
        `;
        listaPelis.appendChild(table);
    } else if(genre === 'all'){ renderListaPelis(pelis);
    } else {
        listaPelis.innerHTML = '<p>Ninguna pelicula encontrada con este genero.</p>';
    }
});

