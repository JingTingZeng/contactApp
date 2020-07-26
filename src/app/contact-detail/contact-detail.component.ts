import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) {
    this.contact = new Contact('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    document.getElementById('detail__info').addEventListener('scroll', this.onScroll);

    const id = this.route.snapshot.paramMap.get('id');
    this.contact = this.contactService.getContact(id);
  }

  goToIndex(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate(['']);
  }

  goToEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.navigate(['createContact'], {
      queryParams: { id: this.contact.id }
    });
  }

  onScroll = () => {
    const scrollTop = document.getElementById('detail__info').scrollTop;
    this.isScroll = (scrollTop > 0) ? true : false;
  }
}
