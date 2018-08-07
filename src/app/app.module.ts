import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {JobModule} from './job/job.module';
import {LayoutModule} from './layout/layout.module';
import {HomeModule} from './home/home.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    JobModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
