pipeline{
    agent any
    tools{
        maven 'maven'
    }
    stages{
        stage("Git Pull Project") {
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/shak11/Simple-Costs-Manager.git']]])
            }
        }
        stage("Build Docker Image")
        {
            steps{
                script{
                        withCredentials([string(credentialsId: 'USR', variable: 'USER')]) {
                            def path = "${USER}/simple_costs_manager:1 ."
                    try{
                        
                        bat "docker build -t ${path}"
                    }
                    
                    catch(e)
                    {
                        // For Linux machines
                        sh "docker build -t ${path}"
                        // sh 'docker run -p 8888:80 docker_test:1'
                    }
                }
                }
            }
        }
            stage("Upload Build To DockerHub")
        {
            steps{
                script{
                    withCredentials([string(credentialsId: 'PWD', variable: 'Password'), string(credentialsId: 'USR', variable: 'USER')]) {
                    def path = "${USER}/simple_costs_manager:1"
                    try{
                            bat "docker login -u ${USER} -p ${Password}"
                            bat "docker push ${path}"
                         
                        
                    }
                    catch(e)
                    {
                            sh "docker login -u ${USER} -p ${Password}"
                            sh "docker push ${path}"
                        
                    }
                }
                }
            }
        }
        stage("K8 Deployment")
        {
            steps{
                script{
                    kubernetesDeploy( configs: 'deploymentservice.yml', kubeConfig: [path: ''], kubeconfigId: 'K8Config')
                }
            }
        }
    }
}