import { AllowFailure, Artifacts, Cache, CacheKeyFiles, Environment, Filter, Image, IncludeRule, Inherit, Job, JobWhen, Need, Parallel, Release, Retry, Secret, Service, Trigger } from "./configuration-model";

type CacheKey = string | CacheKeyFiles | undefined;
type ArrayOrBoolOrUndefined<T> = T[] | boolean | undefined;

/**
 * A Sequence combines several `Job`s and/or other `Sequence`s to a group.
 * 
 * The concept of `Sequence`s is not officially included in Gitlab CI/CD.
 * It is an extension of that library and provides an easy-to-use yet
 * powerful mechanism to create reusable `Job`s for Gitlab CI/CD pipelines.
 * 
 * You can use a `Sequence` to combine multiple `Job`s that perform a common task.
 * You can also add `Sequence`s to a `Sequence` to define a nested structure of `Job`s.
 * In a `Sequence`, all properties of the contained `Job`s can be changed.
 * The changes are made at the time of synthesis. The changes were applied
 * recursively and from the bottom up. That is, changes to higher-level
 * `Sequence`s take precedence over changes to lower-level `Sequence`s.
 * So you can use `Sequence`s from other libraries and adjust their `Job`s
 * according to your needs.
 * 
 * Without `Sequence`s, there would be no convenient way to reuse parts of
 * Gitlab CI/CD pipelines. You could reuse preconfigured `Job`s, but then
 * you are responsible for configuring and orchestrating each individual `Job`.
 */
export class Sequence {

