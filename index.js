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

//BASE CLASS
class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

//BG IMAGE
const background = new Sprite({
    position: {
        x: -735,
        y: -600
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}
//REFRESH ANIMATION
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

    //HOTKEYS CONTROLL
    if(keys.w.pressed && lastkey === 'w') background.position.y += 3 
    else if(keys.a.pressed && lastkey === 'a') background.position.x += 3 
    else if(keys.s.pressed && lastkey === 's') background.position.y -= 3 
    else if(keys.d.pressed && lastkey === 'd') background.position.x -= 3 


}
animate()


//HOTKEYS
let lastkey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            lastkey = 'w'
            keys.w.pressed = true
        break
        
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
        break

        case 's':
            keys.s.pressed = true
            lastkey = 's'
        break

        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
        break

    }

})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            console.log('w press')
            keys.w.pressed = false
        break
        
        case 'a':
            console.log('a press')
            keys.a.pressed = false
        break

        case 's':
            keys.s.pressed = false
            console.log('s press')
        break

        case 'd':
            keys.d.pressed = false
            console.log('d press')
        break

    }

})
