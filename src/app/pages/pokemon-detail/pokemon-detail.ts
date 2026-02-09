import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { Pokemons } from '../../pokemons/services/pokemons';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetail implements OnInit { 
  public pokemon = signal<Pokemon | null>(null);
  public route = inject(ActivatedRoute);
  private pokemonService = inject(Pokemons);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.pokemonService.pokemonById(id)
    .pipe(
      tap(pokemon => {
        this.title.setTitle(pokemon.name);
        this.meta.updateTag({ name: 'description', content: pokemon.name });
        this.meta.updateTag({ name: 'og:description', content: pokemon.name });
        this.meta.updateTag({ name: 'og:title', content: pokemon.name });
        this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` });
      })
    )
    .subscribe((pokemon) => {
      this.pokemon.set(pokemon);
    });
  }
}