    /**
     * The parameters will modify the `Job`s as following:
     * 
     * * All `*ToInit` parameters will applied only to `undefined` `Job` values.
     * * All `*ToReplace` parameters will replace any previous `Job` values configured.
     * * For the following `Job` members the `*ToPrepend` parameter values will be
     *   inserted before any existing `Job` value and the `*ToAppend` or `*ToAdd`
     *   parameter values will be inserted after any existing `Job` value:
     *   * afterScript
     *   * beforeScript
     *   * dependencies
     *   * extends
     *   * needs
     *   * rules
     *   * script
     *   * services
     *   * tags
     * * Following parameters were handled different:
     * 
     * @param allowFailureToAdd If the `Job`s original value is boolean, it will be
     *   replaced by the exit codes given. Else the list of exit codes will be extended.
     * @param artifactsToAdd If the `Job`s artifacts is set, then both `Artifacts` objects
     *   get merged in the way that all 'non-list' values gets replaced and all lists
     *   get extended.
     * @param cacheToAdd If the `Job`s cache is set, then both `Cache` objects
     *   get merged in the way that all 'non-list' values gets replaced and all lists
     *   get extended. This applies to the included cache key too.
     * @param exceptToAdd If both, the `Job` and this parameter, are of type string[],
     *   both string lists gets merged. If Both are of type `Filter`, then both objects
     *   get merged in the way that all 'non-list' values gets replaced and all lists
     *   get extended. If only one values is of type `string[]`, then the final value
     *   is the other `Filter` value, but with `refs` extended by the string list.
     * @param inheritToAdd For the `Job`s value and this parameter value each member of
     *   `Inherit` is evaluated. If one of the value is of type `boolean`, then the value
     *   from the parameter is taken. If both values of type 'list', then both values
     *   get merged.
     * @param onlyToAdd Works the same like `exceptToAdd`.
     * @param parallelToAdd Only if the `Job`s value is of type `Parallel`, then the 'matrix'
     *   values of both `Parallel` objects are merged. Else a warning is printed, saying that
     *   both types are incomatible and the `Job`s numer value isn't modified.
     * @param secretsToAdd The Record and it's inner Record get recursively merged.
     */
    constructor(
        private children: Record<string, Job | Sequence> = {},
        public afterScriptToInit?: string[],
        public afterScriptToReplace?: string[],
        public afterScriptToAppend?: string[],
        public afterScriptToPrepend?: string[],
        public allowFailureToInit?: boolean | AllowFailure,
        public allowFailureToReplace?: boolean | AllowFailure,
        public allowFailureToAdd?: AllowFailure,
        public artifactsToInit?: Artifacts,
        public artifactsToReplace?: Artifacts,
        public artifactsToAdd?: Artifacts,
        public beforeScriptToInit?: string[],
        public beforeScriptToReplace?: string[],
        public beforeScriptToAppend?: string[],
        public beforeScriptToPrepend?: string[],
        public cacheToInit?: Cache,
        public cacheToReplace?: Cache,
        public cacheToAdd?: Cache,
        public coverageToInit?: string,
        public coverageToReplace?: string,
        public dependenciesToInit?: string[],
        public dependenciesToReplace?: string[],
        public dependenciesToAdd?: string[],
        public environmentToInit?: string | Environment,
        public environmentToReplace?: string | Environment,
        public exceptToInit?: string[] | Filter,
        public exceptToReplace?: string[] | Filter,
        public exceptToAdd?: string[] | Filter,
        public extendsToInit?: string[],
        public extendsToReplace?: string[],
        public extendsToAdd?: string[],
        public imageToInit?: Image,
        public imageToReplace?: Image,
        public inheritToInit?: Inherit,
        public inheritToReplace?: Inherit,
        public inheritToAdd?: Inherit,
        public interruptibleToInit?: boolean,
        public interruptibleToReplace?: boolean,
        public needsToInit?: Array<Need | string>,
        public needsToReplace?: Array<Need | string>,
        public needsToAdd?: Array<Need | string>,
        public onlyToInit?: string[] | Filter,
        public onlyToReplace?: string[] | Filter,
        public onlyToAdd?: string[] | Filter,
        public parallelToInit?: Parallel | number,
        public parallelToReplace?: Parallel | number,
        public parallelToAdd?: Parallel,
        public releaseToInit?: Release,
        public releaseToReplace?: Release,
        public resourceGroupToInit?: string,
        public resourceGroupToReplace?: string,
        public retryToInit?: Retry,
        public retryToReplace?: Retry,
        public rulesToInit?: IncludeRule[],
        public rulesToReplace?: IncludeRule[],
        public rulesToPrepend?: IncludeRule[],
        public rulesToAppend?: IncludeRule[],
        public scriptToInit?: string[],
        public scriptToReplace?: string[],
        public scriptToPrepend?: string[],
        public scriptToAppend?: string[],
        public secretsToInit?: Record<string, Record<string, Secret>>,
        public secretsToReplace?: Record<string, Record<string, Secret>>,
        public secretsToAdd?: Record<string, Record<string, Secret>>,
        public servicesToInit?: Service[],
        public servicesToReplace?: Service[],
        public servicesToAdd?: Service[],
        public stageToInit?: string,
        public stageToReplace?: string,
        public stageToPrepend?: string,
        public startInToInit?: string,
        public startInToReplace?: string,
        public tagsToInit?: string[],
        public tagsToReplace?: string[],
        public tagsToAdd?: string[],
        public timeoutToInit?: string,
        public timeoutToReplace?: string,
        public triggerToInit?: Trigger | string,
        public triggerToReplace?: Trigger | string,
        public variablesToInit?: Record<string, number | string>,
        public variablesToReplace?: Record<string, number | string>,
        public variablesToAdd?: Record<string, number | string>,
        public whenToInit?: JobWhen,
        public whenToReplace?: JobWhen,
    ) { }

