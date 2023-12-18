

class Module {

    constructor(rect){
        this.rect = rect
        let r = rect
        
        this.xlim = [r[0],r[0]+r[2]]
        this.ylim = [r[1],r[1]+r[3]]
    }

    contains(p){
        return (p.x>=this.xlim[0]) && (p.x<=this.xlim[1]) 
            && (p.y>=this.ylim[0]) && (p.y<=this.ylim[1])
    }

    // given an existing segment, 
    // determine where the next segment(s) will grow
    //  return list of length one to grow normally
    //  return list of length two to split into two branches
    //  return empty list to terminate branch
    grow(branch){
        throw new Error('Not implemented')
    }
  
}