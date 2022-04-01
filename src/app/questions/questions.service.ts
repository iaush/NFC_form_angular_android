import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class QuestionsService {



  constructor(private http: HttpClient) { }

  postForm(_data: any, origin: any) {

    var companies = [
        "Automation Assessment and Adoption(AAA)", //0
        "Digital Transformation and Innovation Program (DTI)", //1
        "Implement (Beckhoff Automation Pte Ltd)", //2
        "Implement (InnoArk Pte Ltd)", //3
        "Implement (Blum-Novotest GmbH)", //4
        "Implement (Hexagon)", //5
        "Implement (Schneider Electric Singapore Pte Ltd)", //6 
        "Implement (Singapore Contec Pte Ltd)", //7 
        "Implement (MMC Hardmetal (Thailand) Co., Ltd.)", //8
        "Implement (OPEN MIND Technologies Asia Pacific Pte Ltd)", //9
        "Implement (Walter AG Singapore Pte. Ltd)", //10
        "Implement (EMUGE-FRANKEN Singapore Pte. Ltd.)", //11
        "Implement (SATO Asia Pacific Pte. Ltd.)", //12
        "Hurco (S E Asia) Pte Ltd", //13
        "Makino Milling Machine Co. Ltd.", //14
        "Energy Efficiency Monitoring and Analysis System", //15
        "Green Compass (GC)", //16
        "Life Cycle Assessment (LCA) & Life Cycle Costing (LCC)", //17
        "Operation & Technology Roadmap (OTR) Methodology", //18
        "Resource Efficiency Monitoring and Analysis Platform (REMAP)", //19
        "Smart Industry Readiness Index (SIRI) Framework", //20
        "Smart System", //21
    ]

    var formURL = '/forms/u/0/d/e/1FAIpQLSdkv02jQMeGMT3MaWtLPTK66Ze-VhiTXHn7RaxXuC69NbwNhg/formResponse';
    var body = new FormData();


    
    body.append('entry.1600343198', _data.name);
    body.append('entry.1331790656', _data.email);
    body.append('entry.828903347', _data.contact);
    body.append('entry.168112271', _data.useful);

    body.append('entry.1471824904', _data.improve);

    //console.log(`_data.name: ${_data.name}`);
    //console.log("counting start now");
    for (let i = 0; i < _data.explore.length; i++) {
      body.append('entry.1474292905', companies[parseInt(_data.explore[i])]);
      //console.log(_data.explore[i])
      //body.append('entry.1474292905', _data.explore[i]);
    }

    //console.log(`body: ${body}`);

    // body.append('entry.792628995',_data.name);
    // body.append('entry.545015490',_data.email);
    // body.append('entry.709332590',_data.organisation);
    // body.append('entry.624561954',_data.comments);
    // // body.append('entry.1138544440',_data.dropDown.value);
    // // for(var i =0; i< _data.checkOptions.Cou
    // body.append('entry.1579796660',_data.checkOptions[0]);
    // body.append('entry.1579796660',_data.checkOptions[1]);
    // // body.append('entry.1579796660','CB2');
    // body.append('entry.838620520',_data.slider);
    // body.append('entry.786740738',_data.multipleChoice);

    var headers1 = new HttpHeaders({'Content-Type': 'application/json'});

    var httpOptions = {
      headers2: new HttpHeaders({
          'Accept': 'text/html',
          'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };

    const options = {
      responseType: 'text' as const,
    };

    

    this.http.post(formURL, body, options).subscribe(r => {


      if (_data.email_exist == false){
        Swal.fire({
          html:
            '</p> NAME : ' + String(_data.name) + '<br>' + 'EMAIL : ' +
            String(_data.email) +'<br>' +
            '<h2>Thank you for your response! Please retain this pop-up and approach our staff to collect your free mask</h2></p>',
          title: 'Submission recorded',
          allowOutsideClick: false,
          icon: 'success',
        })
        origin.open = !origin.open;
        origin.open5 = !origin.open;
        origin.showspinner=false
      }
        else {
            Swal.fire({
                html:
                  '</p> NAME : ' + String(_data.name) + '<br>' + 'EMAIL : ' +
                  String(_data.email) +'<br>' +
                  '<h2>Thank you again for your response! This response will overwrite your previous response</h2></p>',
                title: 'Submission recorded',
                allowOutsideClick: false,
                icon: 'warning'
              })
              origin.showspinner=false
              origin.open = !origin.open;
              origin.open5 = !origin.open;
            }
    },
      e=>{

        if (_data.email_exist == false){
          Swal.fire({
            html:
              '</p> NAME : ' + String(_data.name) + '<br>' + 'EMAIL : ' +
              String(_data.email) +'<br>' +
              '<h2>Please collect .....</h2></p>',
              title: 'Form error',
              allowOutsideClick: false,
              icon: 'error'
          })
          origin.showspinner=false
          origin.open = !origin.open;
        origin.open5 = !origin.open;
        }
          else {
              Swal.fire({
                  html:
                    '</p> NAME : ' + String(_data.name) + '<br>' + 'EMAIL : ' +
                    String(_data.email) +'<br>' +
                    '<h2>User already recorded. Thank you!</h2></p>',
                    title: 'Form error',
                    allowOutsideClick: false,
                    icon: 'error'
                })
                origin.showspinner=false
                origin.open = !origin.open;
              origin.open5 = !origin.open;
              }

        //console.log(e)
      }

    );



    var formURL2 = '/forms/d/e/1FAIpQLSeaQBxI5CdzTkRnUARfmS02ByQywaCuYoFWtslUhpJbc7YUNg/formResponse';
    var body2 = new FormData();
    
    body2.append('entry.2070480692', _data.name);
    body2.append('entry.1485450992_hour', _data.date_hour);
    body2.append('entry.1485450992_minute', _data.date_min);
    body2.append('entry.1331402498_year', _data.date_year);
    body2.append('entry.1331402498_month', _data.date_month+1);
    body2.append('entry.1331402498_day', _data.date_day);
    body2.append('entry.1684285223', "Feedback Form");

    this.http.post(formURL2, body2, options).subscribe(r => {

      console.log('Date logging sent')
      console.log(_data.date)
    },
      e=>{
        console.log('Time logging error')
        console.log(e)
      }
    );



  }
}
