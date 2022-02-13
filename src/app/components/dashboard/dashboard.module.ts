import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './nuevo-cuestionario/nuevo-cuestionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { ListadoPreguntasComponent } from './listado-preguntas/listado-preguntas.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    CuestionariosComponent,
    NuevoCuestionarioComponent,
    CrearPreguntasComponent,
    ListadoPreguntasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
