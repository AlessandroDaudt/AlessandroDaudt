# DevOps Automation — No Fluff

[![Udemy](https://img.shields.io/badge/Udemy-Course-purple?style=for-the-badge&logo=udemy)](https://www.udemy.com/course/devops-automacao-sem-enrolacao/?referralCode=28E4F89140C44D63D605)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-AKS-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![Ansible](https://img.shields.io/badge/Ansible-Automation-EE0000?style=for-the-badge&logo=ansible&logoColor=white)](https://www.ansible.com/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Azure](https://img.shields.io/badge/Azure-Cloud-0078D4?style=for-the-badge&logo=azure&logoColor=white)](https://azure.microsoft.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Python](https://img.shields.io/badge/Python-DevOps-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

> **UDEMY COURSE CONTENT ONLY**
>
> This repository contains the hands-on labs and materials for the **DevOps Automation — No Fluff** course.
>
> **If you were referred to this repository and are not a student, get the complete course at:**
>
> **[DevOps Automation — No Fluff on Udemy](https://www.udemy.com/course/devops-automacao-sem-enrolacao/?referralCode=28E4F89140C44D63D605)**

---

## About the course

This is a 100% practical, straight-to-the-point course focused on preparing professionals to automate infrastructure, pipelines, and cloud environments with the main tools used in the DevOps market.

---

## Repository structure

### 00. Introduction

- Course overview
- Installation prerequisites (Git, Docker, AWS CLI, Azure CLI, Terraform, Ansible, kubectl, and more)
- Setup guide for Ubuntu, WSL2, and macOS

### 01. Essential foundations

**Goal:** Master the basic tools required for DevOps.

#### Essential Git

- Core commands: clone, add, commit, push, pull
- Branches, merges, and pull requests
- Tags and versioning
- Automation with custom functions

#### Essential Linux

- File navigation and manipulation
- Permissions and users
- Processes and resource management

#### Essential Vi

- Editing modes
- Basic navigation commands
- Search and replacement

---

### 02. Containers with Docker

**Goal:** Containerize applications and create reproducible environments.

- Image and container concepts
- Complete Docker CLI (build, run, exec, logs, ps, stop, rm)
- Multi-stage Dockerfiles for optimization
- Docker Compose for local orchestration
- Pushing images to Docker Hub
- **Hands-on labs:**
  - Containerizing a Node.js application
  - Containerizing a FastAPI (Python) API
  - Docker Compose with PostgreSQL
  - `.gitignore` for Docker projects

---

### 03. Cloud computing (AWS and Azure)

**Goal:** Provision cloud resources through the console and CLI.

#### AWS

- Creating EC2 instances (Ubuntu)
- Security configuration (Security Groups)
- Elastic IP for a fixed address
- User data for startup automation
- S3 buckets with versioning and security policies
- AWS CLI automation

#### Azure

- Creating VMs in Azure
- Configuring NSGs (Network Security Groups)
- Managing resources with the Azure CLI

---

### 04. Essential Terraform

**Goal:** Infrastructure as Code (IaC) for AWS and Azure.

- IaC concepts and benefits
- Terraform project structure (`main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`)
- AWS and Azure providers
- Remote state with Azure Storage
- Reusable modules
- **Hands-on labs:**
  - Provisioning a VM in Azure
  - Creating S3 buckets with policies
  - Professional Terraform project structure

---

### 05. CLI automation (AWS and Azure)

**Goal:** Automate tasks with CLI scripts and commands.

- Advanced AWS CLI
- Advanced Azure CLI
- Automation scripts for provisioning
- Pipeline integration

---

### 06. Ansible

**Goal:** Configuration as code for server automation.

- Playbook and inventory concepts
- Core modules (`apt`, `yum`, `docker_container`, `user`, `file`, `systemd`)
- Creating Azure VMs for testing
- **Hands-on labs:**
  - Installing Docker with Ansible
  - Deploying a containerized Java application
  - Managing users and permissions
  - Configuring a folder structure

---

### 07. GitHub Actions

**Goal:** Modern CI/CD with automated pipelines.

- Workflow and job concepts
- Triggers (`push`, `pull_request`, `workflow_dispatch`)
- Secrets and environment variables
- **Hands-on labs:**
  - Basic Hello World pipeline
  - CI/CD for a Java application with Maven
  - Building and pushing Docker images to Azure Container Registry (ACR)
  - Security scanning with Trivy
  - Terraform + Ansible infrastructure integrated with GitHub Actions
  - A resource-destruction button through `workflow_dispatch`

---

### 08. Kubernetes

**Goal:** Container orchestration in production.

- Core concepts: Pods, Deployments, Services, Namespaces
- Azure Kubernetes Service (AKS) on the Free Tier
- Creating a cluster with Terraform
- Installing an NGINX Ingress Controller with Helm
- KEDA for event-driven autoscaling
- **Hands-on labs (11 complete labs):**
  1. Creating an AKS cluster with Terraform
  2. First Pod manually
  3. ReplicaSet for high availability
  4. Deployment with rolling updates and rollback
  5. Exposing a service with LoadBalancer
  6. Isolation with Namespaces (dev, staging, production)
  7. CPU/memory Requests & Limits
  8. Health checks (liveness and readiness probes)
  9. HPA (Horizontal Pod Autoscaler)
  10. Ingress with a nip.io domain
  11. KEDA scale-to-zero based on cron

---

### 09. Datadog — observability

**Goal:** Monitor applications and infrastructure in production.

- Datadog integration with AKS
- APM (Application Performance Monitoring)
- Log and metric collection
- Custom dashboards
- **Hands-on labs:**
  - Installing the Datadog Agent with Helm
  - Monitoring a Java application with APM
  - Configuring structured logs

---

### 10. AI for DevOps

**Goal:** Accelerate troubleshooting and automation with AI.

#### Gemini CLI

- Installation and configuration
- Kubernetes cluster troubleshooting
- Command automation

#### Custom ChatGPT agents

- Creating a DevOps specialist GPT
- Configuring instructions, resources, and conversation starters
- **Hands-on labs:**
  - Installing Gemini CLI on Ubuntu
  - AKS troubleshooting with optimized prompts
  - Creating a Principal Architect DevOps agent in ChatGPT

---

### 11. Python for DevOps

**Goal:** Automation and scripting with Python.

- Virtual environment installation and configuration
- Language fundamentals (variables, types, conditionals, loops)
- Functions, lists, and data structures
- Debugging in PyCharm
- **Hands-on labs:**
  - Python environment setup
  - Basic automation scripts
  - Advanced debugging in PyCharm

---

## Target audience

- IT professionals who want to move into DevOps
- SysAdmins looking for automation
- Developers who want to understand infrastructure
- Technology students interested in cloud and automation

---

## Tools used

- **Version control:** Git, GitHub
- **Containers:** Docker, Docker Compose
- **Cloud:** AWS, Azure
- **IaC:** Terraform
- **Configuration:** Ansible
- **CI/CD:** GitHub Actions
- **Orchestration:** Kubernetes (AKS), Helm, KEDA
- **Observability:** Datadog
- **AI:** Gemini CLI, ChatGPT
- **Languages:** Python, Shell Script

---

## Prerequisites

- Basic Linux knowledge
- Networking and infrastructure fundamentals
- Free-tier AWS and Azure accounts
- VS Code or a preferred editor

---

## How to use this repository

1. Clone the repository:

```bash
git clone https://github.com/iesodias/devops_automation.git
cd devops_automation
```

2. Follow the labs in the recommended order (00 → 11).

3. Each module contains:
   - A README with detailed instructions
   - Ready-to-use code and manifests
   - Step-by-step commands

4. Configure the tools by following the guide in `00-intro/README.md`.

---

## Study tips

- Run **all labs** to consolidate the learning
- Adapt the examples to real scenarios
- Document your variations and learnings
- Practice creating pipelines from scratch
- Break things and learn to fix them (in test environments!)

---

## Support

**Course students have access to:**

- Q&A sessions
- An exclusive discussion group
- Content updates
- Direct instructor support

**If you are not a student yet, enroll here:**

**[DevOps Automation — No Fluff](https://www.udemy.com/course/devops-automacao-sem-enrolacao/?referralCode=28E4F89140C44D63D605)**

---

## License

This material is for **course students only**. Unauthorized redistribution is prohibited.

---

## About the instructor

**Ieso Dias** — DevOps engineer with practical experience in infrastructure automation, CI/CD pipelines, and cloud computing (AWS/Azure).

### Connect with me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ieso_Dias-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iesodias/)
[![Instagram](https://img.shields.io/badge/Instagram-@iesofdias-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/iesofdias)
[![Website](https://img.shields.io/badge/Website-Free_Labs-00C7B7?style=for-the-badge&logo=google-chrome&logoColor=white)](https://devopsautomation.com.br/)

---

**Keep learning and automate everything!**
