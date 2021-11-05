pipeline {
  agent any
    
  tools {nodejs "Default"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/Rebeccompany/EasyCook-Backend'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}