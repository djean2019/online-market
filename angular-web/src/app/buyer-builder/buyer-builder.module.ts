import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../material/shared";
import { PlaceOrderComponent } from "./components/order/place-order.component";
import { OrderDetailComponent } from "./components/order-detail/order-detail.component";
import { SellerOrderDetailComponent } from "./components/seller-order-detail/seller-order-detail.component";

@NgModule({
    declarations: [PlaceOrderComponent, OrderDetailComponent, SellerOrderDetailComponent],
    imports: [CommonModule, MaterialModule, SharedModule],
})
export class BuyerBuilderModule {}
