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
                    try{
                        withCredentials([string(credentialsId: 'USR', variable: 'USER')]) {
                        // def path = ${USER} + "/simple_costs_manager:1 ."
                        // bat "docker build -t ${path}"
                    }
                    }
                    catch(e)
                    {
                        // For Linux machines
                        sh 'docker build -t shak11/simple_costs_manager:1 .'
                        // sh 'docker run -p 8888:80 docker_test:1'
                    }
                }
            }
        }
            stage("Upload Build To DockerHub")
        {
            steps{
                script{
                    try{
                        withCredentials([string(credentialsId: 'PWD', variable: 'Password'), string(credentialsId: 'USR', variable: 'USER')]) {
                        // def path = $USER + "/simple_costs_manager:1"
                            // bat "docker login -u $USER -p $Password"
                            // bat 'docker push ${path}'
                         
                        }
                    }
                    catch(e)
                    {
                            sh 'docker login'
                            sh 'docker push shak11/simple_costs_manager:1'
                        
                    }
                }
            }
        }
    }
}