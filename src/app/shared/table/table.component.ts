import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(private http: HttpClient) {}
  @Input() title: any;
  @Input() nameDataResponse: any;

  @Input() url: any;
  @Input() columns: any;
  @Input() actions: any;
  @Input() url_datos_filtros: any;
  @Input() filtros_a_usar: any;
  @Input() footerTotales = false;
  @Input() footerNoTotales:any = [];

  
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output()
  sendToF = new EventEmitter<any>();
  desde = moment().subtract(7, 'days').format('YYYY-MM-DD');
  hasta = moment().format('YYYY-MM-DD');
  filters = '';
  data_filtros: any = {};
  showFiltros = false;
  loading = true;
  displayedColumns: string[] = [];

  dataSource: any;
  empresaselec = '';
  loaded = false;
  dataCount = 0;
  ngOnInit() {
    this.displayedColumns = this.columns.map((t: any) => t.field);
    

    this.dataSource = new MatTableDataSource([]);
    if (this.url_datos_filtros) {
      this.get_data_filtros();
    } else {
      this.getItems();
    }
  }

  get_data_filtros() {
    return this.http.get(`${this.url_datos_filtros}`).subscribe(
      (response: any) => {
        this.data_filtros = response;
        this.loading = true;
        this.filtros_inicio();
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  filtros_inicio() {
    this.filtros_a_usar.forEach((el: any) => {
      if (
        el.name == 'empresa_id' &&
        this.data_filtros?.empresas &&
        this.data_filtros?.empresas.length != 0
      ) {
        el.value = this.data_filtros.empresas[0].id;
        this.empresaselec = el.value;
      }
    });

    let filters = '';
    let and = '';
    this.filtros_a_usar.forEach((el: any, index: any) => {
      and = index == 0 ? '' : '&';
      filters += `${and}${el.name}=${el.value}`;
    });

    this.filters = filters;
    this.getItems();
  }

  getItems() {
    let filters = '';
    if (this.filters.length != 0) {
      filters = this.filters;
    }

    let url;
    if (this.url.includes('?')) {
      url = `${this.url}&${filters}`;
    } else {
      url = `${this.url}?${filters}`;
    }

    this.loading = true;
    return this.http.get(url).subscribe(
      (response: any) => {
        console.log("tab");
        console.log(response);

        
        this.loading = false;
        if (this.nameDataResponse) {
          this.dataSource.data = response[this.nameDataResponse];
        } else {
          this.dataSource.data = response.data;
        }
        this.data_filtros = response.data_filtros;
        this.showFiltros = true;
        this.loaded = true;
        this.dataCount = Object.keys(this.dataSource.data).length;
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sendToFather(action: any, value: any) {
    this.sendToF.emit({ action: action, value: value });
  }

  filtrar(event: any) {
    event.preventDefault();
    const form = event.target;
    const formFields = form.elements;

    this.filters = '?';
    for (let index = 0; index < formFields.length; index++) {
      const element = formFields[index];
      if (element?.name && element?.value) {
        this.filters += `&${element.name}=${element.value}`;
        if (element.name == 'empresa_id') {
          this.empresaselec = element.value;
        }
      }
    }
    this.getItems();
  }

  public doFilter = (val: any) => {
    var value = val.target.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  formatNumber(n: number) {
    return Number(n).toFixed(2);
  }

  formatDate(d: any) {
    return moment(d).format('DD-MM-YYYY');
  }

  for(value: any) {
    return value.map((t: any) => t.name);
  }

  sumaTotal(col: any) {
    
    // console.log(col.field);
    // console.log("------------");
    // console.log(this.footerNoTotales);
    
    
    if(this.footerNoTotales.includes(col.field)){
      return "";
    }
    
    if (isNaN(this.dataSource.data[0][col.field])) {
      return "TOTAL";
    }

    let total = this.dataSource.data
      .map((t: any) => t[col.field])
      .reduce((acc: any, value: any) => Number(acc) + Number(value), 0);

      return Number(total).toFixed(2);
  }
  // getTotalCost() {
  //
  // }
}
