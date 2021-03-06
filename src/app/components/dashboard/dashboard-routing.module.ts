import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { RespuestaUsuarioComponent } from '../shared/respuesta-usuario/respuesta-usuario.component';

const routes: Routes = [
  {path:'', component: CuestionariosComponent},
  {path:'nuevo-cuestionario', component: NuevoCuestionarioComponent},
  {path:'crear-preguntas', component: CrearPreguntasComponent},
  {path:'ver-cuestionario/:id', component: VerCuestionarioComponent},
  {path:'estadisticas/:id', component: EstadisticasComponent},
  {path:'respuestaUsuarioAdmin/:id', component: RespuestaUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
