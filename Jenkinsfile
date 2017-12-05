pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
    
  }
  stages {
    stage('Clone') {
      steps {
        git(url: 'https://github.com/Rafael-Miceli/PriceStoresFront', branch: 'master')
      }
    }
  }
}