    /**
     * 
     * @returns A copy of all `Job`s contained in this `Sequence` and its sub `Sequence`s
     *   with all modifications configured in this `Sequence` applied to these `Job`s.
     */
    public render(): Record<string, Job> {

        const jobs: Record<string, Job> = {};

        for (const [childName, child] of Object.entries(this.children)) {
            if (Sequence.isSequence(child)) {
                const subJobs = child.render()
                for (const [subJobName, subJob] of Object.entries(subJobs)) {
                    jobs[`${childName}_${subJobName}`] = subJob
                }
            }
            else {
                const job: Job = {
                    afterScript: modify_list(child.afterScript, this.afterScriptToReplace, this.afterScriptToPrepend, this.afterScriptToAppend) ?? this.afterScriptToInit,
                    allowFailure: this._allow_failure(child) ?? this.allowFailureToInit,
                    artifacts: this._artifacts(child) ?? this.artifactsToInit,
                    beforeScript: modify_list(child.beforeScript, this.beforeScriptToReplace, this.beforeScriptToPrepend, this.beforeScriptToAppend) ?? this.beforeScriptToInit,
                    cache: this._cache(child) ?? this.cacheToInit,
                    coverage: this.coverageToReplace ?? child.coverage ?? this.coverageToInit,
                    dependencies: modify_list(child.dependencies, this.dependenciesToReplace, this.dependenciesToAdd) ?? this.dependenciesToInit,
                    environment: this.environmentToReplace ?? child.environment ?? this.environmentToInit,
                    except: this._except_and_only(child.except, this.exceptToReplace, this.exceptToAdd) ?? this.exceptToInit,
                    extends: modify_list(child.extends, this.extendsToReplace, this.extendsToAdd) ?? this.extendsToInit,
                    image: this.imageToReplace ?? child.image ?? this.imageToInit,
                    inherit: this._inherit(child) ?? this.inheritToInit,
                    interruptible: this.interruptibleToReplace ?? child.interruptible ?? this.interruptibleToInit,
                    needs: modify_list(child.needs, this.needsToReplace, this.needsToAdd) ?? this.needsToInit,
                    only: this._except_and_only(child.only, this.onlyToReplace, this.onlyToAdd) ?? this.onlyToInit,
                    parallel: this._parallel(child) ?? this.parallelToInit,
                    release: this.releaseToReplace ?? child.release ?? this.releaseToInit,
                    resourceGroup: this.resourceGroupToReplace ?? child.resourceGroup ?? this.resourceGroupToInit,
                    retry: this.retryToReplace ?? child.retry ?? this.retryToInit,
                    rules: modify_list(child.rules, this.rulesToReplace, this.rulesToPrepend, this.rulesToAppend) ?? this.rulesToInit,
                    script: modify_list(child.script, this.scriptToReplace, this.scriptToPrepend, this.scriptToAppend) ?? this.scriptToInit,
                    secrets: this._secrets(child) ?? this.secretsToInit,
                    services: modify_list(child.services, this.servicesToReplace, this.servicesToAdd) ?? this.servicesToInit,
                    stage: this.stageToReplace ?? concat_strings(this.stageToPrepend, child.stage) ?? this.stageToInit,
                    startIn: this.startInToReplace ?? child.startIn ?? this.startInToInit,
                    tags: modify_list(child.tags, this.tagsToReplace, this.tagsToAdd) ?? this.tagsToInit,
                    timeout: this.timeoutToReplace ?? child.timeout ?? this.timeoutToInit,
                    trigger: this.triggerToReplace ?? child.trigger ?? this.triggerToInit,
                    variables: this.variablesToReplace ?? concat_records(child.variables, this.variablesToAdd) ?? this.variablesToInit,
                    when: this.whenToReplace ?? child.when ?? this.whenToInit,
                }
                // remove all keys with `undefined` values introduced by `concatItemsOrUndefined`
                removeKeysWithUndefinedValues(job)
                jobs[childName] = job
            }
        }
        return jobs;
    }

    /**
     * Add one or more `Job`s and/or `Sequence`s to this `Sequence`.
     * @param children The key of the record is the name of the `Job` or `Sequence`,
     *   the value is the `Job` or `Sequence` to add.
     */
    public addChildren(children: Record<string, Job | Sequence>) {
        for (const [childName, child] of Object.entries(children)) {
            if (this.children[childName] !== undefined) {
                throw new Error(`A child was added to a Sequence with a name that already exsits: ${childName}`);
            }
            this.children[childName] = child;
        }
    }

