console.log(collisions)
const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576


//RENDER COLISSION map image size 70*40, row width = 70, render by 1 row, and got 40 columns = 40 arrays in colissionsMap array
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70))
}
console.log(collisionsMap)






//OFFSETS
const offset = {
    x: -735,
    y: -620
}

const boundaries = []

//sort each width array X position
collisionsMap.forEach((row, i) => {
    //sort each height array Y position, but not 0 empty value
    row.forEach((symbol, j) => {
        if(symbol === 1025) {
            boundaries.push(
                new Boundary ({
                    //multiple Y=i and X=j cords for tile size 48                
                    position:{
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }        
    })
})

console.log(boundaries)


c.fillStyle = 'orange'
c.fillRect(0, 0, canvas.width, canvas.height)

//BACKGROUND
const image = new Image()
image.src = './images/elletTown.png'
//PLAYER
const playerImage = new Image()
playerImage.src = './images/playerDown.png'
//FOREGROUND
const foregroundImage = new Image()
foregroundImage.src = './images/foregroundObjects.png'



//PLAYER IMAGE
const player = new Sprite({
    position: {
        //192*68 its player image(all position) file size
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

//BG IMAGE
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

//FOREGROUND
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
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

//array of all movable const


const movables = [background, ...boundaries, foreground]

function rectangularColission ({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    )

}

//REFRESH ANIMATION
function animate() {
    window.requestAnimationFrame(animate)
    //draw BG map image
    background.draw()

    //draw colissions map
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    //draw player
    player.draw()
    //draw foreground
    foreground.draw()



    


////////////////////
//HOTKEYS CONTROLL//
////////////////////
let moving = true

    if(keys.w.pressed && lastkey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            //how player connect with collision
            if (
                rectangularColission({
                    rectangle1:player,
                    rectangle2:{...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {console.log('colliding')
                moving = false
                break
            }

        }

        if(moving) {
            movables.forEach(movable => {movable.position.y += 3})
        }
    }
    else if(keys.a.pressed && lastkey === 'a') {

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            //how player connect with collision
            if (
                rectangularColission({
                    rectangle1:player,
                    rectangle2:{...boundary, 
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {console.log('colliding')
                moving = false
                break
            }

        }

        if(moving) {
            movables.forEach(movable => {movable.position.x += 3})
        }

        
    } 
    else if(keys.s.pressed && lastkey === 's') {

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            //how player connect with collision
            if (
                rectangularColission({
                    rectangle1:player,
                    rectangle2:{...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {console.log('colliding')
                moving = false
                break
            }

        }

        if(moving) {
            movables.forEach(movable => {movable.position.y -= 3})
        }
        
    } 
    else if(keys.d.pressed && lastkey === 'd') {

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            //how player connect with collision
            if (
                rectangularColission({
                    rectangle1:player,
                    rectangle2:{...boundary, 
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {console.log('colliding')
                moving = false
                break
            }

        }

        if(moving) {
            movables.forEach(movable => {movable.position.x -= 3})
        }

    } 


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
            keys.w.pressed = false
        break
        
        case 'a':
            keys.a.pressed = false
        break

        case 's':
            keys.s.pressed = false
        break

        case 'd':
            keys.d.pressed = false
        break

    }

})
