/*
This was predictions.js now I'm modifying it to show
the bus stops for each chosen route
*/

var busXML;
function getRouteByName(routename) {
    var url = "data/unitrans20191113.xml"
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(result) {
    for (var blah of busXML.getElementsByTagName("route")) {
        alert(blah.getAttribute("tag"))
    }
})



}

function grab() {
    
    var url = "data/unitrans20191113.xml"
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(result) {
        console.log(this.responseXML);
        var busorig = document.getElementById("busrow")
        var outdiv = document.getElementById("status")
        var dom  = this.responseXML;
        busXML = dom;
        for (var blah of dom.getElementsByTagName("route")) {
            for (var busrun of blah.getElementsByTagName("direction")) {
                if (busrun.getAttribute("useForUI") == "true") {
                    // console.log("use it")
                    console.log(busrun)
                } else {
                    // console.log("don't use it")
                }
            }
        }

        // dom.selectedStyleSheetSet = "mysheet";
        //document.getElementById("xmlview").innerHTML = dom;
        // for (var block of dom.getElementsByTagName("predictions")) {
        //     var temp = document.importNode(busorig.content, true);
            
        //     //var routeHeader = document.createElement("td")
        //     var routeTitle = document.createTextNode(block.getAttribute("routeTitle"));
        //     var stopTitle = document.createTextNode(block.getAttribute("stopTitle"));
            
            
        //     temp.getElementById("line").appendChild(routeTitle);
        //     temp.getElementById("stopTitle").appendChild(stopTitle);
        //     for (var pred of block.getElementsByTagName("prediction")) {
        //         var v  = document.createElement("td");
        //         var mytime = pred.getAttribute("epochTime")
        //         mytime = new Date(parseFloat(mytime)).toLocaleString();
        //         v.appendChild(
        //             document.createTextNode(mytime)
        //         )
        //         temp.getElementById("prediction").appendChild(v)


                
        //     }
            
        //     outdiv.appendChild(temp)

        // }

        
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
document.getElementById("show").addEventListener("click", 
 grab);

document.getElementById("matcher").addEventListener("input", function(event) {
  showStops(stoplist);
  
});``
getRouteByName("Q")