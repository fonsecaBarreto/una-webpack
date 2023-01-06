import express, { Express } from 'express'
import cors from "cors"
export function useMiddlewares(app: Express){
    app.use(cors());
}