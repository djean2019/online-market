import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/services/product.service";
import { UserService, User, Errors } from "src/app/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-add-product",
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
    title: string;
    page: string;
    errors: Errors = { errors: {} };
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
            price: this.priceFormControl,
            name: this.productNameFormControl,
            imageUrl: this.imageUrlFormControl,
            description: this.descriptionFormControl,
            userId: [""],
            _id: [""],
            createdDate: [""],
            __v: [""],
        });
    }
    ngOnInit() {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });

        this.route.url.subscribe(data => {
            this.page = data[data.length - 1].path;
            // Set a title for the page accordingly
            this.title = this.page;
            if (this.page === "EditProduct") {
                console.log(this.eproductId);
                this.productService.getProductById(this.eproductId).subscribe(data => {
                    this.authForm.setValue(data);
                });
            }
        });
    }

    descriptionFormControl = new FormControl("", [Validators.required]);
    priceFormControl = new FormControl("", [Validators.required]);
    productNameFormControl = new FormControl("", [Validators.required]);
    imageUrlFormControl = new FormControl("", [Validators.required]);

    submitForm() {
        const credentials = this.authForm.value;
        this.isSubmitting = true;
        this.errors = { errors: {} };
        if (this.page === "EditProduct") {
            this.authForm.value._id = this.eproductId;
            this.productService.editProduct(this.eproductId, credentials).subscribe(
                data => this.router.navigateByUrl("/manageProducts"),
                err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            );
        } else {
            this.authForm.value.userId = this.currentUser._id;
            this.authForm.value._id = null;
            this.productService.addProduct(credentials).subscribe(
                data => this.router.navigateByUrl("/manageProducts"),
                err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            );
        }
    }
}
