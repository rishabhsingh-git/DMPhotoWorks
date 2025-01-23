pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials(${env.development.DOCKER_HUB_CREDENTIALS}) 
        DOCKER_HUB_USERNAME = ${env.development.DOCKER_HUB_CREDENTIALS}
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/rishabhsingh-git/DMPhotoWorks.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_HUB_USERNAME}/dmphotoworks-backend ./backend'
                    sh 'docker build -t ${DOCKER_HUB_USERNAME}/dmphotoworks-frontend ./client'
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    sh 'docker login -u ${DOCKER_HUB_USERNAME} -p' ${env.development.DOCKER_HUB_CREDENTIALS}
                    sh 'docker push ${DOCKER_HUB_USERNAME}/dmphotoworks-backend'
                    sh 'docker push ${DOCKER_HUB_USERNAME}/dmphotoworks-frontend'
                }
            }
        }
    }
}

pipeline {
    agent any
    stages {
        stage('Deploy to EC2') {
            steps {
                sshagent(['docker_integration_ssh_key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@13.233.246.74 << EOF
                    docker pull DOCKER_HUB_USERNAME/dmphotoworks-backend:latest
                    docker pull DOCKER_HUB_USERNAME/dmphotoworks-frontend:latest
                    cd /home/ubuntu/
                    docker-compose down || true
                    docker-compose up -d
                    EOF
                    """
                }
            }
        }
        stage('Cleanup Old Containers') {
            steps {
                script {
                    // Clean up old Docker containers and images
                    sh 'docker system prune -f'
                }
            }
        }
    }
    post {
        success {
            slackSend(channel: '#ci-cd', message: "Deployment successful: ${env.BUILD_URL}")
        }
        failure {
            slackSend(channel: '#ci-cd', message: "Deployment failed: ${env.BUILD_URL}")
        }
    }
}
