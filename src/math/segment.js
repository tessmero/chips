// directed line segment connecting two points

class Segment{
    constructor( start, end, depth=0, parentChunkIds=[] ){
        this.start = start
        this.end = end
        
        var d = end.sub(start)
        var angle = d.getAngle()
        this.d = d
        this.angle = angle
        
        this.depth = depth
        this.parentChunkIds = parentChunkIds
        this.chunkIds = getChunkIds(this)
    }
    
    draw(g){
        g.moveTo(this.start.x, this.start.y)
        g.lineTo(this.end.x, this.end.y)
    }
}