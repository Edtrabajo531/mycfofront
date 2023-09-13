import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-inversion-rubros-dep',
  templateUrl: './inversion-rubros-dep.component.html',
  styleUrls: ['./inversion-rubros-dep.component.css']
})
export class InversionRubrosDepComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Inversión por rubros';
  nameDataResponse = 'inversionRubros';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Tipo activo', field: 'tipo_activo_nombre', type: '' },
    { name: 'año 1', field: 'year1', type: '' },
    { name: 'año 2', field: 'year2', type: '' },
    { name: 'año 3', field: 'year3', type: '' },
    { name: 'año 4', field: 'year4', type: '' },
    { name: 'año 5', field: 'year5', type: '' },
    { name: 'año 6', field: 'year6', type: '' },
    { name: 'año 7', field: 'year7', type: '' },
    { name: 'año 8', field: 'year8', type: '' },
    { name: 'año 9', field: 'year9', type: '' },
    { name: 'año 10', field: 'year10', type: '' },
   
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
    this.url_table = `${environment.api_url}inversionrubros?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}
