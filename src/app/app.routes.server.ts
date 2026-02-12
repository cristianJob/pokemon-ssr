import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      return [{ id: 'bulbasaur' }, { id: 'charmander' }, { id: 'squirtle' }];
    },

  },
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      return [{ page: '1' }, { page: '2' }, { page: '3' }];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
