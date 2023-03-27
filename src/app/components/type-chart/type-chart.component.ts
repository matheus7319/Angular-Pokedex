import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SeriesOptionsType } from 'highcharts';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import { DamageType, PokemonType } from 'src/app/models/pokemon-type.model';
import { GenericItem } from 'src/app/models/generic-item.model';

HC_more(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-type-chart',
  templateUrl: './type-chart.component.html',
  styleUrls: ['./type-chart.component.scss']
})
export class TypeChartComponent implements OnInit, OnChanges {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'

  @Input() pokemonTypes!: GenericItem[];
  @Input() typeSelected!: PokemonType;
  @Input() reversePerspective!: boolean;

  categories: string[] = [];
  chartData: any | null = null;
  chartSeries: SeriesOptionsType[] | any[] = [];
  chartOptions: Highcharts.Options = {
    chart: {
      // polar: true,
      // type: 'line',
      type: 'column',
    },

    // pane: {
    //   size: '80%'
    // },

    xAxis: {
      categories: this.categories,
      // tickmarkPlacement: 'on',
      lineWidth: 0,
      crosshair: true
    },

    yAxis: {
      // gridLineInterpolation: 'polygon',
      // lineWidth: 0,
      min: 0,
      max: 2
    },

    tooltip: {
      shared: true,
      formatter: function () {
        return `
        <div style="color:${this.color}; font-size: 0.7rem; text-transform: uppercase;"><b>${this.x}:</b></div>
        <span style="color:${this.color}; font-size: 0.9rem"> <b>${this.y}x</b><br/>
        `;
      }
    },

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },

    series: this.chartSeries,

    responsive: {
      rules: [{
        condition: {
          maxWidth: 700
        },
        chartOptions: {
          chart: {
            scrollablePlotArea: {
              minWidth: 700,
              scrollPositionX: 1
            }
          },
          title: {
            text: this.reversePerspective ? 'Mult. de dano ao ser atacado' : 'Mult. de dano ao atacar'
          },
          legend: {
            enabled: false,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          pane: {
            size: '100%'
          }
        }
      }]
    }

  };

  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit(): void {
    this.updateData();
  }

  ngOnChanges(): void {
    this.updateData();
  }

  updateData(): void {
    if (this.pokemonTypes) {
      this.pokemonTypes.map(a => {
        this.categories.push(a.name);
      });
    }

    if (this.pokemonTypes && this.typeSelected) {

      this.chartData = this.normalizeCategories(this.chartData);

      this.chartSeries.splice(0, this.chartSeries.length);
      this.chartSeries.push({
        name: this.typeSelected.name.toUpperCase(),
        // name: this.reversePerspective ? 'Causa' : 'Recebe',
        // data: Object.values(this.chartData!),
        data: this.chartData,
        // type: 'area',
        type: 'column',
        pointPlacement: 'on'
      });
      this.chartOptions.title = {
        text: this.reversePerspective ? 'Multiplicador de dano ao ser atacado' : 'Multiplicador de dano ao atacar'
      }
      this.updateFlag = true;
    }
  }

  normalizeCategories(compareObj: any): any {
    const doubleDamage = this.normalizeCategoryKey(this.typeSelected, 'double_damage');
    const halfDamage = this.normalizeCategoryKey(this.typeSelected, 'half_damage');
    const noDamage = this.normalizeCategoryKey(this.typeSelected, 'no_damage');

    compareObj = this.categories.reduce((a: any, v: any) => ({ ...a, [v]: 1 }), {});
    compareObj = doubleDamage.reduce((a: any, v: any) => ({ ...compareObj, ...a, [v]: 2 }), compareObj);
    compareObj = halfDamage.reduce((a: any, v: any) => ({ ...compareObj, ...a, [v]: 0.5 }), compareObj);
    compareObj = noDamage.reduce((a: any, v: any) => ({ ...compareObj, ...a, [v]: 0 }), compareObj);

    const columnFormattedValue = Object.keys(compareObj)
      .map((key) => ({ y: compareObj[key], color: this.normalizeColumnColor(compareObj[key]) }));

    return columnFormattedValue;
  }

  normalizeCategoryKey(pokemonType: PokemonType, stringKey: string): any {
    if (stringKey) {
      const relationKey = this.reversePerspective ? '_from' : '_to';
      const fullKey = stringKey + relationKey;
      return pokemonType.damage_relations[fullKey as keyof typeof pokemonType.damage_relations].map((dmgType: DamageType) => dmgType.name);
    }
  }

  normalizeColumnColor(value: number): string {
    const defaultColor = "#5367da";
    const goodColor = "#52a675";
    const badColor = "#d9373d";

    let color = defaultColor;

    if (value > 1) {
      color = this.reversePerspective ? badColor : goodColor;
    } else if (value < 1) {
      color = this.reversePerspective ? goodColor : badColor;
    }

    return color;
  }
}
