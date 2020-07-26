import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';

declare const navigator;
declare const ContactFindOptions;

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[];

  constructor() {
    this.contacts = [
      new Contact('1', 'jing ting', '0988778899', '0456356566', '', 'test@gmail.com', '台中市'),
      new Contact('2', 'jing ting', '0977886677', '0456378566', '', 'neux.jingtingzeng@gmail.com', '台中市'),
      new Contact('3', 'test', '0977886677', '0256378566', '', 'testets@gmail.com', '台北市')
    ];
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContact(id: string) {
    return this.contacts.find((item) => item.id === id);
  }

  createContact(contact: Contact) {
    const foundContact = this.contacts.find((item) => item.id === contact.id);
    if (foundContact) { return false; }
    this.contacts.push(contact);
    return true;
  }

  searchContact(text: string) {
    const result = [];
    this.contacts.forEach((item) => {
      if (item.name.indexOf(text) !== -1) {
        result.push(item);
      }
    });
    return result;
  }

  // getContacts(fileds, filter): Contact[] {
  //   const options = new ContactFindOptions();
  //   options.filter = filter;
  //   options.multiple = true;
  //   options.desiredFields = [
  //     navigator.contacts.fieldType.id,
  //     navigator.contacts.fieldType.name,
  //     navigator.contacts.fieldType.phoneNumbers,
  //     navigator.contacts.fieldType.photos,
  //     navigator.contacts.fieldType.emails,
  //     navigator.contacts.fieldType.addresses
  //   ];
  //   // navigator.contacts.find(fileds, this.contactsSuccess.bind(this), this.contactsFail.bind(this), options);

  //   // return Observable.create(observer => {
  //   //   navigator.contacts.find(
  //   //     fileds,
  //   //     result => {
  //   //       observer.next(result);
  //   //       observer.complete();
  //   //     },
  //   //     error => observer.error(error),
  //   //     options);
  //   // });
  // }

  // contactsSuccess(contacts) {
  //   console.log('contactSuccess:', contacts);
  //   const addItems = [];
  //   alert('Found ' + JSON.stringify(contacts) + ' contacts.');
  //   contacts.forEach((item) => {
  //     const mobile = item.phoneNumbers.find((e) => e.type === 'mobile') || '';
  //     const home = item.phoneNumbers.find((e) => e.type === 'home') || '';
  //     const newItem = new Contact(item.id, item.name.formatted, mobile.value, home.value, item.photos[0].value, item.emails[0].value, '');
  //     addItems.push(newItem);
  //     console.log('items:', addItems);
  //   });

  //   this.contacts = addItems;
  // }

  // contactsFail(msg) {
  //   console.log('this.contactsFail', msg);
  // }
}
