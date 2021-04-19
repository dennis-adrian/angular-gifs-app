import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GifSearchResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey = '0MlnAVHPz4QFwXPdbq6i4ktx0hlbhuXZ';
  private urlService = 'https://api.giphy.com/v1/gifs';
  private _history: string[];

  public results: Gif[];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(sessionStorage.getItem('history')!) || [];
    this.results = JSON.parse(sessionStorage.getItem('results')!) || [];
  }

  searchGifs(query: string = '') {
    if (!query.trim().length) {
      return;
    }
    query = query.toLocaleLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 9);
      sessionStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<GifSearchResponse>(`${this.urlService}/search`, { params } )
      .subscribe((res) => {
        this.results = res.data;
        sessionStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
