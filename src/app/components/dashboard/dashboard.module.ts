import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
<<<<<<< HEAD
import { ReactiveFormsModule } from '@angular/forms';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { ListadoPreguntasComponent } from './listado-preguntas/listado-preguntas.component';
=======
>>>>>>> 9fb3a551b547291763b23525c2c7a4613058a440


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    CuestionariosComponent,
<<<<<<< HEAD
    NuevoCuestionarioComponent,
    CrearPreguntasComponent,
    ListadoPreguntasComponent
=======
    NuevoCuestionarioComponent
>>>>>>> 9fb3a551b547291763b23525c2c7a4613058a440
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
