import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';

import { TypeIconComponent } from './type-icon.component';

describe(TypeIconComponent.name, () => {
  let component: TypeIconComponent;
  let fixture: ComponentFixture<TypeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeIconComponent],
      imports: [
        HttpClientModule,
        MatIconModule
      ],
      providers: [
        MatIconRegistry
      ],
      schemas: []
    })
      .compileComponents();

    fixture = TestBed.createComponent(TypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  describe(`#${TypeIconComponent.prototype.getIconColor.name}`, () => {
    it('should return the color of the icon when (@Input() name) and (@Input() defaultColor)', () => {
      component.defaultColor = true;
      component.name = 'fire';

      expect(component.getIconColor()).toEqual({ color: '#FF9C54' });
    });

    it('should NOT return the color of the icon when (@Input() name)', () => {
      component.name = 'fire';

      expect(component.getIconColor()).toEqual({ color: 'inherit' });
    });

    it('should NOT return the color of the icon', () => {
      expect(component.getIconColor()).toEqual({ color: 'inherit' });
    });
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
