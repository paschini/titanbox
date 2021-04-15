# The instructions to deploy the db

First, get an encrypted password:  
`echo -n 'password' | base64`

Start by deploying the secret:  
`kubectl create -f mysql-secret.yaml`

Then, deploy the PV and PVC:  
`kubectl apply -f mysql-pv.yaml`

Lastly but not least, deploy the DB:  
`kubectl apply -f mysql-deployment.yaml`

Expose the DB for use outside the cluster (development purposes)  
`kubectl apply -f mysql-lb.yaml`  

**Note**: This service file uses MetalLB as the LoadBalancer.

You can delete everything using `kubectl delete -f <anything.yaml>`  
However, you must follow the order: deployment, service, Pv and PVC and only then the secret.

For **updating** the deployment, since some parameters cannot be re-assigned, you might need to delete the related resource and
apply it again.
  

## Useful commands to check the state of the DB:
Gets the full description of the deployment:  
`kubectl describe deployment mysql`

Check the pods created:  
`kubectl get pods -l app=mysql`

Get into the MySQL prompt, to edit the DB:  
`kubectl run -it --rm --image=mysql:5.6 --restart=Never mysql-client -- mysql -h mysql -ppassword`

Use the password established in the secret instead of `password`.

Port forward to access it in the server app:  
`kubectl port-forward mysql-5fdd546c59-zpvnb 3306:3306`

With this, it should be possible to connect using localhost and a ssh tunnel.  
`ssh camila@15.10.10.101 -L 30036:127.0.0.1:30036 -N`

[Reference](https://linoxide.com/deploy-mysql-on-kubernetes/)

[More info](https://medium.com/@judomu/how-to-connect-with-an-interactive-kubernetes-mysql-client-utilizing-secrets-ecf39557d7bb)

**Remember:** Since the password can be _easily_ decoded, maybe gitignore the secret yaml file. 
