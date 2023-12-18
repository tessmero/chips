

function update(dt) {    
    global.t += dt
    
    global.autoResetCountdown -= dt
    if( global.autoResetCountdown < 0 ){
        resetGame()
    }
    
    // attempt to add module
if( true && global.mainBusXPos){// && (global.modulesBeingDrawn.length<2) ){
        let p = tryAddRect(v(randRange(0,global.mainBusXPos),rand()))
        if(p){
            
        
            // chunk_grid.js
            // mark chunks as occupied
            reserveRect(p)
            
            let r = rand()
            if( r > .5 ){
                global.modulesBeingDrawn.push(new SolarArray(p))
            } else {
                global.modulesBeingDrawn.push(new SolarArray(p))
            }
        }
    }
    
    // debug chunk grid
    //activeChunks = {}
    //addSegment( new Segment( global.mousePos, global.debugPoint ) )
}