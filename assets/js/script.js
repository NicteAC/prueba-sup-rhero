$(document).ready(function () {
  $("#boton").on("click", function () {
    const regExp =  /^[0-9]+$/gi;
    let idInput = $("#id_heroe").val();
   if(idInput !== "" && regExp.test(idInput) === true){
    $.ajax({
      type: "GET",
      url: `https://superheroapi.com/api.php/2205097786306548/${idInput}`,
      dataType: "json",
      success: function (datosApi) {
        console.log(idInput.match(regExp)); 
        $("#nombre").text(datosApi.name);
        $("#connections").text(datosApi.connections["group-affiliation"]);
        $("#publisher").text(datosApi.biography.publisher);
        $("#ocupacion").text(datosApi.work.occupation);
        $("#aparicion").text(datosApi.biography["first-appearance"]);
        $("#altura").text(datosApi.appearance.height);
        $("#peso").text(datosApi.appearance.weight);
        $("#alianza").text(datosApi.biography.aliases);
        $(function () {
          $("#imagen").attr("src", datosApi.image.url);
        });
        let superPoderesKeys = Object.keys(datosApi.powerstats);
        let superPoderesValues = Object.values(datosApi.powerstats);
        let estadistica = superPoderesValues.map((el, index) => { return { y: el, label: superPoderesKeys[index] } });
        let config = {
          animationEnabled: true,
          title: {
            text: "Estadisticas",
          },
          axisY: {
            title: "valor",
          },
          axisX: {
            title: "power stats",
          },
          data: [
            {
              indexLabel: "{label} ({y})",
              type: "pie",
              dataPoints: estadistica,
            },
          ],
        };
        let chart = new CanvasJS.Chart("chartContainer", config);
        chart.render();
      },
      error: function (error) {
        console.error(error);
      },
    });
   }else{
    alert("El id debe ser un numero entero");
   }
  });
});
