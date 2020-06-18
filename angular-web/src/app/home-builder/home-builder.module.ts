import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { HomeBuilderRoutingModule } from './home-builder-routing.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from '../material/layout';
import { SellerBuilderModule } from '../seller-builder/seller-builder.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../material/shared';
import { CoreModule } from '../core';

@NgModule({
  declarations: [
    HomeComponent,
    MainContentComponent,
    SideNavComponent,
    ToolBarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    HomeBuilderRoutingModule,
    MaterialModule,
    SellerBuilderModule,
    AuthModule,
    SharedModule,
  ],
})
export class HomeBuilderModule {}
