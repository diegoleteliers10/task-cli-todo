#! /usr/bin/env node


const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2)); // Crear un archivo vacío con un array
}

let task_list = []

if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf-8');
  task_list = JSON.parse(data);
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Por favor, proporciona un comando.");
  process.exit(1);
}

const command = args[0];

switch (command) {
  case "add":
    const task_name = args[1];
    if (!task_name) {
      console.log("Por favor, proporciona un nombre de tarea.");
      process.exit(1);
    }
    const task = {
      id: task_list.length + 1,
      name: task_name,
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    task_list.push(task);
    
    // Guardar la lista de tareas actualizada en el archivo
    fs.writeFileSync(filePath, JSON.stringify(task_list, null, 2)); // Actualizar tasks.json

    console.log(`Task added successfully (ID:${task.id})`);
    break;

  case "list":

    const filter = args[1];

    if (task_list.length === 0) {
      console.log("No hay tareas.");
    } 
    
    if(filter === "done") {
      console.log("Tareas pendientes: \n");
      console.log(`ID \t NAME \t STATUS \n CREATED AT \t UPDATED AT \n`);
      task_list.forEach((task) => {
        if(task.status === "done") {
          console.log(`${task.id} \t ${task.name} \t ${task.status} \t ${task.createdAt} \t ${task.updatedAt} \n`);
        }
      });
    }
    
    if(filter === "in-progress"){
      console.log("Tareas pendientes: \n");
      console.log(`ID \t NAME \t STATUS \n CREATED AT \t UPDATED AT \n`);
      task_list.forEach((task) => {
        if(task.status === "in-progress") {
          console.log(`${task.id} \t ${task.name} \t ${task.status} \t ${task.createdAt} \t ${task.updatedAt} \n`);
        }
      });
    } 

    if(filter === "todo"){
      console.log("Tareas pendientes: \n");
      console.log(`ID \t NAME \t STATUS \n CREATED AT \t UPDATED AT \n`);
      task_list.forEach((task) => {
        if(task.status === "todo") {
          console.log(`${task.id} \t ${task.name} \t ${task.status} \t ${task.createdAt} \t ${task.updatedAt} \n`);
        }
      });
    } 
    
    if(filter!=="done" && filter!=="in-progress" && filter!=="todo") {
      console.log("Tareas: \n");
      console.log(`ID \t NAME \t STATUS \n CREATED AT \t UPDATED AT \n`);
      task_list.forEach((task) => {
          console.log(`${task.id} \t ${task.name} \t ${task.status} \t ${task.createdAt} \t ${task.updatedAt} \n`);
      });
    }
    break;

  case "mark-in-progress":
    const taskIP_id = parseInt(args[1]);
    if (isNaN(taskIP_id)) {
      console.log("Por favor, proporciona un ID de tarea válido.");
    }

    const foundedIPTask = task_list.find((task) => task.id === taskIP_id);
    if (!foundedIPTask) {
      console.log("Tarea no encontrada.");
    }

    if(foundedIPTask){
      foundedIPTask.status = "in-progress";
      foundedIPTask.updatedAt = new Date();
      fs.writeFileSync(filePath, JSON.stringify(task_list, null, 2));
      console.log("Task mark as in-progress.");
    }
    break;

  case "mark-done":
    const taskD_id = parseInt(args[1]);
    if (isNaN(taskD_id)) {
      console.log("Por favor, proporciona un ID de tarea válido.");
    }

    const foundedDTask = task_list.find((task) => task.id === taskD_id);
    if (!foundedDTask) {
      console.log("Tarea no encontrada.");
    }

    if(foundedDTask){
      foundedDTask.status = "done";
      foundedDTask.updatedAt = new Date();
      fs.writeFileSync(filePath, JSON.stringify(task_list, null, 2));
      console.log("Task mark as done.");
    }
    break;

  case "delete":
    const delete_id = parseInt(args[1]);
    if (isNaN(delete_id)) {
      console.log("Por favor, proporciona un ID de tarea válido.");
    }

    const foundedTask = task_list.find((task) => task.id === delete_id);
    if (!foundedTask) {
      console.log("Tarea no encontrada.");
    }

    if(foundedTask){
      task_list = task_list.filter((task) => task.id !== delete_id);
      fs.writeFileSync(filePath, JSON.stringify(task_list, null, 2));
      console.log("Task deleted.");
    }
    break;

  default:
    console.log("Por favor, proporciona un comando válido.");
    break;
}

