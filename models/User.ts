import { Schema, model, models } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
