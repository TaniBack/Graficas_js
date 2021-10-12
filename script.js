/*Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
En el eje X el nombre de la película -- En el eje Y año de publicación*/

let filmsURL;
let filmTitle=[];
let filmReleaseDate=[];
const urlStarWars = ('https://swapi.dev/api/')

async function getMovies () {
    let filmsURL = await fetch(`${urlStarWars}films/`)
    .then(res=>res.json())
    .then(response => {
        for(let i=0; i<response.results.length; i++){
        filmTitle.push(response.results[i].title)
        filmReleaseDate.push(response.results[i].release_date.substring(0,4))
    }
    paintGraphic(filmTitle, filmReleaseDate) //lamamos a la funcion que pinta la grafica pasando como parametros las variables antes declaradas 
})
    .catch(error=>console.log(error));
}

getMovies()

const paintGraphic = (titles, dates) => {
    let data = {
        labels: titles,
        series: [dates]
  };
  new Chartist.Line('#chart1', data);  
}

/*Pediremos los personajes de Star Wars y pintaremos una gráfica de barras en la que podamos ver. En el eje X el nombre del personaje -- En el eje Y el número de películas en las que ha participado.*/
let peopleURL;
let characterName=[];
let characterFilms=[];

async function getCharacter () {
    let peopleURL = await fetch(`${urlStarWars}people`)
    .then(res => res.json())
    .then(response => {
        for(let i=0; i<response.results.length; i++){
            characterName.push(response.results[i].name)
            characterFilms.push(response.results[i].films.length)
        }
        paintSecondGraphic(characterName, characterFilms) //lamamos a la funcion que pinta la grafica pasando como parametros las variables antes declaradas 
    })
        .catch(error=>console.log(error));
    }
    
getCharacter()


const paintSecondGraphic = (character, films) => {
    let secondData = {
    labels: character,
    series: [films]
  };
  
let options = {
    seriesBarDistance: 10
  };
  
  let responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  new Chartist.Bar('#chart2', secondData, options, responsiveOptions);
}