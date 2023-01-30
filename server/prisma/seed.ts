import md5 from 'md5';
import prisma from './prisma';

const users = [
    {
        id: '9505ca83-cd05-4cc9-b560-fbda8c884159',
        email: 'user@user.com',
        name: 'User',
        password: md5('user'),
    },
    {
        email: 'admin@admin.com',
        name: 'Admin',
        password: md5('admin'),
        role: 'ADMIN',
    },
    {
        email: 'helper@helper.com',
        name: 'Helper',
        password: md5('helper'),
        role: 'HELPER',
    }
]

const status = ['NEW', 'IN_PROGRESS', 'DONE']

const userSeed = async (): Promise<void> => {
    Promise.all(users.map((user) => prisma.user
        .create({ data: user })))
        .catch((err) => {
            console.error(err);
        }
    )
}

const requestSeed = async (): Promise<void> => {
    Promise.all(status.map((status) => prisma.request
        .create({ data: {
            title: 'Lorem ipsum dolor sit',
            status,
            customerId: users[0].id as string ,
        } })))
        .catch((err) => {
            console.error(err);
        }
    )
}


const seedDatabase = async ():Promise<void>  => {
    await userSeed()
    await requestSeed()
}

seedDatabase().catch(
    (err) => {
        console.error(err);
        process.exit(1)
    }
)
