import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './search/search.component';
export const routes: Routes = [
    {path:'favs',component:TableComponent},
    {path:'home',component:SearchComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
    { path: '**', redirectTo: '/home' }
];
