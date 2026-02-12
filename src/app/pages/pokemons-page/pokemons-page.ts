import { Component, effect, inject, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { GeolocationService } from '../../pokemons/services/geolocalizacionService';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  standalone: true
})
export class PokemonsPage {

  private geolocationService = inject(GeolocationService);
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  public title = inject(Title);
  public currentPage = toSignal(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => isNaN(+page) ? 0 : +page),
      map((page) => Math.max(0, page)),  // valida que no sean negativos
    )
  );


  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);


  public loadOnPagechanged = effect(() => {
    this.loadPokemons();
  });



  public loadPokemons() {
    const pageLoad = this.currentPage();
    this.pokemonService.loadPage(pageLoad)
    .pipe(
      tap(() => this.title.setTitle(`Pokemons - Page ${pageLoad}`)),
    )
    .subscribe((pokemons) => {
      this.pokemons.set(pokemons);
      this.isLoading.set(false);
    });
  }







  public geoLocation() {
    this.geolocationService.getPositionWithAddress().subscribe((address) => {
      //console.log(address);
    });
  }

}

