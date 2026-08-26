# Kubernetes Test Lab

Complete hands-on project for studying a Node.js web application connected to PostgreSQL inside a local Kubernetes cluster. The application lets users create and list messages, displaying each record's date and time.

## Overview

The backend uses Node.js LTS, Express, and the `pg` driver. The frontend is plain HTML, CSS, and JavaScript, served by Express. The database creates the `messages` table at startup and uses parameterized queries.

The structure is split between `src/app.js` and `src/server.js`: `app.js` builds the application without opening a port, while `server.js` handles the initial connection, HTTP listener, and graceful shutdown. This makes unit tests faster and avoids requiring PostgreSQL during `npm test`.

```text
Browser
    │  http://localhost:8080
    ▼
Service web:80
    │
    ├──► Pod web-1:3000 ─┐
    └──► Pod web-2:3000 ─┤  Deployment (2 replicas)
                         ▼
                   Service postgres:5432
                         │
                         ▼
                 Pod postgres-0
                         │
                         ▼
              PVC postgres-data-postgres-0
```

The browser talks only to the `web` Service. Application pods use the internal `postgres` DNS name to reach the database Service. The StatefulSet keeps the `postgres-0` identity and associates the persistent volume with the PVC.

## Structure

```text
.
├── src/ (app.js, database.js, server.js, routes/messages.js, public/)
├── tests/app.test.js
├── k8s/ (namespace, ConfigMap, Secret, Services, StatefulSet, Deployment, Kustomize)
├── Dockerfile
├── .dockerignore
├── .env.example
├── package.json
├── AGENTS.md
└── README.md
```

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Simple liveness check; does not depend on the database. |
| `GET` | `/ready` | Checks whether PostgreSQL accepts queries. |
| `GET` | `/api/messages` | Lists messages from newest to oldest. |
| `POST` | `/api/messages` | Creates a validated message. |

Example `POST` body:

```json
{
  "name": "Alessandro",
  "message": "My first Kubernetes project"
}
```

The list response is `{ "messages": [...] }`; creation returns `201` and `{ "message": {...} }`. Name and message are required, trimmed, and subject to length limits. Connection errors return `503`.

## Prerequisites

- Node.js LTS 22 or later and npm.
- Docker Desktop running.
- `kubectl`.
- Kind for the Kind workflow.
- Minikube for the Minikube workflow.

The commands below work in PowerShell; `kubectl`, Docker, Kind, and Minikube also have equivalent forms on Linux/macOS.

## Project validation

From the project root:

```bash
npm install
npm run lint
npm test
docker build -t k8s-test-lab-web:local .
kubectl apply --dry-run=client -k k8s/
```

`npm test` uses database mocks, so tests cover health checks, validation, insertion, listing, and connection errors without requiring a real PostgreSQL instance.

## Run locally without Kubernetes

Start a lab PostgreSQL instance in a Docker volume:

```bash
docker volume create k8s-test-lab-postgres-data
docker run -d --name k8s-test-lab-postgres -p 5432:5432 -e POSTGRES_DB=k8slab -e POSTGRES_USER=k8slab -e POSTGRES_PASSWORD=kubernetes-lab-password -v k8s-test-lab-postgres-data:/var/lib/postgresql/data postgres:16-alpine
```

In another terminal:

```bash
Copy-Item .env.example .env
npm install
npm run dev
```

Open <http://localhost:3000>. To stop the local database, run `docker rm -f k8s-test-lab-postgres`. The volume can be kept for another run; it is not the Kubernetes PVC.

## Run with Kind

### 1. Create the cluster and load the image

```bash
kind create cluster --name k8s-test-lab
docker build -t k8s-test-lab-web:local .
kind load docker-image k8s-test-lab-web:local --name k8s-test-lab
```

### 2. Apply the lab

```bash
kubectl apply -k k8s/
kubectl get pods -n k8s-test-lab -w
kubectl get all -n k8s-test-lab
kubectl get statefulsets -n k8s-test-lab
kubectl get pvc -n k8s-test-lab
kubectl rollout status deployment/web -n k8s-test-lab
```

### 3. Open the application

```bash
kubectl port-forward -n k8s-test-lab service/web 8080:80
```

Open <http://localhost:8080>.

## Run with Minikube

### 1. Create the cluster and build the image inside it

```bash
minikube start
minikube image build -t k8s-test-lab-web:local .
kubectl apply -k k8s/
kubectl get pods -n k8s-test-lab -w
```

If your Minikube version does not offer `minikube image build`, use the Minikube Docker daemon:

```bash
minikube docker-env --shell powershell | Invoke-Expression
docker build -t k8s-test-lab-web:local .
kubectl apply -k k8s/
```

### 2. Check and open

```bash
kubectl get all -n k8s-test-lab
kubectl get pvc -n k8s-test-lab
kubectl rollout status deployment/web -n k8s-test-lab
kubectl port-forward -n k8s-test-lab service/web 8080:80
```

Open <http://localhost:8080>.

## Practical study guide

### Inspect resources and events

```bash
kubectl get all -n k8s-test-lab
kubectl get pvc -n k8s-test-lab
kubectl describe pod -n k8s-test-lab <pod-name>
kubectl describe pvc -n k8s-test-lab <pvc-name>
kubectl get events -n k8s-test-lab --sort-by=.lastTimestamp
```

### Read logs

```bash
kubectl logs -n k8s-test-lab deployment/web --all-containers=true
kubectl logs -n k8s-test-lab statefulset/postgres
kubectl logs -n k8s-test-lab <pod-name> -c wait-for-postgres
```

