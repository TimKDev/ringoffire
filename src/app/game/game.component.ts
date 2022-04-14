import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: any = '';
  game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
    
  }

  takeCard() {
    if (this.pickCardAnimation) return;
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    // Die Animation, soll für jede Karte abgespielt werden. Dies funktioniert 
    // natürlich nur flüssig, wenn man während der Zeit der Animation keine Karte 
    // ziehen darf:
    setTimeout(() => {
      // Asynchrone Events wie setTimeout() triggern auch Change Detection.
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);
    }, 1500);
  }

}
