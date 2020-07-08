import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { IPagination } from '../models/pagination';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-test-content',
  templateUrl: './test-content.component.html',
  styleUrls: ['./test-content.component.scss'],
})
export class TestContentComponent implements OnInit {
  products: IProduct[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe(
      (response: IPagination) => {
        this.products = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
