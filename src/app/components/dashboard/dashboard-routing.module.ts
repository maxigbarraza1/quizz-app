import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';

const routes: Routes = [
  {path:'', component: CuestionariosComponent},
  {path:'nuevo-cuestionario', component: NuevoCuestionarioComponent},
  {path:'crear-preguntas', component: CrearPreguntasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
