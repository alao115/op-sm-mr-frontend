/* eslint-disable no-unused-vars */
import { lazy } from "react";

//Lazy loading and code splitting
//apps

const Notes = lazy(() => import("../views/notes/Notes"));
//dashboards

/* Our components */
const tractorsHS = lazy(() => import('../views/machines/tractorsHS'))
const listTractors = lazy(() => import("../views/machines/tractors/tractorsList"))
const listTractorsByATDA = lazy(() => import("../views/machines/tractorsByATDA"))
const NewTractors = lazy(() => import("../views/machines/addNew"))
const NewVidanges = lazy(() => import("../views/vidange/addNew"))
const EntretienDus = lazy(() => import("../views/vidange/entretienDus"))
const Logs = lazy(() => import("../views/crons/logs"))
const ReportStats = lazy(() => import("../views/reports/ReportStats"))
const Reports = lazy(() => import("../views/reports/Reports"))
const newFailure = lazy(() => import("../views/vidange/newFailure.js"))
const listFailure = lazy(() => import("../views/vidange/listFailure.js"))
const newIntervention = lazy(() => import("../views/vidange/newIntervention.js"))
const listeinterventions = lazy(() => import("../views/vidange/listInterventions.js"))
const listMaintenances = lazy(() => import("../views/vidange/listMaintenance.js"))
const listUsers = lazy(() => import("../views/users/listUsers.js"))


/* Our components */


var ThemeRoutes = [
  {
    navlabel: true,
    name: "Menus",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    collapse: false,
    path: "/dashboards",
    name: "Dashboards",
    state: "dashboardpages",
    icon: "home",
    child: [
      
    ],
  },
  {
    collapse: true,
    path: "/tracteurs",
    name: "Tracteurs",
    state: "tracteurs",
    icon: "truck",
    child: [
      {
        path: "/tracteurs/ajoutertracteur",
        name: "Ajouter un Nouveau Tracteur",
        icon: "mdi mdi-cards-variant",
        component: NewTractors,
      },
      {
        path: "/tracteurs/liste",
        name: "Liste",
        icon: "mdi mdi-comment-processing-outline",
        component: listTractors,
      },
      {
        path: "/tracteurs/listeparatda",
        name: "Liste par ATDA",
        icon: "mdi mdi-equal",
        component: listTractorsByATDA,
      },
      {
        path: "/tracteurs/listedeshs",
        name: "Liste des tracteurs H.Service",
        icon: "mdi mdi-equal",
        component: tractorsHS,
      },
      // {
      //   path: "/tracteurs/carte",
      //   name: "Carte",
      //   icon: "mdi mdi-arrange-send-backward",
      //   component: Badges,
      // },
    ],
  },
  {
    collapse: true,
    path:"/rapports",
    name: "Rapports",
    state: "rapports",
    icon: "align-justify",
    component: Notes,
    child: [
      // {
      //   path: "/rapportstat",
      //   name: "Etat déplacements",
      //   icon: "settings",
      //   component: ReportStats,
      // },
      {
        path: "/executerapport",
        name: "SoNaMA heure moteur",
        icon: "settings",
        component: Reports,
      },
    ]
  },
  {
    collapse: true,
    path: "/maintenance",
    name: "Maintenance",
    state: "maintenance",
    icon: "settings",
    component: Notes,
    child: [
      {
        path: "/maintenances/entretiendus",
        name: "Entretiens dûs",
        icon: "mdi mdi-comment-processing-outline",
        component: EntretienDus,
      },
      {
        path: "/maintenances/enregistrerentretien",
        name: "Enregistrer un entretien",
        icon: "mdi mdi-comment-processing-outline",
        component: NewVidanges,
      },
      {
        path: "/maintenances/listeentretien",
        name: "Liste des entretiens",
        icon: "mdi mdi-comment-processing-outline",
        component: listMaintenances,
      },
      // {
      //   path: "/maintenances/enregistrerpanne",
      //   name: "Enregistrer une panne",

      //   icon: "mdi mdi-comment-processing-outline",
      //   component: newFailure,
      // },
      // {
      //   path: "/maintenances/listepannes",
      //   name: "Liste des pannes",

      //   icon: "mdi mdi-comment-processing-outline",
      //   component: listFailure,
      // },
      // {
      //   path: "/maintenances/addintervention",
      //   name: "Enregistrer une intervention",
      //   icon: "mdi mdi-comment-processing-outline",
      //   component: newIntervention,
      // },
      // {
      //   path: "/maintenances/listeintervention",
      //   name: "Liste des interventions",
      //   icon: "mdi mdi-comment-processing-outline",
      //   component: listeinterventions,
      // }
    ]
  },
  {
    collapse: true,
    path: "/reparations",
    name: "Reparation",
    state: "reparation",
    icon: "settings",
    component: Notes,
    child: [
      {
        path: "/reparations/enregistrerpanne",
        name: "Enregistrer une panne",

        icon: "mdi mdi-comment-processing-outline",
        component: newFailure,
      },
      {
        path: "/reparations/listepannes",
        name: "Liste des pannes",

        icon: "mdi mdi-comment-processing-outline",
        component: listFailure,
      },
      {
        path: "/reparations/addintervention",
        name: "Enregistrer une intervention",
        icon: "mdi mdi-comment-processing-outline",
        component: newIntervention,
      },
      {
        path: "/reparations/listeintervention",
        name: "Liste des interventions",
        icon: "mdi mdi-comment-processing-outline",
        component: listeinterventions,
      }
    ]
  },
  {
    path: "/",
    pathTo: "/dashboards/classic",
    name: "Dashboard",
    redirect: true,
  },
];
export default ThemeRoutes;