    /**
     * Helper method used in `Sequence.render()` method.
     * See `Sequence.constructor()` on how this helper function behaves
     * to modify `Job` properties.
     */
    private _allow_failure(job: Job): (boolean | AllowFailure | undefined) {
        if (this.allowFailureToReplace !== undefined) return this.allowFailureToReplace;
        else if (job.allowFailure === undefined) return this.allowFailureToAdd;
        else if (this.allowFailureToAdd === undefined) return job.allowFailure;
        else {
            if (typeof job.allowFailure === "boolean") return this.allowFailureToAdd;
            else return { exitCodes: (concatItems(job.allowFailure.exitCodes, this.allowFailureToAdd.exitCodes)) };
        }
    }

    /**
     * Helper method used in `Sequence.render()` method.
     * See `Sequence.constructor()` on how this helper function behaves
     * to modify `Job` properties.
     */
    private _artifacts(job: Job): (Artifacts | undefined) {
        if (this.artifactsToReplace !== undefined) return this.artifactsToReplace;
        else if (job.artifacts === undefined) return this.artifactsToAdd;
        else if (this.artifactsToAdd === undefined) return job.artifacts;
        else {
            const artifact: Artifacts = {
                exclude: concatItemsOrUndefined(job.artifacts.exclude, this.artifactsToAdd.exclude),
                expireIn: this.artifactsToAdd.expireIn ?? job.artifacts.expireIn,
                exposeAs: this.artifactsToAdd.exposeAs ?? job.artifacts.exposeAs,
                name: this.artifactsToAdd.name ?? job.artifacts.name,
                paths: concatItemsOrUndefined(job.artifacts.paths, this.artifactsToAdd.paths),
                reports: this.artifactsToAdd.reports ?? job.artifacts.reports,
                untracked: this.artifactsToAdd.untracked !== undefined ? this.artifactsToAdd.untracked : job.artifacts.untracked,
                when: this.artifactsToAdd.when ?? job.artifacts.when,
            }
            removeKeysWithUndefinedValues(artifact)
            return artifact
        }
    }

    /**
     * Helper method used in `Sequence.render()` method.
     * See `Sequence.constructor()` on how this helper function behaves
     * to modify `Job` properties.
     */
    private _cache(job: Job): Cache | undefined {
        if (this.cacheToReplace !== undefined) return this.cacheToReplace;
        else if (job.cache === undefined) return this.cacheToAdd;
        else if (this.cacheToAdd === undefined) return job.cache;
        else {
            const cache: Cache = {
                paths: concatItemsOrUndefined(job.cache.paths, this.cacheToAdd.paths),
                key: this._cache_key_files(job.cache.key, this.cacheToAdd.key),
                untracked: this.cacheToAdd.untracked !== undefined ? this.cacheToAdd.untracked : job.cache.untracked,
                policy: this.cacheToAdd.policy ?? job.cache.policy,
                when: this.cacheToAdd.when ?? job.cache.when,
            }
            removeKeysWithUndefinedValues(cache)
            return cache
        }
    }


    /**
     * Helper method used in `_cache` method.
     */
    private _cache_key_files(jobCacheKey: CacheKey, sequenceCacheKey: CacheKey): CacheKey {
        if (sequenceCacheKey === undefined) return jobCacheKey;
        else if (jobCacheKey === undefined) return sequenceCacheKey;
        else if (typeof sequenceCacheKey === "string") return sequenceCacheKey;
        else if (typeof jobCacheKey === "string") return sequenceCacheKey;
        else {
            const cache_key = {
                files: concatItems(jobCacheKey.files, sequenceCacheKey.files),
                prefix: sequenceCacheKey.prefix ?? jobCacheKey.prefix,
            }
            removeKeysWithUndefinedValues(cache_key)
            return cache_key
        }
    }

