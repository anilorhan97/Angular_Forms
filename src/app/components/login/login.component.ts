import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = new Login();
  loading : boolean = false;
  constructor(
    private router : Router,
    private toast : ToastService,
    private userService : UserService
  ){}

  login(){
    this.loading = true

    this.userService.login(this.user).subscribe(()=>{
      this.loading=false; //Backend servisi olması halinde işlem tamamlanana kadar loading true kalacaktır.
      this.toast.success("Giriş başarılı.");
      this.router.navigateByUrl('');
    },(error)=>{
      this.loading = false;
      this.toast.error(error.error.message); //Backend'den gelen bad request yazdırılabilir.
    })
  }
}
