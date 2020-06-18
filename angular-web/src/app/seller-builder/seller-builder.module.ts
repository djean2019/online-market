import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
})
export class SellerBuilderModule {}
