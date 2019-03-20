import { Component, OnInit } from '@angular/core';
import { Women } from '../women/women';
import { WomanService } from '../woman.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  women: Women[] = [];
 
  constructor(private womanService: WomanService) { }
 
  ngOnInit() {
    this.getWomenData();
  }
 
  getWomenData(): void {
    this.womanService.getWomenData()
      .subscribe(women => this.women = women.slice(1, 5));
  }
}