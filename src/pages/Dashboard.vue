<template>
  <div class="dashboard">
    <Card>
      <template #header>
        <img
          alt="user header"
          src="https://images.unsplash.com/photo-1608035910534-d29aea04943e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1317&q=80"
        />
      </template>
      <template #title> Advanced Card </template>
      <template #content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" />
        <Button
          icon="pi pi-times"
          label="Cancel"
          class="p-button-secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "primevue/card";

export default {
  name: "Dashboard",
  components: { Card },
};
</script>
