#!/usr/bin/env bash
set -euo pipefail

# Downloads Maven Wrapper artifacts (maven-wrapper.jar and properties) into .mvn/wrapper
# This is a convenience to bootstrap the Maven wrapper on machines without mvn preinstalled.

WRAPPER_DIR=.mvn/wrapper
mkdir -p "$WRAPPER_DIR"

MW_VERSION=0.5.6
JAR_URL="https://repo1.maven.org/maven2/io/takari/maven-wrapper/$MW_VERSION/maven-wrapper-$MW_VERSION.jar"
PROPS_URL="https://raw.githubusercontent.com/takari/maven-wrapper/master/src/main/resources/META-INF/maven/wrapper/maven-wrapper.properties"

echo "Downloading maven-wrapper.jar ($MW_VERSION)..."
curl -fsSL "$JAR_URL" -o "$WRAPPER_DIR/maven-wrapper.jar"
echo "Downloading maven-wrapper.properties..."
if ! curl -fsSL "$PROPS_URL" -o "$WRAPPER_DIR/maven-wrapper.properties"; then
	echo "Could not download properties; writing a reasonable default to $WRAPPER_DIR/maven-wrapper.properties"
	cat > "$WRAPPER_DIR/maven-wrapper.properties" <<EOF
distributionUrl=https://repo1.maven.org/maven2/org/apache/maven/apache-maven/3.6.3/apache-maven-3.6.3-bin.zip
EOF
fi

cat > mvnw <<'EOF'
#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
java -jar "$BASEDIR/.mvn/wrapper/maven-wrapper.jar" "$@"
EOF
chmod +x mvnw

echo "Maven wrapper downloaded. You can now run './mvnw -pl subscriptionservice test' to execute backend tests."
