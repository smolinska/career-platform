import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JobComponent} from './job/job.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'jobs', component: JobComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
