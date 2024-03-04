import { Router } from "express";
import myTodoLists, { TodoList } from "../models/todolist.model";
const router = Router();

router.get("/:list_id", (req, res) => {
    // #swagger.description = 'Retrieve a list of todo lists'
    // #swagger.tags = ['Todo Lists']
    // #swagger.summary = 'Retrieve a list of todo lists'
  const todoList = myTodoLists.find(
    (todoList) => todoList.id === parseInt(req.params.list_id)
  );
  if (!todoList) {
    /* #swagger.responses[404] = {
        description: 'Todo list not found',
        schema: { $ref: "#/definitions/ErrorMessage" }
        } */
    return res
      .status(404)
      .send({ status: 404, message: "Todo list not found" });
  }
  /* #swagger.responses[200] = {
    description: 'Todo list retrieved',
    schema: { $ref: "#/definitions/TodoList" }
  } */
  res.status(200).send(todoList);
});

router.patch("/:list_id", (req, res) => {
    // #swagger.description = 'Update a todo list'
    // #swagger.summary = 'Update a todo list'
    // #swagger.tags = ['Todo Lists']
     /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/TodoList_In"
                }
            }
        }
    } */
  const todoList = myTodoLists.find(
    (todoList) => todoList.id === parseInt(req.params.list_id)
  );
  if (!todoList) {
    /* #swagger.responses[404] = {
        description: 'Todo list not found',
        schema: { $ref: "#/definitions/ErrorMessage" }
        } */
    return res
      .status(404)
      .send({ status: 404, message: "Todo list not found" });
  }
  if (!req.body.title) {
    /*
    #swagger.responses[400] = {
        description: 'Title is required',
        schema: { $ref: "#/definitions/ErrorMessage" }
        }
    */
    return res.status(400).send({ status: 400, message: "Title is required" });
  }
  todoList.title = req.body.title;
  /*
    #swagger.responses[204] = {
        description: 'Todo list updated',
        schema: { $ref: "#/definitions/InfoMessage" }
        }
    */
  res.status(204).send({ status: 204, message: "Todo list updated" });
});

router.delete("/:list_id", (req, res) => {
    // #swagger.description = 'Delete a todo list'
    // #swagger.summary = 'Delete a todo list'
    // #swagger.tags = ['Todo Lists']
  const todoList = myTodoLists.find(
    (todoList) => todoList.id === parseInt(req.params.list_id)
  );
  if (!todoList) {
    /* #swagger.responses[404] = {
        description: 'Todo list not found',
        schema: { $ref: "#/definitions/ErrorMessage" }
        } */
    return res
      .status(404)
      .send({ status: 404, message: "Todo list not found" });
  }
  const index = myTodoLists.indexOf(todoList);
  myTodoLists.splice(index, 1);
  /*
    #swagger.responses[204] = {
        description: 'Todo list deleted',
        schema: { $ref: "#/definitions/InfoMessage" }
        }
    */
  res.status(204).send({ status: 204, message: "Todo list deleted" });
});

router.get("/:list_id/items", (req, res) => {
    // #swagger.description = 'Retrieve a list of todo items'
    // #swagger.summary = 'Retrieve a list of todo items'
    // #swagger.tags = ['Todo List Items']
  const todoList = myTodoLists.find(
    (todoList) => todoList.id === parseInt(req.params.list_id)
  );
  if (!todoList) {
    /* #swagger.responses[404] = {
        description: 'Todo list not found',
        schema: { $ref: "#/definitions/ErrorMessage" }
        } */
    return res
      .status(404)
      .send({ status: 404, message: "Todo list not found" });
  }
  /* #swagger.responses[200] = {
    description: 'List of todo items',
    schema: { $ref: "#/definitions/TodoListItem" }
  } */
  res.status(200).send(todoList.list_items);
});

router.post("/:list_id/item", (req, res) => {
    // #swagger.description = 'Create a todo list item'
    // #swagger.summary = 'Create a todo list item'
    // #swagger.tags = ['Todo List Items']
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/TodoListItem_In"
                }
            }
        }
    } */
  const todoList = myTodoLists.find(
    (todoList) => todoList.id === parseInt(req.params.list_id)
  );
  if (!todoList) {
    /* 
    #swagger.responses[404] = {
        description: 'Todo list not found',
        schema: { $ref: "#/definitions/ErrorMessage" }
        }
    */
    return res
      .status(404)
      .send({ status: 404, message: "Todo list not found" });
  }
  if (!req.body.task) {
    /* 
    #swagger.responses[400] = {
        description: 'Task is required',
        schema: { $ref: "#/definitions/ErrorMessage" }
        }
    */
    return res.status(400).send({ status: 400, message: "Task is required" });
  }
  const { task } = req.body;
  const newTodoListItem = {
    id: todoList.list_items.length
      ? Math.max(...todoList.list_items.map((item) => item.id)) + 1
      : 1,
    task,
    completed: false,
    created_at: new Date(),
    updated_at: new Date(),
    list_id: todoList.id,
  };
  todoList.list_items.push(newTodoListItem);
  /*
    #swagger.responses[201] = {
        description: 'Todo list item created',
        schema: { $ref: "#/definitions/TodoListItem" }
        }
    */
  res.status(201).send(newTodoListItem);
});

