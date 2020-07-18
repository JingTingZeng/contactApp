import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  @Input() public contact: { name: string, phone: string, avatar: string };

  public contactItem: { name: string, phone: string, avatar: string };

  constructor() { }

  ngOnInit(): void {
    this.contactItem = this.contact;
    if (!this.contactItem.avatar) {
      this.contactItem.avatar = 'assets/images/icon_avatar.svg';
    }
  }

}
