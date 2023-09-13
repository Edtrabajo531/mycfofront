import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-gastos-operativos',
  templateUrl: './gastos-operativos.component.html',
  styleUrls: ['./gastos-operativos.component.css'],
})
export class GastosOperativosComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Gastos operativos';

  nameDataResponse = 'gastosoperativos';

  dataR: any;
  url_table = '';
  empresa_id: any = '';
  loaded: any = false;
  columnsTable: any = [
    { name: 'Acc.', field: 'actions', type: '' },
    { name: 'Empresa', field: 'empresa', type: '' },
    { name: 'Rubro', field: 'rubro', type: '' },
    { name: 'Mensual', field: 'mensual' },
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
  empresas = [];
  ngOnInit(): void {
    
    this.comunicarEN.sendUpdate('mostrar');

    this.getEmpresa();
    this.getRecursos();
  }

  getEmpresa() {
    this.empresa_id = localStorage.getItem('empresa_selec');
    this.url_table = `${environment.api_url}gastos-operativos?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }

  getRecursos() {
    this.loading = true;
    this.http.get(`${environment.api_url}gastos-operativos-recursos`).subscribe(
      (response: any) => {
        this.loading = false;
        this.empresas = response.empresas;
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
    this.modalService.open(modalcreate, { size: size ? size : 'lg' });
  }

  delete() {
    this.http.delete(`${environment.api_url}gastos-operativos/${this.edit?.id}`).subscribe(
      (response: any) => {
        console.log(response);

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
