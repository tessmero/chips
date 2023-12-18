class SolarArray extends ProductionModule {
    constructor(rect){
        super(rect)
        
        let [x,y,w,h] = rect
        
        // drawing progress 
        this.ix = 0
        this.iy = 0
        
        let [pat,pad] = randChoice([
            [[
                " 2222 33 ",
                " 2222 33 ",
                " 2222 33 ",
                " 2222 33 ",
                "122221331",
                " 2222 33 ",
                " 2222 33 ",
                " 2222 33 ",
                " 2222 33 ",
            ],-1],
            [[
                "23333",
                "22333",
                "22133",
                "22233",
                "22223",
            ],0]
        ])
        if( rand() < .5 ) pat = transposePattern(pat)
        if( rand() < .3 ) pat = snowflake1(pat)
        if( rand() < .3 ) pat = snowflake2(pat)
        this.pattern = pat
        
        this.colors = [
            "","#1a6997","#192021","#7b797b",
        ]
        
        let tw = global.tileWidth
        this.pw = (this.pattern[0].length+pad) * tw
        if( this.pw <= 0 ) throw Error('pattern width not positive')
        this.ph = this.pattern.length * tw
        
        this.maxix = Math.floor( w/this.pw )
        this.maxiy = Math.floor( h/this.ph )
    }
    
    draw(g){
        let tw = global.tileWidth
        let p = v( 
            this.rect[0]+this.ix*this.pw, 
            this.rect[1]+this.iy*this.ph 
        )

        //draw one repetition
        g.globalCompositeOperation = "destination-over";
        drawPattern( g,p, this.pattern, this.colors )
        
        //advance drawing position within alloted rect
        this.ix += 1
        if( this.ix >= this.maxix ){
            this.ix = 0
            this.iy += 1
            if( this.iy >= this.maxiy ){
                this.done = true
            }
        }
}

}