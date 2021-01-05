import { Component } from '../component';
import { Project } from '../project';
import { Pom } from './pom';

export interface MavenVersionsOptions {}

export class MavenVersions extends Component {
  constructor(project: Project, pom: Pom, _options: MavenVersionsOptions = { }) {
    super(project);

    pom.addPlugin('org.codehaus.mojo/versions-maven-plugin@2.8.1', {
      configuration: {
        generateBackupPoms: false,
      },
    });

    project.addTask('upgrade', {
      description: 'Upgrades pom.xml to latest versions',
      exec: 'mvn versions:use-latest-releases',
    });
  }
}