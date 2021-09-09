import RegisterStepForm from "../../../../components/forms/RegisterStepForm.js";
import Layout from "../../../../components/layout.js";
import { useRouter } from "next/router";
import React from "react";
import {useNeeds} from "../../../../data/use-data";

export default function Register() {
  const router = useRouter();
  const { pid } = router.query;
  var error = "";

  const register = async (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic

    const res = await fetch("http://127.0.0.1:8000/step/", {
      body: JSON.stringify({
        name: event.target.name.value,
        description: event.target.description.value,
        completed: false,
        goal: pid,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.token,
      },
      method: "POST",
    });

    const result = await res.json();

    console.log(result);
    if (result.id) {
      router.push("/goals/" + pid);
    } else {
      console.log(result.need);
      error = result.need;
    }
  };

  return (
    <>
      <Layout cond="false" card="off">
        <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded lg:w-2/5 mx-auto">
          <RegisterStepForm onClick={register} error={error} />
        </div>
      </Layout>
    </>
  );
}