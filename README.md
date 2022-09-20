# Node Mpesa intergration

This is a backend api service that allows you to use Mpesa stkpush to make payments 


## Dev environment 
In development environment you can run on your terminal:  
### `npm run dev`

## Production environment 
In development environment you can run on your terminal:  
### `npm start`


## Simulate Payment
You can make payment by  sending a GET request to http://localhost:8000/api/v1/payment/simulate and pass phoneNumber and amount to get above request as request parameters

#### `Example`
http://localhost:8000/api/v1/payment/simulate/254722000000&1


Ensure you put your callback URL on your .env file in order to get your payment status