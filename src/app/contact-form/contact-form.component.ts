import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  public contact: Contact;

  constructor(private router: Router) {
    this.contact = new Contact('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  goToIndex(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate(['']);
  }

  createContact(contactForm) {
    const id = '9';
    this.contact = contactForm.value.contact;
    this.router.navigate(['/contactDetail/' + id]);
  }
}
