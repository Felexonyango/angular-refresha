import { Routes } from '@angular/router';

export const routes: Routes = [
    // standalone components
    // {
    //     path: 'lazy',
    //     loadComponent: () => import('./Todo/todolist/todolist.component').then(m => m.TodolistComponent),
    //     canActivate:[YourGuardService]
    //   }
];


// export const routes: Routes = [
//     {
//         path: 'app',
//         children: [
//             {
//                 path: 'todos',
//                 loadComponent: () => import('./Todo/todolist/todolist.component').then(m => m.TodolistComponent),
//                 canActivate: [YourGuardService]
//             },
//             {
//                 path: 'profile',
//                 loadComponent: () => import('./Profile/profile.component').then(m => m.ProfileComponent),
//                 canActivate: [YourGuardService]
//             },
//             {
//                 path: 'settings',
//                 loadComponent: () => import('./Settings/settings.component').then(m => m.SettingsComponent),
//                 canActivate: [YourGuardService]
//             }
//         ]
//     }
// ];
