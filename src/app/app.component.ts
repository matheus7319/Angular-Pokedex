import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routeItems!: MenuItem[];
  activeRouteItem!: MenuItem;

  isSidebarVisible!: boolean;
  isMobile!: boolean;

  constructor() {
  }

  ngOnInit(): void {
    // this.responsive.observe([Breakpoints.XSmall, Breakpoints.Small])
    //   .subscribe(result => {
    //     this.isMobile = result.matches;
    //   });

    this.initRouteItems();
  }

  initRouteItems(): void {
    const defaultItem: MenuItem = {
      styleClass: 'router-item-wrapper',
      command: (menuItem) => {
        this.onRouteChange(menuItem);
      }
    }

    this.routeItems = [
      {
        ...defaultItem,
        label: 'Pokemons',
        icon: 'pi pi-book',
        routerLink: '/pokemons',
        id: 'BtnPokemons'
      },
      {
        ...defaultItem,
        label: 'Tipos',
        icon: 'pi pi-chart-bar',
        routerLink: '/types',
        id: 'BtnTypes'
      }
    ];

    const activeIndex = this.routeItems.findIndex(e => e.routerLink === window.location.pathname);
    this.activeRouteItem = this.routeItems[activeIndex];
  }

  onRouteChange(item: MenuItem): void {
    if (item) {
      this.activeRouteItem = item;
    }
    this.isSidebarVisible = false;
  }
}
