#!/usr/bin/env bash
# Maven Wrapper launcher
BASEDIR=$(dirname "$0")
CLASSPATH="$BASEDIR/.mvn/wrapper/maven-wrapper.jar"
java -cp "$CLASSPATH" org.apache.maven.wrapper.BootstrapMain "$@"
