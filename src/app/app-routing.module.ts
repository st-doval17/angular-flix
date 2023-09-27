import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreModalComponent } from './genre-modal/genre-modal.component';
import { DirectorModalComponent } from './director-modal/director-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { AuthGuard } from './auth.guard';

/**
 * Defines the application routes and their corresponding components.
 */
const routes: Routes = [
  { path: 'genre/:genreName', component: GenreModalComponent },
  { path: 'director/:directorName', component: DirectorModalComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    component: MovieCardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
