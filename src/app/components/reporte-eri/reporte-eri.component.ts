import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Response, ResponseContentType } from '@angular/http';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-reporte-eri',
  templateUrl: './reporte-eri.component.html',
  styleUrls: ['./reporte-eri.component.css'],
})
export class ReporteERIComponent {
  api_url = environment.api_url;
  loading = false;
  edit: any = {};
  // table
  title = 'Reporte ERI';
  nameDataResponse = 'Inflacion';
  empresa_id: any = '';
  loaded = false;
  dataR: any;
  url_table = '';
  data: any = {};
  user:any;
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
    private comunicarEN: ComunicarEmpresaAnavbarService,
    private http: HttpClient,
    private authS:AuthService
  ) {
    this.titleS.setTitle(this.title);
  }

  ngOnInit(): void {

    this.user = this.authS.getAuth();
    this.comunicarEN.sendUpdate('mostrar');
    // this.getEmpresa();

    this.getData();
  }
  

  downloadExcel(){
    
    this.http.get(this.api_url+'eri-excel').subscribe(
      (response: any) => {
        console.log("response");
        console.log(response);
        console.log("response XX");
        
      },
      (error) => {
        console.log("error");
        
        console.log(error);
        
      }
    );
       
    }
  // getEmpresa() {
  //   this.empresa_id = localStorage.getItem('empresa_selec');
  //
  //   this.loaded = true;
  // }

  getData() {
    this.loading = true;
    this.empresa_id = localStorage.getItem('empresa_selec');
    this.url_table = `${environment.api_url}eri?empresa_id=${this.empresa_id}`;

    this.http.get(this.url_table).subscribe(
      (response: any) => {
        
        this.data = response;
        console.log(this.data);
        console.log('this.data');

        console.log('SI');
        this.loaded = true;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error);
        console.log('NO');
      }
    );
  }

  getArray(object:any) {
    if(!object){
      return [];
    }
    return Object.values(object);
  }

  formatNumber(val:any){
    return Number(val).toFixed(2);
  }
}

// SQLSTATE[42S22]: Column not found: 1054 Unknown column 'tipo_activos.categoria' in 'where clause' (Connection: mysql, SQL: select `capexes`.`empresa_id` as `empresa_id`, `tipo_activos`.`id` as `tipo_activo_id`, `tipo_activos`.`tipo` as `tipo_activo_nombre`, SUM(COALESCE(capexes.year1, 0)) as year1, SUM(COALESCE(capexes.year2, 0)) as year2, SUM(COALESCE(capexes.year3, 0)) as year3, SUM(COALESCE(capexes.year4, 0)) as year4, SUM(COALESCE(capexes.year5, 0)) as year5, SUM(COALESCE(capexes.year6, 0)) as year6, SUM(COALESCE(capexes.year7, 0)) as year7, SUM(COALESCE(capexes.year8, 0)) as year8, SUM(COALESCE(capexes.year9, 0)) as year9, SUM(COALESCE(capexes.year10, 0)) as year10 from `tipo_activos` left join `capexes` on `tipo_activos`.`id` = `capexes`.`tipo_activo_id` where `tipo_activos`.`user_id` = 1 and `tipo_activos`.`categoria` = 1 and `capexes`.`empresa_id` = 3 or `capexes`.`empresa_id` is null group by `tipo_activos`.`id`, `tipo_activos`.`tipo`, `capexes`.`empresa_id`
