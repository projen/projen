import * as xml from 'xmlbuilder2';
import { awscdk } from '../../src';
import { Testing } from '../../src/testing';

test('happy flow', () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: 'my-app',
    groupId: 'org.acme',
    cdkVersion: '^1.130.0',
    mainClass: 'org.bacme.BoomApp',
    name: 'my-app',
    version: '0.1.0',
  });

  const snapshot = Testing.synth(p);
  expect(Object.keys(snapshot)).toStrictEqual([
    '.gitattributes',
    '.github/workflows/semantic-pr.yml',
    '.github/workflows/stale.yml',
    '.gitignore',
    '.projen/deps.json',
    '.projen/tasks.json',
    'cdk.json',
    'pom.xml',
    'README.md',
    'src/main/java/org/bacme/BoomApp.java',
    'src/test/java/org/bacme/MyTest.java',
  ]);
  expect(snapshot['cdk.json']).toMatchSnapshot();
  expect(snapshot['pom.xml']).toMatchSnapshot();
  expect(snapshot['src/test/java/org/bacme/MyTest.java']).toMatchSnapshot();
  expect(snapshot['cdk.json'].app).toStrictEqual('mvn exec:java --quiet -Dexec.mainClass=org.bacme.BoomApp');
});

test('mainClass', () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: 'my-app',
    groupId: 'org.acme',
    cdkVersion: '^1.130.0',
    mainClass: 'org.acme.jojo.MyApp',
    name: 'my-app',
    version: '0.1.0',
  });

  const snapshot = Testing.synth(p);
  expect(snapshot['cdk.json'].app).toStrictEqual('mvn exec:java --quiet -Dexec.mainClass=org.acme.jojo.MyApp');
});

test('deps', () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: 'my-app',
    groupId: 'org.acme',
    cdkVersion: '^1.120.0',
    mainClass: 'org.acme.jojo.MyApp',
    name: 'my-app',
    version: '0.1.0',
    cdkDependencies: [
      'aws-lambda',
      'aws-sns',
    ],
  });

  p.addCdkDependency('aws-sqs');

  const snapshot = Testing.synth(p);
  const pom = JSON.parse(xml.convert(snapshot['pom.xml'], {
    format: 'json',
  }));

  expect(pom.project.dependencies.dependency.filter((d: any) => d.groupId === 'software.amazon.awscdk')).toStrictEqual([
    {
      artifactId: 'aws-lambda',
      groupId: 'software.amazon.awscdk',
      version: '[1.120.0,2.0.0)',
    },
    {
      artifactId: 'aws-sns',
      groupId: 'software.amazon.awscdk',
      version: '[1.120.0,2.0.0)',
    },
    {
      artifactId: 'aws-sqs',
      groupId: 'software.amazon.awscdk',
      version: '[1.120.0,2.0.0)',
    },
    {
      artifactId: 'core',
      groupId: 'software.amazon.awscdk',
      version: '[1.120.0,2.0.0)',
    },
  ]);
});