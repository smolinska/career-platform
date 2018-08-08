import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {JobModule} from './job/job.module';
import {LayoutModule} from './layout/layout.module';
import {HomeModule} from './home/home.module';
import {HttpClientModule} from '@angular/common/http';
import {JobService} from './services/job.service';


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
    HttpClientModule,
  ],
  providers: [
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
