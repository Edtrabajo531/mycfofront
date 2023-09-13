import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-add-estructura-apex',
  templateUrl: './add-estructura-apex.component.html',
  styleUrls: ['./add-estructura-apex.component.css'],
})
export class AddEstructuraApexComponent {
  @Output()
  sendToF = new EventEmitter<any>();
  @Input() edit: any;
  @Input() empresas: any;
  @Input() tiposactivos: any;
  @Input() empresa_id: any;

  url = `${environment.api_url}capex`;

  form: any = FormGroup;
  loading = false;
  // empresas: any = [];
  loadedForm: any = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrS: ToastrService,
    private validatorsS: ValidatorsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.getRecursos();
    this.formC();
  }
  formC() {
    {
      if (!this.edit?.empresa_id) {
        this.edit.empresa_id = this.empresa_id;
      }

      this.form = this.formBuilder.group({
        id: [this.edit?.id],
        nombre: [this.edit?.nombre, [Validators.required]],
        year1: [
          this.edit?.year1,
          [Validators.required, this.validatorsS.number],
        ],
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
        year10: [this.edit?.year10, [Validators.required]],
        tipo_activo_id: [this.edit?.tipo_activo_id, [Validators.required]],
        empresa_id: [this.edit?.empresa_id, [Validators.required]],
      });
    }
    this.loadedForm = true;
  }
  closeModal() {
    this.sendToF.emit({ action: 'closeModal' });
  }

  // getRecursos() {
  //   this.http.get(`${environment.api_url}plans-recursos`).subscribe(
  //     (response: any) => {
  //       this.empresas = response.empresas;
  //       this.unidades = response.unidades;
  //       console.log(response);

  //       this.loading = false;
  //       this.formC();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  store() {
    this.loading = true;
    this.form.markAllAsTouched();

    if (this.form.status == 'INVALID') {
      this.loading = false;
      return;
    }

    this.http.post(this.url, this.form.value).subscribe(
      (response: any) => {
        console.log('response post');
        console.log(response);

        let message = response.message;

        this.sendToF.emit({ action: 'msg-success', value: message });
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
