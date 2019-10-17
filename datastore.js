

import { haver, feetToDegrees, feet,directionTo } from './haver.js';


var mydb;
var objectStore = {
    openCursor: function() {
        alert("objstore not initialised")
    }

}
var originStore = { // usually our location
    openCursor: function() {
        alert("originstore not initilaized");
    }
}
const MAXENTRY = 100000 // taking too long.
function startUp() {
    var mydbreq = window.indexedDB.open("yologeo", 2)
    mydbreq.onerror = function(event) {
        mylog("error opening databsae")
    }
    mydbreq.onsuccess = function(event) {
        mylog("success opening dartabase");
        mydb = mydbreq.result;

        //console.log(mydb);
    }
    mydbreq.onupgradeneeded = function(event) {
        mydb = event.target.result;
        mydb.onerror = function(event) {
            mylog("error loading database ")

        }
        mydb.onsuccess = function(event) {
            mylog("done upgrading database")
        }
        switch (event.oldVersion) {
            case 0:
                objectStore = mydb.createObjectStore("addys", {
                    autoIncrement: true
                });

                objectStore.createIndex("X", "X", { unique: false });
                objectStore.createIndex("Y", "Y", { unique: false });
            case 552:
                
                originStore = mydb.createObjectStore("origins", {
                    
                })
        }



        }

}

function addPoints(pointList) {
    if (mydb) {

        var transaction = mydb.transaction(["addys"], "readwrite");
        transaction.oncomplete = function(event) {
            //console.log("all done");
        };
        transaction.onerror = function(event) {
            alert("error" + event);
        };
        var ostore = transaction.objectStore("addys");
        for (let point of pointList) {
            point['X'] = Number(point['X'])
            point['Y'] = Number(point['Y'])
            var req = ostore.add(point);
        }

        req.onsuccess = function(event) {
            console.log("add object success");
        };
        req.onerror = function(event) {
            alert("add object failuer");
        };





    }
}
class StatusWidget extends Component {

    render() {
        return <div>{this.props.isGetting}</div>
    }
}

class Near extends Component {
    constructor(props) {
        super(props);
        let dist = window.localStorage.getItem("maxDistance");
        this.state = {
            isGetting: "not yet getting",
            data: "no data yet",
            nearby: [],
            maxDistance: dist, // feet
            location: {
                "stop_lat": 38.558222567735427,
                "stop_lon": -121.758899370402233
            }
        }
        this.getBusData = this.getBusData.bind(this);
        this.nearby = this.nearby.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        //this.setLoc = this.setLoc.bind(this);
        this.formatter= this.formatter.bind(this);
        startUp();
    }
    formatter(arg) {
        return arg;
    }
    // eliminate if your'e not going to use it
    // setLoc(stop) {
    //     this.setState({
    //         location: stop
    //     });
    // }
    nearby() {

        var point = this.state.location;
        var outray = [];

        if (mydb) {
            var deltaX = feetToDegrees(this.state.maxDistance, 38);
            var deltaY = feetToDegrees(this.state.maxDistance);
            var lowerX = point['stop_lon'] - deltaX;
            var upperX = point['stop_lon'] + deltaX;
            this.lowerY = point['stop_lat'] - deltaY;
            this.upperY = point['stop_lat'] + deltaY;
            var oStore = mydb.transaction("addys").objectStore("addys");
            var index = oStore.index("X");

            /* global IDBKeyRange */
            var boundKeyRange = IDBKeyRange.bound(lowerX, upperX);

            index.openCursor(boundKeyRange).onsuccess = (event) => {

                var cursor = event.target.result;
                if (cursor) {
                    var dress = cursor.value['FULLADDRESS'] + " " + cursor.value['CITY']
                    //console.log(cursor.key + " " + dress);
                    if ((cursor.value['Y'] < this.upperY) &&
                        (cursor.value['Y'] > this.lowerY)) {
                        outray.push(cursor.value);
                    }
                    

                    cursor.continue()
                }
                else {
                    this.setState({
                        nearby: outray
                    })


                }
            }
        }

    }

    getBusData() {
        /* global fetch */
        fetch("https://d2kavtuns7iqh9.cloudfront.net/yg.json").
        then((response) => {

            this.setState({
                isGetting: "loaded, ready to parse"
            })
            return response.text()
        }).then((buffer) => {

            var stringRay = buffer.split("\r\n")
            buffer = "";
            var addrlist = [];
            if (stringRay[stringRay.length - 1] === '') {

                console.log("LAST ENTERY IS NULL")
                stringRay.pop();

            }
            /* break up the database tranactions into groups
            of 100.  This is to balance the cost of large 
            transactions against the cost of too many
            
            */
            const SLICESIZE = 100;
            const DONTUSE = stringRay.length - MAXENTRY;
            while (stringRay.length > (DONTUSE > 0 ? DONTUSE : 0)) {
                var tmpray = stringRay.splice(0, SLICESIZE);
                if (tmpray.length > 0)
                    addPoints(tmpray.map(function(instr) {
                        return JSON.parse(instr);
                    }));
            }

            this.setState({
                isGetting: "parse is done",
                data: addrlist

            })
        });
    }
    handleDistanceChange(event) {
        this.setState({
            "maxDistance": event.target.value
        });
        window.localStorage.setItem("maxDistance", event.target.value);
    }

    render() {
        var mytmp = "hello world";
        
        var unsortedstuff = this.state.nearby.map((item) => {
            item['dist'] = feet(item,this.state.location);
            return item;
        });
        unsortedstuff.sort(function compare(a,b) {
            return a.dist - b.dist;
        })
        var stuff = unsortedstuff.map((item, index) => {
            console.log(this.state.location)
            console.log(item)
            
    
            return <tr key={index.toString()}><td >{item.FULLADDRESS}</td><td> {item.dist.toFixed(0)}</td>
            <td>{
            directionTo(item,this.state.location,this.formatter).map((item) => {
                return <td>{item}</td>
            })}
                
                
                
            </td>
            
            
            </tr>
        });
    
        return <div>
            <Locate 
                tmphandler={(blah) => {
              var obj = {
                stop_lat: blah.coords.latitude,
                stop_lon: blah.coords.longitude,
                stop_name: "my location"
              }
              this.setState({ location: obj });
              }
              }
            
            
            
            />
            
            
            
            
            <button onClick={() => {
            this.nearby();
            }
            }>click to find points near you</button>
            
            
            
            <StatusWidget isGetting={this.state.isGetting}/>
            <input type="text" onChange={this.handleDistanceChange} 
             value={this.state.maxDistance} />
            <table>{this.state.data}</table>
            <table>{stuff}</table>
            <button onClick={() => {
                mydb.close();
                window.indexedDB.deleteDatabase("yologeo")
                /* global indexeddb */
            }}> delete the yolo addressdatabase</button>
            <button onClick={() => this.getBusData()}>load the 91,000 point yolo county address database</button>
            </div>
    }
}

export default Near;
