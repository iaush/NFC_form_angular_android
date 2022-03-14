import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  postForm(_data: any) {
    const formURL = '/forms/u/0/d/e/1FAIpQLSdkv02jQMeGMT3MaWtLPTK66Ze-VhiTXHn7RaxXuC69NbwNhg/formResponse';
    var body = new FormData();
    body.append('entry.1600343198', _data.name);
    body.append('entry.1331790656', _data.email);
    body.append('entry.828903347', _data.contact);
    body.append('entry.1471824904', _data.improve);
    console.log("counting start now");
    // for (let i = 1; i < _data.improve.Count(); i++) {
    //   body.append('entry.168112271', _data.useful[i]);
    // }

    console.log(`body: ${body}`);

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

    var headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(formURL, body).subscribe(r => {
      console.log(r);
    });

  }
}
