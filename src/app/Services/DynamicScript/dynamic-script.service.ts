import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}
// "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
//               "node_modules/jquery/dist/jquery.min.js",
//               "node_modules/apexcharts/dist/apexcharts.min.js",

//               "src/assets/libs/simplebar/dist/simplebar.min.js",
//               "src/assets/js/app.min.js",
//               "src/assets/js/dashboard.js",
//               "src/assets/js/sidebarmenu.js"
export const ScriptStore: Scripts[] = [
  { name: 'bootstrap', src: '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js' },
  // { name: 'bootstrap', src: '../../../../' },
  { name: 'jquery', src: '../../../../node_modules/jquery/dist/jquery.min.js' },
  { name: 'apexcharts', src: '../../../../node_modules/apexcharts/dist/apexcharts.min.js' },
  { name: 'simplebar', src: 'src/assets/libs/simplebar/dist/simplebar.min.js' },
  { name: 'app', src: 'src/assets/js/app.min.js' },
  { name: 'dashboard', src: 'src/assets/js/dashboard.js' },
  { name: 'sidebarmenu', src: 'src/assets/js/sidebarmenu.js' },
];

declare var document: any
@Injectable({
  providedIn: 'root'
})
export class DynamicScriptService {
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: true,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
