"use server"

import {db} from "@/src/actions/db/db";

export default async () => db
.query(`create table if not exists countries (
    id numeric(3, 0) primary key,
    name varchar(64),
    capital varchar(64),
    population numeric(10, 0),
    flag char(7)
  )`);