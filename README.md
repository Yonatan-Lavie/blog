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
1. First, make sure you have the following software installed on your computer:  
- Docker
- Node.js
- Kubernetes command-line tool (kubectl)
2. Clone the project's code repository to your local machine using Git.  
```bash
git clone https://github.com/Yonatan-Lavie/blog.git
```

3. Navigate to the root directory of the project in your terminal.  

4. Start the Kubernetes cluster on your local machine by running the following command in your terminal:  

```bash
minikube start
```
This command will start a local Kubernetes cluster that you can use to deploy the project's microservices.

5. Apply the Kubernetes manifests for the project's microservices by running the following command in your terminal:

```bash
kubectl apply -f infra/k8s
```

This command will apply the YAML files located in the "infra/k8s" directory to your Kubernetes cluster. These files define the deployment, service, and ingress resources for the project's microservices.

Wait a few minutes for the microservices to be deployed and become available.

Once the microservices are deployed and running, you can access the project by opening your web browser and going to http://localhost:80. This will route traffic to the blog's front-end service.

You should now be able to create and publish blog posts, as well as comment on other posts.

That's it! You now have the project running locally on your Kubernetes cluster. Remember to stop the cluster when you're finished by running minikube stop in your terminal.
