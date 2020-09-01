import {FormGroup} from '@angular/forms';

export function PasswordMatch(password, repeatPassword) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const repeatControl = formGroup.controls[repeatPassword];

    if (repeatControl.errors && !repeatControl.errors.PasswordMatch) {
      return;
    }

    if (control.value !== repeatControl.value) {
      repeatControl.setErrors({passwordMatch: true});
    } else {
      repeatControl.setErrors(null);
    }
  }
}
