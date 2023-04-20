import { ADATLISTA } from "./adat.js";
import { Rendezes } from "./rendezes.js"
import { szures } from "./rendezes.js"
const NEVINPUTELEM=$("#nev1")
const FAJTAINPUTELEM=$("#fajta1")

$(document).ready(function () {
  init();
  
  NEVINPUTELEM.on("keyup" ,function(){
    const articleElem = $("article");
    let nevErtek = NEVINPUTELEM.val()
    let szurtlista=szures(ADATLISTA,"nev",nevErtek)
    articleElem.html(osszeAllit(szurtlista));
    
    })
  
  $(document).ready(function () {
  init();

  $('#ujElemBtn').on('click', function() {
    showNewElemForm();
  });
  
  // ...
});
});

function init() {
  const articleElem = $("#an");
  articleElem.html(osszeAllit(ADATLISTA));
 
  $('.törlés').on('click', function() {
    removeItem($(this).closest('tr').index() - 1);
  });
  $("#knev, #kfajta, #kkor").on("click", function (event) { // hozzáadtam az event paramétert
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
    txt += `<tr>`;
    for (const key in lista[index]) {
      txt += `<td>${lista[index][key]}</td>`;
    }
    txt += '<td><button class="törlés">❌</button></td>'
    txt += `</tr>`;
  }
  txt += `</table>`;
  return txt;
}

function removeItem(index) {
  ADATLISTA.splice(index, 1);
  init();
}

function showNewElemForm() {
  const formElem = `
    <form id="newElemForm">
      <label for="nev">Név:</label>
      <input type="text" id="nev" name="nev"><br><br>
      <label for="fajta">Fajta:</label>
      <input type="text" id="fajta" name="fajta"><br><br>
      <label for="kor">Kor:</label>
      <input type="number" id="kor" name="kor"><br><br>
      <button type="submit">Hozzáadás</button>
    </form>
  `;
  const articleElem = $("article");
  articleElem.html(formElem);
  
  $("#newElemForm").on("submit", function(event) {
    event.preventDefault();
    
    const nev = $("#nev").val();
    const fajta = $("#fajta").val();
    const kor = $("#kor").val();
    
    ADATLISTA.push({
      nev: nev,
      fajta: fajta,
      kor: kor
    });
    
    init();
  });
}

function hideNewElemForm() {
  const articleElem = $("article");
  articleElem.html(osszeAllit(ADATLISTA));

  $(".törlés").on("click", function () {
    removeItem($(this).closest("tr").index() - 1);
  });

  $("#knev, #kfajta, #kkor").on("click", function (event) {
    const id = $(event.target).attr("id");
    Rendezes(ADATLISTA, id.slice(1));

    init();
  });

  $("#ujElemBtn").on("click", function () {
    showNewElemForm();
  });
}

$('#ujElemBtn').on