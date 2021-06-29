import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { FormAddProductComponent } from './Components/AdminPanel/Product/Help/warehouse/form-add-product/form-add-product.component';
import {ProductServiceService} from './Services/product-service.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { FVformComponent } from './Components/AdminPanel/Bookkeeping/Invoices/fvform/fvform.component';
import { SortingPipe } from './Pipes/sorting.pipe';
import { LoginUserComponent } from './Components/MainApp/Auth/login-user/login-user.component';
import { RegistrationUserComponent } from './Components/MainApp/Auth/registration-user/registration-user.component';
import { ForgotPasswordComponent } from './Components/MainApp/Auth/forgot-password/forgot-password.component';
import { UserPanelComponent } from './Components/UserAccount/user-panel/user-panel.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TechnicalDataOfProductComponent } from './Components/MainApp/start/technical-data-of-product/technical-data-of-product.component';
import { CategoriesPipe } from './Pipes/categories.pipe';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER} from 'ngx-ui-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import {OrderService} from './Services/order.service';
import {AlertModule} from 'ngx-bootstrap/alert';
import { AmountProductAlertComponent } from './Components/MainApp/alerts/amount-product-alert/amount-product-alert.component';
import { AddBasketAlertComponent } from './Components/MainApp/alerts/add-basket-alert/add-basket-alert.component';
import { UserSettingAccountComponent } from './Components/UserAccount/user-setting-account/user-setting-account.component';
import { UserOrdersComponent } from './Components/UserAccount/user-orders/user-orders.component';
import { OrderAlertComponent } from './Components/MainApp/alerts/order-alert/order-alert.component';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './Services/auth.service';
import {AuthGuard} from './Guard/auth.guard';
import { ComplaintComponent } from './Components/UserAccount/user-complaint/complaint.component';
import { UserAdressesComponent } from './Components/UserAccount/user-adresses/user-adresses.component';
import { UserMessagesComponent } from './Components/UserAccount/user-messages/user-messages.component';
import { LoginAdminComponent } from './Components/AdminPanel/Login/login-admin/login-admin.component';
import { DashboardAdminComponent } from './Components/AdminPanel/Board/dashboard-admin/dashboard-admin.component';
import { PanelAdminComponent } from './Components/AdminPanel/Board/panel-admin/panel-admin.component';
import { ShopWarehouseComponent } from './Components/AdminPanel/Shop/shop-warehouse/shop-warehouse.component';
import {NgxCaptureModule} from 'ngx-capture';
import { ShopClientsComponent } from './Components/AdminPanel/Shop/shop-clients/shop-clients.component';
import { WarehouseComponent } from './Components/AdminPanel/Product/Help/warehouse/warehouse.component';
import { ServiceWarehouseComponent } from './Components/AdminPanel/Service/service-warehouse/service-warehouse.component';
import { EditProductComponent } from './Components/AdminPanel/Product/Help/warehouse/edit-product/edit-product.component';
import { FormComponent } from './Components/AdminPanel/Product/Help/warehouse/form/form.component';
import {ClientServiceService} from './Services/client-service.service';
import { ClientFormComponent } from './Components/AdminPanel/Product/Help/clients/client-form/client-form.component';
import { ClientEditComponent } from './Components/AdminPanel/Product/Help/clients/client-edit/client-edit.component';
import { ShopClientADDComponent } from './Components/AdminPanel/Product/Help/clients/shop-client-add/shop-client-add.component';
import {ShopOrdersComponent} from './Components/AdminPanel/Shop/shop-orders/shop-orders.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ShopManagementComponent } from './Components/AdminPanel/Shop/ShopManagement/shop-management/shop-management.component';
import { ArticleLineComponent } from './Components/AdminPanel/Shop/ShopManagement/ArticleLines/article-line/article-line.component';
import { SectionComponentComponent } from './Components/AdminPanel/Shop/ShopManagement/Sections/section-component/section-component.component';
import { AddArticleLineComponent } from './Components/AdminPanel/Shop/ShopManagement/ArticleLines/add-article-line/add-article-line.component';
import { AddSectionComponent } from './Components/AdminPanel/Shop/ShopManagement/Sections/add-section/add-section.component';
import {AuthAdminGuard} from './Guard/auth-admin.guard';
import { SalesDocumentStateComponent } from './Components/AdminPanel/Bookkeeping/Invoices/sales-document-state/sales-document-state.component';
import {MessageService} from './Services/message.service';
import { MessagesComponent } from './Components/AdminPanel/Messages/messages/messages.component';
import { MessageComponentComponent } from './Components/MainApp/rest/message-component/message-component.component';
import { DatePipe } from './Pipes/date.pipe';
import {NgSimpleSidebarModule} from 'ng-simple-sidebar';
import {SidebarModule} from 'ng-sidebar';
import {AngularDropdownModule} from 'angular-dropdown';
import { TimePipe } from './Pipes/time.pipe';
import { TestPipe } from './Pipes/test.pipe';
import { Test2Pipe } from './Pipes/test2.pipe';
import { ItemsComponent } from './Components/MainApp/start/items/items.component';
import { HomeComponent } from './Components/MainApp/start/home/home.component';
import { BasketShopComponent } from './Components/MainApp/basket/basket-shop/basket-shop.component';
import { DeliveryComponent } from './Components/MainApp/basket/delivery/delivery.component';
import {MongoServiceService} from './Services/mongo-service.service';
import { TestDynamicComponentComponent } from './test-dynamic-component/test-dynamic-component.component';
import { SortOptionPipe } from './Pipes/sort-option.pipe';
import { SafeHtmlPipe } from './Pipes/safe-html.pipe';
import {Section} from './Classes/section';
import { StartAlertComponent } from './Components/MainApp/alerts/start-alert/start-alert.component';
import { RoundNumberPipe } from './Pipes/round-number.pipe';





