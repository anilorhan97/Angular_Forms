import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info';
import { UserService } from 'src/app/services/user.service';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, CanComponentDeactivate{
  registerForm : FormGroup;
  loading: boolean | undefined = false;
  user = new UserInfo();
  minDate: any=this.datepipe.transform('1910-01-01','yyyy-MM-dd');
  maxDate: any=this.datepipe.transform(Date.now(),'yyyy-MM-dd');

  constructor(
    private formBuilder : FormBuilder,
    public datepipe: DatePipe,
    private toast : ToastService,
    private router : Router,
    private userService : UserService
  )
  {
    this.registerForm = formBuilder.group({
      name: new FormControl(null,[
        Validators.required,
        Validators.minLength(2),
        this.onlyLettersValidator()]),
      surname: new FormControl(null,[
        Validators.required,
        Validators.minLength(2),
        this.onlyLettersValidator()]),
      identityNo: new FormControl(null,[
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        this.onlyNumbersValidator()]),
      phoneNumber: new FormControl(null,[
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(15),
        Validators.pattern(/^\([1-9]{1}\d{2}\)\s{1}\d{3}\s{1}\d{2}\s{1}\d{2}/)]),
      birthDate: new FormControl(null,[
        Validators.required]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;^+()=])[A-Za-z\d@$!%*?&.,;^&/+()=]{6,}$/)]),
      rePassword: new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;^+()=])[A-Za-z\d@$!%*?&.,;^&/+()=]{6,}$/)]),
      gender: new FormControl(null,[
        Validators.required])
    })
  }
  ngOnInit(): void {}

  canDeactivate(): boolean {
    if (this.registerForm.dirty && this.registerForm.touched) {
      return window.confirm(
        'Kaydınız henüz gerçekleştirilmedi. Sayfadan ayrılmak istediğinize emin misiniz?'
      );
    }
    return true;
  }

  onlyNumbersValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && !/^[0-9]*$/.test(value)) {
        return { onlyNumbers: true };
      }
      return null;
    };
  }

  onlyLettersValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (value && !/^[a-zA-ZğüşıöçĞÜŞİÖÇ()\s]*$/.test(value)) {
        return { onlyLetters: true };
      }
      return null;
    };
  }

  onSubmit(){
    this.loading = true

    if(this.registerForm.value.password !== this.registerForm.value.rePassword){
      this.toast.error("Şifreler eşleşmiyor.");
      return;
    }

    this.userService.register(this.registerForm.value).subscribe(()=>{
      this.loading=false; //Backend servisi olması halinde işlem tamamlanana kadar loading true kalacaktır.
      this.toast.success("Kayıt başarılı. Giriş yapma ekranına yönlendiriliyorsunuz.");
      this.router.navigateByUrl('/login');
    },(error)=>{
      this.loading=false;
      this.toast.error(error.error.message); //Backend'den gelen hata mesaj yazdırılabilir.
    })
  }
}
