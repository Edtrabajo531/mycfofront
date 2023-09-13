import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-inversion-en-salarios',
  templateUrl: './inversion-en-salarios.component.html',
  styleUrls: ['./inversion-en-salarios.component.css'],
})

export class InversionEnSalariosComponent {
  loading = false;
  edit: any = {};
  // table
  title = 'Inversión en salarios';
  nameDataResponse = 'inversionSalarios';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Empresa', field: 'empresa', type: '' },
    { name: 'Año 1', field: 'año1', type: '' },
    { name: 'Año 2', field: 'año2', type: '' },
    { name: 'Año 3', field: 'año3', type: '' },
    { name: 'Año 4', field: 'año4', type: '' },
    { name: 'Año 5', field: 'año5', type: '' },
    { name: 'Año 6', field: 'año6', type: '' },
    { name: 'Año 7', field: 'año7', type: '' },
    { name: 'Año 8', field: 'año8', type: '' },
    { name: 'Año 9', field: 'año9', type: '' },
    { name: 'Año 10', field: 'año10', type: '' },
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
    this.url_table = `${environment.api_url}inversionsalarios?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}
