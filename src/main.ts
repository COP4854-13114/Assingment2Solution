import express from 'express';
import todoRoute from './routes/todo.route';

import swaggerUi from 'swagger-ui-express';
import swagger_output from '../dist/swagger_output.json';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/todo',todoRoute);
app.get('/swagger.json', (req, res) => {
    // #swagger.ignore = true
    res.send(swagger_output);
});
app.use('/', swaggerUi.serve, swaggerUi.setup(swagger_output))
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running');
});