const routes: Routes = [
  { path: '',   redirectTo: '/sklep', pathMatch: 'full' },
  {path: 'sklep', component:  HomeComponent,
    children: [
      {path: 'produkty/:name', component:  ItemsComponent, outlet: 'route4'},
      {path: 'koszyk', component:  BasketShopComponent, outlet: 'route4'},
      { path: 'logowanie', component: LoginUserComponent, outlet: 'route4' },
      { path: 'produkt/dane/:id', component: TechnicalDataOfProductComponent, outlet: 'route4' },
      { path: 'rejestracja', component: RegistrationUserComponent, outlet: 'route4' },
      { path: 'haslo/zmiana', component: ForgotPasswordComponent, outlet: 'route4' },
      {
        path: 'konto', component: UserPanelComponent, outlet: 'route4', canActivate: [AuthGuard],
        children : [
          {path: 'zamówienia', component: UserOrdersComponent, outlet: 'route5'},
          {path: 'reklamacje', component: ComplaintComponent, outlet: 'route5'},
          {path: 'adresy', component: UserAdressesComponent, outlet: 'route5', canActivate: [AuthGuard]},
          {path: 'ustawienia', component: UserSettingAccountComponent, outlet: 'route5'},
          {path: 'wiadomości', component: UserMessagesComponent, outlet: 'route5'},
        ]
      }

    ]
  },

  { path: 'admin/logowanie', component: LoginAdminComponent },
  // { path: '**', redirectTo: '/shop',pathMatch: 'full' },
   {path: 'admin', component: DashboardAdminComponent, canActivate: [AuthAdminGuard],
    children: [

      {path: 'sklep/asortyment', component: ShopWarehouseComponent, outlet:  'administrator'},
      {path: 'asortyment/dodaj', component: FormAddProductComponent, outlet:  'administrator'},
      {path: 'panel', component: PanelAdminComponent, outlet:  'administrator'},
      {path: 'sklep/klienci', component: ShopClientsComponent, outlet:  'administrator'},
      {path: 'sklep/klienci/dodaj', component: ShopClientADDComponent, outlet:  'administrator'},
      {path: 'sklep/klienci/edytuj/:id', component: ClientEditComponent, outlet:  'administrator'},
      {path: 'sklep/zamowienia', component: ShopOrdersComponent, outlet:  'administrator'},
      {path: 'serwis/asortyment', component: ServiceWarehouseComponent, outlet:  'administrator'},
      {path: 'asortyment/edytuj/:id', component: EditProductComponent, outlet:  'administrator'},
      {path: 'sklep/zarzadzanie', component: ShopManagementComponent, outlet:  'administrator'},
       {path: 'sklep/zarzadzanie/sekcje/dodaj', component: AddArticleLineComponent, outlet:  'administrator'},
       {path: 'sklep/zarzadzanie/nawigacja/dodaj', component: AddSectionComponent, outlet:  'administrator'},
       {path: 'ksiegowosc/faktury', component: SalesDocumentStateComponent, outlet:  'administrator'},
       {path: 'ksiegowosc/faktury/dodaj', component: FVformComponent, outlet:  'administrator'},
       {path: 'wiadomosci', component: MessagesComponent, outlet:  'administrator'},


    ]

  },

];

export function JwtTokenGetter(): any {
  return localStorage.getItem('accessToken');
}



@NgModule({

  exports: [RouterModule],
  declarations: [
    AppComponent,
    FormAddProductComponent,
    FVformComponent,
    SortingPipe,
    LoginUserComponent,
    RegistrationUserComponent,
    ForgotPasswordComponent,
    UserPanelComponent,
    TechnicalDataOfProductComponent,
    CategoriesPipe,
    AmountProductAlertComponent,
    AddBasketAlertComponent,
    UserSettingAccountComponent,
    UserOrdersComponent,
    OrderAlertComponent,
    ComplaintComponent,
    UserAdressesComponent,
    UserMessagesComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    PanelAdminComponent,
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
    ShopManagementComponent,
    ArticleLineComponent,
    SectionComponentComponent,
    AddArticleLineComponent,
    AddSectionComponent,
    SalesDocumentStateComponent,
    MessagesComponent,
    MessageComponentComponent,
    DatePipe,
    TimePipe,
    TestPipe,
    Test2Pipe,
    ItemsComponent,
    HomeComponent,
    BasketShopComponent,
    DeliveryComponent,
    TestDynamicComponentComponent,
    SortOptionPipe,
    SafeHtmlPipe,
    StartAlertComponent,
    RoundNumberPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDropdownModule,
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
    NgSimpleSidebarModule,
    SidebarModule.forRoot(),
    JwtModule.forRoot({
      config: {

        // tokenGetter: JwtTokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      }
    }),


    AccordionModule,
    BrowserAnimationsModule,
    FormsModule,


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [MongoServiceService, ProductServiceService, OrderService, AuthService, AuthAdminGuard, AuthGuard, EditProductComponent, ClientServiceService, WarehouseComponent, HomeComponent, MessageService],
  bootstrap: [AppComponent],

})


export class AppModule {
}
