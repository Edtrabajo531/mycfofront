import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import {Title} from "@angular/platform-browser";
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';
  

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})

export class PlanComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Planes';
  dataR: any;
  url_table = `${environment.api_url}plans`;
  columnsTable: any = [
    { name: 'Acc.', field: 'actions',type:'' },
    { name: 'Nombre', field: 'nombre',type:'' },
    { name: 'Limite', field: 'limite',type:'' },
    { name: 'Precio', field: 'precio',type:'number' },
    { name: 'Creado', field: 'created_at', type:'dateComplete'},
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
    private titleS:Title,
    private comunicarEN: ComunicarEmpresaAnavbarService
  ) {
    configM.backdrop = 'static';
    
    this.titleS.setTitle(this.title);
  }
  ngOnInit(): void {
    
    this.comunicarEN.sendUpdate('ocultar');

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
    this.http
      .delete(`${this.url_table}/${this.edit?.id}`)
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

  success(message:any) {
    this.childTable.getItems();
    this.modalService.dismissAll();
    this.toastS.success(message);
  }

}

