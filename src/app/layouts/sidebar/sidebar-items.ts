import { RouteInfo } from './sidebar.metadata';
import {Authority} from "../../shared/constants/authority.constants";

export const ROUTES: RouteInfo[] = [
  {
    path: '/account/dashboard',
    title: 'account.classroom',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-single',
    groupTitle: false,
    Authority: [Authority.USER],
    submenu: []
  },
  {
    path: '/account/submission/',
    title: 'account.my-submissions',
    iconType: 'material-icons-two-tone',
    icon: 'gavel',
    class: 'menu-single',
    groupTitle: false,
    Authority: [Authority.USER],
    submenu: []
  },
  {
    path: '/account/dashboard',
    title: 'account.my-classes',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-single',
    groupTitle: false,
    Authority: [Authority.TEACHER],
    submenu: []
  },
  {
    path: '/account/dashboard',
    queryParams: { showTrainings: true },
    title: 'account.my-contests',
    iconType: 'material-icons-two-tone',
    icon: 'sports',
    class: 'menu-single',
    groupTitle: false,
    Authority: [Authority.USER],
    submenu: []
  },
  {
    path: '/account/scoreboard/',
    title: 'account.scoreboard',
    iconType: 'material-icons-two-tone',
    icon: 'score',
    class: 'menu-single',
    groupTitle: false,
    Authority: [Authority.USER],
    submenu: []
  },
  // {
  //   path: '/account/habilidades',
  //   title: 'account.my-skills',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'star',
  //   class: 'menu-single',
  //   groupTitle: false,
  //   Authority: [Authority.USER],
  //   submenu: []
  // },
  {
    path: '/home',
    title: 'content.home',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: 'menu-single',
    groupTitle: false,
    submenu: []
  },
  // {
  //   path: '/como-funciona',
  //   title: 'content.how-works',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'code',
  //   class: 'menu-single',
  //   groupTitle: false,
  //   submenu: []
  // },
  {
    path: '/trainings',
    title: 'free-contests',
    iconType: 'material-icons-two-tone',
    icon: 'emoji_events',
    class: 'menu-single',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/disciplines',
    title: 'our-courses',
    iconType: 'material-icons-two-tone',
    icon: 'menu_book',
    class: 'menu-single',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/rankings',
    title: 'content.rankings',
    iconType: 'material-icons-two-tone',
    icon: 'star_half',
    class: 'menu-single',
    groupTitle: false,
    submenu: []
  },
  {
    title: 'content.faq.title',
    path: '/faq',
    iconType: 'material-icons-two-tone',
    icon: 'help',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/faq/users',
        title: 'content.faq.user',
        iconType: 'material-icons-two-tone',
        icon: 'help',
        class: 'menu-single',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/faq/teacher',
        title: 'content.faq.teacher',
        iconType: 'material-icons-two-tone',
        icon: 'help',
        class: 'menu-single',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/faq/university',
        title: 'content.faq.university',
        iconType: 'material-icons-two-tone',
        icon: 'help',
        class: 'menu-single',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/faq/startup',
        title: 'content.faq.startup',
        iconType: 'material-icons-two-tone',
        icon: 'help',
        class: 'menu-single',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    title: 'adminmenu.menu',
    path: '',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: 'menu-toggle',
    groupTitle: true,
    Authority: [Authority.ADMIN],
    submenu: []
  },
  {
    title: 'adminmenu.menu',
    path: '',
    iconType: 'material-icons-two-tone',
    icon: 'people_alt',
    class: 'menu-toggle',
    groupTitle: false,
    Authority: [Authority.ADMIN],
    submenu: [
      { path: '/admin/audits', title: 'adminmenu.audits', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '/admin/configuration',
        title: 'adminmenu.configuration',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      { path: '/admin/health', title: 'adminmenu.health', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/logs', title: 'adminmenu.logs', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/metrics', title: 'adminmenu.metrics', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] }
    ]
  },
  {
    title: 'basemenu.menu',
    path: '',
    iconType: 'material-icons-two-tone',
    icon: 'text_fields',
    class: 'menu-toggle',
    groupTitle: false,
    Authority: [Authority.ADMIN],
    submenu: [
      {
        path: '/admin/affiliation',
        title: 'basemenu.affiliation',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      { path: '/admin/author', title: 'basemenu.author', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '/admin/difficulty-level',
        title: 'basemenu.difficulty-level',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      { path: '/admin/faq', title: 'basemenu.faq', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/skill', title: 'basemenu.skill', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/topic', title: 'basemenu.topic', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/discipline', title: 'basemenu.discipline', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/exercise', title: 'basemenu.exercise', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/medal', title: 'basemenu.medal', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] }
    ]
  },
  {
    title: 'judgemenu.menu',
    path: '',
    iconType: 'material-icons-two-tone',
    icon: 'text_fields',
    class: 'menu-toggle',
    groupTitle: false,
    Authority: [Authority.ADMIN],
    submenu: [
      { path: '/admin/language', title: 'judgemenu.language', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '/admin/judge/configuration',
        title: 'judgemenu.configuration',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      { path: '/admin/judgehost', title: 'adminmenu.judgehosts', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '/admin/judgehost/restriction',
        title: 'adminmenu.judgehosts-restrinctions',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/internal/error',
        title: 'adminmenu.internal-error',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/executable',
        title: 'adminmenu.executable',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/rejudging',
        title: 'judgemenu.judge-rejudging',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      { path: '/admin/judging', title: 'judgemenu.judging', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '/admin/judging/tests',
        title: 'judgemenu.judging-test',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    title: 'usermenu.menu',
    path: '',
    iconType: 'material-icons-two-tone',
    icon: 'text_fields',
    class: 'menu-toggle',
    groupTitle: false,
    Authority: [Authority.ADMIN],
    submenu: [
      { path: '/admin/user', title: 'usermenu.users', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '',
        title: 'account.profile',
        iconType: 'material-icons-two-tone',
        icon: 'home',
        class: 'menu-toggle',
        groupTitle: false,
        Authority: [Authority.USER],
        submenu: [
          { path: '/account/profile', title: 'profile', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
          { path: '/account/settings', title: 'settings', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
          { path: '/account/password', title: 'password', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] }
        ]
      },
      { path: '/admin/team', title: 'usermenu.team', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/user/team', title: 'usermenu.users-team', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '/admin/temp/rankcache',
        title: 'adminmenu.temp-rankcache',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/temp/scorecache',
        title: 'adminmenu.temp-scorecache',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    title: 'wokmenu.menu',
    path: '',
    iconType: 'material-icons-two-tone',
    icon: 'text_fields',
    class: 'menu-toggle',
    groupTitle: false,
    Authority: [Authority.ADMIN],
    submenu: [
      {
        path: '/admin/registration',
        title: 'wokmenu.registration',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      { path: '/admin/module', title: 'adminmenu.module', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/reward', title: 'basemenu.reward', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/score', title: 'basemenu.score', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      { path: '/admin/course', title: 'basemenu.course', iconType: '', icon: '', class: 'ml-menu', groupTitle: false, submenu: [] },
      {
        path: '/admin/submission',
        title: 'adminmenu.submission',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/submission/file',
        title: 'adminmenu.submission-file',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/module/topic',
        title: 'adminmenu.module-topic',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/module/topic/exercise',
        title: 'adminmenu.module-topic-exercise',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/admin/module/topic/exercise/scenario',
        title: 'adminmenu.module-topic-exercise-scenario',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  }
];
