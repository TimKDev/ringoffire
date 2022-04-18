// Man muss natürlich nicht immer mit Komponenten und Services arbeiten, sondern
// kann auch ganz normale TS Dateien erstellen und über export in den Komponenten 

import { ActivatedRoute } from "@angular/router";

// verwenden:
export class Game {
  public players: string[] = [];
  public player_images: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public pickCardAnimation = false;
  public currentCard: any = '';

  constructor() {
    // Die Konstruktorfunktion wird immer dann aufgerufen, wenn eine neue Instanz 
    // der Klasse erschaffen wurde, z.B. mit dem new Operator. this ist in diesem 
    // Fall die neue Instanz, dies wird automazisch vom new Operator gemacht!
    for (let i = 1; i < 14; i++) {
      this.stack.push('spade_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('clubs_' + i);
    }
    shuffle(this.stack);
  }

  /**
   * Converts an Game Instance into a JSON object. Then it can be saved in the 
   * Firebase Database.
   */
  public toJSON() {
    return {
      players: this.players,
      player_images: this.player_images,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer, 
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard
    };
  }

}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: string[]): string[] {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}















