import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';

//No había más rutas
const routes: Routes = [
  { path: 'home', component: EmpleadosComponent },
  { path: '', pathMatch: "full", redirectTo: "/home" },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
