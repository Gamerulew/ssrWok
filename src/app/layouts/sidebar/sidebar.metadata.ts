// Sidebar route metadata

import {Authority} from "../../shared/constants/authority.constants";

export interface RouteInfo {
  path: string;
  title: string;
  iconType: string;
  icon: string;
  class: string;
  queryParams?: object;
  Authority?: Authority[];
  groupTitle: boolean;
  submenu?: RouteInfo[];
}
