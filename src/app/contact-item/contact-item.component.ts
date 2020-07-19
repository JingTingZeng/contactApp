import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../model/contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  @Input() public contact: Contact;

  constructor() { }

  ngOnInit(): void {
    if (!this.contact.avatar) {
      this.contact.avatar = 'assets/images/icon_avatar.svg';
    }
  }

}
