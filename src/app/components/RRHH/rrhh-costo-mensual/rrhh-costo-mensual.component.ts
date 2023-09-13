import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-rrhh-costo-mensual',
  templateUrl: './rrhh-costo-mensual.component.html',
  styleUrls: ['./rrhh-costo-mensual.component.css']
})

export class RrhhCostoMensualComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'RRHH costos mensuales';
  nameDataResponse = 'costoMensual';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Empresa', field: 'empresa', type: '' },
    { name: 'Area', field: 'area', type: '' },
    { name: 'Posición', field: 'posicion', type: '' },
    { name: 'Empleados', field: 'empleados', type: '' },
    { name: 'Sueldo', field: 'sueldo', type: '' },
    { name: 'Costo Mensual', field: 'costoMensual', type: '' },
  ];


 

  actionsTable: any = [];

  @ViewChild(TableComponent) childTable: any;
  constructor(
    private titleS: Title,
    private comunicarEN: ComunicarEmpresaAnavbarService
  ) {
    this.titleS.setTitle(this.title);
  }

  ngOnInit(): void {
    this.comunicarEN.sendUpdate('mostrar');
    this.getEmpresa();
  }

  getEmpresa() {
    this.empresa_id = localStorage.getItem('empresa_selec');
    this.url_table = `${environment.api_url}costomensual?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}