### Demonstrate self-healing

Find and delete a web pod, then watch the Deployment recreate it:

```bash
kubectl get pods -n k8s-test-lab -l app.kubernetes.io/name=web
kubectl delete pod -n k8s-test-lab <web-pod>
kubectl get pods -n k8s-test-lab -w
kubectl rollout status deployment/web -n k8s-test-lab
```

### Demonstrate PostgreSQL persistence

Publish a message, delete `postgres-0`, wait for it to return, and refresh the page. The message should remain because the StatefulSet mounts the same PVC again:

```bash
kubectl get pvc -n k8s-test-lab
kubectl delete pod -n k8s-test-lab postgres-0
kubectl get pods -n k8s-test-lab -w
```

### Scale the application

```bash
kubectl scale deployment/web -n k8s-test-lab --replicas=3
kubectl get pods -n k8s-test-lab -l app.kubernetes.io/name=web
kubectl scale deployment/web -n k8s-test-lab --replicas=2
```

The database remains at one replica; this lab does not implement PostgreSQL replication or high availability.

### Update the image and watch the rollout

```bash
docker build -t k8s-test-lab-web:v2 .
kind load docker-image k8s-test-lab-web:v2 --name k8s-test-lab
kubectl set image deployment/web -n k8s-test-lab web=k8s-test-lab-web:v2
kubectl rollout status deployment/web -n k8s-test-lab
kubectl rollout history deployment/web -n k8s-test-lab
```

On Minikube, use `minikube image build -t k8s-test-lab-web:v2 .` before `kubectl set image`.

## Kubernetes resources explained

- **Namespace**: isolates all lab resources in `k8s-test-lab`.
- **ConfigMaps**: store non-sensitive PostgreSQL and application settings, such as database name, host, and port.
- **Secret**: provides the database password to both workloads. It contains an explicit lab password and must not be treated as a production secret.
- **Service `postgres`**: provides stable DNS and internal access on port 5432.
- **StatefulSet `postgres`**: runs one replica with stable identity and creates a PVC per pod.
- **PVC**: requests 1 GiB of persistent storage for `/var/lib/postgresql/data`.
- **Deployment `web`**: maintains two replicas and performs `RollingUpdate` deployments.
- **Service `web`**: exposes the application internally on port 80 and forwards to port 3000.
- **Probes**: `/health` measures whether the web process is alive; `/ready` becomes ready only when the database responds. PostgreSQL uses `pg_isready` for both probes.
- **initContainer**: waits for the PostgreSQL DNS/Service to accept connections before starting the web container.

### Deployment and StatefulSet in this project

The Deployment is appropriate for interchangeable web replicas with no identity or dedicated disk. The StatefulSet is used for PostgreSQL because it maintains the predictable `postgres-0` identity and binds storage through the volumeClaimTemplate.

### ConfigMap and Secret

ConfigMap is appropriate for values that do not need confidentiality. Secret is the Kubernetes abstraction for sensitive values, but it must still be protected in source control, RBAC, and cluster storage. The exercise password is in `stringData` only to keep the lab reproducible.

## Troubleshooting

### Web pod stuck at `Init:0/1`

```bash
kubectl get pods -n k8s-test-lab
kubectl describe pod -n k8s-test-lab <web-pod>
kubectl logs -n k8s-test-lab <web-pod> -c wait-for-postgres
kubectl get svc,endpoints -n k8s-test-lab postgres
```

Check that `postgres-0` is `Ready`, the Service is named exactly `postgres`, and the database has an endpoint.

### `ImagePullBackOff` on the web pod

The local image must exist inside the cluster environment:

```bash
docker images k8s-test-lab-web
kind load docker-image k8s-test-lab-web:local --name k8s-test-lab
```

On Minikube, prefer `minikube image build` or the `docker-env` workflow above. Then recreate the pods or perform a rollout.

### PVC in `Pending`

```bash
kubectl get storageclass
kubectl describe pvc -n k8s-test-lab <pvc-name>
```

The local cluster needs a default StorageClass. Restart Minikube/Kind or configure a compatible StorageClass if none exists.

### The application returns `503`

```bash
kubectl get pods -n k8s-test-lab
kubectl logs -n k8s-test-lab deployment/web
kubectl logs -n k8s-test-lab statefulset/postgres
kubectl get configmap,secret -n k8s-test-lab
```

Pay particular attention to `DB_HOST=postgres`, `DB_PORT=5432`, the database name, and the password.

## Remove the lab

```bash
kubectl delete -k k8s/
kind delete cluster --name k8s-test-lab
```

Because the Namespace is part of Kustomize, namespaced resources, including the PVC, are removed with it. On Minikube, use `minikube delete` only when you want to remove the entire cluster.

## Limitations and production improvements

This is a learning lab. It does not provide TLS/Ingress, authentication, authorization, versioned migrations, backups, managed encryption, PostgreSQL high availability, autoscaling, centralized observability, NetworkPolicy, or secret rotation. The password in the manifest is intentionally didactic.

For production, use a managed PostgreSQL service or operator, tested backups and replication; Secret Manager/Vault and least-privilege RBAC; signed immutable images and vulnerability scanning; TLS-enabled Ingress; NetworkPolicies; PodDisruptionBudget; HPA; metrics, structured logs, and tracing; controlled migrations; limits reviewed against real metrics; and documented disaster-recovery processes.
