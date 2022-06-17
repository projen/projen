import { GitlabConfiguration } from '../../src/gitlab'
import { Artifacts, Cache, CachePolicy, CacheWhen, DefaultElement, Job, KubernetesEnum } from '../../src/gitlab/configuration-model'
import { Sequence } from '../../src/gitlab/sequence'
import { synthSnapshot, TestProject } from '../util'

/**
 * We use `toStrictEqual` instead of `toEqual` because we don't want that
 * a Sequence will introduce new `Job` keys with `undefined` values. So
 * `toStrictEqual` will also compare those keys.
 */

test("Test adding an element to Sequence with existing name", () => {
    const sequence = new Sequence()
    sequence.addChildren({ foo: {} })
    expect(() => sequence.addChildren({ foo: {} }))
        .toThrowError("A child was added to a Sequence with a name that already exsits")
})

/**
 * All `Job` values whose type is a list of values are modified the
 * same way within a `Sequence` by the private function `modify_list`.
 * 
 * This test proves this function works on an empty Sequence, with
 * no jobs.
 * 
 * We only test this function for the job value `afterScript`, because
 * it should behave the same for:
 * 
 * * afterScript
 * * beforeScript
 * * dependencies
 * * extends
 * * needs
 * * rules
 * * script
 * * services
 * * tags
 */
test("Test private function 'modify_list' on empty Sequence", () => {
    const sequence = new Sequence()
    expect(sequence.render()).toStrictEqual({})

    const testArray = ["a"]

    sequence.afterScriptToReplace = testArray
    expect(sequence.render()).toStrictEqual({})

    sequence.afterScriptToPrepend = testArray
    expect(sequence.render()).toStrictEqual({})

    sequence.afterScriptToAppend = testArray
    expect(sequence.render()).toStrictEqual({})
})

/**
 * All `Job` values whose type is a list of values are modified the
 * same way within a `Sequence` by the private function `modify_list`.
 * 
 * This test proves this function works on a Sequence, containing jobs.
 * 
 * We only test this function for the job value `afterScript` and
 * `dependencies` because it should behave the same for:
 * 
 * * afterScript
 * * beforeScript
 * * dependencies
 * * extends
 * * needs
 * * rules
 * * script
 * * services
 * * tags
 * 
 * The difference between `afterScript` and `dependencies` is that the
 * `modify_list` has an overloaded function signature. Both cases are
 * tested.
 */
test("Test private function 'modify_list'", () => {

    const sequence = new Sequence()
    sequence.addChildren({ job1: {} })
    sequence.addChildren({ job2: { afterScript: ["x"], dependencies: ["y"] } })
    expect(sequence.render()).toStrictEqual({ job1: {}, job2: { afterScript: ["x"], dependencies: ["y"] } })

    sequence.afterScriptToPrepend = ["a"]
    expect(sequence.render()).toStrictEqual(
        {
            job1: { afterScript: ["a"] },
            job2: { afterScript: ["a", "x"], dependencies: ["y"] }
        }
    )

    sequence.afterScriptToAppend = ["b"]
    sequence.dependenciesToAdd = ["1"]
    expect(sequence.render()).toStrictEqual(
        {
            job1: { afterScript: ["a", "b"], dependencies: ["1"] },
            job2: { afterScript: ["a", "x", "b"], dependencies: ["1", "y"] }
        }
    )

    sequence.afterScriptToReplace = ["c"]
    sequence.dependenciesToReplace = ["2"]
    expect(sequence.render()).toStrictEqual(
        {
            job1: { afterScript: ["c"], dependencies: ["2"] },
            job2: { afterScript: ["c"], dependencies: ["2"] }
        }
    )
})

test("Test 'allowFailure' modifications", () => {
    const sequence = new Sequence()

    // test both cases, where the original allowFailure is a boolean
    // or an AllowFailure object
    sequence.addChildren({ job1: { allowFailure: true } })
    sequence.addChildren({ job2: { allowFailure: { exitCodes: 1 } } })

    expect(sequence.render()).toStrictEqual(
        {
            job1: { allowFailure: true },
            job2: { allowFailure: { exitCodes: 1 } }
        }
    )

    sequence.allowFailureToAdd = { exitCodes: 3 }
    expect(sequence.render()).toStrictEqual(
        {
            job1: { allowFailure: { exitCodes: 3 } },
            job2: { allowFailure: { exitCodes: [1, 3] } }
        }
    )

    sequence.allowFailureToReplace = false
    expect(sequence.render()).toStrictEqual(
        {
            job1: { allowFailure: false },
            job2: { allowFailure: false }
        }
    )

    sequence.allowFailureToReplace = { exitCodes: 4 }
    expect(sequence.render()).toStrictEqual(
        {
            job1: { allowFailure: { exitCodes: 4 } },
            job2: { allowFailure: { exitCodes: 4 } }
        }
    )
})

