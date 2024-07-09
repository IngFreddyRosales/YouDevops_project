import z from 'zod';

const userSchema = z.object({
    nombre: z.string().min(2).max(50),
    apellido: z.string().min(2).max(50),
    correo: z.string().email(),
    contrasenia: z.string().min(5).max(100),
});

export function validateUser(user) {
    return userSchema.safeParse(user);
}

export function validateUserUpdate(user) {
    return userSchema.partial().safeParse(user);
}

export function validatePartialUser(user){
    return userSquema.partial().safeParse(user);
}