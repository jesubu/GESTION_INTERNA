import { Component, OnInit,DoCheck } from '@angular/core';
import { TranslateService } from './translate';
import { UserService } from "app/services/user.service";
import { UploadService } from "app/services/upload.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService,UploadService]
})
/*export class AppComponent {
  title = 'Gestión Interna';
}
*/
export class AppComponent implements OnInit,DoCheck {
  
    public identity;
    public url:string;
    
    public translatedText: string;
    public supportedLanguages: any[];
    public supportedLangs:any[];
    constructor(private _translate: TranslateService,public _userService:UserService,  public _uploadService:UploadService,    private _route: ActivatedRoute,
      private _router: Router) {
        this.url='http://localhost:3678/api/';
       }

    ngDoCheck(){
      this.identity=this._userService.getIdentity();
      //console.log(this.identity.image);
      if (this.identity.image=="" || this.identity.image==null){
        this.identity.image="0eSOeXRyYel0oVMP33rCSzJQ.png";
      }
      //this.identity.image=this.url+'uploads/users/'+ this.identity.image;
      
    }

    ngOnInit() {
      // standing data
      this.supportedLangs = [
        { display: 'English', value: 'en' },
        { display: 'Español', value: 'es' }
      ];
      
      this.selectLang('es');
      this.identity=this._userService.getIdentity();
      console.log(this.identity);
    }
    
    isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }
    
    selectLang(lang: string) {
      // set default;
      this._translate.use(lang);
      this.refreshText();
    }
    
    refreshText() {
      this.translatedText = this._translate.instant('hello world');
    }

    logout(){
      localStorage.clear();
      this.identity=null;
      this._router.navigate(['/']);
    }

    public filesToUpload:Array<File>;
    fileChangeEvent(fileInput:any){
      
      debugger;
      var user=this.identity;
      var token= localStorage.getItem("token");
    
      this.filesToUpload=<Array<File>>fileInput.target.files;
      this._uploadService.makeFileRequest(this.url+'upload-image-user/'+user._id,[],this.filesToUpload,token,'image')
      .then((result:any)=>{
        user.image=result.image;
        localStorage.setItem('identity',JSON.stringify(user));
      });

    }



}