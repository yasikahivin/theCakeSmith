import { Component, OnInit, NgModule } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../models/Category';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';

import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})



export class ProductFormComponent implements OnInit {
  imgSrc = '../../../assets/images/upll.png';
  selectedImage: any = null;
  isSubmitted: boolean;
  // product: Product;
  id: string;
  product: Product = { id: '', title: '', price: 0, category: '', weight: 0, imageURL: '', description: '' };
  formTemplate = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    price: new FormControl(0),
    category: new FormControl(''),
    weight: new FormControl(0),
    imageURL: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) { this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p); }

    // this.product = new Product();
  }

  save(product: any) {
    this.isSubmitted = true;
    if (this.formTemplate.valid && !this.id) {
      const filePath = `${product.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()} `;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            product.imageURL = url;
            this.productService.insert(product);
            this.resetForm();
          });
        })
      ).subscribe();
    } else if (this.id) {
      this.productService.delete(this.id);
      const filePath = `${product.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()} `;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            product.imageURL = url;
            this.productService.update(this.id, product);
            this.resetForm();
          });
        })
      ).subscribe();
    }
    console.log(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Do you want to delete this product?')) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {

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
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      id: '',
      title: '',
      price: 0,
      category: '',
      weight: 0,
      imageURL: '',
      description: ''
    });
    this.imgSrc = '../../../assets/images/upll.png';
    this.selectedImage = null;
    this.isSubmitted = false;

  }


}
