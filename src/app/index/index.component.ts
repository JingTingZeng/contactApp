import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public contactList: Contact[] = [];
  public searchText: string;

  constructor(private router: Router, private contactService: ContactService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    document.addEventListener('deviceready', () => {
      this.contactService.getContacts(['*'], '').pipe(
        tap(x => this.contactList = x)
      ).subscribe((contacts: any) => {
        console.log(contacts);
        // this.contactList = contacts;
        this.changeDetectorRef.detectChanges();
        // alert('Found ' + JSON.stringify(contacts) + ' contacts.');
      });
    }, false);
    // this.contactService.getContacts(['*'], '').pipe(
    //   tap(x => this.contactList = x)
    // ).subscribe();
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
