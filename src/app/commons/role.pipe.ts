import { Pipe, PipeTransform } from '@angular/core';
import { UserRoleEnum } from './userRoleEnum';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: UserRoleEnum): string {
      switch(value.toString()) {
          case "0":
            return "Admin";
          case "1":
              return "User";
          default:
              return "" 
      }
  }

}
