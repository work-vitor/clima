document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();
  clearInfo();

  let input = document.querySelector("#searchInput").value;

  if (input != "") {
    showWarning("Carregando...");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=550905a2e0689fadc5bec0cd4f9cae4c&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();

    console.log(json);
    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        climaIcon: json.weather[0].icon,
        climaTexto: json.weather[0].description,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      showWarning("Não encontramos esta localização");
    }
  }
});

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}

function showInfo(dados) {
  showWarning("");
  document.querySelector(
    ".titulo"
  ).innerHTML = `${dados.name}, ${dados.country}`;
  document.querySelector(".tempInfo").innerHTML = `${dados.temp} °C`;
  document.querySelector(".ventoInfo").innerHTML = `$(dados)`;

}
