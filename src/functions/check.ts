import { APIGatewayProxyHandler } from 'aws-lambda';
import { z } from 'zod';
import clinics from '../helpers/business';

const eventBodySchema = z.object({
  email: z.string().email({message:"userId must be at least 26 characters"}),
  apiKey: z.string().min(16,{message:"API key must be at least 76 characters"}),
});


export const hello:APIGatewayProxyHandler = async (event, _context) => {
  try{
    const clinic = clinics()
    const requestBody = JSON.parse(event.body || "{}")
    const validatedData = eventBodySchema.parse(requestBody);
    const { apiKey } = validatedData
    
    const response = await clinic.businesses(apiKey)

    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
      
      body: JSON.stringify(response),
    };
    
  }catch(error){
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          error: error.errors, // Validation errors
        }),
      };
    }

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: "Internal server error",
      }),
    };
  }
};


export default hello;

