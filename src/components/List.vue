<template>
  <div class="mt-5">
    <ul class="list-group">
      <li
        class="list-group-item text-start"
        v-for="(todo, index) in todos"
        :key="index"
      >
        <div class="row">
          <div class="col">
            <span v-if="todo.isDone"
              ><del>{{ todo.activity }}</del>
            </span>
            <span v-else>{{ todo.activity }}</span>
          </div>

          <div class="col-auto">
            <div class="row">
              <div class="col">
                <button
                  class="btn btn-info text-white"
                  @click="doneTodo(index)"
                >
                  Done
                </button>
              </div>
              <div class="col">
                <button class="btn btn-danger" @click="deleteTodo(index)">
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      default: [],
    },
  },

  methods: {
    deleteTodo(id) {
      this.$emit("deleteTodo", id);
    },

    doneTodo(id) {
      this.$emit("doneTodo", id);
    },
  },
};
</script>
