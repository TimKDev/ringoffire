import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  
  game!: Game;
  gameId!: string;

  // Der Service MatDialog wird für die eingebundenen Komponenten von Angular 
  // Material benötigt.
  // Um auf die Realtime Database von Firebase für unser Projekt zuzugreifen, muss
  // der Service AngularFirestore über DI eingefügt werden. Siehe Quickstart Guide
  // https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
  // zu Angular Firebase. Dies ist ein Modul was die Verwendung von Firebase innerhalb 
  // von Angular Apps vereinfacht. Theoretisch kann Firebase aber auch für nicht Angular 
  // Apps verwendet werden!
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    // Erstelle ein neues Game:
    this.newGame();
    // Unter Benutzung des ActivatedRoute Service kann die Variable gameId der URL wie folgt 
    // ausgelesen werden:
    this.route.params.subscribe((params) => {
      // Innerhalb dieser Callbackfunktion ist der Wert der URL Variablen gameId in der Variablen 
      // params['gameId']) gespeichert und kann daher verwendet um das zur URL gehörige Spiel in 
      // in der Database zu identifizieren.
      this.gameId = params['gameId'];
      // Mit firestore.collection('games') kann man auf die Datensammlung gespeichert unter
      // dem Schüssel 'games' in der Cloud Firestore des verbundenen Firebase Projekts zugreifen.
      // .valueChanges() gibt dann eine Observable (ählich wie ein Promise) zurück, das angibt 
      // ob sich Werte in dieser Sammlung ändern. Mit subscribe kann man ähnlich wie bei Promises
      // mit .then auf Änderungen reagieren, indem eine Callback Funktion aufgerufen wird, der als
      // Argument die veränderte Elemente der Sammlung 'games' übergeben werden. 
      // Nicht veränderte Schlüssel Werte Paare werden nicht erneut angezeigt. Das subscribe kommt
      // aus dem ngRx Service.
      this.firestore.collection('games')
      .doc(this.gameId) // Mit dieser Methode kann auf ein Element der Collection mit einem 
      // bestimmten Schlüssel zugegriffen werden der als Argument übergeben wird.
      .valueChanges()
      .subscribe((game: any) => {
        // Im Folgenden werden die Werte des lokalen Games aktualisiert, sobald sich die Werte des 
        // zu der URL korrespondierenden Games in Firestore Database ändern:
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation;
      });

    });

  }

  newGame() {
    this.game = new Game();
    
    
  }

  takeCard() {
    if (this.game.pickCardAnimation) return;
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.game.currentPlayer = (this.game.currentPlayer + 1)% this.game.players.length; 
    this.saveGame();
    // Die Animation, soll für jede Karte abgespielt werden. Dies funktioniert 
    // natürlich nur flüssig, wenn man während der Zeit der Animation keine Karte 
    // ziehen darf:
    setTimeout(() => {
      // Asynchrone Events wie setTimeout() triggern auch Change Detection.
      this.game.pickCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard);
      this.saveGame();
    }, 1500);
  }

  // Die folgende Funktion wurde von Angular Material kopiert:
  openDialog(): void {
    // Die Komponente die im Folgenden an open übergeben wird, wird im Dialogfenster
    // angezeigt, dass sich öffnet, sobald die openDialog Funktion ausgeführt wird. 
    // Man sieht, dass man die Obejkte die man von Angular Material kopiert zum Teil 
    // auch wirklich verstehen muss!
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);
    
    dialogRef.afterClosed().subscribe((name: string) => {
      if(!name) return;
      this.game.players.push(name);
      this.saveGame();
    });
  }

  /**
   * Loads the current local game state up to the firestore cloud.
   */
  saveGame() {
    this
    .firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJSON());
  }
}
