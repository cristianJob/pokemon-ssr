import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces';
import { GeolocationService } from '../../pokemons/services/geolocalizacionService';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  standalone: true
})
export class PokemonsPage implements OnInit {

  private geolocationService = inject(GeolocationService);
  private pokemonService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public title = inject(Title);
  public currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '0'),
      map((page) => isNaN(+page) ? 0 : +page),
      map((page) => Math.max(0, page)),  // valida que no sean negativos
    )
  );


  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);

  ngOnInit(): void {
    this.loadPokemons(this.currentPage());

    // this.route.queryParams.subscribe((params) => {
    //   const page = params['page'] || 0;
    //   this.loadPokemons(page);
    // });


    //this.geoLocation();
  }

  public loadPokemons(page: number = 0) {
    const pageLoad = this.currentPage()! + page;
    this.pokemonService.loadPage(pageLoad)
    .pipe(
      tap(() => this.router.navigate([], { queryParams: { page: pageLoad } })),
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

