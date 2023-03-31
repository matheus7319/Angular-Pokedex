import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { delay, map, of } from 'rxjs';
import { GenericItem } from 'src/app/models/generic-item.model';
import { GenericRequest } from 'src/app/models/generic-request.model';
import { PokemonType } from 'src/app/models/pokemon-type.model';
import { BaseService } from 'src/app/services/base.service';
import { PokemonTypeService } from 'src/app/services/pokemon-type.service';
import { PageMasterComponent } from 'src/app/templates/page-master/page-master.component';
import { mockPokemonType1, mockPokemonTypesAll } from 'src/mocks/pokemonTypes/pokemon-type.mock';

import { TypesComponent } from './types.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe(TypesComponent.name, () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypesComponent, PageMasterComponent],
      imports: [ToolbarModule, TabViewModule, CardModule, ReactiveFormsModule],
      providers: [PokemonTypeService, BaseService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  describe(`#${TypesComponent.prototype.getPokemonTypesList.name}`, () => {
    it('should return a list of pokemon types with GenericRequest', () => {
      let pokemonTypeService = fixture.debugElement.injector.get(PokemonTypeService);
      let genericRequest = new GenericRequest();
      genericRequest.results = mockPokemonTypesAll.results;

      spyOn(pokemonTypeService, 'getAll').and.callFake(() => {
        return of(genericRequest)
      });

      component.getPokemonTypesList();
      expect(component.axisCategories.length).toBeGreaterThan(0);
      expect(component.axisCategories).toEqual(genericRequest.results);
    });
  });

  // describe(`#${TypesComponent.prototype.pkmnTypeOnChange.name}`, () => {
  //   spyOn(component, 'getTypeBy');

  //   const dropdown = debug.query(By.css('.p-inputtext'));
  //   dropdown.triggerEventHandler('click', {});
  //   const dropdownItem = debug.query(By.css('.p-dropdown-item[aria-label="rock"]'));
  //   dropdownItem.triggerEventHandler('click', {});

  //   let testParam = {
  //     "name": "rock",
  //     "url": "https://pokeapi.co/api/v2/type/6/"
  //   };

  //   component.pkmnTypeOnChange({
  //     "originalEvent": {
  //       "isTrusted": true
  //     },
  //     "value": testParam
  //   });
  //   expect(component.pokemonTypeSelected).toEqual(testParam);
  //   expect(component.getTypeBy).toHaveBeenCalled();
  // });

  describe(`#${TypesComponent.prototype.getTypeBy.name}`, () => {
    it('should return a object with data of damage relation', () => {
      let baseService = fixture.debugElement.injector.get(BaseService);
      let urlFighting = "https://pokeapi.co/api/v2/type/2/";

      let pokemonType = new PokemonType();
      pokemonType.damage_relations = mockPokemonType1.damage_relations;
      pokemonType.id = mockPokemonType1.id;
      pokemonType.name = mockPokemonType1.name;

      spyOn<any>(baseService, 'getByUrl').and.callFake(() => {
        return of(pokemonType)
      })

      component.getTypeBy(urlFighting);
      expect(component.effectiveness).toEqual(pokemonType.damage_relations.double_damage_to);
      expect(component.weakness).toEqual(pokemonType.damage_relations.double_damage_from);
      expect(component.pokemonType).toEqual(pokemonType);
    });

    it('should return a object with data of damage relation', () => {
      let baseService = fixture.debugElement.injector.get(BaseService);
      let urlFighting = "https://pokeapi.co/api/v2/type/2/";

      let pokemonType = new PokemonType();
      pokemonType.damage_relations = mockPokemonType1.damage_relations;
      pokemonType.id = mockPokemonType1.id;
      pokemonType.name = mockPokemonType1.name;

      spyOn<any>(baseService, 'getByUrl').and.callFake(() => {
        return of(pokemonType)
      })

      component.getTypeBy(urlFighting);
      expect(component.effectiveness).toEqual(pokemonType.damage_relations.double_damage_to);
      expect(component.weakness).toEqual(pokemonType.damage_relations.double_damage_from);
      expect(component.pokemonType).toEqual(pokemonType);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
