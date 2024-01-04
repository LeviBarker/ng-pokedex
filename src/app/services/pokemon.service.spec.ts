import {TestBed} from '@angular/core/testing';

import {PokemonService} from './pokemon.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PokemonListResponse} from "../models/pokemon-list-response";

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;
  const basePokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: "BASE_POKEMON_API_URL",
          useValue: basePokemonApiUrl
        }
      ]
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map pokemon', async () => {
    // Set up mock data
    const mockData: PokemonListResponse = {
      count: 1,
      previous: "",
      next: "",
      results: [{
        name: "Pikachu",
        url: "https://localhost:1234/pokemon/Pikachu"
      }]
    };

    // Set up the subscription
    service.getAll().subscribe(response => {
        expect(response).toBeDefined();
        expect(response.results[0]).toBeDefined();
        expect(response.results[0].number).toEqual(1);
        expect(response.results[0].image).toContain(".png");
      }
    );

    // Build out and "flush"/resolve test request
    httpTestingController
      .expectOne({
        method: 'GET',
        url: basePokemonApiUrl + '?limit=151&offset=0'
      })
      .flush(mockData);
  })
});
