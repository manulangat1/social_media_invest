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
                    sh "echo This gets the current version and bumps it"

                    def packageJson = readJSON file: 'package.json'
                    def currentVersion = packageJson.version
                    echo "Current version: ${currentVersion}"

                    echo "$BUILD_NUMBER"

                    def newVersion = incrementVersion(currentVersion)
                    echo "New version: $newVersion"
                    env.IMAGE_TAG = "$newVersion-$BUILD_NUMBER"
                    env.NEW_V = newVersion

                    echo "NEW_V : $NEW_V"
                    packageJson.version = NEW_V
                    echo "$newVersion"
                    // writeJSON file: 'package.json', json: packageJson
                    writeFile file: 'package.json', text: groovy.json.JsonOutput.prettyPrint(groovy.json.JsonOutput.toJson(packageJson))
                }
            }
        }

        stage("Build the docker images via docker compose "){ 
            steps {
                script{
                    echo "docker-compose"
                    sh "docker build . -t mau:${IMAGE_TAG}"
                    // sh "docker run -d -p 3000:3000 --name my-app-container mau:${IMAGE_TAG}"
                    // sh "docker ps"
                }
            }
        }

        stage("Run tests ") { 
            steps { 
                script{ 
                    sh "docker ps"
                    sh "docker run -d -p 3000:3000 --name my-app-container-1 mau:${IMAGE_TAG}"
                    // sh "docker exec my-app-container-1 npm run test:e2e"
                    sh "docker ps"

                }
            }
        }
        stage ("Deploy to staging image") { 
            
            steps {
                expression {
                when BRANCH_NAME= 'staging'
            }
                script{
                    echo "To staging enironment and fix  it"
                }
            }
        }

        stage("Infrastructure provinsioning"){
            steps {
                script {
                    echo "Moving into the terraform config folder"
                    dir("terraform_config"){
                        sh "ls"
                    }
                }
            }
        }

        stage ("Delete docker caches and stop running container"){
            steps { 
                script{
                    // sh "docker stop my-app-container" 
                    sh "docker stop my-app-container-1" 
                    sh " docker container prune -f"
                    // sh " docker rm my-app-container my-app-container-1"
                    sh "docker system prune -a -f --volumes"
                }
            }
        }
    }
}


def incrementVersion(version) {
    // Split the version string into its major, minor, and patch components
    def (major, minor, patch) = version.split(/\./).collect { it.toInteger() }

    // Increment the appropriate component
    patch += 1

    // Build and return the new version string
    return "${major}.${minor}.${patch}"
}