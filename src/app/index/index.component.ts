import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public contactList: Contact[];
  public searchText: string;

  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    // document.addEventListener('deviceready', () => {
    // this.contactService.getContacts(['*'], '');
    // }, false);
    this.contactList = this.contactService.getContacts();
  }

  goToCreateContact(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate(['createContact']);
  }

  search() {
    const result = this.contactService.searchContact(this.searchText);
    if (result && result.length > 0) {
      this.contactList = result;
    }
  }
}
