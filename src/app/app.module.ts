import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './Routing/app.routing.module';
import { CoreModule } from './Core/core.module';
import { SharedModule } from './Shared/shared.module';
import { GuideModule } from './Guide/guide.module';
import { UserModule } from './User/user.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    GuideModule,
    SharedModule,
    UserModule
  ],
  providers: [
    Title,
    Meta,
    { provide: 'BODY', useFactory: getBody },
    { provide: 'DOCUMENTELEMENT', useFactory: getDocumentElement },
    { provide: 'WINDOWPR', useFactory: getWindowPR },
    { provide: 'WINDOWLOCATION', useFactory: getWindowLocation },
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// *******************************************************************
// BROWSER DOM ADAPTERS
// *******************************************************************

// Adapter for document.body
export function getBody() {
  return (typeof document !== 'undefined') ? document.body : null;
}

// Adapter for document.documentElement
export function getDocumentElement() {
  return (typeof document !== 'undefined') ? document.documentElement : null;
}

// Adapter for window['PR']
export function getWindowPR() {
  return (typeof window !== 'undefined') ? window['PR'] : null;
}

// Adapter for window.location
export function getWindowLocation() {
  return (typeof window !== 'undefined') ? window.location : null;
}

// Adapter for window.localStorage
export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
