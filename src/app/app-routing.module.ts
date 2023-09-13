import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GuestGuardService } from './services/guest-guard.service';
import { ProductosComponent } from './components/productos-servicios/productos/productos.component';
import { PlanComponent } from './components/plan/plan.component';
import { UserComponent } from './components/user/user.component';
import { CompanyComponent } from './components/company/company.component';
import { UnidadVentaComponent } from './components/productos-servicios/unidad-venta/unidad-venta.component';
import { HipotesisMacroComponent } from './components/hipotesis-macro/hipotesis-macro.component';
import { ProyeccionUnidadesVenderComponent } from './components/proyeccion-unidades-vender/proyeccion-unidades-vender.component';
import { RrhhAreasComponent } from './components/RRHH/rrhh-areas/rrhh-areas.component';
import { RrhhPosicionesComponent } from './components/RRHH/rrhh-posiciones/rrhh-posiciones.component';
import { RecursoHumanoComponent } from './components/RRHH/recurso-humano/recurso-humano.component';
import { GastosOperativosComponent } from './components/gastos-operativos/gastos-operativos.component';
import { TiposActivosComponent } from './components/kapex/tipos-activos/tipos-activos.component';
import { EstructuraKapexComponent } from './components/kapex/estructura-kapex/estructura-kapex.component';
import { AnnoDepreciarComponent } from './components/kapex/anno-depreciar/anno-depreciar.component';
import { ProyeccionPreciosComponent } from './components/ventas/proyeccion-precios/proyeccion-precios.component';
import { InversionEnSalariosComponent } from './components/RRHH/inversion-en-salarios/inversion-en-salarios.component';
import { ProyeccionIngresosMensualesComponent } from './components/ventas/proyeccion-ingresos-mensuales/proyeccion-ingresos-mensuales.component';
import { ProyeccionIngresosAnualesComponent } from './components/ventas/proyeccion-ingresos-anuales/proyeccion-ingresos-anuales.component';
import { ProyeccionCostosComponent } from './components/costos/proyeccion-costos/proyeccion-costos.component';
import { CostoVentasAnualesComponent } from './components/costos/costo-ventas-anuales/costo-ventas-anuales.component';
import { CostoVentasMensualesComponent } from './components/costos/costo-ventas-mensuales/costo-ventas-mensuales.component';
import { RrhhCostoMensualComponent } from './components/RRHH/rrhh-costo-mensual/rrhh-costo-mensual.component';
import { GastosTotalesComponent } from './components/gastos-operativos/gastos-totales/gastos-totales.component';
import { GastosFijosComponent } from './components/gastos-operativos/gastos-fijos/gastos-fijos.component';
import { InversionRubrosDepComponent } from './components/capex/inversion-rubros-dep/inversion-rubros-dep.component';
import { DepreciacionAnualComponent } from './components/capex/depreciacion-anual/depreciacion-anual.component';
import { ReporteERIComponent } from './components/reporte-eri/reporte-eri.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'iniciar-sesion',
    component: LoginComponent,
    // canActivate: [ GuestGuardService ]
  },
  {
    path: 'productos-servicios',
    children: [
      {
        path: 'unidades-ventas',
        component: UnidadVentaComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '',
        component: ProductosComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  { path: 'planes', component: PlanComponent, canActivate: [AuthGuardService] },
  {
    path: 'empresas',
    component: CompanyComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'parametrizacion-general',
    component: HipotesisMacroComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'ventas',
    children: [
      {
        path: 'proyeccion-mes-unidad-ventas',
        component: ProyeccionUnidadesVenderComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'proyeccion-precios',
        component: ProyeccionPreciosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'proyeccion-ingresos-mensuales',
        component: ProyeccionIngresosMensualesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'proyeccion-ingresos-anuales',
        component: ProyeccionIngresosAnualesComponent,
        canActivate: [AuthGuardService],
      },

      
    ],
  },

  {
    path: 'costos',
    children: [
      {
        path: 'proyeccion-costos',
        component: ProyeccionCostosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'costo-ventas-mensuales',
        component: CostoVentasMensualesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'costo-ventas-anuales',
        component: CostoVentasAnualesComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },

  {
    path: 'usuarios',
    component: UserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'recursos-humanos',
    children: [
      {
        path: 'areas',
        component: RrhhAreasComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'posiciones',
        component: RrhhPosicionesComponent,
        canActivate: [AuthGuardService],
      },
     
      
      {
        path: '',
        component: RecursoHumanoComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'costo-mensual',
        component: RrhhCostoMensualComponent,
        canActivate: [AuthGuardService],
      },

      {
        path: 'inversion-en-salarios',
        component: InversionEnSalariosComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },

  // 8.1 TIPOS ACTIVOS (crud)
  //   8.2 ESTRUCTURA CAPEX (crud)
  //   8.3. Años a depreciar (crud)

  {
    path: 'capex',
    children: [
      {
        path: 'tipos-activos',
        component: TiposActivosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'estructura-capex',
        component: EstructuraKapexComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'inversion-por-rubros',
        component: InversionRubrosDepComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'depreciacion-anual',
        component: DepreciacionAnualComponent,
        canActivate: [AuthGuardService],
      },
 
    ],
  },

  {
    path: 'gastos-operativos',
    children: [
      {
        path: '',
        component: GastosOperativosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'estructura-de-gastos',
        component: GastosTotalesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'gastos-fijos',
        component: GastosFijosComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },

  {
    path: 'reporte-eri',
    component: ReporteERIComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule {}
