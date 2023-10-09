namespace SpriteKind {
    export const fire = SpriteKind.create()
    export const defence = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.fire, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 100)
    pause(2000)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.fire, SpriteKind.defence, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 100)
})
function Initialize () {
    if (fireInterval <= 3) {
        game.splash("LAST STAGE")
    } else {
        game.splash("STAGE " + stage + "/4")
    }
    stage += 1
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.fire)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    move = 5
    moveY = 0
    speed = 10
    fire = 3
    ready = 1
    scene.setTileMap(img`
        ...22222222222222...
        ...22222222222222...
        ...88888888888888...
        ...88888888888888...
        ...77777777777777...
        ...77777777777777...
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ...aa.aa.aa.aa.aa...
        ...cc.cc.cc.cc.cc...
        ....................
        ....................
        `, TileScale.Eight)
    for (let 値 of scene.getTilesByType(2)) {
        temporary = sprites.create(img`
            . . 1 1 1 . . . 
            1 1 1 1 1 1 1 . 
            1 1 . 1 . 1 1 . 
            1 1 1 1 1 1 1 . 
            . . 1 1 1 . . . 
            1 1 . 1 . 1 1 . 
            1 . . 1 . . 1 . 
            . . . . . . . . 
            `, SpriteKind.Enemy)
        scene.place(値, temporary)
    }
    for (let 値 of scene.getTilesByType(8)) {
        temporary = sprites.create(img`
            . 1 1 1 1 1 . . 
            1 1 1 1 1 1 1 . 
            1 1 1 1 1 1 1 . 
            1 . 1 1 1 . 1 . 
            1 1 1 1 1 1 1 . 
            . 1 . 1 . 1 . . 
            1 . 1 . 1 . 1 . 
            . . . . . . . . 
            `, SpriteKind.Enemy)
        scene.place(値, temporary)
    }
    for (let 値 of scene.getTilesByType(7)) {
        temporary = sprites.create(img`
            . . . 1 . . . . 
            . 1 1 1 1 1 . . 
            1 1 1 1 1 1 1 . 
            1 . 1 1 1 . 1 . 
            1 1 1 1 1 1 1 . 
            . 1 . 1 . 1 . . 
            . 1 . 1 . 1 . . 
            . . . . . . . . 
            `, SpriteKind.Enemy)
        scene.place(値, temporary)
    }
    for (let 値 of scene.getTilesByType(10)) {
        temporary = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . 1 1 1 1 1 1 . 
            1 . 1 1 1 . 1 1 
            1 1 1 1 1 1 1 1 
            1 1 . 1 1 1 1 . 
            1 1 1 1 . 1 . 1 
            . . 1 1 1 . 1 . 
            `, SpriteKind.defence)
        scene.place(値, temporary)
    }
    for (let 値 of scene.getTilesByType(12)) {
        temporary = sprites.create(img`
            . 1 1 1 . 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            1 . 1 1 1 . 1 1 
            1 1 1 1 1 1 1 1 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `, SpriteKind.defence)
        scene.place(値, temporary)
    }
    for (let yy = 0; yy <= 16; yy++) {
        for (let xx = 0; xx <= 20; xx++) {
            scene.setTileAt(scene.getTile(xx, yy), 0)
        }
    }
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    ready = 1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.defence, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 100)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ready == 1) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . 1 1 1 . . . 
            . . 1 1 1 . . . 
            . . 1 1 1 . . . 
            . . 1 . 1 . . . 
            `, mySprite, 0, -100)
        ready = 0
    }
})
let projectileFire: Sprite = null
let select: Sprite = null
let projectile: Sprite = null
let temporary: Sprite = null
let ready = 0
let fire = 0
let speed = 0
let moveY = 0
let move = 0
let mySprite: Sprite = null
let fireInterval = 0
let stage = 0
stage = 1
fireInterval = 6
Initialize()
mySprite = sprites.create(img`
    . . . 1 . . . . 
    . . 1 1 1 . . . 
    . . 1 1 1 . . . 
    . 1 1 1 1 1 . . 
    1 1 1 1 1 1 1 . 
    1 1 1 . 1 1 1 . 
    1 1 . . . 1 1 . 
    . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setPosition(80, 115)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
game.onUpdateInterval(100, function () {
    speed += -1
    if (speed <= 0) {
        for (let 値 of sprites.allOfKind(SpriteKind.Enemy)) {
            if (値.y > 120) {
                game.gameOver(false)
            } else if (値.y > 110) {
                sprites.destroyAllSpritesOfKind(SpriteKind.Player, effects.fire, 200)
            }
            if (値.x > 150) {
                move = -5
                moveY = -5
                break;
            } else if (値.x < 10) {
                move = 5
                moveY = 5
                break;
            }
        }
        for (let 値 of sprites.allOfKind(SpriteKind.Enemy)) {
            値.x += move
            値.y += Math.abs(moveY)
        }
        moveY = 0
        if (sprites.allOfKind(SpriteKind.Enemy).length > 14 * 5) {
            speed = 10
        } else if (sprites.allOfKind(SpriteKind.Enemy).length > 14 * 4) {
            speed = 8
        } else if (sprites.allOfKind(SpriteKind.Enemy).length > 14 * 2) {
            speed = 5
        } else if (sprites.allOfKind(SpriteKind.Enemy).length > 7) {
            speed = 3
        } else if (sprites.allOfKind(SpriteKind.Enemy).length > 3) {
            speed = 2
        } else if (sprites.allOfKind(SpriteKind.Enemy).length >= 1) {
            speed = 1
        } else {
            if (fireInterval > 3) {
                fireInterval += -1
                Initialize()
            } else {
                game.gameOver(true)
            }
        }
    }
    fire += -1
    if (fire <= 0) {
        fire = fireInterval
        select = sprites.allOfKind(SpriteKind.Enemy)._pickRandom()
        projectileFire = sprites.create(img`
            . . . . . . . . 
            . . 1 . 1 . . . 
            . . 1 . 1 . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . 1 . . . . 
            . . . . . . . . 
            `, SpriteKind.fire)
        projectileFire.setPosition(select.x, select.y)
        projectileFire.setVelocity(0, 50)
        projectileFire.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
