import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CustomService } from 'src/app/services/custom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { Custom } from 'src/app/models/CustomOrders';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})

export class CustomComponent implements OnInit {
  imgSrc = '../../../assets/images/upll.png';
  selectedImage: any = null;
  isSubmitted: boolean;
  id: string;
  dateError = '';
  appUser: AppUser;
  custOrder: Custom = {
    id: '',
    flavor: '',
    frosting_type: '',
    frosting_color: '',
    weight: 0, shape: '',
    wording: '',
    imageURL: '',
    reqDate: '',
    notes: '',
    confirm: false,
    price: 0
  };
  formTemplate = new FormGroup({
    id: new FormControl(''),
    flavor: new FormControl(''),
    frosting_type: new FormControl(0),
    frosting_color: new FormControl(''),
    weight: new FormControl(0),
    shape: new FormControl(''),
    wording: new FormControl(''),
    imageURL: new FormControl(''),
    reqDate: new FormControl(''),
    notes: new FormControl(''),
    confirm: new FormControl(false),
    price: new FormControl(0)
  });

  constructor(
    private customService: CustomService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.id = this.afAuth.auth.currentUser.uid;
    // this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) { this.customService.get(this.id).pipe(take(1)).subscribe(o => this.custOrder = o); }
  }
  save(custOrder: any) {
    const date = new Date();
    const enterdate = custOrder.reqDate.split('-');

    // tslint:disable-next-line: radix
    const a = new Date(parseInt(enterdate[0]), parseInt(enterdate[1]) - 1, parseInt(enterdate[2]));

    // validate date when submitting
    if (date > a) {
      this.dateError = 'Error';
      window.alert('Enter a future date for the required date');
      return;
    }

    // upload photo
    this.isSubmitted = true;
    custOrder.confirm = false;
    if (this.formTemplate.valid) {
      // set image path in firebase
      const filePath = `${custOrder}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()} `;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            custOrder.imageURL = url;
            this.customService.insert(custOrder);
            this.resetForm();
          });
        })
      ).subscribe();
    }
    if (this.id) {
      this.customService.update(this.id, custOrder);
    } else {
    }
    console.log(custOrder);
    this.router.navigate(['/']);
  }

  delete() {
    if (!confirm('Do you want to delete this order?')) {
      return;
    }

    this.customService.delete(this.id);
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.custOrder.confirm = false;
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../assets/images/upll.png';
      this.selectedImage = null;
    }
  }


  get formControls() {
    return this.formTemplate.controls;
  }

  // reset  form
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      id: '',
      flavor: '',
      frosting_type: '',
      frosting_color: '',
      weight: 0,
      shape: '',
      wording: '',
      imageURL: '',
      reqDate: '',
      notes: '',
      confirm: false,
      price: 0
    });
    this.imgSrc = '../../../assets/images/upll.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }


}
