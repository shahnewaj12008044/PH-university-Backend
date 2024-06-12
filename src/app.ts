import express, { Application, Request, Response } from "express"
import cors from "cors"
import { studentRoutes } from "./app/module/student/student.route"
import { UserRoutes } from "./app/module/user/user.route"


const app : Application = express()

//parsers
app.use(express.json())
app.use(cors())

//application routes
app.use('/api/v1/students',studentRoutes);
app.use('/api/v1/users',UserRoutes);


app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!')
})

export default app;