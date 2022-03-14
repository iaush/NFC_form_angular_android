import { Component, OnInit } from '@angular/core';

import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

import { MatStepperModule } from '@angular/material/stepper';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatStepper } from '@angular/material/stepper';





@Component({
  selector: 'app-questions',
  template: `
     <head> 
 


 <style>
 
 
 .card { 
padding: 3%; 
margin: 12vh auto 8vh auto; 
/*background-color: rgb(252, 252, 252);
border-radius: 5px; 
border: 1px solid;*/ 
text-align: center; 
max-width: 80% ; 
max height: 80%;
font-family: Arial, Helvetica, sans-serif ; 
display:none 
} 

.group{ 
display: block; 
margin : 10px 5px; 
} 

button { 
background-color: #06BACC;  
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

input[type=text], input[type=email] { 
padding: 3vw; 
width: 90%; 
font-size: 4vw; 
border: 1px solid #aaaaaa; 
margin: 10px auto; 
} 

input[type="radio"] {
  margin-top: -1px;
  vertical-align: middle;
}

input[name="interest"] {
  margin-top: -1px;
  vertical-align: middle;
}



label{
width: 90%; 
font-size: 3vw; 
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


.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar label {
    display: inline-block;
    background-color: darkslategrey;
    padding: 0.5vw 1vw;
    font-family: sans-serif, Arial;
    font-size: 4vh;
    margin: 0 auto 2vh auto;
    border: 3px solid #444;
    border-radius: 4px;
}

.radio-toolbar input[type="radio"]:checked + label {
    background-color:#06BACC;
    border-color: #4c4;
}

.progress_bar{
    padding: 3%; 
    margin: 10% 0% auto;
    max-width: 50% ; 
}
ul{

text-align: left;
list-style-type: none;
margin: 3vh -6vw 3vh -6vw; /* To remove default bottom margin */ 
padding: 0; /* To remove default left padding */
}

.checkbox{
color:white;
font-size: 2.5vw;
text-align: left;
vertical-align: middle;
}

li{
    display: block
}

#submit{ 
border: none; 
color: white; 
padding: 8px 15px; 
text-align: center; 
display: inline-block; 
font-size: 16px; 
margin: 0px 5px; 
width: 100px;
border-radius: 6vw; 
height: 20%; 
width:50%; 
padding:3vw ;
font-size: 6vw; 
font-weight: bold
}

input[type="checkbox"] {
	appearance: none;
	width: 2.5vw;
	height: 2.5vw;
	border: 2px solid white;
	background-clip: content-box;
    vertical-align: middle;
    margin-right: 1vw;
}

input[type="checkbox"]:checked {
	background-color: greenyellow;
}


textarea {
  overflow: auto;
  font-size:3vw; 
  width: 100%; 
  margin: auto; 
  background-color:#dddddd; 
  color: black; 
  padding: 1em; 
  border: 2px solid transparent; 
  font-family: sans-serif; 
  border-radius: 2vw;
  outline: none; 
  transition: all 0.2s
}

textarea:focus{
cursor:text;
color: black;
background-color: white;
border-color: #333333;

}

.checkbox_header{
color:white;
font-size: 3vw;
text-align: left;
padding 3px 3px;
vertical-align: middle;
margin 2vh 0; 
display: inline-block; 
font-weight:bold;
border-radius: 10px;
border: 0.5vw solid skyblue;
padding : 0.5vw 1vw;
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








} 


 </style> 
 <meta name="viewport" content="width=device-width, initial-scale=1">
</head> 

<body style="background-image: url('assets/R2_Background.png'); background-size:cover" > 
 <form > 
    <!--<div class='spinpop' id='spin' *ngIf="showspinner">
        <ion-spinner type='bubbles' color='danger'></ion-spinner>
    </div>

    <h1 style='text-align: center; margin: 20% auto 10% auto'> Some words to descibe </h1>

    <div class='progress_bar'>
        <mat-horizontal-stepper #stepper labelPosition="bottom" >
            <mat-step label='Particulars' ></mat-step>
            <mat-step label='Feedback' ></mat-step>
            <mat-step label='Submit' ></mat-step>
        </mat-horizontal-stepper>
    </div> -->
    
     <div class="card active" style ='font-weight: bold'id="card1" [ngClass]="{'active': open}"> 
     <h1 style='text-align: center; margin: 8vh auto 4vh auto; color: white'> Logo placeholder </h1>

     <p style='text-align: center; margin: 2vh auto 0 auto;font-size: 8vw; color:#2096BA '> <span style='color:white'>CLF</span> x <span style='color:white'>MPTC</span> 2022</p>
     <p style='text-align: center; margin: 0 auto ; font-size: 8vw; color:#2096BA  '> EXHIBITION </p>
     <p style='text-align: center;  margin: 0 auto 8vh auto;font-size: 8vw; color:#2096BA  '> FEEDBACK FORM </p>

         <button type='button' 
         style='border-radius: 6vw; height: 20%; width:50%; padding:3vw ;font-size: 6vw; font-weight: bold'
         id="next_btn" (click)="open = !open; open2=!open2"> BEGIN </button> 
         <!--<button type='button'  (click)="testblink()"> Test </button>-->
     </div>  



    
     <div class="card active" style='background-color: rgb(252, 252, 252); border-radius: 1vw;  border: 1px solid' id="card1" [ngClass]="{'active': open2}"> 
         
        <div class="group" style='margin: 4vw auto'> 
             <label> Your Name </label>
             <input type="text" name="name" id="name" placeholder="Name" value='' > 
         </div> 
         <div class="group" style='margin: 4vw auto' > 
             <label> Your Email </label>
             <input type="email" name="email" id="email" placeholder="Email" value='' > 
         </div> 
         <div class="group" style='margin: 4vw auto'> 
             <label> Contact Number </label>
             <input type="text" name="number" id="number" placeholder="Number" value='' > 
         </div> 
         <div class="group" style='text-align:left; margin: 0 4vw 8vw 4vw' size="large"> 
             <mat-slide-toggle>
                 <span style='font-size: 2vw'>I agree and consent to share my personal data with SIMTech, A*STAR</span>
                </mat-slide-toggle>
         </div> 

         <button type='button' style='height: 20%; width:50%; padding:3vw ;font-size: 6vw; font-weight: bold; border-radius:1vw' 
         id="next_btn" (click)="open2 = !open2; open3=!open3"> NEXT </button> 
         <!--<button type='button'  (click)="testblink()"> Test </button>-->
     </div>  

    <div class="card" id="card3" [ngClass]="{'active': open3}"> 
        <p style='text-align: center; margin: 0 auto 4vh auto ; font-size: 5vw; color:white  '> How useful is the exhibition? </p>
        <div id="rating" class="radio-toolbar" >

            <input type="radio" id='r5' name="rating" value=5 checked> 
            <label for ='r5'style='color:white; text-align: Left;font-size: 6vw; margin: 2vw; padding: 2vw'> 5 - Excellent</label>

            <input type="radio" id='r4' name="rating" value=4 > 
            <label for ='r4'style='color:white; text-align: Left;font-size: 6vw; margin: 2vw; padding: 2vw'> 4 - Very Good</label>

            <input type="radio" id='r3' name="rating" value=3 > 
            <label for ='r3'style='color:white; text-align: Left;font-size: 6vw; margin: 2vw; padding: 2vw'> 3 - Good</label>

            <input type="radio" id='r2' name="rating" value=2 > 
            <label for ='r2'style='color:white; text-align: Left;font-size: 6vw; margin: 2vw; padding: 2vw'> 2 - Fair</label>

            <input  type="radio" id='r1' name="rating" value=1 > 
            <label for ='r1'style='color:white; text-align: Left;font-size: 6vw; margin: 2vw; padding: 2vw'> 1 - Poor</label>
            
        </div>
        
         <button type='button' style='height: 20%; margin:4vh 0 0 0; width:50%; padding:3vw ;font-size: 6vw; font-weight: bold; border-radius:1vw' 
         id="next_btn" (click)="printvalue();open4 = !open4; open3=!open3"> NEXT </button> 
        </div>
        

        <div class="card" style='margin: 4vh auto 4vh auto; ' id="card4" [ngClass]="{'active': open4}" >
            <p style='text-align: center; margin: 1vh -5vw 0 -5vw ; font-size: 4vw; color:white'>
            Which areas of the exhibition would you like to explore further? We will be connecting you with specialist from that field via email</p>
             
            <ul class='container'>
                <div style='display: block; margin:0.5vh 0'><span class='checkbox_header'>Co-Create</span></div>
                <li><input type='checkbox' name='interest' value=1 ><span class='checkbox'>Co-Create (CLF Award winning papers)</span></li>
                <li><input type='checkbox' name='interest' value=2><span class='checkbox'>Co-Create (SIMTech's Research Highlights)</span></li>
                
                <div style='display: block; margin:0.5vh 0'><span class='checkbox_header'>Explore</span></div>
                <li><input type='checkbox' name='interest' value=3><span class='checkbox'>Explore (Fong's Engineering and Manufacturing Pte Ltd)</span></li>
                <li><input type='checkbox' name='interest' value=4><span class='checkbox'>Explore (Phillips Singapore)</span></li>
                
                <div style='display: block; margin:0.5vh 0'><span class='checkbox_header'>Form</span></div>
                <li><input type='checkbox' name='interest' value=5><span class='checkbox'>Form (SIMTech Methodologies and Frameworks on Digitalisation)</span></li>
                <li><input type='checkbox' name='interest' value=6><span class='checkbox'>Form (SEAC Methodologies and Frameworks on Sustainability)</span></li>
                
                <div style='display: block; margin:0.5vh 0'><span class='checkbox_header'>Implement</span></div>
                <li><input type='checkbox' name='interest' value=7><span class='checkbox'>Implement (Beckhoff Automation Pte Ltd)</span></li>
                <li><input type='checkbox' name='interest' value=8><span class='checkbox'>Implement (InnoArk Pte Ltd)</span></li>
                <li><input type='checkbox' name='interest' value=9><span class='checkbox'>Implement (Blum-Novotest GmbH)</span></li>
                <li><input type='checkbox' name='interest' value=10><span class='checkbox'>Implement (Hexagon)</span></li>
                <li><input type='checkbox' name='interest' value=11><span class='checkbox'>Implement (Schneider Electric Singapore Pte Ltd)</span></li>
                <li><input type='checkbox' name='interest' value=12><span class='checkbox'>Implement (Singapore Contec Pte Ltd)</span></li>
                <li><input type='checkbox' name='interest' value=13><span class='checkbox'>Implement (MMC Hardmetal (Thailand) Co., Ltd.)</span></li>
                <li><input type='checkbox' name='interest' value=14><span class='checkbox'>Implement (OPEN MIND Technologies Asia Pacific Pte Ltd)</span></li>
                <li><input type='checkbox' name='interest' value=15><span class='checkbox'>Implement (Walter AG Singapore Pte. Ltd)</span></li>
                <li><input type='checkbox' name='interest' value=16><span class='checkbox'>Implement (EMUGE-FRANKEN Singapore Pte. Ltd.)</span></li>
                <li><input type='checkbox' name='interest' value=17><span class='checkbox'>Implement (SATO Asia Pacific Pte. Ltd.)</span></li>

            </ul>
            
            <div class="group" style='text-align:left; margin: 2vw -4vw 6vw -4vw'> 
             <mat-slide-toggle size="large">
                 <span style='font-size: 2vw; color: white'>By submitting this form, you agree and consent to your personal data which you
                provided being shared with the companies you have expressed your interest in</span>
                </mat-slide-toggle>
            </div> 

            <button type='button' style='height: 20%; width:50%; padding:2vw ; margin:0.5vh 0;font-size: 4vw; font-weight: bold; border-radius:1vw' 
            id="next_btn" (click)="printvalue();open4 = !open4; open5=!open5"> NEXT </button> 
            
        </div>



        <div class="card" id="card5" [ngClass]="{'active': open5}"> 
            <p style='text-align: center; margin: 4vh auto ; font-size: 5vw; color:white  '> Do you have any feedback?</p>
            <div class="group"> 
                <textarea name="feedback" cols="45" rows="5" 
                 placeholder="Feedback here"></textarea> 
            </div>
            <button id="submit" style='background-color:red;margin: 8vh 0'  >SUBMIT</button>
        
        </div>


 </form> 

</body> 
  `,
  styles: [

    

  ]
})
export class QuestionsComponent implements OnInit {

