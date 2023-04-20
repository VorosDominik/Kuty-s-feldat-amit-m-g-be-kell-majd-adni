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

  $(".megvizsgal").on("click", function (event) {
    const index = $(event.target).data("index");
    console.log("Megvizsgál", ADATLISTA[index]);
    showModal(index);
    const modalBody = $(".modal-body");
    modalBody.append(`<a href="#" class="btn btn-success kosarba-tesz-modal" data-index="${index}">Kosárba tesz</a>`);
    modalBody.append(`<a href="#" class="btn btn-secondary">Tovább böngészek</a>`);
    $('.kosarba-tesz-modal').on('click', function() {
      const index = $(this).data("index");
      console.log("Kosárba tesz (modális)", ADATLISTA[index]);
    });
  });
  

  $(".kosarbaTesz").on("click", function (event) {
    const index = $(event.target).data("index");
    console.log("Kosárba tesz", ADATLISTA[index]);
  });

  $("#knev, #kfajta, #kkor").on("click", function (event) {
    const id = $(event.target).attr("id");
    Rendezes(ADATLISTA, id.slice(1));
    init();
  });
}

  
function osszeAllit(lista) {
  let txt = "";

  txt += `<div class="row row-cols-1 row-cols-md-3 g-4">`;
  for (let index = 0; index < lista.length; index++) {
    txt += `
      <div class="col">
        <div class="card h-100">
          <img class="card-img-top" src="kepek/23927031092.jpg" alt="kutya kép">
          <div class="card-body">
            <h4 class="card-title">${lista[index].nev}</h4>
            <p class="card-text">fajta: ${lista[index].fajta}</p>
            <button type="button" class="btn btn-success megvizsgal" data-index="${index}">Megvizsgál</button>
            <button type="button" class="btn btn-secondary kosarba-tesz" data-index="${index}">Kosárba tesz</button>
          </div>
        </div>
      </div>`;
  }

  txt += `</div>`;

  return txt;
}
function removeItem(index) {
  ADATLISTA.splice(index, 1);
  init();
}
    function showModal(index) {
      let card = $(`.card:eq(${index})`);
      let modalContent = card.clone();
      const modal = $("<div>").addClass("modal");
      const closeButton = $("<button>").addClass("close-button").text("×");
      const leftButton = $("<button>").addClass("modal-nav-button left-button").html("<");
      const rightButton = $("<button>").addClass("modal-nav-button right-button").html(">");
      const modalContainer = $("<div>").addClass("modal-container").append(closeButton, leftButton, modalContent, rightButton);
      
      modal.append(modalContainer);
      $("body").append(modal);
      
      closeButton.on("click", function() {
        modal.remove();
      });
      
      leftButton.on("click", function () {
        const prevCard = card.prev(".card");
        if (prevCard.length > 0) {
          modalContent.remove();
          modalContent = prevCard.clone();
          modalContainer.prepend(modalContent);
          card = prevCard;
        }
      });
      
      rightButton.on("click", function () {
        const nextCard = card.next(".card");
        if (nextCard.length > 0) {
          modalContent.remove();
          modalContent = nextCard.clone();
          modalContainer.prepend(modalContent);
          card = nextCard;
        }
      });
      
      modal.show();
    }