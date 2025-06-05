import { usersService, petsService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.render('users', { users });
}

const getAllPets = async(req,res)=>{
    const pets = await petsService.getAll().lean();
    console.log(pets);
    res.render('pets', { pets });
}


export default {
    getAllUsers,
    getAllPets
}