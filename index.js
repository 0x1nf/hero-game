console.log('asd')
const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576


c.fillStyle = 'orange'
c.fillRect(0, 0, canvas.width, canvas.height)

//BACKGROUND
const image = new Image()
image.src = './images/elletTown.png'
//PLAYER
const playerImage = new Image()
playerImage.src = './images/playerDown.png'

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, -735, -600)
    }
}

const background = new Sprite({
    position: {
        x: -735,
        y: -600
    },
    image: image
})

function animate() {
    window.requestAnimationFrame(animate)
    console.log('animate')

    background.draw()

    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height, 
        canvas.width / 2 - playerImage.width / 4 / 2, 
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )

}
animate()

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            console.log('w press')
        break
        
        case 'a':
            console.log('a press')
        break

        case 's':
            console.log('s press')
        break

        case 'd':
            console.log('d press')
        break

    }

})
