import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TitularComponent } from "./titular.component";
import { InicioView } from "./views/inicio/inicio.view";
import { HistorialComponent } from "./views/historial/historial.component";
import { RentasComponent } from "./views/historial/rentas/rentas.component";
import { VentasComponent } from "./views/historial/ventas/ventas.component";
import { DashboardView } from "./views/dashboard/dashboard.view";
import { EstadisticaComponent } from "./views/estadistica/estadistica.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    component: TitularComponent,
    children: [
      {
        path: "home",
        component: DashboardView,
      },

      {
        path: "historial-rentas",
        component: RentasComponent,
      },
      {
        path: "historial-ventas",
        component: VentasComponent,
      },
      {
        path: 'analisis-rentas-stock',
        component: EstadisticaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TitularRoutingModule {}
