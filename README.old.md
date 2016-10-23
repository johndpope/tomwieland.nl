## Deployment (Old Documentation)
TODO: Find out if I can deploy it like this again. Just fucking pay for the
      service dude.

### Build an Image
```
docker build -t gcr.io/tomwielandnl/tomwielandnl .
```

### Push Image
```
gcloud docker push gcr.io/tomwielandnl/tomwielandnl
````

### Run Image
```
kubectl run tomwielandnl --image=gcr.io/tomwielandnl/tomwielandnl --port=80
```

### Expose Image (once)
```
kubectl expose deployment tomwielandnl --type="LoadBalancer"
```

### Destroy
```
kubectl delete service,deployment tomwielandnl
```
