import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  edit: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model: Categoria;
  categorias: Categoria[];
  fields: FormlyFieldConfig[];

  constructor(
    private toastService: NbToastrService,
    private categoriaService: CategoriaService
  ) { }

  async ngOnInit(): Promise<void> {
    this.categorias = await this.categoriaService
      .getAll(10)
      
    this.buildForm();
    this.cancel();
  }

  cancel(){
    this.view = 'table';
    this.form.reset();
  }
 
  buildForm() {
    this.fields = [
      {
        key: 'nome',
        type: 'input',
        templateOptions: {
          label: 'Nome',
          type: 'text',
          placeholder: 'Informe um nome',
          required: true,
        }
      },
      {
        key: 'descricao',
        type: 'textarea',
        templateOptions: {
          label: 'Descricao',
          maxLength: 100,
          rows: 5
        }
      },
    ]
  }

  add() {
    this.form.reset();
    this.model = new Categoria();
    this.edit = false;
    this.view = 'form';
  }

  save() {
    if (this.form.valid) {
      if (this.model.id) {
        this.update();
        return;
      }
      this.categoriaService
        .add(this.model)
        .then((dados) => {
          if (!dados.error) {
            this.categorias.push(dados.data[0]);
            this.view = 'table';
            this.message('Ok', 'Categoria salva com sucesso', 'success')
          } else {
            this.message('Erro', `Erro ao salvar. Detalhes: ${dados.error.message}`, 'danger')
          }
        })
    }
  }

  update() {
    this.categoriaService.update(this.model)
      .then(() => {
        const index = this.categorias.findIndex((c => c.id == this.model.id));
        this.categorias[index] = this.model;
        this.view = 'table';
        this.message('Ok', 'Categoria atualizada com sucesso', 'success')
      })
  }

  seleciona(categoria: Categoria) {
    this.edit = true;
    this.view = 'form';
    this.model = categoria;
  }

  remove(categoria: Categoria) {
    this.categoriaService.delete(categoria)
      .then(() => {
        this.categorias = this.arrayRemove(this.categorias, categoria.id);
        this.message('Exclusão', 'Categoria excluída com sucesso', 'danger')
      })
  }

  arrayRemove(arr: Categoria[], id: string) {
    return arr.filter((c) => c.id != id);
  }

  private message(title: string, message: string, status: string) {
    this.toastService.show(title, message,
      {
        status: status,
        duration: 3000,
      })
  }

}