    /**
     * Helper method used in `Sequence.render()` method.
     * See `Sequence.constructor()` on how this helper function behaves
     * to modify `Job` properties.
     */
    private _except_and_only(jobExceptOrOnly: string[] | Filter | undefined, toReplace?: string[] | Filter, toAdd?: string[] | Filter): string[] | Filter | undefined {
        if (toReplace !== undefined) return toReplace;
        else if (jobExceptOrOnly === undefined) return toAdd;
        else if (toAdd === undefined) return jobExceptOrOnly;
        else if (Array.isArray(jobExceptOrOnly) && Array.isArray(toAdd)) return concatItemsOrUndefined(jobExceptOrOnly, toAdd);
        else {
            const jobExceptAsFilter = this._as_filter(jobExceptOrOnly)
            const sequenceExceptAsFilter = this._as_filter(toAdd)
            const filter: Filter = {
                changes: concatItemsOrUndefined(jobExceptAsFilter.changes, sequenceExceptAsFilter.changes),
                kubernetes: sequenceExceptAsFilter.kubernetes ?? jobExceptAsFilter.kubernetes,
                refs: concatItemsOrUndefined(jobExceptAsFilter.refs, sequenceExceptAsFilter.refs),
                variables: concatItemsOrUndefined(jobExceptAsFilter.variables, sequenceExceptAsFilter.variables),
            }
            removeKeysWithUndefinedValues(filter)
            return filter
        }
    }

    /**
     * Helper method used in `_except_and_only` method.
     */
    private _as_filter(obj: string[] | Filter): Filter {
        if (Array.isArray(obj)) return { refs: obj };
        else return obj;
    }

    /**
     * Helper method used in `Sequence.render()` method.
     * See `Sequence.constructor()` on how this helper function behaves
     * to modify `Job` properties.
     */
    private _inherit(job: Job): Inherit | undefined {
        if (this.inheritToReplace !== undefined) return this.inheritToReplace;
        else if (job.inherit === undefined) return this.inheritToAdd;
        else if (this.inheritToAdd === undefined) return job.inherit;
        else {
            const inherit: Inherit = {
                default: this._merge_array_or_bool_or_undefined(job.inherit.default, this.inheritToAdd.default),
                variables: this._merge_array_or_bool_or_undefined(job.inherit.variables, this.inheritToAdd.variables),
            }
            removeKeysWithUndefinedValues(inherit)
            return inherit
        }
    }

    /**
     * Helper method used in `_inherit` method.
     */
    private _merge_array_or_bool_or_undefined<T>(jobValue: ArrayOrBoolOrUndefined<T>, sequenceValue: ArrayOrBoolOrUndefined<T>): ArrayOrBoolOrUndefined<T> {
        if (typeof sequenceValue === "boolean") return sequenceValue;
        else if (typeof jobValue === "boolean") return sequenceValue;
        else return concatItemsOrUndefined(jobValue, sequenceValue);
    }

    /**
     * Helper method used in `Sequence.render()` method.
     * See `Sequence.constructor()` on how this helper function behaves
     * to modify `Job` properties.
     */
    private _parallel(job: Job): Parallel | number | undefined {
        if (this.parallelToReplace !== undefined) return this.parallelToReplace;
        else if (job.parallel === undefined) return this.parallelToAdd;
        else if (this.parallelToAdd === undefined) return job.parallel;
        else if (typeof job.parallel !== "number") return { matrix: concatItems(job.parallel.matrix, this.parallelToAdd.matrix) };
        else {
            console.warn("Incompatible types for 'Job.parallel' and 'Sequence.parallelToAdd'. Ignoring Job and keeping its original 'parallel' value.");
            return job.parallel
        }
    }

