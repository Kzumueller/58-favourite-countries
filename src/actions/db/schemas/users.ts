"use server"

import {db} from "@/src/actions/db/db";

export default async () => db
  .query(`create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    username varchar(32) unique not null,
    password varchar(256)
  )`);