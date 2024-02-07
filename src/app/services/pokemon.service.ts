import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {PokemonListResponse} from "../models/pokemon-list-response";
import {HasNumber} from "../models/has-number";
import {PokemonListItemDto} from "../models/pokemon-list-item-dto";
import {HasImage} from "../models/has-image";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, @Inject('BASE_POKEMON_API_URL') private baseUrl: string) {
  }

  getAll(limit: number = 151, offset: number = 0) {
    const url = new URL(this.baseUrl);
    url.searchParams.append("limit", String(limit));
    url.searchParams.append("offset", String(offset));

    return this.http.get<PokemonListResponse>(url.toString()).pipe(
      map((response: PokemonListResponse, index: number) => {
        return {
          ...response,
          results: this.convertListResults(response.results, offset)
        }
      })
    );
  }

  // TODO: Move this to it's own utility file for unit testing
  private convertListResults(results: (PokemonListItemDto & Partial<HasNumber & HasImage>)[], offset: number) {
    return results.map((result, index) => {
      const pokeDexNumber = offset + index + 1;
      return {
        ...result,
        number: pokeDexNumber,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokeDexNumber}.gif`
      }
    })
  }
}
