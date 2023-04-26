import { Component, OnInit } from '@angular/core';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  start: Date;
  end: Date;

  movsTipo: any[];
  movsCategoria: any[];
  movsProduto: any[];

  view: any[] = [500, 400];
  showLegend: boolean = true;
  showLabels: boolean = true;
  legendPosition: string = 'below';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  constructor(private movimentacaoService: MovimentacaoService) {}

  async ngOnInit() {
    this.currenMonth();
    const data = await this.movimentacaoService.getMovimentacoesMonth(
      this.start,
      this.end
    );
    this.groupByCategoria(data.data);  
    this.groupByProduto(data.data);
    const dataTipo = await this.movimentacaoService.getMovimentacoesGroupMonth(
      this.start,
      this.end
    );
    this.groupByTipo(dataTipo.data);
  }

  currenMonth() {
    const date = new Date();
    this.start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
    this.end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  groupByTipo(entries: any[]) {
    let singleCount = [];
    this.movsTipo = [];

    entries.forEach((element) => {
      if (singleCount[element.tipo]) {
        singleCount[element.tipo] += 1;
      } else {
        singleCount[element.tipo] = 1;
      }
    });
    for (let key in singleCount) {
      let singleEntry = {
        name: key,
        value: singleCount[key],
      };
      this.movsTipo.push(singleEntry);
    }
  }

  groupByCategoria(entries: any[]) {
    let singleCount = [];
    this.movsCategoria = [];

    entries.forEach((element) => {
      if (singleCount[element.produtos.categorias.nome]) {
        singleCount[element.produtos.categorias.nome] += element.quantidade;
      } else {
        singleCount[element.produtos.categorias.nome] = element.quantidade;
      }
    });
    for (let key in singleCount) {
      let singleEntry = {
        name: key,
        value: singleCount[key],
      };
      this.movsCategoria.push(singleEntry);
    }
  }

  groupByProduto(entries: any[]) {
    let singleCount = [];
    this.movsProduto = [];

    entries.forEach((element) => {
      console.log(element)
      if (singleCount[element.produtos.nome]) {
        singleCount[element.produtos.nome] += element.quantidade;
      } else {
        singleCount[element.produtos.nome] = element.quantidade;
      }
    });
    for (let key in singleCount) {
      let singleEntry = {
        name: key,
        value: singleCount[key],
      };
      this.movsProduto.push(singleEntry);
    }
   
  }
}
