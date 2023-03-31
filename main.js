import { ADATLISTA } from "./adat.js";
import { Rendezes } from "./rendezes.js"

$(document).ready(function () {
  init();
  ('td').append('<button class="törlés">X</button>')
});

function init() {
  const articleElem = $("article");
  articleElem.html(osszeAllit(ADATLISTA));

  $("#knev, #kfajta, #kkor").on("click", function () {
    const id = $(event.target).attr("id");
    Rendezes(ADATLISTA, id.slice(1));
    init();
  });
}

function osszeAllit(lista) {
  let txt = "";

  txt += `<table class="table table-striped">`;
  txt += `<tr class="table-dark"><th id="knev">név</th>
    <th id="kfajta">fajta</th>
    <th id="kkor">kor</th>
    <th>remove</th>
    </tr>`;
  for (let index = 0; index < lista.length; index++) {
    txt += `<tr>`;
    for (const key in lista[index]) {
      txt += `<td>${lista[index][key]}</td>`;
    }
    txt += `<td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})"><i class="fas fa-times"></i></button></td>`;
    txt += `</tr>`;
  }
  txt += `</table>`;
  return txt;
}

function removeItem(index) {
  ADATLISTA.splice(index, 1);
  init();
}