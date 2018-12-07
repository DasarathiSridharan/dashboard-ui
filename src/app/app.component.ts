import { Component, OnInit } from '@angular/core';
import {SiteService } from './services/site.service';
import SiteInfo from './models/site.models';
import {Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'Infosys Transformation Dashboard';

  constructor(
    private siteService: SiteService
  ) {}


  public newSiteInfo: SiteInfo = new SiteInfo();

  siteInfoList: SiteInfo[];
  editSites: SiteInfo[] = [];

  ngOnInit (): void {
    this.siteService.getSites()
    .subscribe (sites=> {
      this.siteInfoList = sites;
      console.log(sites);
    }); 
  }

  create(){
    this.siteService.createSite(this.newSiteInfo)
    .subscribe((res)=> {
      this.siteInfoList.push(res.body);
      console.log(res);
      console.log(this.siteInfoList);
      this.newSiteInfo = new SiteInfo;
    })
  }


editSite(site:SiteInfo) {
  console.log(site);
  if(this.siteInfoList.includes(site)){
    if(!this.editSites.includes(site)){
      this.editSites.push(site);
    } else {
      this.editSites.splice(this.editSites.indexOf(site),1)
      this.siteService.editSite(site).subscribe(res => {
        console.log('Update Sucessful');
      }, err=> {
        this.editSite(site)
        console.error('Update Failed');
      })
    }
  }
}

doneSite(site:SiteInfo) {
  console.log("Under development")
  // site.status = "Completed";
  // this.siteService.editSite(site).subscribe(res=> {
  //  console.log("Site status updated")
  //}, err => {
  //  this.editSite(site);
  // console.error('Update Failed')
  //})
}

submitSite(event, site:SiteInfo) {
  if(event.keyCode==13){
    this.editSite(site)
  }
}

deleteSite(site:SiteInfo) {
  this.siteService.deleteSite(site._id).subscribe(res=> {
    this.siteInfoList.splice(this.siteInfoList.indexOf(site),1);
  })
}

}
