import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";

import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { map, distinctUntilChanged } from "rxjs/operators";
import { Product } from "../models/product.modul";
import { UserService } from "./user.service";
import { User } from "../models";

@Injectable()
export class ProductService {
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService,
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
}
