import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-proyeccion-ingresos-mensuales',
  templateUrl: './proyeccion-ingresos-mensuales.component.html',
  styleUrls: ['./proyeccion-ingresos-mensuales.component.css']
})

export class ProyeccionIngresosMensualesComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Proyección ingresos mensuales';
  nameDataResponse = 'proyeccionIngresosMensual';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Producto', field: 'nombre_producto', type: '' },
    { name: 'mes 1', field: 'ingreso-mensual1', type: '' },
    { name: 'mes 2', field: 'ingreso-mensual2', type: '' },
    { name: 'mes 3', field: 'ingreso-mensual3', type: '' },
    { name: 'mes 4', field: 'ingreso-mensual4', type: '' },
    { name: 'mes 5', field: 'ingreso-mensual5', type: '' },
    { name: 'mes 6', field: 'ingreso-mensual6', type: '' },
    { name: 'mes 7', field: 'ingreso-mensual7', type: '' },
    { name: 'mes 8', field: 'ingreso-mensual8', type: '' },
    { name: 'mes 9', field: 'ingreso-mensual9', type: '' },
    { name: 'mes 10', field: 'ingreso-mensual10', type: '' },
    { name: 'mes 12', field: 'ingreso-mensual11', type: '' },
    { name: 'mes 2', field: 'ingreso-mensual12', type: '' },

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
    this.url_table = `${environment.api_url}proyingmensuales?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}

