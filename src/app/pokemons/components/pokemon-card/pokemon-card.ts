import { Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
  standalone: true
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonId = computed(() => 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);

  // logEffect = effect(() => {
  //   console.log(this.pokemon());
  // });

}
