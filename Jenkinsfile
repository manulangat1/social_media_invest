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
    }
}