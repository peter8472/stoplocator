import {updateStatus} from './util.js'
var stoplist;
// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
function showStops(stoplist) {
  var output= document.getElementById("output")
  var m1 = document.getElementById("matcher");
  while (output.hasChildNodes()) {
    output.removeChild(output.firstChild); // memory leak
  }
  var regex =  new RegExp(m1.value, "i")

  for (var i of stoplist) {
    if (i.stop_name.match(regex)) {
      var stop = document.createElement("bus-stop",{"is": "bus-stop"});
      stop.setAttribute("stop_name",  i.stop_name);
      stop.setAttribute("stop_code",  i.stop_code);
      output.appendChild(stop);
    }
  }
  // for (var i of stoplist) {
  //   var row = document.createElement("tr")
  //   var namecell = document.createElement("td")
  //   var codecell = document.createElement("td")
  //   namecell.innerText = i.stop_name;
  //   codecell.innerText = i.stop_code;
  //   row.appendChild(namecell);
  //   row.appendChild(codecell);
  //   output.appendChild(row)
  // }

}
window.addEventListener("load", function() {
  this.fetch("stops.json").then(function(response) {
    response.json().then(function(answer) {
      //updateStatus(answer)
      showStops(answer)
      stoplist = answer;

      

    })
    

  })
});
document.getElementById("reload").addEventListener("click", 
function clearAndReload() {
  window.caches.keys().then(function(answer) {
    window.caches.delete(answer);
    window.location.reload();
  })

});
document.getElementById("matcher").addEventListener("input", function(event) {
  showStops(stoplist);
  
});