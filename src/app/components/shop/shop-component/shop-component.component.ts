import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-component',
  templateUrl: './shop-component.component.html',
  styleUrls: ['./shop-component.component.css']
})
export class ShopComponentComponent implements OnInit {

  public opened = true;
  fixedBottomGap: number = 0;
  fixedTopGap: number = 0;
  fixedInViewport = true;

  constructor() { }

  ngOnInit(): void {
  }

}
