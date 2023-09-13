import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-proyeccion-ingresos-anuales',
  templateUrl: './proyeccion-ingresos-anuales.component.html',
  styleUrls: ['./proyeccion-ingresos-anuales.component.css']
})

export class ProyeccionIngresosAnualesComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Proyección ingresos anuales';
  nameDataResponse = 'proyeccionIngresosAnual';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Producto', field: 'nombre_producto', type: '' },
    { name: 'año 1', field: 'ingreso-anual1', type: '' },
    { name: 'año 2', field: 'ingreso-anual2', type: '' },
    { name: 'año 3', field: 'ingreso-anual3', type: '' },
    { name: 'año 4', field: 'ingreso-anual4', type: '' },
    { name: 'año 5', field: 'ingreso-anual5', type: '' },
    { name: 'año 6', field: 'ingreso-anual6', type: '' },
    { name: 'año 7', field: 'ingreso-anual7', type: '' },
    { name: 'año 8', field: 'ingreso-anual8', type: '' },
    { name: 'año 9', field: 'ingreso-anual9', type: '' },
    { name: 'año 10', field: 'ingreso-anual10', type: '' },
    { name: 'año 12', field: 'ingreso-anual11', type: '' },
    { name: 'año 2', field: 'ingreso-anual12', type: '' },

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
    this.url_table = `${environment.api_url}proyinganuales?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}


