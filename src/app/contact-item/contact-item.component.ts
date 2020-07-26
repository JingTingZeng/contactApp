import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../model/contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  @Input() public contact: Contact;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDetail(e, id) {
    e.preventDefault();
    e.stopPropagation();

    this.router.navigate(['/contactDetail/' + id]);
  }
}
