import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from '../commons/auth.guard';
import { UsuariosService } from '../usuarios/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public mainForm!: FormGroup; 

  constructor(public fb: FormBuilder, 
              private auth: AuthGuard) {

    this.mainForm = fb.group({
        user: ['', [Validators.required]],
        pass: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login() {
      let user: string = this.mainForm.get('user')?.value;
      let pass: string = this.mainForm.get('pass')?.value;

      if(pass && user) {
        this.auth.login(user, pass);
      } else {
        console.log('Registro fallido');
      }
  }
}
