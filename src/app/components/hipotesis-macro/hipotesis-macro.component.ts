import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-hipotesis-macro',
  templateUrl: './hipotesis-macro.component.html',
  styleUrls: ['./hipotesis-macro.component.css'],
})
export class HipotesisMacroComponent {
  empresa_id:any = false;
  loading = false;
  edit: any = {};
  title = 'Parametrización general';
  dataR: any;
  url_table = `${environment.api_url}hipotesis-macroeconomicas`;
  columnsTable: any = [
    { name: 'Acc.', field: 'actions', type: '' },
    { name: 'Empresa', field: 'empresa', type: '' },
  ];

  actionsTable: any = [
    {
      numbre: '',
      ico: 'fas fa-edit',
      tooltip: 'Editar',
      class: 'btn-primary',
      function: 'modal-edit',
    },
    // {
    //   numbre: '',
    //   ico: 'fas fa-trash-alt',
    //   tooltip: 'Eliminar',
    //   class: 'btn-danger',
    //   function: 'modal-delete',
    // },
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
    this.empresa_id = localStorage.getItem('empresa_selec');
    this.comunicarEN.sendUpdate(
      'ocultar'
    );
  }

  openModal(modalcreate: any, edit: any = false, size: any = false) {
    if (edit) {
      this.edit = edit;
      this.getDataAndRelations();
      return;
    } else {
      this.edit = {};
    }
    this.modalService.open(modalcreate, { size: size ? size : 'xl' });
  }

  getDataAndRelations() {
    this.loading = true;
    this.http.get(`${this.url_table}/${this.edit.id}`).subscribe(
      (response: any) => {
        console.log('response');

        console.log(response);
        let data = response.data;
        this.loading = false;

        let impuestoRenta = data.impuesto_renta[0];

        let premisasOperativasI = data.premisas_operativas.filter(
          (el: any) => el.nombre == 'Incrementos de Precios Anuales'
        );
        premisasOperativasI = premisasOperativasI[0];

        let premisasOperativasC = data.premisas_operativas.filter(
          (el: any) => el.nombre == 'Comisión de Ventas'
        );
        premisasOperativasC = premisasOperativasC[0];

        let premisasOperativasD = data.premisas_operativas.filter(
          (el: any) => el.nombre == 'Descuentos en Ventas'
        );
        premisasOperativasD = premisasOperativasD[0];

        let premisasRH = data.premisas_r_h[0];
        let premisasRHI = data.premisas_r_h.filter(
          (el: any) => el.nombre == 'Incrementos % Anual de Salarios'
        );
        premisasRHI = premisasRHI[0];

        let premisasRHC = data.premisas_r_h.filter(
          (el: any) => el.nombre == 'Costo Beneficios Sociales Laborales'
        );
        premisasRHC = premisasRHC[0];

        let premisasRHA = data.premisas_r_h.filter(
          (el: any) => el.nombre == 'Aporte de Socios - Capital'
        );
        premisasRHA = premisasRHA[0];

        let nEdit = {
          id: data.id,
          empresa: data.empresa,

          empresa_id: data.empresa_id,

          inf_year1: data.year1,
          inf_year2: data.year2,
          inf_year3: data.year3,
          inf_year4: data.year4,
          inf_year5: data.year5,
          inf_year6: data.year6,
          inf_year7: data.year7,
          inf_year8: data.year8,
          inf_year9: data.year9,
          inf_year10: data.year10,

          ir_year1: impuestoRenta.year1,
          ir_year2: impuestoRenta.year2,
          ir_year3: impuestoRenta.year3,
          ir_year4: impuestoRenta.year4,
          ir_year5: impuestoRenta.year5,
          ir_year6: impuestoRenta.year6,
          ir_year7: impuestoRenta.year7,
          ir_year8: impuestoRenta.year8,
          ir_year9: impuestoRenta.year9,
          ir_year10: impuestoRenta.year10,

          inpa_year1: premisasOperativasI.year1,
          inpa_year2: premisasOperativasI.year2,
          inpa_year3: premisasOperativasI.year3,
          inpa_year4: premisasOperativasI.year4,
          inpa_year5: premisasOperativasI.year5,
          inpa_year6: premisasOperativasI.year6,
          inpa_year7: premisasOperativasI.year7,
          inpa_year8: premisasOperativasI.year8,
          inpa_year9: premisasOperativasI.year9,
          inpa_year10: premisasOperativasI.year10,

          comvta_year1: premisasOperativasC.year1,
          comvta_year2: premisasOperativasC.year2,
          comvta_year3: premisasOperativasC.year3,
          comvta_year4: premisasOperativasC.year4,
          comvta_year5: premisasOperativasC.year5,
          comvta_year6: premisasOperativasC.year6,
          comvta_year7: premisasOperativasC.year7,
          comvta_year8: premisasOperativasC.year8,
          comvta_year9: premisasOperativasC.year9,
          comvta_year10: premisasOperativasC.year10,

          desvta_year1: premisasOperativasD.year1,
          desvta_year2: premisasOperativasD.year2,
          desvta_year3: premisasOperativasD.year3,
          desvta_year4: premisasOperativasD.year4,
          desvta_year5: premisasOperativasD.year5,
          desvta_year6: premisasOperativasD.year6,
          desvta_year7: premisasOperativasD.year7,
          desvta_year8: premisasOperativasD.year8,
          desvta_year9: premisasOperativasD.year9,
          desvta_year10: premisasOperativasD.year10,

          insal_year1: premisasRHI.year1,
          insal_year2: premisasRHI.year2,
          insal_year3: premisasRHI.year3,
          insal_year4: premisasRHI.year4,
          insal_year5: premisasRHI.year5,
          insal_year6: premisasRHI.year6,
          insal_year7: premisasRHI.year7,
          insal_year8: premisasRHI.year8,
          insal_year9: premisasRHI.year9,
          insal_year10: premisasRHI.year10,

          benfso_year1: premisasRHC.year1,
          benfso_year2: premisasRHC.year2,
          benfso_year3: premisasRHC.year3,
          benfso_year4: premisasRHC.year4,
          benfso_year5: premisasRHC.year5,
          benfso_year6: premisasRHC.year6,
          benfso_year7: premisasRHC.year7,
          benfso_year8: premisasRHC.year8,
          benfso_year9: premisasRHC.year9,
          benfso_year10: premisasRHC.year10,

          apsoc_year1: premisasRHA.year1,
          apsoc_year2: premisasRHA.year2,
          apsoc_year3: premisasRHA.year3,
          apsoc_year4: premisasRHA.year4,
          apsoc_year5: premisasRHA.year5,
          apsoc_year6: premisasRHA.year6,
          apsoc_year7: premisasRHA.year7,
          apsoc_year8: premisasRHA.year8,
          apsoc_year9: premisasRHA.year9,
          apsoc_year10: premisasRHA.year10,
        };

        this.edit = nEdit;

        console.log(this.edit);

        this.loading = false;
        this.modalService.open(this.modalCreate, { size: 'xl' });
      },
      (error) => {
        console.log('error');

        console.log(error);
      }
    );
  }

  delete() {
    console.log('delete');
    console.log('delete');
    console.log('delete');
    console.log('delete');
    console.log('delete');

    this.http.delete(`${this.url_table}/${this.edit?.empresa_id}`).subscribe(
      (response: any) => {
        console.log('response');

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
