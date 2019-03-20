import { Injectable } from '@angular/core';
import { Women } from './women/women';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WomanService {

  // All HttpClient methods return an RxJS Observable of something
  // HTTP is a request/response protocol. You make a request, it returns a SINGLE response.
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
    this.messageService.add(`WomenService: ${message}`);
  }

  // The women web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService.
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private womenUrl = 'api/women';  // URL to web api

  /** GET women observable from the server */
  getWomenData(): Observable< Array <Women>> {
    // HttpClient.get returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , gives you a typed result object
    // "pipe" the observable result from http.get() through an RxJS catchError() operator
    // The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error.
    return this.http.get<Women[]>(this.womenUrl)
    .pipe(
      catchError(this.handleError<Women[]>('getWomenData', []))
    );
  }

  getWomanById(id: number): Observable<Women> {
    const url = `${this.womenUrl}/${id}`;
    return this.http.get<Women>(url)
    .pipe(
      tap(_ => this.log(`Fetched Women id=${id}`)),
      catchError(this.handleError<Women>(`GetWomen id=${id}`))
    );
  }

  /** PUT: update the woman on the server */
  updateWomanData (woman: Women): Observable<any> {
    //The HttpClient.put() method takes three parameters, the URL, the data to update (the modified woman in this case
    return this.http.put(this.womenUrl, woman, this.httpOptions).pipe(
      tap(_ => this.log(`Updated woman id=${woman.id}`)),
      catchError(this.handleError<any>('updateWomanData'))
    );
  }

  /** POST: add a new woman to the server */
  addNewWoman (woman: Women): Observable<Women> {
    return this.http.post<Women>(this.womenUrl, woman, this.httpOptions)
    .pipe(
      tap((newWoman: Women) => this.log(`Added new woman w/ id=${newWoman.id}`)),
      catchError(this.handleError<Women>('addNewWoman'))
    ); 
  }
  
  /** DELETE: delete the woman from the server */
  deleteWoman (id: number): Observable<Women> {
   const url  = `${this.womenUrl}/${id}`;

    return this.http.delete<Women>(url, this.httpOptions).pipe(
      
      tap(_ => this.log(`deleted woman id=${id}`)),
      catchError(this.handleError<Women>('deleteHero'))
    );
  }

  /* GET women whose name contains search term */
  searchWomen(search: string): Observable<Women[]> {
    if (!search.trim()) {
      // if you haven't wrote a woman's name, return empty women array.
      return of([]);
    }
    return this.http.get<Women[]>(`${this.womenUrl}/?name=${search}`).pipe(
      tap(_ => this.log(`Found women matching "${search}"`)),
      catchError(this.handleError<Women[]>('searchWomen', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
}
