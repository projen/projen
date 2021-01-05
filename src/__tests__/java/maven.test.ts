
import { MavenProject, MavenProjectOptions } from '../../java/maven-project';
import { LogLevel } from '../../logger';
import { mkdtemp, synthSnapshot } from '../util';

test('defaults', () => {
  const p = new TestMavenProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test('pom options', () => {
  const p = new TestMavenProject({
    groupId: 'com.myorg',
    artifactId: 'play-202101050157',
  });

  snapPom(p);
});

test('dependencies', () => {
  const p = new TestMavenProject();
  p.pom.addRuntimeDep('software.amazon.awscdk/core@1.2.3');
  p.pom.addTestDep('org.assertj/assertj-core@3.18.1');
  p.pom.addPlugin('org.apache.maven.plugins/maven-compiler-plugin@3.8.1', {
    configuration: {
      source: '1.8',
      target: '1.8',
    },
  });
  snapPom(p);
});

test('no junit', () => {
  const p = new TestMavenProject({
    junit: false,
  });

  expect(synthSnapshot(p)).toMatchSnapshot();
});

function snapPom(p: MavenProject) {
  expect(synthSnapshot(p)['pom.xml']).toMatchSnapshot();
}

class TestMavenProject extends MavenProject {
  constructor(options: Partial<MavenProjectOptions> = { }) {
    super({
      ...options,
      groupId: 'org.acme',
      artifactId: 'my-artifact',
      name: 'test-project',
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
    });
  }
}