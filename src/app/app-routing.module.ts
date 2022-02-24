import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JuegoModule } from './components/juego/juego.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'usuario', loadChildren: () => import('./components/usuario/usuario.module').then(m=>m.UsuarioModule)},
  {path: 'dashboard', component: DashboardComponent , loadChildren: () => import('./components/dashboard/dashboard.module').then(m=>m.DashboardModule), canActivate:[AuthGuard]},
  {path: 'juego', loadChildren: () => import('./components/juego/juego.module').then(m=>m.JuegoModule)},
  {path: '**', redirectTo: '/', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
