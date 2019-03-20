import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Women } from './women/women';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const women = [
      { id: 1, name: 'Margaret Hamilton' },
      { id: 2, name: 'Grace Hopper' },
      { id: 3, name: 'Ada Lovelace' },
      { id: 4, name: 'Joan Clarke' },
      { id: 5, name: 'Hedy Lamarr' },
      { id: 6, name: 'The ENIAC programmers' },
      { id: 7, name: 'Edith Clarke' },
      { id: 8, name: 'Evelyn Boyd Granville' },
      { id: 9, name: 'Carol Shaw' },
      { id: 10, name: 'Janese Swanson' }
    ];
    return {women};
  }

  // Overrides the genId method to ensure that a woman always has an id.
  // If the women array is empty,
  // the method below returns the initial number (11).
  // if the women array is not empty, the method below returns the highest
  // woman id + 1.
  genId(women: Women[]): number {
    return women.length > 0 ? Math.max(...women.map(woman => woman.id)) + 1 : 11;
  }
}