import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
<<<<<<< HEAD
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
=======
>>>>>>> 9fb3a551b547291763b23525c2c7a4613058a440

const routes: Routes = [
  {path:'', component: CuestionariosComponent},
  {path:'nuevo-cuestionario', component: NuevoCuestionarioComponent},
<<<<<<< HEAD
  {path:'crear-preguntas', component: CrearPreguntasComponent},
=======
>>>>>>> 9fb3a551b547291763b23525c2c7a4613058a440
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
