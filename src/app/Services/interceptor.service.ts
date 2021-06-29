// import { Injectable } from '@angular/core';
// import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {DefaultUrlSerializer, UrlTree} from '@angular/router';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class InterceptorService implements HttpInterceptor{
//
//   constructor() { }
//
//   intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(httpRequest);
//   }
// }
//
//
// export class CustomUrlSerializer extends DefaultUrlSerializer {
//   constructor() {
//     super();
//   }
//   private reverseUrl(url: string): string {
//     const startIndex = 1;
//     const segmentString =
//       `(${url.substring(startIndex).split('/').join('//')})`;
//     return url.substring(0, startIndex) + segmentString;
//   }
//
//   private beautifyUrl(url: string): string {
//     return url
//       .replace('(', '')
//       .replace(')', '')
//       .replace('route4', '')
//       .split('//').join('/');
//   }
//   parse(url: string): UrlTree {
//     return super.parse(this.reverseUrl(url));
//   }
//
//   serialize(tree: UrlTree): string {
//     return this.beautifyUrl(super.serialize(tree));
//   }
// }
