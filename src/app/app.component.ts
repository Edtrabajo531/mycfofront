import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Subscription } from 'rxjs';
import { ComunicarEmpresaAnavbarService } from './services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showEmpresas:any = false;
  private subscriptionName: Subscription;
  constructor(
    private router: Router,
    private authS: AuthService,
    private http: HttpClient,
    private comunicarEN: ComunicarEmpresaAnavbarService,
    
  ) {
    this.subscriptionName = this.comunicarEN.getUpdate().subscribe((message) => {
      console.log("message CCC");
      console.log(message);
      console.log(message);

      
      if(message.text == 'actualizar'){
        this.getEmpresas();
      }else if(message.text == 'ocultar'){
        this.showEmpresas = false;
      }else if(message.text == 'mostrar'){
        this.showEmpresas = true;
      }
      
    });
  }
  hideN = false;
  subscribe: any;
  user: any;
  loaded = false;
  empresas: any = [];
  empresa_s: any = '';
  ngOnInit(): void {
    this.user = this.authS.getAuth();
    this.subscribe = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url.includes('iniciar-sesion')) {
          this.hideN = true;
          this.loaded = true;
        } else if (this.loaded == false) {
          this.getEmpresas();
        }
      }
    });
  }

  logout() {
    this.authS.logout();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
    this.subscriptionName.unsubscribe();
  }

  getEmpresas() {
    this.http.get(`${environment.api_url}empresas`).subscribe(
      (response: any) => {
        let empresas = response.data;
        this.empresas = empresas.sort((a: any, b: any) =>
          a.nombre > b.nombre ? 1 : -1
        );

        let empresa_s: any = localStorage.getItem('empresa_selec');

        if (empresa_s) {
          let empresa_sel: any = this.empresas.filter((el: any) => {
            el.id == empresa_s;
          });

          if (empresa_sel.length != 0) {
            empresa_s = empresa_sel[0].id;
          } else {
            empresa_s = '';
          }
        }

        if (!empresa_s) {
          if (this.empresas.length != 0) {
            empresa_s = this.empresas[0].id;
          }
        }

        if (!empresa_s) {
          empresa_s = '';
        }
        
        localStorage.setItem('empresa_selec', empresa_s);

        if (empresa_s) {
          this.empresa_s = Number(empresa_s);
        }
        console.log(empresa_s);

        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambiarEmpresa(e: any) {
    localStorage.setItem('empresa_selec', e.id);

    this.loaded = false;
    setTimeout(() => {
      this.loaded = true;
    }, 500);
  }
}
