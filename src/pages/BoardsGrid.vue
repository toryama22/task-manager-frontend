<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      class="my-card"
      v-for="project in projects"
      :key="project.id"
      @click="onCardClick(project.id)"
      v-ripple
    >
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">
          {{ project.projectName }}
        </div>
        <div class="text-subtitle2">
          {{ project.description }}
        </div>
      </q-card-section>

      <q-separator />

      <!-- <q-card-actions align="right">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions> -->
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "BoardsGrid",

  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      projects: [],

      editedProject: {
        id: null,
        createdDate: null,
        modifiedDate: null,
        deletedDate: null,
        projectName: null,
        description: null,
      },
    };
  },

  methods: {
    onCardClick(boardId) {
      this.$router.push({
        name: "board",
        params: {
          id: boardId
        }

      })
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
  },

  mounted() {
    this.fetchProjects();
  },

});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
