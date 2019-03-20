import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Women } from '../women/women';
import { WomanService } from '../woman.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnInit {
  // Declaration of women$ as an Observable
  //Only to good readability
  women$: Observable<Women[]>;
  // The searchTerms property is declared as an RxJS Subject.
  // A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable
  // You can also push values into that Observable by calling its next(value) method as the search() method does
  private searchTerms = new Subject<string>();

  constructor(private womanService: WomanService) {}

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce the number of calls to the searchHeroes(), ultimately returning an observable of timely woman search results (each a Hero[]).

    this.women$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // DebounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string. You'll never make requests more frequently than 300ms.
      debounceTime(300),

      // distinctUntilChanged() ensures that a request is sent only if the filter text changed.
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged. It cancels and discards previous search observables, returning only the latest search service observable.
      switchMap((term: string) => this.womanService.searchWomen(term)),
    );
  }
}