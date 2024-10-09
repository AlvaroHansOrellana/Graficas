let nombres;
let anios;
let nombrePersonaje;
let nombrePelicula;

const starWars = async () => {
  try {
    let response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    let resultados = data.results;
    nombres = data.results.map(results => results.title);

    let years = data.results.map(results => results.release_date);
    anios = years.map(year => year.slice(0, 4));
    console.log(anios);
    console.log(resultados, nombres, years);

    let responseDos = await fetch ('https://swapi.dev/api/people/');
    const dataDos = await responseDos.json();
    if (!responseDos.ok) {
      throw new Error(`Error HTTP: ${responseDos.status} - ${responseDos.statusText}`);
    }
    let resultadosDos = dataDos.results;
    nombrePersonaje = dataDos.results.map(results => results.name)
    let nombrePeliculass = dataDos.results.map(results => results.films)
    nombrePelicula = nombrePeliculass.map(pelixs => pelixs.length)

  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error.message);
    
  };

}
starWars();

const pintores = async () => {
  await starWars()
  new Chartist.Line('.ct-chart', {
    labels: nombres,
    series: [
      anios,
    ]
  }, {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  })

  new Chartist.Bar('.ct-chartDos', {
    labels: nombrePersonaje,
    series: [
      nombrePelicula
    ]
  }, {
    seriesBarDistance: 500,
    reverseData: true,
    horizontalBars: true,
    axisY: {
      offset: 70
    }
  });


};

pintores();
