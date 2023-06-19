pipeline{
    agent any
    tools{
        maven 'maven'
    }
    stages{
        stage("Git Pull Web") {
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/shak11/Simple-Costs-Manager.git']]])
                // sh
            }
        }
        stage("Git Build Docker")
        {
            steps{
                script{
                    try{
                        // For Windows machines
                        // bat 'cd ./Simple-Costs-Manager/'
                        bat 'docker build -t docker_test:1 .'
                        // bat 'docker run -p 8888:80 docker_test:1'
                    }
                    catch(e)
                    {
                        // For Linux machines
                        sh 'docker build -t docker_test:1 .'
                        // sh 'docker run -p 8888:80 docker_test:1'
                    }
                }
            }
        }
    }
}