    showspinner = false
    
    constructor(private nfc: NFC, private ndef: Ndef) {
     }

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

    printvalue(){
        
        const inputratingElement = <HTMLInputElement> document.querySelector('input[name="rating"]:checked')
        console.log(inputratingElement.value)
        /*console.log(this.radioData)*/

        var array = []
        var checkboxes = document.querySelectorAll('input[name="interest"]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
        var Element = <HTMLInputElement> checkboxes[i]
        array.push(Element.value)
        }
         
        console.log(array)


            
    
    }

    apicall(){

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
                
                const inputnumberElement = <HTMLInputElement> document.getElementById("number")
                inputnumberElement.value= msg.split('TEL:')[1].split('END:')[0]
                
                inputemailElement.classList.add('highlight')
                inputnameElement.classList.add('highlight')
                inputnumberElement.classList.add('highlight')

                setTimeout(() => {
                inputemailElement.classList.add('kill-highlight')
                inputnameElement.classList.add('kill-highlight')
                inputnumberElement.classList.add('kill-highlight')
                }, 100);
                
                setTimeout(() => {
                inputemailElement.classList.remove('highlight')
                inputnameElement.classList.remove('highlight')
                inputnumberElement.classList.remove('highlight')

                inputemailElement.classList.remove('kill-highlight')
                inputnameElement.classList.remove('kill-highlight')
                inputnumberElement.classList.remove('kill-highlight')

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
  open4: boolean = false;
  open5: boolean = false;
  open6: boolean = false;
  
  radioData = 5;

    goBack(stepper: MatStepper){
    stepper.previous();
    }

    goForward(stepper: MatStepper){
    stepper.next();
    }

}
