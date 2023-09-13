import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

import { AppMaterialModule } from './app.material-module';
import { TableComponent } from './shared/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FilterBasicComponent } from './shared/filter-basic/filter-basic.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalConfirmComponent } from './shared/modal-confirm/modal-confirm.component';
import { UserComponent } from './components/user/user.component';
import { PlanComponent } from './components/plan/plan.component';
import { AddPlanComponent } from './components/plan/add-plan/add-plan.component';
import { CompanyComponent } from './components/company/company.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { UnidadVentaComponent } from './components/productos-servicios/unidad-venta/unidad-venta.component';
import { AddUnidadVentaComponent } from './components/productos-servicios/unidad-venta/add-unidad-venta/add-unidad-venta.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AreaChartComponent } from './components/charts/area-chart/area-chart.component';
import { DonutChartComponent } from './components/charts/donut-chart/donut-chart.component';
import { BarHorizontalComponent } from './components/charts/bar-horizontal/bar-horizontal.component';
import { HipotesisMacroComponent } from './components/hipotesis-macro/hipotesis-macro.component';
import { AddHipotesisMacroComponent } from './components/hipotesis-macro/add-hipotesis-macro/add-hipotesis-macro.component';
import { ProyeccionUnidadesVenderComponent } from './components/proyeccion-unidades-vender/proyeccion-unidades-vender.component';
import { AddProyeccionComponent } from './components/proyeccion-unidades-vender/add-proyeccion/add-proyeccion.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgSelectModule } from '@ng-select/ng-select';
import { RrhhAreasComponent } from './components/RRHH/rrhh-areas/rrhh-areas.component';
import { RrhhPosicionesComponent } from './components/RRHH/rrhh-posiciones/rrhh-posiciones.component';

import { AddRrhhAreaComponent } from './components/RRHH/rrhh-areas/add-rrhh-area/add-rrhh-area.component';
import { AddRrhhPosicionComponent } from './components/RRHH/rrhh-posiciones/add-rrhh-posicion/add-rrhh-posicion.component';
import { RecursoHumanoComponent } from './components/RRHH/recurso-humano/recurso-humano.component';
import { AddRecursoHumanoComponent } from './components/RRHH/recurso-humano/add-recurso-humano/add-recurso-humano.component';
import { AddProductoComponent } from './components/productos-servicios/productos/add-producto/add-producto.component';
import { ProductosComponent } from './components/productos-servicios/productos/productos.component';
import { GastosOperativosComponent } from './components/gastos-operativos/gastos-operativos.component';
import { AddGastosOperativosComponent } from './components/gastos-operativos/add-gastos-operativos/add-gastos-operativos.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { KapexComponent } from './components/kapex/kapex.component';
import { TiposActivosComponent } from './components/kapex/tipos-activos/tipos-activos.component';
import { EstructuraKapexComponent } from './components/kapex/estructura-kapex/estructura-kapex.component';
import { AnnoDepreciarComponent } from './components/kapex/anno-depreciar/anno-depreciar.component';
import { AddAnnoDepreciarComponent } from './components/kapex/anno-depreciar/add-anno-depreciar/add-anno-depreciar.component';
import { AddEstructuraApexComponent } from './components/kapex/estructura-kapex/add-estructura-apex/add-estructura-apex.component';
import { AddTipoActivoComponent } from './components/kapex/tipos-activos/add-tipo-activo/add-tipo-activo.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProyeccionPreciosComponent } from './components/ventas/proyeccion-precios/proyeccion-precios.component';
import { InversionEnSalariosComponent } from './components/RRHH/inversion-en-salarios/inversion-en-salarios.component';
import { ProyeccionIngresosMensualesComponent } from './components/ventas/proyeccion-ingresos-mensuales/proyeccion-ingresos-mensuales.component';
import { ProyeccionIngresosAnualesComponent } from './components/ventas/proyeccion-ingresos-anuales/proyeccion-ingresos-anuales.component';
import { ProyeccionCostosComponent } from './components/costos/proyeccion-costos/proyeccion-costos.component';
import { CostoVentasMensualesComponent } from './components/costos/costo-ventas-mensuales/costo-ventas-mensuales.component';
import { CostoVentasAnualesComponent } from './components/costos/costo-ventas-anuales/costo-ventas-anuales.component';
import { RrhhCostoMensualComponent } from './components/RRHH/rrhh-costo-mensual/rrhh-costo-mensual.component';
import { PlanInversionInfraComponent } from './components/capex/plan-inversion-infraborrar/plan-inversion-infra.component';
import { InversionRubrosDepComponent } from './components/capex/inversion-rubros-dep/inversion-rubros-dep.component';
import { DepreciacionAnualComponent } from './components/capex/depreciacion-anual/depreciacion-anual.component';
import { GastosTotalesComponent } from './components/gastos-operativos/gastos-totales/gastos-totales.component';
import { GastosFijosComponent } from './components/gastos-operativos/gastos-fijos/gastos-fijos.component';
import { ReporteERIComponent } from './components/reporte-eri/reporte-eri.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ProductosComponent,
    TableComponent,
    AddProductoComponent,
    FilterBasicComponent,
    ModalConfirmComponent,
    UserComponent,
    PlanComponent,
    AddPlanComponent,
    CompanyComponent,
    AddCompanyComponent,
    UnidadVentaComponent,
    AddUnidadVentaComponent,
    AddUserComponent,
    BarChartComponent,
    AreaChartComponent,
    DonutChartComponent,
    BarHorizontalComponent,
    HipotesisMacroComponent,
    AddHipotesisMacroComponent,
    ProyeccionUnidadesVenderComponent,
    AddProyeccionComponent,
    RrhhAreasComponent,
    RrhhPosicionesComponent,
    
    AddRrhhAreaComponent,
    AddRrhhPosicionComponent,
    RecursoHumanoComponent,
    AddRecursoHumanoComponent,
    GastosOperativosComponent,
    AddGastosOperativosComponent,
    AutoFocusDirective,
    KapexComponent,
    TiposActivosComponent,
    EstructuraKapexComponent,
    AnnoDepreciarComponent,
    AddAnnoDepreciarComponent,
    AddEstructuraApexComponent,
    AddTipoActivoComponent,
    ProyeccionPreciosComponent,
    InversionEnSalariosComponent,
    ProyeccionIngresosMensualesComponent,
    ProyeccionIngresosAnualesComponent,
    ProyeccionCostosComponent,
    CostoVentasMensualesComponent,
    CostoVentasAnualesComponent,
    RrhhCostoMensualComponent,
    PlanInversionInfraComponent,
    InversionRubrosDepComponent,
    DepreciacionAnualComponent,
    GastosTotalesComponent,
    GastosFijosComponent,
    ReporteERIComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppMaterialModule,
    NgbModule,
    MatFormFieldModule,
    FormsModule,
    NgApexchartsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    NgSelectModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
