
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
    constructor({position, velocity, image, frames = {max: 1} }) {
        this.position = position
        this.image = image
        this.frames = frames
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height

            console.log(this.width)
            console.log(this.height)
        }
    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y)
        //draw player
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height, 

            this.position.x,
            this.position.y,

            this.image.width / this.frames.max,
            this.image.height
        )        
    }
}

