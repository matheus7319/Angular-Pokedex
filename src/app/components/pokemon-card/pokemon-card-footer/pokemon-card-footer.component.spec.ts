import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardFooterComponent } from './pokemon-card-footer.component';

describe(PokemonCardFooterComponent.name, () => {
  let component: PokemonCardFooterComponent;
  let fixture: ComponentFixture<PokemonCardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardFooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
