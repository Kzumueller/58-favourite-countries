"use client"

import {useCallback, useEffect, useState} from "react";
import {validateUserName} from "@/src/actions/db/user/validateUserName";
import {Card} from "@/src/components/layout/Card";
import {Spinner} from "@/src/components/misc/Spinner";
import {Input} from "@/src/components/input/Input";
import {Label} from "@/src/components/layout/Label";

type Props = {
  title: string;
  onSubmit: (username: string, password: string) => Promise<void>;
  showAvailability: boolean
}

export const UserForm = ({title, onSubmit, showAvailability}: Props) => {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);

  /**
   * checks whether the given username is still available
   */
  const checkAvailability = useCallback(async (username: string) => {
    const valid = await validateUserName(username);

    setUsernameValid(valid);
  }, []);

  /** checks availability when username changes */
  useEffect(() => {
    if(showAvailability) checkAvailability(username)
  }, [showAvailability, checkAvailability, username]);

  return <Card
      title={title}
      footer={<button
        disabled={!username || !usernameValid || !password}
        className="btn btn-primary"
        onClick={() => onSubmit(username, password)}
      >{submitting && <Spinner />} Create</button>
      }
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <Input
            placeholder="User name"
            value={username}
            onChange={setUsername}
          />
        </div>
        {showAvailability && username &&
          <Label>
            <div className="flex w-full justify-end">
              {
                usernameValid
                  ? <span className="text-green-600 text-right">Available</span>
                  : <span className="text-red-600 text-right">Unavailable</span>
              }
            </div>
          </Label>}

        <div className="flex flex-row mt-3 w-full">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </div>
      </div>
    </Card>;
}