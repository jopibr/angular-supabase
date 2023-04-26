import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { DataBaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends DataBaseService<Categoria> {

  constructor() {
    super('categorias');
   }
}
