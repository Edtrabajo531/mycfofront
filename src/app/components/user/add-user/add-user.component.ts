import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from 'src/app/services/validators.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output()
  sendToF = new EventEmitter<any>();
  @Input() edit: any;
  url = `${environment.api_url}usuarios`;
  // @Output()
  // messageToF = new EventEmitter<string>();
  form: any = FormGroup;
  loading = true;
  roles: any = [];
  planes: any = [];
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
    {
      this.form = this.formBuilder.group({
        id: [this.edit?.id],
        name: [this.edit?.name, [Validators.required]],
        email: [this.edit?.email, [Validators.required,this.validatorsS.email]],
        password: [this.edit?.password, [Validators.required,Validators.minLength(5)]],
        role_id: [this.edit?.role_id, [Validators.required]],
        plan_id: [this.edit?.plan_id, [Validators.required]],

      });
    }
    this.loadedForm = true;
  }
  closeModal() {
    this.sendToF.emit({ action: 'closeModal' });
  }

  getRecursos() {
    this.http.get(`${environment.api_url}usuarios-recursos`).subscribe(
      (response: any) => {
        this.roles = response.roles;
        this.planes = response.planes;

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

    this.http.post(this.url, this.form.value).subscribe(
      (response: any) => {
        console.log("response post");
        console.log(response);

      
        let message = response.message;

        this.sendToF.emit({action:'msg-success',value: message });
        this.loading = false;
      },
      (error) => {
        console.log("response error");

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

