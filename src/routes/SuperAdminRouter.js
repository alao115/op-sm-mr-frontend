/* eslint-disable no-unused-vars */
import { lazy } from "react";
import tractorsHS from "../views/machines/tractorsHS";
// import AuthRoutes from "./AuthRoutes";

//Lazy loading and code splitting
//apps
// const Chat = lazy(() => import("../views/chat/Chat"));
// const Contacts = lazy(() => import("../views/contacts/Contacts"));
// const Email = lazy(() => import("../views/email/Email"));
// const Todo = lazy(() => import("../views/todo/Todo"));
//dashboards
// const Cryptocurrency = lazy(() => import("../views/dashboards/CryptoCurrency"));
// const Ecommerce = lazy(() => import("../views/dashboards/Ecommerce"));
// const General = lazy(() => import("../views/dashboards/General"));
//Ui-components Dropdown
// const Alerts = lazy(() => import("../views/ui-components/Alert"));
// const Badges = lazy(() => import("../views/ui-components/Badge"));
// const Spinners = lazy(() => import("../views/ui-components/Spinner"));
// const Toasts = lazy(() => import("../views/ui-components/Toasts"));
// const Breadcrumbs = lazy(() => import("../views/ui-components/Breadcrumb"));
// const Buttons = lazy(() => import("../views/ui-components/Button"));
// const Dropdowns = lazy(() => import("../views/ui-components/DropDown"));
// const BtnGroups = lazy(() => import("../views/ui-components/BtnGroup"));
// const Cards = lazy(() => import("../views/ui-components/Cards"));
// const CollapseComponent = lazy(() => import("../views/ui-components/Collapse"));
// const CarouselComponent = lazy(() => import("../views/ui-components/Carousel"));
// const JumbotronComponent = lazy(() =>
//   import("../views/ui-components/Jumbotron")
// );
// const LayoutComponent = lazy(() => import("../views/ui-components/Layout"));
// const ListComponent = lazy(() => import("../views/ui-components/ListGroup"));
// const MediaComponent = lazy(() => import("../views/ui-components/Media"));
// const ModalComponent = lazy(() => import("../views/ui-components/Modal"));
// const NavbarComponent = lazy(() => import("../views/ui-components/Navbar"));
// const NavsComponent = lazy(() => import("../views/ui-components/Navs"));
// const PaginationComponent = lazy(() =>
//   import("../views/ui-components/Pagination")
// );
// const PopoverComponent = lazy(() => import("../views/ui-components/Popover"));
// const ProgressComponent = lazy(() => import("../views/ui-components/Progress"));
// const TableComponent = lazy(() => import("../views/ui-components/Table"));
// const TabsComponent = lazy(() => import("../views/ui-components/Tabs"));
// const TooltipComponent = lazy(() => import("../views/ui-components/ToolTip"));
// //Sample Pages Dropdown
// const Starterkit = lazy(() => import("../views/sample-pages/StarterKit"));
// const Profile = lazy(() => import("../views/sample-pages/Profile"));
// const Searchresult = lazy(() => import("../views/sample-pages/SearchResult"));
// const Gallery = lazy(() => import("../views/sample-pages/Gallery"));
// const Helperclass = lazy(() => import("../views/sample-pages/HelperClass"));
// const Widgets = lazy(() => import("../views/widget/Widget"));
// const Calendar = lazy(() => import("../views/calendar/Calendar"));

// //Chart Pages Dropdown
// const Chartjs = lazy(() => import("../views/charts/ChartJs"));
// const Chartc3 = lazy(() => import("../views/charts/C3Chart"));
// const Apexcharts = lazy(() => import("../views/charts/ApexCharts"));
// //Icon Pages Dropdown
// const Materialicon = lazy(() => import("../views/icons/Material"));
// const FontAwesome = lazy(() => import("../views/icons/FontAwesome"));
// const Themify = lazy(() => import("../views/icons/Themify"));
// const Weather = lazy(() => import("../views/icons/Weather"));
// const Simpleline = lazy(() => import("../views/icons/SimpleLine"));
// const FlagIcon = lazy(() => import("../views/icons/Flag"));
// //Form Layout Pages Dropdown
// const Basicform = lazy(() => import("../views/form-layouts/Basic"));
// const FormInputs = lazy(() => import("../views/form-layouts/FormInputs"));
// const FormGroups = lazy(() => import("../views/form-layouts/FormGroups"));
// const FormGrids = lazy(() => import("../views/form-layouts/FormGrids"));
// //Form-pickers Pages Dropdown
// const Datepicker = lazy(() => import("../views/form-pickers/DateTimePicker"));
// const Tagselect = lazy(() => import("../views/form-pickers/TagSelect"));
// //Form Validation Page
// const FormValidate = lazy(() =>
//   import("../views/form-validation/FormValidation")
// );
// //Form Wizard Page
// const FormSteps = lazy(() => import("../views/steps/Steps"));
// //Table Pages Dropdown
// const Basictable = lazy(() => import("../views/tables/TableBasic"));
// const CustomReactTable = lazy(() => import("../views/tables/CustomReactTable"));
// const Datatable = lazy(() => import("../views/tables/ReactBootstrapTable"));

