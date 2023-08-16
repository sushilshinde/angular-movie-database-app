/* This interface can be used to define objects that
represent actors, with the `name` property representing the actor's name and the `profile_path`
property representing the path to the actor's profile image.  */
export interface ActorModel {
  name: string;
  profile_path: string;
}
