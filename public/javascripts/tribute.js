alert("test");

fetch("partials/nav.ejs")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#nav").innerHTML = data;
  });

alert("test");
const app = document.getElementById('root');

const logo = document.getElementById('image');
logo.src = "/public/images/logo.png";

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.append(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    })
  } else {
    const errorMessage = document.createElement("something's broken!");
    errorMessage.textContent = "broken";
    app.appendChild(errorMessage);
  }
}

request.send();