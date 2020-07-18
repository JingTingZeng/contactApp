import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'contact-app';

  public contactList: { name: string, phone: string, avatar: string }[] = [];

  ngOnInit(): void {
    this.contactList = [
      { name: 'jing ting', phone: '0977886677', avatar: '' },
      { name: 'jing ting', phone: '0977886677', avatar: '' },
      { name: 'test', phone: '0977886677', avatar: '' }
    ];
  }
}
