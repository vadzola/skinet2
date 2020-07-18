import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { error } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
    // tslint:disable-next-line: align
    private bcService: BreadcrumbService) {
      this.bcService.set('@productDetails', '');
     }

  ngOnInit() {
    this.loadProduct();
  }
  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {

         this.product = product;
         this.bcService.set('@productDetails', product.name);



    }, err => {
      console.log(err);
    });
  }
}
