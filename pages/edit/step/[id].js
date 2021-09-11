import RegisterStepForm from "../../../components/Forms/RegisterStepForm";
import Layout from "../../../components/layout.js";
import { useRouter } from "next/router";
import React from "react";
import {useNeeds, useStep} from "../../../data/use-data";

export default function EditStep() {
  const router = useRouter();
  const { id } = router.query;
  const { step, stepLoading, stepError } = useStep(id ? id : null);
  console.log("aiaiai")
  console.log(step)
  var error = "";

  const edit = async (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic

    const res = await fetch("http://127.0.0.1:8000/step/"+id+"/", {
      body: JSON.stringify({
        name: event.target.name.value,
        description: event.target.description.value,
        completed: step.completed,
        goal: step.goal,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.token,
      },
      method: "PUT",
    });

    const result = await res.json();

    console.log(result);
    if (result.id) {
      router.push({
        pathname: '/goals/steps/[id]',
        query: { id: step.id },
      })
      
    } else {
      console.log(result.need);
      error = result.need;
    }
  };

  return (
    <>
      <Layout cond="false" card="off">
        <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded lg:w-2/5 mx-auto">
          <RegisterStepForm onClick={edit} error={error} step={step} />
        </div>
      </Layout>
    </>
  );
}