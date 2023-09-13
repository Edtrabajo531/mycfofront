import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-proyeccion-costos',
  templateUrl: './proyeccion-costos.component.html',
  styleUrls: ['./proyeccion-costos.component.css']
})

export class ProyeccionCostosComponent {

  loading = false;
  edit: any = {};
  // table
  title = 'Proyección costos';
  nameDataResponse = 'Inflacion';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Producto', field: 'nombre_producto', type: '' },
    { name: 'año 1', field: 'año1', type: '' },
    { name: 'año 2', field: 'año2', type: '' },
    { name: 'año 3', field: 'año3', type: '' },
    { name: 'año 4', field: 'año4', type: '' },
    { name: 'año 5', field: 'año5', type: '' },
    { name: 'año 6', field: 'año6', type: '' },
    { name: 'año 7', field: 'año7', type: '' },
    { name: 'año 8', field: 'año8', type: '' },
    { name: 'año 9', field: 'año9', type: '' },
    { name: 'año 10', field: 'año10', type: '' },
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
    this.url_table = `${environment.api_url}proycostos?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}