test("Test 'artifacts' modifications", () => {
    const sequence = new Sequence()

    const originalArtifacts: Artifacts = {
        exclude: ["original"],
        expireIn: "original",
        exposeAs: "original",
        name: "original",
        paths: ["original"],
        reports: { performance: ["original"] },
        untracked: true,
        when: CacheWhen.ALWAYS,
    }

    sequence.addChildren({ job1: { artifacts: originalArtifacts } })
    expect(sequence.render()).toStrictEqual({ job1: { artifacts: originalArtifacts } })

    sequence.artifactsToAdd = {
        exclude: ["modified"],
        expireIn: "modified",
        exposeAs: "modified",
        name: "modified",
        paths: ["modified"],
        reports: { junit: ["modified"] },
        untracked: false,
        when: CacheWhen.ON_FAILURE,
    }
    expect(sequence.render()).toStrictEqual({
        job1: {
            artifacts: {
                exclude: ["original", "modified"],
                expireIn: "modified",
                exposeAs: "modified",
                name: "modified",
                paths: ["original", "modified"],
                reports: { junit: ["modified"] },
                untracked: false,
                when: CacheWhen.ON_FAILURE,
            }
        }
    })
})

test("Test 'cache' modifications", () => {
    const sequence = new Sequence()

    const originalCache: Cache = {
        paths: ["original"],
        key: "original",
        untracked: true,
        policy: CachePolicy.PULL,
        when: CacheWhen.ALWAYS,
    }

    sequence.addChildren({ job1: { cache: originalCache } })
    expect(sequence.render()).toStrictEqual({ job1: { cache: originalCache } })

    sequence.cacheToAdd = {
        paths: ["modified"],
        key: "modified",
        untracked: false,
        policy: CachePolicy.PULL_PUSH,
        when: CacheWhen.ON_SUCCESS,
    }
    expect(sequence.render()).toStrictEqual({
        job1: {
            cache: {
                paths: ["original", "modified"],
                key: "modified",
                untracked: false,
                policy: CachePolicy.PULL_PUSH,
                when: CacheWhen.ON_SUCCESS,
            }
        }
    })
})

test("Test 'cache key' modifications", () => {
    const sequence = new Sequence()

    const originalCache: Cache = {
        key: { files: ["original"], prefix: "foo" }
    }
    sequence.addChildren({ job1: { cache: originalCache } })
    expect(sequence.render()).toStrictEqual({ job1: { cache: originalCache } })

    sequence.cacheToAdd = { key: { files: ["modified"], prefix: "bar" } }
    expect(sequence.render()).toStrictEqual({
        job1: {
            cache: {
                key: {
                    files: ["original", "modified"],
                    prefix: "bar"
                }
            }
        }
    })
})

test("Test 'except' modifications", () => {

    /**
     * Those tests should also be valid for 'only' modifications.
     */

    const sequence = new Sequence()

    sequence.addChildren({ job1: { except: ["original"] } })
    sequence.addChildren({
        job2: {
            except: {
                changes: ["original"],
                refs: ["original"],
                variables: ["original"],
            }
        }
    })
    expect(sequence.render()).toStrictEqual(
        {
            job1: { except: ["original"] },

            job2: {
                except: {
                    changes: ["original"],
                    refs: ["original"],
                    variables: ["original"],
                }
            }
        }
    )

    sequence.exceptToAdd = ["modified"]
    expect(sequence.render()).toStrictEqual(
        {
            job1: { except: ["original", "modified"] },

            job2: {
                except: {
                    changes: ["original"],
                    refs: ["original", "modified"],
                    variables: ["original"],
                }
            }
        }
    )

    sequence.exceptToAdd = {
        changes: ["modified"],
        kubernetes: KubernetesEnum.ACTIVE,
        refs: ["modified"],
        variables: ["modified"],
    }
    expect(sequence.render()).toStrictEqual(
        {
            job1: {
                except: {
                    changes: ["modified"],
                    kubernetes: KubernetesEnum.ACTIVE,
                    refs: ["original", "modified"],
                    variables: ["modified"],
                }
            }
            ,

            job2: {
                except: {
                    changes: ["original", "modified"],
                    kubernetes: KubernetesEnum.ACTIVE,
                    refs: ["original", "modified"],
                    variables: ["original", "modified"],
                }
            }
        }
    )
})

