import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  public contact: Contact;
  private id = '';

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) {
    this.contact = new Contact(this.id, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.contact = this.contactService.getContact(this.id);
    }
  }

  goToIndex(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate(['']);
  }

  createContact(contactForm) {
    const created = this.contactService.createContact(this.contact);
    if (created) {
      this.id = '123';
      this.contact = new Contact(this.id, '', '', '', '', '', '');
    } else {
      this.contact = contactForm.value.contact;
    }
    this.router.navigate(['/contactDetail/' + this.id]);
  }
}
