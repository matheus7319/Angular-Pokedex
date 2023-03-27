import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardHeaderComponent } from './pokemon-card-header.component';

describe(PokemonCardHeaderComponent.name, () => {
  let component: PokemonCardHeaderComponent;
  let fixture: ComponentFixture<PokemonCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
