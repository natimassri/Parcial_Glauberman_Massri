function plotMap(path, id,geojson){

  const mapaFetch = d3.json(geojson)
  const dataFetch = d3.dsv(';', path, d3.autoType)

  Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
    const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio)
    console.log('reclamosPorBarrio', reclamosPorBarrio)
    
    barrios.features.forEach(d => {
      let nombreBarrio = d.properties.BARRIO
      let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
      d.properties.DENUNCIAS = cantReclamos

      console.log(nombreBarrio + ': ' + cantReclamos)
    })

    let chartMap = Plot.plot({
      projection: {
        type: 'mercator',
        domain: barrios,
      },
      marks: [
        Plot.geo(barrios, {
          fill : d => d.properties.BARRIO != "PALERMO" ? d.properties.DENUNCIAS : 'transparent',
        }),
        Plot.geo(barrios, {
          fill : d=> d.properties.BARRIO == "PALERMO" ? '#c7302f' : 'transparent',
          stroke : 'gray',
          title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        }),

        Plot.text(
          barrios.features,
          Plot.centroid({
            text: (d) => d.properties.BARRIO,
            fill: "currentColor",
            stroke: "white",
            textAnchor: "center",
            dx: 4,
            filter: (d) => d.properties.DENUNCIAS > 80
          })
        )
      ],
      color: {
        type: 'quantize', 
        n: 9,
        scheme: 'greys',
        label: 'Cantidad de denuncias',
        legend: true,
      },
    })
    d3.select(id).append(() => chartMap)


  })
}