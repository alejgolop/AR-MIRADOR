var data;
var swiper = undefined;

window.onload = () => {
  checkGeo().then((success) => {
    if (success) {
      data = [];
      ARdata.pois.forEach((poi) => {
        var processedPoi = structuredClone(poi);
        var procMedia = [];
        processedPoi.media.forEach((mediaItem) => {
          procMedia.push(ARdata.mediaOrigin + mediaItem);
        });
        processedPoi.media = procMedia;
        data.push(processedPoi);
      });
      //data = structuredClone(ARdata.features);
      renderData();

      //window.addEventListener( 'mouseup', onMouseClick, false );
      howTo();
    }
  });
};

function howTo() {
  Swal.fire({
    icon: "info",
    title: "Realidad Aumentada",
    text: "Por favor, para un correcto funcionamiento mantén activada la localización del dispositivo móvil y permanece en zonas al aire libre.",
    showDenyButton: false,
    confirmButtonText: "Entendido",
  });
}

function renderData() {
  let scene = document.querySelector("a-scene");
  data.forEach((arPoint, index) => {
    let latitude = arPoint.coordinates[1];
    let longitude = arPoint.coordinates[0];

    let element = document.createElement("a-image");
    element.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    element.setAttribute("clickhandler", "");
    element.setAttribute("src", arPoint.iconSpot.length>1?arPoint.iconSpot:"#info-icon");
    element.setAttribute("look-at", "[gps-camera]");
    element.setAttribute("height", "15");
    element.setAttribute("width", "15");
    element.setAttribute("ardataid", "" + index);
    /*element.addEventListener('click', (event) => {
            alert("Click");
            var elem=findNameByPosition(event.target.getAttribute("ardataid"));
            alert("You Clicked on "+elem.name+" !");
          })*/

    let marginElement = document.createElement("a-plane");
    marginElement.setAttribute("clickhandler", "");
    marginElement.setAttribute("visible", "false");
    marginElement.setAttribute("height", "90");
    marginElement.setAttribute("width", "90");
    marginElement.setAttribute("ardataid", "" + index);

    element.appendChild(marginElement);

    scene.appendChild(element);
  });
}

function findNameByPosition(id) {
  return data[id];
}

function showPOI(poi) {
  $(".swiper-wrapper").empty();
  swiper?.destroy();

  if (poi.media && poi.media.length > 0) {
    poi.media.forEach((media, index) => {
      const mediaTitle = "Multimedia " + poi.name + " " + (index + 1);

      var extension=media.substring(media.lastIndexOf('.'));
      var newElem;
      if (['.mp4','.webm','.avi'].includes(extension)) 
      {// Is a Video
        newElem=`<div class="swiper-slide"><video controls><source src="${media}" type="video/mp4"></video></div>`;
      }else{// Is an Image
        newElem=`<div class="swiper-slide"><img src="${media}?rnd=${ Math.random()}" title="${mediaTitle}" alt="${mediaTitle}"></div>`;
      }
      $(".swiper-wrapper").append(newElem);
    });

    swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  $("#poi-title").text(poi.name);
  $("#poi-body").empty();
  poi.brief.forEach((paragraph) => {
    $("#poi-body").append(`<p>${paragraph}</p>`);
  });
  $("#modal-poi").modal("show");
}
