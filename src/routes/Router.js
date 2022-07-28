/* eslint-disable no-unused-vars */
import { lazy } from "react";

//Lazy loading and code splitting
//apps
const Notes = lazy(() => import("../views/notes/Notes"));
//dashboards
/* Our components */
const NewVidanges = lazy(() => import("../views/vidange/addNew"))
const EntretienDus = lazy(() => import("../views/vidange/entretienDus"))
const newFailure = lazy(() => import("../views/vidange/newFailure.js"))
const listFailure = lazy(() => import("../views/vidange/listFailure.js"))
const newIntervention = lazy(() => import("../views/vidange/newIntervention.js"))
const listeinterventions = lazy(() => import("../views/vidange/listInterventions.js"))
const listMaintenances = lazy(() => import("../views/vidange/listMaintenance.js"))


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
    path: "/reparation",
    name: "Reparation",
    state: "reparation",
    icon: "settings",
    component: Notes,
    child: [
      // {
      //   path: "/maintenances/entretiendus",
      //   name: "Entretiens dûs",
      //   icon: "mdi mdi-comment-processing-outline",
      //   component: EntretienDus,
      // },
      // {
      //   path: "/maintenances/enregistrerentretien",
      //   name: "Enregistrer un entretien",
      //   icon: "mdi mdi-comment-processing-outline",
      //   component: NewVidanges,
      // },
      // {
      //   path: "/maintenances/listeentretien",
      //   name: "Liste des entretiens",
      //   icon: "mdi mdi-comment-processing-outline",
      //   component: listMaintenances,
      // },
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
