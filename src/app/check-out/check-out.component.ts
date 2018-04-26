import {Shipping} from '../models/shipping';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  shipping: Shipping = {name: '', addressLine1: '', addressLine2: '', city: ''};
  constructor() {}

  ngOnInit() {
  }

  placeOrder() {
    console.log(this.shipping);
  }

}
