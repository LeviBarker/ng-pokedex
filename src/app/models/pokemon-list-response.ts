import {PokemonListItemDto} from "./pokemon-list-item-dto";
import {HasNumber} from "./has-number";
import {HasImage} from "./has-image";

export interface PokemonListResponse {
  count: number,
  next: string,
  previous: string,
  results: (PokemonListItemDto & Partial<HasNumber & HasImage>)[]
}
