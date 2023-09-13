import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-proyeccion-unidades-vender',
  templateUrl: './proyeccion-unidades-vender.component.html',
  styleUrls: ['./proyeccion-unidades-vender.component.css'],
})
export class ProyeccionUnidadesVenderComponent {
  loading = false;
  edit: any = {};
  // table
  empresas = [];
  title = 'Proyección unidad a vender';
  dataR: any;
  empresa_id: any = '';
  loaded: any = false;
  productos = [];
  url_table = '';
  columnsTable: any = [
    { name: 'Acc.', field: 'actions' },
    { name: 'Producto', field: 'producto' },
  ];
  actionsTable: any = [
    {
      numbre: '',
      ico: 'fas fa-edit',
      tooltip: 'Editar',
      class: 'btn-primary',
      function: 'modal-edit',
    },
    {
      numbre: '',
      ico: 'fas fa-trash-alt',
      tooltip: 'Eliminar',
      class: 'btn-danger',
      function: 'modal-delete',
    },
  ];

  @ViewChild('modalCreate') modalCreate!: ElementRef;
  @ViewChild('modalDelete') modalDelete!: ElementRef;

  @ViewChild(TableComponent) childTable: any;
  constructor(
    private modalService: NgbModal,
    private configM: NgbModalConfig,
    private http: HttpClient,
    private toastS: ToastrService,
    private titleS: Title,
    private comunicarEN: ComunicarEmpresaAnavbarService
  ) {
    this.titleS.setTitle(this.title);
    configM.backdrop = 'static';
  }

  ngOnInit(): void {
    this.comunicarEN.sendUpdate('mostrar');

    this.getEmpresa();
  }



  getEmpresa() {
    this.empresa_id = localStorage.getItem('empresa_selec');
    this.url_table = `${environment.api_url}proyeccion-mes-unidad-ventas?empresa_id=${this.empresa_id}`;
    this.getRecursos();
  }

  getRecursos() {
    this.http
      .get(
        `${environment.api_url}proyeccion-mes-unidad-ventas-recursos?empresa_id=` +
          this.empresa_id
      )
      .subscribe(
        (response: any) => {
          this.productos = response.productos;
          this.empresas = response.empresas;
   

          
          this.loading = false;
          this.loaded = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openModal(modalcreate: any, edit: any = false, size: any = false) {
    if (edit) {
      this.edit = edit;
    } else {
      this.edit = {};
    }
    this.modalService.open(modalcreate, { size: size ? size : 'xl' });
  }

  delete() {
    this.http
      .delete(
        `${environment.api_url}proyeccion-mes-unidad-ventas/${this.edit?.id}`
      )
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.success(response.message);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  receivedToChild(e: any) {
    if (e.action == 'closeModal') {
      this.modalService.dismissAll();
    } else if (e.action == 'modal-edit') {
      this.openModal(this.modalCreate, e.value);
    } else if (e.action == 'modal-delete') {
      this.openModal(this.modalDelete, e.value, 'sm');
    } else if (e.action == 'msg-success') {
      this.success(e.value);
    }
  }

  success(message: any) {
    this.childTable.getItems();
    this.modalService.dismissAll();
    this.toastS.success(message);
  }
}
