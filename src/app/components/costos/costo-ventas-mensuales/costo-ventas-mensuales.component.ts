
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-costo-ventas-mensuales',
  templateUrl: './costo-ventas-mensuales.component.html',
  styleUrls: ['./costo-ventas-mensuales.component.css']
})

export class CostoVentasMensualesComponent {

  loading = false;
  edit: any = {};
  // table
  title = 'Costos ventas mensuales';
  nameDataResponse = 'costosMensual';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';

  columnsTable: any = [
    { name: 'Producto', field: 'nombre_producto', type: '' },
    { name: 'mes 1', field: 'costo-mensual1', type: '' },
    { name: 'mes 2', field: 'costo-mensual2', type: '' },
    { name: 'mes 3', field: 'costo-mensual3', type: '' },
    { name: 'mes 4', field: 'costo-mensual4', type: '' },
    { name: 'mes 5', field: 'costo-mensual5', type: '' },
    { name: 'mes 6', field: 'costo-mensual6', type: '' },
    { name: 'mes 7', field: 'costo-mensual7', type: '' },
    { name: 'mes 8', field: 'costo-mensual8', type: '' },
    { name: 'mes 9', field: 'costo-mensual9', type: '' },
    { name: 'mes 10', field: 'costo-mensual10', type: '' },
    { name: 'mes 12', field: 'costo-mensual11', type: '' },
    { name: 'mes 2', field: 'costo-mensual12', type: '' },
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
    this.url_table = `${environment.api_url}costosmensuales?empresa_id=${this.empresa_id}`;
    this.loaded = true;
  }
}




