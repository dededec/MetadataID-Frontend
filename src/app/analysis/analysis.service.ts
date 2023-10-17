import { Injectable } from '@angular/core';
import { Analysis } from './analysis';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  HOST:string = `http://localhost:8080`;

  constructor() { }

  async fetchAnalysis(url: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let returnData = await fetch(this.HOST + '/analisis', {
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

  async fetchLatestAnalyses(analysesLimit: number) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let returnData = await fetch(this.HOST + '/analisis?limit=' + analysesLimit, {
      method: "GET",
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })
    
      return returnData.map((data) => data as Analysis);
  }
}
