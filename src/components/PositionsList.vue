<template>
    <div class="student">
      Student Id : {{ id }} <br />
      Name: {{ name }} <br />
    </div>
  </template>
  
  <script>
  export default {
    name: "PositionsList",
    props: {
      id: Number,
      name: String,
      year: Number,
      subject: String,
    },
  };
  </script>