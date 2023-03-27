import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericItem } from 'src/app/models/generic-item.model';
import { PokemonType } from 'src/app/models/pokemon-type.model';
import { mockPokemonType1, mockPokemonTypesAll } from 'src/mocks/pokemonTypes/pokemon-type.mock';

import { TypeChartComponent } from './type-chart.component';

describe(TypeChartComponent.name, () => {
  let component: TypeChartComponent;
  let fixture: ComponentFixture<TypeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should return tooltip with (x,y) values', ()=> {
  //   expect(component.chartOptions.tooltip?.formatter()).toContain('y');
  // })

  it('should populate categories when (@Input pokemonTypes)', () => {
    component.pokemonTypes = mockPokemonTypesAll.results;

    component.ngOnChanges();

    expect(component.categories.length).toBeGreaterThan(0);
  })

  it(`#${TypeChartComponent.prototype.updateData.name}`, () => {
    component.pokemonTypes = mockPokemonTypesAll.results;
    component.typeSelected = new PokemonType();
    component.typeSelected.damage_relations = mockPokemonType1.damage_relations;
    component.typeSelected.id = mockPokemonType1.id;
    component.typeSelected.name = mockPokemonType1.name;

    component.ngOnChanges();

    expect(component.chartData.length).toBeGreaterThan(0);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
