'use strict'
class Basket {
  constructor(element) {
    this.element = element;
    this.left = 250;
  }

  moveLeft() {
    if (this.left > 10) {
      this.left -= 20;
      this.updateScreen();
    }
  }
  moveRight() {
    if (this.left < 490) {
      this.left += 20;
      this.updateScreen();
    }
  }
  updateScreen() {
    this.element.style.left = this.left + "px";
  }
}

class Present {
  constructor(gameArea, basket, scoreElement) {
    this.y = 0;
    this.x = Math.floor(Math.random() * 570);
    this.gameArea = gameArea;
    this.basket = basket;
    this.scoreElement = scoreElement;
    this.width = 30; // Present width for collision detection

    //create the present
    this.element = document.createElement("div");
    //add style to the present element
    this.element.className = "present";
    this.element.style.left = this.x + "px";
    // display the present on the screen
    this.gameArea.appendChild(this.element);
  }

  fall() {
    this.y += 2;
    this.element.style.top = this.y + "px";

    if (this.y > 600) {
      this.element.remove();
      return false;
    }

    // Check if present is within basket bounds
    if (
      this.x + this.width >= this.basket.left && // Right edge of present past left edge of basket
      this.x <= this.basket.left + 100 && // Left edge of present before right edge of basket
      this.y >= 550 && this.y <= 650 // Present within basket's vertical range
    ) {
      score += 1;
      this.scoreElement.textContent = `Score: ${score}`;
      this.element.remove();
      return false;
    }

    return true;
  }
}

let score = 0;
let myBasket = document.getElementById("basket");
let b = new Basket(myBasket);
let scoreElement = document.getElementById("score");

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    b.moveLeft();
  }
  if (event.key === "ArrowRight") {
    b.moveRight();
  }
});

let gameArea = document.getElementById("gameArea");

let presents = [];

setInterval(() => {
  let p = new Present(gameArea, b, scoreElement);
  presents.push(p);
}, 3000);

setInterval(() => {
  presents = presents.filter((p) => p.fall());
}, 40);