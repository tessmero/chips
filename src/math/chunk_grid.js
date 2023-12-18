// optimize segment intersection checks
// by binning segments into a square grid
//
// assume that all segments are shorter than chunk width
// so a single segment can involve at most 3 chunks



// debug
function drawFilledChunks(g){
    var cw = global.tileWidth
    
    g.fillStyle = 'red'
    for( var i = 0 ; i < global.nChunks ; i++ ){
        if( global.filledChunks[i] ){
            var c = _chunkIdToCoords(i)
            g.fillRect(c[0]*cw, c[1]*cw, cw, cw)
        }
    }
}



// attempt to allocate space for a new module 
// return null or xywh if successful
function tryAddRect(p){
    let [px,py] = _getChunkCoords(p)
    let pi = _coordsToChunkId([px,py])  
    if( global.filledChunks[pi] ) return null // start point occupied
    
    // start growing
    let x=px, y=py, w=1, h=1
    let mw = 20
    while(true){
        let changed = false
        if( grow_right(x,y,w,h) ){
            w += 1
            changed = true
        }
        if( grow_left(x,y,w,h) ){
            x -= 1
            w += 1
            changed = true
        }
        if( grow_down(x,y,w,h) ){
            h += 1
            changed = true
        }
        if( grow_up(x,y,w,h) ){
            y -= 1
            h += 1
            changed = true
        }
        if( !changed ) break
    }
        
    
    if( (w>=mw) && (h>=mw) ){
        // success
        let t = global.tileWidth
        return [x*t,y*t,w*t,h*t] 
    }        
    
    // not enough space
    return null
}

function reserveRect(r){
    let [ix,iy] = _getChunkCoords(v(r[0],r[1]))
    let [jx,jy] = _getChunkCoords(v(r[0]+r[2],r[1]+r[3]))
    for( let x = ix ; x <= jx ; x++ ){
        for( let y = iy ; y<jy ; y++ ){
            global.filledChunks[_coordsToChunkId([x,y])] = true
        }
    }
}

function fc(x,y){
    let i = _coordsToChunkId([x,y])
    if( (i<0) || (i>=global.filledChunks.length) ) return true
    return global.filledChunks[i]
}

function grow_right(px,py,w,h){
    for( let dy=0 ; dy<h ; dy++ ){
        if( fc(px+w,py+dy) ){
            return false
        }                        
    }
    return true
}

function grow_left(px,py,w,h){
    for( let dy=0 ; dy<h ; dy++ ){
        if( fc(px-1,py+dy) ){
            return false
        }                        
    }
    return true
}

function grow_up(px,py,w,h){
    for( let dx=0 ; dx<w ; dx++ ){
        if( fc(px+dx,py-1) ){
            return false
        }                        
    }
    return true
}

function grow_down(px,py,w,h){
    for( let dx=0 ; dx<w ; dx++ ){
        if( fc(px+dx,py+h) ){
            return false
        }                        
    }
    return true
}

function _getChunkCoords(p){
    return [Math.floor(p.x/global.tileWidth),Math.floor(p.y/global.tileWidth)]
}

function _coordsToChunkId(c){
    return c[0]*global.chunksPerRow + c[1]
}

function _chunkIdToCoords(id){
    return [ Math.floor(id/global.chunksPerRow), id%global.chunksPerRow ]
}
