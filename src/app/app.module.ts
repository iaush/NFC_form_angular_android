import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';

import { NFC, Ndef } from "@awesome-cordova-plugins/nfc/ngx";
import { IonicModule } from '@ionic/angular';

import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    BrowserAnimationsModule,
    
    IonicModule.forRoot()
  ],
  providers: [NFC,
    Ndef
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
