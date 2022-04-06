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
//import { Capacitor } from '@capacitor/core';

import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'


// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCfaHRfsnvB4Z_vVtzGdwHGmaXosY77Cng",
  authDomain: "clfapp.firebaseapp.com",
  projectId: "clfapp",
  storageBucket: "clfapp.appspot.com",
  messagingSenderId: "184153021355",
  appId: "1:184153021355:web:0b0e87beb7d057e246d0ee"
};


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
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    

  ],
  providers: [NFC,
    Ndef,
    
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
