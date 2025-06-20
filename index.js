console.log(user)
console.log(`./images/${user.nft.color}Down.png`)
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

//RENDER BATTLEZONES MAP
const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, i + 70))
}
console.log(battleZonesMap)


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

const battleZones = []

battleZonesMap.forEach((row, i) => {
    //sort each height array Y position, but not 0 empty value
    row.forEach((symbol, j) => {
        if(symbol === 1025) {
            battleZones.push(
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
console.log(battleZones)


//BACKGROUND
const image = new Image()
image.src = './images/elletTown.png'
//PLAYER
const playerDownImage = new Image()
playerDownImage.src = `./images/${user.nft.color}Down.png`
//PET
const petImage = new Image()
petImage.src = `./images/pet${user.nft.pet}.png`
//u
const playerUpImage = new Image()
playerUpImage.src = `./images/${user.nft.color}Up.png`
//r
const playerRightImage = new Image()
playerRightImage.src = `./images/${user.nft.color}Right.png`
//l
const playerLeftImage = new Image()
playerLeftImage.src = `./images/${user.nft.color}Left.png`
//wep
const weaponImage = new Image()
weaponImage.src = `./images/weapon${user.nft.weapon}.png`
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
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        right: playerRightImage,
        left: playerLeftImage,
        down: playerDownImage
    }
})

const weapon = new Sprite({
    position: {
        //192*68 its player image(all position) file size
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: weaponImage,
    frames: {
        max: 4
    },
    sprites: {
        up: '',
        right: '',
        left: '',
        down: ''
    }
})

const pet = new Sprite({
    position: {
        //192*68 its player image(all position) file size
        x: canvas.width / 2 - 192 / 3.5,
        y: canvas.height / 2 - 68 / 2
    },
    image: petImage,
    frames: {
        max: 4
    },
    sprites: {
        up: '',
        right: '',
        left: '',
        down: ''
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


const movables = [background, ...boundaries, foreground, ...battleZones]

function rectangularColission ({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    )

}

const battle = {
    initiated:false
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

    //draw battlezone map
    battleZones.forEach(battleZone => {
        battleZone.draw()
    })

    //draw player
    player.draw()
    weapon.draw()
    pet.drawPet()
    //draw foreground
    foreground.draw()    


////////////////////
//HOTKEYS CONTROLL//
////////////////////

//variable for moving detect buy pressed hotkey
let moving = true
//player animation
player.moving = false
weapon.moving = false

if(battle.initiated) return
//ANOTHER BATTLEZONE, HALF PLAYER IMAGE COLLISION
if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
        const battleZone = battleZones[i]
        //hard geometry things with colliding player with battlezones
        const overlappingArea = 
        (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) 
        - Math.max(player.position.x, battleZone.position.x))
        * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
        - Math.max(player.position.y, battleZone.position.y))

        //how player connect with battlezone collision
        if (
            rectangularColission({
                rectangle1: player,
                rectangle2: battleZone
            }) &&
            //with math random chance to start detecting colliding, when player on zone random 1=100%, now 0.02 = 2%
            overlappingArea > (player.width * player.height) / 2
            && Math.random() < 0.02
        ) {
            console.log('battle zone activated')
            battle.initiated = true
            //activate animation for overlaying div with battle
            gsap.to('#ol', {
                opacity: 1,
                repeat: 3,
                yoyo: true,
                duration: 0.4,
                onComplete() {
                    gsap.to('#ol', {
                        opacity: 1,
                        duration: 2,
                    })
                }
            })
            
            break
        }
    }
}


    if(keys.w.pressed && lastkey === 'w') {
        player.moving = true
        weapon.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            //how player connect with collision
            if (
                rectangularColission({
                    rectangle1: player,
                    rectangle2: {...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if(moving) {
            movables.forEach(movable => {movable.position.y += 3})
        }
    }
    
    else if(keys.a.pressed && lastkey === 'a') {
        player.moving = true
        player.image = player.sprites.left
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
        player.moving = true
        weapon.moving = true
        player.image = player.sprites.down
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
        player.moving = true
        player.image = player.sprites.right
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
