import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthGuard } from '../commons/auth.guard';
import { AppState } from '../state/app.state';
import { initLoginAc, initLoginComponentAc } from '../state/login/login.action';
import { UsuariosService } from '../usuarios/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public mainForm!: FormGroup; 

  constructor(public fb: FormBuilder, 
              private auth: AuthGuard,
              private readonly store: Store<AppState>) {

    this.store.dispatch(initLoginComponentAc());            

    this.mainForm = fb.group({
        user: ['', [Validators.required]],
        pass: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login() {
      this.store.dispatch(initLoginAc());

      let user: string = this.mainForm.get('user')?.value;
      let pass: string = this.mainForm.get('pass')?.value;

      if(pass && user) {
        this.auth.login(user, pass);
      } else {
        console.log('Registro fallido');
      }
  }
}
