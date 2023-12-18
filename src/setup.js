

// Initialize the game
function init() {
    var cvs = document.getElementById("gameCanvas");
    cvs.addEventListener("mousemove", mouseMove);
    cvs.addEventListener("click", mouseClick);
    global.canvas = cvs
    global.ctx = cvs.getContext("2d");
    
    resetRand()
    global.chunksPerRow = Math.floor(1/global.tileWidth)
    global.nChunks = Math.floor(Math.pow(global.chunksPerRow,2))
    global.filledChunks = new Array(global.nChunks);
    //var filledChunks = new Set()
    
    resetGame()
    requestAnimationFrame(gameLoop);
}


function resetGame(){
    fitToContainer()
    resetRand(hard=true)
    global.autoResetCountdown = global.autoResetDelay
    global.t = 0
    global.iterationsDrawn = 0
    
    let minx = global.screenCorners[0].x
    let maxx = global.screenCorners[2].x
    let mbt = .05 //main bus thickness
    let mbx = minx//randRange(minx+.01,minx+.05)
    let mbw = maxx//randRange(maxx-mbx-.05,maxx-mbx-.01)
    let mbr = [mbx,.5-mbt/2,mbw,mbt]// main bus bounding rect
    global.filledChunks.fill(false) 
    
    
    let mods = [
        //new SolarArray(tryAddRect(v(.5,.5))),
        new MainBus(mbr),
    ]     
    global.mainBus = mods[0]
    reserveRect(mbr)
    
    
    // assembler columns above main bus
    let mmw = global.minModuleWidth
    let hpad = 0
    let vpad = .01
    let maxh = mbr[1]-global.screenCorners[0].y - vpad*2
    let x = minx
    while( x < maxx ){
        let w = mmw
        if( rand() < .2 ) w *= randInt(2,5)
        let h = randRange( mmw, maxh )
        let rect = [x,mbr[1]-h, w,h]
        let ac = new AssemblerColumn(rect,true)
        let exactHeight = ac.maxiy * ac.ph
        rect[1] = mbr[1]-exactHeight-vpad
        mods.push( ac )
        reserveRect(rect)
        x += w + hpad
    }
    
    
    // assembler columns below main bus
    x = minx
    vpad = .004
    while( x < maxx ){
        let w = mmw
        if( rand() < .2 ) w *= 2
        let h = randRange( mmw, maxh )
        let rect = [x,mbr[1]+mbr[3]+vpad, w,h]
        let ac = new AssemblerColumn(rect)
        mods.push( ac )
        x += w + hpad
    }
    
    
    
    global.modulesBeingDrawn = mods
}


function fitToContainer(){
    
    var cvs = global.canvas
  cvs.style.width='100%';
  cvs.style.height='100%';  
  cvs.width  = cvs.offsetWidth;
  cvs.height = cvs.offsetHeight;
    
    var padding = 10; // (extra zoom IN) thickness of pixels CUT OFF around edges
    var dimension = Math.max(cvs.width, cvs.height) + padding*2;
    global.canvasScale = dimension;
    global.canvasOffsetX = (cvs.width - dimension) / 2;
    global.canvasOffsetY = (cvs.height - dimension) / 2;
    
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
    //global.ctx.fillStyle = global.backgroundColor
    //global.ctx.fillRect( 0, 0, cvs.width, cvs.height )
        
        var xr = -global.canvasOffsetX / dimension
        var yr = -global.canvasOffsetY / dimension
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
}



// Main game loop
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,50)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();

