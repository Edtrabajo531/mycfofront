import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-anno-depreciar',
  templateUrl: './anno-depreciar.component.html',
  styleUrls: ['./anno-depreciar.component.css'],
})

export class AnnoDepreciarComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Depreciaciones';
  nameDataResponse = 'depreciaciones';
  dataR: any;
  url_table = `${environment.api_url}depreciaciones`;
  columnsTable: any = [
    { name: 'Acc.', field: 'actions', type: '' },
    { name: 'Año', field: 'year_depreciacion', type: '' },
    { name: 'Tipo activo', field: 'tipo_activo', type: '' },
  ];
  empresas = [];
  tiposactivos = [];
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
    private titleS: Title
  ) {
    this.titleS.setTitle(this.title);
    configM.backdrop = 'static';
  }
  ngOnInit(): void {
    this.getRecursos();
  }

  openModal(modalcreate: any, edit: any = false, size: any = false) {
    if (edit) {
      this.edit = edit;
    } else {
      this.edit = {};
    }
    this.modalService.open(modalcreate, { size: size ? size : 'md' });
  }

  delete() {
    this.http.delete(`${this.url_table}/${this.edit?.id}`).subscribe(
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

  getRecursos() {
    this.loading = true;
    this.http.get(`${environment.api_url}capex-recursos`).subscribe(
      (response: any) => {
        this.loading = false;
        this.empresas = response.empresas;
        this.tiposactivos = response.tipoactivos;
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
