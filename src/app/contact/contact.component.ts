import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(public service: ContactService,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
    form.resetForm();
    }
    this.service.formData = {
      id: null,
      name: '',
      email: '',
      phone_num: '',
      message: '',
    };
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    this.firestore.collection('contact').add(data);
    this.resetForm(form);
  }
}
