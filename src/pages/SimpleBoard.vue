<template>
  <h3>{{ $route.params.id }}</h3>
  <h3>{{ this.editedProject.projectName }}</h3>

</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "SimpleBoard",
  // boardId: $route.params.id,

  props: {
    boardId: Number,
  },

  data() {
    return {
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
    async fetchProjectById(boardId) {
      await api
        .get("/project/" + boardId)
        .then((response) => {
          if (response.status === 200) {
            this.editedProject = response.data;
          } else {
            this.$router.push("/connection-error");
          }
        });
    },
  },

  mounted() {
    let boardId = this.$route.params.id;
    this.fetchProjectById(boardId);
  },
});
</script>
