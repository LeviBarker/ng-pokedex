import {Component, Input} from '@angular/core';
import {PokemonListItemDto} from "../../models/pokemon-list-item-dto";
import {HasNumber} from "../../models/has-number";
import {HasImage} from "../../models/has-image";
import {Observable, of} from "rxjs";
import {PokemonService} from "../../services/pokemon.service";
import {AsyncPipe, NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-pokemon-list-item',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './pokemon-list-item.component.html',
  styleUrl: './pokemon-list-item.component.css'
})
export class PokemonListItemComponent {
  @Input()
  pokemon: (PokemonListItemDto & Partial<HasNumber & HasImage>) | undefined;

}
