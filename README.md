# TitanBox
This is a QR Code organizing system.

- Create a QR code label.
- Print it.
- Stick it to a box.
- Never again open 20 boxes in your garage  to find 1 thing.

When you scan it with your phone, the app will show the contents of the box that you defined.

The box can be reused by editing the contents in the app.

---
## To Run the server:
development mode: `npm run server`  
Some more info on architecture [here](https://www.youtube.com/watch?v=vyz47fUXcxU) and [here](https://www.youtube.com/watch?v=eTRSl1As83A).

## The database:
The database deploys to Kubernetes out of the box.

You can (if you choose to do so) expose the DB to local network using the included service.  
The service uses MetalLB LoadBalancer to expose the DB using sandbox mode out of the box,  
modify to your own needs.

Deploying: [Check instructions in the db folder](db/README.md)

