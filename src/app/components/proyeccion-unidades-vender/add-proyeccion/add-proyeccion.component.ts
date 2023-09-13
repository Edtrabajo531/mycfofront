import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';

import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-add-proyeccion',
  templateUrl: './add-proyeccion.component.html',
  styleUrls: ['./add-proyeccion.component.css'],
})
export class AddProyeccionComponent {
  @Output()
  sendToF = new EventEmitter<any>();
  @Input() edit: any;
  @Input() productos: any = [];
  @Input() empresas: any = [];
  // @Output()
  // messageToF = new EventEmitter<string>();
  form: any = FormGroup;
  loading = false;
  unidades: any = [];

  loadedForm: any = false;
  selectedCar: number = 1;

  cars: any = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrS: ToastrService,
    private validatorsS: ValidatorsService,
    private http: HttpClient,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = 'Custom not found';
    // this.config.appendTo = 'modal-body';
    this.config.appendTo = '';
    this.config.bindValue = 'value';
  }

  ngOnInit(): void {
    this.formC();
  }

  formC() {
    {
      this.form = this.formBuilder.group({
        id: [this.edit?.id],
        producto_id: ['', Validators.required],

        mes1: [
          this.edit?.mes1,
          [Validators.required, this.validatorsS.number],
        ],
        mes2: [
          this.edit?.mes2,
          [Validators.required, this.validatorsS.number],
        ],
        mes3: [
          this.edit?.mes3,
          [Validators.required, this.validatorsS.number],
        ],
        mes4: [
          this.edit?.mes4,
          [Validators.required, this.validatorsS.number],
        ],
        mes5: [
          this.edit?.mes5,
          [Validators.required, this.validatorsS.number],
        ],
        mes6: [
          this.edit?.mes6,
          [Validators.required, this.validatorsS.number],
        ],
        mes7: [
          this.edit?.mes7,
          [Validators.required, this.validatorsS.number],
        ],
        mes8: [
          this.edit?.mes8,
          [Validators.required, this.validatorsS.number],
        ],
        mes9: [
          this.edit?.mes9,
          [Validators.required, this.validatorsS.number],
        ],
        mes10: [
          this.edit?.mes10,
          [Validators.required, this.validatorsS.number],
        ],
        mes11: [
          this.edit?.mes11,
          [Validators.required, this.validatorsS.number],
        ],
        mes12: [
          this.edit?.mes12,
          [Validators.required, this.validatorsS.number],
        ],
        year1: [this.edit?.year1],
        year2: [
          this.edit?.year2,
          [Validators.required, this.validatorsS.number],
        ],
        year3: [
          this.edit?.year3,
          [Validators.required, this.validatorsS.number],
        ],
        year4: [
          this.edit?.year4,
          [Validators.required, this.validatorsS.number],
        ],
        year5: [
          this.edit?.year5,
          [Validators.required, this.validatorsS.number],
        ],
        year6: [
          this.edit?.year6,
          [Validators.required, this.validatorsS.number],
        ],
        year7: [
          this.edit?.year7,
          [Validators.required, this.validatorsS.number],
        ],
        year8: [
          this.edit?.year8,
          [Validators.required, this.validatorsS.number],
        ],
        year9: [
          this.edit?.year9,
          [Validators.required, this.validatorsS.number],
        ],
        year10: [
          this.edit?.year10,
          [Validators.required, this.validatorsS.number],
        ],
      });
    }

    this.form.controls['producto_id'].setValue(this.edit?.producto_id);

    this.loadedForm = true;
  }
  closeModal() {
    this.sendToF.emit({ action: 'closeModal' });
  }

  sumaMeses() {
    console.log(this.form.controls.mes1.value);

    if (!this.form) {
      return 0;
    }
    let total =
      Number(this.form.controls.mes1.value) +
      Number(this.form.controls.mes2.value) +
      Number(this.form.controls.mes3.value) +
      Number(this.form.controls.mes4.value) +
      Number(this.form.controls.mes5.value) +
      Number(this.form.controls.mes6.value) +
      Number(this.form.controls.mes7.value) +
      Number(this.form.controls.mes8.value) +
      Number(this.form.controls.mes9.value) +
      Number(this.form.controls.mes10.value) +
      Number(this.form.controls.mes11.value) +
      Number(this.form.controls.mes12.value);

    return total;
  }


  store() {
    this.loading = true;
    this.form.markAllAsTouched();

    if (this.form.status == 'INVALID') {
      this.loading = false;
      return;
    }
    let totalmeses = this.sumaMeses();
    this.form.controls.year1.setValue(totalmeses);

    this.http
      .post(
        `${environment.api_url}proyeccion-mes-unidad-ventas`,
        this.form.value
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          console.log(response);
          console.log(response);
          console.log(response);

          
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

  // changeEmp(e: any) {
  //   console.log(e);
  //   this.productos = this.productosAll.filter((el: any) => el.empresa_id == e);

  //   // this.form.controls.producto_id.value = 0;
  //   console.log(this.form?.controls);

  //   if (this.form?.controls) {
  //     this.form.controls['producto_id'].setValue('');
  //     this.form.controls['unidad_id'].setValue('');
  //   }
  // }
}
