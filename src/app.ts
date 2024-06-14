import express, { Application, Request, Response } from "express"
import cors from "cors"
import { studentRoutes } from "./app/module/student/student.route"
import { UserRoutes } from "./app/module/user/user.route"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"
import router from "./app/routes"


const app : Application = express()

//parsers
app.use(express.json())
app.use(cors())

//application routes
app.use('/api/v1',router);


//Global error handler:
app.use(globalErrorHandler);

//not found
app.use(notFound)


app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!')
})

export default app;