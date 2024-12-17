import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';


console.log('Main.ts: Application is starting');


bootstrapApplication(AppComponent, appConfig).catch((err) => 
  console.log(err)
  
);
