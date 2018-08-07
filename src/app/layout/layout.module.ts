import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LayoutComponent,
  ],
  declarations: [
    LayoutComponent,
    FooterComponent,
  ]
})
export class LayoutModule {
}
