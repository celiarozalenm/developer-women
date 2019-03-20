import { Component, OnInit } from '@angular/core';
import { Women } from './women';
import { WomanService } from '../woman.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss']
})
export class WomenComponent implements OnInit {

  public selectedWoman: Women;
  public women: Women[];

  // Inject Service
  constructor(private womanService : WomanService, private router : Router) { }

  // Method calling service asynchronously
  // women_observable is a parameter of a function wich comes from womanService
  getWomenData(): void {
    this.womanService.getWomenData()
        .subscribe(
          (women_observable) => this.women = women_observable
          );}
  
  /** POST: add a new woman to the server */
  addNewWoman(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // The parameter of the function is an object of type Women
    this.womanService.addNewWoman({ name: name } as Women)
      .subscribe(woman_observable => {
        this.women.push(woman_observable);
    });
  }

  // The component's delete() method immediately removes the woman-to-delete from that list, anticipating that the HeroService will succeed on the server.
  // There's really nothing for the component to do with the Observable returned by womanService.delete(). It must subscribe anyway.
  // If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
  deleteWoman(womanId: number): void{
    this.womanService.deleteWoman(womanId).subscribe();
    this.router.navigateByUrl('/women', {skipLocationChange: true});
    this.getWomenData();
  }

  ngOnInit() {
    this.getWomenData();
  }

}
