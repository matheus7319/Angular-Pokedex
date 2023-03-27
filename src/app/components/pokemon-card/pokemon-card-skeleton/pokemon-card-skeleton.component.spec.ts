import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

import { PokemonCardSkeletonComponent } from './pokemon-card-skeleton.component';

describe(PokemonCardSkeletonComponent.name, () => {
  let component: PokemonCardSkeletonComponent;
  let fixture: ComponentFixture<PokemonCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardSkeletonComponent],
      imports: [SkeletonModule, CardModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
