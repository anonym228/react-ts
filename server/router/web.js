const router = require("express").Router();

const {
  getAllTodos,
  createNewTodo,
  completeTodo
} = require("../controllers/todos.js");

router.get("/todo/get", getAllTodos);
router.post("/todo/create", createNewTodo);
router.post("/todo/complete", completeTodo);

module.exports = router;
