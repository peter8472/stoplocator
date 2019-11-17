// JavaScript File
// PLEASE PUBLISH THIS AS A MODULE
// IT IS USED IN TOO MANY PLACES

/* These functions compute distance between points on the earth
and the inverse 
From wikipedia:
hav(d/r) = hav(lat2 - lat1) + cos(lat1)cos(lat2)hav(lon2 - lon1)
https://stackoverflow.com/questions/7222382/get-lat-long-given-current-point-distance-and-bearing */

Math.radians = function(deg) {
    return (deg/360) * Math.PI * 2;
}

// class Point {
//     constructor (self, lat, lon) {
//         self.lat = lat;
//         self.lon = lon;
//     }
// }
function busVector(source, bus) {
    // ought to combine makestop and tostop
    return directionTo(source, makestop(bus));
    // body...
}

function directionTo(sourceOrig, destOrig, unitsFormatter) {
    // ''' gives the distance and directions from a source (such as a bus stop) to a
    // dest (such as a bus).  Or, the source could be the user, and the dest, the bus stop
    // '''
    var source = makestop(sourceOrig);
    var dest = makestop(destOrig);
    var fake = { // # to compute the distance north or east
        "stop_lat" : source['stop_lat'],
        "stop_lon" : dest['stop_lon']
        };
    var vert = feet(fake, dest).toFixed(0);
    var vdir, hdir;
    var horiz = feet(source, fake).toFixed(0);
    if (source['stop_lat'] > dest['stop_lat']) {// good enough for now, but does not handle edge cases
        vdir = " north"
    }    else {
        vdir = " south"
    }
    if (source['stop_lon'] > dest['stop_lon']) {
        hdir = " east"
        
    } else {
        hdir=" west"
    }
    if (unitsFormatter) {
        horiz = unitsFormatter(horiz ) + hdir
    vert = unitsFormatter(vert) + vdir
        
    }  else {
    horiz = format_distance(horiz ) + hdir
    vert = format_distance(vert) + vdir
    }
    return [horiz, vert];
    }
    

function makestop(bus) {
    // turn this coordinate pair into stop_lat, stop_lon
    // this old code was needed for GTFS files
    var tmp = {};
    var latvar ='stop_lat';
    var lonvar = "stop_lon";
    if ('latitude' in bus) {
        latvar = "latitude";
        lonvar = "longitude";
    } else if ("X" in bus) {
        latvar = "Y";
        lonvar = "X";
    }
    
    tmp["stop_lat"] = bus[latvar];
    tmp['stop_lon'] = bus[lonvar];

    return tmp;
}

    
        
function  haversine(x) {
    return Math.pow(Math.sin(x/2),2)
}

function  inversehav(under) {
    return 2.0 * Math.asin(Math.sqrt(under))
}
function sigma(old, current) {
    // """pass in the old stop and the new stop.
    // returns radians which should be multiplied by the radius of the earth
    // TODO backport this to haver in gtfs and my utility dir
        
    // """
    if (!( "stop_lat" in old)) {
        
        old = makestop(old)
    }
    if (!( "stop_lat"  in current)) {
        current = makestop(current);
    }
    
    var phi1 = Math.radians(+old['stop_lat'] );
    var phi2 =  Math.radians(+(current['stop_lat']));
    var gam1 =  Math.radians(+(old['stop_lon']) );
    var gam2 =  Math.radians(+(current['stop_lon']));
    var under = haversine(phi1 -phi2) + Math.cos(phi1) * Math.cos(phi2) * haversine(gam1-gam2);
    var sigma = inversehav(under);
    return sigma; // in radians I suppose
}

function format_distance(feet) {
    if (feet <  4) {
        return (feet.toString() + " ft");
    } else {
        return (feet/5280).toFixed(3) + " miles";
    }
    
}
function feetToDegrees(feet, latitude) {
    // give the latitude if you're doing 
    // the calculation on longitude
    const radius = 20925524.9; // radius of earth in ft
    var tmp = (feet / (Math.PI * radius * 2)) * 360;
    if (latitude) { // fails at pole
        return Math.cos(Math.radians(latitude)) * tmp;
    } else 
        return tmp;
    
    
}

function  feet(old,current) {
    
     var tmp = sigma(old,current) * 20925524.9; // radius of earth in ft
     return tmp;
}
// fixme: javascripot doesn't have named parameters
// func1tion pointAtDistance(latDeg1,lonDeg1,degrees, miles=null) {
//     // """code is from 
//     // https://stackoverflow.com/questions/7222382/get-lat-long-given-current-point-distance-and-bearing
//     // """
//     var R = 6378.1; // #Radius of the Earth
//     R = 3963.1676; //# miles
//     var brng = 1.57; //#Bearing is 90 degrees converted to radians.
//     brng = Math.radians(degrees);
//     var d = miles; //# miles

    

//     var lat1 = Math.radians(latDeg1); //#Current lat point converted to radians
//     var lon1 = Math.radians(lonDeg1); //#Current long point converted to radians

//     var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) +
//             Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng));

//     var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1),
//                     Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));

//     lat2 = Math.degrees(lat2);
//     lon2 = Math.degrees(lon2);

//     return lat2, lon2;
// }

    // needs fixing; javascript doesn't have named parameters
// function  buildPoly(stop, miles=null, steps=4){
//     // """
//     // returns a list of points distance from the given point
//     // in miles
//     // """
//     var lat = +stop['stop_lat'];
//     var lon = +stop['stop_lon'];
//     var pointList = [];
//     var stepSize = 360/steps;
//     for (let x = 0; x <= 360; x=x+stepSize) {
//         pointList.append(pointAtDistance(lat,lon,x,miles=miles));
//     }
//     return pointList;

// }
export { directionTo, busVector , feet,  feetToDegrees};


