import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null =>{

  let password = control.get('Password');
  let confirmpassword = control.get('password1');
  if(password && confirmpassword && password?.value != confirmpassword?.value){
    return {
      passwordmatcherror : true }
  }
  return null;
}
