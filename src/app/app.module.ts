/* eslint-disable no-console */
import { ProductImage } from './product/models/product-image';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { CoreModule } from './core/core.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Amplify } from 'aws-amplify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './account/account.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductService } from './product/service/product.service';
import { Observable, tap } from 'rxjs';
import { CartService } from './shared/service/cart.service';
import { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    userPoolId: 'ap-south-1_Rqzfipat9',
    userPoolWebClientId: '2r7gu5kr5lbqm7d136v5il5m7f',
    oauth: {
      region: 'ap-south-1',
      domain: 'shopperapp',
      scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:4200/',
      redirectSignOut: 'http://localhost:4200/',
      responseType: 'code',
    },
  },
});

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

function syncUserCart(cartService: CartService): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          cartService
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            .getCartItems(user['username'])
            // window.localStorage.setItem('user_cart', JSON.stringify(userCart))
            .subscribe((userCart) => console.log('Sync cloud data to local storage : ', userCart));
          resolve();
        })
        .catch(() => {
          resolve();
        });
    });
}

function initializeApp(productService: ProductService): () => Observable<ProductImage[]> {
  return () =>
    productService
      .getProductImages()
      .pipe(tap((images) => window.localStorage.setItem('product-images', JSON.stringify(images))));
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, BlankLayoutComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'ta',
    }),
    HttpClientModule,
    AuthModule,
    ProductModule,
    CoreModule,
    HomeModule,
    CartModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    BrowserAnimationsModule,
    AccountModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ProductService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: syncUserCart,
      deps: [CartService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
