import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: any = '';
  game!: Game;

  // Der Service MatDialog wird für die eingebundenen Komponenten von Angular 
  // Material benötigt.
  // Um auf die Realtime Database von Firebase für unser Projekt zuzugreifen, muss
  // der Service AngularFirestore über DI eingefügt werden. Siehe Quickstart Guide
  // https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
  // zu Angular Firebase. Dies ist ein Modul was die Verwendung von Firebase innerhalb 
  // von Angular Apps vereinfacht. Theoretisch kann Firebase aber auch für nicht Angular 
  // Apps verwendet werden!
  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.newGame();
    this.firestore.collection('games').valueChanges().subscribe((game) => {
      console.log('Game update', game);
    });
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
    
  }

  takeCard() {
    if (this.pickCardAnimation) return;
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    this.game.currentPlayer = (this.game.currentPlayer + 1)% this.game.players.length; 
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
    
    dialogRef.afterClosed().subscribe(name => {
      if(!name) return;
      this.game.players.push(name);
    });
  }
}
