# tomwieland.nl

## Upgrading

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
kubectl delete service,deployment hello-node
gcloud container clusters delete hello-world
gsutils rm -r $(gsutils ls)
```
