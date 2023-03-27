import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarModule } from 'primeng/progressbar';
import { Stats } from 'src/app/models/pokemon.model';
import { mockStat1 } from 'src/mocks/pokemon/stat.mock';

import { PokemonCardAttrLineComponent } from './pokemon-card-attr-line.component';

describe(PokemonCardAttrLineComponent.name, () => {
  let component: PokemonCardAttrLineComponent;
  let fixture: ComponentFixture<PokemonCardAttrLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardAttrLineComponent],
      imports: [ProgressBarModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonCardAttrLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe(`#${PokemonCardAttrLineComponent.prototype.createLabel.name}`, () => {
    it(`should create abreviation of stats`, () => {
      let statTest = new Stats();
      statTest.stat = mockStat1.stat;

      expect(component.createLabel(statTest)).toBe('ATT');
    });
  });

  describe(`#${PokemonCardAttrLineComponent.prototype.statBarValue.name}`, () => {
    it(`should adjust width of progress bar by stats`, () => {
      let statTest = new Stats();
      statTest.base_stat = mockStat1.base_stat;

      expect(component.statBarValue(statTest)).toBeLessThanOrEqual(100);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
