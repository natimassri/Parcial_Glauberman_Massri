function plotMap_palermo(path, id,geojson1, geojson2){
  const mapaPalermo = d3.json(geojson2)
  const callesPalermo = d3.json(geojson1)
  const dataFetch = d3.dsv(';', path, d3.autoType)

  Promise.all([mapaPalermo, dataFetch, callesPalermo]).then(([palermo, dataRuidos, callesPalermo]) => {


    let chartMap = Plot.plot({
      projection: {
        type: 'mercator',
        domain: palermo,
      },
      marks: [
        Plot.geo(palermo, {
          stroke: 'grey',
          fill: 'transparent',
        }),
        Plot.geo(callesPalermo, {
          stroke: 'grey',
          fill: 'transparent',
        }),
        Plot.dot(dataRuidos.filter(d=> d.domicilio_barrio=="PALERMO"), {
          x: 'lon',
          y: 'lat',
          r: 2,
          stroke: 'none',
          fill: '#c7302f',
        }),
      ],
      
    })
    d3.select(id).append(() => chartMap)
  })
}