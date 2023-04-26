import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Produto } from 'src/app/models/produto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  edit: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model: Produto;
  produtos: Produto[];
  categorias: Categoria[];
  fields: FormlyFieldConfig[];

  constructor(
    private toastService: NbToastrService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) {}

  async ngOnInit() {
    this.produtos = await this.produtoService.getAll(10);
    this.categorias = await this.categoriaService.getAll();
    this.buildForm();
    this.cancel();
  }

  cancel() {
    this.view = 'table';
    this.form.reset();
  }

  buildForm() {
    this.fields = [
      {
        key: 'categoriaId',
        type: 'select',
        templateOptions: {
          label: 'Categoria',
          type: 'text',
          placeholder: 'Selecione uma categoria',
          required: true,
          options: this.categorias.map((categoria) => ({
            label: categoria.nome,
            value: categoria.id,
          })),
        },
      },
      {
        key: 'nome',
        type: 'input',
        templateOptions: {
          label: 'Nome',
          type: 'text',
          placeholder: 'Informe um nome',
          required: true,
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-4',
            key: 'valorVenda',
            type: 'input',
            templateOptions: {
              label: 'Valor Venda',
              type: 'number',
              placeholder: '0,00',
              required: true,
            },
          },
          {
            className: 'col-4',
            key: 'quantidadeEstoque',
            type: 'input',
            templateOptions: {
              label: 'Estoque atual',
              type: 'number',
              min: 0,
              required: true,
            },
          },
          {
            className: 'col-4',
            key: 'estoqueMinimo',
            type: 'input',
            templateOptions: {
              label: 'Qtd mínima',
              type: 'number',
              min: 0,
              required: true,
            },
          },
        ],
      },
      {
        key: 'descricao',
        type: 'textarea',
        templateOptions: {
          label: 'Descricao',
          maxLength: 100,
          rows: 5,
        },
      },
    ];
  }

  add() {
    this.form.reset();
    this.model = new Produto();
    this.edit = false;
    this.view = 'form';
  }

  save() {
    if (this.form.valid) {
      if (this.model.id) {
        this.update();
        return;
      }
      this.produtoService.add(this.model).then((dados) => {
        if (!dados.error) {
          this.produtos.push(dados.data[0]);
          this.view = 'table';
          this.message('Ok', 'Produto salva com sucesso', 'success');
        } else {
          this.message(
            'Erro',
            `Erro ao salvar. Detalhes: ${dados.error.message}`,
            'danger'
          );
        }
      });
    }
  }

  update() {
    this.produtoService.update(this.model).then(() => {
      const index = this.produtos.findIndex((c) => c.id == this.model.id);
      this.produtos[index] = this.model;
      this.view = 'table';
      this.message('Ok', 'Produto atualizada com sucesso', 'success');
    });
  }

  seleciona(produto: Produto) {
    this.edit = true;
    this.view = 'form';
    this.model = produto;
  }

  remove(produto: Produto) {
    this.produtoService.delete(produto).then(() => {
      this.produtos = this.arrayRemove(this.produtos, produto.id);
      this.message('Exclusão', 'Produto excluída com sucesso', 'danger');
    });
  }

  arrayRemove(arr: Produto[], id: string) {
    return arr.filter((c) => c.id != id);
  }

  private message(title: string, message: string, status: string) {
    this.toastService.show(title, message, {
      status: status,
      duration: 3000,
    });
  }
}
