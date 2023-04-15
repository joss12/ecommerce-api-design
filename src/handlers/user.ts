
import prisma from "../models/db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {

  try {
      const hash = await hashPassword(req.body.password);
    
      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          password: await hashPassword(req.body.password),
        },
      })
      const token = createJWT(user);
      res.json({ token });
  } catch (error) {
    error.type = 'input'
    next(error)
  }

};

  

  export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
      where:{
        username: req.body.username
      }
    });

    const isMatch = await comparePasswords(req.body.password, user.password);

    if(!isMatch){
      res.status(401)
      res.json({message: 'Nope'})
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  };