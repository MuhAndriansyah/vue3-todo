<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="card-title">TODO VUE 3 | Composition API</div>
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
    <List :todos="list" @deleteTodo="hapusTodo" @doneTodo="selesaikanTodo" />
  </div>
</template>


<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useToast } from "vue-toastification";

import List from "./components/List.vue";

export default {
  components: {
    List,
  },
  setup() {
    const todo = ref("");
    const todos = reactive({
      list: [],
    });
    const toast = useToast();

    onMounted(() => {
      todos.list = JSON.parse(localStorage.getItem("todos")) ?? [];
    });

    const addTodo = () => {
      if (todo.value) {
        todos.list.unshift({
          activity: todo.value,
          isDone: false,
        });
        toast.success("Todo berhasil ditambah");
      } else {
        toast.error("Field wajib diisi", {
          position: "top-right",
          timeout: 1000,
        });
      }

      todo.value = "";
      saveToLocalStorage();
    };

    const hapusTodo = (todoIndex) => {
      todos.list = todos.list.filter((item, index) => {
        if (index != todoIndex) {
          return item;
        }
      });

      saveToLocalStorage();
    };

    const selesaikanTodo = (todoIndex) => {
      todos.lists = todos.list.filter((item, index) => {
        if (index === todoIndex && !item.isDone) {
          item.isDone = true;
        } else if (index === todoIndex && item.isDone) {
          item.isDone = false;
        }

        return item;
      });

      saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
      localStorage.setItem("todos", JSON.stringify(todos.list));
    };

    return { todo, ...toRefs(todos), addTodo, hapusTodo, selesaikanTodo };
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
