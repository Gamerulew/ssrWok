// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gay: 'Mo gay kkkkkk',
  NODE_ENV: 'development',
  BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
  VERSION: `'1'`,
  DEBUG_INFO_ENABLED: true,
  SERVER_API_KEY: `'SuperSenhaDoC0dig0'`,
  SERVER_API_URL: 'https://apiteste.mundodocodigo.com.br/wokTestes/',
  SERVER_API_IMAGE_URL: 'https://apiteste.mundodocodigo.com.br/storage/',
  PORT: 8081
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
