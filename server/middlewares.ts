import express, { Express } from 'express'
import cors from "cors"
import compression from "compression"


export function useMiddlewares(app: Express){
    app.use(cors());
    app.use(compression());

}