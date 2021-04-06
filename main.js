const yourShip = document.querySelector('.player-adc');
const playArea = document.querySelector('.main-play-area');


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

        if (xPositionH === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPositionH + 8}px`;
        }

    }, 10)
}

window.addEventListener('keydown', flyShip);