import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/main.ts'];

const doc = {
    host: "https://unfwfspring2024.azurewebsites.net/",
    schemes: ['https','http'],
    info: {
        version: "1.0.0",
        title: "TODO List API",
        description: "A simple TODO List API, privdes the ability to create, read, delte and update TODO Lists and their related items / tasks."
    },
    definitions: {
            TodoList:{
                id: 1,
                title: "My TODO List",
                created_at: new Date(),
                list_items: [{ $ref: '#/definitions/TodoListItem'}]
            },
            TodoList_In:{
                title: "My TODO List",
            },
            TodoListItem:{
                id: 1,
                task: "My TODO Task",
                completed: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            TodoListItem_In:{
                task: "My TODO Task",
                completed: false,
            },
            ErrorMessage: {
                status: 400, // HTTP status code
                message: "Error Message goes here"
            },
           InfoMessage: {
                status: 200, // HTTP status code
                message: "Success Message goes here"
            }
            
            
        }
    }


swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles,doc);