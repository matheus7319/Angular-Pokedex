import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToolbarModule,
        ButtonModule,
        SidebarModule,
        MenuModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    debug = fixture.debugElement;
  });

  describe(`#${AppComponent.prototype.initRouteItems.name}`, () => {
    it('should populate menu items', () => {
      expect(app.routeItems.length).toBeGreaterThan(0);
    });
  });

  describe(`#${AppComponent.prototype.onRouteChange.name}`, () => {
    it('should set activeRouteItem with MenuItem', () => {
      let menuItem: MenuItem = {
        styleClass: 'router-item-wrapper',
        command: (menuItem) => {
          app.onRouteChange(menuItem);
        },
        label: 'Pokemons',
        icon: 'pi pi-book',
        routerLink: '/pokemons',
        id: 'BtnPokemons'
      }

      app.onRouteChange(menuItem);
      expect(app.activeRouteItem).toBe(menuItem);
    });
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
