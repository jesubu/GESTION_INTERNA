import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  // Used to prevent duplicate dialogs
	@Input() id : string;
	// The dialog title
	@Input() title : string;
  @Output() ok : EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
	onOK() {
		this.ok.emit(null);
	}
}
