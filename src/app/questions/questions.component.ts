import { QuestionsService } from './questions.service';
import { Component, OnInit } from '@angular/core';

import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

//import { MatStepper } from '@angular/material/stepper';
import { Http } from '@capacitor-community/http';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
//import { NgModel } from '@angular/forms';
//import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen/ngx';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';

//import {GoogleSpreadsheet} from 'google-spreadsheet';
//import { Observable } from 'rxjs';

//import { google } from 'googleapis';

import { AngularFirestore } from '@angular/fire/compat/firestore';

//import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  Uname = '';
  Uemail = '';
  agreecondition = false;
  agreecondition2 = false;
  public now: Date = new Date();
  subscription: any;
  email_exist = false;

  open: boolean = true;
  open2: boolean = false;
  open3: boolean = false;
  open4: boolean = false;
  open5: boolean = false;
  open6: boolean = false;

  radioData = 5;

  showspinner=false

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    service: QuestionsService,
    private http: HttpClient,
    private db: AngularFirestore
  ) {
    this._service = service;
  }

  submitform = function () {};

  store_firebase() {
    const inputnameElement = <HTMLInputElement>document.getElementById('name');
    const inputemailElement = <HTMLInputElement>(
      document.getElementById('email')
    );

    this.db.collection('userdata').add({
      name: inputnameElement.value,
      email: inputemailElement.value,
    });
  }

  check_firebase() {
    console.log('checking firebase');
    const inputemailElement = <HTMLInputElement>(
      document.getElementById('email')
    );
    //console.log(inputemailElement.value)
    return this.db
      .collection('userdata', (ref) =>
        ref.where('email', '==', inputemailElement.value)
      )
      .snapshotChanges();

    //this.db.collection('userdata',
    //ref => ref.where('email', '==', inputemailElement.value )).snapshotChanges().subscribe(re=>{
    //const data=re.map(item=>item.payload.doc.data());
    //console.log(data);
    //})
  }

  doPost = function () {
    return function (this: QuestionsComponent) {
      var companies = [
        'Co-Create (CLF Award winning papers)',
        "Co-Create (SIMTech's Research Highlights)",
        "Explore (Fong's Engineering and Manufacturing Pte Ltd)",
        'Explore (Phillips Singapore)',
        'Form (SIMTech Methodologies and Frameworks on Digitalisation)',
        'Form (SEAC Methodologies and Frameworks on Sustainability)',
        'Implement (Beckhoff Automation Pte Ltd)',
        'Implement (InnoArk Pte Ltd)',
        'Implement (Blum-Novotest GmbH)',
        'Implement (Hexagon)',
        'Implement (Schneider Electric Singapore Pte Ltd)',
        'Implement (Singapore Contec Pte Ltd)',
        'Implement (MMC Hardmetal (Thailand) Co., Ltd.)',
        'Implement (OPEN MIND Technologies Asia Pacific Pte Ltd)',
        'Implement (Walter AG Singapore Pte. Ltd)',
        'Implement (EMUGE-FRANKEN Singapore Pte. Ltd.)',
        'Implement (SATO Asia Pacific Pte. Ltd.)',
      ];

      const inputnameElement = <HTMLInputElement>(
        document.getElementById('name')
      );
      const inputemailElement = <HTMLInputElement>(
        document.getElementById('email')
      );
      const inputnumberElement = <HTMLInputElement>(
        document.getElementById('number')
      );
      const inputratingElement = <HTMLInputElement>(
        document.querySelector('input[name="rating"]:checked')
      );
      const feedback = <HTMLTextAreaElement>document.getElementById('feedback');

      var array = [];
      var checkboxes = document.querySelectorAll(
        'input[name="interest"]:checked'
      );

      var interest = {
        'entry.1600343198': inputnameElement.value,
        'entry.1331790656': inputemailElement.value,
        'entry.828903347': inputnumberElement.value,
        'entry.168112271': inputratingElement.value,
        'entry.1471824904': feedback.value,
        'entry.685949873': 'No',
        'entry.48743429': 'No',

        'entry.444312339': 'No',
        'entry.307462702': 'No',
        'entry.1041654158': 'No',
        'entry.1592695906': 'No',
        'entry.1868414664': 'No',
        'entry.1116097888': 'No',
        'entry.1620719190': 'No',

        'entry.1334723321': 'No',
        'entry.1842557720': 'No',
        'entry.682454603': 'No',
        'entry.47355250': 'No',
        'entry.1626776898': 'No',
        'entry.1970335812': 'No',
        'entry.1443309497': 'No',
        'entry.2065616329': 'No',
        'entry.398787709': 'No',
        'entry.1412750452': 'No',
        'entry.1621987041': 'No',
        'entry.464644701': 'No',
        'entry.410551824': 'No',
      };

      /*entry.685949873: Form (SIMTech Methodologies and Frameworks on Digitalisation)
                entry.48743429: Form (SEAC Methodologies and Frameworks on Sustainability)
                entry.1334723321: Implement (Beckhoff Automation Pte Ltd)
                entry.1842557720: Implement (InnoArk Pte Ltd)
                entry.682454603: Implement (Blum-Novotest GmbH)
                entry.47355250: Implement (Hexagon)
                entry.1626776898: Implement (Schneider Electric Singapore Pte Ltd)
                entry.1970335812: Implement (Singapore Contec Pte Ltd)
                entry.1443309497: Implement (MMC Hardmetal (Thailand) Co., Ltd.)
                entry.2065616329: Implement (OPEN MIND Technologies Asia Pacific Pte Ltd)
                entry.398787709: Implement (Walter AG Singapore Pte. Ltd)
                entry.1412750452: Implement (EMUGE-FRANKEN Singapore Pte. Ltd.)
                entry.1621987041: Implement (SATO Asia Pacific Pte. Ltd.)*/

      for (var i = 0; i < checkboxes.length; i++) {
        var Element = <HTMLInputElement>checkboxes[i];
        array.push(Element.value);

        //array.push(companies[parseInt(Element.value)])
      }

      for (var i = 0; i < array.length; i++) {
        if (array[i] == '0') {
          interest['entry.685949873'] =
            'Automation Assessment and Adoption(AAA)';
        }
        if (array[i] == '1') {
          interest['entry.48743429'] =
            'Digital Transformation and Innovation Program (DTI)';
        }
        if (array[i] == '2') {
          interest['entry.1334723321'] =
            'Implement (Beckhoff Automation Pte Ltd)';
        }
        if (array[i] == '3') {
          interest['entry.1842557720'] = 'Implement (InnoArk Pte Ltd)';
        }
        if (array[i] == '4') {
          interest['entry.682454603'] = 'Implement (Blum-Novotest GmbH)';
        }
        if (array[i] == '5') {
          interest['entry.47355250'] = 'Implement (Hexagon)';
        }
        if (array[i] == '6') {
          interest['entry.1626776898'] =
            'Implement (Schneider Electric Singapore Pte Ltd)';
        }
        if (array[i] == '7') {
          interest['entry.1970335812'] = 'Implement (Singapore Contec Pte Ltd)';
        }
        if (array[i] == '8') {
          interest['entry.1443309497'] =
            'Implement (MMC Hardmetal (Thailand) Co., Ltd.)';
        }
        if (array[i] == '9') {
          interest['entry.2065616329'] =
            'Implement (OPEN MIND Technologies Asia Pacific Pte Ltd)';
        }
        if (array[i] == '10') {
          interest['entry.398787709'] =
            'Implement (Walter AG Singapore Pte. Ltd)';
        }
        if (array[i] == '11') {
          interest['entry.1412750452'] =
            'Implement (EMUGE-FRANKEN Singapore Pte. Ltd.)';
        }
        if (array[i] == '12') {
          interest['entry.1621987041'] =
            'Implement (SATO Asia Pacific Pte. Ltd.)';
        }
        if (array[i] == '13') {
          interest['entry.464644701'] = 'Hurco (SE Asia) Pte Ltd';
        }
        if (array[i] == '14') {
          interest['entry.410551824'] = 'Makino Milling Machine Co. Ltd.';
        }

        if (array[i] == '15') {
          interest['entry.444312339'] =
            'Energy Efficiency Monitoring and Analysis System';
        }
        if (array[i] == '16') {
          interest['entry.307462702'] = 'Green Compass';
        }
        if (array[i] == '17') {
          interest['entry.1041654158'] =
            'Life Cycle Assessment (LCA) & Life Cycle Costing (LCC)';
        }
        if (array[i] == '18') {
          interest['entry.1592695906'] =
            'Operation & Technology Roadmap (OTR) Methodology';
        }
        if (array[i] == '19') {
          interest['entry.1868414664'] =
            'Resource Efficiency Monitoring and Analysis Platform (REMAP)';
        }
        if (array[i] == '20') {
          interest['entry.1116097888'] =
            'Smart Industry Readiness Index (SIRI) Framework';
        }
        if (array[i] == '21') {
          interest['entry.1620719190'] = 'Smart System';
        }
      }

      var interest2 = {
        'entry.2070480692': inputnameElement.value,
        'entry.1485450992_hour': new Date().getHours(),
        'entry.1485450992_minute': new Date().getMinutes(),
        'entry.1331402498_year': new Date().getFullYear(),
        'entry.1331402498_month': new Date().getMonth() + 1,
        'entry.1331402498_day': new Date().getDate(),
        'entry.1684285223': 'Feedback Form',
      };

      var options2 = {
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeaQBxI5CdzTkRnUARfmS02ByQywaCuYoFWtslUhpJbc7YUNg/formResponse',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: interest2,
      };

      var options = {
        url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkv02jQMeGMT3MaWtLPTK66Ze-VhiTXHn7RaxXuC69NbwNhg/formResponse',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: interest,
      };


      this.showspinner=true

      this.subscription = this.check_firebase().subscribe((re) => {
        //console.log(`re2: ${re}`);
        if (re.length > 0) {
          console.log('Match found');
          this.email_exist = true
          //console.log(re);
        } else {
          console.log('email no existo');
          this.email_exist = false
          //console.log(re);
        }
        this.subscription.unsubscribe()
        this.store_firebase();
        
         Http.post(options2)
          .then((data) => {
            console.log('Date sent');
          })
          .catch((error) => {
           console.log('Time logging Error');
          });

        
        Http.post(options)
          .then((data) => {
            if (this.email_exist == false){
            Swal.fire({
              html:
                '</p> NAME : ' + String(inputnameElement.value) + '<br>' + 'EMAIL : ' +
                String(inputemailElement.value) +'<br>' +
                '<h2>Thank you for your response! Please retain this pop-up and approach our staff to collect your free mask</h2></p>',
              title: 'Submission recorded',
              allowOutsideClick: false,
              icon: 'success',
            })
          this.showspinner=false
          }
            else {
                Swal.fire({
                    html:
                      '</p> NAME : ' + String(inputnameElement.value) + '<br>' + 'EMAIL : ' +
                      String(inputemailElement.value) +'<br>' +
                      '<h2>Thank you again for your response! This response will overwrite your previous response</h2></p>',
                    title: 'Submission recorded',
                    allowOutsideClick: false,
                    icon: 'warning',
                  })
                  this.showspinner=false
            };

            var form1 = <HTMLFormElement>document.getElementById('form1');
            form1.reset();
            this.agreecondition = false;
            this.agreecondition2 = false;
            this.email_exist=false;
            this.open = !this.open;
            this.open5 = !this.open;
          })
          .catch((error) => {
            if (this.email_exist == false){
                Swal.fire({
                  html:
                    '</p> NAME : ' + String(inputnameElement.value) + '<br>' + 'EMAIL : ' +
                    String(inputemailElement.value) +'<br>' +
                    '<h2>Please collect .....</h2></p>',
                  title: 'Form error',
                  allowOutsideClick: false,
                  icon: 'error'
                })
                this.showspinner=false
              }
                else {
                    Swal.fire({
                        html:
                          '</p> NAME : ' + String(inputnameElement.value) + '<br>' + 'EMAIL : ' +
                          String(inputemailElement.value) +'<br>' +
                          '<h2>User already recorded. Thank you!</h2></p>',
                        title: 'Form error',
                        allowOutsideClick: false,
                        icon: 'error',
                      })
                      this.showspinner=false
                    }
            //console.log(error);
            var form1 = <HTMLFormElement>document.getElementById('form1');
            form1.reset();
            this.agreecondition = false;
            this.agreecondition2 = false;
            this.email_exist=false;
            this.open = !this.open;
            this.open5 = !this.open;
          });
      });
    };
  };

  nfcread() {
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.nfc.readerMode(flags).subscribe(
      (tag) => alert(JSON.stringify(tag)),
      (err) => alert('Error reading tag ' + err)
    );
  }

  ngOnInit(): void {
    document.title="Feedback form"
    if (Capacitor.isNativePlatform() == false) { //false for normal
      ///change here
      console.log('Not native');
      this.submitform = this.apicall();
      //this.startNFCListener();

    } else {
      console.log('Native');
      this.submitform = this.doPost();
      this.startNFCListener();
    }
    //this.startNFCListener();
    //this.getMobileOperatingSystem()
  }

  printvalue() {
    const inputnameElement = <HTMLInputElement>document.getElementById('name');
    console.log(inputnameElement.value);

    const inputratingElement = <HTMLInputElement>(
      document.querySelector('input[name="rating"]:checked')
    );
    console.log(inputratingElement.value);

    var array = [];
    var checkboxes = document.querySelectorAll(
      'input[name="interest"]:checked'
    );

    for (var i = 0; i < checkboxes.length; i++) {
      var Element = <HTMLInputElement>checkboxes[i];
      array.push(Element.value);
    }

    console.log(array);
  }

  _service: QuestionsService;

  formResponse = {
    name: 'DEFAULT',
    email: 'DEFAULT',
    contact: 'DEFAULT',
    useful: 0,
    explore: ['Co-Create (CLF Award winning papers)'],
    improve: 'DEFAULT',
    date_year: new Date().getFullYear(),
    date_month: new Date().getMonth(),
    date_day: new Date().getDate(),
    date_hour: new Date().getHours(),
    date_min: new Date().getMinutes(),
    email_exist : false,
  };

  apicall = function () {
    return function (this: QuestionsComponent) {
      const inputnameElement = <HTMLInputElement>(
        document.getElementById('name')
      );
      this.formResponse.name = inputnameElement.value;

      const inputemailElement = <HTMLInputElement>(
        document.getElementById('email')
      );
      this.formResponse.email = inputemailElement.value;

      const inputnumberElement = <HTMLInputElement>(
        document.getElementById('number')
      );
      this.formResponse.contact = inputnumberElement.value;

      const inputratingElement = <HTMLInputElement>(
        document.querySelector('input[name="rating"]:checked')
      );
      this.formResponse.useful = parseInt(inputratingElement.value);
      //this.formResponse.useful  = 3;

      const feedback = <HTMLTextAreaElement>document.getElementById('feedback');
      this.formResponse.improve = feedback.value;

      (this.formResponse.date_year = new Date().getFullYear()),
        (this.formResponse.date_month = new Date().getMonth()),
        (this.formResponse.date_day = new Date().getDate()),
        (this.formResponse.date_hour = new Date().getHours()),
        (this.formResponse.date_min = new Date().getMinutes());

      var array = [];
      var checkboxes = document.querySelectorAll(
        'input[name="interest"]:checked'
      );
      for (var i = 0; i < checkboxes.length; i++) {
        var Element = <HTMLInputElement>checkboxes[i];
        array.push(Element.value);
      }
      this.formResponse.explore = array;

      //console.log(`formResponse: ${this.formResponse}`)
      // this.check_firebase()
      // this.store_firebase()

      this.showspinner=true

      this.subscription = this.check_firebase().subscribe((re) => {
        //console.log(`re1: ${re}`);
        if (re.length > 0) {
          console.log('Match found');
          this.formResponse.email_exist=true
          //console.log(re);
        } else {
          console.log('email no existo');
          this.formResponse.email_exist=false
          //console.log(re);
        }
        this.subscription.unsubscribe();
        this.store_firebase();
        
        this._service.postForm(this.formResponse, this);

        var form1 = <HTMLFormElement>document.getElementById('form1');
        form1.reset();
        this.agreecondition = false;
        this.agreecondition2 = false;
        //this.open = !this.open;
        //this.open5 = !this.open;
      });
    };
  };

  startNFCListener() {
    //this.formResponse = {
    //  name: 'DEFAULT',
    //  email: 'DEFAULT',
    //  contact: 'DEFAULT',
    //  useful: 0,
    //  explore: ['Co-Create (CLF Award winning papers)'],
    //  improve: 'DEFAULT',
    //  date_year: new Date().getFullYear(),
    //  date_month: new Date().getMonth(),
    //  date_day: new Date().getDate(),
    //  date_hour: new Date().getHours(),
    //  date_min: new Date().getMinutes(),
    //  email_exist : false,
    //};

    this.nfc.addNdefListener().subscribe(
      (tag) => {
        let msg = this.nfc.bytesToString(tag.tag.ndefMessage[0].payload);

        const inputnameElement = <HTMLInputElement>(
          document.getElementById('name')
        );
        inputnameElement.value = msg.split('FN:')[1].split('TEL;')[0];
        this.Uname = inputnameElement.value;
        this.formResponse.name = inputnameElement.value;
        //this.formResponse.name="PLACEHOLDER";

        const inputemailElement = <HTMLInputElement>(
          document.getElementById('email')
        );
        inputemailElement.value = msg.split('EMAIL;WORK:')[1].split('ORG')[0];
        this.Uemail = inputemailElement.value;
        this.formResponse.email = inputemailElement.value;
        //this.formResponse.email= "PLACEHOLDER";

        const inputnumberElement = <HTMLInputElement>(
          document.getElementById('number')
        );
        inputnumberElement.value = msg.split('TEL;WORK:')[1].split('EMAIL')[0];
        this.formResponse.contact = inputnumberElement.value;
        // this.formResponse.contact= "PLACEHOLDER";

        inputemailElement.classList.add('highlight');
        inputnameElement.classList.add('highlight');
        inputnumberElement.classList.add('highlight');

        setTimeout(() => {
          inputemailElement.classList.add('kill-highlight');
          inputnameElement.classList.add('kill-highlight');
          inputnumberElement.classList.add('kill-highlight');
        }, 100);

        setTimeout(() => {
          inputemailElement.classList.remove('highlight');
          inputnameElement.classList.remove('highlight');
          inputnumberElement.classList.remove('highlight');

          inputemailElement.classList.remove('kill-highlight');
          inputnameElement.classList.remove('kill-highlight');
          inputnumberElement.classList.remove('kill-highlight');
        }, 700);
        //alert(msg)
      },
      (err) => {
        console.log('Error reading tag ' + err);
      }
    );
  }

}
