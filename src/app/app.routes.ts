import { Routes } from '@angular/router';
import { adminGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './modules/public/views/not-found/not-found.component';
import { PublicComponent } from './modules/public/public.component';
import { HomeView } from './modules/public/views/home/home.view';
import { Error500Component } from './modules/public/views/error500/error500.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'public',
      pathMatch: 'full',
    },
    {
      path: 'public',
      loadChildren: () => import('../app/modules/public/public.module').then(m => m.PublicModule),
      // canActivate: [SomeGuard], // Si necesitas algún guard
    },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('../app/modules/admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: '500', // Ruta para error 500
    component: Error500Component
  },
  {
    path: '**', // Ruta wildcard para capturar cualquier otra ruta no definida
    component: NotFoundComponent // Redirige a la ruta 'public'
  },


  
];
