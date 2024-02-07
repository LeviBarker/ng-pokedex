import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {PokemonListItemComponent} from "./components/pokemon-list-item/pokemon-list-item.component";
import {Observable} from "rxjs";
import {PokemonListResponse} from "./models/pokemon-list-response";
import {PokemonService} from "./services/pokemon.service";
import {FilterPipe} from "./pipes/filter.pipe";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PokemonListItemComponent, FilterPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-pokedex';
  search = '';
  pokemonListResponse$: Observable<PokemonListResponse>;

  constructor(private pokemonService: PokemonService) {
    this.pokemonListResponse$ = pokemonService.getAll();
  }
}
