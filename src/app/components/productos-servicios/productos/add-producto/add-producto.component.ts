import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],
})
export class AddProductoComponent {
  @Output()
  sendToF = new EventEmitter<any>();
  @Input() edit: any;
  @Input() empresa_id: any;

  
  // @Output()
  // messageToF = new EventEmitter<string>();
  form: any = FormGroup;
  loading = true;
  empresas: any = [];
  unidades: any = [];
  loadedForm: any = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrS: ToastrService,
    private validatorsS: ValidatorsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getRecursos();
  }
  formC() {

    if(!this.edit?.empresa_id){
      this.edit.empresa_id = this.empresa_id;
    }

    {
      this.form = this.formBuilder.group({
        id: [this.edit?.id],

        empresa_id: [this.edit?.empresa_id, [Validators.required]],
        unidad_venta_id: [this.edit?.unidad_venta_id, [Validators.required]],
        nombre: [this.edit?.nombre, Validators.required],
        precio_venta: [
          this.edit?.precio_venta,
          [Validators.required, this.validatorsS.number],
        ],
        costo_unitario: [
          this.edit?.costo_unitario,
          [Validators.required, this.validatorsS.number],
        ],
      });
    }
    this.loadedForm = true;
  }



  
  closeModal() {
    this.sendToF.emit({ action: 'closeModal' });
  }

  getRecursos() {
    this.http.get(`${environment.api_url}productos-recursos`).subscribe(
      (response: any) => {
        this.empresas = response.empresas;
        this.unidades = response.unidades;
        console.log(response);

        this.loading = false;
        this.formC();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  store() {
    this.loading = true;
    this.form.markAllAsTouched();

    if (this.form.status == 'INVALID') {
      this.loading = false;
      return;
    }

    this.http
      .post(`${environment.api_url}productos`, this.form.value)
      .subscribe(
        (response: any) => {
          this.sendToF.emit({ action: 'msg-success', value: response.message });
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
          let detect_errors_server = this.validatorsS.detect_errors_server(
            error,
            this.form
          );
          if (detect_errors_server) {
            return;
          }
        }
      );
  }

  validate(name: string) {
    return this.validatorsS.sow_message(this.form, name);
  }
}
