import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

const MaterialComponent = [
  MatButtonModule,
  MatSliderModule,
  MatIconModule,
  MatDividerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatMenuModule,
];

@NgModule({
  declarations: [],
  imports: [MaterialComponent],
  exports: [MaterialComponent],
})
export class MaterialModule {}