test("Test 'inherit' modifications", () => {
    const sequence = new Sequence()

    sequence.addChildren({ job1: { inherit: { default: false, variables: false } } })
    sequence.addChildren({ job2: { inherit: { default: [DefaultElement.IMAGE], variables: ["original"] } } })
    expect(sequence.render()).toStrictEqual(
        {
            job1: { inherit: { default: false, variables: false } },
            job2: { inherit: { default: [DefaultElement.IMAGE], variables: ["original"] } }
        },
    )

    sequence.inheritToAdd = { default: true, variables: true }
    expect(sequence.render()).toStrictEqual(
        {
            job1: { inherit: { default: true, variables: true } },
            job2: { inherit: { default: true, variables: true } }
        },
    )

    sequence.inheritToAdd = { default: [DefaultElement.CACHE], variables: ["modified"] }
    expect(sequence.render()).toStrictEqual(
        {
            job1: { inherit: { default: [DefaultElement.CACHE], variables: ["modified"] } },
            job2: { inherit: { default: [DefaultElement.IMAGE, DefaultElement.CACHE], variables: ["original", "modified"] } }
        },
    )
})

test("Test 'parallel' modifications", () => {
    const sequence = new Sequence()

    sequence.addChildren({ job1: { parallel: 1 } })
    sequence.addChildren({ job2: { parallel: { matrix: [{ foo: ["bar"] }] } } })
    expect(sequence.render()).toStrictEqual(
        {
            job1: { parallel: 1 },
            job2: { parallel: { matrix: [{ foo: ["bar"] }] } }
        }
    )

    const originalConsoleWarn = global.console.warn
    global.console.warn = jest.fn()

    sequence.parallelToAdd = { matrix: [{ hello: ["world"] }] }
    expect(sequence.render()).toStrictEqual(
        {
            job1: { parallel: 1 },
            job2: { parallel: { matrix: [{ foo: ["bar"] }, { hello: ["world"] }] } }
        }
    )

    expect(console.warn).toBeCalledWith("Incompatible types for 'Job.parallel' and 'Sequence.parallelToAdd'. Ignoring Job and keeping its original 'parallel' value.")
    expect(console.warn).toBeCalledTimes(1)
    global.console.warn = originalConsoleWarn
})

test("Test 'secrets' modifications", () => {
    const sequence = new Sequence()

    sequence.addChildren({ job1: { secrets: { secret1: { key1: { vault: { engine: { name: "a", path: "b" }, field: "c", path: "d" } } } } } })
    sequence.addChildren({ job2: { secrets: { secret1: { key2: { vault: { engine: { name: "e", path: "f" }, field: "g", path: "h" } } } } } })
    sequence.addChildren({ job3: { secrets: { secret2: { key1: { vault: { engine: { name: "i", path: "j" }, field: "k", path: "l" } } } } } })
    expect(sequence.render()).toStrictEqual(
        {
            job1: { secrets: { secret1: { key1: { vault: { engine: { name: "a", path: "b" }, field: "c", path: "d" } } } } },
            job2: { secrets: { secret1: { key2: { vault: { engine: { name: "e", path: "f" }, field: "g", path: "h" } } } } },
            job3: { secrets: { secret2: { key1: { vault: { engine: { name: "i", path: "j" }, field: "k", path: "l" } } } } }
        },
    )

    sequence.secretsToAdd = { secret1: { key1: { vault: { engine: { name: "w", path: "x" }, field: "y", path: "z" } } } }
    expect(sequence.render()).toStrictEqual(
        {
            job1: { secrets: { secret1: { key1: { vault: { engine: { name: "w", path: "x" }, field: "y", path: "z" } } } } },

            job2: {
                secrets: {
                    secret1: {
                        key2: { vault: { engine: { name: "e", path: "f" }, field: "g", path: "h" } },
                        key1: { vault: { engine: { name: "w", path: "x" }, field: "y", path: "z" } }
                    }
                }
            },
            job3: {
                secrets: {
                    secret2: { key1: { vault: { engine: { name: "i", path: "j" }, field: "k", path: "l" } } },
                    secret1: { key1: { vault: { engine: { name: "w", path: "x" }, field: "y", path: "z" } } }
                }
            }
        },
    )
})

test("Test 'stage' modifications", () => {
    const sequence = new Sequence()

    sequence.addChildren({ job1: {} })
    sequence.addChildren({ job2: { stage: "original" } })
    expect(sequence.render()).toStrictEqual({ job1: {}, job2: { stage: "original" } })

    sequence.stageToPrepend = "modified"
    expect(sequence.render()).toStrictEqual({ job1: { stage: "modified" }, job2: { stage: "modifiedoriginal" } })
})

test("Test 'variables' modifications", () => {
    const sequence = new Sequence()

    sequence.addChildren({ job1: {} })
    sequence.addChildren({ job2: { variables: { foo: "original", bar: 1 } } })
    expect(sequence.render()).toStrictEqual({ job1: {}, job2: { variables: { foo: "original", bar: 1 } } })
})