router.get("/:list_id/item/:itemId", (req, res) => {
    // #swagger.description = 'Retrieve a todo list item'
    // #swagger.summary = 'Retrieve a todo list item'
    // #swagger.tags = ['Todo List Items']
    const todoList = myTodoLists.find(
        (todoList) => todoList.id === parseInt(req.params.list_id)
    );
    if (!todoList) {
        /*
        #swagger.responses[404] = {
            description: 'Todo list not found',
            schema: { $ref: "#/definitions/ErrorMessage" }
            }
        */
        return res
        .status(404)
        .send({ status: 404, message: "Todo list not found" });
    }
    const todoListItem = todoList.list_items.find(
        (item) => item.id === parseInt(req.params.itemId)
    );
    if (!todoListItem) {
        /* 
        #swagger.responses[404] = {
            description: 'Todo list item not found',
            schema: { $ref: "#/definitions/ErrorMessage" }
            }
        */
        return res
        .status(404)
        .send({ status: 404, message: "Todo list item not found" });
    }
    /* #swagger.responses[200] = {
        description: 'Todo list item retrieved',
        schema: { $ref: "#/definitions/TodoListItem" }
    } */
    res.status(200).send(todoListItem);
    });

router.patch("/:list_id/item/:itemId", (req, res) => {
    // #swagger.description = 'Update a todo list item'
    // #swagger.summary = 'Update a todo list item'
    // #swagger.tags = ['Todo List Items']
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/TodoListItem_In"
                }
            }
        }
    } */
    const todoList = myTodoLists.find(
        (todoList) => todoList.id === parseInt(req.params.list_id)
    );
    if (!todoList) {
        /*
        #swagger.responses[404] = {
            description: 'Todo list not found',
            schema: { $ref: "#/definitions/ErrorMessage" }
            }
        */
        return res
        .status(404)
        .send({ status: 404, message: "Todo list not found" });
    }
    const todoListItem = todoList.list_items.find(
        (item) => item.id === parseInt(req.params.itemId)
    );
    if (!todoListItem) {
        /* 
        #swagger.responses[404] = {
            description: 'Todo list item not found',
            schema: { $ref: "#/definitions/ErrorMessage" }
            }
        */
        return res
        .status(404)
        .send({ status: 404, message: "Todo list item not found" });
    }
    
    const completed = req.body.completed;
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res
        .status(400)
        .send({ status: 400, message: "Invalid value for 'completed'" });
    }
    todoListItem.task = req.body.task || todoListItem.task;
    todoListItem.completed = completed || false;
    if (completed || todoListItem.task) {
        todoListItem.updated_at = new Date();
    }
    /*
        #swagger.responses[204] = {
            description: 'Todo list item updated',
            schema: { $ref: "#/definitions/InfoMessage" }
            }
        */
    res.status(204).send({ status: 204, message: "Todo list item updated" });
});

router.delete("/:list_id/item/:itemId", (req, res) => {
    // #swagger.description = 'Delete a todo list item'
    // #swagger.summary = 'Delete a todo list item'
    // #swagger.tags = ['Todo List Items']
    const todoList = myTodoLists.find(
        (todoList) => todoList.id === parseInt(req.params.list_id)
    );
    if (!todoList) {
        /*
        #swagger.responses[404] = {
            description: 'Todo list not found',
            schema: { $ref: "#/definitions/ErrorMessage" }
            }
        */
        return res
        .status(404)
        .send({ status: 404, message: "Todo list not found" });
    }
    const todoListItem = todoList.list_items.find(
        (item) => item.id === parseInt(req.params.itemId)
    );
    if (!todoListItem) {
        /*
        #swagger.responses[404] = {
            description: 'Todo list item not found',
            schema: { $ref: "#/definitions/ErrorMessage" }
            }
        */
        return res
        .status(404)
        .send({ status: 404, message: "Todo list item not found" });
    }
    const index = todoList.list_items.indexOf(todoListItem);
    todoList.list_items.splice(index, 1);
    /*
        #swagger.responses[204] = {
            description: 'Todo list item deleted',
            schema: { $ref: "#/definitions/InfoMessage" }
            }
        */
    res.status(204).send({ status: 204, message: "Todo list item deleted" });
});

router.get("/", (req, res) => {
    // #swagger.description = 'Retrieve a list of todo lists'
    // #swagger.summary = 'Retrieve a list of todo lists'
    // #swagger.tags = ['Todo Lists']
    /* #swagger.responses[200] = {
        description: 'List of todo lists',
        schema: [{ $ref: "#/definitions/TodoList" }]
    } */
  res.status(200).send(myTodoLists);
});
router.post("/", (req, res) => {
    // #swagger.description = 'Create a todo list'
    // #swagger.summary = 'Create a todo list'
    // #swagger.tags = ['Todo Lists']
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/TodoList_In"
                }
            }
        }
    } */
  if (!req.body.title) {
    /*
    #swagger.responses[400] = {
        description: 'Title is required',
        schema: { $ref: "#/definitions/ErrorMessage" }
        }
    */
    return res.status(400).send({ status: 400, message: "Title is required" });
  }
  const { title } = req.body;
  const newTodoList = new TodoList(title);
  myTodoLists.push(newTodoList);
  /*
    #swagger.responses[201] = {
        description: 'Todo list created',
        schema: { $ref: "#/definitions/TodoList" }
        }
    */
  res.status(201).send(newTodoList);
});

export default router;
