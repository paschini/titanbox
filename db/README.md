# The instructions to deploy the db

- Start by deploying the secret:
  `kubectl create -f mysql-secret.yaml`
  
- Then, deploy the PV and PVC:
  `kubectl apply -f mysql-pv.yaml`
  
- Lastly but not least, deploy the DB:
  `kubectl apply -f mysql-deployment.yaml`
  
## Useful commands to check the state of the DB:
Gets the full description of the deployment:

`kubectl describe deployment mysql`

Check the pods created:

`kubectl get pods -l app=mysql`

Get into the MySQL prompt, to edit the DB:

`kubectl run -it --rm --image=mysql:5.6 --restart=Never mysql-client -- mysql -h mysql -ppassword`

Use the password established in the secret instead of `password`.