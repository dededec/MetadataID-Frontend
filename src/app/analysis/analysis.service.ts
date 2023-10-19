import { Injectable } from '@angular/core';
import { Analysis } from './analysis.model';
import { AnalysisHistoryEntry } from '../analysis-history/analysis-history-entry.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  HOST: string = `http://localhost:8080`;
  analysesHistory: Analysis[];
  historyLimit: number;

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

    if (this.historyLimit) {
      await this.fetchLatestAnalyses(this.historyLimit);
    }

    let analysis = returnData as Analysis;
    return analysis;
  }

  async fetchAnalysisById(id: number) {
    let returnData = await fetch(this.HOST + '/analisis/' + id, {
      method: "GET",
      redirect: 'follow',
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })

    return returnData as Analysis;
  }

  async fetchLatestAnalyses(historyLimit: number) {
    let returnData = await fetch(this.HOST + '/analisis?limit=' + historyLimit, {
      method: "GET",
      redirect: 'follow',
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })

    this.historyLimit = historyLimit;
    this.analysesHistory = returnData.map((data) => data as AnalysisHistoryEntry);
  }

  async deleteAnalysisById(id: number) {

    await fetch(this.HOST + '/analisis/' + id, {
      method: "DELETE",
      redirect: 'follow',
    })
      .catch((err) => {
        console.log(err);
      })

    await this.fetchLatestAnalyses(this.historyLimit);
  }
}
