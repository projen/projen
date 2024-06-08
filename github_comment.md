I think only one tests is missing. I've been debugging for some time. It looks quite deep, most likely related to jsii than projen. I coul

https://github.com/projen/projen/blob/7c53f1a71bdcaf584a585c8d94bc4cc6b2cace1f/test/new.test.ts#L26-L40

If you could help @mrgrain but

for (const type of inventory.discover()) {
  test(`projen new ${type.pjid}`, () => {
    withProjectDir((projectdir) => {
      // execute `projen new PJID --no-synth` in the project directory
      execProjenCLI(projectdir, ["new", "--no-synth", type.pjid]);

      // compare generated snapshot
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: EXCLUDE_FROM_SNAPSHOT,
      });

      expect(actual).toMatchSnapshot();
    });
  });
}


 `/\r?\n/g`
https://github.com/aws/jsii/blob/12c1b7dff1926e2528b7d3db506af2d748731052/packages/jsii/lib/docs.ts#L218