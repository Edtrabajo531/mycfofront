import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-depreciacion-anual',
  templateUrl: './depreciacion-anual.component.html',
  styleUrls: ['./depreciacion-anual.component.css'],
})

export class DepreciacionAnualComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Depreciación anual';
  nameDataResponse = 'DepreciacionAnual';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Depreciación', field: 'Depreciacion', type: '' },
    { name: 'año 1', field: 'DepAnual1', type: '' },
    { name: 'año 2', field: 'DepAnual2', type: '' },
    { name: 'año 3', field: 'DepAnual3', type: '' },
    { name: 'año 4', field: 'DepAnual4', type: '' },
    { name: 'año 5', field: 'DepAnual5', type: '' },
    { name: 'año 6', field: 'DepAnual6', type: '' },
    { name: 'año 7', field: 'DepAnual7', type: '' },
    { name: 'año 8', field: 'DepAnual8', type: '' },
    { name: 'año 9', field: 'DepAnual9', type: '' },
    { name: 'año 10', field: 'DepAnual10', type: '' },
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
    this.url_table = `${environment.api_url}depreciacionanual?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}
