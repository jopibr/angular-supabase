import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Movimentacao } from 'src/app/models/movimentacao.model';
import { Produto } from 'src/app/models/produto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss'],
})
export class MovimentacaoComponent implements OnInit {
  // CRUD
  edit: boolean;
  view: string = 'table';
  form = new FormGroup({});
  model: Movimentacao;
  fields: FormlyFieldConfig[];

  //Combos
  categorias: Categoria[];
  categoriaSelecionada: Categoria;
  produtos: Produto[];
  produtoSelecionado: Produto;
  movimentacoes: any[];

  tipos: any[] = [
    { label: 'Entrada', value: 'Entrada' },
    { label: 'Saída', value: 'Saída' },
  ];

  //Para atualizar o Estoque
  quantidadeAux: number;

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private movimentacaoService: MovimentacaoService,
    private toastrService: NbToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.categorias = await this.categoriaService.getAll();
    this.buildForm();
  }

  buildForm() {
    this.fields = [
      {
        key: 'tipo',
        focus: true,
        type: 'select',
        templateOptions: {
          label: 'Tipo',
          type: 'text',
          placeholder: 'Selecione um tipo',
          required: true,
          options: this.tipos,
        },
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'dataMovimentacao',
            type: 'input',
            templateOptions: {
              label: 'Data Movimentação',
              type: 'date',
            },
          },
          {
            className: 'col-6',
            key: 'quantidade',
            type: 'input',
            templateOptions: {
              label: 'Quantidade',
              type: 'number',
              min: 1,
              required: true,
            },
          },
        ],
      },
    ];
  }

  loadMovimentacoes() {
    this.movimentacaoService
      .getLastMovimentacoes(this.produtoSelecionado.id)
      .then((dados) => (this.movimentacoes = dados.data));
  }

  async filterByCategoria() {
    this.produtos = await this.produtoService.getByCategoria(
      this.categoriaSelecionada.id
    );
  }

  inventory(modo: string = 'add') {
    switch (modo) {
      case 'add': {
        if (this.model.tipo == 'Entrada') {
          this.produtoSelecionado.quantidadeEstoque =
            this.produtoSelecionado.quantidadeEstoque + this.model.quantidade;
        } else {
          this.produtoSelecionado.quantidadeEstoque =
            this.produtoSelecionado.quantidadeEstoque - this.model.quantidade;
        }
        break;
      }
      case 'update': {
        if (this.model.tipo == 'Entrada') {
          this.produtoSelecionado.quantidadeEstoque =
            this.produtoSelecionado.quantidadeEstoque -
            this.quantidadeAux +
            this.model.quantidade;
        } else {
          this.produtoSelecionado.quantidadeEstoque =
            this.produtoSelecionado.quantidadeEstoque +
            this.quantidadeAux +
            this.model.quantidade;
        }
        break;
      }
      default: {
        if (this.model.tipo == 'Entrada') {
          this.produtoSelecionado.quantidadeEstoque =
            this.produtoSelecionado.quantidadeEstoque - this.quantidadeAux;
        } else {
          this.produtoSelecionado.quantidadeEstoque =
            this.produtoSelecionado.quantidadeEstoque + this.quantidadeAux;
        }
        break;
      }
    }
    this.produtoSelecionado.ultimaAtualizacao = new Date();
    this.produtoService.update(this.produtoSelecionado);
  }

  add() {
    this.form.reset();
    this.model = new Movimentacao();
    this.edit = false;
    this.model.produtoId = this.produtoSelecionado.id;
    this.model.quantidade = 1;
    this.model.dataMovimentacao = new Date();
    this.view = 'form';
  }

  update() {
    this.movimentacaoService.update(this.model);
    this.view = 'table';
    this.message('OK', 'Movimentação atualizada com sucesso.', 'success');
    this.inventory('update');
  }

  seleciona(movimentacao: Movimentacao) {
    this.model = movimentacao;
    this.view = 'form';
    this.edit = true;
    this.quantidadeAux = movimentacao.quantidade;
  }

  cancel() {
    this.view = 'table';
  }

  save() {
    if (this.form.valid) {
      if (this.model.id) {
        this.update();
        return;
      }

      this.movimentacaoService.add(this.model).then((dados) => {
        this.cancel();
        if (!dados.error) {
          this.model = dados.data[0];
          this.model.produtos = this.produtoSelecionado;
          this.inventory();
          this.movimentacoes.push(...dados.data);
          this.message('Ok', 'Movimentação salva com sucesso.', 'success');
        } else {
          this.message(
            'Erro',
            `Erro ao salvar. Destalhes ${dados.error.message}`,
            'danger'
          );
        }
      });
    }
  }

  remove(mov: Movimentacao) {
    this.model = mov;
    this.quantidadeAux = this.model.quantidade;
    this.movimentacaoService.delete(mov).then(() => {
      this.inventory('delete');
      this.movimentacoes = this.arrayRemove(this.movimentacoes, mov.id);
      this.message('Exclusão', `Movimentação excluída com sucesso.`, 'danger');
    });
  }

  arrayRemove(arr: Produto[], id: string) {
    return arr.filter((ele) => ele.id != id);
  }

  private message(title: string, message: string, status: string) {
    this.toastrService.show(title, message, {
      status: status,
      duration: 3000,
    });
  }
}