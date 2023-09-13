
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-gastos-fijos',
  templateUrl: './gastos-fijos.component.html',
  styleUrls: ['./gastos-fijos.component.css']
})
export class GastosFijosComponent {

  loading = false;
  edit: any = {};
  // table
  title = 'Costos ventas anuales';
  nameDataResponse = 'CostosAnual';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Producto', field: 'nombre_producto', type: '' },
    { name: 'mes 1', field: 'costo-anual1', type: '' },
    { name: 'mes 2', field: 'costo-anual2', type: '' },
    { name: 'mes 3', field: 'costo-anual3', type: '' },
    { name: 'mes 4', field: 'costo-anual4', type: '' },
    { name: 'mes 5', field: 'costo-anual5', type: '' },
    { name: 'mes 6', field: 'costo-anual6', type: '' },
    { name: 'mes 7', field: 'costo-anual7', type: '' },
    { name: 'mes 8', field: 'costo-anual8', type: '' },
    { name: 'mes 9', field: 'costo-anual9', type: '' },
    { name: 'mes 10', field: 'costo-anual10', type: '' },
   
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
    this.url_table = `${environment.api_url}costosanuales?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}
