import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  urlSegments: Array<{
    label: string, route: string
  }> = [];
  constructor(private router:Router){
    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd)
    ).subscribe((value: NavigationEnd) => {
      const segmentStack: Array<string> = [];
      this.urlSegments = _(value.urlAfterRedirects).split("/").filter((segment) => segment!=="").map((segment) => {
        segmentStack.push(segment);
        const segmentRoute = `/${segmentStack.join("/")}`;
        const segmentLabel = segment.split("-").map((subSegment) => _.startCase(subSegment)).join(" ");
        return {
          route: segmentRoute, 
          label: segmentLabel
        }
      }).value();
    })
  }
}
