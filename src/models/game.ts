// Man muss natürlich nicht immer mit Komponenten und Services arbeiten, sondern
// kann auch ganz normale TS Dateien erstellen und über export in den Komponenten 
// verwenden:
export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;

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















