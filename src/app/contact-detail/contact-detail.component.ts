import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../model/contact';

declare const navigator;
declare const ContactFindOptions;

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  public contact: Contact;

  public isScroll = false;

  constructor(private route: ActivatedRoute, private router: Router, private zone: NgZone) { }

  ngOnInit(): void {
    document.getElementById('detail__info').addEventListener('scroll', this.onScroll);

    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.getContacts(['id'], params.id);
    });
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
    this.zone.run(() => {
      this.contact = contacts;
    });
  }

  contactsFail(msg) {
    console.log('this.contactsFail', msg);
  }

  goToIndex(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate(['']);
  }

  onScroll = () => {
    const scrollTop = document.getElementById('detail__info').scrollTop;
    this.isScroll = (scrollTop > 0) ? true : false;
  }
}
