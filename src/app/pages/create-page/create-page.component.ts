import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {dbUser} from '../../../environments/interfaces';
import {PasswordMatch} from '../../shared/validators/password-match.validator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted: boolean = false;
  cSub: Subscription;
  tomorrow = new Date();

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.tomorrow.setDate(this.tomorrow.getDate());

    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      fio: ['', Validators.required],
      birthday: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: PasswordMatch('password', 'repeatPassword')
    });
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: dbUser = {
      login: this.form.value.login,
      fio: this.form.value.fio,
      birthday: (new Date(this.form.value.birthday)).getTime(),
      role: this.form.value.role,
      password: this.form.value.password
    };

    this.cSub = this.usersService.create(user).subscribe(() => {
      this.form.reset();
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
