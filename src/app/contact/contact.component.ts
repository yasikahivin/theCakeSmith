import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  newForm: FormGroup;

  constructor(public service: ContactService,
              private formBuilder: FormBuilder,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
    
    this.newForm= this.formBuilder.group({
      id: null,
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone_num: ['',[Validators.required,Validators.minLength(10)]],

    });
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

    if(this.newForm.invalid){
      return;
    }
  }
}