// const CustomVectorMap = lazy(() => import("../views/maps/CustomVectorMap"));
// const auths = [].concat(AuthRoutes);

/* Our components */
const Notes = lazy(() => import("../views/notes/Notes"));
const Classic = lazy(() => import("../views/dashboards/Classic"));
const TractorsListLayout = lazy(() => import("../views/machines/tractors/tractorLayout"));
const TractorsList = lazy(() => import("../views/machines/tractors/tractorsList"));
const TractorMedicalBook = lazy(() => import("../views/machines/tractors/medicalBook"));
const EditAddTractor = lazy(() => import("../views/machines/editAddTractor"));
const listTractorsByATDA = lazy(() => import("../views/machines/tractorsByATDA"));
const NewTractors = lazy(() => import("../views/machines/editAddTractor"));
const NewVidanges = lazy(() => import("../views/vidange/addNew"));
const EntretienDus = lazy(() => import("../views/vidange/entretienDus"));
const Logs = lazy(() => import("../views/crons/logs"));
const ReportStats = lazy(() => import("../views/reports/ReportStats"));
const Reports = lazy(() => import("../views/reports/Reports"));
const newFailure = lazy(() => import("../views/vidange/newFailure.js"));
const listFailure = lazy(() => import("../views/vidange/listFailure.js"));
const newIntervention = lazy(() => import("../views/vidange/newIntervention.js"));
const listeinterventions = lazy(() => import("../views/vidange/listInterventions.js"));
const listMaintenances = lazy(() => import("../views/vidange/listMaintenance.js"));
const listUsers = lazy(() => import("../views/users/listUsers.js"));
const Panne = lazy(() => import("../views/machines/panne"));

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
    component: Classic,
  },
  {
    collapse: true,
    path: "/tracteurs",
    name: "Tracteurs",
    state: "tracteurs",
    icon: "truck",
    child: [
      // {
      //   path: "/tracteurs/ajoutertracteur",
      //   name: "Ajouter un Nouveau Tracteur",
      //   icon: "mdi mdi-cards-variant",
      //   component: NewTractors,
      // },
      {
        path: "/tracteurs/",
        name: "Liste",
        icon: "mdi mdi-comment-processing-outline",
        component: TractorsListLayout,
        layout: true,
        children: [
          {
            path: "liste",
            component: TractorsList,
          },
          {
            path: "carnet/:tractorChassis",
            component: TractorMedicalBook,
          },
          {
            path: "edit/:tractorChassis",
            component: EditAddTractor
          }
        ],
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
    ],
  },
  {
    collapse: true,
    path: "/rapports",
    name: "Rapports",
    state: "rapports",
    icon: "align-justify",
    component: Notes,
    child: [
      {
        path: "/rapportstat",
        name: "Etat déplacements",
        icon: "settings",
        component: ReportStats,
      },
      {
        path: "/executerapport",
        name: "SoNaMA heure moteur",
        icon: "settings",
        component: Reports,
      },
    ],
  },
  {
    collapse: true,
    path: "/maintenance",
    name: "Maintenances",
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
    ],
  },
  {
    collapse: true,
    path: "/reparation",
    name: "Réparations",
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
      },
    ],
  },
  {
    path: "/users",
    name: "Gestions des utilisateurs",
    state: "Gestions des utilisateurs",
    icon: "users",
    component: listUsers,
  },
  {
    collapse: false,
    path: "/cron/logs",
    name: "cron",
    icon: "activity",
    component: Logs,
  },
  {
    path: "/",
    pathTo: "/dashboards",
    name: "Dashboard",
    redirect: true,
  },
];
export default ThemeRoutes;
