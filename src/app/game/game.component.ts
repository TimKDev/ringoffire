import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: any = '';
  game!: Game;

  constructor(public dialog: MatDialog) { }

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

  // Die folgende Funktion wurde von Angular Material kopiert:
  openDialog(): void {
    // Die Komponente die im Folgenden an open übergeben wird, wird im Dialogfenster
    // angezeigt, dass sich öffnet, sobald die openDialog Funktion ausgeführt wird. 
    // Man sieht, dass man die Obejkte die man von Angular Material kopiert zum Teil 
    // auch wirklich verstehen muss!
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
