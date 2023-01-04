import { FormEvent, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";

import { LockClosedIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const [id, setId] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    if (!title) return;

    const FETCH_URL = `https://aksharamukha-plugin.appspot.com/api/public?target=RomanReadable&text=${title.toString()}`

    const resp = await fetch(FETCH_URL);
    const data = await resp.text();

    const newId = data.replaceAll(" ", "-");
    setId(newId);
  };

  return (
    <div className="min-h-screen h-screen max-h-screen overflow-hidden flex flex-col items-center justify-center">
      <Head>
        <title>Kannada Title to transliterate id</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center pt-0 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Input a title to convert to an ID
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Title in Kannada
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Title in Kannada"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Convert
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full text-center">
        {id ? <h1 className="text-3xl text-indigo-500">ID: {id}</h1> : null}
      </div>
    </div>
  );
};

export default Home;
