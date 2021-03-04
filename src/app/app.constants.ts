// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

import {environment} from "../environments/environment";

export const VERSION = environment.VERSION;
export const DEBUG_INFO_ENABLED = Boolean(environment.DEBUG_INFO_ENABLED);
export const SERVER_API_URL = environment.SERVER_API_URL;
export const SERVER_API_KEY = environment.SERVER_API_KEY;
export const SERVER_API_IMAGE_URL = environment.SERVER_API_IMAGE_URL;
export const BUILD_TIMESTAMP = environment.BUILD_TIMESTAMP;
