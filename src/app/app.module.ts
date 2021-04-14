import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './FrontClient/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { FormAddProductComponent } from './Admin/Product/Help/warehouse/form-add-product/form-add-product.component';
import { ProductStateComponent } from './Admin/Product/product-state/product-state.component';
import { FormEditProductComponent } from './FrontClient/form-edit-product/form-edit-product.component';
import {ProductServiceService} from './product-service.service';
import {DataserviceService} from './dataservice.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { FVformComponent } from './FrontClient/fvform/fvform.component';
import {ReadyInvoiceComponent} from './FrontClient/ready-invoice/ready-invoice.component';
import { DatacompanyComponent } from './FrontClient/datacompany/datacompany.component';
import { ClientStateComponent } from './FrontClient/client-state/client-state.component';
import { SortingPipe } from './sorting.pipe';
import { EditClientComponent } from './FrontClient/edit-client/edit-client.component';
import { AddClientComponent } from './FrontClient/add-client/add-client.component';
import { LoginUserComponent } from './FrontMain/login-user/login-user.component';
import { RegistrationUserComponent } from './FrontMain/registration-user/registration-user.component';
import { ForgotPasswordComponent } from './FrontMain/forgot-password/forgot-password.component';
import { UserPanelComponent } from './FrontClient/User/user-panel/user-panel.component';
import { HomeShopComponent } from './FrontMain/home-shop/home-shop.component';
import { CarouselComponent } from './FrontMain/carousel/carousel.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TechnicalDataOfProductComponent } from './FrontMain/technical-data-of-product/technical-data-of-product.component';
import { LastAddProductComponent } from './Admin/Product/last-add-product/last-add-product.component';
import { BasketComponent } from './FrontMain/basket/basket.component';
import { DetailsCurrentCoffeMachineComponent } from './FrontMain/Current-Item/details-current-coffe-machine.component';
import { SearchingComponent } from './FrontMain/searching/searching.component';
import { ClientOrderStateComponent } from './FrontClient/client-order-state/client-order-state.component';
import { CategoriesPipe } from './categories.pipe';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER} from 'ngx-ui-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import {OrderService} from './order.service';
import {AlertModule} from 'ngx-bootstrap/alert';
import { AmountProductAlertComponent } from './FrontMain/amount-product-alert/amount-product-alert.component';
import { AddBasketAlertComponent } from './FrontMain/add-basket-alert/add-basket-alert.component';
import { UserSettingAccountComponent } from './FrontClient/User/user-setting-account/user-setting-account.component';
import { UserOrdersComponent } from './FrontClient/User/user-orders/user-orders.component';
import { DeliveryAndPaymentComponent } from './FrontMain/basket/delivery-and-payment/delivery-and-payment.component';
import { OrderAlertComponent } from './FrontMain/basket/order-alert/order-alert.component';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import { ComplaintComponent } from './FrontClient/User/user-complaint/complaint.component';
import { UserAdressesComponent } from './FrontClient/User/user-adresses/user-adresses.component';
import { UserMessagesComponent } from './FrontClient/User/user-messages/user-messages.component';
import { LoginAdminComponent } from './Admin/Login/login-admin/login-admin.component';
import { DashboardAdminComponent } from './Admin/Board/dashboard-admin/dashboard-admin.component';
import { PanelAdminComponent } from './Admin/Board/panel-admin/panel-admin.component';
import { TestDirective } from './test.directive';
import { ClientsOrderComponent } from './Admin/clients-order/clients-order.component';
import { ShopWarehouseComponent } from './Admin/Shop/shop-warehouse/shop-warehouse.component';
import {NgxCaptureModule} from 'ngx-capture';
import { ShopClientsComponent } from './Admin/Shop/shop-clients/shop-clients.component';
import { WarehouseComponent } from './Admin/Product/Help/warehouse/warehouse.component';
import { ServiceWarehouseComponent } from './Admin/Service/service-warehouse/service-warehouse.component';
import { EditProductComponent } from './Admin/Product/Help/warehouse/edit-product/edit-product.component';
import { FormComponent } from './Admin/Product/Help/warehouse/form/form.component';
import {ClientServiceService} from './client-service.service';
import { ClientFormComponent } from './Admin/Product/Help/clients/client-form/client-form.component';
import { ClientEditComponent } from './Admin/Product/Help/clients/client-edit/client-edit.component';
import { ShopClientADDComponent } from './Admin/Product/Help/clients/shop-client-add/shop-client-add.component';
import {ShopOrdersComponent} from './Admin/Shop/shop-orders/shop-orders.component';
import { PriceListComponent } from './service/price-list/price-list.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {AnimationBuilder} from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RepairOrderComponent } from './service/repair-order/repair-order.component';



