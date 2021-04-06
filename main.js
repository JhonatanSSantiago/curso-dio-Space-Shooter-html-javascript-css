const yourShip = document.querySelector('.player-adc');
const playArea = document.querySelector('.main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];


function flyShip(event) { //movimento e tiro nave
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if (event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

function moveUp() { //função de subir
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if (topPosition === "0px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

function moveDown() { //função de descer
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if (topPosition === "500px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

function fireLaser() { // criar laser
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPositionH = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPositionV = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));

    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPositionH}px`;
    newLaser.style.top = `${yPositionV - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPositionH = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //compara se alien foi atigindo
            if (checkLaserCollision(laser, alien)){
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })
        if (xPositionH === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPositionH + 8}px`;
        }

    }, 10)
}

function createAliens() { //criar aliens inimigos
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de aliens
    newAlien.scr = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

function moveAlien(alien) { //move aliens
    let moveAlienInterval = setInterval(() => {
        let xPositionH = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
        if (xPositionH <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            } 
        } else {
            alien.style.left = `${xPositionH - 4}px`;           
        }
    }, 30);
}

function checkLaserCollision (laser, alien) { //colisão
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBotton = laserTop - 20;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBotton = alienTop - 30;

    if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBotton) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function gameOver() { //fim de jogo
    alert("GAME OVER");
}



window.addEventListener('keydown', flyShip);