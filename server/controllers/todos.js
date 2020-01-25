const Todo = require("../models").Todo;

async function getAllTodos(req, res) {
  const isGet = await Todo.findAll();
  if (isGet.length === 0) {
    return res.send({
      status: false
    });
  }

  return res.send({
    status: true,
    message: {
      todos: isGet
    }
  });
}

async function createNewTodo(req, res) {
  const { title } = req.body;
  if (title !== "") {
    const data = await Todo.create({ title });
    return res.send({
      status: true,
      message: data
    });
  }
  return res.send({
    status: false,
    message: "Cann't create!"
  });
}

async function completeTodo(req, res) {
  const { id } = req.body;
  if (id) {
    const data = await Todo.findOne({ where: { id: id } });
    await Todo.update({ completed: !data.completed }, { where: { id: id } });
    return res.send({
      status: true,
      message: "Todo complete was change!"
    });
  }
  return res.send({
    status: false,
    message: "Cann't change!"
  });
}

module.exports = {
  getAllTodos,
  createNewTodo,
  completeTodo
};
