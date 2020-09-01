import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UsersService} from '../../shared/services/users.service';
import {dbUser} from '../../../environments/interfaces';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordMatch} from '../../shared/validators/password-match.validator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user: dbUser;
  userId: string;
  uSub: Subscription;
  submitted: boolean = false;
  tomorrow = new Date();

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.tomorrow.setDate(this.tomorrow.getDate());

    this.route.params.pipe(switchMap((params: Params) => {
      this.userId = params['id'];

      return this.usersService.getUser(params['id']);
    })).subscribe((user: dbUser) => {
      this.user = user;

      this.form = this.formBuilder.group({
        login: [this.user.login, [Validators.required, Validators.minLength(5)]],
        fio: [this.user.fio, Validators.required],
        birthday: [new Date(this.user.birthday), Validators.required],
        role: [this.user.role, Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {
        validator: PasswordMatch('password', 'repeatPassword')
      });

      this.form.controls.birthday.markAsTouched();
    });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.usersService.editUser(this.userId, {
      login: this.form.value.login,
      fio: this.form.value.fio,
      birthday: (new Date(this.form.value.birthday)).getTime(),
      role: this.form.value.role,
      password: this.form.value.password
    }).subscribe(() => {
      this.form.reset();
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
