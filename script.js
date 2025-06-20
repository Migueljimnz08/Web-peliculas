let pelis = [
    {
        name: 'Terminator',
        year: '18/01/1985',
        description: 'Un robot desnudo vuelve al pasado y persigue a una rubia',
        url: './assets/Terminator.jpg',
        genre: 'accion'

    },
    {
        name: 'Shrek',
        year: '13/07/2001',
        description: 'Un ogro y un burro en busca del amor',
        url:'./assets/Shrek.jpg',
        genre: 'comedia'
    },
    {
        name: 'Ghostland',
        year: '14/03/2018',
        description: 'Unos degenerados juegan a las muñecas',
        url: './assets/Ghostland.jpg',
        genre: 'terror',
    },
    {
        name: 'Titanic',
        year: '8/01/1998',
        description: 'La dama y el vagabundo en un crucero, live action',
        url: './assets/Titanic.jpg',
        genre: 'romantica'
    }
]


/******************* Render listas pelis ********************/

function renderListaPelis(datosPelis) {
    const listaDestinos = document.getElementById('pelis');
    listaDestinos.innerHTML = '';

    datosPelis.forEach((pelis) => {
        const table = document.createElement('table');
        table.innerHTML =`
        <tbody>
            <tr>
                <th><b>Nombre:</b></th>
                <th><b>Año:</b></th>
                <th><b>Descripción:</b></th>
                <th><b>Genero:</b></th>
                <th><b>Imagen:</b></th>
            </tr>
            <tr>
                <td data-label='name'>${pelis.name}</td>
                <td data-label='year'>${pelis.year}</td> 
                <td data-label='description'>${pelis.description}</td> 
                <td data-label='genre'>${pelis.genre}</td> 
                <td data-label='name'><img src=${pelis.url}></td> 
            </tr>
        `;
            listaDestinos.appendChild(table);   
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

if (name.length < 2 || name.length > 30) {
    console.log('Nombre fuera de rango: 2-30');
    msj += 'Nombre fuera de rango: 2-30\n';
}

const minDate =  Date('1800-01-01');

if (year === '' || year < minDate) {
    console.log('Fecha incorrecta, no existen peliculas anteriores al año 1800');
    msj += 'Fecha incorrecta, no existen peliculas anteriores al año 1800';
}

if (description.length < 3 || description.length > 50) {
    console.log('Descripcion fuera de rango: 3-50');
    msj += 'Descripcion fuera de rango: 3-50\n';
}

/*const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

if (!regex.test(url)){
    console.log('URL no es valido');
    msj += 'URL no es valido\n';
} */

if (msj.length !=0) {
    alert(msj);
    let p = document.createElement('pre');
    let message = document.createTextNode(msj);
    p.style.color = '#DD1C1A';
    p.style.fontSize = '16px';
    p.appendChild(message);

     document.getElementById('pelisform').appendChild(p)
}
else if (name && year && description && url && genre) {
        const nuevaPeli = {name, year, description, url, genre};
        pelis.push(nuevaPeli);
        renderListaPelis(pelis);
        event.target.reset();
    }

}
)

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

    const listaDestinos = document.getElementById('pelis');
    listaDestinos.innerHTML = '';

    if(peli) {
        const table = document.createElement('table');
        table.innerHTML =`
        <tbody>
            <tr>
                <th><b>Nombre:</b></th>
                <th><b>Año:</b></th>
                <th><b>Descripción:</b></th>
                <th><b>Genero:</b></th>
                <th><b>Imagen:</b></th>
            </tr>
            <tr>
                <td data-label='name'>${peli.name}</td>
                <td data-label='year'>${peli.year}</td> 
                <td data-label='description'>${peli.description}</td> 
                <td data-label='genre'>${peli.genre}</td> 
                <td data-label='name'><img src=${peli.url}></td> 
            </tr>
        `;
        listaDestinos.appendChild(table);
    } else if(genre === 'all'){ renderListaPelis(pelis);
    } else {
        listaDestinos.innerHTML = '<p>Ninguna pelicula encontrada con este genero.</p>';
    }
});

