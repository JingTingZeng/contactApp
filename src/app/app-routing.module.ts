import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'createContact',
    component: ContactFormComponent
  },
  {
    path: 'contactDetail/:id',
    component: ContactDetailComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
