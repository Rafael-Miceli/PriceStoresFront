// pipeline {
//   agent {
//     dockerfile {
//       filename 'Dockerfile'
//     }
    
//   }
//   stages {
//     stage('Clone') {
//       steps {
//         git(url: 'https://github.com/Rafael-Miceli/PriceStoresFront', branch: 'master')
//       }
//     }
//   }
// }


node {
    stage ('checkout') {
        git 'https://github.com/Rafael-Miceli/PriceStoresFront.git'
    }

    stage ('docker build') {
        sh 'docker build -t rafaelmiceli/pricestore-front:latest .'
    }
    
    stage ('tagging image') {
        sh "docker tag rafaelmiceli/pricestore-front:latest rafaelmiceli/pricestore-front:${env.GIT_COMMIT}"
    }
    
    sh "docker login -u ${env.username} -p ${env.password}"
    
    stage ('Pushing image') {
        sh "docker push rafaelmiceli/pricestore-front:latest"
        sh "docker push rafaelmiceli/pricestore-front:${env.GIT_COMMIT}"
    }
    

}