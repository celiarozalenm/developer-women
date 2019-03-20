import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WomanService }  from '../woman.service';
import { Women } from '../women/women';

@Component({
  selector: 'app-woman-detail',
  templateUrl: './woman-detail.component.html',
  styleUrls: ['./woman-detail.component.scss']
})
export class WomanDetailComponent implements OnInit {

  @Input() woman: Women;

  constructor(
    private route: ActivatedRoute,
    private womanService: WomanService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWomanById();
  }

  goBack(): void {
    this.location.back();
  }

  getWomanById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.womanService.getWomanById(id)
      .subscribe(women_observable => this.woman = women_observable);
  }

  save(): void {
    this.womanService.updateWomanData(this.woman)
      .subscribe(() => this.goBack());
  }

}
