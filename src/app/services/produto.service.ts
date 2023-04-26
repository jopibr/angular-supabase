import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { DataBaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends DataBaseService<Produto> {
  constructor() {
    super('produtos');
  }

  async getByCategoria(categoriaId: string) {
    const data = await this.supabase
      .from<Produto>(this.table)
      .select('*')
      .eq('categoriaId', categoriaId)
      .order('nome');

    return data.data;
  }
}
