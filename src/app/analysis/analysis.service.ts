import { Injectable } from '@angular/core';
import { Analysis } from './analysis';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  HOST:string = `http://localhost:8080/analisis`;

  constructor() { }

  async fetchAnalysis(url: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let returnData = await fetch(this.HOST, {
      method: "POST",
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({ url: url }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })
    
      return returnData as Analysis;
  }
}
