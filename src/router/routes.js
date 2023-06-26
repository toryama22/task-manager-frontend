import PositionsPage from "pages/PositionsPage.vue";
import Board from "pages/Board.vue"
import ErrorNotFound from "pages/ErrorNotFound.vue"
import TaskList from "components/TaskList.vue"
import BoardsGrid from "pages/BoardsGrid.vue"
import SimpleBoard from "pages/SimpleBoard.vue"
import LoginForm from "src/pages/LoginForm.vue";

const routes = [
  {
    path: "/",
    redirect: "positions",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "positions",
        component: PositionsPage,
      },
      {
        path: "board",
        component: Board,
      },
      {
        path: "task-list",
        component: TaskList
      },
      {
        path: "error-not-found",
        component: ErrorNotFound 
      },
      {
        path: "boars-grid",
        component: BoardsGrid
      },
      {
        path: "boards/:id",
        name: "board",  
        component: SimpleBoard
      }
    ],    

    
  },

  {
    path: "/login",
    name: "login",
    component: LoginForm
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];


export default routes;
