"use server"

import {db} from "@/src/actions/db/db";

export default async () => db
  .query(`create table if not exists favourite_country (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) not null, 
    country_id numeric(3, 0) references countries(id) not null,
    notes varchar(1024)
  )`);