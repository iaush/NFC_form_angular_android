import { QuestionsService } from './questions.service';
import { Component, OnInit } from '@angular/core';

import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

import { MatStepper } from '@angular/material/stepper';

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

        const inputratingElement = <HTMLInputElement>document.querySelector('input[name="rating"]:checked')
        console.log(inputratingElement.value)
        /*console.log(this.radioData)*/

        var array = []
        var checkboxes = document.querySelectorAll('input[name="interest"]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            var Element = <HTMLInputElement>checkboxes[i]
            array.push(Element.value)
        }

        console.log(array)
    }

    _service: QuestionsService;

    formResponse: any = {
        name: "",
        email: "",
        contact: "",
        useful: {},
        improve: 1

    };
    formResponseEmpty: any = {
        name: "",
        email: "",
        contact: "",
        useful: {},
        improve: 1

    };
    companies = ["", "Co-Create (CLF Award winning papers)",
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




    apicall() {
        const inputratingElement = <HTMLInputElement>document.querySelector('input[name="rating"]:checked');
        this.formResponse.useful =inputratingElement.value;
        
        var array = [];
        var checkboxes = document.querySelectorAll('input[name="interest"]:checked');

        for (var i = 0; i < checkboxes.length; i++) {
            var Element = <HTMLInputElement>checkboxes[i];
            array.push(Element.value);
        }
        this.formResponse.useful = array;
        //     this.formResponse.append('contact', inputnumberElement.value);
    
        console.log(`formResponse: ${this.formResponse}`)
        this._service.postForm(this.formResponse);
    }

    startNFCListener() {
        this.formResponse = {};

        this.nfc.addNdefListener().subscribe(
            tag => {


                let msg = this.nfc.bytesToString(tag.tag.ndefMessage[0].payload);

                const inputnameElement = <HTMLInputElement>document.getElementById("name");
                inputnameElement.value = msg.split('FN:')[1].split('ORG')[0];
                this.formResponse.name=inputnameElement.value;

                const inputemailElement = <HTMLInputElement>document.getElementById("email");
                inputemailElement.value = msg.split('EMAIL:')[1].split('ADR:')[0];
                this.formResponse.email= inputemailElement.value


                const inputnumberElement = <HTMLInputElement>document.getElementById("number");
                inputnumberElement.value = msg.split('TEL:')[1].split('END:')[0];
                this.formResponse.contact= inputnumberElement.value;


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
