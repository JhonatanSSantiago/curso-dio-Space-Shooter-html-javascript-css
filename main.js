const yourShip = document.querySelector('.player-adc');
const playArea = document.querySelector('#main-play-game');


function flyShip(event) { //movimento e tiro nave
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if (EventTarget.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

function  moveUp() { //função de subir
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if (topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}