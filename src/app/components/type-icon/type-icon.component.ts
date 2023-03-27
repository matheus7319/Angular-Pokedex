import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-icon',
  templateUrl: './type-icon.component.html',
  styleUrls: ['./type-icon.component.scss']
})
export class TypeIconComponent implements OnInit {

  @Input() name: string = '';
  @Input() defaultColor!: boolean;
  @Input() width: number = 20;
  @Input() height: number = 20;
  notLoadIcon = ["unknown", "shadow"];
  isShadowOrUnknown: boolean = false;
  colors: TypeIconColor[] = [
    {
      "name": "normal",
      "hex": "#9099A1"
    },
    {
      "name": "fighting",
      "hex": "#CE4069"
    },
    {
      "name": "flying",
      "hex": "#8FA8DD"
    },
    {
      "name": "poison",
      "hex": "#AB6AC8"
    },
    {
      "name": "ground",
      "hex": "#D97746"
    },
    {
      "name": "rock",
      "hex": "#C7B78B"
    },
    {
      "name": "bug",
      "hex": "#90C12C"
    },
    {
      "name": "ghost",
      "hex": "#5269AC"
    },
    {
      "name": "steel",
      "hex": "#5A8EA2"
    },
    {
      "name": "fire",
      "hex": "#FF9C54"
    },
    {
      "name": "water",
      "hex": "#4D90D5"
    },
    {
      "name": "grass",
      "hex": "#63BB5B"
    },
    {
      "name": "electric",
      "hex": "#F3D23B"
    },
    {
      "name": "psychic",
      "hex": "#F97176"
    },
    {
      "name": "ice",
      "hex": "#74CEC0"
    },
    {
      "name": "dragon",
      "hex": "#0A6DC4"
    },
    {
      "name": "dark",
      "hex": "#5A5366"
    },
    {
      "name": "fairy",
      "hex": "#EC8FE6"
    },
    {
      "name": "unknown",
      "hex": "#ddd"
    },
    {
      "name": "shadow",
      "hex": "#ddd"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.isShadowOrUnknown = false;
    this.isShadowOrUnknown = this.notLoadIcon.indexOf(this.name) >= 0;
  }

  getIconColor() {
    return !this.defaultColor ?
      { color: 'inherit' } :
      { color: this.colors.filter(c => c.name == this.name)[0]['hex'] };
  }
}

export class TypeIconColor {
  name: string = '';
  hex: string = '';
}