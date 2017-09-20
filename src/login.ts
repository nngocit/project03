import { AuthenService } from './authen/authenService';
import swal from 'sweetalert';
// import { STORAGE } from './helpers/storage';
import { Aurelia, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from "aurelia-pal";
@inject(Aurelia, Router, AuthenService)

export class Login {
  constructor(private aurelia: Aurelia, private router: Router, private authSrv: AuthenService) {

  };

  heading = 'Login';

  userName = '';
  passWord = '';
  login() {
    // todo check authen
    this.router.navigateToRoute('admin')
  }
}
