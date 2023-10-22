import { Injectable } from '@angular/core';
import { Analysis } from './analysis.model';
import { AnalysisHistoryEntry } from '../analysis-history/analysis-history-entry.model';
import { HeadingData } from '../graph/heading-data.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  HOST: string = `http://localhost:8080`;
  headingData: HeadingData;
  analysesHistory: Analysis[];
  historyLimit: number;

  constructor() { }

  async fetchAnalysis(url: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let analysis = null;
    await fetch(this.HOST + '/analisis', {
      method: "POST",
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({ url: url }),
    })
      .then((res) => {
        if (res.ok) {
          analysis = res.json()
        } else {
          throw new Error(res.status + " while fetching Analysis")
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })

    if (this.historyLimit) {
      await this.fetchLatestAnalyses(this.historyLimit);
    }
    await this.fetchHeadingData();

    return analysis as Analysis;
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
    await this.fetchHeadingData();
  }

  async fetchHeadingData() {
    let returnData = await fetch(this.HOST + '/analisis/headings', {
      method: "GET",
      redirect: 'follow',
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })

      this.headingData = returnData as HeadingData;
  }
}
