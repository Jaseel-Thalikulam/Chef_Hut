//Imports
import { Request, Response } from 'express';
import { ServerResponse } from 'http';


export function sayHello(req: Request, res: Response):ServerResponse {
    return res.json({ message: "SHOW ME" });
}

