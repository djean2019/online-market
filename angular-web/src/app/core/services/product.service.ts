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
import { Router } from "@angular/router";

@Injectable()
export class ProductService {
    constructor(private apiService: ApiService) {}
    //common all people
    queryList(): Observable<Product[]> {
        const route = "/products";
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    //seller
    queryProdBySeller(sellerId): Observable<ApiResponse> {
        const route = "/seller/" + sellerId + "/products";
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    addProduct(product): Observable<ApiResponse> {
        const route = "/seller/products";
        return this.apiService.post(route, product).pipe(
            map(data => {
                return data;
            })
        );
    }

    //buyer
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
