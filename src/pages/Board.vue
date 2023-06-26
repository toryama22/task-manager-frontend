<template>
  <div class="q-pa-md q-gutter-lg">
    <q-btn label="Создать" color="primary" @click="editDialogVisible = true" />

    <q-dialog
      v-model="editDialogVisible"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card style="min-width: 350px">
        <q-form>
          <q-card-section>
            <div class="text-h6">{{ editDialogTitle }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              label="Название доски"
              v-model="editedProject.projectName"
            ></q-input>
            <q-input
              label="Описание доски"
              v-model="editedProject.description"
            ></q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn 
              flat 
              label="Отмена" 
              v-close-popup 
            />
            <q-btn
              label="Создать"
              color="primary"
              @click="onSaveClicked"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-table
      title="Доски"
      color="secondary"
      :loading="loading"
      :rows="projects"
      :columns="columns"
      :separator="separator"
      v-model:pagination="pagination"
      @row-click="redirectToSimpleBoard"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
          <q-btn
            icon="delete"
            @click="showDeleteConfirmDialog(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>

    <ConfirmDialog
      v-model="deleteConfirmDialogVisible"
      @deletion-confirmed="onDeleteConfirmed"
      @deletion-canceled="closeDeleteConfirmDialog"
    />
  </div>
</template>

<script>
/*import draggable from "vuedraggable";*/
import { api } from "boot/axios";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
export default {
  name: "two-list-headerslots",

  components: {
    ConfirmDialog,
  },

  data() {
    return {
      loading: true,
      projects: [],
      separator: "horizontal",

      editDialogVisible: false,
      deleteConfirmDialogVisible: false,

      pagination: {
        rowsPerPage: 50,
        sortBy: "id",
        //descending: true,
      },

      editedProject: {
        id: null,
        createdDate: null,
        modifiedDate: null,
        deletedDate: null,
        projectName: null,
        description: null,
      },

      columns: [
        {
          name: "id",
          label: "ID",
          field: "id",
          align: "center",
          sortable: true,
        },
        {
          name: "positionTitle",
          label: "Название",
          field: "projectName",
          align: "center",
          sortable: true,
        },
        {
          name: "positionTitle",
          label: "Описание",
          field: "description",
          align: "center",
          sortable: true,
        },
        {
          name: "createdDate",
          label: "Дата создания",
          field: "createdDate",
          align: "center",
          sortable: true,
        },
        {
          name: "modifiedDate",
          label: "Дата изменения",
          field: "modifiedDate",
          align: "center",
          sortable: true,
        },
        { 
          name: "actions", 
          label: "Action",
          align: "center"
        },
      ],
    };
  },

  methods: {
    async createProject(editedProject) {
      await api.post("/project", editedProject); /*.then((response) => {
      if (response.status === 200) {
        this.merchants.push(response.data);
        this.closeEditDialog();
      } else {
        this.$router.push("/connection-error");
      }
    });*/
    },

    async fetchProjects() {
      await api.get("/project").then((response) => {
        if (response.status === 200) {
          this.projects = response.data;
          this.loading = false;
        } else {
          this.$router.push("/connection-error");
        }
      });
    },

    async updateProject(project) {
      await api.put("/project/" + project.id, project).then((response) => {
        if (response.status === 200) {
          project = response.data;
          const index = this.projects.findIndex((p) => p.id === project.id);
          Object.assign(this.projects[index], project);
          this.closeEditDialog();
        } else {
          this.$router.push("/connection-error");
          console.log("error" + response.status);
        }
      });
    },

    async deleteProject(project) {
      await api.delete("/project/" + project.id).then((response) => {
        if (response.status === 200) {
          const index = this.projects.findIndex((p) => p.id === project.id);
          this.projects.splice(index, 1);
          this.closeDeleteConfirmDialog();
        } else {
          this.$router.push("/connection-error");
          console.log("error " + response.status);
        }
      });
    },

    redirectToSimpleBoard() {
      this.$router.push("error-not-found")
    },

    onEdit(project) {
      this.editedProject = Object.assign({}, project);
      this.editDialogVisible = true;
      this.editDialogTitle =
        this.editedProject.id == null ? "Новый проект" : "Редактирование";
    },

    showDeleteConfirmDialog(project) {
      this.editedProject = Object.assign({}, project);
      this.deleteConfirmDialogVisible = true;
    },

    closeDeleteConfirmDialog() {
      this.deleteConfirmDialogVisible = false;
      this.editedPosition = {
        id: null,
        createdDate: null,
        modifiedDate: null,
        deletedDate: null,
        positionTitle: null,
      };
    },

    onSaveClicked() {
      if (this.editedProject.id == null) {
        this.createProject(this.editedProject);
        this.fetchProjects();
      } else {
        this.updateProject(this.editedProject);
        this.fetchProjects();
      }
    },

    closeEditDialog() {
      this.editDialogVisible = false;
      this.editedProject = {
        id: null,
        createdDate: null,
        modifiedDate: null,
        projectName: null,
        description: null,
      };
    },

    onDeleteConfirmed() {
      this.deleteProject(this.editedProject);
      this.deleteConfirmDialogVisible = false;
      this.fetchProjects();
    },
  },

  mounted() {
    this.fetchProjects();
  },
};
</script>
<style scoped></style>
