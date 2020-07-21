import {
  Document, Model, Schema, model
} from 'mongoose';

/**
 *
 * @export
 * @interface IUser
 * @extends {Document}
 */
export interface IUser extends Document {
  /** Email of the user */
  email: string;
  /** Password of the user */
  password: string;
  /** Name of the  user*/
  name: string;
  /** Profile image Url of the user */
  imageUri: string;
  /** Status of the user */
  status: string;
}

/**
 *
 * @interface IUserModel
 * @extends {Model<IUser>}
 */
interface IUserModel extends Model<IUser> { }

const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  imageUri: { type: String },
  status: { type: String }
},
{ timestamps: true });

const User: IUserModel = model<IUser, IUserModel>('User', schema);

export default User;
