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
        
        //shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
        //Usar 'H' se quiser pegar o hash inteiro
        //Comando melhor
        //commit = sh(returnStdout: true, script: "git log -n 1 develop --pretty=format:'%H'").trim()
        //echo shortCommit
        
        sh 'git rev-parse HEAD > commit'
        def commit = readFile('commit').trim()
        
        echo commit
        
        env.GIT_COMMIT = commit
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