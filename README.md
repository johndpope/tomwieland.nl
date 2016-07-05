# tomwieland.nl

## Technology

### TODO
- [swagger-js](https://github.com/swagger-api/swagger-js)

### Generic
- [Highland](https://github.com/caolan/highland)
- [Lodash](https://github.com/lodash/lodash)
- [Loglevel](https://github.com/pimterry/loglevel)

### Backend
- [Loopback](https://github.com/strongloop/loopback)
  - [Loopback Boot](https://github.com/strongloop/loopback-boot)
    - [Compression](https://github.com/expressjs/compression)
  - [Loopback Component Passport](https://github.com/strongloop/loopback-component-passport)
  - [Loopback Connector MongoDB](https://github.com/strongloop/loopback-connector-mongodb)
  - [Loopback Datasource Juggler](https://github.com/strongloop/loopback-datasource-juggler)
      - [Loopback Datasource Timestamp Mixin](https://github.com/strongloop/loopback-ds-timestamp-mixin)
  - [Loopback Explorer](https://github.com/strongloop/loopback-explorer)

### Frontend

#### React
- [React](https://github.com/facebook/react)
  - [React Dom](https://github.com/facebook/react)
  - [React Loader](https://github.com/quickleft/react-loader)
  - [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
  - [React to JSX](https://github.com/alexlande/react-to-jsx)
  - [React Router](https://github.com/reactjs/react-router)
      - [React Router Bootstrap](https://github.com/react-bootstrap/react-router-bootstrap)
      - [React Router Redux](https://github.com/reactjs/react-router-redux)
          - [History](https://github.com/reactjs/history)

#### Redux
- [Redux](https://github.com/reactjs/redux)
  - [React Redux](https://github.com/reactjs/react-redux)
  - [Redux Actions](https://github.com/acdlite/redux-actions)
  - [Redux Logger](https://github.com/fcomb/redux-logger)
  - [Redux Streams](https://github.com/Industrial/redux-streams)
  - [Immutable](https://github.com/facebook/immutable-js)

#### Other
- [Cookies](https://github.com/ScottHamper/Cookies)
- [Domready](https://github.com/ded/domready)
- [JSONStream](https://github.com/dominictarr/JSONStream)
- [Moment](https://github.com/moment/moment)
- [Request](https://github.com/request/request)


## Deployment

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
