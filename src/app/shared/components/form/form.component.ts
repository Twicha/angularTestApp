import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  tomorrow = new Date();
  @Input() form: FormGroup;
  @Input() max: Date | null;
  @Input() submit: Function;
  @Input() submitted: boolean;
  @Input() formTitle: string;
  @Input() formBtnTitle: string;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.tomorrow.setDate(this.tomorrow.getDate());
  }

}
