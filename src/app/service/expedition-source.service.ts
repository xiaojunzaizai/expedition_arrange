import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpeditionInfo, ExpeditionQuest } from '../interface/interfaceManagement';


@Injectable({
  providedIn: 'root'
})
export class ExpeditionSourceService {

  constructor(private http: HttpClient) { }

  loadQuestData(): Observable<ExpeditionQuest[]> {
    return this.http.get<ExpeditionQuest[]>('/assets/expedition_quest.json');
  }

  loadExpeditionData(): Observable<ExpeditionInfo[]> {
    return this.http.get<ExpeditionInfo[]>('/assets/expedition.json');
  }
}
