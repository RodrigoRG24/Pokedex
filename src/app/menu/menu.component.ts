import { Component } from '@angular/core';
import {NzMenuModule} from 'ng-zorro-antd/menu'
import {NzIconModule} from 'ng-zorro-antd/icon'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NzIconModule,NzMenuModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
