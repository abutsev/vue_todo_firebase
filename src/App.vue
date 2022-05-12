<template>
  <div id="app">
    <v-app>
      <v-container grid-list-xs>
        <h3 class="text-primary">Записная книжка</h3>
        <div class="d-flex">
          <v-text-field
            v-model="todo"
            label="Новая запись"
            @keydown.enter="addTodo"
          ></v-text-field>
          <v-btn :disabled="!todo" @click="addTodo" color="success"
            >Добавить</v-btn
          >
        </div>
        <v-snackbar v-model="infoMsg" :right="true" :top="true" color="error">
          Please enter a Task
        </v-snackbar>

        <v-card elevation="10">
          <v-card-title color="primary" :class="`d-flex justify-space-between`">
            <label class="blue--text">Записей: {{ todos.length }}</label>
            <div>
              <label class=" success--text pr-2">Выполнено :</label>
              <v-progress-circular :value="progress" color="success">{{
                tasksDone
              }}</v-progress-circular>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="item in todos" :key="item.id">
              <v-list-item-content class="pl-3">
                <v-list-item-action>
                  <v-checkbox
                    v-model="item.isDone"
                    @change="todoDone(item)"
                    :color="(item.isDone && 'grey') || 'primary'"
                  >
                    <template v-slot:label>
                      <div
                        :class="
                          (item.isDone && 'text--grey') || 'text--primary'
                        "
                        class="ml-3"
                        v-text="item.todo"
                      ></div>
                    </template>
                  </v-checkbox>
                </v-list-item-action>
              </v-list-item-content>
              <!-- <v-list-item-icon>
                <v-icon color="red" @click="deleteTodo(item)">delete</v-icon>
              </v-list-item-icon> -->
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import db from "./firebase";
import firebase from "firebase";
export default {
  name: "App",
  components: {},
  data() {
    return {
      todo: "",
      todos: [],
      infoMsg: false,
    };
  },
  computed: {
    tasksDone() {
      return this.todos.filter((todo) => todo.isDone).length;
    },
    progress() {
      return (this.tasksDone / this.todos.length) * 100;
    },
  },
  methods: {
    todoDone(todo) {
      let isDone = todo.isDone ? true : false;

      db.collection("todos")
        .doc(todo.id)
        .update({ isDone });
    },
    addTodo: function() {
      if (!this.todo) {
        this.infoMsg = true;
      } else {
        db.collection("todos")
          .add({
            todo: this.todo,
            isDone: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .catch(function(error) {
            console.error("Error adding collection: ", error);
          });
        this.todo = "";
      }
    },
    deleteTodo(item) {
      db.collection("todos")
        .doc(item.id)
        .delete();
    },
  },
  firestore: {
    todos: db.collection("todos").orderBy("createdAt", "desc"),
  },
};
</script>
