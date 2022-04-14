import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {

  name: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onNoClick() {
    
  }

}
