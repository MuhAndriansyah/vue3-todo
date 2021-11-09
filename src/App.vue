<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="card-title">TODO VUE 3 | OPTIONS API</div>
        <div class="row">
          <div class="col-10">
            <input
              type="text"
              class="form-control"
              placeholder="Add Todo"
              v-model="todo"
              @keyup.enter="addTodo"
            />
          </div>
          <div class="col-2">
            <div class="d-grid gap-2">
              <button class="btn btn-success" @click="addTodo">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <List :todos="todos" @deleteTodo="hapusTodo" @doneTodo="selesaikanTodo" />
  </div>
</template>


<script>
import List from "./components/List.vue";

export default {
  components: {
    List,
  },
  data() {
    return {
      todo: "",
      todos: [],
    };
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  },
  methods: {
    addTodo() {
      if (this.todo) {
        this.todos.unshift({
          activity: this.todo,
          isDone: false,
        });
      } else {
        this.$toast.error("Field wajib diisi", {
          type: "error",
          position: "top-right",
          duration: 1000,
        });
      }

      this.todo = "";
      this.saveToLocalStorage();
    },
    hapusTodo(todoIndex) {
      this.todos = this.todos.filter((item, index) => {
        if (index != todoIndex) {
          return item;
        }
      });
      this.saveToLocalStorage();
    },
    selesaikanTodo(todoIndex) {
      this.todos = this.todos.filter((item, index) => {
        if (index == todoIndex && !item.isDone) {
          item.isDone = true;
        } else if (index == todoIndex && item.isDone) {
          item.isDone = false;
        }
        return item;
      });
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
