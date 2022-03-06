import { Component, OnInit } from '@angular/core';

import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

import { MatStepperModule } from '@angular/material/stepper';

import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-questions',
  template: `
     <head> 
 


 <style>
 
 
 .card { 
padding: 3%; 
margin: 5% auto 40% auto; 
background-color: rgb(252, 252, 252); 
border-radius: 5px; 
border: 1px solid; 
text-align: center; 
max-width: 80% ; 
max height: 50%;
font-family: Arial, Helvetica, sans-serif ; 
display:none 
} 

.group{ 
display: block; 
margin : 10px 5px; 
} 

button { 
background-color: #4CAF50;  
border: none; 
color: white; 
padding: 8px 15px; 
text-align: center; 
text-decoration: none; 
display: inline-block; 
font-size: 16px; 
margin: 0px 5px; 
width: 100px
} 


button:hover{ 
background-color: #b97316; 
transition-duration: 0.5s; 
} 

input { 
padding: 10px; 
width: 90%; 
font-size: 17px; 
border: 1px solid #aaaaaa; 
margin: 10px auto; 
} 

label{
width: 90%; 
font-size: 20px; 
text-align: left; 
display:inline-block
}

.spinpop{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
}

.highlight{
    background-color: greenyellow;
}

.kill-highlight{
    background-color: white;
    -webkit-transition: background-color 300ms linear;
    -ms-transition: background-color 300ms linear;
    transition: background-color 300ms linear;
}


.card.active{ 
display:block; 
animation: slide 500ms ease-in-out forwards; 
} 

@keyframes slide{ 
0%{ 
transform: translateX(200%); 
opacity: 0; 
} 

200%{ 
transform: translateX(0%); 
opacity: 1; 
} 

.progress_bar{
    padding: 3%; 
    margin: 10% 0% auto;
    max-width: 50% ; 
}


} 


 </style> 
 
</head> 

<body> 
 <form > 
    <div class='spinpop' id='spin' *ngIf="showspinner">
        <ion-spinner type='bubbles' color='danger'></ion-spinner>
    </div>

    <h1 style='text-align: center; margin: 20% auto 10% auto'> Some words to descibe </h1>

    <div class='progress_bar'>
        <mat-horizontal-stepper #stepper labelPosition="bottom" >
            <mat-step label='Particulars' ></mat-step>
            <mat-step label='Feedback' ></mat-step>
            <mat-step label='Submit' ></mat-step>
        </mat-horizontal-stepper>
    </div> 

     <div class="card active" id="card1" [ngClass]="{'active': open}"> 
         <div class="group"> 
             <label> Name </label>
             <input type="text" name="name" id="name" placeholder="Name" value='' > 
         </div> 
         <div class="group"> 
             <label> Email </label>
             <input type="email" name="email" id="email" placeholder="Email" value='' > 
         </div> 
         <button type='button' id="next_btn" (click)="goForward(stepper);open = !open; open2=!open2"> Next </button> 
         <!--<button type='button'  (click)="testblink()"> Test </button>-->
     </div>  

     <div class="card" id="card2" [ngClass]="{'active': open2}"> 
         <div class="group"> 
            <label> Username </label>
             <input type='text' name="Username" id="Username" placeholder="Username"  > 
         </div> 
         <div class="group">
            <label> Password </label> 
             <input type="password" name="password" id="password" placeholder="Password" > 
         </div> 
         <div class="group"> 
            <label> Feedback </label>
           <textarea style="width: 90%; margin-left: auto; margin-right: auto;"name="feedback" cols="45" rows="5" placeholder="Feedback here"></textarea> 
         </div> 
         <button type='button' id="previous" (click)="goBack(stepper);open2 = !open2; open = !open"> Previous </button> 
         <button type='button'  (click)="goForward(stepper);open2 = !open2; open3 =! open3"> Next </button> 
        </div>
        

        <div class="card" id="card3" [ngClass]="{'active': open3}">
             
            <h1 style='text-align: center; margin: 20% auto 10% auto'> Some words to end </h1>
            <button type='button' id="previous" (click)="goBack(stepper);open3 = !open3; open2 = !open2"> Previous </button> 
            <button id="submit" style='background-color:red' > Submit </button>
        </div>
 </form> 

</body> 
  `,
  styles: [

    

  ]
})
export class QuestionsComponent implements OnInit {

    showspinner = false

    constructor(private nfc: NFC, private ndef: Ndef) { }

    nfcread(){
        let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
        this.nfc.readerMode(flags).subscribe(
           tag => alert(JSON.stringify(tag)),
          err => alert('Error reading tag '+ err))
    }  

    ngOnInit(): void {
        this.startNFCListener()
    }

    spin(){
        this.showspinner=true
        setTimeout(() => {
            this.showspinner=false
        }, 1000);
    }

    testblink(){
        const inputnameElement = <HTMLInputElement> document.getElementById("name")
        
        const inputemailElement = <HTMLInputElement> document.getElementById("email")
        
        
        inputemailElement.classList.add('highlight')
        inputnameElement.classList.add('highlight')

        setTimeout(() => {
        inputemailElement.classList.add('kill-highlight')
        inputnameElement.classList.add('kill-highlight')
        }, 100);
        
        setTimeout(() => {
            inputemailElement.classList.remove('highlight')
            inputnameElement.classList.remove('highlight')
            inputemailElement.classList.remove('kill-highlight')
            inputnameElement.classList.remove('kill-highlight')
            }, 700);
    
    }

    startNFCListener() {

        this.nfc.addNdefListener().subscribe(
            tag => 
            { 
            

                let msg= this.nfc.bytesToString(tag.tag.ndefMessage[0].payload)
                
                const inputnameElement = <HTMLInputElement> document.getElementById("name")
                inputnameElement.value= msg.split('FN:')[1].split('ORG')[0]
                
            
                const inputemailElement = <HTMLInputElement> document.getElementById("email")
                inputemailElement.value= msg.split('EMAIL:')[1].split('ADR:')[0]
                
                
                inputemailElement.classList.add('highlight')
                inputnameElement.classList.add('highlight')
                
                setTimeout(() => {
                inputemailElement.classList.add('kill-highlight')
                inputnameElement.classList.add('kill-highlight')
                }, 100);
                
                setTimeout(() => {
                inputemailElement.classList.remove('highlight')
                inputnameElement.classList.remove('highlight')
                inputemailElement.classList.remove('kill-highlight')
                inputnameElement.classList.remove('kill-highlight')
                }, 700);





                //alert(msg)
            },
            err =>
            
            {
                alert('Error reading tag '+ err)})
      }
    


  open: boolean = true;
  open2: boolean = false;
  open3: boolean = false;

    goBack(stepper: MatStepper){
    stepper.previous();
    }

    goForward(stepper: MatStepper){
    stepper.next();
    }

}
