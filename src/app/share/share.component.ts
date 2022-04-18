import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  currentURL =  window.location.href;

  constructor() { }

  ngOnInit(): void {
  }

}
