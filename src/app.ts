import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {

  private router: Router;

  public configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
   
    config.map([
      {
        route: ['', 'redux-store-example'],
        name: 'redux-store-example',
        moduleId: PLATFORM.moduleName('./routes/redux-store-example/redux-store-example'),
        nav: true,
        title: 'Redux Store Example'
      },
      // {
      //   route: ['aurelia-store-example'],
      //   name: 'aurelia-store-example',
      //   moduleId: PLATFORM.moduleName('./routes/aurelia-store-example/aurelia-store-example'),
      //   nav: true,
      //   title: 'Aurelia Store Example'
      // }
    ]);
	}
}
