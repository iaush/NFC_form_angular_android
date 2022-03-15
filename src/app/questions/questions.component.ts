import { QuestionsService } from './questions.service';
import { Component, OnInit } from '@angular/core';

import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

import { MatStepper } from '@angular/material/stepper';
import {Http} from '@capacitor-community/http'
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

    showspinner = false



    constructor(private nfc: NFC, private ndef: Ndef, service: QuestionsService) {
        this._service = service;
    }


    doPost = async() =>{

        var companies = ["", "Co-Create (CLF Award winning papers)",
        "Co-Create (SIMTech's Research Highlights)",
        "Explore (Fong's Engineering and Manufacturing Pte Ltd)",
        "Explore (Phillips Singapore)",
        "Form (SIMTech Methodologies and Frameworks on Digitalisation)",
        "Form (SEAC Methodologies and Frameworks on Sustainability)",
        "Implement (Beckhoff Automation Pte Ltd)",
        "Implement (InnoArk Pte Ltd)",
        "Implement (Blum-Novotest GmbH)",
        "Implement (Hexagon)",
        "Implement (Schneider Electric Singapore Pte Ltd)",
        "Implement (Singapore Contec Pte Ltd)",
        "Implement (MMC Hardmetal (Thailand) Co., Ltd.)",
        "Implement (OPEN MIND Technologies Asia Pacific Pte Ltd)",
        "Implement (Walter AG Singapore Pte. Ltd)",
        "Implement (EMUGE-FRANKEN Singapore Pte. Ltd.)",
        "Implement (SATO Asia Pacific Pte. Ltd.)"
    ]

        const inputnameElement = <HTMLInputElement>document.getElementById("name")
        const inputemailElement = <HTMLInputElement>document.getElementById("email");
        const inputnumberElement = <HTMLInputElement>document.getElementById("number");
        const inputratingElement = <HTMLInputElement>document.querySelector('input[name="rating"]:checked')
        const feedback=<HTMLTextAreaElement>document.getElementById('feedback')
        
        var array = []
        var checkboxes = document.querySelectorAll('input[name="interest"]:checked')

        interface LooseObject {
            [key: string]: any
        }


        //var interest: LooseObject ={'entry.1600343198' : inputnameElement.value,
        //'entry.1331790656' : inputemailElement.value,
        //'entry.828903347' : inputnumberElement.value,
        //'entry.168112271' : inputratingElement.value,
        //'entry.1471824904': feedback.value}
        var string_vals='{'

        //var string_vals=''
        for (var i = 0; i < checkboxes.length; i++) {
            var Element = <HTMLInputElement>checkboxes[i]
            //interest['entry.1474292905']= companies[parseInt(Element.value)]
            //interest=Object.assign({'entry.1474292905':companies[parseInt(Element.value)]},interest)
            string_vals=string_vals.concat('"entry.1474292905":')
            string_vals=string_vals.concat( '\"' + String(companies[parseInt(Element.value)])+'\"' + ',')
            array.push(Element.value)
            //array.push(companies[parseInt(Element.value)])
        }
        string_vals=string_vals.slice(0,-1)
        string_vals=string_vals.concat('}')

        //
        console.log(string_vals)

        string_vals=JSON.stringify(string_vals)
        var interest = JSON.parse(JSON.parse(string_vals))
        console.log(interest)

        interest['entry.1600343198'] = inputnameElement.value,
        interest['entry.1331790656'] = inputemailElement.value,
        interest['entry.828903347'] = inputnumberElement.value,
        interest['entry.168112271'] = inputratingElement.value,
        interest['entry.1471824904'] = feedback.value
        
        
        //console.log(interest)
        //interest['entry.1474292905']=array
        
        var body = new FormData();
        
        
        body.append('entry.1600343198', inputnameElement.value);
        
        
        body.append('entry.1331790656', inputemailElement.value);
        
       
        body.append('entry.828903347', inputnumberElement.value);
        
        
        body.append('entry.168112271', inputratingElement.value);
        
        
        body.append('entry.1471824904', feedback.value);
        
    //console.log("counting start now");
    for (let i = 0; i < array.length; i++) {
      body.append('entry.1474292905', companies[parseInt(array[i])]);
    }

    var test = JSON.stringify(Object.fromEntries(body.entries()));

    //console.log(test)

        var options ={
            url:'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkv02jQMeGMT3MaWtLPTK66Ze-VhiTXHn7RaxXuC69NbwNhg/formResponse',
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            data : interest
        }

        
        await Http.post(options).then(data => {

            console.log(data.status);
            console.log(data.data); // data received by server
            console.log(data.headers);
        
          })
          .catch(error => {
        
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        
          })

        //const response: HttpResponse<any> = await Http.post(options);
    

    };



    nfcread() {
        let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
        this.nfc.readerMode(flags).subscribe(
            tag => alert(JSON.stringify(tag)),
            err => alert('Error reading tag ' + err))
    }

    ngOnInit(): void {
        this.startNFCListener();
    }

    spin() {
        this.showspinner = true
        setTimeout(() => {
            this.showspinner = false
        }, 1000);
    }

    printvalue() {

        const inputnameElement = <HTMLInputElement>document.getElementById("name");
        console.log(inputnameElement.value)

        const inputratingElement = <HTMLInputElement>document.querySelector('input[name="rating"]:checked')
        console.log(inputratingElement.value)
        

        var array = []
        var checkboxes = document.querySelectorAll('input[name="interest"]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            var Element = <HTMLInputElement>checkboxes[i]
            array.push(Element.value)
        }

        console.log(array)
    }

    _service: QuestionsService;

    formResponse= {
        name: "DEFAULT",
        email: "DEFAULT",
        contact: "DEFAULT",
        useful: 0,
        explore: ["Co-Create (CLF Award winning papers)"],
        improve: "DEFAULT"
    };





    apicall() {
        const inputratingElement = <HTMLInputElement>document.querySelector('input[name="rating"]:checked');
        this.formResponse.useful  = parseInt(inputratingElement.value);
        //this.formResponse.useful  = 3;
        
        var array = [];
        var checkboxes = document.querySelectorAll('input[name="interest"]:checked');
        for (var i = 0; i < checkboxes.length; i++) {
            var Element = <HTMLInputElement>checkboxes[i];
            array.push(Element.value);
        }
        this.formResponse.explore = array;
    
        console.log(`formResponse: ${this.formResponse}`)
        this._service.postForm(this.formResponse);
    }

    startNFCListener() {
        this.formResponse= {
            name: "DEFAULT",
            email: "DEFAULT",
            contact: "DEFAULT",
            useful: 0,
            explore: ["Co-Create (CLF Award winning papers)"],
            improve: "DEFAULT"
        };

        this.nfc.addNdefListener().subscribe(

            tag => {
                let msg = this.nfc.bytesToString(tag.tag.ndefMessage[0].payload);

                const inputnameElement = <HTMLInputElement>document.getElementById("name");
                inputnameElement.value = msg.split('FN:')[1].split('ORG')[0];
                this.formResponse.name=inputnameElement.value;
                //this.formResponse.name="PLACEHOLDER";

                const inputemailElement = <HTMLInputElement>document.getElementById("email");
                inputemailElement.value = msg.split('EMAIL:')[1].split('ADR:')[0];
                this.formResponse.email= inputemailElement.value;
                //this.formResponse.email= "PLACEHOLDER";


                const inputnumberElement = <HTMLInputElement>document.getElementById("number");
                inputnumberElement.value = msg.split('TEL:')[1].split('END:')[0];
                this.formResponse.contact= inputnumberElement.value;
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
            err => {
                alert('Error reading tag ' + err)
            })
    }

    open: boolean = true;
    open2: boolean = false;
    open3: boolean = false;
    open4: boolean = false;
    open5: boolean = false;
    open6: boolean = false;

    radioData = 5;

    goBack(stepper: MatStepper) {
        stepper.previous();
    }

    goForward(stepper: MatStepper) {
        stepper.next();
    }

}