    /**
     * Helper method used in `Sequence.render()` method.
     * See `Sequence.constructor()` on how this helper function behaves
     * to modify `Job` properties.
     */
    private _secrets(job: Job): Record<string, Record<string, Secret>> | undefined {
        if (this.secretsToReplace !== undefined) return this.secretsToReplace;
        else if (job.secrets === undefined) return this.secretsToAdd;
        else if (this.secretsToAdd === undefined) return job.secrets;
        else {
            const jobSecretsClone: Record<string, Record<string, Secret>> = JSON.parse(JSON.stringify(job.secrets))
            for (const [secretToAddKey, secretToAdd] of Object.entries(this.secretsToAdd)) {
                if (secretToAddKey in jobSecretsClone) {
                    for (const innerKey in secretToAdd) jobSecretsClone[secretToAddKey][innerKey] = secretToAdd[innerKey]
                }
                else jobSecretsClone[secretToAddKey] = this.secretsToAdd[secretToAddKey]
            }
            return jobSecretsClone
        }
    }

    /**
     * @param obj An object which may be a `Job` or a `Sequence`.
     * @returns Only `true` if the object is a `Sequence`.
     */
    public static isSequence(obj: Job | Sequence): obj is Sequence {
        return (obj as Sequence).render !== undefined
    }
}

/**
 * This function modifies the given object directly and removes every key, whose value is `undefined`.
 * 
 * @param obj The object whose keys with `undefined` values should be removed.
 */
function removeKeysWithUndefinedValues(obj: Record<string, any>): void {
    for (const key in obj) if (obj[key] === undefined) delete obj[key];
}

/**
 * Because the logic how a `Sequence` modifies list values of `Job`s is always the same, this logic is
 * outsourced to this function, in the case that there is a common logic change in the future.
 * 
 * @returns `replace` if not `undefined` or a concatenation of `prepend+original+append` or
 *  `undefined` if the concatenation is an empty array or all values given are `undefined`.
 */
function modify_list<T>(original?: T[], replace?: T[], append?: T[]): (T[] | undefined)
function modify_list<T>(original?: T[], replace?: T[], prepend?: T[], append?: T[]): (T[] | undefined)
function modify_list<T>(original?: T[], replace?: T[], prepend?: T[], append?: T[]): (T[] | undefined) {
    return replace ?? concatItemsOrUndefined(prepend, original, append)
}

/**
 * This helper function combines all parameters given into a single array.
 * 
 * If a parameter is an array itself, its values becomes unpacked.
 * 
 * Additionally you haven't take care about some of parameters given are `undefined`. This
 * could be the case if you want to collect Arrays from object, without knowing if they are
 * defined or not.
 * 
 * @param items An Array of Arrays of the same Type as well as 'unpacked' items or undefined.
 * @returns An Array which contains all the elements of the given arrays, without undefined items.
 */
function concatItems<T>(...items: (T | T[] | undefined)[]): T[] {
    let retVal = items.flat().filter((x): x is T => x !== undefined);
    return retVal
}

/**
 * This function works exactly the same like `concatItems` but...
 * 
 * @returns ... returns `undefined` when the resulting array is empty.
 */
function concatItemsOrUndefined<T>(...arrays: (T | T[] | undefined)[]): (T[] | undefined) {
    const items = concatItems(...arrays)
    if (items.length === 0) {
        return undefined;
    }
    return items
}

/**
 * @param strings A list of strings or undefined values.
 * @returns A concatenation of all values given, or undefined if the concatenation is undefined or an empty string.
 */
function concat_strings(...strings: (string | undefined)[]): string | undefined {
    let retVal = "";
    strings.forEach(x => {
        if (x !== undefined) retVal += x;
    })
    if (retVal) return retVal;
    else return undefined;
}

/**
 * @param record1 a Record or undefined
 * @param record2 a Record or undefined
 * @returns Both records merged or undefined if the merged record is an empty object.
 */
function concat_records<T extends string | number | symbol, R>(record1: Record<T, R> | undefined, record2: Record<T, R> | undefined): Record<T, R> | undefined {
    const retVal = { ...record1, ...record2 }
    if (Object.keys(retVal).length > 0) return retVal as Record<T, R>;
    else return undefined;
}