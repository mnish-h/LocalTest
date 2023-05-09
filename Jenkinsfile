pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            echo 'building'
          }
        }

        stage('parallelBuild') {
          steps {
            echo 'parallel build'
          }
        }

      }
    }

    stage('Test') {
      steps {
        echo 'testing'
      }
    }

    stage('deploy') {
      steps {
        echo 'deploying'
      }
    }

  }
}