import { Injectable } from '@angular/core';
import { Movimentacao } from '../models/movimentacao.model';
import { DataBaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService extends DataBaseService<Movimentacao> {
  constructor() {
    super('movimentacoes');
  }

  async getLastMovimentacoes(produtoId: string) {
    const data = await this.supabase
      .from<Movimentacao>(this.table)
      .select(
        `
         *,
        produtos(*)
        `
      )
      .eq('produtoId', produtoId)
      .order('dataMovimentacao', { ascending: false });

    return data;
  }

  async getMovimentacoesGroupMonth(start: Date, end: Date) {
    const data = await this.supabase
      .from<Movimentacao>(this.table)
      .select('id, tipo, quantidade')
      .gte('dataMovimentacao', start.toLocaleDateString('en-US'))
      .lte('dataMovimentacao', end.toLocaleDateString('en-US'))
      .order('dataMovimentacao', { ascending: false });

    return data;
  }

  async getMovimentacoesMonth(start: Date, end: Date) {
    const data = await this.supabase
      .from<Movimentacao>(this.table)
      .select(`
        *,
        produtos(*,
          categorias(nome)
          )      
      `)
      .gte('dataMovimentacao', start.toLocaleDateString('en-US'))
      .lte('dataMovimentacao', end.toLocaleDateString('en-US'))
      .order('dataMovimentacao', { ascending: false });

    return data;
  }
}
