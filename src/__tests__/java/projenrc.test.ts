import { Pom } from '../../java';
import { Projenrc } from '../../java/projenrc';
import { synthSnapshot, TestProject } from '../util';

test('projenrc.java support', () => {
  // GIVEN
  const project = new TestProject();
  const pom = new Pom(project, {
    groupId: 'my.group.id',
    artifactId: 'hello-world',
    version: '1.2.3',
  });

  // WHEN
  new Projenrc(project, pom, {
    projenVersion: '1.0.0',
  });

  // THEN
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test('use a non-test scope', () => {
  // GIVEN
  const project = new TestProject();
  const pom = new Pom(project, {
    groupId: 'my.group.id',
    artifactId: 'hello-world',
    version: '1.2.3',
  });

  // WHEN
  new Projenrc(project, pom, {
    testScope: false,
    projenVersion: '7.7.7',
  });

  // THEN
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test('set the class name', () => {
  // GIVEN
  const project = new TestProject();
  const pom = new Pom(project, {
    groupId: 'my.group.id',
    artifactId: 'hello-world',
    version: '1.2.3',
  });

  // WHEN
  new Projenrc(project, pom, {
    className: 'boom.bam.projenrc',
    projenVersion: '7.7.7',
  });

  // THEN
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test('generate projenrc in java', () => {
  // GIVEN
  const project = new TestProject({
    jsiiFqn: 'projen.java.JavaProject',
  });
  const pom = new Pom(project, {
    groupId: 'my.group.id',
    artifactId: 'hello-world',
    version: '1.2.3',
  });

  // WHEN
  new Projenrc(project, pom, {
    initializationOptions: {
      junit: false,
    },
  });

  // THEN
  expect(synthSnapshot(project)['src/test/java/projenrc.java']).toMatchSnapshot();
});