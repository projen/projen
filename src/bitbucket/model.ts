

export interface AwsImageReference {
  readonly accessKey: string;
  readonly secretKey: string;
}


export interface Image {

  readonly name: string;
  readonly username?: string;
  readonly password?: string;
  readonly email?: string;
  /*
     *  Private images hosted by AWS ECR (EC2 Container Registry)
     *
     * If the image is hosted by ECR, you can provide the access key and secret
     * key via secure variables.
     */
  readonly aws?: AwsImageReference;
  /*
     *  Override the default user
     *
     * An image's default user can be overridden by specifying a user UID as
     * the run-as-user. The specified user UID must be an existing user in the
     * image with a valid home directory.
     *
     * @see https://support.atlassian.com/bitbucket-cloud/docs/use-docker-images-as-build-environments/
     */
  readonly runAsUser?: number;
}