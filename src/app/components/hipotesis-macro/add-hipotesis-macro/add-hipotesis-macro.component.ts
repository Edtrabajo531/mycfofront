import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/shared/table/table.component';
import { environment } from 'src/enviroments/environment';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-add-hipotesis-macro',
  templateUrl: './add-hipotesis-macro.component.html',
  styleUrls: ['./add-hipotesis-macro.component.css'],
})
export class AddHipotesisMacroComponent {
  @Output()
  sendToF = new EventEmitter<any>();
  @Input() edit: any;
  url = `${environment.api_url}hipotesis-macroeconomicas`;
  // @Output()
  // messageToF = new EventEmitter<string>();
  form: any = FormGroup;
  loading = true;
  empresas: any = [];

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
    this.form = this.formBuilder.group({
      id: [this.edit?.id],
      empresa_id: [this.edit?.empresa_id, [Validators.required]],
      inf_year1: [
        this.edit?.inf_year1,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year2: [
        this.edit?.inf_year2,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year3: [
        this.edit?.inf_year3,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year4: [
        this.edit?.inf_year4,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year5: [
        this.edit?.inf_year5,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year6: [
        this.edit?.inf_year6,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year7: [
        this.edit?.inf_year7,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year8: [
        this.edit?.inf_year8,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year9: [
        this.edit?.inf_year9,
        [Validators.required, this.validatorsS.number],
      ],
      inf_year10: [
        this.edit?.inf_year10,
        [Validators.required, this.validatorsS.number],
      ],

      ir_year1: [
        this.edit?.ir_year1,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year2: [
        this.edit?.ir_year2,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year3: [
        this.edit?.ir_year3,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year4: [
        this.edit?.ir_year4,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year5: [
        this.edit?.ir_year5,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year6: [
        this.edit?.ir_year6,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year7: [
        this.edit?.ir_year7,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year8: [
        this.edit?.ir_year8,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year9: [
        this.edit?.ir_year9,
        [Validators.required, this.validatorsS.number],
      ],
      ir_year10: [
        this.edit?.ir_year10,
        [Validators.required, this.validatorsS.number],
      ],

      inpa_year1: [
        this.edit?.inpa_year1,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year2: [
        this.edit?.inpa_year2,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year3: [
        this.edit?.inpa_year3,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year4: [
        this.edit?.inpa_year4,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year5: [
        this.edit?.inpa_year5,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year6: [
        this.edit?.inpa_year6,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year7: [
        this.edit?.inpa_year7,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year8: [
        this.edit?.inpa_year8,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year9: [
        this.edit?.inpa_year9,
        [Validators.required, this.validatorsS.number],
      ],
      inpa_year10: [
        this.edit?.inpa_year10,
        [Validators.required, this.validatorsS.number],
      ],

      comvta_year1: [
        this.edit?.comvta_year1,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year2: [
        this.edit?.comvta_year2,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year3: [
        this.edit?.comvta_year3,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year4: [
        this.edit?.comvta_year4,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year5: [
        this.edit?.comvta_year5,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year6: [
        this.edit?.comvta_year6,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year7: [
        this.edit?.comvta_year7,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year8: [
        this.edit?.comvta_year8,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year9: [
        this.edit?.comvta_year9,
        [Validators.required, this.validatorsS.number],
      ],
      comvta_year10: [
        this.edit?.comvta_year10,
        [Validators.required, this.validatorsS.number],
      ],

      desvta_year1: [
        this.edit?.desvta_year1,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year2: [
        this.edit?.desvta_year2 ? this.edit?.desvta_year2 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year3: [
        this.edit?.desvta_year3 ? this.edit?.desvta_year3 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year4: [
        this.edit?.desvta_year4 ? this.edit?.desvta_year4 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year5: [
        this.edit?.desvta_year5 ? this.edit?.desvta_year5 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year6: [
        this.edit?.desvta_year6 ? this.edit?.desvta_year6 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year7: [
        this.edit?.desvta_year7 ? this.edit?.desvta_year7 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year8: [
        this.edit?.desvta_year8 ? this.edit?.desvta_year8 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year9: [
        this.edit?.desvta_year9 ? this.edit?.desvta_year9 : 0,
        [Validators.required, this.validatorsS.number],
      ],
      desvta_year10: [
        this.edit?.desvta_year10 ? this.edit?.desvta_year10 : 0,
        [Validators.required, this.validatorsS.number],
      ],

      insal_year1: [
        this.edit?.insal_year1,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year2: [
        this.edit?.insal_year2,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year3: [
        this.edit?.insal_year3,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year4: [
        this.edit?.insal_year4,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year5: [
        this.edit?.insal_year5,
        [Validators.required, this.validatorsS.number],
      ],

      insal_year6: [
        this.edit?.insal_year6,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year7: [
        this.edit?.insal_year7,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year8: [
        this.edit?.insal_year8,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year9: [
        this.edit?.insal_year9,
        [Validators.required, this.validatorsS.number],
      ],
      insal_year10: [
        this.edit?.insal_year10,
        [Validators.required, this.validatorsS.number],
      ],

      benfso_year1: [
        this.edit?.benfso_year1,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year2: [
        this.edit?.benfso_year2,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year3: [
        this.edit?.benfso_year3,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year4: [
        this.edit?.benfso_year4,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year5: [
        this.edit?.benfso_year5,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year6: [
        this.edit?.benfso_year6,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year7: [
        this.edit?.benfso_year7,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year8: [
        this.edit?.benfso_year8,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year9: [
        this.edit?.benfso_year9,
        [Validators.required, this.validatorsS.number],
      ],
      benfso_year10: [
        this.edit?.benfso_year10,
        [Validators.required, this.validatorsS.number],
      ],

      apsoc_year1: [
        this.edit?.apsoc_year1,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year2: [
        this.edit?.apsoc_year2,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year3: [
        this.edit?.apsoc_year3,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year4: [
        this.edit?.apsoc_year4,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year5: [
        this.edit?.apsoc_year5,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year6: [
        this.edit?.apsoc_year6,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year7: [
        this.edit?.apsoc_year7,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year8: [
        this.edit?.apsoc_year8,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year9: [
        this.edit?.apsoc_year9,
        [Validators.required, this.validatorsS.number],
      ],
      apsoc_year10: [
        this.edit?.apsoc_year10,
        [Validators.required, this.validatorsS.number],
      ],
    });
    this.loadedForm = true;
  }

  closeModal() {
    this.sendToF.emit({ action: 'closeModal' });
  }

  getRecursos() {
    this.http.get(`${environment.api_url}empresas`).subscribe(
      (response: any) => {
        this.empresas = response.data;
        this.loading = false;
        this.formC();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  store() {
    console.log('exec form');
    console.log(this.form);

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
        console.log('response error');

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
