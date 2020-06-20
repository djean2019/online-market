import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./components/products/products.component";
import { MaterialModule } from "../material/material.module";
import { AddProductComponent } from "./components/products/add-product.component";
import { SharedModule } from "../material/shared";

@NgModule({
    declarations: [ProductsComponent, AddProductComponent],
    imports: [CommonModule, MaterialModule, SharedModule],
})
export class SellerBuilderModule {}
