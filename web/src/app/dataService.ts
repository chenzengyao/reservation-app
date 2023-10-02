import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class dataService {

  public currentEmail: string;

  getCurrentEmail()
  {
    return this.currentEmail;
  }

  setCurrentEmail(currentEmail: any)
  {
    this.currentEmail =  currentEmail;
  }

}
