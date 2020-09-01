import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() name: string;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() type: string = 'text';


  constructor() { }

  ngOnInit(): void {
  }

}
