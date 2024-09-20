# Task Manager CLI

A simple command-line interface (CLI) for managing tasks. You can add, list, mark, and delete tasks.

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/diegoleteliers10/task-cli-todo.git
   cd task-cli-todo
   ```

2. Install dependencies (if any):

   ```bash
   npm install
   ```

3. Link the bin to run the code with "task-cli":

   ```bash
   npm link
   ```

## Usage

Run the script using Node.js:


### Commands

- **add**: Add a new task.
  - Usage: `task-cli add <task_name>`
  
- **list**: List all tasks or filter by status.
  - Usage: `task-cli list [filter]`
  - Filters: `done`, `in-progress`, `todo`

- **mark-in-progress**: Mark a task as in-progress.
  - Usage: `task-cli mark-in-progress <task_id>`

- **mark-done**: Mark a task as done.
  - Usage: `task-cli mark-done <task_id>`

- **delete**: Delete a task.
  - Usage: `task-cli delete <task_id>`

## Example

1. Add a task:
   ```bash
   task-cli add "Finish the project"
   ```

2. List all tasks:
   ```bash
   task-cli list
   ```

3. Mark a task as done:
   ```bash
   task-cli mark-done 1
   ```

4. Delete a task:
   ```bash
   task-cli delete 1
   ```

## License

This project is licensed under the MIT License.

## Create your project?

Visit https://roadmap.sh/projects/task-tracker for more information.
