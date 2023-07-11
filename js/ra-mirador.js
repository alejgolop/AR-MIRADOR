var data;
var swiper=undefined;

window.onload = () => {

  checkGeo().then((success)=>{
    if(success)
    {
      data=structuredClone(ARdata.features);
  renderData();

  //window.addEventListener( 'mouseup', onMouseClick, false );
  howTo();
    }
  });

  
};


function howTo()
{
Swal.fire({
  icon: 'info',
  title: 'Realidad Aumentada',
  text: 'Por favor, para un correcto funcionamiento mantén activada la localización del dispositivo móvil y permanece en zonas al aire libre.',
  showDenyButton: false,
  confirmButtonText:'Entendido',
 
});
}

function renderData()
{
    let scene = document.querySelector('a-scene');
    data.forEach((arPoint,index) => {
        let latitude = arPoint.geometry.coordinates[1];
        let longitude = arPoint.geometry.coordinates[0];
 
        let element = document.createElement('a-image');
        element.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        element.setAttribute('clickhandler', '');
        element.setAttribute('src', "#info-icon" );
        element.setAttribute('look-at', '[gps-camera]');
        element.setAttribute('height', '10');
        element.setAttribute('width', '10');
        element.setAttribute('ardataid', ""+index);
        /*element.addEventListener('click', (event) => {
            alert("Click");
            var elem=findNameByPosition(event.target.getAttribute("ardataid"));
            alert("You Clicked on "+elem.name+" !");
          })*/

          let marginElement=  document.createElement('a-plane');
          marginElement.setAttribute('clickhandler', '');
          marginElement.setAttribute('visible', 'false');
          marginElement.setAttribute('height', '60');
          marginElement.setAttribute('width', '60');
          marginElement.setAttribute('ardataid', ""+index);
     
          element.appendChild(marginElement);
   
        scene.appendChild(element);
 
    });
}

function findNameByPosition(id)
{
    return data[id];
}

function showPOI(poi)
{
    $(".swiper-wrapper").empty();
    if(swiper)
    {
      swiper.destroy();
    }


        if(poi.properties.images && poi.properties.images.length>0)
        {
        
        poi.properties.images.forEach((image,index)=>{
           const imgTitle='Imagen '+poi.properties.name+" "+(index+1);
                    $(".swiper-wrapper").append('<div class="swiper-slide"><img src="'+image+"?rnd="+Math.random()+'" title="'+imgTitle+'"  alt="'+imgTitle+'"></div>')

        });

          swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
  
   
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
          
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
           });
        
        }







    $('#poi-title').text(poi.properties.name);
    $('#poi-body').html(poi.properties.desc);
    $('#modal-poi').modal("show");
}

