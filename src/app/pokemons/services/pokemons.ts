import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonApiResponse, SimplePokemon } from '../interfaces';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pokemons {

  private httpClient = inject(HttpClient);

  public loadPage(page: number = 1): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    return this.httpClient.get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`).pipe(
      map((response) => {
        const simplePokemons: SimplePokemon[] = response.results.map((pokemon) => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name,
        }));
        return simplePokemons;
      }),
      // tap(console.log)
    );
  }

  public pokemonById(id: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

}
