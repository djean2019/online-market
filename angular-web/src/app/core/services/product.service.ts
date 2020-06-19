import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";

import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { map, distinctUntilChanged } from "rxjs/operators";
import { Product } from "../models/product.modul";
import { UserService } from "./user.service";
import { User } from "../models";
import { ApiResponse } from "../models/api.response";
import { Cart } from "../models/cart.module";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";

@Injectable()
export class ProductService {
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
        private router: Router,
        private userService: UserService
    ) {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });
    }
    currentUser: User;

    queryList(): Observable<Product[]> {
        const route = "/products";
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    queryCart(buyerId): Observable<ApiResponse> {
        const route = "/buyer/" + buyerId + "/cart";
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    removeFromCart(buyerId, prodId): Observable<ApiResponse> {
        const route = "/buyer/cart/" + buyerId + "/" + prodId;
        return this.apiService.post(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    removeAll(buyerId): Observable<ApiResponse> {
        const route = "/buyer/cart/" + buyerId;
        return this.apiService.delete(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    addToCart(buyId, prodId): Observable<ApiResponse> {
        const route = "/buyer/" + buyId + "/" + prodId;
        return this.apiService.post(route);
    }
}
