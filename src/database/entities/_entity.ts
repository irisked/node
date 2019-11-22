import { Document, Model } from "mongoose";

export type EntityDocument<T> = T & Document;
export type EntityModel<T> = Model<EntityDocument<T>>;
