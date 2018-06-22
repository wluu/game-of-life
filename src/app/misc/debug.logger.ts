import { environment } from '../../environments/environment';

export const debug = {
  log: (...s: any[]) => {}
};

/*
  need to call the debug property this way because if we use dot notation, typescript will think it's an error.
  but, angular knows how to switch to environment.debug.ts: https://github.com/angular/angular-cli/wiki/stories-application-environments
*/
if (environment['debug']) {
  debug.log = console.log;
}
