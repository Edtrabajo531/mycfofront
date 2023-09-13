import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { environment } from 'src/enviroments/environment';
import { ComunicarEmpresaAnavbarService } from 'src/app/services/comunicar-empresa-anavbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'Inicio';
  constructor(private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleS:Title,
    private comunicarEN: ComunicarEmpresaAnavbarService
    ) {
      this.titleS.setTitle(this.title);
 
     }

  ngOnInit(): void {
  
    this.comunicarEN.sendUpdate(
      'ocultar'
    );
  
    this.http.get(`${environment.api_url}prueba`)
      .subscribe(
        (response: any) => {
          console.log(response);
        },

        error => {
          console.log(error);
        }
      );
  }


}
