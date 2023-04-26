function plotBar(path, id){
    d3.csv(path, d3.autoType).then((data) => {
      console.log(data)
      let chart = Plot.plot({
        grid: true,
        marks: [
          Plot.barY(data.filter(d=> d.domicilio_barrio == "PALERMO" ),
          Plot.groupX({y: "count"}, {x:"mes",fill:'#c7302f'})),
        ],
        y:{
          grid:true,
          label: "Cantidad denuncias",
          labelOffset : 30
        },                 
        x:{
          label: "Mes",
          labelAnchor: "right",
          tickLabelAnchor: "start",
          labelOffset : 40
        },
        marginLeft: 100,
        marginBottom: 50,
        // height: 700,
        width: 800,
        style:{
          fontFamily: "Courier new",
          fontSize: 12,
        },
      });
      d3.select(id).append(() => chart)
    })
  }