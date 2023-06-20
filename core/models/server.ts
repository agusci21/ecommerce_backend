import express, { Application } from 'express'
import userRoutes from '../../features/user/routes/user';
import authRoutes from '../../features/auth/routes/auth';
import productsRoutes from '../../features/product/routes/products_route'
import cors from 'cors';
import db from '../db/connection';
import { createTablesIfNotExists } from '../helpers/table_creator_helper';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth',
        products: '/api/products'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';
        
        this.dbConnection();
        this.middlewares(); 
        this.routes();
    }

    async dbConnection() {

        try {
            await db.authenticate();
            await createTablesIfNotExists()
            console.log('Database online');

        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
    }


    routes() {
        this.app.use( this.apiPaths.users, userRoutes )
        this.app.use( this.apiPaths.auth, authRoutes )
        this.app.use( this.apiPaths.products, productsRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;