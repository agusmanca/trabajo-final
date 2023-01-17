import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { UsuarioDto } from '../model/usuarioDto';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.css']
})
export class AbmUsuariosComponent implements OnInit {

  public mainForm!: FormGroup;  
  public userId!: number;
  public user: UsuarioDto | undefined;
  public txtBtnValue: string = 'Guardar';
  public valueRole: string = '2';

  public roles: any[] = [
    { value: UserRoleEnum.ADMIN.toString(), description: "Admin"},
    { value: UserRoleEnum.USER.toString(), description: "User"},
  ]

  constructor(public fb: FormBuilder, 
              public activeRouter: ActivatedRoute,
              public router: Router,
              public usuarioService: UsuariosService) { 

      this.activeRouter.params.subscribe((param) => {
          this.userId = param['id'];
      });          

      this.mainForm = fb.group({
          nombre: ['', [Validators.required]],
          apellido: ['', [Validators.required]],
          username: ['', []],
          pass: ['', []],
          role: ['']
      }); 
  }

  ngOnInit(): void {
      this.user = this.usuarioService.getUsuarioById(this.userId);
      
      if(this.user){
          this.mainForm.get('nombre')?.setValue(this.user.nombre);
          this.mainForm.get('apellido')?.setValue(this.user.apellido);
          this.mainForm.get('username')?.setValue(this.user.username);
          this.mainForm.get('pass')?.setValue(this.user.pass);
          this.mainForm.get('role')?.setValue(this.user.role);

          this.valueRole = this.user.role.toString();
          this.txtBtnValue = 'Actualizar';
      }
  }

  submitProcess() {
      let roleValue = this.mainForm.get('role')?.value;

      if(this.mainForm.invalid || !roleValue || +roleValue > 1){
        alert("Error en formulario")
        return
      }

      if(this.user) {
          this.usuarioService.updateUsuario(this.setUsuarioValue(this.user.id));
          this.router.navigate(['/usuarios/lista-usuarios']);
      } else {
          this.usuarioService.crearUsuario(this.setUsuarioValue(0));
          this.router.navigate(['/usuarios/lista-usuarios']);
      }
  }

  setUsuarioValue(id: number): UsuarioDto {
    const roleValue = this.mainForm.get('role')?.value;
    let role: UserRoleEnum = UserRoleEnum.UNREGISTERED;
    
    if(roleValue) {
      role = this.getRole(roleValue);
    }

    return {
            id: id,
            nombre: this.mainForm.get('nombre')?.value,
            apellido: this.mainForm.get('apellido')?.value,
            username: this.mainForm.get('username')?.value,
            pass: this.mainForm.get('pass')?.value,
            role: role
          }
  }

  getRole(numRole: string): UserRoleEnum {
      switch(numRole) {
          case '0':
            return UserRoleEnum.ADMIN
          case '1':
            return UserRoleEnum.USER
          default:
            return UserRoleEnum.UNREGISTERED    
      }
  }
}
