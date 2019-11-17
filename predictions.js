

var url = "https://webservices.nextbus.com/service/publicXMLFeed?command=predictionsForMultiStops&a=unitrans"

var mystops = [
    
         "P|22076", "P|22362", "Q|22077", 
         "A|22077", "Z|22077", "L|22102",
         "L|22103"
        
    

]

function grab() {
    
    for (let i of mystops) {
        url = url + `&stops=${i}`
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(result) {
        console.log(this.responseXML);
        var busorig = document.getElementById("busrow")
        var outdiv = document.getElementById("status")
        var dom  = this.responseXML;
        // dom.selectedStyleSheetSet = "mysheet";
        //document.getElementById("xmlview").innerHTML = dom;
        for (var block of dom.getElementsByTagName("predictions")) {
            var temp = document.importNode(busorig.content, true);
            
            //var routeHeader = document.createElement("td")
            var routeTitle = document.createTextNode(block.getAttribute("routeTitle"));
            var stopTitle = document.createTextNode(block.getAttribute("stopTitle"));
            
            
            temp.getElementById("line").appendChild(routeTitle);
            temp.getElementById("stopTitle").appendChild(stopTitle);
            for (var pred of block.getElementsByTagName("prediction")) {
                var v  = document.createElement("td");
                var mytime = pred.getAttribute("epochTime")
                mytime = new Date(parseFloat(mytime)).toLocaleString();
                v.appendChild(
                    document.createTextNode(mytime)
                )
                temp.getElementById("prediction").appendChild(v)


                
            }
            
            outdiv.appendChild(temp)

        }

        
    });
    var testing = false;
    if (testing) {
        console.log("test mode")
        xhr.open("GET", "predictions.xml")
    }
    else
        xhr.open("GET",url )
    
    xhr.send();

    
}
document.getElementById("predict").addEventListener("click", 
 grab);
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