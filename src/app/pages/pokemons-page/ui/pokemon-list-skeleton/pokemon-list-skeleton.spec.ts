import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListSkeleton } from './pokemon-list-skeleton';

describe('PokemonListSkeleton', () => {
  let component: PokemonListSkeleton;
  let fixture: ComponentFixture<PokemonListSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
