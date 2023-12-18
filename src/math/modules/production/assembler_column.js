class AssemblerColumn extends ProductionModule {
    constructor(rect,topside=false){
        super(rect)
        
        let [x,y,w,h] = rect
        
        // drawing progress 
        this.ix = 0
        this.iy = 0
        
        this.pattern = randChoice([
            [
                "0         0",
                "0 111     0",
                "02111     0",
                "0 111211120",
                "0     111 0",
                "0 111211120",
                "02111     0",
                "0 111211120",
                "0     111 0",
                "0 111211120",
                "02111     0",
                "0 111     0",
            ],
            [
                "0     0",
                "0 111 0",
                "0211120",
                "0 111 0",
            ],
            [
                "0     0     0",
                "0 111 0 111 0",
                "0211120211120",
                "0 111 0 111 0",
            ],
            [
                "0     0     0",
                "0 111 0 111 0",
                "0 111 0 111 0",
                "0211120211120",
                "0211120211120",
                "0 111 0 111 0",
                "0 111 0 111 0",
            ],
            [
                "0     00     0",
                "0 111 00 111 0",
                "02111200211120",
                "0 1112002111 0",
                "0 1112002111 0",
                "02111200211120",
                "0 111 00 111 0",
            ],
        ])
        
        this.colors = [
            "#cea242","#025e8e","#275767","gray",
        ]
        
        let tw = global.tileWidth
        this.pw = (this.pattern[0].length) * tw
        if( this.pw <= 0 ) throw Error('pattern width not positive')
        this.ph = this.pattern.length * tw
        
        this.maxix = Math.floor( w/this.pw )
        this.maxiy = Math.floor( h/this.ph )
        
        // identify positions where belts should be connected
        let cps = [], i = -1;
        while ((i = this.pattern[0].indexOf('0', i + 1)) != -1) {
            if( topside ){
                cps.push(v(this.rect[0]+tw*i,this.rect[1]+this.maxiy*this.ph));
            } else {
                cps.push(v(this.rect[0]+tw*i,this.rect[1]));
            }
        }
        this.connectionPoints = cps
        this.topside = topside
    }
    
    draw(g){
        
        let tw = global.tileWidth
        let p = v( 
            this.rect[0]+this.ix*this.pw, 
            this.rect[1]+this.iy*this.ph 
        )

        //draw on repetition
        drawPattern( g,p, this.pattern, this.colors )
        
        //advance drawing position within alloted rect
        this.ix += 1
        if( this.ix >= this.maxix ){
            this.ix = 0
            this.iy += 1
            if( this.iy >= this.maxiy ){
                this.done = true
                
                // draw connection to main bus
                let r = this.rect, tw = global.tileWidth
                g.fillStyle = this.colors[0]
                this.connectionPoints.forEach( c => {
                    let rect,cy = global.mainBus.getRandomConnectionY()
                    if( this.topside ){
                        let y = r[1]+r[3]-.03
                        rect = [c.x,y,tw,cy-y]
                    } else {
                        rect = [c.x,cy,tw,r[1]-cy]
                    }
                    
                    let infront = (rand() > .9)
                    g.globalCompositeOperation = infront ? "source-over" : "destination-over"; 
                    for( let i = 0 ; i < this.maxix ; i++ ){
                        g.fillRect(...rect)
                        rect[0] += this.pw
                    }
                    g.globalCompositeOperation = "source-over"; 
                })
            
            }
        }
        
    }
    
}