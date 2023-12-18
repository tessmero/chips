// shorthands
var pi = Math.PI
var pio2 = Math.PI/2
var twopi = 2*Math.PI
function v(){return new Vector(...arguments)}
function vp(){return Vector.polar(...arguments)}


function randRange(min,max){
    return min + rand()*(max-min)
}

function randInt(min,max){
    return Math.floor(randRange(min,max))
}

function randChoice(options){
    return options[randInt(0,options.length)]
}


function avg(a,b,r=.5){
    return a*(1.0-r) + b*r
}

// used in segment.js
//
// given two points, get slope and intercept
function getMb(a,b){
    var m = (b.y-a.y)/(b.x-a.x)
    var b = a.y - m*a.x
    return {m:m,b:b}
}


function snowflake1(pattern){
    let rs = [pattern]
    while( rs.length < 4 ) rs.push(rotatePattern(rs[rs.length-1]))
    return hconcat(vconcat(rs[0],rs[1]),vconcat(rs[2],rs[3]))
}

function snowflake2(pattern){
    let r0 = pattern
    let r1 = transposePattern(pattern)
    return hconcat(vconcat(r0,r1),vconcat(r1,r0))
}

function vconcat(a,b){
    return a.concat(b)
}

function hconcat(a,b){
    let result = []
    for( let iy = 0 ; iy < a.length ; iy++ ){
        result.push( a[iy] + b[iy] )
    }
    return result
}

function rotatePattern(pattern){
    let result = []
    for( let ix = 0 ; ix < pattern[0].length ; ix++ ){
        let row = ""
        for( let iy = 0 ; iy < pattern.length ; iy++ ){
            row += pattern[iy].charAt(pattern[0].length-ix-1)
        }
        result.push(row)
    }
    return result
}

function transposePattern(pattern){
    let result = []
    for( let ix = 0 ; ix < pattern[0].length ; ix++ ){
        let row = ""
        for( let iy = 0 ; iy < pattern.length ; iy++ ){
            row += pattern[iy].charAt(ix)
        }
        result.push(row)
    }
    return result
}

function drawPattern(g,p,pattern,colors){
    let cw = global.tileWidth
    let cp = global.tilePadding
    
    for( let iy = 0 ; iy < pattern.length ; iy++ ){
        let row = pattern[iy]
        for( let ix = 0 ; ix < row.length ; ix++ ){
            let chr = row.charAt(ix)
            if( chr == ' ' ) continue
            let tp = v( p.x+ix*cw, p.y+iy*cw )
            
            // check if tile is already occupied
            //let [px,py] = _getChunkCoords(tp)
            //let pi = _coordsToChunkId([px,py])  
            //if( global.filledChunks[pi] ) return false
            
            // remember this tile is occupied
            //global.filledChunks[pi] = true
            
            // draw tile on screen
            g.fillStyle = colors[parseInt(chr)]
            g.fillRect( tp.x+cp, tp.y+cp, cw-2*cp, cw-2*cp )
            
        }
    }
    return true
}