import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
})
export class ModalConfirmComponent {
  @Input() type: any;
  @Input() action: any;
  @Input() message: any = null;
  @Output()
  sendToF = new EventEmitter<any>();

  confirm() {
    var action = '';
    this.sendToF.emit({ action: this.action });
  }

  closeModal(){
    this.sendToF.emit({ action:'closeModal' });
  }
}
