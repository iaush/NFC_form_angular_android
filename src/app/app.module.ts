import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';

import { NFC, Ndef } from "@awesome-cordova-plugins/nfc/ngx";
import { IonicModule } from '@ionic/angular';

import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';



@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    FormsModule,
    //AndroidFullScreen,
    /*FormGroup, 
    FormControl, 
    Validators, */
    MatCheckboxModule,
    HttpClientModule,

    
    IonicModule.forRoot()
  ],
  providers: [NFC,
    Ndef,
    
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
