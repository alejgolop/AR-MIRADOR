var geoPermissionStatus;

function noGeolocationModal() {
  Swal.fire({
    icon: "error",
    title: "Activa la Geolocalización",
    text: "Por favor, para un correcto funcionamiento mantén activada la localización del dispositivo móvil.",
    showDenyButton: false,
    confirmButtonText: "Ya la he activado",
  }).then((result) => {
    window.location = "";
  });
}

async function checkGeo()
{   geoPermissionStatus= await navigator.permissions.query({ name: "geolocation" });
    return new Promise((resolve, reject) => {
        
        //console.log(geoPermissionStatus);
        geoPermissionStatus.onchange = function () {
          console.log(
            "geolocation permission state has changed to ",
            geoPermissionStatus.state
          );
          if (geoPermissionStatus.state === "granted") {
            window.location = "";
          } else {
            noGeolocationModal();
          }
        };
      
        if (geoPermissionStatus.state !== "granted") {
          noGeolocationModal();
          resolve(false);
        }else{
            resolve(true);
        }
    

    });

}


