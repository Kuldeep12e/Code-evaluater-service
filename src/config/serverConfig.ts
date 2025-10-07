import dotenv from "dotenv"

dotenv.config();

export default{
    PORT : process.env.PORT,
    REDIS_HOST: process.env.REDIS_HOST ,
    REDIS_PORT: process.env.REDIS_PORT
}