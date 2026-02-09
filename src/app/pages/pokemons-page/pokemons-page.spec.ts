import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsPage } from './pokemons-page';

describe('PokemonsPage', () => {
  let component: PokemonsPage;
  let fixture: ComponentFixture<PokemonsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
