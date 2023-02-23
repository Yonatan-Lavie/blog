# Blog

This project is a blogging platform that allows end users to create and publish their own blog posts, as well as comment on other posts.
It has been designed using a microservices architecture, which enables it to be used at a large scale.  
The project is built using various cutting-edge technologies, including Docker, Kubernetes, React, and Express.

The microservices architecture allows each service to be developed and maintained independently, which makes the platform more scalable and reliable.  
The use of Docker containers and Kubernetes for orchestration helps to ensure that the platform can be deployed and managed easily, regardless of the underlying infrastructure.

The front-end of the platform is built using React, a popular JavaScript library for building user interfaces.  
The back-end is built using Express, a fast and flexible web framework for Node.js.
The post-checking service, which is a crucial part of the platform, which checks each post for any potentially inappropriate content by analyzing the wording used.
If the post is deemed appropriate, it will be added to the blog for others to read and engage with.

Overall, the use of microservices architecture, Docker, Kubernetes, React, and Express helps to ensure that the blogging platform is robust, scalable, and easy to use.

### Instructions to run the project locally

1. Download and install Docker Desktop [windows-install](https://docs.docker.com/desktop/install/windows-install/)
2. Enable Kubernetes in Docker Desktop app  
   Go to settings -> Kubernetes  
   mark checkbox "Enable Kubernetes
3. Install Chocolatey [install individual](https://chocolatey.org/install#individual)
4. Install kubectl using Chocolatey
   ```
   choco install kubernetes-cli
   ```
5. Install skaffold using Chocolatey
   ```
   choco install skaffold
   ```
6. Clone the project
   ```
    git clone https://github.com/Yonatan-Lavie/blog.git
   ```
7. Use Kubectl to deploy ingress necessary services

   ```
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.6.4/deploy/static/provider/cloud/deploy.yaml
   ```

8. Run cluster using skaffold
   ```
   skaffold dev
   ```
9. shutdown cluster
   ```
   skaffold delete
   ```
