import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
  }


  newGame() {
    let game = new Game()
    // Als nächstes soll ein neu erstelltes Game in der Firestore Database gespeichert werden. Dazu muss es 
    // zunächst in Objekt {} Schreibweise geschrieben werden (quasi Objekt ohne Vererbung), da normale Objekte
    // nicht im Firestore gespeichert werden können, es wird JSON Notation verlangt.
    this.firestore // Der Code sieht sauberer aus, wenn man sehr lange Abfolgen von . Operatoren 
    // auf mehrere Zeilen verteilt:
    .collection('games')
    .add(game.toJSON())// Mit .add() kann ein JSON Objekt in der entsprechenden Firestore Database Collection
    // gespeichert werden.
    .then((gameInfo: any) => { // Die .then() Methode von Promises funktioniert eigentlich fast genauso wie die .subscribe() 
      // Methode mit dem Unterschied, dass .then nur einmal ausgeführt werden kann, da ein Promise nur einmal 
      // seinen Zustand ändern kann.
      // Die folgende Callback Funktion wird also immer ausgeführt, sobald ein neues Game erstellt wurde und zur 
      // in der Firestore Database unter einem zufällig generierten Schlüssel gespeichert wurde:
  
      // Firebase gibt uns ein Objekt mit Informationen über die Speicherung des neuen Games zur Database als 
      // Argument an diese Callback Funktion, d.h. in diesem Beispiel an die gameInfo Variable. In dieser Variablen 
      // ist auch der zufällig generierte Schlüssel in dem Attribut id gespeichert und kann daher im folgenden 
      // verwendet werden, um den User zur entsperchenden URL weiter zu leiten: 
      this.router.navigateByUrl(`/game/${gameInfo.id}`); // Mit dieser Methode lässt sich die URL
      // aud der sich der User gerade befindet verändern!


    });
    
  }

}
