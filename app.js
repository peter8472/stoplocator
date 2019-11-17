import { updateStatus } from './util.js'
// import { watch } from './geolocation.js';
import { feet } from './haver.js';

var stoplist;
var watchId = null;
var mylocation = null;
const ACCURACY_LIMIT = 5000; // for tseting
// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

function showStops(stoplist) {
  var output = document.getElementById("output")
  var m1 = document.getElementById("matcher");
  var max_dist = document.getElementById("max_dist").value;
  while (output.hasChildNodes()) {
    output.removeChild(output.firstChild); // memory leak
  }
  var regex = new RegExp(m1.value, "i")


  for (var i of stoplist) {
    if (max_dist) {
      if (mylocation !== null) {
        var blah = feet(mylocation.coords, i)
        
        if (blah > max_dist) {
          console.log(blah)
          continue; // too far away, skip
        }
      }
    }
    if (i.stop_name.match(regex)) {
      var stop = document.createElement("bus-stop", { "is": "bus-stop" });
      stop.setAttribute("stop_name", i.stop_name);
      stop.setAttribute("stop_code", i.stop_code);
      output.appendChild(stop);
    }
  }


}
window.addEventListener("load", function () {
  this.fetch("stops.json").then(function (response) {
    response.json().then(function (answer) {

      showStops(answer)
      stoplist = answer;
    })

  });
  this.document.getElementById("max_dist").value = window.localStorage.getItem("max_dist");
});
document.getElementById("reload").addEventListener("click",
  function clearAndReload() {
    window.caches.keys().then(function (answer) {
      window.caches.delete(answer);
      window.location.reload();
    })

  });
document.getElementById("matcher").addEventListener("input", function (event) {

  showStops(stoplist);

});
document.getElementById("max_dist").addEventListener("input", function (event) {
  window.localStorage.setItem("max_dist", event.target.value);
  showStops(stoplist);

});
function watch(event) {
  if (watchId != null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  window.localStorage.setItem("geo_perm", true);
  
    watchId = navigator.geolocation.watchPosition(
      function (pos) {
        if ((pos.coords.accuracy > ACCURACY_LIMIT)
          && (mylocation)
          && (mylocation.coords.accuracy < pos.coords.accuracy)) {
          // ignore this one, it is too inaccurate to help

        } else {
          mylocation = pos;
        }

      }, function failgeo(somethin) {
        alert(somethin.message)
        if (somethin.code == 1) {
          window.localStorage.setItem('geo_perm',false);
        }
      })
}
document.getElementById("geolocate").addEventListener("click", watch)
if (window.localStorage.getItem("geo_perm") == true) {
  watch()
}

