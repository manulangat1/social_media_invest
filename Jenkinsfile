pipeline { 
    agent any 

    stages {
        stage("Init") { 
            steps{ 
                script{ 
                    echo "This is the init stage"
                }
                
            }
        }

        stage ("Get the package version and bump it"){
            steps { 
                script{
                    echo "Hello world"
                }
            }
        }

        stage("Build the docker images via docker compose "){ 
            steps {
                script{
                    echo "docker-compose"
                }
            }
        }

        stage ("Deploy to staging image") { 
            
            steps {
                expression {
                when BRANCH_NAME= 'staging'
            }
                script{
                    echo "To staging enironment and fix "
                }
            }
        }
    }
}