import { ADATLISTA } from "./adat.js";
import { Rendezes, szures } from "./rendezes.js";

const NEVINPUTELEM = $("#nev2");
const FAJTAINPUTELEM = $("#fajta");

$(document).ready(function () {
  init();

  NEVINPUTELEM.on("keyup", function () {
    const articleElem = $("article");
    let nevErtek = NEVINPUTELEM.val();
    let szurtlista = szures(ADATLISTA, "nev", nevErtek);
    articleElem.html(osszeAllit(szurtlista));
  });
});

function init() {
  const articleElem = $("#pc");
  articleElem.html(osszeAllit(ADATLISTA));

  $('.törlés').on('click', function() {
    removeItem($(this).closest('tr').index() - 1);
  });

  $("#knev, #kfajta, #kkor").on("click", function (event) {
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
      <th></th>
  
     
      </tr>`;
    for (let index = 0; index < lista.length; index++) {
      
      for (const key in lista[index]) {
        txt += `<div class="card" style="width:400px">
        <img class="card-img-top" src="img_avatar1.png" alt="Card image">
        <div class="card-body">
          <h4 class="card-title">${lista[index].nev}</h4>
          <p class="card-text">fajta : ${lista[index].fajta}</p>
          <a href="#" class="btn btn-primary">See Profile</a>
        </div>
      </div>`;
      
      }
     
     
    }
    txt += `</table>`;
    return txt;
  }

function removeItem(index) {
  ADATLISTA.splice(index, 1);
  init();
}