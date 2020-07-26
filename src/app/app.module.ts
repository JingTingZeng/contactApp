import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { IndexComponent } from './index/index.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactItemComponent,
    ContactFormComponent,
    IndexComponent,
    ContactDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
