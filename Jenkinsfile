pipeline {
  agent any
  stages {
    stage('commit-stage') {
      steps {
        build(job: 'ghch', propagate: true, wait: true)
      }
    }
  }
}