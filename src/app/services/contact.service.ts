import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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


    // window.fun = (id) => this.getContact(id);
  }

  // getContacts(...args): Observable<Contact[]> {
  //   return of(this.contacts);
  // }

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

  getContacts(fields, filter): Observable<Contact[]> {
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

    return this.getContactFromDevice(fields, options);
  }


  private getContactFromDevice(fields, options): Observable<Contact[]> {
    return new Observable(observer => {
      navigator.contacts.find(
        fields,
        resultList => {
          const contactList = resultList.map(result => {
            const photo = result?.photos?.length > 0 ? result.photos[0].value : '';
            const email = result?.emails?.length > 0 ? result.emails[0].value : '';

            return new Contact(
              result.id,
              result.name.formatted,
              result.phoneNumbers?.find(x => x.type === 'mobile')?.value || '',
              result.phoneNumbers?.find(x => x.type === 'home')?.value || '',
              photo,
              email,
              '');
          });

          // console.log('contactList:', contactList);
          this.contacts = contactList;
          observer.next(contactList);
          observer.complete();
        },
        error => {
          console.log('contactsFail', error);
          observer.error(error);
          observer.complete();
        },
        options);
    });
  }
}
