import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about',
        loadComponent: () => import('./pages/about-page/about-page').then(m => m.AboutPage)
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing-page/pricing-page').then(m => m.PricingPage)
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact-page/contact-page').then(m => m.ContactPage)
    },
    {
        path: 'pokemons',
        loadComponent: () => import('./pages/pokemons-page/pokemons-page').then(m => m.PokemonsPage)
    },
    {
        path: 'pokemon/:id',
        loadComponent: () => import('./pages/pokemon-detail/pokemon-detail').then(m => m.PokemonDetail)
    },
    {
        path: '**',
        redirectTo: 'about'
    }
];
