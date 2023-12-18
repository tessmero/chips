class MainBus extends LogisticsModule{
    constructor(rect){
        super(rect)
        this.isMainBus = true
        
        let [x,y,w,h] = rect
        
        // drawing progress 
        this.ix = 0
        this.iy = 0
        
        this.pattern = [
            "0",
            "0",
            "0",
            "0",
            " ",
            " ",
        ]
        
        this.colors = [
            "#ffd200",
        ]
        
        let tw = global.tileWidth
        this.pw = (this.pattern[0].length) * tw
        if( this.pw <= 0 ) throw Error('pattern width not positive')
        this.ph = this.pattern.length * tw
        
        this.maxix = Math.floor( w/this.pw )
        this.maxiy = Math.floor( h/this.ph )
    }
    
    
    // get valid y position for a belt to connect
    getRandomConnectionY(){
        let ii = randInt(0,4)
        let i = randInt(0,this.maxiy)
        return this.rect[1] + this.ph*i + global.tileWidth*ii
    }
    
    draw(g){
        
        let tw = global.tileWidth
        let p = v( 
            this.rect[0]+this.ix*this.pw, 
            this.rect[1]+this.iy*this.ph 
        )
        
        //
        global.mainBusXPos = p.x

        //draw on repetition
        drawPattern( g,p, this.pattern, this.colors )
        
        //advance drawing position within alloted rect
        this.iy += 1
        if( this.iy >= this.maxiy ){
            this.iy = 0
            this.ix += 1
            if( this.ix >= this.maxix ){
                this.done = true
            }
        }
    }
}