

function drawTree(g){

    
    var n = Math.min( global.maxGrowthIterations,
            Math.floor( global.t / global.growthDelay ) )
            
    for( var i = global.iterationsDrawn ; i < n ; i++ ){
        global.modulesBeingDrawn = global.modulesBeingDrawn.filter( m => !m.done )
        global.modulesBeingDrawn.forEach( s => {
            if( (!s.isMainBus) && ((s.rect[0]+s.rect[2]) > global.mainBusXPos )) return
            s.draw(g)
        } )
        //global.modulesBeingDrawn = global.segsToDraw.flatMap(s => tree.grow(s))
    }
    
    global.iterationsDrawn = n
}
    
    
// Render graphics
function draw(fps, t) {
   var ctx = global.ctx
   let g = ctx
   var canvas = global.canvas
   
    //ctx.clearRect( 0, 0, canvas.width, canvas.height )

    // draw tree
    drawTree(ctx)
    
    
    // debug draw corners
    if( false ){
        global.screenCorners.forEach( c => {
            g.fillStyle = 'red'
            g.beginPath()
            g.moveTo(c.x,c.y)
            g.arc(c.x,c.y,.1,0,twopi)
            g.fill()
        })
    }
    
    // debug draw connection points
    if( false ){
        global.modulesBeingDrawn.forEach( m => {
            if( m.connectionPoints ){
                m.connectionPoints.forEach( c => {
                    g.fillStyle = 'red'
                    g.fillRect(c.x,c.y-.02,global.tileWidth,.04)
                })
            }
        })
    }
    
    //debug
    //drawFilledChunks(ctx)
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}