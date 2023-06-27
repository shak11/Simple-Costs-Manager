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
                        bat 'docker build -t simple_costs_manager:1 .'
                    }
                    catch(e)
                    {
                        // For Linux machines
                        sh 'docker build -t simple_costs_manager:1 .'
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
                            bat 'docker login'
                            bat 'docker push simple_costs_manager:1'
                         
                        
                    }
                    catch(e)
                    {
                            sh 'docker login'
                            sh 'docker push simple_costs_manager:1'
                        
                    }
                }
            }
        }
    }
}
