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
                        bat 'docker build -t docker_test:1 .'
                    }
                    catch(e)
                    {
                        // For Linux machines
                        sh 'docker build -t docker_test:1 .'
                        // sh 'docker run -p 8888:80 docker_test:1'
                    }
                }
            }
            stage("Upload Build To DockerHub")
        {
            steps{
                script{
                    try{
                        withCredentials([string(credentialsId: 'PWD', variable: 'PWD'), string(credentialsId: 'USR', variable: 'USR')]) {
                            bat "docker login -u ${USR} -p ${PWD}"
                            bat "docker push ${USR}/Simple_Costs_Manager"
                        }
                    }
                    catch(e)
                    {
                     withCredentials([string(credentialsId: 'PWD', variable: 'PWD'), string(credentialsId: 'USR', variable: 'USR')]) {
                            sh "docker login -u ${USR} -p ${PWD}"
                            sh "docker push ${USR}/Simple_Costs_Manager"
                        }
                    }
                }
            }
        }
    }
}