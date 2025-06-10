import { Routes } from '@angular/router';

export const routes: Routes = [
  /* 2 formas de llamar a las rutas
  En la primera forma se importa el modulo de rutas y luego se llama a la funcion que retorna las rutas
  En la segunda forma se importa el modulo de rutas previo a eso hay que exportar el modulo de rutas desde el archivo de rutas
  */
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes')
      .then(m => m.reactiveRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes')
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];
