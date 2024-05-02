import { Component, Input } from '@angular/core';
import { userInformation } from 'src/app/models/dto/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  @Input() usermain!:userInformation;

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }
}

