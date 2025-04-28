
//TILE CLASS
class Boundary {
//MAKE STATIC SIZE. OUR TILES 12*12, OUR MAP ZOOM 400%, MULTIPLE IT = 48*48
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}



//BASE CLASS SPRITE
class Sprite {
    constructor({position, velocity, image, frames = {max: 1}, sprites}) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height

            console.log(this.width)
            console.log(this.height)
        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y)
        //draw player
        c.drawImage(
            this.image,
            //x-cords
            this.frames.val * this.width,
            //y-cords
            0,
            this.image.width / this.frames.max,
            this.image.height, 

            this.position.x,
            this.position.y,

            this.image.width / this.frames.max,
            this.image.height
        )
        
        //no animation
        if(!this.moving) return
        //setting 10shots animation, with elapsed props
        if(this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed %10 === 0) {
            if (this.frames.val < this.frames.max -1) this.frames.val++
            else this.frames.val = 0
        }

    }
}

