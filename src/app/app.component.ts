import { Component, OnInit, NgZone } from '@angular/core';
import { Contact } from './model/contact';
declare const device;
declare const navigator;
declare const ContactFindOptions;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'contact-app';

  public contactList: Array<Contact>;
  public searchText: string;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    document.addEventListener('deviceready', () => {
      this.getContacts(['*'], '');
    }, false);
    this.contactList = [
      new Contact('jing ting', '0988778899', ''),
      new Contact('jing ting', '0977886677', ''),
      new Contact('test', '0977886677', '')
    ];
  }

  // onDeviceReady() {
  //   let device;
  //   alert(device.cordova);
  // }

  getContacts(fileds, filter) {
    const options = new ContactFindOptions();
    options.filter = filter;
    options.multiple = true;
    options.desiredFields = [
      navigator.contacts.fieldType.name,
      navigator.contacts.fieldType.phoneNumbers,
      navigator.contacts.fieldType.photos
    ];
    navigator.contacts.find(fileds, this.contactsSuccess.bind(this), this.contactsFail.bind(this), options);
  }

  contactsSuccess(contacts) {
    const addItems = [];
    // alert('Found ' + JSON.stringify(contacts) + ' contacts.');
    contacts.forEach((item) => {
      const newItem = new Contact(item.name.formatted, item.phoneNumbers[0].value, item.photos);
      addItems.push(newItem);
    });
    this.zone.run(() => {
      this.contactList = addItems;
    });
  }

  contactsFail(msg) {
    alert('onError: ' + msg);
  }

  search() {
    const fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    this.getContacts(fields, this.searchText);
  }
}
