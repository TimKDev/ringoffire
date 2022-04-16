import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  {path: '', component: StartScreenComponent},
  // Mit der /: Syntax wird festgelegt, dass die entsprechende Routen URL von einer 
  // Variable mit Namen gameId abhängt. Die Idee ist, verschiedene Games, die gespielt 
  // werden und in der Firestore Database über einen eindeutigen, zufällig generierten 
  // Schlüssel gespeichert werden, über diesen Schlüssel zu identifizieren, indem der 
  // Schlüssel in der entsprechende URL gespeichert wird. D.h. alle User die sich auf 
  // der entsprechenden URL befinden, sehen den entsprechenden Spielstand! => Dieses 
  // Konzept wird auf fast allen Websites benutzt und erklärt die kryptisch aussehenden 
  // URL's, da diese User spezifisch sind! 
  {path: 'game/:gameId', component: GameComponent}
  // Der Wert von gameId ist beliebig, d.h. egal welchen String wir nach dem game/.... in 
  // die URL schreiben, es stimmt mit der obigen Route überein und die GameComponent wird
  // angezeigt. Es ändert sich einfach nur der Wert der gameId Variablen, mit deren Hilfe 
  // das entsprechende Game identifiziert werden kann! 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