const routes: Routes = [{

   path: 'admin/logowanie', component: LoginAdminComponent },
   {path: 'admin', component: DashboardAdminComponent,
    children: [

      {path: 'sklep/asortyment', component: ShopWarehouseComponent, outlet:  'administrator'},
      {path: 'asortyment/dodaj', component: FormAddProductComponent, outlet:  'administrator'},
      {path: 'panel', component: PanelAdminComponent, outlet:  'administrator'},
      {path: 'sklep/klienci', component: ShopClientsComponent, outlet:  'administrator'},
      {path: 'sklep/klienci/dodaj', component: ShopClientADDComponent, outlet:  'administrator'},
      {path: 'sklep/klienci/edytuj/:id', component: ClientEditComponent, outlet:  'administrator'},
      {path: 'sklep/zamowienia', component: ShopOrdersComponent, outlet:  'administrator'},
      {path: 'zamówienia', component: ClientsOrderComponent, outlet:  'administrator'},
      {path: 'serwis/asortyment', component: ServiceWarehouseComponent, outlet:  'administrator'},
      {path: 'asortyment/edytuj/:id', component: EditProductComponent, outlet:  'administrator'},
    ]

  },

  {path: 'home', component: HomeComponent,

  children: [



  { path: 'state', component: ProductStateComponent, outlet: 'route3' },
  { path: 'clients', component: ClientStateComponent, outlet: 'route3' },

  ]
  },

  {path: 'shop', component:  HomeShopComponent,

  children: [

    { path: 'details/:id', component: DetailsCurrentCoffeMachineComponent, outlet: 'route4'} ,

      // children: [
      //   { path: 'item/:name', component: CurrentItemComponent, outlet: 'route8' },
      // ]},

     { path: 'name/:name', component: SearchingComponent, outlet: 'route4' },
     { path: 'cennik', component: PriceListComponent, outlet: 'route4' },
     { path: 'zlecenie', component: RepairOrderComponent, outlet: 'route4' },
    { path: 'logowanie', component: LoginUserComponent, outlet: 'route4' },
     { path: 'technicalData/:id', component: TechnicalDataOfProductComponent, outlet: 'route4' },
     { path: 'basket', component: BasketComponent, outlet: 'route4' },
      { path: 'rejestracja', component: RegistrationUserComponent, outlet: 'route4' },
     { path: 'haslo/zmiana', component: ForgotPasswordComponent, outlet: 'route4' },
    {
      path: 'konto', component: UserPanelComponent, outlet: 'route4', canActivate: [AuthGuard],
      children : [
               {path: 'zamówienia', component: UserOrdersComponent, outlet: 'route5'},
               {path: 'reklamacje', component: ComplaintComponent, outlet: 'route5'},
               {path: 'adresy', component: UserAdressesComponent, outlet: 'route5'},
               {path: 'ustawienia', component: UserSettingAccountComponent, outlet: 'route5'},
               {path: 'wiadomości', component: UserMessagesComponent, outlet: 'route5'},
               ]
    }


]
},










  { path: 'add', component: FormAddProductComponent},
  { path: 'edit', component: FormEditProductComponent},
  { path: 'putInvoice', component: FVformComponent},
  { path: 'invoice/:id', component: ReadyInvoiceComponent},
  { path: 'datacompany', component: DatacompanyComponent},
  { path: 'editClient', component: EditClientComponent},
  { path: 'addClient', component: AddClientComponent},



];

export function JwtTokenGetter(): any {
  return localStorage.getItem('accessToken');
}


@NgModule({

  exports: [RouterModule],
  declarations: [
    AppComponent,
    HomeComponent,
    FormAddProductComponent,
    ProductStateComponent,
    FormEditProductComponent,
    FVformComponent,
    ReadyInvoiceComponent,
    DatacompanyComponent,
    ClientStateComponent,
    SortingPipe,
    EditClientComponent,
    AddClientComponent,
    LoginUserComponent,
    RegistrationUserComponent,
    ForgotPasswordComponent,
    UserPanelComponent,
    HomeShopComponent,
    CarouselComponent,
    TechnicalDataOfProductComponent,
    LastAddProductComponent,
    BasketComponent,
    DetailsCurrentCoffeMachineComponent,
    SearchingComponent,
    ClientOrderStateComponent,
    CategoriesPipe,
    AmountProductAlertComponent,
    AddBasketAlertComponent,
    UserSettingAccountComponent,
    UserOrdersComponent,
    DeliveryAndPaymentComponent,
    OrderAlertComponent,
    ComplaintComponent,
    UserAdressesComponent,
    UserMessagesComponent,
    LoginAdminComponent,
    DashboardAdminComponent,


    PanelAdminComponent,

    TestDirective,

    ClientsOrderComponent,

    ShopWarehouseComponent,

    ShopClientsComponent,

    WarehouseComponent,

    ServiceWarehouseComponent,


    EditProductComponent,

    FormComponent,

    ClientFormComponent,

    ClientEditComponent,

    ShopClientADDComponent,
    ShopOrdersComponent,
    PriceListComponent,
    RepairOrderComponent




  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    IvyCarouselModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    NgxSliderModule,
    ModalModule.forRoot(),
    NgxUiLoaderModule,
    ModalModule.forRoot(),
    NgxCaptureModule,
    AlertModule.forRoot(),
    JwtModule.forRoot({
      config: {

        tokenGetter: JwtTokenGetter,
        allowedDomains: [],
        disallowedRoutes: ['http://localhost:8088/login', 'http://localhost:8088/products/name']
      }
    }),
    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,


  ],
  providers: [ ProductServiceService, TestDirective, DataserviceService, AuthService, AuthGuard, EditProductComponent, ClientServiceService, WarehouseComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
