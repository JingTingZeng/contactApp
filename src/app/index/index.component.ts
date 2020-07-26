import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model/contact';
// import { ContactService } from '../services/contact.service';

declare const navigator;
declare const ContactFindOptions;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public contactList: Array<Contact>;
  public searchText: string;

  constructor(private router: Router, private zone: NgZone) { }

  ngOnInit() {
    document.addEventListener('deviceready', () => {
      this.getContacts(['*'], '');
    }, false);
    this.contactList = [
      new Contact('1', 'jing ting', '0988778899', '0456356566', '', 'test@gmail.com', '台中市'),
      new Contact('2', 'jing ting', '0977886677', '0456378566', '', 'neux.jingtingzeng@gmail.com', '台中市'),
      new Contact('3', 'test', '0977886677', '0256378566', '', 'testets@gmail.com', '台北市')
    ];
  }

  getContacts(fileds, filter) {
    const options = new ContactFindOptions();
    options.filter = filter;
    options.multiple = true;
    options.desiredFields = [
      navigator.contacts.fieldType.id,
      navigator.contacts.fieldType.name,
      navigator.contacts.fieldType.phoneNumbers,
      navigator.contacts.fieldType.photos,
      navigator.contacts.fieldType.emails,
      navigator.contacts.fieldType.addresses
    ];
    navigator.contacts.find(fileds, this.contactsSuccess.bind(this), this.contactsFail.bind(this), options);
  }

  contactsSuccess(contacts) {
    console.log('contactSuccess:', contacts);
    const addItems = [];
    // alert('Found ' + JSON.stringify(contacts) + ' contacts.');
    contacts.forEach((item) => {
      // alert('Found ' + JSON.stringify(item) + ' contacts.');
      const mobile = item.phoneNumbers.find((e) => e.type === 'mobile').value || '';
      const home = item.phoneNumbers.find((e) => e.type === 'home').value || '';
      const newItem = new Contact(item.id, item.name.formatted, mobile, home, item.photos[0].value, item.emails[0].value, '');
      addItems.push(newItem);
      console.log('items:', addItems);
    });
    alert('Found ' + JSON.stringify(addItems) + ' contacts.');
    this.zone.run(() => {
      this.contactList = addItems;
    });
  }

  contactsFail(msg) {
    console.log('this.contactsFail', msg);
  }

  goToCreateContact(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate(['/createContact']);
  }

  search() {
    this.getContacts(['displayName', 'name'], this.searchText);
  }
}
