import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/services/product.service";
import { UserService, User, Errors } from "src/app/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-place-order",
    templateUrl: "./place-order.component.html",
    styleUrls: ["./place-order.component.css"],
})
export class PlaceOrderComponent implements OnInit {
    isSubmitting = false;
    authForm: FormGroup;
    currentUser: User;
    userId: string;
    eproductId: string;

    constructor(
        private productService: ProductService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.route.queryParams.subscribe(params => {
            this.eproductId = params["id"];
        });
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            items: [""],
            user: [""],
            billingAddress: this.billingAddressFormControl,
            shippingAddress: this.shippingAddressFormControl,
            payment: this.paymentFormControl,
        });
    }
    ngOnInit() {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });
    }

    paymentFormControl = new FormControl("", [Validators.required]);
    shippingAddressFormControl = new FormControl("", [Validators.required]);
    billingAddressFormControl = new FormControl("", [Validators.required]);

    submitForm() {
        this.productService.getProductById(this.eproductId).subscribe(data => {
            const items = [];
            items.push(data);
            this.authForm.value.items = items;

            const user = {
                userId: this.currentUser._id,
                name: this.currentUser.username,
            };
            this.authForm.value.user = user;

            console.log(this.authForm.value);

            const credentials = this.authForm.value;
            this.isSubmitting = true;

            this.authForm.value.userId = this.currentUser._id;
            this.authForm.value._id = null;
            this.productService.placeOrder(this.currentUser._id, credentials).subscribe(
                data => this.router.navigateByUrl("/manageOrders"),
                err => {
                    this.isSubmitting = false;
                }
            );
        });
    }
}
