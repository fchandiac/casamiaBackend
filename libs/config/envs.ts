import 'dotenv/config';
import * as joi from 'joi';



// GATEWAY_PORT=3001


// RABBITMQ_PORT=5672
// RABBITMQ_URL="amqp://localhost:5672"


// DATABASE_HOST=localhost
// DATABASE_PORT=3306
// DATABASE_USER=root
// DATABASE_PASSWORD=fenasantma

// AUTH_PORT=3002
// AUTH_DATABASE_NAME=auth-casamia-app

// CART_PORT=3003
// CART_DATABASE_NAME=cart-casamia-app

// COUPON_PORT=3004
// COUPON_DATABASE_NAME=coupon-casamia-app

// MISSION_PORT=3005
// MISSION_DATABASE_NAME=mission-casamia-app

// NOTIFICATION_PORT=3006
// NOTIFICATION_DATABASE_NAME=notification-casamia-app

// IMAGES_PORT=3007
// IMAGES_DATABASE_NAME=images-casamia-app




interface EnvVars {
    GATEWAY_PORT: number;
    RABBITMQ_PORT: number;
    RABBITMQ_URL: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    ACCOUNT_DATABASE_NAME: string;
    CART_DATABASE_NAME: string;
    COUPON_DATABASE_NAME: string;
    MISSION_DATABASE_NAME: string;
    NOTIFICATION_DATABASE_NAME: string;
    IMAGES_DATABASE_NAME: string;

}

const envVarsSchema: joi.ObjectSchema = joi.object({
    GATEWAY_PORT: joi.number().required(),
    RABBITMQ_PORT: joi.number().required(),
    RABBITMQ_URL: joi.string().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.number().required(),
    DATABASE_USER: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    ACCOUNT_DATABASE_NAME: joi.string().required(),
    CART_DATABASE_NAME: joi.string().required(),
    COUPON_DATABASE_NAME: joi.string().required(),
    MISSION_DATABASE_NAME: joi.string().required(),
    NOTIFICATION_DATABASE_NAME: joi.string().required(),
    IMAGES_DATABASE_NAME: joi.string().required(),

    
    
}).unknown(true);


const { value: envVars, error } = envVarsSchema.validate(process.env, {
    allowUnknown: true,
 
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}




export const envs = {
    seed: envVars.SEED_MODE,
    gateway: {
        port: envVars.GATEWAY_PORT,
    },
    rabbitmq: {
        port: envVars.RABBITMQ_PORT,
        url: envVars.RABBITMQ_URL,
    },
 
    database: {
        host: envVars.DATABASE_HOST,
        port: envVars.DATABASE_PORT,
        user: envVars.DATABASE_USER,
        password: envVars.DATABASE_PASSWORD,
        authDatabaseName: envVars.AUTH_DATABASE_NAME,
    },
    account: {
        databaseName: envVars.ACCOUNT_DATABASE_NAME,
    },
    cart: {
        databaseName: envVars.CART_DATABASE_NAME,
    },
    coupon: {
        databaseName: envVars.COUPON_DATABASE_NAME,
    },
    mission: {
        databaseName: envVars.MISSION_DATABASE_NAME,
    },
    notification: {
        databaseName: envVars.NOTIFICATION_DATABASE_NAME,
    },
    images: {
        databaseName: envVars.IMAGES_DATABASE_NAME,
    },
};