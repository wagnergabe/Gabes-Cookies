import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: "Maroon",
        email:  "maroon@email.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: "Violet",
        email: 'violet@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }
];

export default users;