test("Test '*ToInit' modifications", () => {
    const sequence = new Sequence()

    sequence.addChildren({ job1: {}, job2: { afterScript: ["b"], allowFailure: false, interruptible: false } })
    expect(sequence.render()).toStrictEqual({ job1: {}, job2: { afterScript: ["b"], allowFailure: false, interruptible: false } })

    /**
     * The `ToInit*` modifications works for all variables the same but for variables, that
     * hold boolean variables. Latter are 'allowFailure' and 'interruptible'. Thus we test
     * those two values explicitly.
     */
    sequence.afterScriptToInit = ["a"]
    sequence.allowFailureToInit = true
    sequence.interruptibleToInit = true
    expect(sequence.render()).toStrictEqual(
        {
            job1: { afterScript: ["a"], allowFailure: true, interruptible: true },
            job2: { afterScript: ["b"], allowFailure: false, interruptible: false }
        })
})

test("Test job names of sub sequences are prefixed", () => {
    const sequence = new Sequence()
    const subsequence = new Sequence()

    sequence.addChildren({ a: {}, b: subsequence })
    subsequence.addChildren({ c: {} })

    expect(sequence.render()).toStrictEqual({ a: {}, b_c: {} })
})

test("Test stage ordering from jobs sequences and nested templates", () => {
    const project = new TestProject({ stale: true })
    const ciconfig = new GitlabConfiguration(project)

    /**
     * Stages from jobs that are already present, are added to the CI config in that
     * moment the job is added to the CI config. This is valid for plain jobs as well
     * as for jobs from sequences and nested templates.
     */

    ciconfig.addStages("stage1")

    ciconfig.createNestedTemplates({ foo: { jobs: { bar: { stage: "stage2" } } } });

    const sequence1 = new Sequence()
    sequence1.addChildren({ job1: { stage: "stage3" } })

    /**
     * For subsequences it shouldn't make a difference, when the subsequence
     * is added to the sequence, as long as the sequence isn't added to the
     * CI config before. Stages within sequences just evaluated when been added
     * to the CI config and then read vertically first from the sequence tree.
     * We prove that case with sequence2 and sequence2_2.
     */
    const sequence1_1 = new Sequence()
    sequence1_1.addChildren({ job1: { stage: "stage4" } })
    sequence1.addChildren({ seq1: sequence1_1 })

    // 'stage5' is defined in a plain job below

    const sequence2 = new Sequence()
    sequence2.addChildren({ job1: { stage: "stage7" } })

    const sequence2_1 = new Sequence()
    sequence2_1.addChildren({ job1: { stage: "stage8" } })
    sequence2.addChildren({ seq1: sequence2_1 })

    /**
     * This job has stage #5 even when he is added to sequence2_1 first.
     * As said above, stages from sequences are evaluated when been added
     * to the CI configuration and then vertically first. Thus this job
     * comes right after the job from sequence1_1.
     */
    const jobx: Job = { stage: "stage5" }
    sequence2_1.addChildren({ jobx: jobx })
    sequence1.addChildren({ jobx: jobx })

    /**
     * Now we add all jobs, sequences and templates (that haven't already been added)
     * to the CI config.
     */
    ciconfig.addJobs({
        bar: sequence1,
        job1: { stage: "stage6" },
        baz: sequence2,
    })
    ciconfig.createNestedTemplates({ baz: { jobs: { bar: { stage: "stage9" } } } });

    /**
     * However stages and jobs added to nested templates and sequences after those
     * templates and sequences have been added to the CI config are also added to
     * the CI config afterwards. First the stages of the nested temples were added,
     * second the stages of the sequences. Within templates and sequences the stages
     * were added in the same order, the templates/sequences were added to the CI
     * configuration.
     */

    ciconfig.nestedTemplates["baz"].addStages("stage11")
    sequence2.addChildren({ job2: { stage: "stage14" } })
    ciconfig.nestedTemplates["foo"].addStages("stage10")
    sequence1.addChildren({ job2: { stage: "stage12" } })

    /**
     * Same as with 'jobx' but now after previous stages have been added
     * to the ci config.
     */
    const joby: Job = { stage: "stage13" }
    sequence2_1.addChildren({ joby: joby })
    sequence1.addChildren({ joby: joby })

    /**
     * This test also prooves that all jobs were correctly added
     * to the final CI configuration. Thus we check it matches the snapshot.
     */
    expect(synthSnapshot(project)[".gitlab-ci.yml"]).toMatchSnapshot();
    expect(ciconfig.stages).toStrictEqual([
        "stage1",
        "stage2",
        "stage3",
        "stage4",
        "stage5",
        "stage6",
        "stage7",
        "stage8",
        "stage9",
        "stage10",
        "stage11",
        "stage12",
        "stage13",
        "stage14",
    ])
})