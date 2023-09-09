import PositionsPage from "pages/PositionsPage.vue";
import Board from "pages/Board.vue";
import ErrorNotFound from "pages/ErrorNotFound.vue";
import TaskList from "components/TaskList.vue";
import BoardsGrid from "pages/BoardsGrid.vue";
import SimpleBoard from "pages/SimpleBoard.vue";
import LoginView from "pages/LoginView.vue";

const routes = [
  {
    path: "/login",
    component: LoginView,
    name: "login",
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "positions",
        component: PositionsPage,
        name: "positions",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "board",
        component: Board,
        name: "board",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "task-list",
        component: TaskList,
        name: "task-list",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "error-not-found",
        component: ErrorNotFound,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "boars-grid",
        component: BoardsGrid,
        name: "boars-grid",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "boards/:id",
        name: "board",
        component: SimpleBoard,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
